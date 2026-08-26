'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Hyperspeed from '@/components/hyperspeed';
import { hyperspeedPresets } from '@/lib/hyperspeed-presets';
import TextType from '@/components/text-type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FolderGit2,
  Users,
  Terminal,
  ArrowRight,
  Zap,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { clubStats } from '@/lib/data';

export function HyperspeedHero() {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof hyperspeedPresets>('akira');
  const [isWarping, setIsWarping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard spacebar hold listener for hyperspeed warp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsWarping(true);
        // Dispatch synthetic mousedown to lights container
        const lights = document.getElementById('lights');
        if (lights) {
          lights.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        setIsWarping(false);
        const lights = document.getElementById('lights');
        if (lights) {
          lights.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      heroContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const presetOptions = [
    { key: 'akira', label: 'Akira' },
    { key: 'one', label: 'Cyber' },
    { key: 'two', label: 'Hyperdrive' },
    { key: 'three', label: 'Neon' },
    { key: 'six', label: 'Deep' },
  ] as const;

  return (
    <div
      ref={heroContainerRef}
      id="hyperspeed-hero-stage"
      className={`relative isolate overflow-hidden bg-[#0d1117] transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'min-h-[86vh] flex flex-col justify-between border-b border-[#30363d]'
      }`}
    >
      {/* Background Hyperspeed Canvas */}
      <div
        id="hyperspeed-canvas-wrapper"
        className="absolute inset-0 z-0 opacity-90 cursor-crosshair"
        onMouseDown={() => setIsWarping(true)}
        onMouseUp={() => setIsWarping(false)}
        onTouchStart={() => setIsWarping(true)}
        onTouchEnd={() => setIsWarping(false)}
      >
        <Hyperspeed effectOptions={hyperspeedPresets[selectedPreset] || hyperspeedPresets.akira} />
      </div>

      {/* Subtle vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#0d1117_100%] pointer-events-none z-10 opacity-60" />

      {/* Top Floating Status Pill */}
      <div className="relative z-20 w-full pt-8 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#161b22]/80 border border-[#30363d] backdrop-blur-md shadow-sm pointer-events-auto">
            <span className="flex h-2 w-2 rounded-full bg-[#3fb950] animate-ping" />
            <span className="text-xs font-mono text-[#8b949e]">
              <strong className="text-white">TEAM7 SYNDICATE</strong>
              <span className="text-[#30363d] mx-2">|</span>
              <span className="text-[#3fb950]">CLUSTER MAINNET</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#8b949e] pointer-events-auto">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161b22]/70 border border-[#30363d] backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>{clubStats.activeOperatives} Operatives Online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Minimalist Typography Overlay */}
      <div className="relative z-20 container max-w-4xl px-4 py-12 mx-auto text-center pointer-events-none flex flex-col items-center justify-center my-auto">
        {/* Dynamic Typing Title */}
        <div className="min-h-[90px] sm:min-h-[120px] flex items-center justify-center">
          <TextType
            as="h1"
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans drop-shadow-md"
            text={[
              "Relativistic Code Systems.",
              "Anonymous. Autonomous.",
              "Zero-Knowledge Engineering.",
              "Welcome to Team7.",
            ]}
            typingSpeed={70}
            pauseDuration={2200}
            showCursor={true}
            loop={true}
            cursorCharacter="▋"
          />
        </div>

        <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-[#c9d1d9] font-sans leading-relaxed drop-shadow">
          An underground collective of anonymous engineers building cryptographic primitives, kernel systems, and high-velocity WebGL shaders.
        </p>

        {/* Minimal Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <Button
            id="hero-explore-repos-btn"
            asChild
            size="lg"
            className="h-11 px-6 font-mono font-semibold bg-[#238636] hover:bg-[#2ea043] text-white shadow-lg shadow-[#238636]/30 border border-[#3fb950]/30 transition-all hover:scale-[1.02]"
          >
            <Link href="/projects">
              <FolderGit2 className="mr-2 h-4 w-4" />
              Explore Repositories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            id="hero-view-operatives-btn"
            asChild
            variant="outline"
            size="lg"
            className="h-11 px-6 font-mono bg-[#161b22]/90 hover:bg-[#21262d] text-[#c9d1d9] border-[#30363d] backdrop-blur-md"
          >
            <Link href="/members">
              <Users className="mr-2 h-4 w-4 text-[#58a6ff]" />
              Codename Operatives
            </Link>
          </Button>

          <Button
            id="hero-join-btn"
            asChild
            variant="ghost"
            size="lg"
            className="h-11 px-4 font-mono text-[#58a6ff] hover:text-[#79c0ff] hover:bg-[#58a6ff]/10"
          >
            <Link href="/join">
              <Terminal className="mr-2 h-4 w-4" />
              Join Syndicate
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom Floating Warp HUD & Speed Controls */}
      <div className="relative z-20 w-full pb-6 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-xl bg-[#161b22]/85 border border-[#30363d] backdrop-blur-md shadow-xl pointer-events-auto">
          {/* Preset Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-mono text-[#8b949e] px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#e3b341]" />
              Theme:
            </span>
            {presetOptions.map(({ key, label }) => (
              <button
                key={key}
                id={`preset-btn-${key}`}
                onClick={() => setSelectedPreset(key as keyof typeof hyperspeedPresets)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  selectedPreset === key
                    ? 'bg-[#58a6ff] text-black font-semibold shadow-sm'
                    : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Warp Interaction Prompt & Fullscreen */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono select-none transition-colors ${
                isWarping ? 'bg-[#238636]/20 text-[#3fb950] border border-[#3fb950]/40' : 'text-[#8b949e]'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isWarping ? 'text-[#3fb950] animate-bounce' : 'text-[#e3b341]'}`} />
              <span>
                {isWarping ? (
                  <strong className="text-[#3fb950]">WARP ACTIVE!</strong>
                ) : (
                  'Hold click / Space to warp'
                )}
              </span>
            </div>

            <button
              id="hyperspeed-fullscreen-toggle"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Hyperspeed Mode'}
              className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
