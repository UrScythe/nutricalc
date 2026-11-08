'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRight, Flame, Activity } from 'lucide-react';

export default function GETDSummary() {
  const { getdResult, setCurrentStep } = useNutrition();

  return (
    <div className="bg-gradient-to-br from-[#FF2D55] via-[#FF375F] to-[#E00034] text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#FF2D55]/20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Gasto Energético Total Diario (GETD)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {getdResult.totalGETD.toLocaleString()}
            </span>
            <span className="text-lg font-medium text-rose-100">kcal / día</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-md">
            Gasto metabólico estimado para 24 horas: TMB basal + Actividad física Ainsworth + Efecto Térmico (ETA 10%).
          </p>
        </div>

        {/* Bloques de desglose transparentes estilo Apple */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-rose-200">
              TMB Reposo
            </p>
            <p className="text-base sm:text-lg font-bold mt-0.5">
              {getdResult.tmbReference}
            </p>
            <p className="text-[10px] text-rose-200">kcal</p>
          </div>

          <div className="border-x border-white/15 px-2 sm:px-3">
            <p className="text-[10px] uppercase font-bold text-rose-200">
              Actividades METs
            </p>
            <p className="text-base sm:text-lg font-bold mt-0.5">
              {getdResult.activityExpenditure}
            </p>
            <p className="text-[10px] text-rose-200">kcal</p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold text-rose-200">
              Digestión ETA
            </p>
            <p className="text-base sm:text-lg font-bold mt-0.5">
              +{getdResult.eta}
            </p>
            <p className="text-[10px] text-rose-200">kcal (+10%)</p>
          </div>
        </div>

        {/* Botón hacia Paso 2 */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white text-zinc-900 hover:bg-zinc-100 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all apple-btn"
          >
            <span>Registrar Ingesta (Paso 2)</span>
            <ArrowRight className="w-4 h-4 text-[#FF2D55]" />
          </button>
        </div>
      </div>
    </div>
  );
}
