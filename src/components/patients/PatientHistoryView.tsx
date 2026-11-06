'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useNutrition } from '../../context/NutritionContext';
import {
  Calendar,
  Weight,
  Flame,
  Utensils,
  TrendingDown,
  TrendingUp,
  User,
  Trash2,
  ExternalLink,
  Plus,
  FileText,
  Clock,
} from 'lucide-react';
import PatientModal from './PatientModal';

export default function PatientHistoryView() {
  const { activePatient, consultations, deleteConsultation } = usePatient();
  const { loadConsultationIntoSession, resetCurrentSession } = useNutrition();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!activePatient) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
        <User className="w-12 h-12 mx-auto mb-3 opacity-40 text-emerald-500" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No hay ningún paciente seleccionado
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Selecciona un paciente en la barra superior o crea uno nuevo para consultar su historial de citas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ficha Resumen del Paciente Activo */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-lg font-black shadow-md shadow-emerald-500/20">
              {activePatient.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activePatient.fullName}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {activePatient.sex === 'male' ? 'Hombre' : 'Mujer'}, {activePatient.age} años
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Estatura: <strong>{activePatient.height} cm</strong> • Objetivo:{' '}
                <strong className="capitalize text-emerald-600 dark:text-emerald-400">
                  {activePatient.objective?.replace('_', ' ') || 'General'}
                </strong>
                {activePatient.phone && ` • Tel: ${activePatient.phone}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Editar Ficha
            </button>
            <button
              onClick={resetCurrentSession}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Consulta</span>
            </button>
          </div>
        </div>

        {activePatient.clinicalNotes && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
            <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Notas Clínicas:</strong> {activePatient.clinicalNotes}
            </span>
          </div>
        )}
      </div>

      {/* Historial Cronológico de Evaluaciones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Consultas Registradas ({consultations.length})</span>
          </h3>
        </div>

        {consultations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center text-slate-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              No hay consultas archivadas para este paciente todavía.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Ve a la pestaña de &quot;Evaluación&quot; para registrar su gasto METs e ingesta diaria, y haz clic en &quot;Guardar&quot; en la cabecera.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
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
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        {formattedDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadConsultationIntoSession(c)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
                        title="Cargar esta consulta en la calculadora activa"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir en Calculadora</span>
                      </button>

                      <button
                        onClick={() => deleteConsultation(c.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                        title="Eliminar consulta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {/* Antropometría */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Peso Registrado</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {c.biometrics.weight} kg
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {c.biometrics.bodyFatPercentage ? `${c.biometrics.bodyFatPercentage}% grasa` : 'Talla: ' + c.biometrics.height + ' cm'}
                      </p>
                    </div>

                    {/* Gasto Energético GETD */}
                    <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40">
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-semibold">GETD (METs)</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {c.getd} kcal
                      </p>
                      <p className="text-[10px] text-slate-500">
                        TMB: {c.tmb} kcal
                      </p>
                    </div>

                    {/* Ingesta Registrada */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40">
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Ingesta Diaria</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {c.totalCaloriesIn} kcal
                      </p>
                      <p className="text-[10px] text-slate-500">
                        P: {c.totalProteinIn}g • C: {c.totalCarbsIn}g • G: {c.totalFatIn}g
                      </p>
                    </div>

                    {/* Balance */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Balance Calórico</p>
                      <p
                        className={`text-sm font-bold mt-0.5 flex items-center gap-1 ${
                          isDeficit ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {isDeficit ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                        <span>{c.balanceCalories > 0 ? `+${c.balanceCalories}` : c.balanceCalories} kcal</span>
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {isDeficit ? 'Déficit calórico' : 'Superávit calórico'}
                      </p>
                    </div>
                  </div>

                  {c.notes && (
                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 italic">
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

