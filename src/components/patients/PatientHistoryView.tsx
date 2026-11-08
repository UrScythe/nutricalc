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
  Heart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import PatientModal from './PatientModal';

export default function PatientHistoryView() {
  const { activePatient, consultations, deleteConsultation } = usePatient();
  const { loadConsultationIntoSession, resetCurrentSession } = useNutrition();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!activePatient) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-12 text-center text-stone-400">
        <span className="text-5xl block mb-3">👥</span>
        <h3 className="text-base font-black text-stone-800 dark:text-slate-200">
          No hay ningún paciente seleccionado
        </h3>
        <p className="text-xs text-stone-500 font-medium mt-1 max-w-sm mx-auto">
          Selecciona un paciente en la barra superior o crea uno nuevo para consultar su historial de citas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ficha Resumen del Paciente Activo */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-emerald-500/20 bouncy-hover">
              {activePatient.sex === 'female' ? '👩' : '👨'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                  {activePatient.fullName}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300">
                  {activePatient.age} años • {activePatient.height} cm
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-slate-400 font-semibold mt-1">
                Objetivo:{' '}
                <strong className="capitalize text-emerald-600 dark:text-emerald-400">
                  {activePatient.objective?.replace('_', ' ') || 'Salud general'}
                </strong>
                {activePatient.phone && ` • Tel: ${activePatient.phone}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold rounded-2xl border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-100 transition bouncy-hover"
            >
              Editar Ficha
            </button>
            <button
              onClick={resetCurrentSession}
              className="px-5 py-2.5 text-xs font-black rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 bouncy-hover"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Consulta</span>
            </button>
          </div>
        </div>

        {activePatient.clinicalNotes && (
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400 flex items-start gap-2 bg-stone-50 dark:bg-slate-800/40 p-3.5 rounded-2xl">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Notas Clínicas:</strong> {activePatient.clinicalNotes}
            </span>
          </div>
        )}
      </div>

      {/* Historial de Consultas */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-2">
            <span>📅 Historial de Consultas Archivadas ({consultations.length})</span>
          </h3>
        </div>

        {consultations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-12 text-center text-stone-400">
            <span className="text-4xl block mb-2">📋</span>
            <p className="text-sm font-bold text-stone-700 dark:text-slate-300">
              Aún no hay consultas archivadas para este paciente.
            </p>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto font-medium">
              Ve a &quot;Evaluación Guiada&quot; para registrar su gasto METs e ingesta diaria, y haz clic en &quot;Guardar&quot; en la barra superior.
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
                  className="p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all bouncy-hover"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-slate-800 mb-3">
                    <span className="font-black text-sm text-stone-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      {formattedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadConsultationIntoSession(c)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-black hover:bg-emerald-100 transition bouncy-hover"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir en Calculadora</span>
                      </button>

                      <button
                        onClick={() => deleteConsultation(c.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition"
                        title="Eliminar consulta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {/* Peso */}
                    <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-stone-400 font-bold uppercase">Peso Registrado</p>
                      <p className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                        {c.biometrics.weight} kg
                      </p>
                      <p className="text-[10px] text-stone-500 font-semibold">
                        {c.biometrics.bodyFatPercentage ? `${c.biometrics.bodyFatPercentage}% grasa` : `Talla: ${c.biometrics.height} cm`}
                      </p>
                    </div>

                    {/* Gasto GETD */}
                    <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/50">
                      <p className="text-[10px] text-blue-700 dark:text-blue-400 font-bold uppercase">Gasto GETD (METs)</p>
                      <p className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                        {c.getd} kcal
                      </p>
                      <p className="text-[10px] text-blue-600/80 font-semibold">
                        TMB: {c.tmb} kcal
                      </p>
                    </div>

                    {/* Ingesta */}
                    <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50">
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">Comida Registrada</p>
                      <p className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                        {c.totalCaloriesIn} kcal
                      </p>
                      <p className="text-[10px] text-emerald-600/80 font-semibold">
                        P: {c.totalProteinIn}g • C: {c.totalCarbsIn}g • G: {c.totalFatIn}g
                      </p>
                    </div>

                    {/* Balance */}
                    <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-stone-400 font-bold uppercase">Balance Energético</p>
                      <p
                        className={`text-base font-black mt-0.5 flex items-center gap-1 ${
                          isDeficit ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {isDeficit ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                        <span>{c.balanceCalories > 0 ? `+${c.balanceCalories}` : c.balanceCalories} kcal</span>
                      </p>
                      <p className="text-[10px] text-stone-500 font-semibold">
                        {isDeficit ? 'Déficit calórico' : 'Superávit calórico'}
                      </p>
                    </div>
                  </div>

                  {c.notes && (
                    <p className="mt-3 text-xs text-stone-600 dark:text-slate-400 italic">
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
