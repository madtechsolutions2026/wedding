import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';

const melody = [293.66, 329.63, 369.99, 440, 493.88, 440, 369.99, 329.63, 293.66, 369.99, 440, 587.33, 493.88, 440, 369.99, 293.66];
const pattern = ['bass', 'rest', 'slap', 'tap', 'bass', 'tap', 'slap', 'tap', 'bass', 'bass', 'slap', 'tap', 'bass', 'tap', 'slap', 'slap'];

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [starting, setStarting] = useState(false);
  const [settings, setSettings] = useState(false);
  const [volume, setVolume] = useState(35);
  const [error, setError] = useState('');
  const context = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const timer = useRef<number | null>(null);
  const volumeRef = useRef(volume);
  const reduced = useReducedMotion();

  function dispose() {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    const current = context.current;
    context.current = null;
    gain.current = null;
    if (current && current.state !== 'closed') void current.close().catch(() => {});
  }
  function stop() { dispose(); setPlaying(false); }

  async function start() {
    if (context.current) return;
    setStarting(true); setError('');
    try {
      const ctx = new AudioContext();
      context.current = ctx;
      await ctx.resume();
      if (context.current !== ctx) return;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(volumeRef.current / 100 * .55, ctx.currentTime + .4);
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -18; compressor.ratio.value = 4;
      master.connect(compressor); compressor.connect(ctx.destination);
      gain.current = master;

      const noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * .22), ctx.sampleRate);
      const samples = noise.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;

      function drum(kind: string, time: number) {
        if (kind === 'rest') return;
        const bass = kind === 'bass', slap = kind === 'slap';
        const duration = bass ? .32 : .16;
        const body = ctx.createOscillator(), envelope = ctx.createGain();
        body.type = 'sine';
        body.frequency.setValueAtTime(bass ? 155 : slap ? 300 : 420, time);
        body.frequency.exponentialRampToValueAtTime(bass ? 62 : slap ? 155 : 250, time + duration * .65);
        envelope.gain.setValueAtTime(.001, time);
        envelope.gain.linearRampToValueAtTime(bass ? .7 : slap ? .32 : .15, time + .004);
        envelope.gain.exponentialRampToValueAtTime(.001, time + duration);
        body.connect(envelope); envelope.connect(master);
        body.start(time); body.stop(time + duration + .03);

        const skin = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), skinGain = ctx.createGain();
        skin.buffer = noise; filter.type = 'bandpass'; filter.frequency.value = bass ? 500 : 2100; filter.Q.value = .7;
        skinGain.gain.setValueAtTime(bass ? .08 : slap ? .3 : .13, time);
        skinGain.gain.exponentialRampToValueAtTime(.001, time + (bass ? .055 : .12));
        skin.connect(filter); filter.connect(skinGain); skinGain.connect(master);
        skin.start(time); skin.stop(time + .16);
      }

      function tune(frequency: number, time: number) {
        const reed = ctx.createOscillator(), soft = ctx.createBiquadFilter(), envelope = ctx.createGain();
        // Gentle harmonics suggest a ceremonial reed melody above the dhol rhythm.
        reed.type = 'triangle'; reed.frequency.setValueAtTime(frequency * .99, time);
        reed.frequency.exponentialRampToValueAtTime(frequency, time + .06);
        soft.type = 'lowpass'; soft.frequency.value = 1700;
        envelope.gain.setValueAtTime(.001, time);
        envelope.gain.linearRampToValueAtTime(.1, time + .09);
        envelope.gain.exponentialRampToValueAtTime(.001, time + .95);
        reed.connect(soft); soft.connect(envelope); envelope.connect(master);
        reed.start(time); reed.stop(time + 1);
      }
      [146.83, 220].forEach(frequency => {
        const drone = ctx.createOscillator(), level = ctx.createGain();
        drone.type = 'sine'; drone.frequency.value = frequency; level.gain.value = .035;
        drone.connect(level); level.connect(master); drone.start();
      });
      const sequence = { step: 0, next: ctx.currentTime + .06 };
      const eighth = 60 / 104 / 2;
      const schedule = () => {
        if (context.current !== ctx || ctx.state !== 'running') return;
        while (sequence.next < ctx.currentTime + .15) {
          drum(pattern[sequence.step % pattern.length], sequence.next);
          if (sequence.step % 4 === 0) tune(melody[(sequence.step / 4) % melody.length], sequence.next);
          sequence.next += eighth; sequence.step++;
        }
      };
      schedule(); timer.current = window.setInterval(schedule, 25);
      setPlaying(true);
    } catch {
      dispose(); setPlaying(false);
      setError('Sound could not start. Tap play to try again.');
    } finally { setStarting(false); }
  }

  useEffect(() => {
    const hide = () => { if (document.hidden) { dispose(); setPlaying(false); } };
    document.addEventListener('visibilitychange', hide);
    return () => { document.removeEventListener('visibilitychange', hide); dispose(); };
  }, []);

  return <div className="wedding-audio-dock">
    <AnimatePresence>{settings && <motion.div id="wedding-music-settings" className="audio-panel" initial={{opacity:0,y:reduced?0:12,scale:reduced?1:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:reduced?0:8}}>
      <span className="small-label">THE SOUND OF CELEBRATION</span><h3>A little wedding rhythm.</h3><p>Dhol-inspired drums, a gentle reed melody, and a warm drone.</p>
      <label htmlFor="wedding-volume">Volume <span>{volume}%</span></label><input id="wedding-volume" type="range" min="0" max="100" value={volume} onChange={event=>{const value=Number(event.target.value);setVolume(value);volumeRef.current=value;const ctx=context.current;if(ctx&&gain.current)gain.current.gain.setTargetAtTime(value/100*.55,ctx.currentTime,.05);}}/>
      <p className="audio-note">Synthesized for this invitation. Sound starts only when you press play.</p>
    </motion.div>}</AnimatePresence>
    {error&&<p className="audio-error" role="alert">{error}</p>}
    <div className="audio-buttons"><motion.button type="button" whileHover={reduced?undefined:{y:-1}} whileTap={reduced?undefined:{scale:.97}} disabled={starting} onClick={()=>playing?stop():void start()} className={`invitation-audio ${playing?'is-playing':''}`} aria-label={playing?'Pause wedding music':'Play wedding music'} aria-pressed={playing}>
      <span className="sound-bars" aria-hidden="true">{[0,1,2].map(index=><motion.span key={index} animate={{height:playing&&!reduced?[3,11-index*2,4+index]:3+index*2}} transition={{duration:.6,repeat:playing&&!reduced?Infinity:0,delay:index*.12}}/>)}</span>
      {playing?<Volume2 size={14}/>:<VolumeX size={14}/>}<span className="sound-label">{starting?'Starting…':playing?'Sound on':'Wedding music'}</span>
    </motion.button><button type="button" className="audio-settings-toggle" aria-label="Wedding music settings" aria-expanded={settings} aria-controls="wedding-music-settings" onClick={()=>setSettings(!settings)}><SlidersHorizontal size={14}/></button></div>
  </div>;
}
