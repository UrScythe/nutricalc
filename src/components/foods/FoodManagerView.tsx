'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { FoodCategory, Food } from '../../types';
import PlateVisualizer from './PlateVisualizer';
import CustomFoodModal from './CustomFoodModal';
import { Database, Plus, Search, RotateCcw, Trash2, PieChart, Sparkles } from 'lucide-react';

export default function FoodManagerView() {
  const { availableFoods, resetFoods } = useNutrition();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFoods = useMemo(() => {
    return availableFoods.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = categoryFilter === 'todas' || f.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [availableFoods, searchTerm, categoryFilter]);

  const customCount = availableFoods.filter((f) => f.isCustom).length;

  return (
    <div className="space-y-6">
      {/* Guía Visual del Plato Educativo */}
      <PlateVisualizer />

      {/* Panel Gestor de Alimentos */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Base de Datos de Alimentos & Porciones</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {availableFoods.length} alimentos disponibles ({customCount} propios personalizados)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetFoods}
              title="Restablecer base de datos inicial"
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Semilla</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Alimento Propio</span>
            </button>
          </div>
        </div>

        {/* Buscador y Filtros */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en tu base de datos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['todas', 'proteina', 'carbohidrato', 'grasa', 'verdura', 'fruta', 'lacteo'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-purple-600 text-white'
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

        {/* Grid de Alimentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {food.category}
                  </span>
                  {food.isCustom && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Propio
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {food.name}
                </h4>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <strong className="text-slate-900 dark:text-white">{food.caloriesPer100g} kcal</strong>
                  <span>•</span>
                  <span>P: {food.proteinPer100g}g</span>
                  <span>•</span>
                  <span>C: {food.carbsPer100g}g</span>
                  <span>•</span>
                  <span>G: {food.fatPer100g}g</span>
                </div>
              </div>

              {food.visualPortions && food.visualPortions.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-0.5">
                    <PieChart className="w-3 h-3 text-emerald-500" />
                    <span>Porciones sugeridas:</span>
                  </p>
                  <p className="truncate">
                    {food.visualPortions.map((vp) => `${vp.label} (${vp.approxGrams}g)`).join(' • ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <CustomFoodModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

