'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Flame, Utensils, TrendingUp, TrendingDown, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RealTimeBalance() {
  const { getdResult, intakeTotals, setCurrentStep } = useNutrition();

  const targetKcal = getdResult.totalGETD || 2000;
  const currentKcal = intakeTotals.calories;
  const diffKcal = currentKcal - targetKcal;
  const percentConsumed = targetKcal > 0 ? Math.min(150, Math.round((currentKcal / targetKcal) * 100)) : 0;

  // Clasificación del balance
  // Equilibrio: ±10%
  // Déficit moderado: -10% a -25%
  // Déficit marcado: < -25%
  // Superávit moderado: +10% a +25%
  // Superávit marcado: > +25%
  const ratio = currentKcal / targetKcal;
  let statusBadge = {
    label: 'Equilibrado',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: CheckCircle2,
    subText: 'Ingesta ajustada al gasto diario',
  };

  if (ratio < 0.75) {
    statusBadge = {
      label: `Déficit marcado (${Math.abs(diffKcal)} kcal)`,
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      icon: TrendingDown,
      subText: 'Por debajo del requerimiento energético',
    };
  } else if (ratio < 0.90) {
    statusBadge = {
      label: `Déficit moderado (${Math.abs(diffKcal)} kcal)`,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      icon: TrendingDown,
      subText: 'Apropiado para pérdida de grasa gradual',
    };
  } else if (ratio > 1.25) {
    statusBadge = {
      label: `Superávit marcado (+${diffKcal} kcal)`,
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      icon: TrendingUp,
      subText: 'Superávit alto para mantenimiento',
    };
  } else if (ratio > 1.10) {
    statusBadge = {
      label: `Superávit moderado (+${diffKcal} kcal)`,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      icon: TrendingUp,
      subText: 'Apropiado para aumento de masa muscular',
    };
  }

  // SVG Circular Gauge calculations
  const size = 150;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, percentConsumed) / 100) * circumference;

  const StatusIcon = statusBadge.icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Balance Energético en Tiempo Real
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparativa: Gasto Diario (GETD) vs Ingesta Actual
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${statusBadge.color}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusBadge.label}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Gráfico Donut SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Círculo de Fondo (Gasto Objetivo) */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              {/* Círculo de Progreso (Ingesta) */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className={`transition-all duration-500 ${
                  ratio > 1.15
                    ? 'text-rose-500'
                    : ratio >= 0.9
                    ? 'text-emerald-500'
                    : 'text-amber-500'
                }`}
              />
            </svg>

            {/* Texto Central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {currentKcal}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                de {targetKcal} kcal
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {percentConsumed}%
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
            {statusBadge.subText}
          </p>
        </div>

        {/* Desglose de Macronutrientes Acumulados */}
        <div className="md:col-span-7 space-y-3">
          <div className="grid grid-cols-3 gap-2.5 text-center">
            {/* Proteínas */}
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <p className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">
                Proteína
              </p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {intakeTotals.protein}g
              </p>
              <p className="text-[10px] text-slate-500">
                {Math.round(intakeTotals.protein * 4)} kcal
              </p>
            </div>

            {/* Carbohidratos */}
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <p className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                Carbohidratos
              </p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {intakeTotals.carbs}g
              </p>
              <p className="text-[10px] text-slate-500">
                {Math.round(intakeTotals.carbs * 4)} kcal
              </p>
            </div>

            {/* Grasas */}
            <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
              <p className="text-[10px] uppercase font-bold text-pink-600 dark:text-pink-400">
                Grasas
              </p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {intakeTotals.fat}g
              </p>
              <p className="text-[10px] text-slate-500">
                {Math.round(intakeTotals.fat * 9)} kcal
              </p>
            </div>
          </div>

          {/* Botón hacia el Paso 3 */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow transition flex items-center justify-center gap-2"
            >
              <span>Ver Intercambios Inteligentes (Paso 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

