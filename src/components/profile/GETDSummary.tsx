'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Flame, ArrowRight, Zap, Coffee, Sparkles } from 'lucide-react';

export default function GETDSummary() {
  const { getdResult, setCurrentStep } = useNutrition();

  return (
    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-xl shadow-teal-700/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" /> Gasto Energético Total Diario (GETD)
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black tracking-tight">
              {getdResult.totalGETD}
            </span>
            <span className="text-lg font-medium text-emerald-100">kcal / día</span>
          </div>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Gasto metabólico estimado para 24 horas continuas según valor MET por actividad más el efecto térmico digestivo (ETA ~10%).
          </p>
        </div>

        {/* Desglose de componentes */}
        <div className="grid grid-cols-3 gap-2.5 bg-black/20 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-center">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-emerald-200">
              TMB Ref.
            </p>
            <p className="text-sm sm:text-base font-bold mt-0.5">
              {getdResult.tmbReference}
            </p>
            <p className="text-[9px] text-emerald-200/80">kcal basal</p>
          </div>

          <div className="border-x border-white/10 px-2">
            <p className="text-[10px] uppercase font-semibold tracking-wider text-emerald-200">
              METs 24h
            </p>
            <p className="text-sm sm:text-base font-bold mt-0.5">
              {getdResult.activityExpenditure}
            </p>
            <p className="text-[9px] text-emerald-200/80">kcal actividad</p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-emerald-200">
              ETA (+10%)
            </p>
            <p className="text-sm sm:text-base font-bold mt-0.5">
              +{getdResult.eta}
            </p>
            <p className="text-[9px] text-emerald-200/80">kcal termogénesis</p>
          </div>
        </div>

        {/* Botón hacia el Paso 2 */}
        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <span>Ir a Registro de Ingesta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

