'use client';

import React, { useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { calculateEquivalents } from '../../lib/exchanges';
import ComparisonCard from './ComparisonCard';
import { X, Repeat, Utensils } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#1c1c1e] border border-zinc-200/80 dark:border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Sustitutos Equivalentes
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Alimentos del grupo <strong className="capitalize text-[#0A84FF]">{activeEntryToExchange.category}</strong> con calorías iguales (±5%)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition apple-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Resumen del alimento a reemplazar */}
        <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <div>
            <span className="text-zinc-400 font-medium">Original:</span>{' '}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {activeEntryToExchange.foodName}
            </strong>{' '}
            <span className="text-zinc-500">
              ({activeEntryToExchange.portionUsed || `${activeEntryToExchange.grams}g`})
            </span>
          </div>

          <div className="font-semibold text-zinc-700 dark:text-zinc-300">
            {activeEntryToExchange.calories} kcal • P: {activeEntryToExchange.protein}g • C: {activeEntryToExchange.carbs}g • G: {activeEntryToExchange.fat}g
          </div>
        </div>

        {/* Lista de Sugerencias */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {equivalents.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              <Utensils className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-400" />
              <p className="font-bold text-zinc-700 dark:text-zinc-300">
                No hay otros alimentos registrados en la categoría {activeEntryToExchange.category}.
              </p>
              <p className="mt-1">Agrega más alimentos en la sección &quot;Base de Alimentos&quot; para habilitar más sustituciones.</p>
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
