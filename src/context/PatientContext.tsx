'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient, ConsultationRecord } from '../types';
import {
  getStoredPatients,
  savePatient as persistPatient,
  deletePatient as removePatient,
  getActivePatientId,
  setActivePatientId as persistActivePatientId,
  getConsultationsByPatient,
  saveConsultationRecord as persistConsultation,
  deleteConsultationRecord as removeConsultation,
} from '../services/dataService';

interface PatientContextType {
  patients: Patient[];
  activePatient: Patient | null;
  consultations: ConsultationRecord[];
  setActivePatient: (patient: Patient | null) => void;
  createOrUpdatePatient: (patient: Patient) => void;
  deletePatient: (patientId: string) => void;
  saveConsultation: (record: ConsultationRecord) => void;
  deleteConsultation: (consultationId: string) => void;
  refreshConsultations: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatient, setActivePatientState] = useState<Patient | null>(null);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);

  // Inicializar pacientes desde almacenamiento
  useEffect(() => {
    const loadedPatients = getStoredPatients();
    setPatients(loadedPatients);

    const savedActiveId = getActivePatientId();
    if (savedActiveId) {
      const match = loadedPatients.find((p) => p.id === savedActiveId);
      if (match) {
        setActivePatientState(match);
        setConsultations(getConsultationsByPatient(match.id));
        return;
      }
    }

    // Por defecto activar el primer paciente si existe
    if (loadedPatients.length > 0) {
      setActivePatientState(loadedPatients[0]);
      persistActivePatientId(loadedPatients[0].id);
      setConsultations(getConsultationsByPatient(loadedPatients[0].id));
    }
  }, []);

  const setActivePatient = (patient: Patient | null) => {
    setActivePatientState(patient);
    if (patient) {
      persistActivePatientId(patient.id);
      setConsultations(getConsultationsByPatient(patient.id));
    } else {
      setConsultations([]);
    }
  };

  const createOrUpdatePatient = (patient: Patient) => {
    const updatedList = persistPatient(patient);
    setPatients(updatedList);
    setActivePatient(patient);
  };

  const deletePatient = (patientId: string) => {
    const updatedList = removePatient(patientId);
    setPatients(updatedList);
    if (activePatient?.id === patientId) {
      const nextActive = updatedList.length > 0 ? updatedList[0] : null;
      setActivePatient(nextActive);
    }
  };

  const saveConsultation = (record: ConsultationRecord) => {
    persistConsultation(record);
    if (activePatient) {
      setConsultations(getConsultationsByPatient(activePatient.id));
    }
  };

  const deleteConsultation = (consultationId: string) => {
    removeConsultation(consultationId);
    if (activePatient) {
      setConsultations(getConsultationsByPatient(activePatient.id));
    }
  };

  const refreshConsultations = () => {
    if (activePatient) {
      setConsultations(getConsultationsByPatient(activePatient.id));
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        activePatient,
        consultations,
        setActivePatient,
        createOrUpdatePatient,
        deletePatient,
        saveConsultation,
        deleteConsultation,
        refreshConsultations,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient debe utilizarse dentro de un PatientProvider');
  }
  return context;
}

