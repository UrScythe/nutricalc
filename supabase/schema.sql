-- ========================================================
-- NUTRICALC PRO — ESQUEMA DE BASE DE DATOS (SUPABASE / POSTGRESQL)
-- ========================================================
-- Este script crea las tablas listas para conectar tu base de datos
-- en la nube de Supabase (gratuita) en la Fase 2.

-- 1. Tabla de Pacientes
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('male', 'female')),
  age INTEGER NOT NULL,
  height NUMERIC(5, 2) NOT NULL, -- en cm
  phone TEXT,
  email TEXT,
  objective TEXT DEFAULT 'perdida_grasa',
  clinical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Consultas e Historial Clínico
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  consultation_date TIMESTAMPTZ DEFAULT NOW(),
  weight NUMERIC(5, 2) NOT NULL, -- en kg
  height NUMERIC(5, 2) NOT NULL,
  body_fat_percentage NUMERIC(4, 2),
  tmb_formula TEXT NOT NULL DEFAULT 'mifflin',
  tmb_calories NUMERIC(7, 2) NOT NULL,
  activity_expenditure NUMERIC(7, 2) NOT NULL,
  eta_calories NUMERIC(7, 2) NOT NULL,
  getd_total NUMERIC(7, 2) NOT NULL,
  activities_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  food_entries_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_calories_in NUMERIC(7, 2) NOT NULL,
  total_protein_in NUMERIC(6, 2) NOT NULL,
  total_carbs_in NUMERIC(6, 2) NOT NULL,
  total_fat_in NUMERIC(6, 2) NOT NULL,
  balance_calories NUMERIC(7, 2) NOT NULL,
  clinical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Alimentos Personalizados (creados por el nutricionista)
CREATE TABLE IF NOT EXISTS custom_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('proteina', 'carbohidrato', 'grasa', 'verdura', 'fruta', 'lacteo')),
  calories_per_100g NUMERIC(6, 2) NOT NULL,
  protein_per_100g NUMERIC(5, 2) NOT NULL,
  carbs_per_100g NUMERIC(5, 2) NOT NULL,
  fat_per_100g NUMERIC(5, 2) NOT NULL,
  visual_portions_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(consultation_date DESC);
CREATE INDEX IF NOT EXISTS idx_custom_foods_category ON custom_foods(category);

