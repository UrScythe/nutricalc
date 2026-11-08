'use client';

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import EvaluationDashboard from '../components/EvaluationDashboard';
import PatientHistoryView from '../components/patients/PatientHistoryView';
import FoodManagerView from '../components/foods/FoodManagerView';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<'evaluacion' | 'historial' | 'alimentos'>('evaluacion');

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#0071e3] selection:text-white">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 py-8">
        {currentTab === 'evaluacion' && <EvaluationDashboard />}

        {currentTab === 'historial' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <PatientHistoryView />
          </div>
        )}

        {currentTab === 'alimentos' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <FoodManagerView />
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">NutriCalc Health</strong> — Software de Evaluación Nutricional & Gasto METs (Compendio Ainsworth)
          </p>
          <p className="text-[11px] text-zinc-400">
            Arquitectura Cloud-Ready • Listo para despliegue en Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
