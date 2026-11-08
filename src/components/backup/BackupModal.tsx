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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#1c1c1e] border border-zinc-200/80 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Copias de Seguridad & Nube
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Respaldo de expedientes clínicos, consultas y catálogo
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

        <div className="p-6 space-y-4">
          {/* Exportar */}
          <div className="p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/30 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                Descargar Respaldo Completo (JSON)
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                Guarda todos tus pacientes, consultas y alimentos personalizados en tu equipo de forma segura.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ED] text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 shrink-0 apple-btn"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>

          {/* Importar */}
          <div className="p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/30 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                Restaurar Respaldo
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                Carga un archivo JSON previo para transferir tus datos entre dispositivos.
              </p>
            </div>
            <label className="px-3.5 py-2 rounded-xl bg-zinc-200/80 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer apple-btn">
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
            <div className="p-3.5 rounded-2xl bg-[#30D158]/15 border border-[#30D158]/20 text-[#30D158] text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Datos restaurados con éxito. Recargando aplicación...</span>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="p-3.5 rounded-2xl bg-[#FF2D55]/15 border border-[#FF2D55]/20 text-[#FF2D55] text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Plan de Despliegue en la Red */}
          <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-200">
              <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
              <span>Despliegue Cloud & Base de Datos:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
              <li>
                <strong>Vercel / Netlify:</strong> Compilación estática optimizada para desplegar inmediatamente gratis.
              </li>
              <li>
                <strong>Capa de Datos:</strong> Desacoplada a través del repositorio en <code>dataService.ts</code> para migrar a PostgreSQL / Supabase cuando lo requieras.
              </li>
            </ol>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 apple-btn"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
