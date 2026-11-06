'use client';

import React, { useState, useMemo } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { COMPENDIUM_ACTIVITIES } from '../../data/activities';
import { Activity } from '../../types';
import { Search, Plus, Clock, Zap, Check } from 'lucide-react';

export default function ActivitySearch() {
  const { addActivity, biometrics } = useNutrition();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [durationHours, setDurationHours] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // Categorías únicas
  const categories = useMemo(() => {
    const set = new Set(COMPENDIUM_ACTIVITIES.map((a) => a.category));
    return ['todas', ...Array.from(set)];
  }, []);

  // Filtrado de actividades
  const filteredActivities = useMemo(() => {
    return COMPENDIUM_ACTIVITIES.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'todas' || a.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAdd = () => {
    if (!selectedActivity) return;
    const totalMinutes = durationHours * 60 + durationMinutes;
    if (totalMinutes <= 0) return;

    addActivity(selectedActivity.id, selectedActivity.name, selectedActivity.met, totalMinutes);

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
    // Mantener la actividad o limpiar selección
  };

  // Previsualización de calorías
  const totalMinutes = durationHours * 60 + durationMinutes;
  const previewCalories = selectedActivity
    ? Math.round(selectedActivity.met * biometrics.weight * (totalMinutes / 60))
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Buscador de Actividades & METs
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compendio Ainsworth para distribución de 24 horas
            </p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y categorías */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar actividad (ej. dormir, oficina, pesas, caminata, ciclismo)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chips de Categorías */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Resultados Rápidos */}
      <div className="max-h-48 overflow-y-auto space-y-1.5 mb-4 pr-1">
        {filteredActivities.map((act) => {
          const isSelected = selectedActivity?.id === act.id;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => setSelectedActivity(act)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  {act.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {act.category} • {act.description}
                </p>
              </div>

              <div className="text-right shrink-0 ml-3">
                <span className="inline-block px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs">
                  {act.met} METs
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Configuración de Duración y Añadido */}
      {selectedActivity && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="text-blue-600 dark:text-blue-400">Seleccionado:</span>{' '}
                {selectedActivity.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Gasto estimado: <strong className="text-slate-800 dark:text-slate-200">{previewCalories} kcal</strong> ({selectedActivity.met} METs × {biometrics.weight} kg × {(totalMinutes / 60).toFixed(1)}h)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Math.max(0, Number(e.target.value)))}
                  className="w-10 text-center text-xs font-bold bg-transparent focus:outline-none text-slate-900 dark:text-white"
                />
                <span className="text-[11px] text-slate-400">h</span>
                <span className="text-slate-300 dark:text-slate-600">:</span>
                <input
                  type="number"
                  min={0}
                  max={55}
                  step={5}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                  className="w-10 text-center text-xs font-bold bg-transparent focus:outline-none text-slate-900 dark:text-white"
                />
                <span className="text-[11px] text-slate-400">min</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
              >
                {addedNotice ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{addedNotice ? '¡Añadido!' : 'Agregar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

