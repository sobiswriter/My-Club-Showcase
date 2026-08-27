'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  GitFork,
  Search,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { CommandPalette } from '@/components/command-palette';
import { GitHubSubnav } from '@/components/github-subnav';

function Team7Logo() {
  return (
    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#58a6ff]/40 text-white hover:border-[#58a6ff] hover:shadow-[0_0_16px_rgba(88,166,255,0.4)] transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(88,166,255,0.25),transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#58a6ff]/30 via-[#3fb950]/20 to-[#a371f7]/30 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <svg
        className="relative w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_8px_rgba(88,166,255,0.3)]"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="t7-mesh" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#58a6ff" />
            <stop offset="0.5" stopColor="#79c0ff" />
            <stop offset="1" stopColor="#3fb950" />
          </linearGradient>
          <linearGradient id="t7-accent" x1="6" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f78166" />
            <stop offset="0.6" stopColor="#e3b341" />
            <stop offset="1" stopColor="#3fb950" />
          </linearGradient>
        </defs>

        <path
          d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z"
          stroke="url(#t7-mesh)"
          strokeWidth="1.75"
          strokeLinejoin="round"
          className="opacity-90"
        />

        <path
          d="M16 3V9M27 9.5L21.5 12.5M27 22.5L21.5 19.5M16 29V23M5 22.5L10.5 19.5M5 9.5L10.5 12.5"
          stroke="#58a6ff"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        <path
          d="M10 10.5H22L15.5 22.5H18"
          stroke="url(#t7-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="16" cy="16" r="1.5" fill="#3fb950" className="animate-pulse" />
        <circle cx="22" cy="10.5" r="1" fill="#f78166" />
      </svg>
    </div>
  );
}

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(384);
  const [hasStarred, setHasStarred] = useState(false);

  const toggleStar = () => {
    if (hasStarred) {
      setStarsCount((prev) => prev - 1);
      setHasStarred(false);
    } else {
      setStarsCount((prev) => prev + 1);
      setHasStarred(true);
    }
  };

  return (
    <>
      <header
        id="app-main-header"
        className="sticky top-0 z-50 w-full border-b border-[#30363d]/80 bg-[#0d1117]/90 backdrop-blur-xl text-[#c9d1d9] transition-colors"
      >
        <div className="container max-w-7xl flex h-14 items-center justify-between px-3 sm:px-6">
          {/* Left: Brand Logo & Indicator */}
          <div className="flex items-center gap-3">
            <Link
              id="header-brand-link"
              href="/"
              className="flex items-center gap-2.5 py-1 px-1.5 -ml-1.5 rounded-lg hover:bg-[#161b22]/70 border border-transparent hover:border-[#30363d] transition-all group"
            >
              <Team7Logo />
              <div className="flex items-center text-sm font-mono tracking-tight select-none">
                <span className="text-[#58a6ff] group-hover:text-[#79c0ff] font-semibold transition-colors">
                  team7
                </span>
                <span className="text-[#8b949e] mx-1">/</span>
                <span className="text-white font-bold tracking-wide group-hover:text-white">
                  syndicate
                </span>
                <span className="ml-2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#161b22] text-[#3fb950] border border-[#238636]/40 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  mainnet
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Interactive Search & Command Terminal */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <button
              id="header-search-btn"
              onClick={() => setCommandOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#161b22]/90 border border-[#30363d] text-xs font-mono text-[#8b949e] hover:border-[#58a6ff]/70 hover:text-[#c9d1d9] hover:bg-[#161b22] transition-all shadow-inner group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                <span className="text-[#8b949e] group-hover:text-[#c9d1d9] transition-colors">
                  Search repos, operatives or <span className="text-[#58a6ff]">/terminal</span>...
                </span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[#0d1117] text-[10px] font-mono text-[#8b949e] border border-[#30363d] group-hover:border-[#58a6ff]/40 group-hover:text-[#58a6ff] transition-colors">
                  ⌘K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Search Button (Mobile) */}
            <Button
              id="mobile-search-btn"
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 text-[#8b949e] hover:text-white hover:bg-[#161b22]"
              onClick={() => setCommandOpen(true)}
              title="Search command palette"
            >
              <Search className="h-4 w-4 text-[#58a6ff]" />
            </Button>

            {/* Star Button */}
            <button
              id="header-star-btn"
              onClick={toggleStar}
              className={`inline-flex items-center gap-1 h-8 px-2 sm:px-2.5 rounded-lg text-xs font-medium border font-mono transition-all duration-200 ${
                hasStarred
                  ? 'bg-[#e3b341]/15 text-[#e3b341] border-[#e3b341]/50 shadow-[0_0_10px_rgba(227,179,65,0.2)]'
                  : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-[#8b949e]'
              }`}
            >
              <Star
                className={`h-3.5 w-3.5 transition-transform ${
                  hasStarred ? 'fill-[#e3b341] text-[#e3b341] scale-110' : 'text-[#8b949e]'
                }`}
              />
              <span className="hidden sm:inline font-medium">{hasStarred ? 'Starred' : 'Star'}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#0d1117] text-[10px] sm:text-[11px] font-mono text-[#8b949e] border border-[#30363d]/80 ml-0.5">
                {starsCount}
              </span>
            </button>

            {/* Fork Button (Desktop) */}
            <Button
              id="header-fork-btn"
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex h-8 px-2.5 rounded-lg text-xs font-mono bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-[#8b949e] transition-all"
            >
              <Link href="/projects">
                <GitFork className="mr-1.5 h-3.5 w-3.5 text-[#8b949e]" />
                <span>Fork</span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-[#0d1117] text-[10px] text-[#8b949e] border border-[#30363d]">
                  48
                </span>
              </Link>
            </Button>

            {/* Join Button (Desktop) */}
            <Button
              id="header-cli-btn"
              asChild
              size="sm"
              className="hidden lg:inline-flex h-8 px-3 rounded-lg text-xs font-mono bg-[#238636] hover:bg-[#2ea043] text-white border border-[#3fb950]/40 shadow-sm transition-all"
            >
              <Link href="/join">
                <Terminal className="mr-1.5 h-3.5 w-3.5" />
                <span>Join</span>
              </Link>
            </Button>

            {/* Theme Toggle (Light & Dark) */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* GitHub Repository Tabs Subnavigation (Desktop Only) */}
      <GitHubSubnav />

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}

