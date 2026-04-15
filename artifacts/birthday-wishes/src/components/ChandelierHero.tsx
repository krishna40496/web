import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  delay: number;
  flicker: number;
  hasString: boolean;
}

export default function ChandelierHero({ name = "Gopiha" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const text = `Happy Birthday ${name}`;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const fontSize = window.innerWidth > 768 ? 100 : 45;
      ctx.font = `600 ${fontSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Temporary canvas to get text positions
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.font = ctx.font;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillStyle = 'white';
      tempCtx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const step = 5; // Higher density for much clearer text visibility

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          if (imageData[index] > 128) {
            particles.push({
              x: x + (Math.random() - 0.5) * 40,
              y: -100 - Math.random() * 300, 
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 2 + 1.5, // Slightly larger particles
              alpha: 0,
              delay: Math.random() * 80, // Reduced delay for faster initial visibility
              flicker: Math.random() * 0.1,
              hasString: Math.random() < 0.18 // Slightly more strings
            });
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const friction = 0.94; // Optimized friction
      const ease = 0.04; // Faster easing for clearer formation

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.delay > 0) {
          p.delay--;
          continue;
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        
        p.vx += dx * ease;
        p.vy += dy * ease;
        p.vx *= friction;
        p.vy *= friction;
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.alpha < 1) p.alpha += 0.02; // Faster fade-in

        const flicker = Math.sin(time * 0.01 + i) * 0.2 + 0.8;
        
        // Draw String - Only for selected particles
        if (p.hasString) {
          ctx.beginPath();
          ctx.moveTo(p.x, 0);
          ctx.lineTo(p.x, p.y);
          // Boosted string visibility
          ctx.strokeStyle = `rgba(251, 191, 36, ${p.alpha * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Golden glow - Enhanced
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(251, 191, 36, ${p.alpha * flicker * 0.8})`);
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Solid core - Brighter
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [name]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10"
      style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }}
    />
  );
}
