'use client';

import React, { useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { calculateEquivalents } from '../../lib/exchanges';
import ComparisonCard from './ComparisonCard';
import { X, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';

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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Motor de Intercambios Inteligentes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sustituciones de la categoría <strong className="capitalize text-emerald-600 dark:text-emerald-400">{activeEntryToExchange.category}</strong>
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

        {/* Resumen del alimento a reemplazar */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">Reemplazando:</span>{' '}
            <strong className="text-slate-900 dark:text-white font-bold">
              {activeEntryToExchange.foodName}
            </strong>{' '}
            <span className="text-slate-500">
              ({activeEntryToExchange.portionUsed || `${activeEntryToExchange.grams}g`})
            </span>
          </div>

          <div className="font-semibold text-slate-800 dark:text-slate-200">
            {activeEntryToExchange.calories} kcal • P: {activeEntryToExchange.protein}g • C: {activeEntryToExchange.carbs}g • G: {activeEntryToExchange.fat}g
          </div>
        </div>

        {/* Lista de Sugerencias Equivalentes */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {equivalents.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No se encontraron otros alimentos registrados en la categoría {activeEntryToExchange.category}.</p>
              <p className="mt-1">Agrega más alimentos en &quot;Mis Alimentos&quot; para habilitar más sustituciones.</p>
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

