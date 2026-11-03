import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-24 px-4 border-t border-[var(--border-light)] text-center text-xs font-sans-modern">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-center items-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></span>
          <span className="font-display text-sm tracking-widest text-[var(--accent-gold)] font-bold">
            S & A
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></span>
        </div>

        {/* Cordial Family Regards */}
        <div className="p-6 rounded-3xl glass-panel border border-[var(--border-light)] space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-gold)] font-bold block">
            With Warm Regards & Best Compliments
          </span>
          <p className="text-sm font-display text-[var(--text-main)] font-semibold leading-relaxed">
            Mrs. Gayatri Devi & Mr. Vikramaditya Rathore <br />
            Mrs. Sunita Devi & Mr. Rajeshwar Deshmukh
          </p>
          <p className="text-xs font-sans-modern text-[var(--text-muted)] pt-1">
            Along with the Rathore, Deshmukh, and Sisodia families
          </p>
          <p className="text-[11px] font-editorial text-[var(--text-main)] italic pt-2">
            “Your presence, blessings, and memories are our most cherished gifts.”
          </p>
        </div>

        <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 pt-2">
          <span>Celebrating the marriage of</span>
          <span className="text-[var(--accent-gold)] font-semibold">Suryaveer & Ananya</span>
          <Heart className="w-3 h-3 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
        </div>
      </div>
    </footer>
  );
};
