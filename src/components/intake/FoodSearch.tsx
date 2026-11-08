'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Food } from '../../types';
import PlatePortionPicker from './PlatePortionPicker';
import CustomFoodModal from '../foods/CustomFoodModal';
import { Search, Plus, Check, Utensils } from 'lucide-react';

export default function FoodSearch() {
  const { availableFoods, addFoodEntry, selectedMeal } = useNutrition();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedFood, setSelectedFood] = useState<Food | null>(availableFoods[0] || null);
  const [grams, setGrams] = useState<number>(100);
  const [portionLabel, setPortionLabel] = useState<string>('100g');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const filteredFoods = useMemo(() => {
    return availableFoods.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'todas' || f.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [availableFoods, searchTerm, selectedCategory]);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
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

  const factor = grams / 100;
  const previewKcal = selectedFood ? Math.round(selectedFood.caloriesPer100g * factor) : 0;
  const previewP = selectedFood ? Number((selectedFood.proteinPer100g * factor).toFixed(1)) : 0;
  const previewC = selectedFood ? Number((selectedFood.carbsPer100g * factor).toFixed(1)) : 0;
  const previewF = selectedFood ? Number((selectedFood.fatPer100g * factor).toFixed(1)) : 0;

  return (
    <>
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#30D158] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              <span>Registro de Ingesta: {selectedMeal}</span>
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
              Buscador de Alimentos & Porciones
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Selecciona o busca un alimento para añadirlo con gramaje o medidas visuales en plato.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition apple-btn flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#30D158]" />
            <span>Crear Alimento Propio</span>
          </button>
        </div>

        {/* Buscador */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar comida (ej. pollo, arroz, huevo, aguacate, avena)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#30D158]"
            />
          </div>

          {/* Chips de Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'todas', label: 'Todos' },
              { id: 'proteina', label: 'Proteínas' },
              { id: 'carbohidrato', label: 'Carbohidratos' },
              { id: 'grasa', label: 'Grasas' },
              { id: 'verdura', label: 'Vegetales' },
              { id: 'fruta', label: 'Frutas' },
              { id: 'lacteo', label: 'Lácteos' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all apple-btn ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Galería de Alimentos scrolleable */}
        <div className="max-h-52 overflow-y-auto space-y-1.5 mb-5 pr-1">
          {filteredFoods.map((food) => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <button
                key={food.id}
                type="button"
                onClick={() => handleSelectFood(food)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between apple-btn ${
                  isSelected
                    ? 'border-[#30D158] bg-[#30D158]/5 dark:bg-[#30D158]/10 shadow-sm'
                    : 'border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{food.emoji || '🍽️'}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <span>{food.name}</span>
                      {food.isCustom && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-semibold">
                          Propio
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 capitalize">
                      {food.category} • {food.caloriesPer100g} kcal por cada 100g
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 hidden sm:block">
                  P: {food.proteinPer100g}g • C: {food.carbsPer100g}g • G: {food.fatPer100g}g
                </div>
              </button>
            );
          })}
        </div>

        {/* Configuración de Porción y Botón Agregar */}
        {selectedFood && (
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedFood.emoji || '🍽️'}</span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {selectedFood.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs mt-0.5">
                    <span className="font-bold text-[#30D158]">
                      {previewKcal} kcal
                    </span>
                    <span className="text-zinc-500">P: {previewP}g</span>
                    <span className="text-zinc-500">C: {previewC}g</span>
                    <span className="text-zinc-500">G: {previewF}g</span>
                  </div>
                </div>
              </div>

              {/* Botón Agregar */}
              <div className="flex items-center gap-2">
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
                    className="w-full px-3 py-2 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#30D158]"
                  />
                  <span className="absolute right-2.5 top-2 text-[10px] text-zinc-400">g</span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#30D158] hover:bg-[#28b84d] text-white text-xs font-bold shadow-sm transition apple-btn"
                >
                  {addedSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{addedSuccess ? 'Añadido' : '+ Agregar al Plato'}</span>
                </button>
              </div>
            </div>

            {/* Selector de porciones visuales */}
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
