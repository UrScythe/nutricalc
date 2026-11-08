'use client';

import React, { useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { calculateEquivalents } from '../../lib/exchanges';
import ComparisonCard from './ComparisonCard';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface ExchangeModalProps {
  onClose: () => void;
}

export default function ExchangeModal({ onClose }: ExchangeModalProps) {
  const { activeEntryToExchange, availableFoods, applyExchange } = useNutrition();

  const equivalents = useMemo(() => {
    if (!activeEntryToExchange) return [];
    return calculateEquivalents(activeEntryToExchange, availableFoods);
  }, [activeEntryToExchange, availableFoods]);

  if (!activeEntryToExchange) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-stone-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔄</span>
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Sustitutos Equivalentes
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                Alimentos del grupo <strong className="capitalize text-emerald-600 dark:text-emerald-400">{activeEntryToExchange.category}</strong> con calorías iguales (±5%)
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

        {/* Resumen del alimento a reemplazar */}
        <div className="px-6 py-3.5 bg-stone-50/80 dark:bg-slate-800/40 border-b border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 font-medium">Reemplazando:</span>{' '}
            <strong className="text-stone-900 dark:text-white font-black">
              {activeEntryToExchange.foodName}
            </strong>{' '}
            <span className="text-stone-500">
              ({activeEntryToExchange.portionUsed || `${activeEntryToExchange.grams}g`})
            </span>
          </div>

          <div className="font-black text-stone-800 dark:text-slate-200">
            {activeEntryToExchange.calories} kcal • P: {activeEntryToExchange.protein}g • C: {activeEntryToExchange.carbs}g • G: {activeEntryToExchange.fat}g
          </div>
        </div>

        {/* Lista de Sugerencias */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {equivalents.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              <span className="text-4xl block mb-2">🍽️</span>
              <p className="font-bold">No hay otros alimentos registrados en la categoría {activeEntryToExchange.category}.</p>
              <p className="mt-1">Agrega más alimentos en &quot;Mi Plato & Alimentos&quot; para habilitar más sustituciones.</p>
            </div>
          ) : (
            equivalents.map((sub) => (
              <ComparisonCard
                key={sub.food.id}
                original={activeEntryToExchange}
                replacement={sub}
                onApply={() => {
                  applyExchange(activeEntryToExchange.id, sub);
                  onClose();
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
