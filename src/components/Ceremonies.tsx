import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, Shirt, X, CalendarPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { CEREMONIES } from '../data/weddingData';
import type { Ceremony } from '../types';

export const Ceremonies: React.FC = () => {
  const [selectedCeremony, setSelectedCeremony] = useState<Ceremony | null>(null);

  const getCalendarLink = (ceremony: Ceremony) => {
    const title = encodeURIComponent(`Suryaveer & Ananya's Wedding: ${ceremony.name}`);
    const details = encodeURIComponent(`${ceremony.description}\n\nVenue: ${ceremony.venue}\nDress Code: ${ceremony.dressCode}`);
    const location = encodeURIComponent(ceremony.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="ceremonies" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-light)] text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>Celebration Schedule</span>
            <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display gold-text-gradient font-bold mb-3 tracking-tight">
            Wedding Ceremonies
          </h2>

          <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] max-w-xl mx-auto">
            From the sunlit golden Haldi to the royal Sangeet and the sacred wedding vows, join us for every moment.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-5" />
        </div>

        {/* Ceremonies Timeline Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {CEREMONIES.map((ceremony, idx) => (
            <motion.div
              key={ceremony.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.015, y: -4 }}
              className="group relative glass-panel-elevated rounded-3xl p-6 sm:p-8 transition-all duration-300 overflow-hidden"
            >
              {/* Left Color Accent Bar */}
              <div
                className="absolute top-0 left-0 bottom-0 w-2"
                style={{ backgroundColor: ceremony.dressColor }}
              />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pl-3">
                <div className="space-y-2 flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-sans-modern uppercase tracking-wider text-[var(--accent-gold)] font-bold">
                      {ceremony.tagline}
                    </span>
                    {ceremony.muhurat && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[rgba(230,202,133,0.15)] border border-[var(--border-light)] text-[10px] font-sans-modern text-[var(--accent-gold)] uppercase font-semibold">
                        {ceremony.muhurat}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display text-[var(--text-main)] font-bold">
                    {ceremony.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] leading-relaxed max-w-2xl">
                    {ceremony.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-sans-modern text-[var(--text-main)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>{ceremony.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>{ceremony.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>{ceremony.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <Shirt className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span className="text-[var(--text-muted)] font-sans-modern">Dress Palette:</span>
                    <span className="px-2.5 py-0.5 rounded-md glass-panel text-[var(--text-main)] border border-[var(--border-light)] text-xs font-sans-modern">
                      {ceremony.dressCode}
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedCeremony(ceremony)}
                    className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-[0_0_15px_var(--accent-glow)] transition-all"
                  >
                    <span>View Rituals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getCalendarLink(ceremony)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none px-5 py-3 rounded-xl glass-panel border border-[var(--border-light)] text-[var(--text-main)] hover:border-[var(--accent-gold)] font-sans-modern text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ceremony Detail Animated Modal */}
      <AnimatePresence>
        {selectedCeremony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedCeremony(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-xl glass-panel-elevated rounded-3xl p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedCeremony(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 text-left">
                <span className="text-xs font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                  {selectedCeremony.tagline}
                </span>

                <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold">
                  {selectedCeremony.name}
                </h3>

                <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] space-y-1.5 text-xs font-sans-modern text-[var(--text-muted)]">
                  <p><strong className="text-[var(--text-main)]">Date:</strong> {selectedCeremony.date}</p>
                  <p><strong className="text-[var(--text-main)]">Time:</strong> {selectedCeremony.time}</p>
                  <p><strong className="text-[var(--text-main)]">Venue:</strong> {selectedCeremony.venue}</p>
                  {selectedCeremony.muhurat && (
                    <p><strong className="text-[var(--text-main)]">Muhurat:</strong> {selectedCeremony.muhurat}</p>
                  )}
                  <p><strong className="text-[var(--text-main)]">Dress Code:</strong> {selectedCeremony.dressCode}</p>
                </div>

                {/* Rituals List */}
                <div>
                  <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] mb-2 font-bold">
                    Key Sacred Rituals & Celebrations
                  </h4>
                  <div className="space-y-2">
                    {selectedCeremony.rituals.map((ritual, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl glass-panel border border-[var(--border-light)] text-xs font-sans-modern text-[var(--text-main)]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                        <span>{ritual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={getCalendarLink(selectedCeremony)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Sync with Google Calendar</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
