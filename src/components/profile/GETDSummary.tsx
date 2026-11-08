'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export default function GETDSummary() {
  const { getdResult, setCurrentStep } = useNutrition();

  return (
    <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-teal-500/20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
            ✨ Gasto Diario Total Estimado
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-6xl font-black tracking-tight">
              {getdResult.totalGETD}
            </span>
            <span className="text-lg font-bold text-emerald-100">kcal / día</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-50 mt-1 max-w-md font-medium">
            Esta es la energía total que gasta en 24 horas (incluye su metabolismo basal, actividades con METs y digestión de alimentos).
          </p>
        </div>

        {/* Bloques de desglose transparentes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-black/15 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
          <div>
            <p className="text-[10px] uppercase font-black text-emerald-200">
              Metabolismo Basal
            </p>
            <p className="text-base sm:text-lg font-black mt-1">
              {getdResult.tmbReference}
            </p>
            <p className="text-[10px] text-emerald-200">kcal en reposo</p>
          </div>

          <div className="border-x border-white/10 px-2 sm:px-3">
            <p className="text-[10px] uppercase font-black text-emerald-200">
              Actividades METs
            </p>
            <p className="text-base sm:text-lg font-black mt-1">
              {getdResult.activityExpenditure}
            </p>
            <p className="text-[10px] text-emerald-200">kcal en movimiento</p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-black text-emerald-200">
              Digestión ETA
            </p>
            <p className="text-base sm:text-lg font-black mt-1">
              +{getdResult.eta}
            </p>
            <p className="text-[10px] text-emerald-200">kcal (+10%)</p>
          </div>
        </div>

        {/* Botón hacia Paso 2 */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-sm sm:text-base shadow-lg shadow-black/10 flex items-center justify-center gap-2 transition-all bouncy-hover"
          >
            <span>¡Armemos su Plato! (Paso 2)</span>
            <ArrowRight className="w-5 h-5 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
