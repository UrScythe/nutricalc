'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useNutrition } from '../../context/NutritionContext';
import {
  Calendar,
  Trash2,
  ExternalLink,
  Plus,
  FileText,
  Clock,
  User,
  TrendingDown,
  TrendingUp,
  Activity,
  Flame,
  Utensils,
  Scale,
} from 'lucide-react';
import PatientModal from './PatientModal';

export default function PatientHistoryView() {
  const { activePatient, consultations, deleteConsultation } = usePatient();
  const { loadConsultationIntoSession, resetCurrentSession } = useNutrition();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!activePatient) {
    return (
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-12 text-center text-zinc-400">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
          <User className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
          No hay ningún paciente seleccionado
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          Selecciona un paciente en la barra superior o crea uno nuevo para consultar su historial de consultas.
        </p>
      </div>
    );
  }

  const patientInitials = activePatient.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Ficha Resumen del Paciente Activo */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0A84FF] text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
              {patientInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {activePatient.fullName}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {activePatient.age} años • {activePatient.height} cm
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Objetivo:{' '}
                <strong className="capitalize text-[#0071e3]">
                  {activePatient.objective?.replace('_', ' ') || 'Salud general'}
                </strong>
                {activePatient.phone && ` • Tel: ${activePatient.phone}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition apple-btn"
            >
              Editar Ficha
            </button>
            <button
              onClick={resetCurrentSession}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#0071e3] hover:bg-[#0077ED] text-white shadow-sm transition flex items-center gap-1.5 apple-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Consulta</span>
            </button>
          </div>
        </div>

        {activePatient.clinicalNotes && (
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-2xl">
            <FileText className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
            <span>
              <strong>Notas Clínicas:</strong> {activePatient.clinicalNotes}
            </span>
          </div>
        )}
      </div>

      {/* Historial de Consultas */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#0A84FF]" />
            <span>Consultas Clínicas Archivadas ({consultations.length})</span>
          </span>
        </div>

        {consultations.length === 0 ? (
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-12 text-center text-zinc-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-400" />
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              No hay consultas archivadas para este paciente.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              Realiza una evaluación en el Resumen y pulsa &quot;Guardar&quot; en la barra superior para crear un registro en el historial.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {consultations.map((c) => {
              const formattedDate = new Date(c.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              const isDeficit = c.balanceCalories < 0;

              return (
                <div
                  key={c.id}
                  className="p-5 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#1c1c1e] shadow-sm hover:shadow-md transition-all apple-card-hover"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0071e3]" />
                      {formattedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadConsultationIntoSession(c)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition apple-btn"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span>Abrir Consulta</span>
                      </button>

                      <button
                        onClick={() => deleteConsultation(c.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 transition apple-btn"
                        title="Eliminar consulta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {/* Peso */}
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">Peso Registrado</p>
                      <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                        {c.biometrics.weight} kg
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {c.biometrics.bodyFatPercentage ? `${c.biometrics.bodyFatPercentage}% grasa` : `Talla: ${c.biometrics.height} cm`}
                      </p>
                    </div>

                    {/* Gasto GETD */}
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                      <div className="flex items-center gap-1 text-[#FF2D55] mb-0.5">
                        <Flame className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">GETD</span>
                      </div>
                      <p className="text-base font-bold text-zinc-900 dark:text-white">
                        {c.getd} kcal
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        TMB: {c.tmb} kcal
                      </p>
                    </div>

                    {/* Ingesta */}
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                      <div className="flex items-center gap-1 text-[#30D158] mb-0.5">
                        <Utensils className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">Ingesta</span>
                      </div>
                      <p className="text-base font-bold text-zinc-900 dark:text-white">
                        {c.totalCaloriesIn} kcal
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        P: {c.totalProteinIn}g • C: {c.totalCarbsIn}g • G: {c.totalFatIn}g
                      </p>
                    </div>

                    {/* Balance */}
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                      <div className="flex items-center gap-1 text-[#0A84FF] mb-0.5">
                        <Scale className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">Balance</span>
                      </div>
                      <p
                        className={`text-base font-bold flex items-center gap-1 ${
                          isDeficit ? 'text-amber-500' : 'text-[#30D158]'
                        }`}
                      >
                        {isDeficit ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                        <span>{c.balanceCalories > 0 ? `+${c.balanceCalories}` : c.balanceCalories} kcal</span>
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {isDeficit ? 'Déficit calórico' : 'Superávit calórico'}
                      </p>
                    </div>
                  </div>

                  {c.notes && (
                    <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 italic">
                      &quot;{c.notes}&quot;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <PatientModal
          onClose={() => setIsEditModalOpen(false)}
          patientToEdit={activePatient}
        />
      )}
    </div>
  );
}
