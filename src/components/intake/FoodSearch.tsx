'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Food } from '../../types';
import PlatePortionPicker from './PlatePortionPicker';
import CustomFoodModal from '../foods/CustomFoodModal';
import { Search, Plus, Check, Sparkles } from 'lucide-react';

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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Agregando a {selectedMeal}
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white">
              ¿Qué alimento ponemos en su plato?
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
              Escribe o selecciona de la lista con medidas prácticas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs font-black transition bouncy-hover flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Alimento Propio</span>
          </button>
        </div>

        {/* Buscador */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar comida (ej. pollo, arroz, huevo, aguacate, avena)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Chips de Categorías con Emojis */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'todas', label: 'Todos ✨' },
              { id: 'proteina', label: 'Proteínas 🍗' },
              { id: 'carbohidrato', label: 'Carbohidratos 🍚' },
              { id: 'grasa', label: 'Grasas 🥑' },
              { id: 'verdura', label: 'Vegetales 🥦' },
              { id: 'fruta', label: 'Frutas 🍎' },
              { id: 'lacteo', label: 'Lácteos 🥛' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all bouncy-hover ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 hover:text-stone-900'
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
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between bouncy-hover ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-400 shadow-sm'
                    : 'border-stone-100 dark:border-slate-800 hover:bg-stone-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{food.emoji || '🍽️'}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-stone-900 dark:text-white flex items-center gap-1.5">
                      <span>{food.name}</span>
                      {food.isCustom && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-extrabold">
                          Propio ✨
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] font-semibold text-stone-500 dark:text-slate-400 capitalize">
                      {food.category} • {food.caloriesPer100g} kcal por cada 100g
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-stone-600 dark:text-slate-300 hidden sm:block">
                  P: {food.proteinPer100g}g • C: {food.carbsPer100g}g • G: {food.fatPer100g}g
                </div>
              </button>
            );
          })}
        </div>

        {/* Configuración de Porción y Botón Agregar */}
        {selectedFood && (
          <div className="pt-4 border-t border-stone-100 dark:border-slate-800 bg-stone-50/80 dark:bg-slate-800/40 p-5 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedFood.emoji || '🍽️'}</span>
                <div>
                  <h4 className="text-sm font-black text-stone-900 dark:text-white">
                    {selectedFood.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs mt-0.5">
                    <span className="font-black text-emerald-700 dark:text-emerald-400">
                      🔥 {previewKcal} kcal
                    </span>
                    <span className="font-bold text-purple-600">P: {previewP}g</span>
                    <span className="font-bold text-amber-600">C: {previewC}g</span>
                    <span className="font-bold text-pink-600">G: {previewF}g</span>
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
                    className="w-full px-3 py-2 text-center bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 rounded-xl text-xs font-black text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <span className="absolute right-2.5 top-2 text-[10px] text-stone-400 font-bold">g</span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition bouncy-hover"
                >
                  {addedSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{addedSuccess ? '¡En el Plato! 🎉' : '+ Servir en el Plato'}</span>
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
