import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAKE_COLORS = {
  bottom: '#6D3B26',   // Dark chocolate base
  middle: '#E08EA8',   // Strawberry frosting
  top: '#F7D8A9',      // Vanilla caramel
  filling: '#7B3E4E',  // Berry drizzle
  cream: '#FFF3D8',    // Soft cream
  plate: '#E8E1D6'     // Light ceramic plate
};

const CAKE_CSS = `
  @keyframes cake-fire {
    0%, 100% {
      background: radial-gradient(circle at 50% 20%, rgba(255, 240, 140, 1), rgba(255, 120, 30, 0.9), rgba(255, 80, 20, 0.2));
      box-shadow: 0 0 18px 6px rgba(255, 200, 100, 0.4), 0 0 40px 10px rgba(255, 130, 40, 0.18);
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    50% {
      box-shadow: 0 0 22px 8px rgba(255, 210, 120, 0.5), 0 0 48px 14px rgba(255, 140, 40, 0.2);
      transform: translateY(-4px) scale(0.96);
      opacity: 0.95;
    }
  }
`;

interface CakeSectionProps {
  wishMade: boolean;
  candlesBlown: boolean;
  onBlowCandles: () => void;
}

export default function CakeSection({ wishMade, candlesBlown, onBlowCandles }: CakeSectionProps) {
  const [showSmoke, setShowSmoke] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; sx: number; delay: number }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [micStatus, setMicStatus] = useState<'idle' | 'listening' | 'error'>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const blowCountRef = useRef(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [assemblyStep, setAssemblyStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    if (hasEntered) {
      const timings = [0, 800, 1600, 2400, 3200, 4000, 4800];
      timings.forEach((t, i) => {
        setTimeout(() => setAssemblyStep(i + 1), t);
      });
    }
  }, [hasEntered]);

  const stopListening = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsListening(false);
    setAudioLevel(0);
    blowCountRef.current = 0;
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const triggerBlow = () => {
    if (candlesBlown) return;
    stopListening();
    onBlowCandles();
    setShowSmoke(true);
    const newSparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 120 - 60,
      y: Math.random() * 40,
      sx: Math.random() * 120 - 60,
      delay: Math.random() * 0.8,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setShowSmoke(false), 2500);
    setTimeout(() => setSparkles([]), 3000);
  };

  const initMic = async () => {
    if (candlesBlown || isListening) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicStatus('error');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      await audioContext.resume();

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.85;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      setMicStatus('listening');

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const monitor = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);
        let max = 0;
        for (let i = 0; i < dataArray.length; i += 1) {
          const value = Math.abs(dataArray[i] - 128) / 128;
          if (value > max) max = value;
        }
        setAudioLevel(max);

        if (max > 0.25) {
          blowCountRef.current += 1;
        } else {
          blowCountRef.current = Math.max(0, blowCountRef.current - 1);
        }

        if (blowCountRef.current >= 5) {
          triggerBlow();
          return;
        }

        rafRef.current = requestAnimationFrame(monitor);
      };

      rafRef.current = requestAnimationFrame(monitor);
    } catch (error) {
      setMicStatus('error');
      stopListening();
    }
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    // Trigger the blow action immediately on button click
    triggerBlow();
  };

  const layerVariants = {
    hidden: { opacity: 0, y: -100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring' as any, damping: 12, stiffness: 100 }
    }
  };

  const candlePositions = [
    { left: '33%', top: 324 }, // Left
    { left: '50%', top: 314 }, // Center
    { left: '67%', top: 324 }  // Right
  ];

  return (
    <>
      <style>{CAKE_CSS}</style>
      <div ref={sectionRef} className="relative flex flex-col items-center justify-center pt-24 pb-32 scale-90 sm:scale-110 md:scale-125 lg:scale-150 transition-transform duration-1000 w-full max-w-lg mx-auto">

        <div
          className="absolute bottom-40 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(235,145,175,0.22) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Cake Assembly */}
        <div className="relative" style={{ width: 220, height: 420 }}>
          <svg width="220" height="420" viewBox="0 0 200 500" className="overflow-visible">
            {/* Plate */}
            <motion.rect 
              x="10" y="475" width="180" height="6" rx="3"
              fill={CAKE_COLORS.plate}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={hasEntered ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1 }}
            />

            {/* Layer 1 (Bottom) */}
            <motion.path
              d="M173.667,477.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002c46.385,0,97.539,0,147.334,0C177.668,461.567,173.667,477.569,173.667,477.569z"
              fill={CAKE_COLORS.bottom}
              variants={layerVariants}
              initial="hidden"
              animate={assemblyStep >= 1 ? "visible" : "hidden"}
            />

            {/* Filling 1 */}
            <motion.path
              d="M102.242,461.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z"
              fill={CAKE_COLORS.filling}
              initial={{ scaleY: 0, opacity: 0, originY: 1 }}
              animate={assemblyStep >= 2 ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />

            {/* Layer 2 (Middle) */}
            <motion.path
              d="M173.667,461.569C123.872,461.569,72.566,461.569,26.333,461.569c-3.999,0-4-16.002,0-16.002c46.385,0,97.539,0,147.334,0C177.668,445.567,173.667,461.569,173.667,461.569z"
              fill={CAKE_COLORS.middle}
              variants={layerVariants}
              initial="hidden"
              animate={assemblyStep >= 3 ? "visible" : "hidden"}
            />

            {/* Filling 2 */}
            <motion.path
              d="M102.242,427.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z"
              fill={CAKE_COLORS.filling}
              initial={{ scaleY: 0, opacity: 0, originY: 1 }}
              animate={assemblyStep >= 4 ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />

            {/* Layer 3 (Top) */}
            <motion.path
              d="M173.667,427.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002c46.385,0,97.539,0,147.334,0C177.668,411.567,173.667,427.569,173.667,427.569z"
              fill={CAKE_COLORS.top}
              variants={layerVariants}
              initial="hidden"
              animate={assemblyStep >= 5 ? "visible" : "hidden"}
            />

            {/* Cream */}
            <motion.path
              d="M111.547,415.233c-6.667-0.834-9.667,4.667-13.833,3.333c-19.649-6.291-8.158,22.176-14.5,22.334c-6.667,0.166,2.833-18-13.333-22.167c-29.544-7.615-9.667,43.833-20.167,43.833c-10.333,0,8.004-55.006-16.833-39c-7.5,4.833-9.508-3.78-9.299-7.004c0.799-12.329,23.592-7.153,38.132-7.329c10.234-0.124,20.238-1.505,38.287-2.167c16.642-0.61,32.903,1.125,46.213,1.5c12.438,0.351,35.058-5.579,31.863,6.451c-5.532,20.833,1.25,28.216-4.409,27.883c-7.606-0.447-6.058-37.895-20.62-23.333c-10.167,10.166-15.972-0.747-25,12C119.547,443.568,121.798,416.515,111.547,415.233z"
              fill={CAKE_COLORS.cream}
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={assemblyStep >= 6 ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: 'spring', damping: 10 }}
            />
          </svg>

          {/* 3 Candles */}
          <AnimatePresence>
            {assemblyStep >= 7 && candlePositions.map((pos, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: idx * 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  marginLeft: -3,
                  width: 6,
                  height: 38,
                  background: 'linear-gradient(180deg, #fff 0%, #ffe8f0 40%, #d4a0b0 100%)',
                  borderRadius: 4,
                  boxShadow: candlesBlown ? 'none' : '0 0 8px 2px rgba(255,200,150,0.3)',
                  zIndex: 10,
                  transition: 'box-shadow 0.5s ease',
                }}
              >
                {/* Candle stripes */}
                <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: 2, background: 'rgba(200,60,80,0.35)', borderRadius: 2 }} />
                <div style={{ position: 'absolute', top: '55%', left: 0, right: 0, height: 2, background: 'rgba(200,60,80,0.35)', borderRadius: 2 }} />

                {/* Flame */}
                {!candlesBlown && [2, 1.5, 1, 0.5, 0.2].map((duration, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: -22,
                      left: '50%',
                      marginLeft: -4,
                      width: 8,
                      height: 22,
                      borderRadius: '50%',
                      animation: `cake-fire ${duration}s infinite`,
                      zIndex: 20,
                    }}
                  />
                ))}

                {/* Smoke */}
                <AnimatePresence>
                  {candlesBlown && showSmoke && (
                    <>
                      {[0, 0.3, 0.6].map((delay, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.7, y: 0, scale: 0.4, x: 0 }}
                          animate={{ opacity: 0, y: -55, scale: 1.8 + i * 0.4, x: (i - 1) * 8 }}
                          transition={{ duration: 1.8 + i * 0.3, delay, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            top: -16,
                            left: '50%',
                            marginLeft: -6,
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                            filter: 'blur(3px)',
                            pointerEvents: 'none',
                            zIndex: 30,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Sparkles */}
                {idx === 1 && sparkles.map((s) => ( // Show sparkles from center candle
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], x: s.x, y: -50 - s.y, scale: [0, 1, 0.3] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: '50%',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: `hsl(${30 + Math.random() * 60}, 100%, 75%)`,
                      boxShadow: '0 0 6px 2px rgba(255,220,100,0.8)',
                      pointerEvents: 'none',
                      zIndex: 40,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={assemblyStep >= 7 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="mt-8 md:mt-12 text-center"
        >
          <AnimatePresence mode="wait">
            {!candlesBlown ? (
              <motion.div key="indication" className="flex flex-col items-center gap-6">
                 <motion.div
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                   className="text-primary/60 font-serif italic text-xl tracking-widest"
                 >
                   Now, close your eyes and make a wish...
                 </motion.div>

                <div className="relative h-20 flex flex-col items-center justify-center">
                  <motion.button
                    key="blow"
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
                    transition={{ duration: 0.6 }}
                    whileHover={!isListening ? { scale: 1.06, boxShadow: '0 0 30px rgba(235,145,175,0.5)' } : {}}
                    whileTap={!isListening ? { scale: 0.94 } : {}}
                    onClick={handleBlowCandles}
                    disabled={isListening}
                    className="relative px-12 py-5 rounded-full border border-primary/50 text-primary font-serif text-2xl tracking-wide overflow-hidden group disabled:opacity-60 transition-all"
                    style={{ background: isListening ? 'rgba(100, 150, 200, 0.15)' : 'rgba(180,80,120,0.12)', backdropFilter: 'blur(12px)' }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isListening ? 'Blow now!' : 'Blow out the candles'}
                      {isListening && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          className="w-2 h-2 rounded-full bg-current"
                        />
                      )}
                    </span>
                    {!isListening && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(circle at center, rgba(235,145,175,0.2), transparent)' }}
                        whileHover={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                  
                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-primary/70"
                    >
                      <p className="mb-2">🎤 Listening...</p>
                      <div className="w-32 h-1 bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${Math.min(audioLevel * 100, 100)}%` }}
                          className="h-full bg-gradient-to-r from-primary/60 to-accent/40 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {micStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-foreground/60"
                    >
                      <p>Mic not available - Click to blow instead</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="wish"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, rgba(251,191,36,0.8), rgba(235,145,175,0.8), rgba(251,191,36,0.8))',
                      filter: 'blur(1px)',
                      boxShadow: '0 0 30px rgba(251,191,36,0.6)',
                    }}
                  />
                </div>
                <p className="font-serif text-5xl text-primary drop-shadow-md">Your wish is on its way</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
