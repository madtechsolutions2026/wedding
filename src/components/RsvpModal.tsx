import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    ceremonies: ['All Ceremonies'],
    foodPreference: 'Royal Multi-Cuisine Vegetarian',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e6ca85', '#ffffff', '#f4a59d', '#d4af37']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 90,
        spread: 90,
        origin: { y: 0.8 },
        colors: ['#ffd700', '#ffffff', '#f4a59d']
      });
    }, 250);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
            className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="text-left">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-sans-modern uppercase tracking-[0.25em] text-[var(--accent-gold)] font-bold mb-1 block">
                    Please Confirm Attendance
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-[var(--text-main)] font-bold">
                    RSVP to the Wedding
                  </h3>
                  <p className="text-xs font-sans-modern text-[var(--text-muted)] mt-1">
                    Kindly share your details so our hospitality desk may prepare your stay and itinerary.
                  </p>
                  <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-3" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans-modern text-[var(--text-main)]">
                  <div>
                    <label className="block mb-1 text-[var(--text-muted)]">Your Full Name / Family Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Sameer Deshmukh & Family"
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">Number of Guests</label>
                      <div className="relative">
                        <select
                          value={formData.guests}
                          onChange={e => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] transition-all cursor-pointer appearance-none"
                        >
                          <option value="1" className="bg-[#121019] text-[#f5f2eb]">1 Guest (Solo)</option>
                          <option value="2" className="bg-[#121019] text-[#f5f2eb]">2 Guests (Couple)</option>
                          <option value="3" className="bg-[#121019] text-[#f5f2eb]">3 Guests</option>
                          <option value="4" className="bg-[#121019] text-[#f5f2eb]">4 Guests (Family)</option>
                          <option value="5+" className="bg-[#121019] text-[#f5f2eb]">5+ Guests (Extended Family)</option>
                        </select>
                        <Users className="w-4 h-4 text-[var(--accent-gold)] absolute right-3 top-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-[var(--text-muted)]">Dining & Culinary Preference</label>
                    <select
                      value={formData.foodPreference}
                      onChange={e => setFormData({ ...formData, foodPreference: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] transition-all cursor-pointer"
                    >
                      <option value="Royal Multi-Cuisine Vegetarian" className="bg-[#121019] text-[#f5f2eb]">Royal Multi-Cuisine Vegetarian (North & South Delicacies)</option>
                      <option value="Strict Jain Vegetarian" className="bg-[#121019] text-[#f5f2eb]">Strict Jain Vegetarian (No Onion, Garlic or Root Veg)</option>
                      <option value="Mild Spice & Vegan" className="bg-[#121019] text-[#f5f2eb]">Mild Spice / Vegan Preference</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-[var(--text-muted)]">Blessing Note or Message for the Couple</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your wishes for Suryaveer & Ananya..."
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-light)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-gold)] transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold shadow-xl hover:shadow-[0_0_20px_var(--accent-glow)] transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Royal Attendance</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-display text-[var(--text-main)] font-bold">
                  RSVP Successfully Received
                </h3>

                <p className="text-xs font-sans-modern text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! We look forward to celebrating this unforgettable milestone together in Udaipur.
                </p>

                <div className="p-3.5 rounded-2xl glass-panel border border-[var(--border-light)] text-xs font-sans-modern text-[var(--accent-gold)]">
                  Party Size: <strong>{formData.guests}</strong> • Meal: <strong>{formData.foodPreference}</strong>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[var(--accent-gold)] text-[#09080e] font-sans-modern text-xs uppercase tracking-wider font-bold hover:bg-[var(--accent-light)] transition-all"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
