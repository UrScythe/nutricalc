import { GoogleGenerativeAI, FunctionDeclaration, FunctionDeclarationSchemaType } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Declaración de herramientas (Function Calling) que Gemini puede ejecutar
const herramientasNutricionista: FunctionDeclaration[] = [
  {
    name: 'agregarOModificarAlimento',
    description: 'Agrega o ajusta un alimento con su gramaje en un tiempo de comida específico de la dieta.',
    parameters: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        comida: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Tiempo de comida: desayuno, almuerzo, cena o snack',
        },
        nombreAlimento: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Nombre del alimento (ej. Pechuga de pollo, Arroz cocido, Huevos, Aguacate, Avena, Manzana)',
        },
        gramos: {
          type: FunctionDeclarationSchemaType.NUMBER,
          description: 'Cantidad en gramos exactos (ej. 150)',
        },
        porcionPlato: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Medida visual de referencia (ej. 1/4 plato, 1/2 plato, 1 puño, 1 palma, 1 taza)',
        },
      },
      required: ['comida', 'nombreAlimento', 'gramos'],
    },
  },
  {
    name: 'reemplazarAlimentoEquivalente',
    description: 'Sustituye un alimento registrado por otro equivalente dentro del mismo grupo de macronutrientes (±5%).',
    parameters: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        alimentoActual: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Nombre del alimento que se va a sustituir',
        },
        alimentoNuevo: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Nombre del alimento sustituto propuesto',
        },
        gramosNuevos: {
          type: FunctionDeclarationSchemaType.NUMBER,
          description: 'Gramos calculados para conservar la equivalencia calórica',
        },
      },
      required: ['alimentoActual', 'alimentoNuevo', 'gramosNuevos'],
    },
  },
  {
    name: 'ajustarMetaCalorica',
    description: 'Ajusta el objetivo energético o la meta diaria del paciente.',
    parameters: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        caloriasObjetivo: {
          type: FunctionDeclarationSchemaType.NUMBER,
          description: 'Calorías meta del día en kcal',
        },
        motivo: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'Motivo clínico (ej. déficit para pérdida de grasa, superávit para hipertrofia, normocalórico)',
        },
      },
      required: ['caloriasObjetivo'],
    },
  },
  {
    name: 'vaciarComida',
    description: 'Limpia los alimentos de una comida específica o de todo el día.',
    parameters: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        comida: {
          type: FunctionDeclarationSchemaType.STRING,
          description: 'desayuno, almuerzo, cena, snack o todo',
        },
      },
      required: ['comida'],
    },
  },
];

export async function POST(req: Request) {
  try {
    const { mensaje, contextoActual } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Si aún no se configuró la API Key de Google AI Studio, respondemos con modo simulación inteligente
    if (!apiKey || apiKey.includes('tu_clave')) {
      const lower = (mensaje || '').toLowerCase();

      // Detección heurística para pruebas locales sin key
      if (lower.includes('pollo') || lower.includes('arroz') || lower.includes('huevo') || lower.includes('avena') || lower.includes('almuerzo') || lower.includes('desayuno')) {
        let comida = 'almuerzo';
        if (lower.includes('desayuno')) comida = 'desayuno';
        if (lower.includes('cena')) comida = 'cena';
        if (lower.includes('snack')) comida = 'snack';

        let alimento = 'Pechuga de pollo cocida';
        let gramos = 150;
        let porcion = '1 palma (120g - 150g)';

        if (lower.includes('arroz')) {
          alimento = 'Arroz blanco cocido';
          gramos = 180;
          porcion = '1 puño (150g)';
        } else if (lower.includes('huevo')) {
          alimento = 'Huevo cocido o revuelto';
          gramos = 120;
          porcion = '2 unidades (~100g)';
        } else if (lower.includes('avena')) {
          alimento = 'Avena en hojuelas cocida';
          gramos = 150;
          porcion = '1 taza (~150g)';
        }

        return NextResponse.json({
          tipo: 'accion',
          funcion: 'agregarOModificarAlimento',
          argumentos: {
            comida,
            nombreAlimento: alimento,
            gramos,
            porcionPlato: porcion,
          },
          texto: `[Simulación Google AI Studio] He preparado la acción para agregar ${gramos}g de ${alimento} en el ${comida}. Para activar el modelo Gemini 1.5 en vivo, ingresa tu GEMINI_API_KEY en .env.local.`,
        });
      }

      return NextResponse.json({
        tipo: 'texto',
        texto: 'Asistente Nutricional listo. Configura tu GEMINI_API_KEY en .env.local para habilitar el procesamiento en vivo de Google AI Studio.',
      });
    }

    // Inicializar Google Generative AI con el SDK oficial
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      tools: [{ functionDeclarations: herramientasNutricionista }],
      systemInstruction: `Eres NutriCopilot, el asistente clínico de IA de la plataforma NutriCalc Pro para nutricionistas deportivos y clínicos.
El paciente en evaluación tiene el siguiente contexto:
- Peso: ${contextoActual?.peso || 75} kg
- Altura: ${contextoActual?.altura || 175} cm
- Gasto GETD (METs): ${contextoActual?.getd || 2400} kcal/día
- Alimentos ya registrados: ${(contextoActual?.alimentos || []).map((a: any) => `${a.nombre} (${a.gramos}g en ${a.comida})`).join(', ') || 'Ninguno'}

Tu tarea es ayudar al nutricionista a modificar metas, planear comidas, cambiar gramajes y proponer intercambios de alimentos equivalentes.
SIEMPRE que el nutricionista pida agregar comidas, cambiar gramos, intercambiar o fijar metas, DEBES responder con la llamada de función (tool call) correspondiente. Sé conciso y fundamentado en ciencia nutricional.`,
    });

    const result = await model.generateContent(mensaje);
    const functionCalls = result.response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      return NextResponse.json({
        tipo: 'accion',
        funcion: call.name,
        argumentos: call.args,
        texto: result.response.text ? result.response.text() : null,
      });
    }

    return NextResponse.json({
      tipo: 'texto',
      texto: result.response.text(),
    });
  } catch (error: any) {
    console.error('Error en API Assistant:', error);
    return NextResponse.json(
      { error: error?.message || 'Error al comunicarse con Google AI Studio' },
      { status: 500 }
    );
  }
}

