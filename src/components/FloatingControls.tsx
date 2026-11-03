import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Share2, ArrowUp, Menu, X, HeartHandshake, Check, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloatingControlsProps {
  onOpenDressCode: () => void;
  onOpenRsvp: () => void;
  onOpenBlessings: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onOpenDressCode,
  onOpenRsvp,
  onOpenBlessings
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggerFlowerShower = () => {
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.35 },
      colors: ['#e6ca85', '#ffffff', '#f4a59d', '#d4af37', '#fde047'],
      scalar: 1.2
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 },
        colors: ['#e6ca85', '#ffffff', '#f4a59d']
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 },
        colors: ['#e6ca85', '#ffffff', '#f4a59d']
      });
    }, 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Suryaveer & Ananya | Wedding Celebration',
        text: 'Join us in celebrating the royal wedding of Suryaveer Raghavendra & Ananya Meenakshi at The Rajvilas Palace, Udaipur.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      >
        {/* Modern Petal Shower Button */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={triggerFlowerShower}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold shadow-2xl hover:shadow-[0_0_25px_var(--accent-glow)] transition-all"
          title="Shower Golden Blossoms"
        >
          <Sparkles className="w-4 h-4 text-[#09080e]" />
          <span className="hidden sm:inline">Shower Petals</span>
        </motion.button>

        {/* Quick Menu & Scroll Up */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 rounded-full glass-panel-elevated border border-[var(--border-light)] text-[var(--accent-gold)] flex items-center justify-center hover:border-[var(--accent-gold)] transition-all"
            title="Navigation Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass-panel border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-64 glass-panel-elevated rounded-3xl p-4 text-xs font-sans-modern text-left"
          >
            <div className="text-center pb-2 mb-2 border-b border-[var(--border-light)] text-[var(--accent-gold)] font-display text-xs tracking-wider">
              Quick Navigation
            </div>

            <div className="space-y-1 text-[var(--text-main)]">
              <a
                href="#couple"
                onClick={() => setMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] transition-colors"
              >
                Bride & Groom Profiles
              </a>
              <a
                href="#ceremonies"
                onClick={() => setMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] transition-colors"
              >
                Ceremony Schedule
              </a>
              <a
                href="#saat-phere"
                onClick={() => setMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] transition-colors"
              >
                Seven Sacred Vows
              </a>
              <a
                href="#venue"
                onClick={() => setMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] transition-colors"
              >
                Palace Venue & Directions
              </a>

              <div className="pt-2 border-t border-[var(--border-light)] space-y-1">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenDressCode();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Dress Code Guide</span>
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenRsvp();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>RSVP Attendance</span>
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenBlessings();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] flex items-center gap-2"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Send Blessings</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full text-left p-2 rounded-xl hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--accent-gold)] flex items-center gap-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />}
                  <span>{copied ? 'Link Copied!' : 'Share Invitation'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
