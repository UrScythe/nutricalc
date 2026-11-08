'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNutrition } from '../../context/NutritionContext';
import NumberTicker from '../ui/NumberTicker';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function RealTimeBalance() {
  const { getdResult, intakeTotals, setCurrentStep } = useNutrition();

  const targetKcal = getdResult.totalGETD || 2000;
  const currentKcal = intakeTotals.calories;
  const diffKcal = currentKcal - targetKcal;
  const percentConsumed = targetKcal > 0 ? Math.min(150, Math.round((currentKcal / targetKcal) * 100)) : 0;

  const ratio = currentKcal / targetKcal;
  let statusBadge = {
    emoji: '🌿',
    title: '¡En excelente balance!',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    subtitle: 'La energía del plato coincide con su gasto diario.',
  };

  if (ratio < 0.75) {
    statusBadge = {
      emoji: '🥗',
      title: `Déficit calórico (${Math.abs(diffKcal)} kcal restantes)`,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      subtitle: 'Aún queda espacio en el plato para sumar energía y nutrientes.',
    };
  } else if (ratio < 0.90) {
    statusBadge = {
      emoji: '🔥',
      title: `Déficit gradual óptimo (-${Math.abs(diffKcal)} kcal)`,
      color: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
      subtitle: 'Ideal para reducción progresiva de grasa corporal.',
    };
  } else if (ratio > 1.25) {
    statusBadge = {
      emoji: '⚡',
      title: `Superávit alto (+${diffKcal} kcal)`,
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      subtitle: 'Por encima del gasto total del día.',
    };
  } else if (ratio > 1.10) {
    statusBadge = {
      emoji: '💪',
      title: `Superávit controlado (+${diffKcal} kcal)`,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      subtitle: 'Excelente para construcción de masa muscular magra.',
    };
  }

  // Dimensiones SVG Radial
  const size = 180;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, percentConsumed / 100);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Balance Energético en Tiempo Real (21st.dev Gauge)</span>
          </div>
          <h3 className="text-xl font-black text-stone-900 dark:text-white">
            Meta del Día: <NumberTicker value={targetKcal} /> kcal
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
            Comparativa dinámica entre el gasto energético total y la comida servida.
          </p>
        </div>

        <motion.div
          layout
          className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 ${statusBadge.color} shadow-sm`}
        >
          <span className="text-base">{statusBadge.emoji}</span>
          <span>{statusBadge.title}</span>
        </motion.div>
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
                className="text-stone-100 dark:text-slate-800"
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
                    ? 'text-rose-500'
                    : ratio >= 0.9
                    ? 'text-emerald-500'
                    : 'text-amber-500'
                }
              />
            </svg>

            {/* Contador de calorías NumberTicker en el centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                <NumberTicker value={currentKcal} />
              </span>
              <span className="text-[10px] uppercase font-bold text-stone-400 mt-0.5">
                de {targetKcal} kcal
              </span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {percentConsumed}% completado
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-3 text-center max-w-xs">
            {statusBadge.subtitle}
          </p>
        </div>

        {/* Tarjetas Bento de Macronutrientes con Ticker */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Proteínas */}
            <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800 bouncy-hover">
              <span className="text-2xl block mb-1">🍗</span>
              <p className="text-[11px] font-black uppercase text-purple-700 dark:text-purple-300">
                Proteína
              </p>
              <p className="text-xl font-black text-stone-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.protein} />g
              </p>
              <p className="text-[10px] text-stone-400 font-bold">
                {Math.round(intakeTotals.protein * 4)} kcal
              </p>
            </div>

            {/* Carbohidratos */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800 bouncy-hover">
              <span className="text-2xl block mb-1">🍚</span>
              <p className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300">
                Carbos
              </p>
              <p className="text-xl font-black text-stone-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.carbs} />g
              </p>
              <p className="text-[10px] text-stone-400 font-bold">
                {Math.round(intakeTotals.carbs * 4)} kcal
              </p>
            </div>

            {/* Grasas */}
            <div className="p-4 rounded-2xl bg-pink-50/80 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-800 bouncy-hover">
              <span className="text-2xl block mb-1">🥑</span>
              <p className="text-[11px] font-black uppercase text-pink-700 dark:text-pink-300">
                Grasas
              </p>
              <p className="text-xl font-black text-stone-900 dark:text-white mt-0.5">
                <NumberTicker value={intakeTotals.fat} />g
              </p>
              <p className="text-[10px] text-stone-400 font-bold">
                {Math.round(intakeTotals.fat * 9)} kcal
              </p>
            </div>
          </div>

          {/* Botón hacia Paso 3 */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-stone-900 text-xs sm:text-sm font-black shadow-md transition flex items-center justify-center gap-2 bouncy-hover"
            >
              <span>¡Explorar Intercambios Inteligentes! (Paso 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
