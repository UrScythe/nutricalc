'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { usePatient } from '../../context/PatientContext';
import AppleActivityRings from '../ui/AppleActivityRings';
import { Flame, Utensils, Scale, Activity, ArrowRight, Sparkles } from 'lucide-react';

export default function AppleHealthHero() {
  const { getdResult, intakeTotals, activities, biometrics, setCurrentStep } = useNutrition();
  const { activePatient } = usePatient();

  // Cálculo de horas registradas en actividades
  const totalMinutes = activities.reduce((sum, a) => sum + a.durationMinutes, 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const targetKcal = getdResult.totalGETD || 2000;
  const currentKcal = intakeTotals.calories;
  const netBalance = currentKcal - targetKcal;

  // Cálculo de IMC
  const heightM = biometrics.height / 100;
  const imc = heightM > 0 ? (biometrics.weight / (heightM * heightM)).toFixed(1) : '22.0';

  let imcCategory = 'Normopeso';
  let imcColor = 'text-[#30D158]';
  const imcNum = Number(imc);
  if (imcNum < 18.5) {
    imcCategory = 'Bajo peso';
    imcColor = 'text-amber-500';
  } else if (imcNum >= 25 && imcNum < 30) {
    imcCategory = 'Sobrepeso';
    imcColor = 'text-amber-500';
  } else if (imcNum >= 30) {
    imcCategory = 'Obesidad';
    imcColor = 'text-[#FF2D55]';
  }

  // Estado de balance calórico
  let balanceBadge = {
    label: 'Balance Óptimo',
    color: 'bg-[#30D158]/15 text-[#30D158]',
    sub: 'Ingesta coincide con el gasto diario.',
  };

  if (netBalance < -200) {
    balanceBadge = {
      label: `Déficit ${Math.abs(netBalance)} kcal`,
      color: 'bg-amber-500/15 text-amber-500',
      sub: 'Ideal para reducción progresiva de grasa.',
    };
  } else if (netBalance > 200) {
    balanceBadge = {
      label: `Superávit +${netBalance} kcal`,
      color: 'bg-[#0A84FF]/15 text-[#0A84FF]',
      sub: 'Aporte extra para hipertrofia y rendimiento.',
    };
  }

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      {/* Cabecera del Resumen */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D55] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Métricas Clínicas de Hoy</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            {activePatient ? activePatient.fullName : 'Consulta Nutricional Activa'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {biometrics.weight} kg • {biometrics.height} cm • {biometrics.age} años • IMC: <strong className={imcColor}>{imc} ({imcCategory})</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${balanceBadge.color}`}>
            {balanceBadge.label}
          </div>
        </div>
      </div>

      {/* Contenido Central: Anillos de Actividad Apple + Tarjetas de Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Anillos Concéntricos de Salud */}
        <div className="lg:col-span-5 flex justify-center py-2">
          <AppleActivityRings
            moveCalories={targetKcal}
            moveTarget={targetKcal}
            intakeCalories={currentKcal}
            intakeTarget={targetKcal}
            activityHours={totalHours}
            activityTarget={24}
            size={210}
            strokeWidth={15}
            showLabels={true}
          />
        </div>

        {/* Cuadrícula de 4 Tarjetas de Métricas estilo Apple Health */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3.5">
          {/* Tarjeta 1: GETD Total */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 text-[#FF2D55] mb-1.5">
              <Flame className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Gasto Total (GETD)</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {targetKcal.toLocaleString()} <span className="text-xs font-normal text-zinc-400">kcal</span>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              TMB: {getdResult.tmbReference} kcal + ETA: {getdResult.eta} kcal
            </p>
          </div>

          {/* Tarjeta 2: Ingesta Ingerida */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 text-[#30D158] mb-1.5">
              <Utensils className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Ingesta Registrada</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {currentKcal.toLocaleString()} <span className="text-xs font-normal text-zinc-400">kcal</span>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              P: {intakeTotals.protein}g • C: {intakeTotals.carbs}g • G: {intakeTotals.fat}g
            </p>
          </div>

          {/* Tarjeta 3: Balance Neto */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 text-[#0A84FF] mb-1.5">
              <Scale className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Balance Neto</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {netBalance > 0 ? `+${netBalance}` : netBalance} <span className="text-xs font-normal text-zinc-400">kcal</span>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1 truncate">
              {balanceBadge.sub}
            </p>
          </div>

          {/* Tarjeta 4: Horas del Ciclo 24h */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 text-purple-500 mb-1.5">
              <Activity className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Ciclo 24h Ainsworth</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {totalHours}h <span className="text-xs font-normal text-zinc-400">/ 24.0h</span>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              {activities.length} actividades METs cargadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

