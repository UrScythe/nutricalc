'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useTheme } from '../../context/ThemeContext';
import { useNutrition } from '../../context/NutritionContext';
import {
  Sun,
  Moon,
  Users,
  Database,
  History,
  Save,
  CheckCircle2,
  Download,
  Plus,
  Sparkles,
  Heart,
} from 'lucide-react';
import PatientModal from '../patients/PatientModal';
import BackupModal from '../backup/BackupModal';

interface HeaderProps {
  currentTab: 'evaluacion' | 'historial' | 'alimentos';
  setCurrentTab: (tab: 'evaluacion' | 'historial' | 'alimentos') => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { activePatient, patients, setActivePatient } = usePatient();
  const { saveCurrentAsConsultation, foodEntries, getdResult } = useNutrition();

  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveConsultation = () => {
    if (!activePatient) {
      setIsPatientModalOpen(true);
      return;
    }
    const saved = saveCurrentAsConsultation(
      `Consulta guardada con ${foodEntries.length} alimentos y GETD de ${getdResult.totalGETD} kcal.`
    );
    if (saved) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-stone-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Amigable */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-amber-300 flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20 bouncy-hover">
                🥑
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
                  NutriCalc <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Amigable ✨</span>
                </h1>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                  Nutrición fácil, visual y humana
                </p>
              </div>
            </div>

            {/* Navegación Cálida */}
            <nav className="hidden md:flex items-center gap-2 p-1.5 bg-stone-100/80 dark:bg-slate-800/80 rounded-2xl">
              <button
                onClick={() => setCurrentTab('evaluacion')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bouncy-hover ${
                  currentTab === 'evaluacion'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                }`}
              >
                🌱 Evaluación Guiada
              </button>
              <button
                onClick={() => setCurrentTab('historial')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bouncy-hover ${
                  currentTab === 'historial'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                }`}
              >
                📖 Historial del Paciente
              </button>
              <button
                onClick={() => setCurrentTab('alimentos')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bouncy-hover ${
                  currentTab === 'alimentos'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                }`}
              >
                🍽️ Mi Plato & Alimentos
              </button>
            </nav>

            {/* Paciente Activo & Acciones */}
            <div className="flex items-center gap-2">
              {/* Selector de Paciente */}
              <div className="relative flex items-center">
                <select
                  value={activePatient?.id || ''}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsPatientModalOpen(true);
                    } else {
                      const found = patients.find((p) => p.id === e.target.value);
                      if (found) setActivePatient(found);
                    }
                  }}
                  className="text-xs sm:text-sm pl-3 pr-7 py-2 bg-stone-100 dark:bg-slate-800 border-none rounded-xl text-stone-800 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[150px] sm:max-w-[190px] truncate cursor-pointer shadow-inner"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      👤 {p.fullName}
                    </option>
                  ))}
                  <option value="__new__">✨ + Nuevo Paciente...</option>
                </select>
              </div>

              {/* Botón Añadir Paciente */}
              <button
                onClick={() => setIsPatientModalOpen(true)}
                title="Registrar nuevo paciente"
                className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition bouncy-hover"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Guardar Consulta */}
              <button
                onClick={handleSaveConsultation}
                title="Guardar consulta en el historial"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition bouncy-hover"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guardar</span>
              </button>

              {/* Backup */}
              <button
                onClick={() => setIsBackupModalOpen(true)}
                title="Copias de Seguridad (JSON)"
                className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200 transition bouncy-hover"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Tema */}
              <button
                onClick={toggleTheme}
                title="Cambiar tema"
                className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200 transition bouncy-hover"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-100 dark:border-slate-800 text-xs font-bold text-stone-600 dark:text-slate-400">
            <button
              onClick={() => setCurrentTab('evaluacion')}
              className={`py-1 px-2 rounded-lg ${currentTab === 'evaluacion' ? 'text-emerald-600 font-extrabold' : ''}`}
            >
              🌱 Evaluación
            </button>
            <button
              onClick={() => setCurrentTab('historial')}
              className={`py-1 px-2 rounded-lg ${currentTab === 'historial' ? 'text-emerald-600 font-extrabold' : ''}`}
            >
              📖 Historial
            </button>
            <button
              onClick={() => setCurrentTab('alimentos')}
              className={`py-1 px-2 rounded-lg ${currentTab === 'alimentos' ? 'text-emerald-600 font-extrabold' : ''}`}
            >
              🍽️ Alimentos
            </button>
          </div>
        </div>
      </header>

      {/* Alerta amigable de guardado */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-600/30 text-sm font-bold animate-bounce">
          <Heart className="w-5 h-5 text-pink-200 fill-pink-200" />
          <span>¡Genial! La consulta se guardó en el expediente con éxito.</span>
        </div>
      )}

      {isPatientModalOpen && <PatientModal onClose={() => setIsPatientModalOpen(false)} />}
      {isBackupModalOpen && <BackupModal onClose={() => setIsBackupModalOpen(false)} />}
    </>
  );
}
