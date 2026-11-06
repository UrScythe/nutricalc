'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useTheme } from '../../context/ThemeContext';
import { useNutrition } from '../../context/NutritionContext';
import {
  Sun,
  Moon,
  User,
  Users,
  Database,
  History,
  Save,
  CheckCircle2,
  Download,
  Plus,
  Scale,
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
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Nombre */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  NutriCalc <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">PRO</span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Evaluación Nutricional & Gasto METs
                </p>
              </div>
            </div>

            {/* Navegación Principal */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentTab('evaluacion')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'evaluacion'
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Evaluación
              </button>
              <button
                onClick={() => setCurrentTab('historial')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  currentTab === 'historial'
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Historial</span>
              </button>
              <button
                onClick={() => setCurrentTab('alimentos')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  currentTab === 'alimentos'
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Mis Alimentos</span>
              </button>
            </nav>

            {/* Selector de Paciente & Acciones Rápidas */}
            <div className="flex items-center gap-2">
              {/* Dropdown de Paciente */}
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
                  className="text-xs sm:text-sm pl-8 pr-7 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[140px] sm:max-w-[180px] truncate"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName}
                    </option>
                  ))}
                  <option value="__new__">+ Nuevo Paciente...</option>
                </select>
                <User className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Botón Añadir Paciente */}
              <button
                onClick={() => setIsPatientModalOpen(true)}
                title="Crear nuevo paciente"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Guardar Consulta */}
              <button
                onClick={handleSaveConsultation}
                title="Guardar consulta en el historial del paciente"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium shadow-sm transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Guardar</span>
              </button>

              {/* Backup / Export */}
              <button
                onClick={() => setIsBackupModalOpen(true)}
                title="Copia de Seguridad (Exportar / Importar JSON)"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Toggle Tema Oscuro / Claro */}
              <button
                onClick={toggleTheme}
                title="Cambiar tema claro / oscuro"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alerta de guardado exitoso */}
      {saveToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-600/30 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>¡Consulta guardada con éxito en el historial!</span>
        </div>
      )}

      {/* Modales */}
      {isPatientModalOpen && <PatientModal onClose={() => setIsPatientModalOpen(false)} />}
      {isBackupModalOpen && <BackupModal onClose={() => setIsBackupModalOpen(false)} />}
    </>
  );
}

