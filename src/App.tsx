import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CalendarDays, Check, CheckCheck, Heart, MapPin, Plus, X } from 'lucide-react';
import { BRIDE_PROFILE, CEREMONIES, GROOM_PROFILE, INITIAL_BLESSINGS, SEVEN_VOWS, WEDDING_DATE } from './data/weddingData';
import type { Blessing } from './types';
import { AudioPlayer } from './components/AudioPlayer';
import './App.css';

const ease = [0.22, 1, 0.36, 1] as const;
const eventNames = ['A little sunshine', 'A night to remember', 'Here comes forever', 'The beginning of always', 'One last dance'];
const eventLabels = ['Haldi', 'Sangeet', 'Baraat & Varmala', 'Wedding', 'Reception'];
const venue = 'The Rajvilas Palace, Lake Palace Enclave, Udaipur, Rajasthan';
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

function Botanical({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 150 220" fill="none" aria-hidden="true">
    <motion.g stroke="currentColor" strokeWidth="1" strokeLinecap="round" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
      <motion.path d="M72 210C84 160 66 103 91 15" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.8,ease}} viewport={{once:true}}/>
      {['M79 175C32 177 29 147 34 137C62 137 76 153 79 175Z','M79 152C122 149 132 120 127 108C99 112 82 130 79 152Z','M78 119C40 113 42 85 48 76C71 82 79 97 78 119Z','M83 90C119 86 123 61 120 52C98 58 86 73 83 90Z','M87 55C66 46 72 25 79 19C94 31 91 45 87 55Z'].map((d,i)=><motion.path key={d} d={d} initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.2,delay:0.2+i*0.1,ease}} viewport={{once:true}}/>)}
    </motion.g>
  </svg>;
}

function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={{opacity:0,y:reduced?0:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'0px 0px -35px 0px'}} transition={{duration:0.8,delay,ease}}>{children}</motion.div>;
}

function Countdown() {
  const calculate=()=>{
    const diff=Math.max(0,WEDDING_DATE.getTime()-Date.now());
    return [Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
  };
  const [time,setTime]=useState(calculate);
  useEffect(()=>{const timer=window.setInterval(()=>setTime(calculate()),1000);return()=>clearInterval(timer);},[]);
  return <div className="countdown" aria-label="Countdown to the wedding">{time.map((value,i)=><div key={i}>
    <span className="countdown-number"><AnimatePresence mode="popLayout" initial={false}><motion.span key={value} initial={{y:12,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-12,opacity:0}} transition={{duration:0.25}}>{String(value).padStart(2,'0')}</motion.span></AnimatePresence></span>
    <span className="small-label">{['Days','Hours','Minutes','Seconds'][i]}</span>
  </div>)}</div>;
}

function Dialog({title,onClose,children,className=''}:{title:string;onClose:()=>void;children:ReactNode;className?:string}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement | null;
    const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
    ref.current?.focus();
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onClose();return;}
      if(event.key!=='Tab')return;
      const items=ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),input,textarea,select,a[href]');
      if(!items?.length)return;
      const first=items[0],last=items[items.length-1];
      const outside=!ref.current?.contains(document.activeElement);
      if(event.shiftKey&&(document.activeElement===first||outside||document.activeElement===ref.current)){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||outside||document.activeElement===ref.current)){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',keyboard);
    return()=>{document.removeEventListener('keydown',keyboard);document.body.style.overflow=overflow;previous?.focus();};
  },[onClose]);
  return <motion.div className="dialog-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={`paper-dialog ${className}`} initial={{opacity:0,y:40,rotate:2}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,y:25,rotate:-2}} transition={{type:'spring',stiffness:200,damping:25}}>
      <button type="button" className="dialog-close icon-button" onClick={onClose} aria-label="Close dialog"><X size={20}/></button>
      {children}
    </motion.div>
  </motion.div>;
}

