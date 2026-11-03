import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DressCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DressCodeModal: React.FC<DressCodeModalProps> = ({ isOpen, onClose }) => {
  const dressGuides = [
    {
      event: 'Sunlit Haldi & Floral Celebration',
      colorName: 'Sunlit Gold, Turmeric, Ochre & Lemon Zest',
      colorHex: '#eab308',
      men: 'Mustard or Canary Silk Kurta with white churidar or linen trousers',
      women: 'Floral yellow sarees, light georgette lehengas with fresh blossom accessories',
      vibe: 'Sun-drenched, airy, comfortable for floral showers'
    },
    {
      event: 'The Royal Sangeet Soiree',
      colorName: 'Emerald Green, Midnight Sapphire & Rose Champagne',
      colorHex: '#10b981',
      men: 'Embroidered royal Bandhgala, Indo-Western jacket with tailored trousers',
      women: 'Gilded shimmering lehengas, glamorous evening sarees, high-shine couture',
      vibe: 'Starlit, sparkling, high-energy dancing gala'
    },
    {
      event: 'The Sacred Wedding & Vows',
      colorName: 'Regal Crimson, Royal Ivory & Pure Kanjeevaram Gold',
      colorHex: '#dc2626',
      men: 'Regal Silk Sherwani or Dhoti-Kurta with ivory stole and safa turban',
      women: 'Pure Kanjeevaram or Banarasi heirloom silk sarees, traditional gold jewelry',
      vibe: 'Sacred, regal, timeless heritage elegance'
    },
    {
      event: 'The Grand Reception Gala',
      colorName: 'Midnight Obsidian, Black-Tie Velvet & Rose Platinum',
      colorHex: '#8b5cf6',
      men: 'Black-tie tuxedo, structured Jodhpuri suit or velvet achkan',
      women: 'Contemporary designer evening gowns, modern concept sarees or couture',
      vibe: 'Imperial red carpet gala elegance'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] font-sans-modern uppercase tracking-[0.25em] text-[var(--accent-gold)] font-bold mb-1 block">
                Style Guide & Attire
              </span>
              <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold">
                Guest Attire & Dress Code
              </h3>
              <p className="text-xs font-sans-modern text-[var(--text-muted)] mt-1">
                Curated color palettes and styling inspirations for each wedding event.
              </p>
              <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-3" />
            </div>

            <div className="space-y-4">
              {dressGuides.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-panel border border-[var(--border-light)] text-xs font-sans-modern space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-main)] text-sm flex items-center gap-2 font-display">
                      <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: guide.colorHex }} />
                      {guide.event}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[rgba(230,202,133,0.1)] text-[var(--accent-gold)] border border-[var(--border-light)]">
                      {guide.colorName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                      <span className="text-[var(--accent-gold)] block font-bold mb-0.5">Gentlemen:</span>
                      <span className="text-[var(--text-muted)]">{guide.men}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                      <span className="text-[var(--accent-gold)] block font-bold mb-0.5">Ladies:</span>
                      <span className="text-[var(--text-muted)]">{guide.women}</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-editorial text-[var(--text-muted)] italic pt-1">
                    Vibe: {guide.vibe}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
