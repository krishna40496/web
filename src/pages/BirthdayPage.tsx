import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Moon, Music, Coffee, Book } from 'lucide-react';
import CakeSection from '@/components/CakeSection';
import ChandelierHero from '@/components/ChandelierHero';

const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
  
  useEffect(() => {
    // Fewer particles for background on mobile
    const count = window.innerWidth < 768 ? 20 : 50;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20 backdrop-blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px 1px rgba(255, 182, 193, 0.2)'
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', `${Math.random() * 10 - 5}vw`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`relative min-h-screen flex items-center justify-center py-20 md:py-32 px-4 md:px-6 ${className}`}>
    <div className="max-w-6xl mx-auto z-10 relative w-full">
      {children}
    </div>
  </section>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function BirthdayPage() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const [wishMade, setWishMade] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Particles />
      
      {/* 1. Chandelier Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] touch-pan-y">
        <ChandelierHero name="Gopiha" />
        
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40 gap-4"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-light">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" 
          />
        </motion.div>
      </section>

      {/* 3. Memory Lane Section */}
      <Section className="overflow-hidden md:py-40">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
          
          {/* Memory Lane Collage */}
          <div className="relative w-full md:w-1/2 h-[450px] md:h-[700px] flex items-center justify-center touch-pan-y">
            {[
              { src: "/pics/memory-1.jpeg", rot: -12, x: isMobile ? -40 : -90, y: isMobile ? -60 : -100, scale: 0.9 },
              { src: "/pics/memory-2.jpeg", rot: 10, x: isMobile ? 50 : 80, y: isMobile ? -80 : -120, scale: 0.95 },
              { src: "/pics/memory-3.jpeg", rot: -6, x: isMobile ? -50 : -70, y: isMobile ? 70 : 100, scale: 1 },
              { src: "/pics/memory-4.jpeg", rot: 15, x: isMobile ? 60 : 90, y: isMobile ? 60 : 80, scale: 0.9 },
              { src: "/pics/memory-5.jpeg", rot: -2, x: 0, y: 0, scale: 1.15, isFront: true },
            ].map((img, i) => (
              <motion.div
                key={i}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.1}
                // touch-action: pan-y allows background scrolling while over the card
                className="absolute p-2 md:p-3 pb-8 md:pb-10 bg-white shadow-xl border border-white/20 cursor-grab active:cursor-grabbing group select-none touch-pan-y"
                style={{ 
                  zIndex: img.isFront ? 10 : i + 1,
                  width: isMobile ? '160px' : '240px',
                  x: img.x,
                  y: img.y,
                  rotate: img.rot,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: img.scale }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2, 
                  delay: i * 0.1,
                  type: 'spring',
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 50,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 pointer-events-none mb-2 md:mb-3">
                  <img 
                    src={img.src} 
                    alt={`Memory ${i}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center items-center opacity-10">
                  <div className="w-6 h-1 bg-gray-400 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left md:pl-20">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-6xl text-primary mb-8 leading-tight drop-shadow-sm">
               The Moments
              </h2>
              <div className="space-y-6">
                 {[
                   "eppovum happy ah irunga with that smile 😊",
                 ].map((line, i) => (
                   <motion.p
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, delay: 0.8 + i * 0.4 }}
                     className="text-xl md:text-2xl font-light text-foreground/80 italic font-serif tracking-wide leading-relaxed"
                   >
                     {line}
                   </motion.p>
                 ))}
              </div>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 2 }}
                className="h-px bg-gradient-to-r from-primary/60 to-transparent mt-12 mx-auto md:mx-0"
              />
            </FadeIn>
          </div>

        </div>
      </Section>


      {/* 5. Visual Break - Cake Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden my-32">
        <div className="absolute inset-0 z-0">
          <img src="/cake.png" alt="Birthday Cake" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
      </section>

      {/* 6. Interactive Cake & Wish Section */}
      <Section>
        <div className="text-center">
          <FadeIn>
            <h2 className="font-serif text-6xl md:text-8xl text-accent mb-6">
              Make a wish
            </h2>
            <p className="text-xl md:text-2xl font-light text-foreground/20 mb-6">
              Close your eyes. Hold the moment. Then let it go.
            </p>
          </FadeIn>

          <div className="flex flex-col items-center">
            <CakeSection
              wishMade={wishMade}
              candlesBlown={candlesBlown}
              onBlowCandles={() => {
                setCandlesBlown(true);
                setTimeout(() => setWishMade(true), 2200);
              }}
            />
          </div>
        </div>
      </Section>

      {/* 7. Promise Section */}
      <Section className="bg-gradient-to-t from-card/30 to-transparent">
        <FadeIn>
          <div className="text-center space-y-8">
             <h2 className="font-serif text-5xl text-accent mb-8">My wish for you</h2>
             <p className="text-xl font-light leading-relaxed">
               I wish you days filled with unexpected poetry. Mornings that start slow and golden.
               Evenings that end in deep, fulfilling laughter. I wish you courage when you need it,
               and soft places to land when you're tired.
             </p>
          </div>
        </FadeIn>
      </Section>

      {/* 8. Closing Letter */}
      <Section>
        <FadeIn>
          <div className="bg-card/40 backdrop-blur-md p-12 md:p-20 rounded-3xl border border-primary/20 shadow-2xl shadow-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            
            <p className="font-serif text-4xl md:text-5xl text-foreground mb-10 leading-relaxed text-primary">
              hey Gopiha
            </p>
            <div className="space-y-8 text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">
              <p>
                As you step into another year of your life, I just want you to remember one thing — everything is going to change, and it’s going to change very beautifully.
              </p>
              <p>
                unnga dreams laam big. i wish you will achieve in life as what you've imagined ,
               eppovum romba santhosham ahm irunga with all your beautiful smile .
              </p>
              <p className="font-medium text-foreground">
                Happy Birthday Gopiha.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="mt-16 pt-10 border-t border-primary/15 flex items-center justify-end gap-4"
            >
              <span className="font-serif text-3xl text-primary">Best birthday wishes to you</span>
            </motion.div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
