'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Trash2, RotateCcw, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function ActivityList() {
  const {
    activities,
    removeActivity,
    loadPreset24h,
    clearActivities,
    getdResult,
  } = useNutrition();

  const totalHours = (getdResult.totalMinutesAssigned / 60).toFixed(1);
  const remainingMinutes = 1440 - getdResult.totalMinutesAssigned;
  const remainingHours = (Math.abs(remainingMinutes) / 60).toFixed(1);

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                Cronograma de 24 Horas
              </h3>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                  getdResult.is24hComplete
                    ? 'bg-[#30D158]/15 text-[#30D158]'
                    : 'bg-amber-500/15 text-amber-500'
                }`}
              >
                {getdResult.is24hComplete ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> 24h Completas
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5" />
                    {remainingMinutes > 0
                      ? `Faltan ${remainingHours}h`
                      : `Exceso ${remainingHours}h`}
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Total asignado: <strong>{totalHours}h</strong> de 24.0h del ciclo diario.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadPreset24h}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition flex items-center gap-1.5 apple-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Día Estándar</span>
            </button>
            <button
              type="button"
              onClick={clearActivities}
              className="px-2.5 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition apple-btn"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Barra de progreso de colores vivos estilo Apple Fitness */}
        <div className="w-full h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex mb-4">
          {activities.map((act, index) => {
            const percentage = (act.durationMinutes / 1440) * 100;
            const colors = [
              'bg-[#0A84FF]',
              'bg-[#30D158]',
              'bg-[#FF2D55]',
              'bg-[#00C7BE]',
              'bg-[#FF9500]',
              'bg-[#AF52DE]',
              'bg-[#5856D6]',
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={act.id}
                style={{ width: `${percentage}%` }}
                className={`h-full ${color} transition-all`}
                title={`${act.name}: ${(act.durationMinutes / 60).toFixed(1)}h (${act.caloriesBurned} kcal)`}
              />
            );
          })}
        </div>

        {/* Lista de Actividades Asignadas */}
        {activities.length === 0 ? (
          <div className="text-center py-10 text-zinc-400 text-xs">
            <Clock className="w-6 h-6 mx-auto mb-1.5 opacity-40 text-zinc-400" />
            <p className="font-semibold">No se han registrado actividades para este ciclo.</p>
            <button
              onClick={loadPreset24h}
              className="mt-2 text-[#0A84FF] font-bold hover:underline"
            >
              Cargar distribución típica recomendada
            </button>
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {activities.map((act) => {
              const hours = Math.floor(act.durationMinutes / 60);
              const mins = act.durationMinutes % 60;

              return (
                <div
                  key={act.id}
                  className="p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-800/40 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {act.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                      <span>{act.met} METs</span>
                      <span>•</span>
                      <strong className="text-[#30D158]">
                        {act.caloriesBurned} kcal
                      </strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {hours}h {mins > 0 ? `${mins}m` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeActivity(act.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 transition apple-btn"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
