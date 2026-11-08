'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AppleActivityRingsProps {
  // Ring 1: Gasto Calórico / Mover (Rojo Coral #FF2D55)
  moveCalories: number;
  moveTarget: number;

  // Ring 2: Ingesta / Nutrición (Verde Neón #30D158)
  intakeCalories: number;
  intakeTarget: number;

  // Ring 3: Horas de Actividad / Ejercicio (Azul Eléctrico #0A84FF)
  activityHours: number;
  activityTarget?: number; // 24 horas

  size?: number;
  strokeWidth?: number;
  showLabels?: boolean;
}

export default function AppleActivityRings({
  moveCalories,
  moveTarget,
  intakeCalories,
  intakeTarget,
  activityHours,
  activityTarget = 24,
  size = 220,
  strokeWidth = 16,
  showLabels = true,
}: AppleActivityRingsProps) {
  const center = size / 2;
  const gap = 4;

  // Ratios (clamped between 0 and 1.5 for visual ring progress)
  const moveRatio = moveTarget > 0 ? Math.min(1.5, moveCalories / moveTarget) : 0;
  const intakeRatio = intakeTarget > 0 ? Math.min(1.5, intakeCalories / intakeTarget) : 0;
  const hoursRatio = activityTarget > 0 ? Math.min(1, activityHours / activityTarget) : 0;

  // Radios concéntricos
  const r1 = center - strokeWidth / 2 - 2; // Exterior (Rojo)
  const r2 = r1 - strokeWidth - gap;      // Medio (Verde)
  const r3 = r2 - strokeWidth - gap;      // Interior (Azul)

  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const c3 = 2 * Math.PI * r3;

  const offset1 = c1 - Math.min(1, moveRatio) * c1;
  const offset2 = c2 - Math.min(1, intakeRatio) * c2;
  const offset3 = c3 - Math.min(1, hoursRatio) * c3;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Visualización de los 3 Anillos Concéntricos */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 drop-shadow-sm"
        >
          <defs>
            {/* Gradientes Oficiales Apple Fitness */}
            <linearGradient id="appleMoveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2D55" />
              <stop offset="100%" stopColor="#FF375F" />
            </linearGradient>
            <linearGradient id="appleIntakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#30D158" />
              <stop offset="100%" stopColor="#34C759" />
            </linearGradient>
            <linearGradient id="appleStandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C7BE" />
              <stop offset="100%" stopColor="#0A84FF" />
            </linearGradient>
          </defs>

          {/* Anillo 1: Fondo Exterior (Rojo Coral) */}
          <circle
            cx={center}
            cy={center}
            r={r1}
            stroke="#FF2D55"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            fill="transparent"
          />
          {/* Anillo 1: Progreso Exterior */}
          <motion.circle
            cx={center}
            cy={center}
            r={r1}
            stroke="url(#appleMoveGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={c1}
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: c1 }}
            animate={{ strokeDashoffset: offset1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Anillo 2: Fondo Medio (Verde Neón) */}
          <circle
            cx={center}
            cy={center}
            r={r2}
            stroke="#30D158"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            fill="transparent"
          />
          {/* Anillo 2: Progreso Medio */}
          <motion.circle
            cx={center}
            cy={center}
            r={r2}
            stroke="url(#appleIntakeGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={c2}
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: c2 }}
            animate={{ strokeDashoffset: offset2 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Anillo 3: Fondo Interior (Azul Eléctrico) */}
          <circle
            cx={center}
            cy={center}
            r={r3}
            stroke="#0A84FF"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            fill="transparent"
          />
          {/* Anillo 3: Progreso Interior */}
          <motion.circle
            cx={center}
            cy={center}
            r={r3}
            stroke="url(#appleStandGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={c3}
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: c3 }}
            animate={{ strokeDashoffset: offset3 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Centro del Anillo: Icono Sutil Apple Fitness */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Fitness
          </span>
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            {Math.round(intakeRatio * 100)}%
          </span>
        </div>
      </div>

      {/* Leyenda y Métricas estilo Apple Health */}
      {showLabels && (
        <div className="space-y-3.5 flex-1 min-w-[200px]">
          {/* Métrica 1: Gasto Calórico (Rojo) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#FF2D55] to-[#FF375F] shadow-sm shadow-[#FF2D55]/40" />
              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                  Gasto Total (GETD)
                </p>
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  {moveCalories.toLocaleString()} <span className="text-xs font-normal text-zinc-400">kcal</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#FF2D55]">
              Meta: {moveTarget}
            </span>
          </div>

          {/* Métrica 2: Ingesta (Verde) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#30D158] to-[#34C759] shadow-sm shadow-[#30D158]/40" />
              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                  Ingesta Ingerida
                </p>
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  {intakeCalories.toLocaleString()} <span className="text-xs font-normal text-zinc-400">kcal</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#30D158]">
              {Math.round(intakeRatio * 100)}%
            </span>
          </div>

          {/* Métrica 3: Horas Registradas (Azul) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#00C7BE] to-[#0A84FF] shadow-sm shadow-[#0A84FF]/40" />
              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                  Ciclo de Actividad
                </p>
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  {activityHours}h <span className="text-xs font-normal text-zinc-400">/ 24h</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0A84FF]">
              {activityHours >= 24 ? 'Completo' : `${24 - activityHours}h restantes`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

