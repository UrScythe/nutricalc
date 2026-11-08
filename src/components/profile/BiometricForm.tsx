'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Sparkles, Minus, Plus, Heart } from 'lucide-react';

export default function BiometricForm() {
  const { biometrics, updateBiometricsField } = useNutrition();

  const heightM = biometrics.height / 100;
  const bmi =
    heightM > 0 && biometrics.weight > 0
      ? Number((biometrics.weight / (heightM * heightM)).toFixed(1))
      : 0;

  const getBmiBadge = (val: number) => {
    if (val === 0) return null;
    if (val < 18.5)
      return { label: 'Bajo peso 🌾', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
    if (val < 25)
      return { label: '¡Peso saludable! 🌿', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' };
    if (val < 30)
      return { label: 'Sobrepeso leve ⚖️', color: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' };
    return { label: 'Atención nutricional 💡', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' };
  };

  const bmiInfo = getBmiBadge(bmi);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Medidas del Paciente
          </div>
          <h2 className="text-xl font-black text-stone-900 dark:text-white">
            ¿Cómo es su cuerpo hoy?
          </h2>
          <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
            Ingresa estos datos para calibrar su gasto metabólico basal.
          </p>
        </div>

        {bmiInfo && (
          <div className={`px-4 py-2 rounded-2xl text-xs font-extrabold ${bmiInfo.color} shadow-sm`}>
            <span>IMC: {bmi}</span> • <span>{bmiInfo.label}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sexo Biológico */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-stone-600 dark:text-slate-400 mb-2">
            Sexo Biológico
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'male')}
              className={`py-3 text-xs font-black rounded-xl transition-all bouncy-hover ${
                biometrics.sex === 'male'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Hombre 👨
            </button>
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'female')}
              className={`py-3 text-xs font-black rounded-xl transition-all bouncy-hover ${
                biometrics.sex === 'female'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Mujer 👩
            </button>
          </div>
        </div>

        {/* Edad con botones + y - */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800">
          <label className="text-xs font-bold text-stone-600 dark:text-slate-400 block mb-1">
            Edad
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => updateBiometricsField('age', Math.max(10, biometrics.age - 1))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="text-center">
              <span className="text-2xl font-black text-stone-900 dark:text-white">
                {biometrics.age}
              </span>
              <span className="text-xs text-stone-400 block font-semibold">años</span>
            </div>
            <button
              type="button"
              onClick={() => updateBiometricsField('age', Math.min(110, biometrics.age + 1))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Peso (kg) con botones + y - */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800">
          <label className="text-xs font-bold text-stone-600 dark:text-slate-400 block mb-1">
            Peso corporal
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => updateBiometricsField('weight', Math.max(30, Number((biometrics.weight - 0.5).toFixed(1))))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="text-center">
              <input
                type="number"
                step="0.5"
                value={biometrics.weight}
                onChange={(e) => updateBiometricsField('weight', Number(e.target.value) || 0)}
                className="w-20 text-center text-2xl font-black text-stone-900 dark:text-white bg-transparent focus:outline-none"
              />
              <span className="text-xs text-stone-400 block font-semibold">kilogramos</span>
            </div>
            <button
              type="button"
              onClick={() => updateBiometricsField('weight', Math.min(250, Number((biometrics.weight + 0.5).toFixed(1))))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Altura (cm) con botones + y - */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800">
          <label className="text-xs font-bold text-stone-600 dark:text-slate-400 block mb-1">
            Estatura
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => updateBiometricsField('height', Math.max(100, biometrics.height - 1))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="text-center">
              <input
                type="number"
                value={biometrics.height}
                onChange={(e) => updateBiometricsField('height', Number(e.target.value) || 0)}
                className="w-20 text-center text-2xl font-black text-stone-900 dark:text-white bg-transparent focus:outline-none"
              />
              <span className="text-xs text-stone-400 block font-semibold">centímetros</span>
            </div>
            <button
              type="button"
              onClick={() => updateBiometricsField('height', Math.min(230, biometrics.height + 1))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center font-bold text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* % Grasa opcional */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <div>
            <p className="font-bold text-stone-800 dark:text-slate-200">
              ¿Tienes medición de grasa corporal? (Opcional)
            </p>
            <p className="text-stone-400">
              Si la conoces, habilitará la fórmula Katch-McArdle basada en masa magra muscular.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.5"
            placeholder="Ej: 18.5"
            value={biometrics.bodyFatPercentage || ''}
            onChange={(e) =>
              updateBiometricsField(
                'bodyFatPercentage',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-28 px-3 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-center font-bold text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
          />
          <span className="font-bold text-stone-500">% grasa</span>
        </div>
      </div>
    </div>
  );
}
