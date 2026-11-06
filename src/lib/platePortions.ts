// Guía y lógica para porciones visuales e intuitivas ("En un plato")
import { FoodCategory, PortionType, VisualPortion } from '../types';

export interface PortionPreset {
  type: PortionType;
  label: string;
  iconName: string;
  description: string;
  defaultGramsByCategory: Record<FoodCategory, number>;
}

export const PORTION_PRESETS: PortionPreset[] = [
  {
    type: 'plate_quarter',
    label: '1/4 de plato',
    iconName: 'PieChart',
    description: 'Espacio de 1/4 del plato (ideal para proteínas o carbohidratos complejos)',
    defaultGramsByCategory: {
      proteina: 120,
      carbohidrato: 130,
      grasa: 30,
      verdura: 80,
      fruta: 100,
      lacteo: 100,
    },
  },
  {
    type: 'plate_half',
    label: '1/2 plato',
    iconName: 'Circle',
    description: 'La mitad del plato (ideal para vegetales, ensaladas y hortalizas variadas)',
    defaultGramsByCategory: {
      verdura: 200,
      fruta: 180,
      carbohidrato: 220,
      proteina: 200,
      grasa: 45,
      lacteo: 200,
    },
  },
  {
    type: 'palm',
    label: '1 Palma de mano',
    iconName: 'Hand',
    description: 'Equivalente al grosor y tamaño de la palma abierta (~porción de proteína magra)',
    defaultGramsByCategory: {
      proteina: 120,
      carbohidrato: 100,
      grasa: 25,
      verdura: 80,
      fruta: 120,
      lacteo: 100,
    },
  },
  {
    type: 'fist',
    label: '1 Puño cerrado',
    iconName: 'CircleDot',
    description: 'Equivalente al volumen de tu puño cerrado (~porción de carbohidratos o frutas)',
    defaultGramsByCategory: {
      carbohidrato: 150,
      fruta: 140,
      verdura: 100,
      proteina: 110,
      grasa: 25,
      lacteo: 150,
    },
  },
  {
    type: 'thumb',
    label: '1 Pulgar',
    iconName: 'Sparkles',
    description: 'Equivalente al volumen del dedo pulgar (~grasas saludables, aceites, frutos secos)',
    defaultGramsByCategory: {
      grasa: 15,
      proteina: 20,
      carbohidrato: 20,
      verdura: 20,
      fruta: 20,
      lacteo: 25,
    },
  },
  {
    type: 'cup',
    label: '1 Taza estándar',
    iconName: 'Coffee',
    description: 'Taza medidora de ~240 ml',
    defaultGramsByCategory: {
      carbohidrato: 160,
      proteina: 140,
      verdura: 90,
      fruta: 150,
      lacteo: 240,
      grasa: 120,
    },
  },
  {
    type: 'tablespoon',
    label: '1 Cucharada',
    iconName: 'Utensils',
    description: 'Cucharada sopera rasa (~10-15g)',
    defaultGramsByCategory: {
      grasa: 14,
      carbohidrato: 15,
      proteina: 15,
      verdura: 15,
      fruta: 15,
      lacteo: 15,
    },
  },
  {
    type: 'unit',
    label: '1 Unidad / Pieza',
    iconName: 'Box',
    description: 'Una pieza individual (huevo, fruta mediana, arepa, rebanada)',
    defaultGramsByCategory: {
      proteina: 60,
      carbohidrato: 50,
      fruta: 150,
      verdura: 120,
      grasa: 30,
      lacteo: 125,
    },
  },
];

/**
 * Genera porciones visuales inteligentes por defecto para cualquier alimento
 * según su categoría macro dominante.
 */
export function generateDefaultVisualPortions(category: FoodCategory, customFoodName: string): VisualPortion[] {
  const portions: VisualPortion[] = [];

  switch (category) {
    case 'proteina':
      portions.push(
        { id: 'vp_1', label: '1 Palma de mano', type: 'palm', approxGrams: 120, description: 'Porción estándar de carne, pollo o pescado' },
        { id: 'vp_2', label: '1/4 de plato', type: 'plate_quarter', approxGrams: 140, description: 'Sección proteica de un plato balanceado' },
        { id: 'vp_3', label: '1 Unidad / Porción', type: 'unit', approxGrams: 60, description: 'Ej: 1 huevo entero o filete pequeño' }
      );
      break;

    case 'carbohidrato':
      portions.push(
        { id: 'vp_1', label: '1/4 de plato', type: 'plate_quarter', approxGrams: 130, description: 'Cuadrante de cereales o tubérculos' },
        { id: 'vp_2', label: '1 Puño cerrado', type: 'fist', approxGrams: 150, description: 'Arroz, pasta cocida o papas' },
        { id: 'vp_3', label: '1 Taza', type: 'cup', approxGrams: 160, description: 'Porción completa en taza medidora' }
      );
      break;

    case 'verdura':
      portions.push(
        { id: 'vp_1', label: '1/2 plato', type: 'plate_half', approxGrams: 200, description: 'Base vegetal del plato saludable' },
        { id: 'vp_2', label: '1 Puño cerrado', type: 'fist', approxGrams: 100, description: 'Guarnición de verduras al vapor' },
        { id: 'vp_3', label: '1 Taza', type: 'cup', approxGrams: 90, description: 'Hojas verdes o ensalada picada' }
      );
      break;

    case 'grasa':
      portions.push(
        { id: 'vp_1', label: '1 Cucharada', type: 'tablespoon', approxGrams: 14, description: 'Aceite de oliva o mantequilla' },
        { id: 'vp_2', label: '1 Pulgar', type: 'thumb', approxGrams: 15, description: 'Frutos secos o semillas' },
        { id: 'vp_3', label: '1/4 de pieza', type: 'unit', approxGrams: 40, description: 'Ej: 1/4 de aguacate mediano' }
      );
      break;

    case 'fruta':
      portions.push(
        { id: 'vp_1', label: '1 Unidad mediana', type: 'unit', approxGrams: 150, description: 'Manzana, banana, naranja o pera' },
        { id: 'vp_2', label: '1 Puño cerrado', type: 'fist', approxGrams: 130, description: 'Fruta picada en trozos' },
        { id: 'vp_3', label: '1 Taza', type: 'cup', approxGrams: 150, description: 'Fresas, uvas o frutos rojos' }
      );
      break;

    case 'lacteo':
      portions.push(
        { id: 'vp_1', label: '1 Taza / Vaso', type: 'cup', approxGrams: 240, description: 'Vaso estándar de leche o bebida vegetal' },
        { id: 'vp_2', label: '1 Unidad / Envase', type: 'unit', approxGrams: 125, description: 'Pote de yogur estándar' },
        { id: 'vp_3', label: '1 Rebanada / Porción', type: 'slice', approxGrams: 30, description: 'Rebanada de queso o cuajada' }
      );
      break;
  }

  return portions;
}

