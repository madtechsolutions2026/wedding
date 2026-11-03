import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import type { ColorTheme } from '../types';

interface ThemeSwitcherProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { id: ColorTheme; label: string; preview: string }[] = [
    { id: 'champagne', label: 'Champagne Gold', preview: '#e6ca85' },
    { id: 'rose', label: 'Blush Rose Gold', preview: '#f4a59d' },
    { id: 'emerald', label: 'Emerald Royalty', preview: '#34d399' }
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full glass-panel border border-[var(--border-light)] shadow-lg">
      <div className="pl-2 pr-1 text-[10px] font-sans-modern uppercase tracking-wider text-[var(--text-muted)] hidden sm:flex items-center gap-1">
        <Palette className="w-3 h-3 text-[var(--accent-gold)]" />
        <span>Theme:</span>
      </div>

      {themes.map(t => (
        <motion.button
          key={t.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onThemeChange(t.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans-modern uppercase tracking-wider transition-all duration-300 ${
            currentTheme === t.id
              ? 'bg-[var(--accent-gold)] text-[#09080e] font-bold shadow-md'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
          title={`Switch to ${t.label} theme`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/30"
            style={{ backgroundColor: t.preview }}
          />
          <span className="hidden md:inline">{t.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
