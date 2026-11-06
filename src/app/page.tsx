'use client';

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import EvaluationDashboard from '../components/EvaluationDashboard';
import PatientHistoryView from '../components/patients/PatientHistoryView';
import FoodManagerView from '../components/foods/FoodManagerView';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<'evaluacion' | 'historial' | 'alimentos'>('evaluacion');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 py-6">
        {currentTab === 'evaluacion' && <EvaluationDashboard />}

        {currentTab === 'historial' && (
          <div className="max-w-5xl mx-auto px-4">
            <PatientHistoryView />
          </div>
        )}

        {currentTab === 'alimentos' && (
          <div className="max-w-5xl mx-auto px-4">
            <FoodManagerView />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>NutriCalc Pro</strong> — Software de Evaluación Nutricional & Gasto Calórico (Compendio Ainsworth)
          </p>
          <p className="text-[11px] text-slate-400">
            Arquitectura Cloud-Ready • Listo para despliegue en Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}

