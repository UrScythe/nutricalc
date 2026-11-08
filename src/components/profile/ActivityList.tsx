'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Trash2, RotateCcw, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                El reloj de sus 24 Horas
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-black flex items-center gap-1 ${
                  getdResult.is24hComplete
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {getdResult.is24hComplete ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" /> ¡24h Completas!
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
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium mt-0.5">
              Total asignado: <strong>{totalHours} horas</strong> de 24 horas del día.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadPreset24h}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200 transition flex items-center gap-1.5 bouncy-hover"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Día Típico</span>
            </button>
            <button
              type="button"
              onClick={clearActivities}
              className="px-2.5 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition"
            >
              Vaciar
            </button>
          </div>
        </div>

        {/* Barra de progreso de colores vivos */}
        <div className="w-full h-4 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-4 shadow-inner">
          {activities.map((act, index) => {
            const percentage = (act.durationMinutes / 1440) * 100;
            const colors = [
              'bg-indigo-400',
              'bg-blue-400',
              'bg-teal-400',
              'bg-emerald-400',
              'bg-amber-400',
              'bg-orange-400',
              'bg-purple-400',
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
          <div className="text-center py-10 text-stone-400 text-xs">
            <p className="text-2xl mb-1">⏱️</p>
            <p className="font-bold">Aún no has agregado actividades.</p>
            <button
              onClick={loadPreset24h}
              className="mt-2 text-blue-600 dark:text-blue-400 font-extrabold underline"
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
                  className="p-3 rounded-2xl border border-stone-100 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-stone-900 dark:text-white truncate">
                      {act.name}
                    </p>
                    <p className="text-[11px] font-semibold text-stone-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{act.met} METs</span>
                      <span>•</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {act.caloriesBurned} kcal
                      </strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 bg-white dark:bg-slate-900 rounded-xl border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300">
                      {hours}h {mins > 0 ? `${mins}m` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeActivity(act.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition"
                      title="Quitar"
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
