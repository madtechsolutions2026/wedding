import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Clock, HeartHandshake, Compass } from 'lucide-react';
import { FloatingRings3D } from './FloatingRings3D';
import { WEDDING_DATE } from '../data/weddingData';

interface HeroProps {
  onOpenRsvp: () => void;
  onOpenBlessings: () => void;
  onOpenDressCode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRsvp, onOpenBlessings, onOpenDressCode }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = window.setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Dynamic 3D Rings Visual Centerpiece */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-60 z-0">
        <FloatingRings3D />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center mt-12">
        {/* Modern Top Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-[var(--border-light)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-ping" />
          <span className="text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold">
            The Royal Wedding Celebration
          </span>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="text-xs sm:text-sm font-sans-modern uppercase tracking-[0.35em] text-[var(--text-muted)] font-medium">
            Cordially Inviting You To The Wedding Of
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-6 my-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display gold-text-gradient font-bold tracking-tight">
              Suryaveer
            </h1>

            <span className="text-2xl sm:text-3xl font-editorial italic text-[var(--accent-gold)] font-light">
              &
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display gold-text-gradient font-bold tracking-tight">
              Ananya
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed pt-2">
            Son of Mrs. Gayatri Devi & Mr. Vikramaditya Rathore <br className="hidden sm:inline" />
            <span className="text-[var(--accent-gold)] mx-2">•</span>
            Daughter of Mrs. Sunita Devi & Mr. Rajeshwar Deshmukh
          </p>
        </motion.div>

        {/* Quick Date and Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs font-sans-modern"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-main)]">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span className="tracking-wide">November 24 & 25, 2026</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-main)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span className="tracking-wide">Auspicious Hour: 11:15 AM</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-main)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span className="tracking-wide">The Rajvilas Palace • Udaipur</span>
          </div>
        </motion.div>

        {/* 3D Modern Glassmorphic Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-xl mx-auto glass-panel-elevated rounded-3xl p-6 relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
            Countdown to Celebration
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-1">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]"
              >
                <span className="text-2xl sm:text-4xl font-display font-bold gold-text-gradient">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3.5"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenRsvp}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern uppercase tracking-[0.15em] text-xs font-bold shadow-xl hover:shadow-[0_0_25px_var(--accent-glow)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>RSVP Attendance</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBlessings}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-main)] font-sans-modern uppercase tracking-[0.15em] text-xs font-semibold hover:border-[var(--accent-gold)] transition-all"
          >
            <HeartHandshake className="w-4 h-4 text-[var(--accent-gold)]" />
            <span>Send Warm Blessings</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenDressCode}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-main)] font-sans-modern uppercase tracking-[0.15em] text-xs transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Dress Code</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
