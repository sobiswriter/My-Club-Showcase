import Link from 'next/link';
import { Shield, GitBranch, Terminal, ExternalLink, Lock } from 'lucide-react';
import { clubStats } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-[#30363d] bg-[#161b22] text-[#8b949e] font-mono text-xs py-10 mt-auto">
      <div className="container max-w-7xl px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

          {/* Quick GitHub-style links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <Link href="/" className="hover:text-[#58a6ff] hover:underline">
              Overview
            </Link>
            <Link href="/projects" className="hover:text-[#58a6ff] hover:underline">
              Repositories ({clubStats.repositories})
            </Link>
            <Link href="/members" className="hover:text-[#58a6ff] hover:underline">
              Anonymous Operatives ({clubStats.activeOperatives})
            </Link>
            <Link href="/events" className="hover:text-[#58a6ff] hover:underline">
              Operations & CTFs
            </Link>
            <Link href="/blog" className="hover:text-[#58a6ff] hover:underline">
              Field Logs
            </Link>
            <Link href="/wall-of-fame" className="hover:text-[#58a6ff] hover:underline">
              Wall of Fame
            </Link>
            <Link href="/join" className="text-[#3fb950] font-semibold hover:underline">
              Initiate Protocol
            </Link>
          </nav>

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