function Rsvp({onClose}:{onClose:()=>void}) {
  const [attending,setAttending]=useState(true);
  const [submitted,setSubmitted]=useState(false);
  const [copied,setCopied]=useState(false);
  const [summary,setSummary]=useState('');
  const [error,setError]=useState('');
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const data=new FormData(event.currentTarget);
    const response={name:String(data.get('name')),phone:String(data.get('phone') || ''),guests:Number(data.get('guests') || 1),attending,food:String(data.get('food') || ''),message:String(data.get('message') || '')};
    try{localStorage.setItem('s-a-rsvp',JSON.stringify(response));}catch{setError('Your browser could not save the response. Please try again.');return;}
    setSummary(`${response.name}: ${attending?`Joyfully attending with ${response.guests} guest(s)`:'Celebrating from afar'}. ${response.food}. ${response.message}`);setSubmitted(true);
  }
  return <Dialog title="RSVP" onClose={onClose}>
    <span className="small-label">A seat at our table</span>
    <h2>{submitted?'A reply, with love.':'Will you join us?'}</h2>
    {submitted?<div className="rsvp-success"><span className="success-mark"><Check size={28}/></span><p>Your response is saved on this device. Copy it and share it with the family to confirm your attendance.</p><button className="button button-dark" onClick={async()=>{try{await navigator.clipboard.writeText(summary);setCopied(true);}catch{setError('Please select and copy the response below.');}}}>{copied?<><CheckCheck size={16}/>Copied</>:'Copy my response'}</button><p className="saved-summary">{summary}</p></div>:<form onSubmit={submit} className="invitation-form">
      <p>We would love to celebrate with you. Save your reply, then share it with the family.</p>
      <div className="attendance-toggle">{[true,false].map(value=><button key={String(value)} type="button" onClick={()=>setAttending(value)} aria-pressed={attending===value}>{attending===value&&<motion.span className="attendance-active" layoutId="attendance" transition={{type:'spring',stiffness:350,damping:30}}/>}<span>{value?'Joyfully attending':'With you in spirit'}</span></button>)}</div>
      <label>Your name<input autoComplete="name" name="name" placeholder="How shall we address you?" required maxLength={100}/></label>
      <div className="form-columns"><label>Phone <span>(optional)</span><input type="tel" autoComplete="tel" name="phone" placeholder="Your number" maxLength={25}/></label><label>Number of guests<select name="guests" defaultValue="2" disabled={!attending}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label></div>
      {attending&&<label>Food preference<select name="food"><option>Vegetarian</option><option>Jain</option><option>Please contact me about dietary needs</option></select></label>}
      <label>A little note <span>(optional)</span><textarea name="message" rows={2} placeholder="Something you’d like us to know…" maxLength={500}/></label>
      <button type="submit" className="button button-dark">Save my response <ArrowUpRight size={16}/></button>
    </form>}
    {error&&<p role="alert" className="form-error">{error}</p>}
  </Dialog>;
}

function InvitationCard({onClose}:{onClose:()=>void}) {
  const [opened,setOpened]=useState(false);
  return <Dialog title="Your wedding invitation" onClose={onClose} className="invitation-dialog">
    <span className="small-label">A letter, just for you</span>
    <div className={`envelope-scene ${opened?'is-open':''}`}>
      <motion.div className="envelope-letter" animate={{y:opened?-65:0,rotate:opened?-3:0}} transition={{type:'spring',stiffness:130,damping:20,delay:opened?0.25:0}}>
        <Botanical/><span className="small-label">Together with our families</span><h2>Suryaveer<br/><i>&amp;</i> Ananya</h2><span className="card-date">24 &amp; 25 NOVEMBER 2026</span><p>Udaipur, Rajasthan</p>
      </motion.div>
      <div className="envelope-pocket"/>
      <motion.div className="envelope-flap" animate={{rotateX:opened?180:0}} transition={{duration:0.6,ease}}/>
      <button className="wax-seal" aria-label={opened?'Close the envelope':'Open the envelope'} onClick={()=>setOpened(!opened)}>S<span>&amp;</span>A</button>
    </div>
    <button className="text-button" onClick={()=>setOpened(!opened)}>{opened?'Fold it with love':'Break the seal'} <ArrowUpRight size={14}/></button>
  </Dialog>;
}

