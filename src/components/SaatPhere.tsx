import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { SEVEN_VOWS } from '../data/weddingData';

export const SaatPhere: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const vow = SEVEN_VOWS[activeStep];

  return (
    <section id="saat-phere" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-light)] text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-[var(--accent-gold)] animate-pulse" />
            <span>Sacred Nuptial Vows</span>
            <Flame className="w-3.5 h-3.5 text-[var(--accent-gold)] animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display gold-text-gradient font-bold mb-3 tracking-tight">
            The Seven Sacred Vows
          </h2>

          <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] max-w-xl mx-auto">
            Seven sacred steps walked together around the eternal holy fire, sealing devotion, equality, and lifelong friendship.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-5" />
        </div>

        {/* 3D Step Selector Pills (1 to 7) */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-10 overflow-x-auto py-2">
          {SEVEN_VOWS.map((item, idx) => (
            <motion.button
              key={item.step}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveStep(idx)}
              className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-sans-modern text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] shadow-[0_0_20px_var(--accent-glow)]'
                  : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-light)]'
              }`}
            >
              <span>{item.step}</span>
              {activeStep === idx && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]" />
              )}
            </motion.button>
          ))}
        </div>

        {/* 3D Active Vow Card */}
        <TiltCard3D intensity={8}>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-panel-elevated rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Ambient Flame Glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none opacity-30" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(230,202,133,0.1)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold mb-4">
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>Sacred Vow {vow.step} of 7</span>
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold mb-2">
              {vow.title}
            </h3>

            <div className="text-xs sm:text-sm font-sans-modern uppercase tracking-wider text-[var(--accent-gold)] font-medium mb-6">
              {vow.subtitle}
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-[var(--border-light)] mb-8">
              <p className="text-sm sm:text-lg font-editorial text-[var(--text-main)] leading-relaxed italic">
                {vow.description}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-2 border-t border-[var(--border-light)]">
              <button
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-sans-modern uppercase tracking-wider transition-all ${
                  activeStep === 0
                    ? 'opacity-30 cursor-not-allowed text-[var(--text-muted)]'
                    : 'glass-panel text-[var(--text-main)] hover:border-[var(--accent-gold)]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-sans-modern text-[var(--text-muted)]">
                Step {vow.step} / 7
              </span>

              <button
                onClick={() => setActiveStep(prev => Math.min(SEVEN_VOWS.length - 1, prev + 1))}
                disabled={activeStep === SEVEN_VOWS.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-sans-modern uppercase tracking-wider transition-all ${
                  activeStep === SEVEN_VOWS.length - 1
                    ? 'opacity-30 cursor-not-allowed text-[var(--text-muted)]'
                    : 'glass-panel text-[var(--text-main)] hover:border-[var(--accent-gold)]'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </TiltCard3D>
      </div>
    </section>
  );
};
