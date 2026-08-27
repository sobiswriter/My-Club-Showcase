'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Hyperspeed from '@/components/hyperspeed';
import { hyperspeedPresets } from '@/lib/hyperspeed-presets';
import { SplitFlapText } from '@/components/split-flap-text';
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
  Search,
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
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen'
          : 'min-h-[calc(100dvh-3.5rem)] md:min-h-[86vh] flex flex-col justify-between border-b border-[#30363d]'
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
      <div className="relative z-20 w-full pt-4 sm:pt-8 px-3 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#161b22]/90 border border-[#30363d] backdrop-blur-md shadow-sm pointer-events-auto">
            <span className="flex h-2 w-2 rounded-full bg-[#3fb950] animate-ping" />
            <span className="text-[11px] sm:text-xs font-mono text-[#8b949e]">
              <strong className="text-white">TEAM7 SYNDICATE</strong>
              <span className="text-[#30363d] mx-1.5 sm:mx-2">|</span>
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
      <div className="relative z-20 container max-w-4xl px-3 sm:px-4 py-8 sm:py-12 mx-auto text-center pointer-events-none flex flex-col items-center justify-center my-auto">
        {/* Departure Board Split-Flap Title (Strictly 2 Words Each) */}
        <div className="min-h-[60px] sm:min-h-[110px] w-full max-w-full flex items-center justify-center overflow-hidden pointer-events-auto px-1">
          <SplitFlapText
            words={[
              'TEAM7 SYNDICATE',
              'ZK ENGINEERING',
              'SYSTEMS ONLINE',
              'QUANTUM SECURE',
              'HYPERSPEED NODE',
              'ANONYMOUS CODER',
              'CYBER PROTOCOL'
            ]}
            flipDuration={0.1}
            stagger={0.04}
            cycleDelay={2200}
            charset="alphanumeric"
            flipsPerChar={6}
            tileColor="#161b22"
            textColor="#f0f6fc"
            tileRadius={4}
            gap="clamp(1px, 0.6vw, 4px)"
            fontSize="clamp(13px, 3.5vw, 42px)"
            loop
            padTo={15}
            className="shadow-2xl select-none max-w-full"
          />
        </div>

        <p className="mt-2.5 sm:mt-4 max-w-lg mx-auto text-xs sm:text-sm text-[#8b949e] font-mono leading-relaxed drop-shadow">
          Autonomous collective building zero-knowledge primitives, kernel probes, and GPU shaders.
        </p>

        {/* Mobile touch hint to experience hyperspeed warp */}
        <div className="md:hidden mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b22]/90 border border-[#30363d] text-[11px] font-mono text-[#58a6ff]">
          <Zap className="w-3.5 h-3.5 text-[#3fb950] animate-pulse" />
          <span>Tap & Hold canvas to accelerate warp</span>
        </div>

        {/* Minimal Actions - Restored clean, spacious layout */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <Button
            id="hero-explore-repos-btn"
            asChild
            size="lg"
            className="h-11 px-6 font-mono text-xs sm:text-sm font-semibold bg-[#238636] hover:bg-[#2ea043] text-white shadow-lg shadow-[#238636]/30 border border-[#3fb950]/30 transition-all hover:scale-[1.02]"
          >
            <Link href="/projects">
              <FolderGit2 className="mr-2 h-4 w-4" />
              <span>Explore Repositories</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            id="hero-view-operatives-btn"
            asChild
            variant="outline"
            size="lg"
            className="h-11 px-5 font-mono text-xs sm:text-sm bg-[#161b22]/90 hover:bg-[#21262d] text-[#c9d1d9] border-[#30363d] backdrop-blur-md"
          >
            <Link href="/members">
              <Users className="mr-2 h-4 w-4 text-[#58a6ff]" />
              <span>Codename Operatives</span>
            </Link>
          </Button>

          <Button
            id="hero-quick-search-btn"
            type="button"
            variant="outline"
            size="lg"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="h-11 px-3.5 bg-[#161b22]/90 hover:bg-[#21262d] text-[#8b949e] hover:text-white border-[#30363d] backdrop-blur-md font-mono text-xs flex items-center gap-1.5 shadow-sm"
            title="Search command palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="text-xs font-semibold text-[#c9d1d9]">⌘K</span>
          </Button>

          <Button
            id="hero-join-btn"
            asChild
            variant="ghost"
            size="lg"
            className="hidden sm:inline-flex h-11 px-4 font-mono text-xs sm:text-sm text-[#58a6ff] hover:text-[#79c0ff] hover:bg-[#58a6ff]/10"
          >
            <Link href="/join">
              <Terminal className="mr-2 h-4 w-4" />
              Join Syndicate
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom Floating Warp HUD & Speed Controls */}
      <div className="relative z-20 w-full pb-3 sm:pb-6 px-2.5 sm:px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 p-2 sm:p-2.5 rounded-xl bg-[#161b22]/95 border border-[#30363d] backdrop-blur-md shadow-xl pointer-events-auto">
          {/* Preset Selector */}
          <div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-start gap-1 py-0.5">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#8b949e] px-1 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-[#e3b341]" />
              Theme:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {presetOptions.map(({ key, label }) => (
                <button
                  key={key}
                  id={`preset-btn-${key}`}
                  onClick={() => setSelectedPreset(key as keyof typeof hyperspeedPresets)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono transition-all shrink-0 ${
                    selectedPreset === key
                      ? 'bg-[#58a6ff] text-black font-semibold shadow-sm'
                      : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Warp Interaction Prompt & Fullscreen */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-[#30363d]/60">
            <button
              type="button"
              onMouseDown={() => setIsWarping(true)}
              onMouseUp={() => setIsWarping(false)}
              onTouchStart={() => setIsWarping(true)}
              onTouchEnd={() => setIsWarping(false)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono select-none transition-colors border ${
                isWarping
                  ? 'bg-[#238636]/30 text-[#3fb950] border-[#3fb950]/50'
                  : 'bg-[#0d1117]/60 text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isWarping ? 'text-[#3fb950] animate-bounce' : 'text-[#e3b341]'}`} />
              <span>
                {isWarping ? (
                  <strong className="text-[#3fb950]">WARP ACTIVE</strong>
                ) : (
                  'Hold to Warp'
                )}
              </span>
            </button>

            <button
              id="hyperspeed-fullscreen-toggle"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Hyperspeed Mode'}
              className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d] border border-[#30363d] sm:border-transparent transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
