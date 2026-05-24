'use client';

import { useEffect, useRef } from "react";

export default function LeafParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves = [
      "M8 0l2.5 6L12 4l-2 4 4 3-5 1 1 6-3-5-3 5 1-6-5-1 4-3-2-4 1.5 2z",
      "M6 0l1.5 4L10 2l-1.5 3 3 2L7 7.5 8 12l-3-3.5L2 12l1-4.5L0 5l3-2L1.5 2 4 4z",
      "M10 0l2 4 3-1-2 3.5 3.5 2-4 .5 1 5-3.5-3-3.5 3 1-5-4-.5 3.5-2L5 3l3 1z",
    ];

    const leafElements: HTMLDivElement[] = [];

    for (let i = 0; i < 8; i++) {
      const leaf = document.createElement('div');
      leaf.innerHTML = `<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="${leaves[i % leaves.length]}" fill="currentColor"/>
      </svg>`;
      const svg = leaf.firstElementChild as SVGElement;
      const size = 10 + Math.random() * 16;
      svg.style.cssText = `width:${size}px;height:${size}px;`;
      leaf.style.cssText = `
        position: absolute;
        color: rgba(34,197,94,${0.1 + Math.random() * 0.2});
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: -5%;
        animation: leaf-drift ${10 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${10 + Math.random() * 15}s;
        opacity: 0;
        z-index: 0;
      `;
      container.appendChild(leaf);
      leafElements.push(leaf);
    }

    return () => {
      leafElements.forEach(el => el.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
