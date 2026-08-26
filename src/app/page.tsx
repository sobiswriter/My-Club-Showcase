import Link from 'next/link';
import {
  FolderGit2,
  Users,
  Star,
  GitFork,
  ArrowRight,
  Shield,
  Zap,
  Code2,
  Lock,
  Cpu,
  ChevronRight,
  GitCommit,
  Terminal,
  ShieldAlert,
  Layers,
  Key,
} from 'lucide-react';
import { HyperspeedHero } from '@/components/hyperspeed-hero';
import { CyberAvatar } from '@/components/cyber-avatar';
import { TerminalJoinSnippet } from '@/components/terminal-join-snippet';
import { members, projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const featuredOperatives = members.slice(0, 4);
  const featuredProjects = projects.slice(0, 3);

  const pillars = [
    {
      id: 'crypto',
      number: '01',
      title: 'Zero-Knowledge Cryptography',
      desc: 'Developing recursive zk-SNARK verifiers, threshold GPG keyrings, and homomorphic state validation protocols.',
      icon: Lock,
      color: 'text-[#58a6ff]',
    },
    {
      id: 'kernel',
      number: '02',
      title: 'Kernel-Level Telemetry',
      desc: 'High-performance Rust eBPF probes, low-latency micro-daemons, memory-safe kernels, and zero-day mitigations.',
      icon: Cpu,
      color: 'text-[#3fb950]',
    },
    {
      id: 'shaders',
      number: '03',
      title: 'Kinetic Visual Computing',
      desc: 'Relativistic Three.js physics engines, GPU compute shaders, WebGL raymarching, and real-time kinetic telemetry.',
      icon: Zap,
      color: 'text-[#a371f7]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* 1. Interactive Hyperspeed Canvas & Hero */}
      <HyperspeedHero />

      {/* Main Content Area */}
      <div className="container max-w-6xl px-4 py-14 space-y-16 mx-auto">
        {/* 2. Core Syndicate Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-[#58a6ff] uppercase tracking-wider">
              Architecture & Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              Engineering Disciplines
            </h2>
            <p className="text-sm text-[#8b949e] font-sans mt-2">
              Three specialized research wings pushing high-velocity compute and distributed security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                        <Icon className={`w-5 h-5 ${pillar.color}`} />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#8b949e]">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-mono group-hover:text-[#58a6ff] transition-colors mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#8b949e] leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#30363d]/50 flex items-center justify-end">
                    <Link
                      href="/projects"
                      className="text-xs font-mono text-[#58a6ff] hover:underline flex items-center gap-1"
                    >
                      View Repos <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Anonymous Codename Operatives Spotlight */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#a371f7]" />
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Anonymous Operatives
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                Pseudonymous squad members with cryptographically signed keyrings.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-mono text-xs bg-[#161b22] border-[#30363d] hover:bg-[#21262d] text-[#58a6ff]"
            >
              <Link href="/members">
                View All {members.length} Operatives <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredOperatives.map((member) => (
              <div
                key={member.id}
                className="group relative p-5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <CyberAvatar seed={member.avatarSeed} size={48} glow={member.status === 'ACTIVE'} />
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono border-[#30363d] ${
                        member.clearanceLevel.includes('LEVEL 5')
                          ? 'text-[#f78166] bg-[#f78166]/10'
                          : 'text-[#58a6ff] bg-[#58a6ff]/10'
                      }`}
                    >
                      {member.clearanceLevel.split(' - ')[0]}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-white font-mono group-hover:text-[#58a6ff] transition-colors">
                    {member.codename}
                  </h3>
                  <div className="text-[11px] font-mono text-[#8b949e]">
                    callsign: &quot;{member.callsign}&quot;
                  </div>

                  <p className="text-xs text-[#8b949e] mt-2.5 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
                  <div className="flex items-center gap-1 text-[#e3b341]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{member.points} XP</span>
                  </div>
                  <Link
                    href={`/members?search=${encodeURIComponent(member.codename)}`}
                    className="text-[#58a6ff] hover:underline text-[11px] flex items-center gap-0.5"
                  >
                    Dossier <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Featured GitHub Repositories */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#3fb950]" />
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Featured Repositories
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                Open-source systems, cryptographic suites, and kinetic engines.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-mono text-xs bg-[#161b22] border-[#30363d] hover:bg-[#21262d] text-[#58a6ff]"
            >
              <Link href="/projects">
                Browse All ({projects.length}) <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProjects.map((repo) => (
              <div
                key={repo.id}
                className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-[#8b949e]" />
                      <Link
                        href="/projects"
                        className="text-sm font-bold text-[#58a6ff] hover:underline font-mono"
                      >
                        {repo.name}
                      </Link>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-[#30363d] text-[#3fb950]">
                      {repo.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-[#8b949e] leading-relaxed mb-4 line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#e3b341]" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Syndicate Manifesto & Genesis Protocol */}
        <div id="manifesto-section" className="space-y-6 pt-4 border-t border-[#30363d]/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#f78166]" />
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Syndicate Manifesto
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                Core philosophical tenets and cryptographic governance principles.
              </p>
            </div>

            <Badge
              variant="outline"
              className="font-mono text-xs border-[#30363d] text-[#3fb950] bg-[#238636]/10 self-start sm:self-auto"
            >
              GENESIS PROTOCOL v1.0
            </Badge>
          </div>

          {/* Genesis Commit Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#161b22] border border-[#30363d] font-mono text-xs space-y-2.5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#30363d] pb-2 text-[#8b949e] gap-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <GitCommit className="w-4 h-4 text-[#a371f7]" />
                <span>commit 0000000000000000000000000000000007e4a701</span>
              </div>
              <span className="text-[#3fb950] text-[11px]">GPG: VALID [4F92...B39A]</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Author: <strong className="text-[#58a6ff]">ZERO-DAY & CIPHER-07</strong> &lt;architects@team7.mesh&gt;<br />
              <span className="text-white font-semibold">genesis:</span> initialize decentralized syndicate and release open source core
            </p>
          </div>

          {/* 3 Core Tenets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">01 // Pseudonymous Merit</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                We judge developers solely by code purity, cryptographic correctness, and architectural elegance — never by real-world identity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#3fb950]">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">02 // Low-Level Craft</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                From eBPF kernel probes to Three.js GPU shaders, we dive deep into raw hardware, memory layouts, and relativistic physics.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#a371f7]">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">03 // Open Sovereignty</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                We open-source our repositories, verify code with zero-knowledge proofs, and foster an autonomous global hacker collective.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Terminal CLI Join Protocol Banner */}
        <TerminalJoinSnippet />
      </div>
    </div>
  );
}
