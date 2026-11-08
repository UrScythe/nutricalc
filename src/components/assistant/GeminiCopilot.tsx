'use client';

import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { Sparkles, Send, Loader2, CheckCircle2, AlertCircle, Bot, ChevronDown, ChevronUp } from 'lucide-react';

export default function GeminiCopilot() {
  const {
    availableFoods,
    addFoodEntry,
    foodEntries,
    getdResult,
    biometrics,
    applyExchange,
    clearFoodEntries,
  } = useNutrition();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastActionFeedback, setLastActionFeedback] = useState<string | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const quickPrompts = [
    { label: '🍗 Almuerzo Magro (Pollo + Arroz)', text: 'Agrega al almuerzo 150g de pechuga de pollo cocida y 180g de arroz blanco' },
    { label: '🍳 Desayuno Proteico (Huevos + Avena)', text: 'Agrega al desayuno 120g de huevos revueltos y 150g de avena cocida' },
    { label: '🥑 Snack Saludable', text: 'Agrega a los snacks 150g de manzana con 30g de nueces o almendras' },
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || prompt;
    if (!textToSend.trim() || loading) return;

    setLoading(true);
    setLastActionFeedback(null);
    setErrorFeedback(null);

    try {
      const contextoActual = {
        peso: biometrics.weight,
        altura: biometrics.height,
        edad: biometrics.age,
        getd: getdResult.totalGETD,
        alimentos: foodEntries.map((fe) => ({
          id: fe.id,
          nombre: fe.foodName,
          comida: fe.meal,
          gramos: fe.grams,
          calorias: fe.calories,
        })),
      };

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: textToSend,
          contextoActual,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.tipo === 'accion') {
        const { funcion, argumentos, texto } = data;

        if (funcion === 'agregarOModificarAlimento') {
          const { comida, nombreAlimento, gramos, porcionPlato } = argumentos;

          // Buscar el alimento en el catálogo de NutriCalc
          const matchingFood = availableFoods.find((f) =>
            f.name.toLowerCase().includes(nombreAlimento.toLowerCase()) ||
            nombreAlimento.toLowerCase().includes(f.name.toLowerCase())
          );

          if (matchingFood) {
            addFoodEntry(matchingFood, gramos, porcionPlato || `${gramos}g`, comida as any);
            setLastActionFeedback(
              `✓ Se agregaron ${gramos}g de ${matchingFood.name} en ${comida.toUpperCase()}. ${texto ? `(${texto})` : ''}`
            );
          } else {
            // Si no existe, crear un alimento temporal adecuado
            const tempFood = {
              id: 'ai_' + Date.now(),
              name: nombreAlimento,
              emoji: '🍽️',
              category: 'proteina' as const,
              caloriesPer100g: 130,
              proteinPer100g: 15,
              carbsPer100g: 10,
              fatPer100g: 3,
              visualPortions: [],
            };
            addFoodEntry(tempFood, gramos, porcionPlato || `${gramos}g`, comida as any);
            setLastActionFeedback(
              `✓ Se agregaron ${gramos}g de ${nombreAlimento} en ${comida.toUpperCase()}.`
            );
          }
        } else if (funcion === 'vaciarComida') {
          if (argumentos.comida === 'todo') {
            clearFoodEntries();
            setLastActionFeedback('✓ Se vaciaron todos los alimentos del día.');
          } else {
            setLastActionFeedback(`✓ Solicitud de vaciar ${argumentos.comida} procesada.`);
          }
        } else {
          setLastActionFeedback(texto || `Acción procesada: ${funcion}`);
        }
      } else if (data.tipo === 'texto') {
        setLastActionFeedback(data.texto);
      }

      setPrompt('');
      setIsExpanded(true);
    } catch (err: any) {
      setErrorFeedback(err.message || 'Error al comunicarse con el asistente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071e3] to-[#30D158] p-[2px] flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-white dark:bg-black rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0071e3]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Gemini Copilot
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20">
                Google AI Studio
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Controla metas, agrega alimentos o cambia dietas con lenguaje natural.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          title={isExpanded ? 'Colapsar Copilot' : 'Expandir Copilot'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Input de Instrucción */}
      <div className="mt-3.5 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ej: Agrega 150g de pechuga de pollo y 180g de arroz en el almuerzo..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            className="w-full pl-3.5 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <Loader2 className="w-4 h-4 animate-spin text-[#0071e3]" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={loading || !prompt.trim()}
          className="px-4 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ED] disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 apple-btn shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ejecutar</span>
        </button>
      </div>

      {/* Sugerencias Rápidas y Respuestas (Expandibles) */}
      {isExpanded && (
        <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
          {/* Chips de acciones rápidas */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 mr-1">
              Pruebas rápidas:
            </span>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(qp.text)}
                disabled={loading}
                className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 whitespace-nowrap transition apple-btn"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Feedback de la acción ejecutada */}
          {lastActionFeedback && (
            <div className="p-3 rounded-xl bg-[#30D158]/10 border border-[#30D158]/20 text-[#30D158] text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{lastActionFeedback}</span>
            </div>
          )}

          {/* Alerta de Error */}
          {errorFeedback && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorFeedback}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

