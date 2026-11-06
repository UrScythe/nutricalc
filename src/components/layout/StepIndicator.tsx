'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { UserCheck, Utensils, ArrowRightLeft, Check } from 'lucide-react';

export default function StepIndicator() {
  const { currentStep, setCurrentStep, getdResult, foodEntries } = useNutrition();

  const steps = [
    {
      number: 1,
      title: '1. Perfil & Gasto (GETD)',
      shortTitle: 'Perfil & METs',
      subtitle: `${getdResult.totalGETD} kcal/día`,
      icon: UserCheck,
      isCompleted: getdResult.totalGETD > 0,
    },
    {
      number: 2,
      title: '2. Registro de Ingesta',
      shortTitle: 'Ingesta 24h',
      subtitle: `${foodEntries.length} alimentos`,
      icon: Utensils,
      isCompleted: foodEntries.length > 0,
    },
    {
      number: 3,
      title: '3. Intercambios Inteligentes',
      shortTitle: 'Intercambios',
      subtitle: 'Sustitutos ±5%',
      icon: ArrowRightLeft,
      isCompleted: false,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isDone = step.isCompleted && currentStep > step.number;

            return (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number as 1 | 2 | 3)}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm ring-1 ring-emerald-500'
                    : isDone
                    ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-90'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm transition-colors ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isActive
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="hidden sm:inline">{step.title}</span>
                      <span className="sm:hidden">{step.shortTitle}</span>
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {step.subtitle}
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

