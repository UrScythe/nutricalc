'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { FoodCategory, Food } from '../../types';
import PlateVisualizer from './PlateVisualizer';
import CustomFoodModal from './CustomFoodModal';
import { Database, Plus, Search, RotateCcw, Trash2, PieChart, Sparkles } from 'lucide-react';

export default function FoodManagerView() {
  const { availableFoods, resetFoods, deleteCustomFood } = useNutrition();

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
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#30D158] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Base de Datos Nutricional</span>
            </span>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
              Catálogo de Alimentos & Medidas Prácticas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {availableFoods.length} alimentos registrados ({customCount} personalizados propios).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetFoods}
              title="Restablecer base de datos inicial"
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition flex items-center gap-1.5 apple-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Semilla</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#0071e3] hover:bg-[#0077ED] text-white shadow-sm transition flex items-center gap-1.5 apple-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Alimento Propio</span>
            </button>
          </div>
        </div>

        {/* Buscador y Filtros */}
        <div className="space-y-3 mb-5">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en tu base de datos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['todas', 'proteina', 'carbohidrato', 'grasa', 'verdura', 'fruta', 'lacteo'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all apple-btn ${
                    categoryFilter === cat
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30 flex flex-col justify-between apple-card-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {food.category}
                  </span>
                  {food.isCustom && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        Propio
                      </span>
                      {deleteCustomFood && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`¿Eliminar ${food.name} de tu catálogo?`)) {
                              deleteCustomFood(food.id);
                            }
                          }}
                          className="p-1 text-zinc-400 hover:text-rose-500 transition"
                          title="Eliminar alimento personalizado"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{food.emoji || '🍽️'}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {food.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  <strong className="text-zinc-900 dark:text-white">{food.caloriesPer100g} kcal</strong>
                  <span>•</span>
                  <span>P: {food.proteinPer100g}g</span>
                  <span>•</span>
                  <span>C: {food.carbsPer100g}g</span>
                  <span>•</span>
                  <span>G: {food.fatPer100g}g</span>
                </div>
              </div>

              {food.visualPortions && food.visualPortions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1 mb-1">
                    <PieChart className="w-3 h-3 text-[#30D158]" />
                    <span>Medidas en plato:</span>
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
