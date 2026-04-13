import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Moon, Sun, Wind, Music, Coffee, Book } from 'lucide-react';
import CakeSection from '@/components/CakeSection';

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
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/celebration.png" alt="Celebration" className="w-full h-full object-cover opacity-20 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mb-8"
          >
            <Sparkles className="text-accent w-12 h-12 mx-auto opacity-80" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-7xl md:text-9xl text-primary drop-shadow-[0_0_30px_rgba(235,145,175,0.4)] mb-8 leading-tight py-4"
          >
            Happy Birthday
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="text-xl md:text-3xl font-light tracking-widest text-foreground/90 max-w-2xl mx-auto"
          >
            A moment in time, entirely for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/50"
          >
            <span className="text-sm tracking-[0.3em] mb-4 font-sans uppercase">scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-24 bg-gradient-to-b from-primary/80 to-transparent" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. The Glow Section */}
      <Section className="bg-gradient-to-b from-transparent to-card/20">
        <div className="text-center">
          <FadeIn>
            <h2 className="font-serif text-5xl md:text-7xl text-accent mb-12">
              Another year of light
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-foreground/80 mb-8 max-w-2xl mx-auto">
              You have a way of making everything around you just a little bit brighter. 
              The world is softer, warmer, and infinitely more beautiful with you in it.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-foreground/80 max-w-2xl mx-auto">
              Today isn't just about getting older. It's about celebrating the unique, 
              irreplaceable glow you bring to the lives of everyone lucky enough to know you.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* 3. Milestone / Memory Timeline */}
      <Section>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/20" />
          
          {[
            { year: "The Beginning", text: "When you first opened your eyes, the world gained a beautiful soul." },
            { year: "The Journey", text: "Every step, every stumble, every triumph has shaped the incredible person you are today." },
            { year: "The Now", text: "Standing here, radiating warmth and grace. You are exactly where you are meant to be." }
          ].map((item, i) => (
            <div key={i} className={`relative flex items-center mb-32 last:mb-0 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1 }}
                className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}
              >
                <div className="font-serif text-3xl md:text-4xl text-primary mb-4">{item.year}</div>
                <div className="text-lg font-light text-foreground/70 leading-relaxed">{item.text}</div>
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(251,191,36,0.6)]" 
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Heartfelt Gallery / Reasons */}
      <Section className="bg-card/30 rounded-3xl mx-4 my-12 backdrop-blur-sm border border-primary/10">
        <FadeIn>
          <h2 className="font-serif text-5xl md:text-7xl text-center text-primary mb-24">
            Things that make you, you
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {[
            {
              title: "Your Warmth",
              desc: "How you always know exactly what to say to make people feel heard, seen, and deeply understood.",
              icon: Sun
            },
            {
              title: "Your Resilience",
              desc: "The quiet, graceful strength you carry through every season of life.",
              icon: Wind
            },
            {
              title: "Your Spirit",
              desc: "That incredible energy that turns ordinary moments into memories we'll cherish forever.",
              icon: Star
            },
            {
              title: "Your Heart",
              desc: "The boundless capacity you have to love and care for others.",
              icon: Heart
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-8 shadow-lg shadow-primary/5 group-hover:shadow-primary/30 group-hover:scale-110 transition-all duration-500 border border-primary/20">
                <item.icon className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-3xl font-serif text-foreground mb-4">{item.title}</h3>
              <p className="text-lg text-foreground/70 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. Visual Break - Cake Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden my-32">
        <div className="absolute inset-0 z-0">
          <img src="/cake.png" alt="Birthday Cake" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
        <FadeIn className="relative z-10 text-center px-6">
          <p className="font-serif text-4xl md:text-6xl text-primary drop-shadow-md">
            "Count your life by smiles, not tears. Count your age by friends, not years."
          </p>
        </FadeIn>
      </section>

      {/* 6. Interactive Cake & Wish Section */}
      <Section>
        <div className="text-center">
          <FadeIn>
            <h2 className="font-serif text-6xl md:text-8xl text-accent mb-6">
              Make a wish
            </h2>
            <p className="text-xl md:text-2xl font-light text-foreground/70 mb-16">
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
              Dearest,
            </p>
            <div className="space-y-8 text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">
              <p>
                I hope today feels as special as you are. I hope you feel surrounded by love, 
                held by peace, and excited for what's to come.
              </p>
              <p>
                You deserve a year filled with unexpected joys, deep belly laughs, quiet moments 
                of immense gratitude, and dreams realized. 
              </p>
              <p className="font-medium text-foreground">
                Thank you for existing. Happy Birthday.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="mt-16 pt-10 border-t border-primary/15 flex items-center justify-end gap-4"
            >
              <span className="font-serif text-3xl text-primary">With all my love</span>
              <Heart className="text-accent w-8 h-8 fill-accent/20 animate-pulse" />
            </motion.div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
