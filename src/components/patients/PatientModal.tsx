'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { Patient, Sex } from '../../types';
import { X, Check, Heart, Sparkles, Minus, Plus } from 'lucide-react';

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

  const OBJECTIVES: { id: string; label: string; emoji: string; desc: string }[] = [
    { id: 'perdida_grasa', label: 'Perder Grasa', emoji: '🔥', desc: 'Déficit calórico suave y progresivo' },
    { id: 'hipertrofia', label: 'Aumentar Músculo', emoji: '💪', desc: 'Superávit con alta ingesta proteica' },
    { id: 'rendimiento', label: 'Rendimiento', emoji: '⚡', desc: 'Energía sostenida para atletas' },
    { id: 'mantenimiento', label: 'Salud y Balance', emoji: '🌱', desc: 'Equilibrio metabólico y hábitos' },
  ];

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
      <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        <div className="px-6 py-5 border-b border-stone-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👤</span>
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                {patientToEdit ? 'Editar Expediente' : '¡Nuevo Paciente! 👋'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                Crea su ficha para guardar el historial de todas sus consultas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition bouncy-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Nombre Completo */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
              Nombre y Apellidos *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. María Fernanda Gómez..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Sexo, Edad, Estatura */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
                Sexo Biológico
              </label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    sex === 'male' ? 'bg-white dark:bg-slate-700 text-emerald-700 shadow-sm' : 'text-stone-600'
                  }`}
                >
                  Hombre 👨
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    sex === 'female' ? 'bg-white dark:bg-slate-700 text-emerald-700 shadow-sm' : 'text-stone-600'
                  }`}
                >
                  Mujer 👩
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
                Edad (años)
              </label>
              <input
                type="number"
                min={10}
                max={110}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-center text-sm font-black text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
                Estatura (cm)
              </label>
              <input
                type="number"
                min={100}
                max={230}
                required
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-center text-sm font-black text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Tarjetas de Objetivo Principal */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-2">
              Objetivo Principal del Paciente:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {OBJECTIVES.map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setObjective(obj.id)}
                  className={`p-3 rounded-2xl border text-left transition-all bouncy-hover ${
                    objective === obj.id
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500 shadow-sm'
                      : 'border-stone-200/80 dark:border-slate-800 hover:bg-stone-50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{obj.emoji}</span>
                  <p className="text-xs font-black text-stone-900 dark:text-white">
                    {obj.label}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">
                    {obj.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                placeholder="+57 300 123..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-xs font-bold text-stone-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="paciente@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-xs font-bold text-stone-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notas Clínicas */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-slate-400 mb-1">
              Notas Clínicas o Preferencias Alimentarias
            </label>
            <textarea
              rows={2}
              placeholder="Ej. Alergia al maní, no consume lácteos, entrena pesas temprano..."
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold rounded-2xl text-stone-600 dark:text-slate-400 hover:bg-stone-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-black rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition bouncy-hover"
            >
              {patientToEdit ? 'Actualizar Ficha' : 'Guardar Paciente ✨'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
