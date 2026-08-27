'use client';

import Link from 'next/link';
import {
  Shield,
  FolderGit2,
  Users,
  Calendar,
  FileCode2,
  Trophy,
  Terminal,
  Search,
  Code,
} from 'lucide-react';
import { clubStats } from '@/lib/data';

export function Footer() {
  return (
    <footer
      id="app-main-footer"
      className="border-t border-[#30363d] bg-[#161b22] text-[#8b949e] font-mono text-xs py-8 sm:py-12 mt-auto"
    >
      <div className="container max-w-7xl px-4 space-y-8">
        {/* Main Footer Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-6 border-b border-[#30363d]/60">
          {/* Col 1: Protocol Core */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Protocol Core</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <span>Overview / Mainnet</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <span>Repositories ({clubStats.repositories})</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                  className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5 text-left"
                >
                  <Search className="w-3 h-3 text-[#58a6ff]" />
                  <span>Command Terminal (⌘K)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Operatives & Ranks */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#a371f7]" />
              <span>Operatives</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/members" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <span>Anonymous Operatives ({clubStats.activeOperatives})</span>
                </Link>
              </li>
              <li>
                <Link href="/wall-of-fame" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <Trophy className="w-3 h-3 text-[#e3b341]" />
                  <span>Wall of Fame</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operations & Logs */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#f78166]" />
              <span>Intelligence</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/events" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <span>Operations & CTFs</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#58a6ff] hover:underline flex items-center gap-1.5">
                  <FileCode2 className="w-3 h-3 text-[#e3b341]" />
                  <span>Field Logs (Gists)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Join Protocol */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#3fb950]" />
              <span>Membership</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#238636]/20 border border-[#3fb950]/40 text-[#3fb950] font-semibold hover:bg-[#238636]/30 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Initiate Protocol &gt;</span>
                </Link>
              </li>
              <li className="text-[11px] text-[#8b949e]">
                Pseudonymous cryptographic validation required.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & System Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-[#21262d] border border-[#30363d] text-[#58a6ff]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Team7 Syndicate</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#21262d] text-[#3fb950] border border-[#30363d]">
                  mainnet v3.2
                </span>
              </div>
              <p className="text-[11px] text-[#8b949e]">
                © {new Date().getFullYear()} Team7 Dev Club. Pseudonymous & Sovereign.
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-md bg-[#0d1117] border border-[#30363d]">
            <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse" />
            <span className="text-[#c9d1d9]">All Nodes Operational</span>
          </div>
        </div>

        {/* Security disclaimer & GPG note */}
        <div className="pt-4 border-t border-[#30363d]/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#8b949e] gap-2">
          <div>
            Built with Next.js 15, Three.js Hyperspeed engine, and GitHub Primer aesthetics.
          </div>
          <div className="flex items-center gap-3">
            <span>GPG Keyring Verified</span>
            <span>•</span>
            <span>Zero Tracking</span>
            <span>•</span>
            <span>Decentralized Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
