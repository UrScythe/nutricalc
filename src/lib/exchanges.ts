// Motor de Intercambios Inteligentes (Sistema de Equivalentes Nutricionales)
import { Food, FoodEntry, ExchangeSuggestion } from '../types';

/**
 * Calcula las opciones de intercambio equivalente para un alimento registrado.
 * Busca alimentos de la misma categoría metabólica o dominante,
 * calculando la porción en gramos necesaria para igualar el aporte calórico del alimento original.
 */
export function calculateEquivalents(
  entry: FoodEntry,
  availableFoods: Food[]
): ExchangeSuggestion[] {
  const originalCalories = entry.calories;
  if (originalCalories <= 0) return [];

  // Filtrar alimentos de la misma categoría (excluyendo el mismo alimento)
  const candidates = availableFoods.filter(
    (f) => f.category === entry.category && f.id !== entry.foodId && f.caloriesPer100g > 0
  );

  const suggestions: ExchangeSuggestion[] = candidates.map((substitute) => {
    // Gramos necesarios del sustituto para aportar las mismas calorías:
    // (calorías originales / calorías por gramo del sustituto)
    const exactGrams = (originalCalories / substitute.caloriesPer100g) * 100;
    const roundedGrams = Math.round(exactGrams);

    // Calcular macros exactos del sustituto con la porción equivalente
    const subCalories = Math.round((substitute.caloriesPer100g / 100) * roundedGrams);
    const subProtein = Number(((substitute.proteinPer100g / 100) * roundedGrams).toFixed(1));
    const subCarbs = Number(((substitute.carbsPer100g / 100) * roundedGrams).toFixed(1));
    const subFat = Number(((substitute.fatPer100g / 100) * roundedGrams).toFixed(1));

    // Diferencia porcentual calórica
    const diffPercent = Math.abs(
      Number((((subCalories - originalCalories) / originalCalories) * 100).toFixed(1))
    );

    // Etiqueta de porción visual más cercana si existe
    let portionLabel = `${roundedGrams}g`;
    if (substitute.visualPortions && substitute.visualPortions.length > 0) {
      // Buscar si alguna porción visual se aproxima (±15%)
      const match = substitute.visualPortions.find(
        (vp) => Math.abs(vp.approxGrams - roundedGrams) / roundedGrams <= 0.15
      );
      if (match) {
        portionLabel = `${match.label} (~${roundedGrams}g)`;
      }
    }

    return {
      food: substitute,
      grams: roundedGrams,
      portionLabel,
      calories: subCalories,
      protein: subProtein,
      carbs: subCarbs,
      fat: subFat,
      caloriesDiffPercent: diffPercent,
      isExactMatch: diffPercent <= 5.0, // Cumple el criterio de equivalencia estricta (±5%)
    };
  });

  // Ordenar: primero los que tienen menor diferencia calórica
  return suggestions.sort((a, b) => a.caloriesDiffPercent - b.caloriesDiffPercent);
}

