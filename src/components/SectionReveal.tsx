'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export default function SectionReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  const animClass = visible
    ? direction === 'left' ? 'animate-reveal-left' : direction === 'right' ? 'animate-reveal-right' : 'animate-reveal-up'
    : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function StaggerReveal({
  children,
  className = '',
  count = 1,
  baseDelay = 0,
  staggerMs = 120
}: SectionRevealProps & { count?: number; baseDelay?: number; staggerMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className="inline-block animate-reveal-up"
              style={{ animationDelay: `${baseDelay + i * staggerMs}ms` }}
            >
              {children}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
