'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { MealType } from '../../types';
import FluidTabs from '../ui/FluidTabs';

export default function MealSelector() {
  const { selectedMeal, setSelectedMeal, foodEntries } = useNutrition();

  const tabs = [
    {
      id: 'desayuno',
      label: 'Desayuno',
      emoji: '☕',
      badge: foodEntries.filter((e) => e.meal === 'desayuno').length,
    },
    {
      id: 'almuerzo',
      label: 'Almuerzo',
      emoji: '🥗',
      badge: foodEntries.filter((e) => e.meal === 'almuerzo').length,
    },
    {
      id: 'cena',
      label: 'Cena',
      emoji: '🌙',
      badge: foodEntries.filter((e) => e.meal === 'cena').length,
    },
    {
      id: 'snack',
      label: 'Snacks',
      emoji: '🥑',
      badge: foodEntries.filter((e) => e.meal === 'snack').length,
    },
  ];

  return (
    <FluidTabs
      tabs={tabs}
      activeTab={selectedMeal}
      onChange={(id) => setSelectedMeal(id as MealType)}
      className="w-full shadow-inner"
    />
  );
}
