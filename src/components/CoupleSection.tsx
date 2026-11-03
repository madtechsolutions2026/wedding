import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, GraduationCap, Briefcase, RotateCcw, ArrowUpRight } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { BRIDE_PROFILE, GROOM_PROFILE } from '../data/weddingData';
import type { CoupleProfile } from '../types';

export const CoupleSection: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<CoupleProfile | null>(null);
  const [isGroomFlipped, setIsGroomFlipped] = useState(false);
  const [isBrideFlipped, setIsBrideFlipped] = useState(false);

  return (
    <section id="couple" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-light)] text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>The Newlyweds</span>
            <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display gold-text-gradient font-bold mb-3 tracking-tight">
            Meet the Bride & Groom
          </h2>

          <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] max-w-xl mx-auto">
            Hover or tap to experience 3D depth, flip to read their personal vows, or open their full editorial story.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-5" />
        </div>

        {/* 3D Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Groom Card (Interactive 3D Tilt & 3D Flip) */}
          <TiltCard3D intensity={12}>
            <div className="relative min-h-[580px] w-full perspective-1000">
              <motion.div
                animate={{ rotateY: isGroomFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                {/* FRONT FACE */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`${isGroomFlipped ? 'hidden' : 'flex'} flex-col h-full justify-between`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-[rgba(230,202,133,0.1)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                        The Groom
                      </span>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setIsGroomFlipped(true);
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-sans-modern uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Flip 3D Card</span>
                      </button>
                    </div>

                    {/* Image with 3D Depth */}
                    <div className="relative mx-auto w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-2xl mb-5 group">
                      <img
                        src={GROOM_PROFILE.image}
                        alt={GROOM_PROFILE.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
                    </div>

                    <h3 className="text-2xl font-display text-[var(--text-main)] font-bold">
                      {GROOM_PROFILE.name}
                    </h3>
                    <p className="text-xs font-sans-modern text-[var(--text-muted)] mt-1">
                      {GROOM_PROFILE.parents}
                    </p>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedProfile(GROOM_PROFILE)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>Full Bio & Lineage</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsGroomFlipped(true)}
                      className="px-4 py-3 rounded-xl glass-panel border border-[var(--border-light)] text-[var(--text-main)] hover:border-[var(--accent-gold)] text-xs font-sans-modern"
                    >
                      Vows
                    </button>
                  </div>
                </div>

                {/* BACK FACE (3D Flip View) */}
                <div
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                  className={`${isGroomFlipped ? 'flex' : 'hidden'} flex-col h-full justify-between text-left`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[var(--border-light)] pb-3">
                      <div>
                        <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold block">
                          Groom Story & Vow
                        </span>
                        <h4 className="text-lg font-display text-[var(--text-main)] font-bold">
                          {GROOM_PROFILE.name}
                        </h4>
                      </div>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setIsGroomFlipped(false);
                        }}
                        className="p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] space-y-2 text-xs font-sans-modern text-[var(--text-muted)]">
                      <p className="flex items-center gap-2 text-[var(--text-main)]">
                        <GraduationCap className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>{GROOM_PROFILE.education}</span>
                      </p>
                      <p className="flex items-center gap-2 text-[var(--text-main)]">
                        <Briefcase className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>{GROOM_PROFILE.profession}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl glass-panel border border-[var(--border-light)]">
                      <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold block mb-1">
                        Suryaveer's Vow to Ananya
                      </span>
                      <p className="text-xs font-editorial text-[var(--text-main)] italic leading-relaxed">
                        {GROOM_PROFILE.quote}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {GROOM_PROFILE.interests.map((int, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[10px] font-sans-modern bg-[rgba(230,202,133,0.08)] border border-[var(--border-light)] text-[var(--accent-gold)]"
                        >
                          #{int}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfile(GROOM_PROFILE)}
                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold shadow-lg"
                  >
                    Open Complete Profile
                  </button>
                </div>
              </motion.div>
            </div>
          </TiltCard3D>

          {/* Bride Card (Interactive 3D Tilt & 3D Flip) */}
          <TiltCard3D intensity={12}>
            <div className="relative min-h-[580px] w-full perspective-1000">
              <motion.div
                animate={{ rotateY: isBrideFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                {/* FRONT FACE */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`${isBrideFlipped ? 'hidden' : 'flex'} flex-col h-full justify-between`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-[rgba(230,202,133,0.1)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                        The Bride
                      </span>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setIsBrideFlipped(true);
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-sans-modern uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Flip 3D Card</span>
                      </button>
                    </div>

                    {/* Image with 3D Depth */}
                    <div className="relative mx-auto w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-2xl mb-5 group">
                      <img
                        src={BRIDE_PROFILE.image}
                        alt={BRIDE_PROFILE.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
                    </div>

                    <h3 className="text-2xl font-display text-[var(--text-main)] font-bold">
                      {BRIDE_PROFILE.name}
                    </h3>
                    <p className="text-xs font-sans-modern text-[var(--text-muted)] mt-1">
                      {BRIDE_PROFILE.parents}
                    </p>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedProfile(BRIDE_PROFILE)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>Full Bio & Lineage</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsBrideFlipped(true)}
                      className="px-4 py-3 rounded-xl glass-panel border border-[var(--border-light)] text-[var(--text-main)] hover:border-[var(--accent-gold)] text-xs font-sans-modern"
                    >
                      Vows
                    </button>
                  </div>
                </div>

                {/* BACK FACE (3D Flip View) */}
                <div
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                  className={`${isBrideFlipped ? 'flex' : 'hidden'} flex-col h-full justify-between text-left`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[var(--border-light)] pb-3">
                      <div>
                        <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold block">
                          Bride Story & Vow
                        </span>
                        <h4 className="text-lg font-display text-[var(--text-main)] font-bold">
                          {BRIDE_PROFILE.name}
                        </h4>
                      </div>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setIsBrideFlipped(false);
                        }}
                        className="p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] space-y-2 text-xs font-sans-modern text-[var(--text-muted)]">
                      <p className="flex items-center gap-2 text-[var(--text-main)]">
                        <GraduationCap className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>{BRIDE_PROFILE.education}</span>
                      </p>
                      <p className="flex items-center gap-2 text-[var(--text-main)]">
                        <Briefcase className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>{BRIDE_PROFILE.profession}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl glass-panel border border-[var(--border-light)]">
                      <span className="text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold block mb-1">
                        Ananya's Vow to Suryaveer
                      </span>
                      <p className="text-xs font-editorial text-[var(--text-main)] italic leading-relaxed">
                        {BRIDE_PROFILE.quote}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {BRIDE_PROFILE.interests.map((int, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[10px] font-sans-modern bg-[rgba(230,202,133,0.08)] border border-[var(--border-light)] text-[var(--accent-gold)]"
                        >
                          #{int}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfile(BRIDE_PROFILE)}
                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold shadow-lg"
                  >
                    Open Complete Profile
                  </button>
                </div>
              </motion.div>
            </div>
          </TiltCard3D>
        </div>

        {/* 3D Sacred Mandap Cinematic Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-3xl overflow-hidden border border-[var(--border-light)] glass-panel-elevated relative"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[460px]">
            <img
              src="/images/couple.jpg"
              alt="Sacred Mandap Ceremony"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)]/80" />

            <div className="absolute bottom-6 left-6 right-6 text-center md:text-left md:max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[rgba(230,202,133,0.15)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold mb-2">
                The Sacred Union
              </span>
              <h3 className="text-2xl sm:text-4xl font-display text-[var(--text-main)] font-bold leading-tight">
                Two Souls, Seven Sacred Vows, One Eternal Journey
              </h3>
              <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] mt-2">
                Blessed by our ancestors and surrounded by family at the divine lakefront Mandapam.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile Detail Animated Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-left">
                <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border border-[var(--border-light)] flex-shrink-0 shadow-xl">
                  <img
                    src={selectedProfile.image}
                    alt={selectedProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 w-full">
                  <span className="text-xs font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                    {selectedProfile.title}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold">
                    {selectedProfile.name}
                  </h3>

                  <div className="space-y-1 text-xs font-sans-modern text-[var(--text-muted)] border-t border-b border-[var(--border-light)] py-3">
                    <p><strong className="text-[var(--text-main)]">Parents:</strong> {selectedProfile.parents}</p>
                    <p><strong className="text-[var(--text-main)]">Grandparents:</strong> {selectedProfile.grandparents}</p>
                    <p><strong className="text-[var(--text-main)]">Education:</strong> {selectedProfile.education}</p>
                    <p><strong className="text-[var(--text-main)]">Profession:</strong> {selectedProfile.profession}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-center text-xs font-sans-modern">
                    <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                      <span className="text-[10px] text-[var(--accent-gold)] block uppercase">Sun Sign / Zodiac</span>
                      <span className="text-xs font-bold text-[var(--text-main)]">{selectedProfile.zodiac}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                      <span className="text-[10px] text-[var(--accent-gold)] block uppercase">Auspicious Star</span>
                      <span className="text-xs font-bold text-[var(--text-main)]">{selectedProfile.star}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-left">
                <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] mb-1 font-bold">
                    Personal Story & Values
                  </h4>
                  <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] leading-relaxed">
                    {selectedProfile.bio}
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-[var(--border-light)]">
                  <p className="text-xs sm:text-sm font-editorial text-[var(--text-main)] italic">
                    {selectedProfile.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
