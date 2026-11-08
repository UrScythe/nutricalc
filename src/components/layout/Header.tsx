'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useTheme } from '../../context/ThemeContext';
import { useNutrition } from '../../context/NutritionContext';
import {
  Sun,
  Moon,
  User,
  Plus,
  Save,
  Check,
  Download,
  Activity,
  Calendar,
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

  // Obtener iniciales del paciente activo
  const patientInitials = activePatient
    ? activePatient.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'PX';

  const todayDateStr = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date());

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo estilo Apple Fitness */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2D55] via-[#30D158] to-[#0A84FF] p-[2px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-black rounded-[10px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#FF2D55]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                    NutriCalc
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    Health
                  </span>
                </div>
                <p className="text-[11px] font-medium text-zinc-500 capitalize">
                  {todayDateStr}
                </p>
              </div>
            </div>

            {/* Segmented Control iOS para Navegación Principal */}
            <nav className="hidden md:flex items-center p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
              <button
                type="button"
                onClick={() => setCurrentTab('evaluacion')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === 'evaluacion'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Resumen de Salud
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('historial')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === 'historial'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Historial Clínico
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('alimentos')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === 'alimentos'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Base de Alimentos
              </button>
            </nav>

            {/* Selector de Paciente & Acciones Rápidas */}
            <div className="flex items-center gap-2">
              {/* Tarjeta de Paciente Activo estilo Apple Health Profile */}
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60 rounded-full">
                <div className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {patientInitials}
                </div>
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
                  className="bg-transparent text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none cursor-pointer max-w-[120px] sm:max-w-[150px] truncate"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id} className="dark:bg-zinc-900 text-zinc-900 dark:text-white">
                      {p.fullName}
                    </option>
                  ))}
                  <option value="__new__" className="dark:bg-zinc-900 font-bold text-[#0A84FF]">
                    + Nuevo Paciente...
                  </option>
                </select>
                <button
                  type="button"
                  onClick={() => setIsPatientModalOpen(true)}
                  title="Nuevo Paciente"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white apple-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botón Guardar Consulta */}
              <button
                type="button"
                onClick={handleSaveConsultation}
                title="Guardar Registro"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-sm transition apple-btn"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guardar</span>
              </button>

              {/* Backup */}
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(true)}
                title="Exportar/Importar Respaldo"
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition apple-btn"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              {/* Selector de Tema */}
              <button
                type="button"
                onClick={toggleTheme}
                title="Alternar Modo Oscuro"
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition apple-btn"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Menú Segmented Control para Móviles */}
          <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs font-semibold text-zinc-500">
            <button
              onClick={() => setCurrentTab('evaluacion')}
              className={`py-1 px-3 rounded-lg ${
                currentTab === 'evaluacion'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                  : ''
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setCurrentTab('historial')}
              className={`py-1 px-3 rounded-lg ${
                currentTab === 'historial'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                  : ''
              }`}
            >
              Historial
            </button>
            <button
              onClick={() => setCurrentTab('alimentos')}
              className={`py-1 px-3 rounded-lg ${
                currentTab === 'alimentos'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                  : ''
              }`}
            >
              Alimentos
            </button>
          </div>
        </div>
      </header>

      {/* Toast de Guardado con Estilo iOS Dynamic Island / Notification */}
      {saveToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-900 rounded-full shadow-2xl backdrop-blur-xl text-xs font-semibold animate-fade-in border border-zinc-700/40">
          <div className="w-4 h-4 rounded-full bg-[#30D158] flex items-center justify-center text-black">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span>Consulta guardada exitosamente en el expediente.</span>
        </div>
      )}

      {isPatientModalOpen && <PatientModal onClose={() => setIsPatientModalOpen(false)} />}
      {isBackupModalOpen && <BackupModal onClose={() => setIsBackupModalOpen(false)} />}
    </>
  );
}
