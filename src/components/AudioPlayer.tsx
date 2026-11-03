import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';

// Original pentatonic ceremonial phrases: note, duration in half-beats.
const melody = [
  [293.66,4], [329.63,2], [369.99,6], [329.63,2], [293.66,2],
  [369.99,2], [440,4], [493.88,2], [440,6], [369.99,4],
  [329.63,2], [369.99,2], [293.66,8], [0,4],
  [440,4], [493.88,2], [587.33,6], [493.88,2], [440,2],
  [369.99,4], [440,2], [329.63,4], [293.66,8], [0,4],
];
const pattern = ['dha','dhin','dhin','dha','dha','dhin','dhin','dha','dha','tin','tin','ta','ta','dhin','dhin','dha'];

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

      // A quiet room reflection softens the synthesized instruments.
      const echo = ctx.createDelay(.8), echoLevel = ctx.createGain(), echoFilter = ctx.createBiquadFilter();
      echo.delayTime.value = .19; echoLevel.gain.value = .13;
      echoFilter.type = 'lowpass'; echoFilter.frequency.value = 1800;
      echo.connect(echoFilter); echoFilter.connect(echoLevel); echoLevel.connect(master);
      const reedWave = ctx.createPeriodicWave(new Float32Array(12), new Float32Array([0,1,.62,.43,.26,.19,.12,.08,.05,.03,.02,.01]));

      function tabla(kind: string, time: number) {
        const bass = kind === 'dha' || kind === 'dhin';
        if (bass) {
          const bayan = ctx.createOscillator(), level = ctx.createGain();
          bayan.frequency.setValueAtTime(110, time);
          bayan.frequency.exponentialRampToValueAtTime(kind === 'dha' ? 72 : 85, time + .22);
          level.gain.setValueAtTime(.001,time);level.gain.linearRampToValueAtTime(.23,time+.006);
          level.gain.exponentialRampToValueAtTime(.001,time+.42);
          bayan.connect(level);level.connect(master);bayan.start(time);bayan.stop(time+.45);
        }
        const frequency = kind === 'tin' ? 330 : kind === 'ta' ? 370 : 294;
        [1, 1.51, 2.02].forEach((ratio,index)=>{
          const dayan=ctx.createOscillator(), level=ctx.createGain();
          dayan.frequency.setValueAtTime(frequency*ratio,time);
          level.gain.setValueAtTime(.001,time);level.gain.linearRampToValueAtTime((kind==='ta'?.045:.09)/(index+1),time+.003);
          level.gain.exponentialRampToValueAtTime(.001,time+(kind==='ta'?.09:.28)/(1+index*.4));
          dayan.connect(level);level.connect(master);dayan.start(time);dayan.stop(time+.32);
        });
        const skin=ctx.createBufferSource(), filter=ctx.createBiquadFilter(), level=ctx.createGain();
        skin.buffer=noise;filter.type='highpass';filter.frequency.value=2300;
        level.gain.setValueAtTime(.055,time);level.gain.exponentialRampToValueAtTime(.001,time+.045);
        skin.connect(filter);filter.connect(level);level.connect(master);skin.start(time);skin.stop(time+.06);
      }

      function tune(frequency: number, previous: number, duration: number, time: number) {
        if (!frequency) return;
        const reed=ctx.createOscillator(), soft=ctx.createBiquadFilter(), envelope=ctx.createGain();
        reed.setPeriodicWave(reedWave);
        reed.frequency.setValueAtTime(previous || frequency*.97,time);
        reed.frequency.exponentialRampToValueAtTime(frequency,time+.12);
        // A slight grace note and restrained vibrato give the phrase a flowing shape.
        if(duration>1){reed.frequency.setValueAtTime(frequency,time+duration*.6);reed.frequency.exponentialRampToValueAtTime(frequency*1.015,time+duration*.65);reed.frequency.exponentialRampToValueAtTime(frequency,time+duration*.72);}
        const vibrato=ctx.createOscillator(), depth=ctx.createGain();vibrato.frequency.value=5.1;
        depth.gain.setValueAtTime(0,time);depth.gain.linearRampToValueAtTime(7,time+.4);
        vibrato.connect(depth);depth.connect(reed.detune);
        soft.type='lowpass';soft.frequency.setValueAtTime(2100,time);soft.Q.value=.6;
        envelope.gain.setValueAtTime(.001,time);envelope.gain.linearRampToValueAtTime(.105,time+.12);
        envelope.gain.setValueAtTime(.085,time+Math.max(.13,duration-.2));envelope.gain.exponentialRampToValueAtTime(.001,time+duration+.08);
        reed.connect(soft);soft.connect(envelope);envelope.connect(master);envelope.connect(echo);
        reed.start(time);vibrato.start(time);reed.stop(time+duration+.12);vibrato.stop(time+duration+.12);
      }

      function tanpura(frequency: number, time: number) {
        [1,2,3,4,6].forEach((ratio,index)=>{
          const string=ctx.createOscillator(), envelope=ctx.createGain();
          string.frequency.value=frequency*ratio;string.type='sine';
          envelope.gain.setValueAtTime(.001,time);envelope.gain.linearRampToValueAtTime(.055/(1+index*1.8),time+.025);
          envelope.gain.exponentialRampToValueAtTime(.001,time+2.8/(1+index*.12));
          string.connect(envelope);envelope.connect(master);envelope.connect(echo);string.start(time);string.stop(time+3);
        });
      }
      const sequence={step:0,next:ctx.currentTime+.08,phrase:0,noteAt:0,previous:0};
      const eighth=60/72/2;
      const schedule=()=>{
        if(context.current!==ctx||ctx.state!=='running')return;
        while(sequence.next<ctx.currentTime+.15){
          if(sequence.step>=16&&sequence.step%2===0)tabla(pattern[((sequence.step-16)/2)%pattern.length],sequence.next);
          if(sequence.step%4===0)tanpura([220,293.66,293.66,146.83][(sequence.step/4)%4],sequence.next);
          if(sequence.step===sequence.noteAt){
            const [note,length]=melody[sequence.phrase%melody.length];
            tune(note,sequence.previous,length*eighth*.94,sequence.next);
            if(note)sequence.previous=note;
            sequence.noteAt+=length;sequence.phrase++;
          }
          sequence.next+=eighth;sequence.step++;
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
      <span className="small-label">THE SOUND OF CELEBRATION</span><h3>A timeless wedding melody.</h3><p>A slow shehnai-style melody, gentle tabla, and a softly resonating tanpura.</p>
      <label htmlFor="wedding-volume">Volume <span>{volume}%</span></label><input id="wedding-volume" type="range" min="0" max="100" value={volume} onChange={event=>{const value=Number(event.target.value);setVolume(value);volumeRef.current=value;const ctx=context.current;if(ctx&&gain.current)gain.current.gain.setTargetAtTime(value/100*.55,ctx.currentTime,.05);}}/>
      <p className="audio-note">An original synthesized classical-style instrumental. Tap play to listen.</p>
    </motion.div>}</AnimatePresence>
    {error&&<p className="audio-error" role="alert">{error}</p>}
    <div className="audio-buttons"><motion.button type="button" whileHover={reduced?undefined:{y:-1}} whileTap={reduced?undefined:{scale:.97}} disabled={starting} onClick={()=>playing?stop():void start()} className={`invitation-audio ${playing?'is-playing':''}`} aria-label={playing?'Pause wedding music':'Play wedding music'} aria-pressed={playing}>
      <span className="sound-bars" aria-hidden="true">{[0,1,2].map(index=><motion.span key={index} animate={{height:playing&&!reduced?[3,11-index*2,4+index]:3+index*2}} transition={{duration:.6,repeat:playing&&!reduced?Infinity:0,delay:index*.12}}/>)}</span>
      {playing?<Volume2 size={14}/>:<VolumeX size={14}/>}<span className="sound-label">{starting?'Starting…':playing?'Sound on':'Wedding music'}</span>
    </motion.button><button type="button" className="audio-settings-toggle" aria-label="Wedding music settings" aria-expanded={settings} aria-controls="wedding-music-settings" onClick={()=>setSettings(!settings)}><SlidersHorizontal size={14}/></button></div>
  </div>;
}
