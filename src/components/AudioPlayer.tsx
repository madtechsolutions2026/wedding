import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const masterGainRef = useRef<GainNode | null>(null);

  // Modern Neo-Classical Wedding pentatonic melody (D Major chord harmonies & bells)
  const notes = [
    293.66, // D4
    369.99, // F#4
    440.00, // A4
    587.33, // D5
    440.00,
    369.99,
    329.63, // E4
    369.99
  ];

  const stopMusic = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const startMusic = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm Ambient Pad Drone (D and A harmonic depth)
      [146.83, 220.00, 293.66].forEach(freq => {
        const osc = ctx.createOscillator();
        const droneGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(droneGain);
        droneGain.connect(masterGain);
        osc.start();
      });

      // Melodic Acoustic chime note phrasing
      noteIndexRef.current = 0;
      const playMelodyNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentCtx = audioCtxRef.current;
        const osc = currentCtx.createOscillator();
        const noteGain = currentCtx.createGain();

        osc.type = 'triangle';
        const filter = currentCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, currentCtx.currentTime);

        const freq = notes[noteIndexRef.current % notes.length];
        noteIndexRef.current += 1;

        osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

        // Gentle soft acoustic attack & lingering decay
        noteGain.gain.setValueAtTime(0.001, currentCtx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.09, currentCtx.currentTime + 0.15);
        noteGain.gain.exponentialRampToValueAtTime(0.001, currentCtx.currentTime + 1.4);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(currentCtx.currentTime);
        osc.stop(currentCtx.currentTime + 1.5);
      };

      playMelodyNote();
      timerRef.current = window.setInterval(playMelodyNote, 1500);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <motion.button whileHover={{y:-2}} whileTap={{scale:0.97}} onClick={toggleMusic}
      className={`invitation-audio ${isPlaying?'is-playing':''}`}
      aria-label={isPlaying?'Pause ambient music':'Play ambient music'} aria-pressed={isPlaying}>
      <span className="sound-bars" aria-hidden="true">{[0,1,2].map(index=><motion.span key={index}
        animate={{height:isPlaying?[3,11-index*2,4+index]:3+index*2}}
        transition={{duration:0.7,repeat:isPlaying?Infinity:0,delay:index*0.12}} />)}</span>
      {isPlaying?<Volume2 size={14}/>:<VolumeX size={14}/>}
      <span className="sound-label">{isPlaying?'Sound on':'Music'}</span>
    </motion.button>
  );
};
