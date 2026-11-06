import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { PatientProvider } from '../context/PatientContext';
import { NutritionProvider } from '../context/NutritionContext';

export const metadata: Metadata = {
  title: 'NutriCalc Pro — Evaluación Nutricional & Gasto METs',
  description:
    'Software profesional para evaluación nutricional, cálculo de GETD mediante METs, registro de ingesta 24h con porciones en plato e intercambios inteligentes de alimentos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <PatientProvider>
            <NutritionProvider>
              {children}
            </NutritionProvider>
          </PatientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

