'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { Patient, Sex } from '../../types';
import { X, User, Phone, Mail, FileText, Check } from 'lucide-react';

interface PatientModalProps {
  onClose: () => void;
  patientToEdit?: Patient | null;
}

export default function PatientModal({ onClose, patientToEdit }: PatientModalProps) {
  const { createOrUpdatePatient } = usePatient();

  const [fullName, setFullName] = useState(patientToEdit?.fullName || '');
  const [sex, setSex] = useState<Sex>(patientToEdit?.sex || 'male');
  const [age, setAge] = useState<number>(patientToEdit?.age || 30);
  const [height, setHeight] = useState<number>(patientToEdit?.height || 175);
  const [phone, setPhone] = useState(patientToEdit?.phone || '');
  const [email, setEmail] = useState(patientToEdit?.email || '');
  const [objective, setObjective] = useState<any>(
    patientToEdit?.objective || 'perdida_grasa'
  );
  const [clinicalNotes, setClinicalNotes] = useState(patientToEdit?.clinicalNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newPatient: Patient = {
      id: patientToEdit?.id || 'pat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      sex,
      age: Number(age) || 30,
      height: Number(height) || 170,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      objective,
      clinicalNotes: clinicalNotes.trim() || undefined,
      createdAt: patientToEdit?.createdAt || new Date().toISOString(),
    };

    createOrUpdatePatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {patientToEdit ? 'Editar Paciente' : 'Nuevo Expediente de Paciente'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Registra la ficha para guardar su historial de consultas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {/* Nombre Completo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. María Fernanda López"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Sexo, Edad, Altura */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sexo
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Edad (años)
              </label>
              <input
                type="number"
                min={10}
                max={110}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estatura (cm)
              </label>
              <input
                type="number"
                min={100}
                max={230}
                required
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Objetivo Nutricional */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Objetivo Principal
            </label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="perdida_grasa">Pérdida de Grasa / Reducción Calórica</option>
              <option value="mantenimiento">Mantenimiento y Salud General</option>
              <option value="hipertrofia">Hipertrofia Muscular / Ganancia de Peso</option>
              <option value="rendimiento">Rendimiento Deportivo / Resistencia</option>
            </select>
          </div>

          {/* Teléfono / Email */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                placeholder="+57 300..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="paciente@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notas Clínicas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notas Clínicas / Alergias / Patologías
            </label>
            <textarea
              rows={2}
              placeholder="Ej. Intolerancia a la lactosa, hipertensión, entrena en ayunas..."
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              {patientToEdit ? 'Actualizar Ficha' : 'Guardar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