function BlessingBook({onClose}:{onClose:()=>void}) {
  const [notes,setNotes]=useState<Blessing[]>(()=>{try{return JSON.parse(localStorage.getItem('s-a-blessings') || 'null') || INITIAL_BLESSINGS;}catch{return INITIAL_BLESSINGS;}});
  const [saved,setSaved]=useState(false);
  const [error,setError]=useState('');
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=new FormData(event.currentTarget);const next=[{id:crypto.randomUUID(),name:String(form.get('name')),relation:'With love',message:String(form.get('message')),date:'Just now'},...notes];try{localStorage.setItem('s-a-blessings',JSON.stringify(next));setNotes(next);setSaved(true);}catch{setError('Your browser could not save this note.');}}
  return <Dialog title="Our little guestbook" onClose={onClose}><span className="small-label">Words we’ll keep</span><h2>A little love,<br/><i>in your words.</i></h2>
    <p>Leave a wish for our next chapter. Notes are saved on this device.</p>
    {!saved?<form className="invitation-form" onSubmit={submit}><label>Your name<input name="name" required maxLength={100}/></label><label>Your wish<textarea name="message" required rows={3} maxLength={600}/></label><button className="button button-dark">Save your wish <Heart size={15}/></button></form>:<p className="inline-success"><Check size={16}/>Your wish is saved on this device.</p>}
    {error&&<p role="alert">{error}</p>}
    <div className="guestbook-notes">{notes.slice(0,4).map(note=><article key={note.id}><p>“{note.message}”</p><span className="small-label">{note.name}</span></article>)}</div>
  </Dialog>;
}

