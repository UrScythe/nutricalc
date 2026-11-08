'use client';

import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { Patient, Sex } from '../../types';
import { X, User, Flame, Activity, Dumbbell, ShieldCheck } from 'lucide-react';

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

  const OBJECTIVES = [
    {
      id: 'perdida_grasa',
      label: 'Reducción de Grasa',
      icon: Flame,
      color: '#FF2D55',
      desc: 'Déficit calórico estructurado',
    },
    {
      id: 'hipertrofia',
      label: 'Hipertrofia Muscular',
      icon: Dumbbell,
      color: '#0A84FF',
      desc: 'Superávit con alta carga proteica',
    },
    {
      id: 'rendimiento',
      label: 'Rendimiento Atlético',
      icon: Activity,
      color: '#30D158',
      desc: 'Energía sostenida para competencia',
    },
    {
      id: 'mantenimiento',
      label: 'Salud y Balance',
      icon: ShieldCheck,
      color: '#FF9500',
      desc: 'Equilibrio metabólico y recomposición',
    },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#1c1c1e] border border-zinc-200/80 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {patientToEdit ? 'Editar Expediente' : 'Nuevo Expediente de Paciente'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Ficha clínica para seguimiento de consultas y evolución
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition apple-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Nombre Completo */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Nombre y Apellidos *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. María Fernanda Gómez..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
          </div>

          {/* Sexo, Edad, Estatura */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Sexo Biológico
              </label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    sex === 'male' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'
                  }`}
                >
                  Hombre
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    sex === 'female' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'
                  }`}
                >
                  Mujer
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Edad (años)
              </label>
              <input
                type="number"
                min={10}
                max={110}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-center text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Estatura (cm)
              </label>
              <input
                type="number"
                min={100}
                max={230}
                required
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-center text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              />
            </div>
          </div>

          {/* Tarjetas de Objetivo Principal */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              Objetivo Nutricional Principal:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {OBJECTIVES.map((obj) => {
                const Icon = obj.icon;
                const isSelected = objective === obj.id;

                return (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => setObjective(obj.id)}
                    className={`p-3 rounded-2xl border text-left transition-all apple-btn ${
                      isSelected
                        ? 'border-[#0071e3] bg-[#0071e3]/5 dark:bg-[#0071e3]/10 shadow-sm'
                        : 'border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 text-white"
                      style={{ backgroundColor: obj.color }}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      {obj.label}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {obj.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                placeholder="+57 300 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs font-semibold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="paciente@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs font-semibold text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notas Clínicas */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Notas Clínicas o Alergias Alimentarias
            </label>
            <textarea
              rows={2}
              placeholder="Ej. Intolerancia a la lactosa, alergia a frutos secos, entrenamiento matutino..."
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs font-normal text-zinc-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0071e3] hover:bg-[#0077ED] text-white shadow-sm transition apple-btn"
            >
              {patientToEdit ? 'Actualizar Ficha' : 'Guardar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
