'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Minus, Plus, Activity, User } from 'lucide-react';

export default function BiometricForm() {
  const { biometrics, updateBiometricsField } = useNutrition();

  const heightM = biometrics.height / 100;
  const bmi =
    heightM > 0 && biometrics.weight > 0
      ? Number((biometrics.weight / (heightM * heightM)).toFixed(1))
      : 0;

  const getBmiDetails = (val: number) => {
    if (val === 0) return null;
    if (val < 18.5)
      return { label: 'Bajo peso', color: 'bg-amber-500/15 text-amber-500 border-amber-500/20' };
    if (val < 25)
      return { label: 'Peso saludable', color: 'bg-[#30D158]/15 text-[#30D158] border-[#30D158]/20' };
    if (val < 30)
      return { label: 'Sobrepeso', color: 'bg-amber-500/15 text-amber-500 border-amber-500/20' };
    return { label: 'Obesidad', color: 'bg-[#FF2D55]/15 text-[#FF2D55] border-[#FF2D55]/20' };
  };

  const bmiInfo = getBmiDetails(bmi);

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D55] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Biometría Clínica</span>
          </span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Parámetros Antropométricos
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Base para el cálculo de la Tasa Metabólica Basal (TMB).
          </p>
        </div>

        {bmiInfo && (
          <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${bmiInfo.color} flex items-center gap-2`}>
            <span>IMC: {bmi}</span>
            <span>•</span>
            <span>{bmiInfo.label}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sexo Biológico */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col justify-between">
          <label className="text-xs font-semibold text-zinc-500 mb-2">
            Sexo Biológico
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl">
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'male')}
              className={`py-2 text-xs font-bold rounded-lg transition-all apple-btn ${
                biometrics.sex === 'male'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              Masculino
            </button>
            <button
              type="button"
              onClick={() => updateBiometricsField('sex', 'female')}
              className={`py-2 text-xs font-bold rounded-lg transition-all apple-btn ${
                biometrics.sex === 'female'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              Femenino
            </button>
          </div>
        </div>

        {/* Edad */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
          <label className="text-xs font-semibold text-zinc-500 mb-2 block">
            Edad
          </label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              min="10"
              max="120"
              value={biometrics.age}
              onChange={(e) => updateBiometricsField('age', Math.max(1, parseInt(e.target.value) || 0))}
              className="text-2xl font-bold text-zinc-900 dark:text-white bg-transparent w-20 focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 mr-1">años</span>
              <button
                type="button"
                onClick={() => updateBiometricsField('age', Math.max(1, biometrics.age - 1))}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateBiometricsField('age', biometrics.age + 1)}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Peso en kg */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
          <label className="text-xs font-semibold text-zinc-500 mb-2 block">
            Peso Corporal
          </label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              step="0.5"
              min="30"
              max="300"
              value={biometrics.weight}
              onChange={(e) => updateBiometricsField('weight', Math.max(1, parseFloat(e.target.value) || 0))}
              className="text-2xl font-bold text-zinc-900 dark:text-white bg-transparent w-20 focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 mr-1">kg</span>
              <button
                type="button"
                onClick={() => updateBiometricsField('weight', Math.max(1, Number((biometrics.weight - 0.5).toFixed(1))))}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateBiometricsField('weight', Number((biometrics.weight + 0.5).toFixed(1)))}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Altura en cm */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
          <label className="text-xs font-semibold text-zinc-500 mb-2 block">
            Estatura
          </label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              min="100"
              max="250"
              value={biometrics.height}
              onChange={(e) => updateBiometricsField('height', Math.max(1, parseInt(e.target.value) || 0))}
              className="text-2xl font-bold text-zinc-900 dark:text-white bg-transparent w-20 focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 mr-1">cm</span>
              <button
                type="button"
                onClick={() => updateBiometricsField('height', Math.max(1, biometrics.height - 1))}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateBiometricsField('height', biometrics.height + 1)}
                className="w-7 h-7 rounded-lg bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 apple-btn"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
