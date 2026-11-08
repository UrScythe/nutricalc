'use client';

import React from 'react';
import { PieChart, ShieldCheck } from 'lucide-react';

export default function PlateVisualizer() {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#30D158]/10 text-[#30D158] flex items-center justify-center">
          <PieChart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
            Distribución del Plato Saludable & Porciones con las Manos
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Guía de referencia visual para estimar raciones sin depender exclusivamente de básculas de cocina.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Gráfico Visual del Plato estilo Apple Health */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 rounded-full border-8 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 p-3 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
              {/* Mitad Vegetales (1/2 = 50%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#30D158"
                strokeWidth="20"
                strokeDasharray="125.6 125.6"
                strokeDashoffset="0"
                className="hover:opacity-90 transition-opacity"
              />
              {/* Cuarto Proteínas (1/4 = 25%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#5856D6"
                strokeWidth="20"
                strokeDasharray="62.8 188.4"
                strokeDashoffset="-125.6"
                className="hover:opacity-90 transition-opacity"
              />
              {/* Cuarto Carbohidratos (1/4 = 25%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#FF9500"
                strokeWidth="20"
                strokeDasharray="62.8 188.4"
                strokeDashoffset="-188.4"
                className="hover:opacity-90 transition-opacity"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xl mb-0.5">🥑</span>
              <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                Plato Clínico
              </span>
              <span className="text-[10px] font-semibold text-[#30D158]">
                Equilibrio Diario
              </span>
            </div>
          </div>
        </div>

        {/* Explicación de Secciones estilo Apple Health */}
        <div className="md:col-span-7 space-y-3">
          {/* 1/2 Plato Vegetales */}
          <div className="p-4 rounded-2xl border border-[#30D158]/30 bg-[#30D158]/5 dark:bg-[#30D158]/10 flex items-start gap-3.5 apple-card-hover">
            <span className="text-xl shrink-0">🥦</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#30D158]">
                1/2 del Plato: Vegetales y Hortalizas (~150 - 250g)
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                Aporte fundamental de fibra, agua y micronutrientes. Medida visual: <strong>dos manos abiertas juntas</strong> o dos puños de verdura cruda.
              </p>
            </div>
          </div>

          {/* 1/4 Plato Proteína */}
          <div className="p-4 rounded-2xl border border-[#5856D6]/30 bg-[#5856D6]/5 dark:bg-[#5856D6]/10 flex items-start gap-3.5 apple-card-hover">
            <span className="text-xl shrink-0">🍗</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#5856D6]">
                1/4 del Plato: Proteína Magra (~120 - 150g)
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                Pollo, pescado, carnes magras, huevos o tofu. Medida visual: <strong>1 palma de mano abierta</strong> (sin contar los dedos).
              </p>
            </div>
          </div>

          {/* 1/4 Plato Carbohidratos */}
          <div className="p-4 rounded-2xl border border-[#FF9500]/30 bg-[#FF9500]/5 dark:bg-[#FF9500]/10 flex items-start gap-3.5 apple-card-hover">
            <span className="text-xl shrink-0">🍚</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FF9500]">
                1/4 del Plato: Carbohidratos Complejos (~120 - 150g)
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                Arroz, papas cocidas, avena, pasta, camote o quinoa. Medida visual: <strong>1 puño cerrado</strong> o 1 taza de cocina.
              </p>
            </div>
          </div>

          {/* Grasas Saludables */}
          <div className="p-3.5 rounded-2xl border border-[#FF2D55]/30 bg-[#FF2D55]/5 dark:bg-[#FF2D55]/10 flex items-start gap-3.5 apple-card-hover">
            <span className="text-xl shrink-0">🥑</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FF2D55]">
                Grasas Saludables de Acompañamiento (~10 - 20g)
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                Aceite de oliva virgen extra, frutos secos o 1/4 de aguacate. Medida visual: el volumen de <strong>1 dedo pulgar</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
