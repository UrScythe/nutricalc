'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNutrition } from '../../context/NutritionContext';
import { Flame, Utensils, Repeat, Check } from 'lucide-react';

export default function StepIndicator() {
  const { currentStep, setCurrentStep, getdResult, foodEntries } = useNutrition();

  const steps = [
    {
      number: 1,
      icon: Flame,
      color: '#FF2D55', // Apple Coral/Move
      label: 'Gasto & METs',
      helper: `${getdResult.totalGETD.toLocaleString()} kcal`,
    },
    {
      number: 2,
      icon: Utensils,
      color: '#30D158', // Apple Neon Green/Exercise
      label: 'Ingesta Diaria',
      helper: `${foodEntries.length} alimentos`,
    },
    {
      number: 3,
      icon: Repeat,
      color: '#0A84FF', // Apple Azure/Stand
      label: 'Intercambios',
      helper: 'Equivalencias ±5%',
    },
  ];

  return (
    <div className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 py-3 px-4 sticky top-16 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        <div className="grid grid-cols-3 gap-2 w-full">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isDone = currentStep > step.number;
            const Icon = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setCurrentStep(step.number as 1 | 2 | 3)}
                className={`flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all apple-btn text-left border ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 border-zinc-300/80 dark:border-zinc-700 shadow-sm'
                    : 'bg-zinc-100/70 dark:bg-zinc-900/50 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : isDone
                      ? 'text-[#30D158] bg-[#30D158]/10'
                      : 'text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800'
                  }`}
                  style={isActive ? { backgroundColor: step.color } : undefined}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  )}
                </div>

                <div className="min-w-0 flex-1 hidden sm:block">
                  <p
                    className={`text-xs font-bold truncate ${
                      isActive
                        ? 'text-zinc-900 dark:text-white'
                        : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {step.helper}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
