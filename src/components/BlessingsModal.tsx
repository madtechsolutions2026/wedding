import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_BLESSINGS } from '../data/weddingData';
import type { Blessing } from '../types';

interface BlessingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlessingsModal: React.FC<BlessingsModalProps> = ({ isOpen, onClose }) => {
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'Guest & Well-Wisher',
      message: message.trim(),
      date: 'Just now'
    };

    setBlessings([newBlessing, ...blessings]);
    setName('');
    setRelation('');
    setMessage('');

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e6ca85', '#ffffff', '#f4a59d']
    });
  };

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
                Warm Wishes & Messages
              </span>
              <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold">
                Guestbook of Blessings
              </h3>
              <p className="text-xs font-sans-modern text-[var(--text-muted)] mt-1">
                Share your heartfelt congratulations and wishes for Suryaveer & Ananya.
              </p>
              <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-3" />
            </div>

            {/* Form */}
            <form onSubmit={handleAddBlessing} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] mb-6 space-y-3 text-xs font-sans-modern">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[var(--text-muted)]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Vikram & Sunita Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[var(--text-muted)]">City or Relationship</label>
                  <input
                    type="text"
                    value={relation}
                    onChange={e => setRelation(e.target.value)}
                    placeholder="e.g. College Friend / Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[var(--text-muted)]">Your Message *</label>
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Wishing you a lifetime of unbounded love, health, and joy..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-[0_0_15px_var(--accent-glow)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Post Your Blessing</span>
              </button>
            </form>

            {/* List */}
            <div className="space-y-3">
              <h4 className="text-xs font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold flex items-center gap-2">
                <span>Recent Wishes ({blessings.length})</span>
              </h4>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {blessings.map(b => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl glass-panel border border-[var(--border-light)] text-xs text-[var(--text-main)]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-sans-modern font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
                        {b.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {b.relation} • {b.date}
                      </span>
                    </div>
                    <p className="font-editorial text-sm text-[var(--text-main)] italic pl-3 border-l border-[var(--border-light)]">
                      "{b.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
