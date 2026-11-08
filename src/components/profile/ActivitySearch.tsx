'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { COMPENDIUM_ACTIVITIES } from '../../data/activities';
import { Activity } from '../../types';
import { Search, Plus, Check, Activity as ActivityIcon } from 'lucide-react';

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
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A84FF] flex items-center gap-1.5">
            <ActivityIcon className="w-3.5 h-3.5" />
            <span>Compendio de Ainsworth</span>
          </span>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Gasto por Actividad (METs)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Asigna tiempo a cada actividad para completar el ciclo de 24 horas.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar actividad (dormir, oficina, caminar, pesas)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
          />
        </div>

        {/* Chips de actividades rápidas destacadas */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          {[
            { id: 'act_01', name: 'Dormir', emoji: '😴' },
            { id: 'act_04', name: 'Oficina', emoji: '💼' },
            { id: 'act_10', name: 'Caminar', emoji: '🚶‍♂️' },
            { id: 'act_12', name: 'Pesas', emoji: '🏋️' },
            { id: 'act_17', name: 'Ciclismo', emoji: '🚴' },
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all apple-btn ${
                  isSelected
                    ? 'bg-[#0A84FF] text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {quick.emoji} {quick.name}
              </button>
            );
          })}
        </div>

        {/* Lista desplegable scrolleable de actividades */}
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 mb-4">
          {filteredActivities.map((act) => {
            const isSelected = selectedActivity?.id === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setSelectedActivity(act)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between apple-btn ${
                  isSelected
                    ? 'border-[#0A84FF] bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 shadow-sm'
                    : 'border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{act.emoji || '⚡'}</span>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      {act.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {act.description}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {act.met} METs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de Tiempo y Agregar */}
      {selectedActivity && (
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                {selectedActivity.emoji} {selectedActivity.name}
              </p>
              <p className="text-xs text-[#0A84FF] font-semibold mt-0.5">
                Gasto estimado: {previewCalories} kcal ({selectedActivity.met} METs)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Math.max(0, Number(e.target.value)))}
                  className="w-7 text-center text-xs font-bold bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                />
                <span className="text-xs text-zinc-400">h</span>
                <span className="text-zinc-300">:</span>
                <input
                  type="number"
                  min={0}
                  max={55}
                  step={5}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                  className="w-7 text-center text-xs font-bold bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                />
                <span className="text-xs text-zinc-400">m</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0071e3] text-white text-xs font-bold shadow-sm transition apple-btn"
              >
                {addedNotice ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{addedNotice ? 'Añadida' : 'Agregar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
