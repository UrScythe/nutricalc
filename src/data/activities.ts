// Catálogo de Actividades Físicas y Valores METs (Compendio de Barbara Ainsworth)
import { Activity } from '../types';

export const COMPENDIUM_ACTIVITIES: Activity[] = [
  // Reposo y Sueño
  {
    id: 'act_01',
    name: 'Dormir / Sueño nocturno',
    category: 'Reposo',
    met: 0.9,
    description: 'Estado basal de descanso nocturno o siesta profunda',
  },
  {
    id: 'act_02',
    name: 'Estar acostado despierto / Descanso quieto',
    category: 'Reposo',
    met: 1.0,
    description: 'Descanso en cama o sillón sin realizar esfuerzo físico',
  },
  {
    id: 'act_03',
    name: 'Sentado pasivo (ver TV, lectura, escuchar música)',
    category: 'Sedentario',
    met: 1.0,
    description: 'Actividad sedentaria relajada',
  },

  // Actividades Diarias y Laborales
  {
    id: 'act_04',
    name: 'Trabajo de oficina / Estudio frente al computador',
    category: 'Laboral',
    met: 1.3,
    description: 'Trabajo sentado, teclear, reuniones y tareas administrativas',
  },
  {
    id: 'act_05',
    name: 'Conducir automóvil o transporte público',
    category: 'Transporte',
    met: 1.5,
    description: 'Conducción en ciudad o carretera',
  },
  {
    id: 'act_06',
    name: 'Trabajo de pie ligero (comercio, laboratorio, enseñanza)',
    category: 'Laboral',
    met: 2.0,
    description: 'Estar de pie con movimiento leve y constante',
  },
  {
    id: 'act_07',
    name: 'Tareas del hogar ligeras (cocinar, ordenar, lavar platos)',
    category: 'Hogar',
    met: 2.5,
    description: 'Actividades domésticas rutinarias de intensidad leve',
  },
  {
    id: 'act_08',
    name: 'Limpieza doméstica vigorosa (fregar pisos, mover muebles)',
    category: 'Hogar',
    met: 3.5,
    description: 'Esfuerzo moderado con movimiento de brazos y piernas',
  },

  // Caminata y Desplazamientos
  {
    id: 'act_09',
    name: 'Caminata lenta / paseo (3.0 - 3.5 km/h)',
    category: 'Caminata',
    met: 2.5,
    description: 'Paseo tranquilo en superficie plana',
  },
  {
    id: 'act_10',
    name: 'Caminata a paso moderado (4.8 - 5.0 km/h)',
    category: 'Caminata',
    met: 3.5,
    description: 'Caminar como transporte habitual o ejercicio moderado',
  },
  {
    id: 'act_11',
    name: 'Caminata rápida y enérgica (6.0 - 6.5 km/h)',
    category: 'Caminata',
    met: 5.0,
    description: 'Paso vigoroso, respiración acelerada',
  },

  // Deporte y Entrenamiento
  {
    id: 'act_12',
    name: 'Entrenamiento con pesas / Musculación moderada',
    category: 'Fuerza',
    met: 3.5,
    description: 'Rutina tradicional de pesas en gimnasio con descansos normales',
  },
  {
    id: 'act_13',
    name: 'Entrenamiento de pesas intenso / Culturismo vigoroso',
    category: 'Fuerza',
    met: 6.0,
    description: 'Alta intensidad, superseries, levantamientos pesados',
  },
  {
    id: 'act_14',
    name: 'CrossFit / Circuit Training / HIIT',
    category: 'Alta Intensidad',
    met: 8.0,
    description: 'Circuitos continuos de alta demanda cardiovascular y muscular',
  },
  {
    id: 'act_15',
    name: 'Trote suave (8.0 km/h)',
    category: 'Carrera',
    met: 8.0,
    description: 'Ritmo continuo de trote (~7:30 min/km)',
  },
  {
    id: 'act_16',
    name: 'Carrera continua a ritmo medio (10.0 km/h)',
    category: 'Carrera',
    met: 9.8,
    description: 'Ritmo de 6:00 min/km en asfalto o cinta',
  },
  {
    id: 'act_17',
    name: 'Ciclismo recreativo / urbano (15 - 19 km/h)',
    category: 'Ciclismo',
    met: 6.0,
    description: 'Pedaleo continuo en terreno plano o bicicleta estática moderada',
  },
  {
    id: 'act_18',
    name: 'Ciclismo deportivo intenso (>22 km/h o spinning vigoroso)',
    category: 'Ciclismo',
    met: 8.5,
    description: 'Sesión de spinning enérgica o ruta en carretera',
  },
  {
    id: 'act_19',
    name: 'Natación estilo crol o libre (ritmo moderado)',
    category: 'Acuático',
    met: 5.8,
    description: 'Largo continuo de piscina con técnica moderada',
  },
  {
    id: 'act_20',
    name: 'Fútbol / Baloncesto / Deporte de equipo',
    category: 'Deportes',
    met: 7.0,
    description: 'Partido recreativo o entrenamiento con sprints y frenadas',
  },
  {
    id: 'act_21',
    name: 'Yoga / Pilates / Estiramientos',
    category: 'Flexibilidad',
    met: 2.8,
    description: 'Control postural, flexibilidad y respiración consciente',
  },
];

