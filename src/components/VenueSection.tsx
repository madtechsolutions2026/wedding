import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Car, Plane, Train, Phone, X, Building2 } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

export const VenueSection: React.FC = () => {
  const [showHallsModal, setShowHallsModal] = useState<boolean>(false);

  const venueAddress = 'The Rajvilas Palace & Heritage Mandapam, Lake Palace Enclave, Udaipur, Rajasthan 313001, India';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;

  return (
    <section id="venue" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-light)] text-[11px] font-sans-modern tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold mb-3">
            <MapPin className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>Destination & Venue</span>
            <MapPin className="w-3 h-3 text-[var(--accent-gold)]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display gold-text-gradient font-bold mb-3 tracking-tight">
            The Royal Destination
          </h2>

          <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] max-w-xl mx-auto">
            A serene sanctuary overlooking tranquil waters, carved stone courtyards, and grand heritage banquet halls.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mt-5" />
        </div>

        {/* 3D Venue Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {/* Main Palace Card with 3D Tilt */}
          <div className="lg:col-span-2">
            <TiltCard3D intensity={8}>
              <div className="glass-panel-elevated rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                <span className="inline-block px-3 py-1 rounded-full bg-[rgba(230,202,133,0.15)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold mb-3">
                  Heritage Palace
                </span>

                <h3 className="text-2xl sm:text-4xl font-display text-[var(--text-main)] font-bold mb-2">
                  The Rajvilas Palace & Mandapam
                </h3>

                <p className="text-xs sm:text-sm font-sans-modern text-[var(--accent-gold)] flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Lake Palace Enclave, Udaipur, Rajasthan - 313001</span>
                </p>

                <p className="text-xs sm:text-sm font-sans-modern text-[var(--text-muted)] leading-relaxed mb-6">
                  Nestled beside shimmering lake waters with hand-carved stone archways, lush royal gardens, private ghats for the evening garland ceremony, and an air-conditioned grand ballroom.
                </p>

                {/* Proximity Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl glass-panel border border-[var(--border-light)] text-center">
                    <Plane className="w-4 h-4 text-[var(--accent-gold)] mx-auto mb-1.5" />
                    <span className="text-[10px] font-sans-modern text-[var(--text-muted)] uppercase block">Udaipur Airport</span>
                    <span className="text-xs font-sans-modern font-bold text-[var(--text-main)]">28 Mins (22 km)</span>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-panel border border-[var(--border-light)] text-center">
                    <Train className="w-4 h-4 text-[var(--accent-gold)] mx-auto mb-1.5" />
                    <span className="text-[10px] font-sans-modern text-[var(--text-muted)] uppercase block">Railway Station</span>
                    <span className="text-xs font-sans-modern font-bold text-[var(--text-main)]">14 Mins (7 km)</span>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-panel border border-[var(--border-light)] text-center">
                    <Car className="w-4 h-4 text-[var(--accent-gold)] mx-auto mb-1.5" />
                    <span className="text-[10px] font-sans-modern text-[var(--text-muted)] uppercase block">Chauffeur & Valet</span>
                    <span className="text-xs font-sans-modern font-bold text-[var(--text-main)]">Dedicated 24/7</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3.5">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open Google Maps</span>
                  </a>

                  <button
                    onClick={() => setShowHallsModal(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel border border-[var(--border-light)] text-[var(--text-main)] hover:border-[var(--accent-gold)] font-sans-modern text-xs uppercase tracking-wider font-semibold"
                  >
                    <Building2 className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>Palace Halls & Layout</span>
                  </button>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Guest Hospitality & Concierge Card */}
          <div>
            <TiltCard3D intensity={8}>
              <div className="glass-panel-elevated rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[rgba(230,202,133,0.15)] border border-[var(--border-light)] text-[10px] font-sans-modern uppercase tracking-widest text-[var(--accent-gold)] font-bold mb-3">
                    Guest Accommodations
                  </span>

                  <h4 className="text-xl font-display text-[var(--text-main)] font-bold mb-3">
                    Hospitality & Stay
                  </h4>

                  <p className="text-xs font-sans-modern text-[var(--text-muted)] leading-relaxed mb-6">
                    Luxury palace suites have been arranged for all outstation family and guests. Complimentary private luxury shuttles will operate around the clock from the airport and railway station.
                  </p>

                  <div className="space-y-3 border-t border-[var(--border-light)] pt-5 text-xs font-sans-modern">
                    <div className="flex items-center gap-3 text-[var(--text-main)]">
                      <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
                      <span><strong>Groom Concierge:</strong> +91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--text-main)]">
                      <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
                      <span><strong>Bride Concierge:</strong> +91 91234 56789</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--text-muted)]">
                      <Car className="w-4 h-4 text-[var(--accent-gold)]" />
                      <span><strong>Check-in:</strong> Nov 24, 12:00 PM onwards</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border-light)] text-center">
                  <p className="text-[11px] font-editorial text-[var(--text-muted)] italic">
                    “We look forward to welcoming you with the utmost warmth, care, and celebration.”
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </div>

      {/* Palace Halls Animated Modal */}
      <AnimatePresence>
        {showHallsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setShowHallsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setShowHallsModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[var(--accent-gold)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-display text-[var(--text-main)] font-bold mb-4">
                Palace Wings & Event Layout
              </h3>

              <div className="space-y-3 text-xs font-sans-modern">
                <div className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <div className="text-[var(--accent-gold)] font-bold text-sm">1. Golden Lotus Courtyard</div>
                  <p className="text-[var(--text-muted)] mt-1">Hosting the sunlit Haldi ceremony and garden floral brunch.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <div className="text-[var(--accent-gold)] font-bold text-sm">2. Starlit Amphitheatre & Pool Lawn</div>
                  <p className="text-[var(--text-muted)] mt-1">Hosting the Royal Sangeet musical soiree, live bands, and bridal henna canopies.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <div className="text-[var(--accent-gold)] font-bold text-sm">3. Lakefront Heritage Mandapam</div>
                  <p className="text-[var(--text-muted)] mt-1">Sanctuary of the wedding vows, garland exchange, and sacred holy fire.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <div className="text-[var(--accent-gold)] font-bold text-sm">4. Mirror Ballroom & Banquet Pavilion</div>
                  <p className="text-[var(--text-muted)] mt-1">The grand formal reception, symphony dinner, and celebratory dessert lounge.</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light)] text-[#09080e] font-sans-modern text-xs uppercase tracking-widest font-bold"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Navigation</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
