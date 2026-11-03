import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Moon, Sun } from 'lucide-react';

interface HoroscopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HoroscopeModal: React.FC<HoroscopeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#2a060e] via-[#1a0308] to-[#120205] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-2xl gold-glow max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#3b0811] text-[#fef08a] border border-[#d4af37]/50 hover:bg-[#b91c1c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="text-xs font-sanskrit text-[#f59e0b] mb-1">
                ॥ अष्टकूट गुण मिलान एवं शुभ लग्न ॥
              </div>
              <h3 className="text-2xl sm:text-3xl font-royal-title text-[#fef08a] font-bold">
                Auspicious Kundali & Muhurat
              </h3>
              <p className="text-xs font-serif-royal text-[#fdf4dc]/80 mt-1">
                Cosmic alignment certified by Rajpurohits according to Vedic Jyotish Vidya.
              </p>
              <div className="h-px w-28 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-3" />
            </div>

            {/* Score Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#7f1d1d] border border-[#fef08a] text-center mb-6 shadow-lg">
              <div className="text-xs font-serif-royal uppercase tracking-widest text-[#fef08a] mb-1">
                Vedic Ashta Koota Compatibility
              </div>
              <div className="text-3xl sm:text-4xl font-royal-title font-extrabold text-[#fffbeb]">
                33 / 36 <span className="text-lg text-[#fef08a] font-normal">Gunas (उत्कृष्ट योग)</span>
              </div>
              <p className="text-[11px] font-body-festive text-[#fef08a]/90 mt-1">
                Declared as a “Nadi Dosha Mukta” & “Deva Gana Samyukta” divine union blessed with lifelong harmony, prosperity, and spiritual joy.
              </p>
            </div>

            {/* Side-by-side Astrological Details */}
            <div className="grid grid-cols-2 gap-3 text-xs font-serif-royal mb-6">
              {/* Groom */}
              <div className="p-4 rounded-2xl bg-[#1d040a] border border-[#d4af37]/40 text-center">
                <Sun className="w-5 h-5 text-[#f59e0b] mx-auto mb-1" />
                <div className="text-[#f59e0b] font-bold text-sm">Groom (वर)</div>
                <div className="text-[#fef08a] text-xs font-bold mb-2">Suryaveer</div>
                <div className="space-y-1 text-[11px] text-[#fdf4dc]/80 text-left">
                  <p><strong>Nakshatra:</strong> Uttara Bhadrapada</p>
                  <p><strong>Rashi:</strong> Meena (Pisces)</p>
                  <p><strong>Rashi Lord:</strong> Guru (Jupiter)</p>
                  <p><strong>Gana:</strong> Manushya Gana</p>
                  <p><strong>Varna:</strong> Kshatriya / Vedic</p>
                  <p><strong>Gotra:</strong> Kashyapa</p>
                </div>
              </div>

              {/* Bride */}
              <div className="p-4 rounded-2xl bg-[#1d040a] border border-[#d4af37]/40 text-center">
                <Moon className="w-5 h-5 text-[#fbbf24] mx-auto mb-1" />
                <div className="text-[#f59e0b] font-bold text-sm">Bride (वधू)</div>
                <div className="text-[#fef08a] text-xs font-bold mb-2">Ananya</div>
                <div className="space-y-1 text-[11px] text-[#fdf4dc]/80 text-left">
                  <p><strong>Nakshatra:</strong> Rohini Nakshatra</p>
                  <p><strong>Rashi:</strong> Vrishabha (Taurus)</p>
                  <p><strong>Rashi Lord:</strong> Shukra (Venus)</p>
                  <p><strong>Gana:</strong> Manushya Gana</p>
                  <p><strong>Varna:</strong> Vaishya / Vedic</p>
                  <p><strong>Gotra:</strong> Bharadwaja</p>
                </div>
              </div>
            </div>

            {/* Shubh Muhurat Specs */}
            <div className="p-4 rounded-2xl bg-[#170307] border border-[#d4af37]/40 space-y-2 text-xs font-serif-royal text-[#fdf4dc]">
              <div className="text-[#fde047] font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                <span>Lagna Muhurat Specifications:</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-[11px] text-[#fef3c7]/80">
                <li><strong>Auspicious Lagna:</strong> Karkata Lagna (Cancer Ascendant) with Guru Drishti.</li>
                <li><strong>Shubh Hora:</strong> Amrit Hora on 25th November 2026 at 11:15 AM to 12:45 PM.</li>
                <li><strong>Agni Kund Sthapana:</strong> Vedic Havan in the presence of 11 learned Vedic Brahmins chanting the Rigveda Vivah Sukta.</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
