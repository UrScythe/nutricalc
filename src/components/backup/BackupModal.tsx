'use client';

import React, { useState } from 'react';
import { exportFullBackup, importFullBackup } from '../../services/dataService';
import { Download, Upload, Cloud, ShieldCheck, X, Check, AlertCircle } from 'lucide-react';

interface BackupModalProps {
  onClose: () => void;
}

export default function BackupModal({ onClose }: BackupModalProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = () => {
    const json = exportFullBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutricalc_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const ok = importFullBackup(content);
        if (ok) {
          setImportStatus('success');
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          setImportStatus('error');
          setErrorMessage('El archivo no contiene un formato de respaldo válido de NutriCalc.');
        }
      } catch (err: any) {
        setImportStatus('error');
        setErrorMessage(err.message || 'Error al procesar el archivo');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Copias de Seguridad & Plan Cloud
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Respaldo de expedientes, historial de consultas y alimentos
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

        <div className="p-5 space-y-4">
          {/* Exportar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Descargar Respaldo Completo (JSON)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Guarda todos tus pacientes, citas registradas y alimentos propios en un archivo seguro en tu equipo.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>

          {/* Importar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Restaurar Respaldo
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Carga un archivo JSON previo para recuperar todos tus datos en cualquier computador o navegador.
              </p>
            </div>
            <label className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Importar</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {importStatus === 'success' && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>¡Datos restaurados con éxito! Recargando aplicación...</span>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="p-3 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Plan de Despliegue en la Red & Futura Base de Datos */}
          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Plan para Subir a la Red & Base de Datos Remota:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
              <li>
                <strong>Despliegue Web inmediato:</strong> Esta aplicación está construida sobre Next.js 14 pura. Puedes subirla hoy mismo a <strong>Vercel o Netlify</strong> gratis y usarla desde tu celular o consultorio con tu propio dominio.
              </li>
              <li>
                <strong>Capa Desacoplada:</strong> Todo el almacenamiento pasa por <code>src/services/dataService.ts</code>. Para conectar una base de datos en la nube (como <strong>Supabase / PostgreSQL</strong>), solo se configuran las variables de entorno en Vercel sin modificar tus interfaces ni cálculos.
              </li>
            </ol>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

