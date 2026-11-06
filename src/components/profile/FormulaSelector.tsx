'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { TMBFormula } from '../../types';
import { calculateTMB } from '../../lib/calculations';
import { Activity, Flame, Info } from 'lucide-react';

export default function FormulaSelector() {
  const { biometrics, updateBiometricsField } = useNutrition();

  const formulas: {
    id: TMBFormula;
    name: string;
    subtitle: string;
    description: string;
    requiresFat: boolean;
  }[] = [
    {
      id: 'mifflin',
      name: 'Mifflin-St Jeor',
      subtitle: 'Por defecto (Recomendada)',
      description: 'Fórmula estándar de mayor precisión para adultos modernos saludables.',
      requiresFat: false,
    },
    {
      id: 'harris',
      name: 'Harris-Benedict',
      subtitle: 'Revisada (1984)',
      description: 'Ecuación clásica ajustada por Roza & Shizgal según peso y talla.',
      requiresFat: false,
    },
    {
      id: 'katch',
      name: 'Katch-McArdle',
      subtitle: 'Masa Libre de Grasa',
      description: 'Ideal para atletas y deportistas con medición de composición corporal.',
      requiresFat: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ecuación de Tasa Metabólica Basal (TMB)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selecciona el algoritmo de cálculo basal
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {formulas.map((f) => {
          const isSelected = biometrics.formula === f.id;
          const isDisabled = f.requiresFat && !biometrics.bodyFatPercentage;

          // Calcular TMB simulada para cada una
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
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500 shadow-sm'
                  : isDisabled
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-60 cursor-not-allowed'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {f.name}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {simulatedTMB} kcal
                </span>
              </div>

              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                {f.subtitle}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {f.description}
              </p>

              {isDisabled && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Requiere ingresar % de grasa
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

