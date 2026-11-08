'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { TMBFormula } from '../../types';
import { calculateTMB } from '../../lib/calculations';
import { Flame, CheckCircle, Info } from 'lucide-react';

export default function FormulaSelector() {
  const { biometrics, updateBiometricsField } = useNutrition();

  const formulas: {
    id: TMBFormula;
    emoji: string;
    name: string;
    badge: string;
    description: string;
    requiresFat: boolean;
  }[] = [
    {
      id: 'mifflin',
      emoji: '⭐',
      name: 'Mifflin-St Jeor',
      badge: 'Recomendada por la Academia',
      description: 'La fórmula más exacta y validada para adultos en la actualidad.',
      requiresFat: false,
    },
    {
      id: 'harris',
      emoji: '📜',
      name: 'Harris-Benedict',
      badge: 'Revisada (1984)',
      description: 'Ecuación clásica ajustada según la estatura y edad.',
      requiresFat: false,
    },
    {
      id: 'katch',
      emoji: '🏋️',
      name: 'Katch-McArdle',
      badge: 'Masa Muscular Magra',
      description: 'Especial para atletas; quema más calorías por kilo de músculo.',
      requiresFat: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
          <span>Elige la fórmula de Tasa Metabólica Basal (TMB)</span>
        </h3>
        <p className="text-xs text-stone-500 dark:text-slate-400 font-medium mt-0.5">
          Calcula cuánta energía consume su cuerpo solo para mantenerse vivo en reposo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {formulas.map((f) => {
          const isSelected = biometrics.formula === f.id;
          const isDisabled = f.requiresFat && !biometrics.bodyFatPercentage;

          const simulatedTMB = calculateTMB({
            ...biometrics,
            formula: f.id,
          });

          return (
            <button
              key={f.id}
              type="button"
              disabled={isDisabled}
              onClick={() => updateBiometricsField('formula', f.id)}
              className={`p-5 rounded-2xl border text-left transition-all bouncy-hover relative flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-emerald-400 shadow-md'
                  : isDisabled
                  ? 'border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/30 opacity-60 cursor-not-allowed'
                  : 'border-stone-200/80 dark:border-slate-800 hover:border-emerald-200 bg-white dark:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{f.emoji}</span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-black ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-slate-200'
                    }`}
                  >
                    {simulatedTMB} kcal
                  </span>
                </div>

                <p className="font-extrabold text-sm text-stone-900 dark:text-white mb-1">
                  {f.name}
                </p>
                <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                  {f.badge}
                </p>
                <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>

              {isDisabled && (
                <div className="mt-3 text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Ingresa % de grasa arriba
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
