# NutriCalc Pro — Software de Evaluación Nutricional & Gasto Calórico

Aplicación web moderna y ultra-intuitiva diseñada para nutricionistas clínicos y de rendimiento deportivo. Reemplaza las hojas de cálculo tradicionales de Excel con cálculos en tiempo real, gestión de pacientes, registro de ingesta con porciones visuales ("en un plato") y un motor de intercambios inteligentes.

## 🚀 Funcionalidades Principales

1. **Módulo Biométrico & GETD por METs (Compendio de Ainsworth):**
   - Ecuaciones de Tasa Metabólica Basal: **Mifflin-St Jeor**, **Harris-Benedict revisada (1984)** y **Katch-McArdle**.
   - Catálogo de +20 actividades físicas categorizadas con valores MET precisos.
   - Cálculo automático del ciclo de 24 horas y Efecto Térmico de los Alimentos (ETA ~10%).

2. **Registro Dinámico de Ingesta & Guía "En un Plato":**
   - Buscador rápido con autocompletado en 6 categorías (proteínas, carbohidratos, grasas, verduras, frutas, lácteos).
   - Porciones intuitivas: *1/4 de plato*, *1/2 plato*, *1 palma*, *1 puño*, *1 pulgar*, *1 taza*, *1 cucharada* o gramos exactos.
   - Gráfico de balance energético en tiempo real (GETD vs. Ingesta acumulada) con indicadores de déficit o superávit calórico.

3. **Motor de Intercambios Inteligentes (Sistema de Equivalentes):**
   - Sustitución con 1 clic de cualquier alimento por otro de su misma categoría.
   - Cálculo exacto en gramos para mantener las calorías y macronutrientes equivalentes (±5%).

4. **Gestión de Pacientes e Historial de Consultas:**
   - Expedientes de pacientes con datos antropométricos y objetivos clínicos.
   - Historial de citas cronológico para ver evolución de peso, GETD y adherencia calórica.

5. **Base de Datos Propia & Exportación:**
   - Panel para crear alimentos personalizados.
   - Respaldo completo en formato JSON (descargar y restaurar sin perder datos).
   - Arquitectura desacoplada lista para conectar a **Supabase (PostgreSQL)** o SQLite.

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **Almacenamiento Local Persistente & Cloud-Ready**

