'use client';

import React from 'react';

interface CyberAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export function CyberAvatar({ seed, size = 48, className = '', glow = false }: CyberAvatarProps) {
  // Deterministic color & pattern generation from string seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 60) % 360;
  const hue3 = (hue1 + 180) % 360;

  // Generate 4x4 matrix grid pattern
  const grid: boolean[] = [];
  for (let i = 0; i < 16; i++) {
    const bit = (Math.abs(hash >> i) % 2) === 1;
    grid.push(bit);
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg overflow-hidden border border-border/80 bg-[#0d1117] select-none ${glow ? 'shadow-md shadow-primary/30' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue1}, 80%, 55%)`} stopOpacity="0.8" />
            <stop offset="50%" stopColor={`hsl(${hue2}, 90%, 45%)`} stopOpacity="0.4" />
            <stop offset="100%" stopColor={`hsl(${hue3}, 85%, 60%)`} stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id={`rad-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue1}, 95%, 65%)`} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="48" height="48" fill="#0d1117" />
        <rect width="48" height="48" fill={`url(#rad-${seed})`} />

        {/* Matrix grid cells */}
        {grid.map((active, idx) => {
          const row = Math.floor(idx / 4);
          const col = idx % 4;
          const x = 10 + col * 7;
          const y = 10 + row * 7;
          
          if (!active && idx % 3 !== 0) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width="5"
              height="5"
              rx="1"
              fill={active ? `url(#grad-${seed})` : `hsl(${hue2}, 70%, 40%)`}
              opacity={active ? 0.95 : 0.35}
            />
          );
        })}

        {/* Cyber overlay elements */}
        <circle cx="24" cy="24" r="18" stroke={`hsl(${hue1}, 80%, 60%)`} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <path d="M6 12 L6 6 L12 6" stroke={`hsl(${hue1}, 90%, 65%)`} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M42 12 L42 6 L36 6" stroke={`hsl(${hue1}, 90%, 65%)`} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 36 L6 42 L12 42" stroke={`hsl(${hue1}, 90%, 65%)`} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M42 36 L42 42 L36 42" stroke={`hsl(${hue1}, 90%, 65%)`} strokeWidth="1.5" strokeLinecap="round" />
        
        <text
          x="24"
          y="45"
          textAnchor="middle"
          fontSize="5"
          fontFamily="monospace"
          fill={`hsl(${hue1}, 80%, 75%)`}
          opacity="0.8"
        >
          {seed.slice(0, 4).toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
