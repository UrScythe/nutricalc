'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { COMPENDIUM_ACTIVITIES } from '../../data/activities';
import { Activity } from '../../types';
import { Search, Plus, Check, Clock, Sparkles } from 'lucide-react';

export default function ActivitySearch() {
  const { addActivity, biometrics } = useNutrition();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(COMPENDIUM_ACTIVITIES[0]);
  const [durationHours, setDurationHours] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // Actividades filtradas
  const filteredActivities = useMemo(() => {
    return COMPENDIUM_ACTIVITIES.filter((a) => {
      return (
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [searchTerm]);

  const handleAdd = () => {
    if (!selectedActivity) return;
    const totalMins = durationHours * 60 + durationMinutes;
    if (totalMins <= 0) return;

    addActivity(selectedActivity.id, selectedActivity.name, selectedActivity.met, totalMins);

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const totalMinutes = durationHours * 60 + durationMinutes;
  const previewCalories = selectedActivity
    ? Math.round(selectedActivity.met * biometrics.weight * (totalMinutes / 60))
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Compendio de Ainsworth
          </div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white">
            ¿Cómo se mueve en su día a día?
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
            Elige una actividad para sumarla a su ciclo de 24 horas.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar actividad (dormir, oficina, caminar, pesas)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Chips de actividades rápidas destacadas */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          {[
            { id: 'act_01', name: 'Dormir', emoji: '😴' },
            { id: 'act_04', name: 'Oficina', emoji: '💼' },
            { id: 'act_10', name: 'Caminar', emoji: '🚶‍♂️' },
            { id: 'act_12', name: 'Pesas', emoji: '🏋️' },
            { id: 'act_17', name: 'Bici', emoji: '🚴' },
            { id: 'act_14', name: 'CrossFit', emoji: '🔥' },
          ].map((quick) => {
            const found = COMPENDIUM_ACTIVITIES.find((a) => a.id === quick.id);
            if (!found) return null;
            const isSelected = selectedActivity?.id === found.id;
            return (
              <button
                key={quick.id}
                type="button"
                onClick={() => setSelectedActivity(found)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all bouncy-hover ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                {quick.emoji} {quick.name}
              </button>
            );
          })}
        </div>

        {/* Lista desplegable scrolleable de actividades */}
        <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1 mb-4">
          {filteredActivities.map((act) => {
            const isSelected = selectedActivity?.id === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setSelectedActivity(act)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between bouncy-hover ${
                  isSelected
                    ? 'border-blue-400 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-400 shadow-sm'
                    : 'border-stone-100 dark:border-slate-800 hover:bg-stone-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{act.emoji || '⚡'}</span>
                  <div>
                    <p className="text-xs font-extrabold text-stone-900 dark:text-white">
                      {act.name}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-slate-400">
                      {act.description}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {act.met} METs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de Tiempo y Agregar */}
      {selectedActivity && (
        <div className="pt-3 border-t border-stone-100 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-800/40 p-4 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-stone-900 dark:text-white">
                {selectedActivity.emoji} {selectedActivity.name}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                🔥 Gasto estimado: {previewCalories} kcal ({selectedActivity.met} METs)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 shadow-inner">
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Math.max(0, Number(e.target.value)))}
                  className="w-8 text-center text-xs font-black bg-transparent text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-xs text-stone-400 font-bold">h</span>
                <span className="text-stone-300 font-bold">:</span>
                <input
                  type="number"
                  min={0}
                  max={55}
                  step={5}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                  className="w-8 text-center text-xs font-black bg-transparent text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-xs text-stone-400 font-bold">m</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/20 transition bouncy-hover"
              >
                {addedNotice ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{addedNotice ? '¡Añadida!' : 'Agregar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
