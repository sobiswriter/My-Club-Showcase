import Link from 'next/link';
import {
  Shield,
  Terminal,
  GitCommit,
  Lock,
  Users,
  CheckCircle2,
  Zap,
  Key,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { members } from '@/lib/data';

export default function AboutPage() {
  const founders = members.filter((m) => m.clearanceLevel.includes('LEVEL 5'));

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-5xl px-4 space-y-8 font-sans">
        {/* Header Title Section */}
        <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <Shield className="w-6 h-6 text-[#58a6ff]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Syndicate Manifesto & Genesis Lore
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  The origins, cryptographic protocols, and organizational principles governing Team7.
                </p>
              </div>
            </div>
          </div>

          <Badge variant="outline" className="font-mono text-xs border-[#30363d] text-[#3fb950] bg-[#238636]/10 self-start md:self-auto">
            GENESIS EPOCH 1.0
          </Badge>
        </div>

        {/* Genesis Commit Log */}
        <div className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] font-mono text-xs space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-[#8b949e]">
            <div className="flex items-center gap-2 text-white font-bold">
              <GitCommit className="w-4 h-4 text-[#a371f7]" />
              <span>commit 0000000000000000000000000000000007e4a701</span>
            </div>
            <span className="text-[#3fb950]">GPG Signature: VALID [4F92...B39A]</span>
          </div>
          <p className="text-[#c9d1d9] leading-relaxed">
            Author: <strong className="text-[#58a6ff]">ZERO-DAY & CIPHER-07</strong> &lt;architects@team7.mesh&gt;<br />
            Date: &nbsp; Sun Jan 07 00:00:00 2024 +0000<br /><br />
            <span className="text-white font-bold">genesis: initialize decentralized syndicate and release open source core</span>
          </p>
        </div>

        {/* Section 1: The Core Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">01 // Pseudonymous Merit</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              We judge developers solely by code purity, cryptographic correctness, and architectural elegance — never by real-world identity or prestige.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#3fb950]">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">02 // Low-Level Craft</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              From eBPF kernel probes to Three.js GPU shaders, we dive deep into raw hardware, memory layouts, assembly, and relativistic physics.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#a371f7]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">03 // Open Collaboration</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              We teach what we learn, open-source our repositories, and run global workshops to elevate the next generation of systems builders.
            </p>
          </div>
        </div>

        {/* Section 2: Clearance Tier Hierarchy */}
        <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-6">
          <div className="flex items-center gap-2 font-mono">
            <Layers className="w-5 h-5 text-[#f78166]" />
            <h2 className="text-lg font-bold text-white">Clearance Hierarchy & Privileges</h2>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-md bg-[#0d1117] border border-[#f78166]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#f78166] text-[#f78166] bg-[#f78166]/10">
                    LEVEL 5 - ARCHITECT
                  </Badge>
                  <span className="font-bold text-white">Root Governance & Protocol Lead</span>
                </div>
                <p className="text-xs text-[#8b949e] font-sans mt-1.5">
                  Full control over mainnet deployments, repository merge rights, cryptographic key generation, and syndicate direction.
                </p>
              </div>
              <span className="text-[#f78166] font-bold shrink-0">Founding Council</span>
            </div>

            <div className="p-4 rounded-md bg-[#0d1117] border border-[#58a6ff]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#58a6ff] text-[#58a6ff] bg-[#58a6ff]/10">
                    LEVEL 4 - OPERATIVE
                  </Badge>
                  <span className="font-bold text-white">Core System Engineer & CTF Lead</span>
                </div>
                <p className="text-xs text-[#8b949e] font-sans mt-1.5">
                  Direct commit rights to major submodules, workshop mentoring, bug bounty arbitration, and research authoring.
                </p>
              </div>
              <span className="text-[#58a6ff] font-bold shrink-0">Senior Operatives</span>
            </div>

            <div className="p-4 rounded-md bg-[#0d1117] border border-[#3fb950]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#3fb950] text-[#3fb950] bg-[#3fb950]/10">
                    LEVEL 3 - SENTINEL
                  </Badge>
                  <span className="font-bold text-white">Active Contributor & Researcher</span>
                </div>
                <p className="text-xs text-[#8b949e] font-sans mt-1.5">
                  Submits pull requests, claims open bounties, participates in weekly CTF battles, and attends private briefings.
                </p>
              </div>
              <span className="text-[#3fb950] font-bold shrink-0">Verified Members</span>
            </div>

            <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#30363d] text-[#8b949e]">
                    LEVEL 2 - APPRENTICE / INITIATE
                  </Badge>
                  <span className="font-bold text-white">Applicant & Hackathon Participant</span>
                </div>
                <p className="text-xs text-[#8b949e] font-sans mt-1.5">
                  Access to public workshops, open codebases, and initiation trials.
                </p>
              </div>
              <span className="text-[#8b949e] shrink-0">Open Admission</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 rounded-lg bg-gradient-to-r from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#238636]/60 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white font-mono">Ready to enter the syndicate?</h3>
            <p className="text-xs text-[#8b949e] mt-1 font-sans">
              Choose your codename, solve the cipher trial, and join our encrypted war room.
            </p>
          </div>

          <Button asChild size="lg" className="bg-[#238636] hover:bg-[#2ea043] font-mono text-xs text-white">
            <Link href="/join">
              Initiate Application Protocol <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
