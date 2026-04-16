import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CelestialHeroProps {
  name?: string;
}

export default function CelestialHero({ name = "Gopiha" }: CelestialHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.5 
      } 
    }
  } as const;

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: -90, 
      scale: 0.5,
      filter: 'blur(20px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: "spring" as const, 
        damping: 12, 
        stiffness: 100,
        duration: 2
      }
    }
  } as const;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] font-serif">
      {/* Dynamic Background Auras */}
      <motion.div 
        animate={{ 
          x: mousePos.x * -1, 
          y: mousePos.y * -1,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" 
      />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%', 
              opacity: 0 
            }}
            animate={{ 
              y: [null, '-20vh'],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 4 + 4, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="z-20 text-center perspective-[1000px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          className="block text-primary/60 text-lg md:text-xl tracking-[0.8em] uppercase mb-8 font-light"
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.8em' }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          Cherishing
        </motion.span>

        <h1 className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-7xl md:text-[10rem] leading-none text-white overflow-hidden py-4">
          <span className="sr-only">Happy Birthday {name}</span>
          
          <div className="flex gap-2">
            {"Happy".split("").map((l, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block hover:text-primary transition-colors cursor-default">
                {l}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-2">
            {"Birthday".split("").map((l, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block text-primary drop-shadow-[0_0_30px_rgba(255,182,193,0.3)]">
                {l}
              </motion.span>
            ))}
          </div>
        </h1>

        <motion.div
          className="mt-12 flex items-center justify-center gap-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-4xl md:text-6xl text-white/90 font-light italic">
             {name}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Cinematic Light Beam Sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[45deg] z-10 pointer-events-none"
          initial={{ x: '-150%' }}
          animate={{ x: '150%' }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" as const }}
        />
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-[10%] opacity-20 hidden md:block"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40L50 0Z" fill="pink" />
        </svg>
      </motion.div>
    </div>
  );
}
