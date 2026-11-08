'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNutrition } from '../../context/NutritionContext';
import { Check, Sparkles } from 'lucide-react';

export default function StepIndicator() {
  const { currentStep, setCurrentStep, getdResult, foodEntries } = useNutrition();

  const steps = [
    {
      number: 1,
      emoji: '🏃‍♂️',
      title: 'Paso 1: Cuerpo & Actividad',
      helper: `${getdResult.totalGETD} kcal/día estimadas`,
      description: 'Gasto metabólico con METs',
    },
    {
      number: 2,
      emoji: '🥗',
      title: 'Paso 2: Plato del Día',
      helper: `${foodEntries.length} alimentos registrados`,
      description: 'Ingesta con porciones visuales',
    },
    {
      number: 3,
      emoji: '🔄',
      title: 'Paso 3: Intercambios Mágicos',
      helper: 'Equivalencias ±5%',
      description: 'Sustituciones instantáneas',
    },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 py-4 px-4 shadow-sm sticky top-20 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Barra superior animada con Framer Motion */}
        <div className="w-full h-2 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3.5 relative">
          <motion.div
            initial={false}
            animate={{ width: `${Math.max(15, progressPercentage)}%` }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full shadow-sm"
          />
        </div>

        {/* Pasos en botones grandes y suaves */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isDone = currentStep > step.number;

            return (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number as 1 | 2 | 3)}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all bouncy-hover relative overflow-hidden ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-emerald-400 shadow-md'
                    : isDone
                    ? 'border-stone-200 dark:border-slate-800 bg-stone-50/80 dark:bg-slate-800/40 opacity-80'
                    : 'border-stone-200/80 dark:border-slate-800 hover:bg-stone-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl sm:text-2xl">{step.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs sm:text-sm font-black truncate ${
                        isActive
                          ? 'text-emerald-900 dark:text-emerald-300'
                          : 'text-stone-800 dark:text-slate-200'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {isDone && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-bold text-stone-500 dark:text-slate-400 truncate pl-1">
                  {step.helper}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
