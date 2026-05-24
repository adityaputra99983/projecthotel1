'use client';

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Firefly {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      phase: number;
    }

    const fireflies: Firefly[] = [];
    for (let i = 0; i < 40; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 + canvas.height * 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const stars: { x: number; y: number; phase: number; size: number }[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.35,
        phase: Math.random() * Math.PI * 2,
        size: 0.5 + Math.random() * 1.5,
      });
    }

    function drawSky() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      gradient.addColorStop(0, '#0d1a2b');
      gradient.addColorStop(0.25, '#142e2a');
      gradient.addColorStop(0.45, '#1a3d2a');
      gradient.addColorStop(0.6, '#1f4528');
      gradient.addColorStop(0.8, '#234d26');
      gradient.addColorStop(1, '#143a18');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      // Warm sunrise glow at the horizon
      const horizonGrad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.height * 0.3
      );
      horizonGrad.addColorStop(0, 'rgba(200, 180, 100, 0.04)');
      horizonGrad.addColorStop(0.5, 'rgba(180, 160, 80, 0.02)');
      horizonGrad.addColorStop(1, 'rgba(180, 160, 80, 0)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, canvas.height * 0.35, canvas.width, canvas.height * 0.2);
    }

    function drawStars() {
      stars.forEach((s) => {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.01 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${twinkle * 0.6})`;
        ctx.fill();
      });
    }

    function drawMoon() {
      const x = canvas.width * 0.75;
      const y = canvas.height * 0.08;
      const r = 28;

      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
      glow.addColorStop(0, 'rgba(220, 230, 200, 0.06)');
      glow.addColorStop(0.5, 'rgba(200, 220, 180, 0.02)');
      glow.addColorStop(1, 'rgba(200, 220, 180, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230, 235, 210, 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 10, y - 5, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 210, 180, 0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 15, y + 5, r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(190, 200, 170, 0.1)';
      ctx.fill();
    }

    function drawMountains() {
      const w = canvas.width;
      const h = canvas.height;

      ctx.save();

      // Mountain light glow
      const glowGrad = ctx.createLinearGradient(0, h * 0.3, 0, h * 0.5);
      glowGrad.addColorStop(0, 'rgba(180, 200, 150, 0.02)');
      glowGrad.addColorStop(1, 'rgba(180, 200, 150, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, h * 0.3, w, h * 0.2);

      // Far mountains (lighter, visible)
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.35
          + Math.sin(x * 0.0015 + 1) * h * 0.07
          + Math.sin(x * 0.004 + 2) * h * 0.035
          + Math.sin(x * 0.0008 + 3) * h * 0.045;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h * 0.5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(30, 65, 40, 0.6)';
      ctx.fill();

      // Far mountain highlight (sun-facing edge)
      ctx.beginPath();
      ctx.moveTo(0, h * 0.34);
      for (let x = 0; x <= w; x += 3) {
        const y = h * 0.33
          + Math.sin(x * 0.0015 + 1) * h * 0.07
          + Math.sin(x * 0.004 + 2) * h * 0.035
          + Math.sin(x * 0.0008 + 3) * h * 0.045;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h * 0.34);
      ctx.closePath();
      ctx.fillStyle = 'rgba(50, 100, 55, 0.15)';
      ctx.fill();

      // Near mountains (darker, closer)
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.44
          + Math.sin(x * 0.0025 + 5) * h * 0.055
          + Math.sin(x * 0.006 + 7) * h * 0.03
          + Math.sin(x * 0.001 + 9) * h * 0.04;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h * 0.55);
      ctx.closePath();
      ctx.fillStyle = 'rgba(20, 45, 28, 0.7)';
      ctx.fill();

      ctx.restore();
    }

    function drawTrees() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.save();

      for (let i = 0; i < 30; i++) {
        const tx = i * (w / 30) + Math.sin(i * 5.7) * 15;
        const baseY = h * 0.6 + Math.sin(i * 2.3) * 10;
        const th = h * (0.08 + Math.sin(i * 3.1) * 0.03);

        ctx.beginPath();
        ctx.moveTo(tx, baseY);
        ctx.lineTo(tx - 12, baseY + th * 0.2);
        ctx.lineTo(tx - 6, baseY + th * 0.2);
        ctx.lineTo(tx - 16, baseY + th * 0.45);
        ctx.lineTo(tx - 8, baseY + th * 0.45);
        ctx.lineTo(tx - 18, baseY + th * 0.7);
        ctx.lineTo(tx, baseY + th);
        ctx.lineTo(tx + 18, baseY + th * 0.7);
        ctx.lineTo(tx + 8, baseY + th * 0.45);
        ctx.lineTo(tx + 16, baseY + th * 0.45);
        ctx.lineTo(tx + 6, baseY + th * 0.2);
        ctx.lineTo(tx + 12, baseY + th * 0.2);
        ctx.closePath();
        ctx.fillStyle = `rgba(10, 30, 18, ${0.5 + Math.sin(i * 1.7) * 0.15})`;
        ctx.fill();
      }

      ctx.restore();
    }

    function drawGround() {
      const w = canvas.width;
      const h = canvas.height;
      const gradient = ctx.createLinearGradient(0, h * 0.5, 0, h);
      gradient.addColorStop(0, 'rgba(12, 32, 20, 0.5)');
      gradient.addColorStop(0.2, 'rgba(10, 28, 16, 0.7)');
      gradient.addColorStop(0.5, 'rgba(8, 22, 14, 0.9)');
      gradient.addColorStop(1, 'rgba(6, 18, 12, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, h * 0.5, w, h * 0.5);
    }

    function drawMist() {
      const w = canvas.width;
      ctx.save();
      for (let i = 0; i < 3; i++) {
        const cx = w * (0.2 + i * 0.3) + Math.sin(time * 0.003 + i * 2) * w * 0.05;
        const cy = canvas.height * (0.45 + i * 0.04);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
        const alpha = 0.03 + 0.02 * Math.sin(time * 0.002 + i * 1.5);
        grad.addColorStop(0, `rgba(140, 190, 130, ${alpha})`);
        grad.addColorStop(1, 'rgba(140, 190, 130, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(cx - w * 0.35, cy - w * 0.35, w * 0.7, w * 0.7);
      }
      ctx.restore();
    }

    function drawFireflies() {
      fireflies.forEach((f) => {
        f.x += f.vx + Math.sin(time * 0.01 + f.phase) * 0.05;
        f.y += f.vy + Math.cos(time * 0.008 + f.phase * 1.3) * 0.05;

        if (f.x < -20 || f.x > canvas.width + 20 || f.y < canvas.height * 0.2 || f.y > canvas.height + 20) {
          f.x = Math.random() * canvas.width;
          f.y = canvas.height * 0.3 + Math.random() * canvas.height * 0.5;
        }

        const twinkle = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(time * 0.02 + f.phase));
        ctx.save();
        ctx.globalAlpha = Math.max(0, twinkle * 0.7);

        // Outer glow
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 5);
        grad.addColorStop(0, 'rgba(200, 255, 160, 0.35)');
        grad.addColorStop(0.4, 'rgba(160, 230, 120, 0.12)');
        grad.addColorStop(1, 'rgba(160, 230, 120, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 255, 180, 0.95)';
        ctx.fill();

        ctx.restore();
      });
    }

    function drawVignette() {
      const w = canvas.width;
      const h = canvas.height;
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, h * 0.3, w * 0.5, h * 0.5, h * 1.0);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.02)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    function animate() {
      try {
        time++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawSky();
        drawStars();
        drawMoon();
        drawMountains();
        drawMist();
        drawTrees();
        drawGround();
        drawFireflies();
        drawVignette();

        animId = requestAnimationFrame(animate);
      } catch (e) {
        console.error('AnimatedBackground error:', e);
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
