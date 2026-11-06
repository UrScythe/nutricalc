'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Food } from '../../types';
import PlatePortionPicker from './PlatePortionPicker';
import CustomFoodModal from '../foods/CustomFoodModal';
import { Search, Plus, Utensils, Check, Sparkles, Filter } from 'lucide-react';

export default function FoodSearch() {
  const { availableFoods, addFoodEntry, selectedMeal } = useNutrition();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [portionLabel, setPortionLabel] = useState<string>('100g');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Filtrado reactivo de alimentos
  const filteredFoods = useMemo(() => {
    return availableFoods.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'todas' || f.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [availableFoods, searchTerm, selectedCategory]);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    // Asignar primera porción visual si existe, o 100g por defecto
    if (food.visualPortions && food.visualPortions.length > 0) {
      setGrams(food.visualPortions[0].approxGrams);
      setPortionLabel(food.visualPortions[0].label);
    } else {
      setGrams(100);
      setPortionLabel('100g');
    }
  };

  const handleAdd = () => {
    if (!selectedFood || grams <= 0) return;
    addFoodEntry(selectedFood, grams, portionLabel, selectedMeal);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // Previsualización de macros en tiempo real según gramos seleccionados
  const factor = grams / 100;
  const previewKcal = selectedFood ? Math.round(selectedFood.caloriesPer100g * factor) : 0;
  const previewP = selectedFood ? Number((selectedFood.proteinPer100g * factor).toFixed(1)) : 0;
  const previewC = selectedFood ? Number((selectedFood.carbsPer100g * factor).toFixed(1)) : 0;
  const previewF = selectedFood ? Number((selectedFood.fatPer100g * factor).toFixed(1)) : 0;

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Buscador de Alimentos & Porciones
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona alimentos para <strong className="capitalize text-emerald-600 dark:text-emerald-400">{selectedMeal}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear Alimento Propio</span>
          </button>
        </div>

        {/* Buscador y filtro de categorías */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Escribe el nombre del alimento (ej. pechuga, arroz, aguacate, avena)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Chips de filtro */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['todas', 'proteina', 'carbohidrato', 'grasa', 'verdura', 'fruta', 'lacteo'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat === 'todas'
                    ? 'Todos'
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Catálogo de Resultados Rápidos */}
        <div className="max-h-48 overflow-y-auto space-y-1.5 mb-4 pr-1">
          {filteredFoods.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p>No se encontró ningún alimento con ese nombre.</p>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="mt-2 text-emerald-600 dark:text-emerald-400 font-semibold underline"
              >
                + Haz clic aquí para agregarlo a tu base de datos
              </button>
            </div>
          ) : (
            filteredFoods.map((food) => {
              const isSelected = selectedFood?.id === food.id;
              return (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => handleSelectFood(food)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{food.name}</span>
                      {food.isCustom && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold">
                          Propio
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                      {food.category} • {food.caloriesPer100g} kcal / 100g
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-right shrink-0">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      P: {food.proteinPer100g}g • C: {food.carbsPer100g}g • G: {food.fatPer100g}g
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Panel de Configuración de Porción ("En un plato" o Gramos) */}
        {selectedFood && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400">Porción para:</span>{' '}
                  {selectedFood.name}
                </p>
                <div className="flex items-center gap-3 text-xs mt-1">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {previewKcal} kcal
                  </span>
                  <span className="text-violet-600 dark:text-violet-400 font-semibold">
                    {previewP}g Proteína
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    {previewC}g Carbos
                  </span>
                  <span className="text-pink-600 dark:text-pink-400 font-semibold">
                    {previewF}g Grasa
                  </span>
                </div>
              </div>

              {/* Ajuste directo en gramos */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-500">Gramos exactos:</label>
                <div className="relative w-24">
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    value={grams}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setGrams(val);
                      setPortionLabel(`${val}g`);
                    }}
                    className="w-full px-2.5 py-1 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-2 top-1.5 text-[10px] text-slate-400 pointer-events-none">g</span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                >
                  {addedSuccess ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{addedSuccess ? '¡Agregado!' : '+ Agregar al Plato'}</span>
                </button>
              </div>
            </div>

            {/* Selector de Porciones Visuales ("En un plato") */}
            <PlatePortionPicker
              food={selectedFood}
              selectedGrams={grams}
              activePortionLabel={portionLabel}
              onSelectPortion={(selectedG, label) => {
                setGrams(selectedG);
                setPortionLabel(label);
              }}
            />
          </div>
        )}
      </div>

      {isCustomModalOpen && (
        <CustomFoodModal onClose={() => setIsCustomModalOpen(false)} />
      )}
    </>
  );
}

