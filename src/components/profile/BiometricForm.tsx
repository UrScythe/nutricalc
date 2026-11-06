'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { User, Activity, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function BiometricForm() {
  const { biometrics, updateBiometricsField } = useNutrition();

  // Cálculo del IMC en tiempo real
  const heightM = biometrics.height / 100;
  const bmi = heightM > 0 && biometrics.weight > 0 ? Number((biometrics.weight / (heightM * heightM)).toFixed(1)) : 0;

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Bajo peso', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
    if (val < 25) return { label: 'Peso saludable', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' };
    if (val < 30) return { label: 'Sobrepeso', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
    return { label: 'Obesidad', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' };
  };

  const bmiInfo = getBmiCategory(bmi);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Datos Biométricos</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Medidas antropométricas base</p>
          </div>
        </div>

        {bmi > 0 && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bmiInfo.color} flex items-center gap-1.5`}>
            <span>IMC: {bmi}</span>
            <span className="hidden sm:inline">({bmiInfo.label})</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Sexo Biológico */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Sexo Biológico
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'male')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                biometrics.sex === 'male'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Hombre
            </button>
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'female')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                biometrics.sex === 'female'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Mujer
            </button>
          </div>
        </div>

        {/* Edad */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Edad (años)
          </label>
          <div className="relative">
            <input
              type="number"
              min={10}
              max={110}
              value={biometrics.age}
              onChange={(e) => updateBiometricsField('age', Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">años</span>
          </div>
        </div>

        {/* Peso */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Peso corporal
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.5"
              min={30}
              max={250}
              value={biometrics.weight}
              onChange={(e) => updateBiometricsField('weight', Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">kg</span>
          </div>
        </div>

        {/* Altura */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Estatura
          </label>
          <div className="relative">
            <input
              type="number"
              min={100}
              max={230}
              value={biometrics.height}
              onChange={(e) => updateBiometricsField('height', Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">cm</span>
          </div>
        </div>

        {/* % Grasa Corporal (Opcional) */}
        <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Porcentaje de Grasa Corporal (Opcional)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Permite habilitar la fórmula Katch-McArdle basada en masa libre de grasa.
              </p>
            </div>
          </div>

          <div className="relative w-36">
            <input
              type="number"
              step="0.5"
              min={3}
              max={60}
              placeholder="Ej. 18"
              value={biometrics.bodyFatPercentage || ''}
              onChange={(e) =>
                updateBiometricsField(
                  'bodyFatPercentage',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">% grasa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

