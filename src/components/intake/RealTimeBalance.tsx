'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNutrition } from '../../context/NutritionContext';
import NumberTicker from '../ui/NumberTicker';
import { ArrowRight, Activity, Scale } from 'lucide-react';

export default function RealTimeBalance() {
  const { getdResult, intakeTotals, setCurrentStep } = useNutrition();

  const targetKcal = getdResult.totalGETD || 2000;
  const currentKcal = intakeTotals.calories;
  const diffKcal = currentKcal - targetKcal;
  const percentConsumed = targetKcal > 0 ? Math.min(150, Math.round((currentKcal / targetKcal) * 100)) : 0;

  const ratio = currentKcal / targetKcal;
  let statusBadge = {
    title: 'Balance Óptimo',
    color: 'bg-[#30D158]/15 text-[#30D158] border-[#30D158]/20',
    subtitle: 'La ingesta actual coincide con el gasto calórico total diario.',
  };

  if (ratio < 0.75) {
    statusBadge = {
      title: `Déficit (${Math.abs(diffKcal)} kcal restantes)`,
      color: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
      subtitle: 'Margen disponible para completar requerimiento nutricional.',
    };
  } else if (ratio < 0.90) {
    statusBadge = {
      title: `Déficit Gradual (-${Math.abs(diffKcal)} kcal)`,
      color: 'bg-[#00C7BE]/15 text-[#00C7BE] border-[#00C7BE]/20',
      subtitle: 'Déficit adecuado para pérdida controlada de tejido adiposo.',
    };
  } else if (ratio > 1.25) {
    statusBadge = {
      title: `Superávit Marcado (+${diffKcal} kcal)`,
      color: 'bg-[#FF2D55]/15 text-[#FF2D55] border-[#FF2D55]/20',
      subtitle: 'Por encima del gasto total del día.',
    };
  } else if (ratio > 1.10) {
    statusBadge = {
      title: `Superávit Controlado (+${diffKcal} kcal)`,
      color: 'bg-[#0A84FF]/15 text-[#0A84FF] border-[#0A84FF]/20',
      subtitle: 'Aporte excedente orientado a hipertrofia o rendimiento.',
    };
  }

  // Dimensiones SVG Radial
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, percentConsumed / 100);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#30D158] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Balance Energético</span>
          </span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Meta del Día: <NumberTicker value={targetKcal} /> kcal
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Comparativa en tiempo real entre el gasto calórico total y la comida registrada.
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${statusBadge.color}`}>
          {statusBadge.title}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radial Progress Gauge animado con Framer Motion */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Track base */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                className="text-zinc-100 dark:text-zinc-800"
              />
              {/* Anillo de progreso animado */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeLinecap="round"
                fill="transparent"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={
                  ratio > 1.15
                    ? 'text-[#FF2D55]'
                    : ratio >= 0.9
                    ? 'text-[#30D158]'
                    : 'text-amber-500'
                }
              />
            </svg>

            {/* Contador de calorías NumberTicker en el centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                <NumberTicker value={currentKcal} />
              </span>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 mt-0.5">
                de {targetKcal} kcal
              </span>
              <span className="text-xs font-bold text-[#30D158] mt-1">
                {percentConsumed}% completado
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 text-center max-w-xs">
            {statusBadge.subtitle}
          </p>
        </div>

        {/* Tarjetas Bento de Macronutrientes con Ticker */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Proteínas */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5856D6] mx-auto mb-2" />
              <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                Proteína
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.protein} />g
              </p>
              <p className="text-[11px] text-zinc-400">
                {Math.round(intakeTotals.protein * 4)} kcal
              </p>
            </div>

            {/* Carbohidratos */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF9500] mx-auto mb-2" />
              <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                Carbohidratos
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.carbs} />g
              </p>
              <p className="text-[11px] text-zinc-400">
                {Math.round(intakeTotals.carbs * 4)} kcal
              </p>
            </div>

            {/* Grasas */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] mx-auto mb-2" />
              <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                Grasas
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.fat} />g
              </p>
              <p className="text-[11px] text-zinc-400">
                {Math.round(intakeTotals.fat * 9)} kcal
              </p>
            </div>
          </div>

          {/* Botón hacia Paso 3 */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 apple-btn"
            >
              <span>Explorar Intercambios (Etapa 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
