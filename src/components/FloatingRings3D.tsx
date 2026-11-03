import React from 'react';
import { motion } from 'framer-motion';

export const FloatingRings3D: React.FC = () => {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto flex items-center justify-center pointer-events-none perspective-1000">
      {/* Outer 3D Ring */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 180],
          rotateZ: [0, 360]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute inset-0 rounded-full border-2 border-[var(--accent-gold)] opacity-40 shadow-[0_0_20px_var(--accent-glow)]"
      />

      {/* Middle 3D Ring */}
      <motion.div
        animate={{
          rotateX: [360, 0],
          rotateY: [180, 0],
          rotateZ: [360, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute inset-4 rounded-full border border-[var(--accent-light)] opacity-60 shadow-[0_0_15px_var(--accent-glow)]"
      />

      {/* Inner 3D Ring with Solitaire / Knot */}
      <motion.div
        animate={{
          rotateX: [0, -360],
          rotateZ: [-360, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute inset-8 rounded-full border-2 border-dashed border-[var(--accent-gold)] opacity-80 flex items-center justify-center"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-light)] shadow-[0_0_12px_#ffffff] -mt-10" />
      </motion.div>

      {/* Center Golden Core */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--accent-gold)] to-[var(--accent-light)] blur-sm opacity-60"
      />

      {/* Minimal Monogram in Center */}
      <div className="absolute text-center z-10 font-display text-sm tracking-widest text-[#ffffff] font-bold drop-shadow-md">
        S & A
      </div>
    </div>
  );
};
