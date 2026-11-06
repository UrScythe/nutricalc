'use client';

import React from 'react';
import { Food, VisualPortion } from '../../types';
import { PORTION_PRESETS } from '../../lib/platePortions';
import { PieChart, Circle, Hand, CircleDot, Sparkles, Coffee, Utensils, Box } from 'lucide-react';

interface PlatePortionPickerProps {
  food: Food;
  selectedGrams: number;
  onSelectPortion: (grams: number, label: string) => void;
  activePortionLabel?: string;
}

export default function PlatePortionPicker({
  food,
  selectedGrams,
  onSelectPortion,
  activePortionLabel,
}: PlatePortionPickerProps) {
  // Combinar porciones personalizadas definidas en el alimento con presets generales
  const portionsToDisplay: { label: string; grams: number; icon: any; desc: string }[] = [];

  if (food.visualPortions && food.visualPortions.length > 0) {
    food.visualPortions.forEach((vp) => {
      let icon = PieChart;
      if (vp.type === 'palm') icon = Hand;
      else if (vp.type === 'fist') icon = CircleDot;
      else if (vp.type === 'thumb') icon = Sparkles;
      else if (vp.type === 'cup') icon = Coffee;
      else if (vp.type === 'tablespoon' || vp.type === 'teaspoon') icon = Utensils;
      else if (vp.type === 'unit' || vp.type === 'slice') icon = Box;
      else if (vp.type === 'plate_half') icon = Circle;

      portionsToDisplay.push({
        label: vp.label,
        grams: vp.approxGrams,
        icon,
        desc: vp.description || `${vp.approxGrams} gramos`,
      });
    });
  } else {
    // Si el alimento no tiene porciones custom, usar presets de la categoría
    PORTION_PRESETS.slice(0, 4).forEach((preset) => {
      const g = preset.defaultGramsByCategory[food.category] || 100;
      portionsToDisplay.push({
        label: preset.label,
        grams: g,
        icon: PieChart,
        desc: `${g} gramos aprox`,
      });
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Medidas Visuales & En un Plato:
        </label>
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          {selectedGrams}g seleccionados
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {portionsToDisplay.map((p, idx) => {
          const Icon = p.icon;
          const isSelected = selectedGrams === p.grams;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPortion(p.grams, p.label)}
              className={`p-2 rounded-xl border text-left transition-all flex items-start gap-2 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {p.label}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {p.grams}g • {p.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

