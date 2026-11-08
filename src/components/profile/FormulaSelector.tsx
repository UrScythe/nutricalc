'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { TMBFormula } from '../../types';
import { calculateTMB } from '../../lib/calculations';
import { CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function FormulaSelector() {
  const { biometrics, updateBiometricsField } = useNutrition();

  const formulas: {
    id: TMBFormula;
    name: string;
    badge: string;
    description: string;
    requiresFat: boolean;
  }[] = [
    {
      id: 'mifflin',
      name: 'Mifflin-St Jeor',
      badge: 'Estándar Clínico Recomendado',
      description: 'Ecuación con mayor precisión y respaldo para adultos en la actualidad.',
      requiresFat: false,
    },
    {
      id: 'harris',
      name: 'Harris-Benedict',
      badge: 'Ecuación Revisada (1984)',
      description: 'Fórmula clásica ajustada con peso, talla y edad.',
      requiresFat: false,
    },
    {
      id: 'katch',
      name: 'Katch-McArdle',
      badge: 'Basada en Masa Magra',
      description: 'Óptima para deportistas de alto rendimiento con dato de pliegues/% grasa.',
      requiresFat: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      <div className="mb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D55] flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5" />
          <span>Metabolismo Basal</span>
        </span>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
          Ecuación para Tasa Metabólica Basal (TMB)
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Determina la energía mínima requerida por el organismo en reposo absoluto.
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
              className={`p-4 rounded-2xl border text-left transition-all apple-btn relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#FF2D55] bg-[#FF2D55]/5 dark:bg-[#FF2D55]/10 shadow-sm'
                  : isDisabled
                  ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 opacity-60 cursor-not-allowed'
                  : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 bg-zinc-50/50 dark:bg-zinc-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#FF2D55] text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {f.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#FF2D55]" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  {f.name}
                </h4>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">TMB estimada:</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {simulatedTMB} <span className="text-xs font-normal text-zinc-400">kcal/día</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
