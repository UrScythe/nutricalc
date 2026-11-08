'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNutrition } from '../../context/NutritionContext';
import { Flame, Utensils, Repeat, Check, Compass } from 'lucide-react';

export default function StepIndicator() {
  const { currentStep, setCurrentStep, getdResult, foodEntries } = useNutrition();

  const steps = [
    {
      number: 1,
      icon: Flame,
      color: '#FF2D55', // Apple Coral/Move
      activeBg: 'bg-[#FF2D55]/15 dark:bg-[#FF2D55]/25 border-[#FF2D55] ring-2 ring-[#FF2D55]/40 shadow-lg shadow-[#FF2D55]/20',
      activeText: 'text-[#FF2D55] dark:text-[#FF375F]',
      badgeColor: 'bg-[#FF2D55] text-white',
      bannerBg: 'bg-[#FF2D55]/10 border-[#FF2D55]/30',
      bannerTitle: 'MODO ACTUAL: PASO 1 — Gasto Calórico & Actividades METs',
      bannerDesc: 'Calibración de TMB basal (Mifflin/Harris/Katch) y asignación del ciclo de 24 horas.',
      label: 'Gasto & METs',
      helper: `${getdResult.totalGETD.toLocaleString()} kcal`,
    },
    {
      number: 2,
      icon: Utensils,
      color: '#30D158', // Apple Neon Green/Exercise
      activeBg: 'bg-[#30D158]/15 dark:bg-[#30D158]/25 border-[#30D158] ring-2 ring-[#30D158]/40 shadow-lg shadow-[#30D158]/20',
      activeText: 'text-[#30D158] dark:text-[#34C759]',
      badgeColor: 'bg-[#30D158] text-white',
      bannerBg: 'bg-[#30D158]/10 border-[#30D158]/30',
      bannerTitle: 'MODO ACTUAL: PASO 2 — Registro de Ingesta Diaria & Plato',
      bannerDesc: 'Servir desayuno, almuerzo, cena y snacks usando medidas visuales o gramos exactos.',
      label: 'Ingesta Diaria',
      helper: `${foodEntries.length} alimentos`,
    },
    {
      number: 3,
      icon: Repeat,
      color: '#0A84FF', // Apple Azure/Stand
      activeBg: 'bg-[#0A84FF]/15 dark:bg-[#0A84FF]/25 border-[#0A84FF] ring-2 ring-[#0A84FF]/40 shadow-lg shadow-[#0A84FF]/20',
      activeText: 'text-[#0A84FF] dark:text-[#0A84FF]',
      badgeColor: 'bg-[#0A84FF] text-white',
      bannerBg: 'bg-[#0A84FF]/10 border-[#0A84FF]/30',
      bannerTitle: 'MODO ACTUAL: PASO 3 — Motor de Intercambios Inteligentes',
      bannerDesc: 'Sustituciones instantáneas en el mismo grupo de alimentos con tolerancia de ±5%.',
      label: 'Intercambios',
      helper: 'Equivalencias ±5%',
    },
  ];

  const activeStepConfig = steps.find((s) => s.number === currentStep) || steps[0];

  return (
    <div className="w-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800 py-3.5 px-4 sticky top-16 z-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-2.5">
        {/* Selector de 3 Botones con Alto Contraste */}
        <div className="grid grid-cols-3 gap-2.5 w-full">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isDone = currentStep > step.number;
            const Icon = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setCurrentStep(step.number as 1 | 2 | 3)}
                className={`flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all apple-btn text-left border-2 ${
                  isActive
                    ? `${step.activeBg} scale-[1.01]`
                    : 'bg-zinc-100/70 dark:bg-zinc-900/80 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {/* Icono con badge o color */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                    isActive
                      ? 'text-white scale-105 shadow-sm'
                      : isDone
                      ? 'text-[#30D158] bg-[#30D158]/15'
                      : 'text-zinc-400 bg-zinc-200/70 dark:bg-zinc-800'
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
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-xs font-bold truncate ${
                        isActive
                          ? 'text-zinc-900 dark:text-white font-extrabold'
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: step.color }} />
                    )}
                  </div>
                  <p className={`text-[11px] truncate ${isActive ? step.activeText + ' font-semibold' : 'text-zinc-400'}`}>
                    {step.helper}
                  </p>
                </div>

                {/* Pill "Activo" en móviles y escritorios */}
                {isActive && (
                  <span
                    className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full text-white ml-auto hidden md:inline-block shadow-sm"
                    style={{ backgroundColor: step.color }}
                  >
                    Activo
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Banner Indicador de Modo Actual: Muestra claramente en qué modo se encuentra el usuario */}
        <div
          className={`w-full px-4 py-2.5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${activeStepConfig.bannerBg}`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm animate-pulse"
              style={{ backgroundColor: activeStepConfig.color }}
            />
            <div>
              <p
                className="text-xs font-extrabold tracking-wide uppercase"
                style={{ color: activeStepConfig.color }}
              >
                {activeStepConfig.bannerTitle}
              </p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                {activeStepConfig.bannerDesc}
              </p>
            </div>
          </div>

          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white self-start sm:self-center shrink-0 uppercase tracking-wider"
            style={{ backgroundColor: activeStepConfig.color }}
          >
            Paso {currentStep} de 3
          </span>
        </div>
      </div>
    </div>
  );
}
