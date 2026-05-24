'use client';

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  "https://videos.pexels.com/video-files/2835674/2835674-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/2822934/2822934-uhd_2560_1440_30fps.mp4",
];

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [useImage, setUseImage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setLoaded(true);
    const onError = () => {
      if (srcIndex < VIDEOS.length - 1) {
        setSrcIndex(prev => prev + 1);
      } else {
        setUseImage(true);
      }
    };

    v.addEventListener('loadeddata', onLoaded);
    v.addEventListener('error', onError);

    v.play().catch(() => {
      setTimeout(() => v.play().catch(() => setUseImage(true)), 1000);
    });

    return () => {
      v.removeEventListener('loadeddata', onLoaded);
      v.removeEventListener('error', onError);
    };
  }, [srcIndex]);

  if (useImage) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
            filter: 'brightness(0.6)',
          }}
        />
        {/* Animated light rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDuration: '8s' }} />
        </div>
        {/* Floating particles */}
        <ParticleOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      {/* Image always shown until video loads */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
          filter: 'brightness(0.6)',
        }}
      />
      {/* Animated rays on image */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDuration: '8s' }} />
      </div>
      {/* Video */}
      <video
        ref={videoRef}
        key={srcIndex}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: 'brightness(0.65) saturate(1.05)' }}
      >
        <source src={VIDEOS[srcIndex]} type="video/mp4" />
      </video>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
    </div>
  );
}

function ParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.2,
        size: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.2,
        speed: 0.005 + Math.random() * 0.01,
      });
    }

    let t = 0;
    function draw() {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx + Math.sin(t * p.speed + p.x * 0.01) * 0.1;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(t * p.speed * 2 + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 180, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