function downloadCalendar(){
  const contents=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Suryaveer and Ananya//Wedding//EN','BEGIN:VEVENT','UID:suryaveer-ananya-20261125@wedding.local','DTSTAMP:20261103T000000Z','DTSTART:20261125T054500Z','DTEND:20261125T071500Z','SUMMARY:Suryaveer and Ananya Wedding','LOCATION:'+venue.replace(/,/g,'\\,'),'DESCRIPTION:Celebrate the wedding of Suryaveer and Ananya in Udaipur.','END:VEVENT','END:VCALENDAR'].join('\r\n');
  const url=URL.createObjectURL(new Blob([contents],{type:'text/calendar;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='Suryaveer-and-Ananya.ics';link.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}


function Families(){
  const [expanded,setExpanded]=useState<number|null>(null);
  const reduced=useReducedMotion();
  return <section id="our-families" className="family-section section-spacing">
    <div className="page-width">
      <Reveal className="section-heading"><span className="eyebrow">ROOTED IN LOVE · JOINED IN JOY</span><h2>Two families.<br/><i>One beautiful beginning.</i></h2><p>Before there was us, there was their love.<br/>With grateful hearts, our families welcome you.</p></Reveal>
      <Reveal className="family-landscape"><img src="/images/family-watercolor-v2.webp" alt="Watercolor of two families gathering in a lakeside palace courtyard" loading="lazy" width="1536" height="1024"/><span className="family-art-caption">a little tradition. a lifetime of togetherness.</span></Reveal>
      <motion.div className="family-grid" initial="hidden" whileInView="shown" viewport={{once:true,amount:.15}} transition={{staggerChildren:.16}}>
        {[GROOM_PROFILE,BRIDE_PROFILE].map((person,index)=><motion.article key={person.name} className="family-card" variants={{hidden:{opacity:0,y:reduced?0:28},shown:{opacity:1,y:0}}} transition={{duration:.75,ease}}>
          <span className="family-side small-label">{index===0?'WITH LOVE, THE GROOM’S FAMILY':'WITH LOVE, THE BRIDE’S FAMILY'}</span>
          <h3>The {index===0?'Rathores':'Deshmukhs'}</h3><span className="family-rule"/>
          <p className="family-parents">{person.parents.split(' & ').map((name,i)=><span key={name}>{i>0&&<i>&amp; </i>}{name}</span>)}</p>
          <p className="family-welcome">{index===0?'Joyfully welcoming Ananya into our hearts and our home.':'Sending Suryaveer and Ananya into their next chapter with all our love.'}</p>
          <button className="family-toggle" onClick={()=>setExpanded(expanded===index?null:index)} aria-expanded={expanded===index} aria-controls={`family-elders-${index}`}>With the blessings of our elders <motion.span animate={{rotate:expanded===index?45:0}}><Plus size={16}/></motion.span></button>
          <AnimatePresence initial={false}>{expanded===index&&<motion.div id={`family-elders-${index}`} className="family-elders" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.35,ease}}><p>{person.grandparents}</p></motion.div>}</AnimatePresence>
        </motion.article>)}
      </motion.div>
      <Reveal className="family-footer"><Heart size={15}/><p>Not just two people. All the people who made us.</p></Reveal>
    </div>
  </section>;
}


const weddingMoments=[
 {image:'/images/haldi-watercolor-v3.webp',label:'The Haldi',title:'A little sunshine.',description:'Marigold mornings, golden smiles, and the people who make everything brighter.',date:'24 NOVEMBER · MORNING'},
 {image:'/images/sangeet-watercolor-v3.webp',label:'The Sangeet',title:'Dancing into forever.',description:'An evening of music, family performances, and one more song before we call it a night.',date:'24 NOVEMBER · EVENING'},
 {image:'/images/palace-watercolor-v2.webp',label:'The Wedding',title:'Our kind of always.',description:'Seven steps, a thousand blessings, and a promise to choose each other every day.',date:'25 NOVEMBER · THE WEDDING'},
 {image:'/images/family-watercolor-v2.webp',label:'Our people',title:'All the love around us.',description:'Two families, countless stories, and a celebration made complete by you.',date:'TOGETHER WITH OUR FAMILIES'},
];
function WeddingGallery(){
 const [selected,setSelected]=useState<number|null>(null);
 const closeGallery=useCallback(()=>setSelected(null),[]);
 const reduced=useReducedMotion();
 useEffect(()=>{if(selected===null)return;const onKey=(event:KeyboardEvent)=>{if(event.key==='ArrowRight'){event.preventDefault();setSelected(i=>i===null?null:(i+1)%weddingMoments.length);}if(event.key==='ArrowLeft'){event.preventDefault();setSelected(i=>i===null?null:(i+weddingMoments.length-1)%weddingMoments.length);}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[selected]);
 return <section id="wedding-moments" className="moments-section page-width section-spacing">
  <Reveal className="section-heading"><span className="eyebrow">LITTLE GLIMPSES OF WHAT’S TO COME</span><h2>Let the celebrations<br/><i>come to life.</i></h2><p>A little colour. A little music. A whole lot of love.<br/>Open a card and step into the moment.</p></Reveal>
  <div className="moments-grid">{weddingMoments.map((moment,index)=><motion.button key={moment.image} type="button" className="moment-card" onClick={()=>setSelected(index)} initial={{opacity:0,y:reduced?0:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.7,delay:(index%2)*.12,ease}} whileHover={reduced?undefined:{y:-6}} whileTap={reduced?undefined:{scale:.985}} aria-label={`Open ${moment.label} illustration`}><span className="moment-image"><img src={moment.image} alt={moment.label+' wedding watercolor illustration'} loading="lazy" width="1536" height="1024"/><span className="moment-open"><ArrowUpRight size={18}/></span></span><span className="moment-caption"><span><span className="small-label">{moment.label}</span><strong>{moment.title}</strong></span><span className="moment-index">0{index+1}</span></span></motion.button>)}</div>
  <p className="gallery-note">A watercolor daydream of our celebrations.</p>
  <AnimatePresence>{selected!==null&&<Dialog key="gallery" title="Wedding moments" className="gallery-dialog" onClose={closeGallery}><div className="gallery-image-stage"><AnimatePresence mode="wait" initial={false}><motion.img key={selected} src={weddingMoments[selected].image} alt={weddingMoments[selected].label+' wedding watercolor illustration'} initial={{opacity:0,scale:reduced?1:1.035}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:reduced?1:.985}} transition={{duration:.3,ease}}/></AnimatePresence></div><div className="gallery-copy"><span className="small-label">{weddingMoments[selected].date}</span><h2>{weddingMoments[selected].title}</h2><p>{weddingMoments[selected].description}</p><div className="gallery-navigation"><button onClick={()=>setSelected((selected+weddingMoments.length-1)%weddingMoments.length)} aria-label="Previous wedding moment">← <span>Previous</span></button><span aria-live="polite">{selected+1} / {weddingMoments.length}</span><button onClick={()=>setSelected((selected+1)%weddingMoments.length)} aria-label="Next wedding moment"><span>Next</span> →</button></div></div></Dialog>}</AnimatePresence>
 </section>;
}

export default function App(){
  const [dialog,setDialog]=useState<'rsvp'|'card'|'blessings'|null>(null);
  const [openEvent,setOpenEvent]=useState(0);
  const [activeVow,setActiveVow]=useState(0);
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:100,damping:30});
  const reduced=useReducedMotion();
  const photoY=useTransform(scrollYProgress,[0,0.25],[0,reduced?0:-45]);
  return <MotionConfig reducedMotion="user"><div className="wedding-page">
    <motion.div className="reading-progress" style={{scaleX:progress}}/>
    <header className="invitation-nav"><a href="#home" className="monogram" aria-label="Suryaveer and Ananya home">S<span>&amp;</span>A<span className="monogram-dot">.</span></a><nav aria-label="Wedding navigation"><a href="#our-story">Our story</a><a href="#our-families">Our families</a><a href="#celebrations">The celebrations</a><a href="#venue">Getting there</a></nav><button className="nav-rsvp" onClick={()=>setDialog('rsvp')}>Kindly RSVP <ArrowUpRight size={15}/></button></header>
    <main>
      <section id="home" className="invitation-hero page-width">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span/>A LOVE LETTER FROM UDAIPUR</p></Reveal>
          <h1><motion.span initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1,ease}}>Suryaveer</motion.span><motion.span className="second-name" initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1,delay:0.15,ease}}><i>&amp;</i> Ananya<span className="name-period">.</span></motion.span></h1>
          <Reveal delay={0.25}><p className="hero-invitation">A little destiny. A lot of love.<br/>And you, by our side.</p><p className="hero-note">Together with our families, we invite you to celebrate<br className="desktop-break"/> a little tradition, a lot of love, and our forever.</p></Reveal>
          <Reveal className="hero-actions" delay={0.4}><button className="button button-dark" onClick={()=>setDialog('card')}>You’re invited <ArrowUpRight size={16}/></button><a href="#celebrations" className="text-button">The little details <ArrowDown size={14}/></a></Reveal>
          <Reveal className="hero-date" delay={0.5}><span className="tiny-star">✳</span><div><span className="small-label">SAVE OUR DATE</span><p>24 — 25 November, 2026</p></div><span className="date-divider"/><span className="small-label">UDAIPUR<br/>RAJASTHAN, INDIA</span></Reveal>
        </div>
        <motion.div className="hero-art illustrated-hero" style={{y:photoY}}>
          <span className="art-vertical small-label">A CELEBRATION OF TWO SOULS &amp; THEIR PEOPLE</span>
          <div className="photo-underlay"/>
          <motion.div className="hero-photo-card" initial={{rotate:2,y:35,opacity:0}} animate={{rotate:0,y:0,opacity:1}} transition={{duration:1.3,delay:0.2,ease}} whileHover={reduced?undefined:{rotate:1,y:-5}}>
            <div className="paper-tape"/><div className="hero-photo-window"><motion.img src="/images/palace-watercolor-v2.webp" alt="Watercolor of a bride and groom beneath a Udaipur palace arch at sunset" initial={{scale:1.12}} animate={{scale:1}} transition={{duration:1.8,ease}} fetchPriority="high"/></div>
            <div className="photo-caption"><span>a place for our forever</span><Heart size={15}/></div>
          </motion.div>
          <motion.div className="date-stamp" initial={{scale:1.4,rotate:15,opacity:0}} animate={{scale:1,rotate:10,opacity:1}} transition={{delay:0.85,type:'spring',stiffness:150,damping:15}}><span>THE WEDDING</span><strong>25.11</strong><span>UDAIPUR · 2026</span></motion.div>
          <Botanical className="hero-botanical"/>
          <span className="handwritten hero-scribble">two hearts,<br/>one beautiful beginning</span>
        </motion.div>
      </section>

      <section className="date-ribbon"><span>WITH OUR FAVOURITE PEOPLE</span><span className="ribbon-flower">✳</span><span>IN OUR FAVOURITE MOMENT</span><span className="ribbon-flower">✳</span><span>WITH ALL OUR LOVE</span></section>

      <section id="our-story" className="story-section page-width section-spacing">
        <Reveal className="section-heading"><span className="eyebrow">01 / THE TWO OF US</span><h2>A meeting of hearts.<br/><i>A lifetime of stories.</i></h2><p>Different beginnings. Shared dreams.<br/>A beautiful new chapter, written together.</p></Reveal>
        <div className="couple-grid">{[GROOM_PROFILE,BRIDE_PROFILE].map((person,index)=><Reveal key={person.name} delay={index*0.15} className={`person-card person-${index}`}>
          <div className="person-photo"><img src={person.image} alt={person.name} loading="lazy"/><span className="person-index">0{index+1}</span></div>
          <div className="person-copy"><span className="small-label">{person.title}</span><h3>{person.name.split(' ')[0]}</h3><p>{person.bio}</p><span className="parents">{index===0?'Son':'Daughter'} of<br/>{person.parents}</span><details><summary>A little more about {person.name.split(' ')[0]} <Plus size={14}/></summary><p>{person.education}<br/>{person.profession}</p><p>{person.quote}</p></details></div>
        </Reveal>)}</div>
        <Reveal className="little-quote"><Botanical/><p>“A thousand little moments<br/>led us to <i>this one.</i>”</p><span className="small-label">AND WE’RE SO GLAD YOU’RE A PART OF IT.</span></Reveal>
      </section>

      <WeddingGallery/>

      <Families/>

      <section id="celebrations" className="celebrations-section section-spacing"><div className="page-width celebrations-layout">
        <Reveal className="celebrations-intro"><span className="eyebrow">02 / THE GOOD TIMES</span><h2>Two days.<br/>So many <i>memories.</i></h2><p>A little colour, a little dancing,<br/>and a whole lot of togetherness.</p><div className="celebration-mini-date"><span>24</span><i>&amp;</i><span>25</span><p>NOVEMBER<br/>2026</p></div><span className="handwritten">Come for the wedding.<br/>Stay for the memories.</span><button className="text-button" onClick={downloadCalendar}><CalendarDays size={15}/>Add the wedding to your calendar <ArrowUpRight size={14}/></button></Reveal>
        <div className="event-list">{CEREMONIES.map((event,index)=><motion.article layout key={event.id} className={`event-card ${openEvent===index?'event-open':''}`}>
          <button className="event-trigger" aria-expanded={openEvent===index} aria-controls={`event-${index}`} onClick={()=>setOpenEvent(openEvent===index?-1:index)}><span className="event-number">0{index+1}</span><span className="event-title"><span className="small-label">{event.date.includes('24th')?'24 NOVEMBER':'25 NOVEMBER'} · {event.time.split(' (')[0].replace(' onwards','')}</span><strong>{eventLabels[index]}</strong><span className="event-tagline">{eventNames[index]}</span></span><motion.span className="event-plus" animate={{rotate:openEvent===index?45:0}}><Plus size={20}/></motion.span></button>
          <AnimatePresence initial={false}>{openEvent===index&&<motion.div id={`event-${index}`} className="event-details" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.4,ease}}>
            <p>{event.description}</p><p className="event-location"><MapPin size={14}/>{event.venue}</p><div className="dress-note"><span style={{background:event.dressColor}}/><p><b>A note on what to wear</b>{event.dressCode}</p></div>
          </motion.div>}</AnimatePresence>
        </motion.article>)}</div>
      </div></section>

      <section id="seven-vows" className="vows-section page-width section-spacing"><Reveal className="section-heading"><span className="eyebrow">03 / SEVEN STEPS, ONE PROMISE</span><h2>To choose you.<br/><i>Every single day.</i></h2></Reveal>
        <div className="vow-numbers" role="group" aria-label="The seven wedding vows">{SEVEN_VOWS.map((vow,index)=><button key={vow.step} onClick={()=>setActiveVow(index)} aria-label={`Read vow ${index+1}`} aria-pressed={activeVow===index}>{activeVow===index&&<motion.span layoutId="vow-circle" transition={{type:'spring',stiffness:250,damping:25}}/>}<span>0{vow.step}</span></button>)}</div>
        <div className="vow-stage"><AnimatePresence mode="wait" initial={false}><motion.div key={activeVow} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.25}}><h3>{SEVEN_VOWS[activeVow].subtitle}</h3><p>{SEVEN_VOWS[activeVow].description}</p></motion.div></AnimatePresence></div>
      </section>

      <section id="venue" className="venue-section page-width"><Reveal className="venue-card"><div className="venue-illustration" aria-hidden="true"><svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.1"><motion.path d="M25 226H375M62 226V115H338V226M106 226V151H294V226M157 226V172C157 113 243 113 243 172V226M174 226V173C174 137 226 137 226 173V226M52 115H348M77 115V74H114V115M286 115V74H323V115M70 74H121L95 40L70 74ZM279 74H330L305 40L279 74ZM167 115V69H233V115M158 69H242L200 25L158 69ZM200 25V8M200 8H218L200 17M94 151V202M306 151V202M30 239C89 228 95 248 151 239S247 230 302 239S354 244 378 237M40 251C98 240 124 257 174 250S264 245 306 252" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:2.5,ease}} viewport={{once:true}}/><circle cx="135" cy="132" r="6"/><circle cx="265" cy="132" r="6"/></svg><span className="small-label">A LITTLE PALACE. A LOT OF LOVE.</span></div><div className="venue-copy"><span className="eyebrow">04 / MEET US HERE</span><h2>Love, by<br/><i>the lake.</i></h2><h3>The Rajvilas Palace</h3><p>Lake Palace Enclave<br/>Udaipur, Rajasthan · 313001</p><a className="button button-outline" href={maps} target="_blank" rel="noreferrer">Find your way <ArrowUpRight size={15}/></a></div></Reveal></section>

      <section className="closing-section section-spacing page-width"><Reveal><span className="eyebrow">THE ONLY THING MISSING IS YOU</span><h2>Our happiest day,<br/>with our <i>favourite people.</i></h2><Countdown/><button className="button button-dark" onClick={()=>setDialog('rsvp')}>We saved you a seat <ArrowUpRight size={16}/></button><p className="rsvp-note">Kindly let us know if you’ll be joining.</p><button className="guestbook-link" onClick={()=>setDialog('blessings')}>Leave us a little love <Heart size={14}/></button></Reveal></section>
    </main>
    <footer className="invitation-footer page-width"><a href="#home" className="monogram">S<span>&amp;</span>A<span className="monogram-dot">.</span></a><p>Made of little moments. Meant for a lifetime.</p><span className="small-label">24—25.11.2026 · UDAIPUR</span></footer>
    <div className="sound-control"><AudioPlayer/></div>
    <AnimatePresence>{dialog==='rsvp'&&<Rsvp key="rsvp" onClose={()=>setDialog(null)}/>} {dialog==='card'&&<InvitationCard key="card" onClose={()=>setDialog(null)}/>} {dialog==='blessings'&&<BlessingBook key="blessings" onClose={()=>setDialog(null)}/>}</AnimatePresence>
  </div></MotionConfig>;
}
