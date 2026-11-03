import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Calendar, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ isOpen, onOpenInvitation }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#e6ca85', '#ffffff', '#f4a59d', '#d4af37']
    });

    setTimeout(() => {
      onOpenInvitation();
      setIsOpening(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl perspective-2000"
        >
          {/* 3D Modern Luxury Invitation Box Container */}
          <motion.div
            initial={{ scale: 0.85, rotateX: 20, y: 40 }}
            animate={
              isOpening
                ? { scale: 1.05, rotateX: 0, y: -20, opacity: 0 }
                : { scale: 1, rotateX: 0, y: 0, opacity: 1 }
            }
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-[var(--border-light)] text-center shadow-2xl overflow-hidden"
          >
            {/* Subtle Lighting Reflection on Card */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none opacity-40" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none opacity-40" />

            {/* Top Monogram Emblem */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full border border-dashed border-[var(--accent-gold)] p-1 flex items-center justify-center relative"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--accent-gold)] flex items-center justify-center shadow-inner">
                <span className="font-display text-sm tracking-widest text-[var(--accent-gold)] font-bold">
                  S & A
                </span>
              </div>
            </motion.div>

            {/* Modern Header Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[rgba(230,202,133,0.1)] border border-[var(--border-light)] text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-medium mb-3">
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>Formal Wedding Invitation</span>
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display gold-text-gradient font-bold tracking-tight mb-2">
              Suryaveer & Ananya
            </h2>

            <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] tracking-wide mb-6">
              Together with our families, we joyfully invite you to celebrate the sacred union and wedding celebrations of our lives.
            </p>

            {/* Event Highlights Pill */}
            <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] space-y-2 mb-8 text-xs font-sans-modern text-[var(--text-main)]">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="font-medium">November 24 & 25, 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>The Rajvilas Palace & Mandapam • Udaipur, India</span>
              </div>
            </div>

            {/* 3D Interactive Reveal Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-[0.2em] font-bold shadow-xl hover:shadow-[0_0_25px_var(--accent-glow)] transition-all duration-300"
            >
              <span>{isOpening ? 'Opening Invitation...' : 'Enter Wedding Celebration'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <p className="mt-3 text-[11px] font-sans-modern text-[var(--text-muted)]">
              Click to view wedding details, ceremonies, 3D couple cards & RSVP
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
