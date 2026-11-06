'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Clock, Trash2, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ActivityList() {
  const {
    activities,
    removeActivity,
    updateActivityDuration,
    loadPreset24h,
    clearActivities,
    getdResult,
  } = useNutrition();

  const totalHours = (getdResult.totalMinutesAssigned / 60).toFixed(1);
  const remainingMinutes = 1440 - getdResult.totalMinutesAssigned;
  const remainingHours = (Math.abs(remainingMinutes) / 60).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Distribución de las 24 Horas</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                getdResult.is24hComplete
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {getdResult.is24hComplete ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> 24h Completo
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {remainingMinutes > 0
                    ? `Faltan ${remainingHours}h`
                    : `Exceso de ${remainingHours}h`}
                </>
              )}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total asignado: <strong className="text-slate-800 dark:text-slate-200">{totalHours} horas</strong> de 24.0 horas diarias
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadPreset24h}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Ciclo Típico 24h</span>
          </button>
          <button
            type="button"
            onClick={clearActivities}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Barra visual de progreso de las 24 horas */}
      <div className="mb-4">
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          {activities.map((act, index) => {
            const percentage = (act.durationMinutes / 1440) * 100;
            // Colores rotativos atractivos
            const colors = [
              'bg-blue-500',
              'bg-teal-500',
              'bg-emerald-500',
              'bg-indigo-500',
              'bg-violet-500',
              'bg-amber-500',
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
      </div>

      {/* Lista de Actividades Asignadas */}
      {activities.length === 0 ? (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">No hay actividades añadidas para este día.</p>
          <button
            onClick={loadPreset24h}
            className="mt-2 text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
          >
            Cargar distribución diaria predeterminada
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
          {activities.map((act) => {
            const hours = Math.floor(act.durationMinutes / 60);
            const mins = act.durationMinutes % 60;

            return (
              <div
                key={act.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {act.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>{act.met} METs</span>
                    <span>•</span>
                    <strong className="text-blue-600 dark:text-blue-400 font-semibold">
                      {act.caloriesBurned} kcal
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Selector rápido de horas */}
                  <div className="text-xs font-semibold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
                    {hours}h {mins > 0 ? `${mins}m` : ''}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeActivity(act.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    title="Eliminar actividad"
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
  );
}

