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
    <div className={`flex items-center p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 relative ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="relative px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors z-10 flex items-center justify-center gap-1.5 flex-1 apple-btn"
          >
            {isActive && (
              <motion.div
                layoutId="activeFluidTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-xl shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.emoji && <span className="text-sm">{tab.emoji}</span>}
              <span className={isActive ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 dark:text-zinc-400'}>
                {tab.label}
              </span>
              {tab.badge !== undefined && Number(tab.badge) > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#30D158] text-white">
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
