'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  emoji?: string;
  badge?: number | string;
}

interface FluidTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function FluidTabs({ tabs, activeTab, onChange, className = '' }: FluidTabsProps) {
  return (
    <div className={`flex items-center p-1.5 bg-stone-100/90 dark:bg-slate-800/90 rounded-2xl relative ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-colors z-10 flex items-center justify-center gap-2 flex-1"
          >
            {isActive && (
              <motion.div
                layoutId="activeFluidTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-md shadow-stone-900/5 dark:shadow-black/20"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.emoji && <span className="text-base">{tab.emoji}</span>}
              <span className={isActive ? 'text-stone-950 dark:text-white' : 'text-stone-600 dark:text-slate-400'}>
                {tab.label}
              </span>
              {tab.badge !== undefined && Number(tab.badge) > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-black bg-emerald-500 text-white">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
