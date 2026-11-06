// Capa de Servicio de Datos (Repository Pattern)
// Fase 1: LocalStorage con persistencia y copias de seguridad en JSON
// Fase 2: Compatible para conectar Supabase / SQLite / PostgreSQL
import { Patient, ConsultationRecord, Food } from '../types';
import { DEFAULT_FOODS } from '../data/defaultFoods';

const KEYS = {
  PATIENTS: 'nutricalc_patients_v1',
  CONSULTATIONS: 'nutricalc_consultations_v1',
  FOODS: 'nutricalc_foods_v1',
  ACTIVE_PATIENT: 'nutricalc_active_patient_id_v1',
};

// ==================== GESTIÓN DE PACIENTES ====================

export function getStoredPatients(): Patient[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.PATIENTS);
    if (!raw) {
      // Paciente demo inicial para primera experiencia
      const demo: Patient = {
        id: 'patient_demo',
        fullName: 'Carlos Gómez (Paciente Demo)',
        sex: 'male',
        age: 30,
        height: 175,
        phone: '+57 300 123 4567',
        objective: 'perdida_grasa',
        clinicalNotes: 'Paciente con buena adherencia, practica crossfit 3 veces por semana.',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(KEYS.PATIENTS, JSON.stringify([demo]));
      return [demo];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al cargar pacientes:', e);
    return [];
  }
}

export function savePatient(patient: Patient): Patient[] {
  const current = getStoredPatients();
  const existingIdx = current.findIndex((p) => p.id === patient.id);
  let updated: Patient[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = patient;
  } else {
    updated = [patient, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(updated));
  }
  return updated;
}

export function deletePatient(patientId: string): Patient[] {
  const current = getStoredPatients();
  const updated = current.filter((p) => p.id !== patientId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(updated));
    // Eliminar también las consultas asociadas a este paciente
    const allConsultations = getStoredConsultations();
    const remaining = allConsultations.filter((c) => c.patientId !== patientId);
    localStorage.setItem(KEYS.CONSULTATIONS, JSON.stringify(remaining));
  }
  return updated;
}

export function getActivePatientId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEYS.ACTIVE_PATIENT);
}

export function setActivePatientId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.ACTIVE_PATIENT, id);
}

// ==================== HISTORIAL DE CONSULTAS ====================

export function getStoredConsultations(): ConsultationRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.CONSULTATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error al cargar consultas:', e);
    return [];
  }
}

export function getConsultationsByPatient(patientId: string): ConsultationRecord[] {
  const all = getStoredConsultations();
  return all
    .filter((c) => c.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function saveConsultationRecord(record: ConsultationRecord): ConsultationRecord[] {
  const current = getStoredConsultations();
  const existingIdx = current.findIndex((c) => c.id === record.id);
  let updated: ConsultationRecord[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = record;
  } else {
    updated = [record, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.CONSULTATIONS, JSON.stringify(updated));
  }
  return updated;
}

export function deleteConsultationRecord(id: string): ConsultationRecord[] {
  const current = getStoredConsultations();
  const updated = current.filter((c) => c.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.CONSULTATIONS, JSON.stringify(updated));
  }
  return updated;
}

// ==================== BASE DE DATOS DE ALIMENTOS ====================

export function getStoredFoods(): Food[] {
  if (typeof window === 'undefined') return DEFAULT_FOODS;
  try {
    const raw = localStorage.getItem(KEYS.FOODS);
    if (!raw) {
      localStorage.setItem(KEYS.FOODS, JSON.stringify(DEFAULT_FOODS));
      return DEFAULT_FOODS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al cargar alimentos:', e);
    return DEFAULT_FOODS;
  }
}

export function saveFood(food: Food): Food[] {
  const current = getStoredFoods();
  const existingIdx = current.findIndex((f) => f.id === food.id);
  let updated: Food[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = food;
  } else {
    updated = [food, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.FOODS, JSON.stringify(updated));
  }
  return updated;
}

export function deleteFood(foodId: string): Food[] {
  const current = getStoredFoods();
  const updated = current.filter((f) => f.id !== foodId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.FOODS, JSON.stringify(updated));
  }
  return updated;
}

export function resetFoodsToDefault(): Food[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.FOODS, JSON.stringify(DEFAULT_FOODS));
  }
  return DEFAULT_FOODS;
}

// ==================== BACKUP (EXPORTAR / IMPORTAR) ====================

export interface FullBackupData {
  version: string;
  exportedAt: string;
  patients: Patient[];
  consultations: ConsultationRecord[];
  foods: Food[];
}

export function exportFullBackup(): string {
  const data: FullBackupData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    patients: getStoredPatients(),
    consultations: getStoredConsultations(),
    foods: getStoredFoods(),
  };
  return JSON.stringify(data, null, 2);
}

export function importFullBackup(jsonString: string): boolean {
  try {
    const parsed: FullBackupData = JSON.parse(jsonString);
    if (!parsed.patients || !parsed.foods) {
      throw new Error('Formato de respaldo no válido');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.PATIENTS, JSON.stringify(parsed.patients));
      localStorage.setItem(KEYS.CONSULTATIONS, JSON.stringify(parsed.consultations || []));
      localStorage.setItem(KEYS.FOODS, JSON.stringify(parsed.foods));
    }
    return true;
  } catch (e) {
    console.error('Error al importar copia de seguridad:', e);
    return false;
  }
}

