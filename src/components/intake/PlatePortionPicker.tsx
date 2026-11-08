'use client';

import React from 'react';
import { Food } from '../../types';
import { PORTION_PRESETS } from '../../lib/platePortions';

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
}: PlatePortionPickerProps) {
  const portionsToDisplay: { label: string; grams: number; emoji: string; desc: string }[] = [];

  const getEmoji = (type: string) => {
    switch (type) {
      case 'plate_half':
        return '🥗';
      case 'plate_quarter':
        return '🍽️';
      case 'palm':
        return '✋';
      case 'fist':
        return '✊';
      case 'thumb':
        return '👍';
      case 'cup':
        return '☕';
      case 'tablespoon':
      case 'teaspoon':
        return '🥄';
      case 'unit':
      case 'slice':
        return '📦';
      default:
        return '⚖️';
    }
  };

  if (food.visualPortions && food.visualPortions.length > 0) {
    food.visualPortions.forEach((vp) => {
      portionsToDisplay.push({
        label: vp.label,
        grams: vp.approxGrams,
        emoji: getEmoji(vp.type),
        desc: vp.description || `${vp.approxGrams} gramos`,
      });
    });
  } else {
    PORTION_PRESETS.slice(0, 4).forEach((preset) => {
      const g = preset.defaultGramsByCategory[food.category] || 100;
      portionsToDisplay.push({
        label: preset.label,
        grams: g,
        emoji: getEmoji(preset.type),
        desc: `${g} gramos aprox`,
      });
    });
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-stone-800 dark:text-slate-200 flex items-center gap-1.5">
          <span>🍽️ Elige una porción intuitiva &quot;En el plato&quot;:</span>
        </label>
        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
          {selectedGrams}g elegidos
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {portionsToDisplay.map((p, idx) => {
          const isSelected = selectedGrams === p.grams;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPortion(p.grams, p.label)}
              className={`p-3 rounded-2xl border text-left transition-all bouncy-hover flex items-center gap-2.5 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500 shadow-sm'
                  : 'border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-stone-50'
              }`}
            >
              <span className="text-2xl shrink-0">{p.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-stone-900 dark:text-white truncate">
                  {p.label}
                </p>
                <p className="text-[11px] font-semibold text-stone-500 dark:text-slate-400">
                  {p.grams}g
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
