import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Moon, Music, Coffee, Book } from 'lucide-react';
import CakeSection from '@/components/CakeSection';
import ChandelierHero from '@/components/ChandelierHero';

const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
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
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px 2px rgba(255, 182, 193, 0.4)'
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', `${Math.random() * 20 - 10}vw`],
            opacity: [0, 0.8, 0],
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
  <section className={`relative min-h-screen flex items-center justify-center py-32 px-6 ${className}`}>
    <div className="max-w-4xl mx-auto z-10 relative w-full">
      {children}
    </div>
  </section>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function BirthdayPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const [wishMade, setWishMade] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Particles />
      
      {/* 1. Chandelier Hero Section (Replaces Old Hero) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        <ChandelierHero name="Gopiha" />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40 gap-4"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-light">Continue the Journey</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" 
          />
        </motion.div>
      </section>


      {/* 3. Memory Lane Section (Replaces Timeline) */}
      <Section className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
          
          {/* Memory Lane: Personalized Polaroid Collage */}
          <div className="relative w-full md:w-1/2 h-[600px] md:h-[800px] flex items-center justify-center">
            {[
              { src: "/pics/memory-1.jpeg", rot: -15, x: -90, y: -100, scale: 1 },
              { src: "/pics/memory-2.jpeg", rot: 12, x: 80, y: -120, scale: 1.05 },
              { src: "/pics/memory-3.jpeg", rot: -8, x: -70, y: 100, scale: 1.1 },
              { src: "/pics/memory-4.jpeg", rot: 18, x: 90, y: 80, scale: 0.95 },
              { src: "/pics/memory-5.jpeg", rot: -2, x: 0, y: 0, scale: 1.25, isFront: true },
            ].map((img, i) => (
              <motion.div
                key={i}
                drag
                dragConstraints={{ left: -150, right: 150, top: -200, bottom: 200 }}
                dragElastic={0.25}
                initial={{ opacity: 0, scale: 0.4, x: img.x * 2.5, y: img.y * 2.5, rotate: img.rot * 3 }}
                whileInView={{ opacity: 1, scale: img.scale || 1, x: img.x, y: img.y, rotate: img.rot }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.15, 
                  type: 'spring', 
                  damping: 18, 
                  stiffness: 70 
                }}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 0, 
                  zIndex: 100, 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  transition: { duration: 0.3 } 
                }}
                whileTap={{ scale: 0.95, zIndex: 100 }}
                className="absolute p-3 pb-10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/20 cursor-grab active:cursor-grabbing group overflow-hidden"
                style={{ 
                  zIndex: img.isFront ? 10 : i + 1,
                  width: 'min(260px, 60%)',
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100/50 mb-3">
                  <img 
                    src={img.src} 
                    alt={`Memory ${i}`} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-center items-center opacity-20">
                  <div className="w-8 h-1 bg-gray-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Emotional Text */}
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
