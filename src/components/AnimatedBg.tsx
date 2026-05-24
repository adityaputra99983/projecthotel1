'use client';

import { useEffect, useRef } from "react";

export default function AnimatedBg() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* BASE GRADIENT - bright and visible */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #0a2a14 0%, #14532d 20%, #1a6b3c 40%, #1e7a45 55%, #166534 75%, #0a2812 100%)',
      }} />

      {/* LARGE GLOWING ORBS */}
      <div className="absolute inset-0">
        <div className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '5%', left: '10%',
            background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, rgba(34,197,94,0.25) 25%, transparent 65%)',
            animation: 'drift 20s ease-in-out infinite',
          }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '45%', right: '5%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.45) 0%, rgba(16,185,129,0.2) 30%, transparent 60%)',
            animation: 'drift 25s ease-in-out infinite',
            animationDelay: '-8s',
          }}
        />
        <div className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '8%', left: '25%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(74,222,128,0.15) 35%, transparent 65%)',
            animation: 'drift 22s ease-in-out infinite',
            animationDelay: '-15s',
          }}
        />
      </div>

      {/* SCENERY IMAGE */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* LIGHT RAYS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.04) 40%, transparent 50%)',
            backgroundSize: '300% 100%',
            animation: 'shimmer 6s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, transparent 45%, rgba(74,222,128,0.06) 55%, transparent 65%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 8s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />
      </div>

      {/* FIREFLIES CANVAS */}
      <FireflyCanvas />
    </div>
  );
}

function FireflyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface P { x: number; y: number; vx: number; vy: number; size: number; phase: number; speed: number; hue: number; }
    const particles: P[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.025,
        hue: 90 + Math.random() * 60,
      });
    }

    let t = 0;
    function draw() {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * 0.01 + p.phase) * 0.15;
        p.y += p.vy + Math.cos(t * 0.008 + p.phase * 1.3) * 0.15;
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.y < -30) p.y = canvas.height + 30;
        if (p.y > canvas.height + 30) p.y = -30;

        const twinkle = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * p.speed + p.phase));
        if (twinkle < 0.1) return;
        ctx.save();
        ctx.globalAlpha = twinkle * 0.6;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 80%, 0.35)`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 80%, 70%, 0.1)`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 90%, 0.95)`;
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
