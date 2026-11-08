'use client';

import React, { useState } from 'react';
import { Food, FoodCategory } from '../../types';
import { useNutrition } from '../../context/NutritionContext';
import { generateDefaultVisualPortions } from '../../lib/platePortions';
import { X, Plus, Sparkles, Check } from 'lucide-react';

interface CustomFoodModalProps {
  onClose: () => void;
}

export default function CustomFoodModal({ onClose }: CustomFoodModalProps) {
  const { addCustomFood } = useNutrition();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🥗');
  const [category, setCategory] = useState<FoodCategory>('carbohidrato');
  const [caloriesPer100g, setCaloriesPer100g] = useState<number>(120);
  const [proteinPer100g, setProteinPer100g] = useState<number>(5);
  const [carbsPer100g, setCarbsPer100g] = useState<number>(20);
  const [fatPer100g, setFatPer100g] = useState<number>(2);

  const EMOJI_OPTIONS = [
    '🥗', '🍗', '🥩', '🐟', '🥚', '🍳', '🍚', '🥔', '🥣', '🍞', '🫓', 
    '🥑', '🫒', '🥜', '🌰', '🥦', '🥬', '🥕', '🍅', '🍎', '🍌', '🍓', 
    '🥛', '🧀', '☕', '🍲', '🫘', '🌯', '✨'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const visualPortions = generateDefaultVisualPortions(category, name.trim());

    const newFood: Food = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      emoji,
      category,
      isCustom: true,
      caloriesPer100g: Number(caloriesPer100g) || 0,
      proteinPer100g: Number(proteinPer100g) || 0,
      carbsPer100g: Number(carbsPer100g) || 0,
      fatPer100g: Number(fatPer100g) || 0,
      visualPortions,
    };

    addCustomFood(newFood);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Crear Alimento Personalizado
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                Agrega recetas o alimentos típicos a tu base de datos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition bouncy-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Selector de Emoji */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1.5">
              Elige un icono amigable:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-xl p-2 rounded-xl transition-all bouncy-hover ${
                    emoji === e
                      ? 'bg-purple-100 dark:bg-purple-950 ring-2 ring-purple-500 scale-110 shadow-sm'
                      : 'hover:bg-stone-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
              Nombre del Alimento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Arepa de maíz casera, Batido proteico de avena..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
              Grupo / Macronutriente Dominante
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FoodCategory)}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              <option value="proteina">🍗 Proteína (pollo, carnes, huevos, pescados, legumbres)</option>
              <option value="carbohidrato">🍚 Carbohidrato (arroz, papas, avena, panes, pastas)</option>
              <option value="grasa">🥑 Grasa Saludable (aceite de oliva, aguacate, frutos secos)</option>
              <option value="verdura">🥦 Vegetal / Verdura (ensaladas, hojas verdes, brócoli)</option>
              <option value="fruta">🍎 Fruta fresca</option>
              <option value="lacteo">🥛 Lácteo o bebida enriquecida</option>
            </select>
          </div>

          {/* Valores por 100g */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 text-center">
              <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                Kcal / 100g
              </label>
              <input
                type="number"
                min={0}
                required
                value={caloriesPer100g}
                onChange={(e) => setCaloriesPer100g(Number(e.target.value))}
                className="w-full text-center font-black text-base bg-transparent text-stone-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 text-center border border-purple-200/50">
              <label className="block text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase mb-1">
                Proteína (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={proteinPer100g}
                onChange={(e) => setProteinPer100g(Number(e.target.value))}
                className="w-full text-center font-black text-base bg-transparent text-purple-900 dark:text-purple-200 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 text-center border border-amber-200/50">
              <label className="block text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase mb-1">
                Carbos (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={carbsPer100g}
                onChange={(e) => setCarbsPer100g(Number(e.target.value))}
                className="w-full text-center font-black text-base bg-transparent text-amber-900 dark:text-amber-200 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-pink-50/80 dark:bg-pink-950/40 text-center border border-pink-200/50">
              <label className="block text-[10px] font-bold text-pink-700 dark:text-pink-300 uppercase mb-1">
                Grasas (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={fatPer100g}
                onChange={(e) => setFatPer100g(Number(e.target.value))}
                className="w-full text-center font-black text-base bg-transparent text-pink-900 dark:text-pink-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 text-xs text-purple-900 dark:text-purple-300 font-medium leading-relaxed">
            ✨ Generaremos automáticamente las medidas visuales (1/4 de plato, puño, palma o taza) para que puedas servirlo al instante.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold rounded-2xl text-stone-600 dark:text-slate-400 hover:bg-stone-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-black rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 transition bouncy-hover"
            >
              Guardar Alimento ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
