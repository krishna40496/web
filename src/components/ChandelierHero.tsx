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
    let particleSprite: HTMLCanvasElement | null = null;
    const text = `Happy Birthday ${name}`;

    const createParticleSprite = (size: number) => {
      const sprite = document.createElement('canvas');
      const sSize = size * 10;
      sprite.width = sSize;
      sprite.height = sSize;
      const sCtx = sprite.getContext('2d')!;
      
      const grad = sCtx.createRadialGradient(sSize/2, sSize/2, 0, sSize/2, sSize/2, sSize/2);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.8)');
      grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      
      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(sSize/2, sSize/2, sSize/2, 0, Math.PI * 2);
      sCtx.fill();
      
      sCtx.fillStyle = 'rgba(255, 255, 255, 1)';
      sCtx.beginPath();
      sCtx.arc(sSize/2, sSize/2, size * 0.7, 0, Math.PI * 2);
      sCtx.fill();
      
      return sprite;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleSprite = createParticleSprite(2); // Base size for spirit
      init();
    };

    const init = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? Math.min(window.innerWidth * 0.12, 45) : Math.min(window.innerWidth * 0.08, 100);
      ctx.font = `600 ${fontSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
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
      const step = isMobile ? 8 : 5; // Reduced density on mobile for performance

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
              size: isMobile ? 1.5 : Math.random() * 2 + 1.5,
              alpha: 0,
              delay: Math.random() * (isMobile ? 40 : 80),
              flicker: Math.random() * 0.1,
              hasString: Math.random() < (isMobile ? 0.1 : 0.18)
            });
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const friction = 0.94;
      const ease = 0.04;

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
        
        if (p.alpha < 1) p.alpha += 0.02;

        const flicker = Math.sin(time * 0.01 + i) * 0.2 + 0.8;
        
        if (p.hasString) {
          ctx.beginPath();
          ctx.moveTo(p.x, 0);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(251, 191, 36, ${p.alpha * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        if (particleSprite) {
          ctx.globalAlpha = p.alpha * flicker;
          const sSize = p.size * 10;
          ctx.drawImage(particleSprite, p.x - sSize/2, p.y - sSize/2, sSize, sSize);
        }
      }
      ctx.globalAlpha = 1;

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
