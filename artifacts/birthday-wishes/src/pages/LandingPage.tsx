import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { Music, Music2, Volume2, VolumeX, Sparkles } from 'lucide-react';

const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/10/audio_7ac42500c4.mp3";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const fullText = "Hey Gopiha... I have a special surprise for you";
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setTimeout(() => setShowButton(true), 1000);
      }
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    // Play a subtle chime if possible, then navigate
    setLocation("/birthday");
  };

  return (
    <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-pink-500/30">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              boxShadow: '0 0 10px 2px rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Music Control */}
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md group relative"
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-6 h-6 text-pink-300" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-pink-400 rounded-full -z-10"
              />
            </div>
          ) : (
            <VolumeX className="w-6 h-6 text-gray-400" />
          )}
          
          <audio ref={audioRef} src={MUSIC_URL} loop />
          
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/10 px-3 py-1 rounded text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isPlaying ? "Pause Music" : "Play Music"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white/90 tracking-tight leading-tight">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-10 md:h-14 bg-pink-400 align-middle ml-1"
            />
          </h1>
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 20px rgba(236,72,153,0.3)", "0 0 40px rgba(236,72,153,0.5)", "0 0 20px rgba(236,72,153,0.3)"]
                }}
                transition={{ boxShadow: { repeat: Infinity, duration: 3 } }}
                className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium text-xl shadow-2xl flex items-center gap-3 mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Open Your Surprise</span>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="relative z-10"
                >
                  🎁
                </motion.span>
              </motion.button>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2 }}
                className="mt-6 text-white/40 text-sm font-light uppercase tracking-[0.2em]"
              >
                Tap to proceed
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none" />
    </div>
  );
}
