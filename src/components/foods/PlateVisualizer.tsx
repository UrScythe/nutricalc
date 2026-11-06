'use client';

import React from 'react';
import { PieChart, Utensils, Hand, CircleDot, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PlateVisualizer() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
          <PieChart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Guía Visual: Distribución en el Plato y Porciones Caseras
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Regla del plato saludable para educación al paciente sin pesas de cocina
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Gráfico Visual del Plato (SVG interactivo) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-2 shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Mitad Vegetales (1/2 del plato = 50%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="20"
                strokeDasharray="125.6 125.6"
                strokeDashoffset="0"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              {/* Cuarto Proteínas (1/4 del plato = 25%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth="20"
                strokeDasharray="62.8 188.4"
                strokeDashoffset="-125.6"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              {/* Cuarto Carbohidratos (1/4 del plato = 25%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="20"
                strokeDasharray="62.8 188.4"
                strokeDashoffset="-188.4"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
            </svg>

            {/* Marcadores flotantes de texto en el centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Plato Balanceado
              </span>
              <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                100% Nutrición
              </span>
            </div>
          </div>
        </div>

        {/* Explicación de Secciones y Equivalencias Corporales */}
        <div className="md:col-span-7 space-y-3">
          {/* 1/2 Plato */}
          <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                1/2 Plato: Vegetales y Hortalizas (~150 - 250g)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Fibra, micronutrientes y volumen. Equivale a dos manos juntas abiertas o dos puños de ensalada cruda/cocida.
              </p>
            </div>
          </div>

          {/* 1/4 Plato Proteína */}
          <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-purple-900 dark:text-purple-300">
                1/4 Plato: Proteína Magra (~120 - 160g)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Pollo, pescado, carnes magras, huevos o tofu. Equivale al tamaño y grosor de <strong>1 palma de mano abierta</strong>.
              </p>
            </div>
          </div>

          {/* 1/4 Plato Carbohidratos */}
          <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                1/4 Plato: Carbohidratos Complejos (~120 - 150g cocidos)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Arroz, papas, avena, pasta, legumbres o plátano. Equivale al volumen de <strong>1 puño cerrado</strong> o 1 taza rasa.
              </p>
            </div>
          </div>

          {/* Grasas Saludables */}
          <div className="p-2.5 rounded-xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/50 dark:bg-pink-950/20 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-pink-900 dark:text-pink-300">
                Acompañamiento: Grasas Saludables (~10 - 20g)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Aceite de oliva (1 cucharada), frutos secos o aguacate (1/4 pieza). Equivale al volumen de <strong>1 pulgar</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

