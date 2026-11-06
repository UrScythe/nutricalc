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
  const [category, setCategory] = useState<FoodCategory>('carbohidrato');
  const [caloriesPer100g, setCaloriesPer100g] = useState<number>(100);
  const [proteinPer100g, setProteinPer100g] = useState<number>(5);
  const [carbsPer100g, setCarbsPer100g] = useState<number>(15);
  const [fatPer100g, setFatPer100g] = useState<number>(2);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generar automáticamente las porciones visuales ("En un plato") según la categoría
    const visualPortions = generateDefaultVisualPortions(category, name.trim());

    const newFood: Food = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      category,
      isCustom: true,
      caloriesPer100g: Number(caloriesPer100g) || 0,
      proteinPer100g: Number(proteinPer100g) || 0,
      carbsPer100g: Number(carbsPer100g) || 0,
      fatPer100g: Number(fatPer100g) || 0,
      visualPortions,
      notes: notes.trim() || undefined,
    };

    addCustomFood(newFood);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Crear Alimento Propio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Agrega alimentos a tu base de datos personalizada
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nombre del Alimento
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Arepa de maíz blanco, Batido proteico..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Macronutriente Dominante / Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FoodCategory)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 capitalize"
            >
              <option value="proteina">Proteína (carnes, huevos, pescados, legumbres)</option>
              <option value="carbohidrato">Carbohidrato (cereales, tubérculos, panes, granos)</option>
              <option value="grasa">Grasa saludable (aceites, frutos secos, aguacate)</option>
              <option value="verdura">Verdura / Vegetal (ensaladas, hortalizas)</option>
              <option value="fruta">Fruta fresca o deshidratada</option>
              <option value="lacteo">Lácteo o bebida enriquecida</option>
            </select>
          </div>

          {/* Valores por 100g */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Kcal / 100g
              </label>
              <input
                type="number"
                step="1"
                min={0}
                required
                value={caloriesPer100g}
                onChange={(e) => setCaloriesPer100g(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">
                Proteína (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={proteinPer100g}
                onChange={(e) => setProteinPer100g(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">
                Carbohidratos (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={carbsPer100g}
                onChange={(e) => setCarbsPer100g(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">
                Grasas (g)
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={fatPer100g}
                onChange={(e) => setFatPer100g(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 text-xs text-purple-800 dark:text-purple-300">
            💡 Al guardar, el sistema generará automáticamente porciones visuales intuitivas (1/4 de plato, puño, palma o taza) para que puedas seleccionarlas rápidamente.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition"
            >
              Guardar en mi Base de Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

