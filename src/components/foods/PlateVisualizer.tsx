'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function PlateVisualizer() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="text-3xl">🍽️</span>
        <div>
          <h2 className="text-xl font-black text-stone-900 dark:text-white">
            La Regla del Plato Saludable & Porciones con las Manos
          </h2>
          <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
            Una forma ultra-intuitiva de armar comidas sin tener que pesar todo en una balanza.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Gráfico Visual del Plato */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 rounded-full border-8 border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/40 p-3 shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Mitad Vegetales (1/2 = 50%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="22"
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
                stroke="#8b5cf6"
                strokeWidth="22"
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
                stroke="#f59e0b"
                strokeWidth="22"
                strokeDasharray="62.8 188.4"
                strokeDashoffset="-188.4"
                className="hover:opacity-90 transition-opacity"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-2xl mb-0.5">🥑</span>
              <span className="text-[11px] font-black text-stone-800 dark:text-slate-100 uppercase tracking-wider">
                Plato Balanceado
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                100% Nutrición
              </span>
            </div>
          </div>
        </div>

        {/* Explicación de Secciones */}
        <div className="md:col-span-7 space-y-3">
          {/* 1/2 Plato Vegetales */}
          <div className="p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20 flex items-start gap-3.5 bouncy-hover">
            <span className="text-2xl shrink-0">🥦</span>
            <div>
              <p className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200">
                1/2 del Plato: Vegetales, Ensaladas y Hortalizas (~150 - 250g)
              </p>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">
                Aporta fibra, agua y micronutrientes esenciales. Medida visual: <strong>dos manos abiertas juntas</strong> o dos puños de ensalada cruda.
              </p>
            </div>
          </div>

          {/* 1/4 Plato Proteína */}
          <div className="p-4 rounded-2xl border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/60 dark:bg-purple-950/20 flex items-start gap-3.5 bouncy-hover">
            <span className="text-2xl shrink-0">🍗</span>
            <div>
              <p className="text-xs sm:text-sm font-black text-purple-900 dark:text-purple-200">
                1/4 del Plato: Proteína Magra (~120 - 150g)
              </p>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">
                Pechuga de pollo, pescado blanco o azul, huevos, lomo o tofu. Medida visual: <strong>1 palma de mano abierta</strong> (sin contar los dedos).
              </p>
            </div>
          </div>

          {/* 1/4 Plato Carbohidratos */}
          <div className="p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 flex items-start gap-3.5 bouncy-hover">
            <span className="text-2xl shrink-0">🍚</span>
            <div>
              <p className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200">
                1/4 del Plato: Carbohidratos Complejos (~120 - 150g)
              </p>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">
                Arroz blanco o integral, papas cocidas, avena, pasta, camote o quinoa. Medida visual: <strong>1 puño cerrado</strong> o 1 taza medidora.
              </p>
            </div>
          </div>

          {/* Grasas Saludables */}
          <div className="p-3.5 rounded-2xl border border-pink-200/80 dark:border-pink-900/60 bg-pink-50/60 dark:bg-pink-950/20 flex items-start gap-3.5 bouncy-hover">
            <span className="text-2xl shrink-0">🥑</span>
            <div>
              <p className="text-xs sm:text-sm font-black text-pink-900 dark:text-pink-200">
                Grasas Saludables de Acompañamiento (~10 - 20g)
              </p>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium mt-0.5">
                Aceite de oliva virgen extra, frutos secos o 1/4 de aguacate. Medida visual: el tamaño de <strong>1 dedo pulgar</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
