'use client';

import React from 'react';
import { FoodEntry } from '../../types';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRightLeft, Trash2, PieChart } from 'lucide-react';

interface FoodEntryCardProps {
  entry: FoodEntry;
}

export default function FoodEntryCard({ entry }: FoodEntryCardProps) {
  const { removeFoodEntry, setActiveEntryToExchange, setCurrentStep } = useNutrition();

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'proteina':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
      case 'carbohidrato':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      case 'grasa':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300';
      case 'verdura':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case 'fruta':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
      case 'lacteo':
        return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const handleStartExchange = () => {
    setActiveEntryToExchange(entry);
    // Cambiar visualmente al modal o pestaña de intercambio
  };

  return (
    <div className="p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Alimento y porción */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getCategoryBadge(
              entry.category
            )}`}
          >
            {entry.category}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">
            {entry.meal}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
          {entry.foodName}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
          <PieChart className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            {entry.portionUsed ? entry.portionUsed : `${entry.grams}g`} ({entry.grams}g exactos)
          </span>
        </p>
      </div>

      {/* Macros en tiempo real */}
      <div className="flex items-center gap-3 text-xs shrink-0 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Calorías</p>
          <p className="font-bold text-slate-900 dark:text-white">{entry.calories} kcal</p>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-violet-500 font-semibold uppercase">P</p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">{entry.protein}g</p>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-amber-500 font-semibold uppercase">C</p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">{entry.carbs}g</p>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-pink-500 font-semibold uppercase">G</p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">{entry.fat}g</p>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center gap-2 shrink-0 justify-end">
        {/* Botón Intercambiar */}
        <button
          type="button"
          onClick={handleStartExchange}
          title="Intercambiar por un alimento equivalente (±5%)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800 transition"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Intercambiar</span>
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={() => removeFoodEntry(entry.id)}
          title="Eliminar alimento del registro"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

