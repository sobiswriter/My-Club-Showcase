'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Shield,
  Users,
  Search,
  Key,
  Copy,
  Check,
  Zap,
  Lock,
  GitCommit,
  CheckCircle2,
  ExternalLink,
  Terminal,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import { members, Member } from '@/lib/data';
import { CyberAvatar } from '@/components/cyber-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function MembersContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedClearance, setSelectedClearance] = useState<string>('ALL');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [activeDossier, setActiveDossier] = useState<Member | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyGpg = (fingerprint: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fingerprint);
    setCopiedKey(fingerprint);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.gpgFingerprint.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClearance =
        selectedClearance === 'ALL' ||
        (selectedClearance === 'L5' && m.clearanceLevel.includes('LEVEL 5')) ||
        (selectedClearance === 'L4' && m.clearanceLevel.includes('LEVEL 4')) ||
        (selectedClearance === 'L3' && m.clearanceLevel.includes('LEVEL 3'));

      return matchesSearch && matchesClearance;
    });
  }, [searchQuery, selectedClearance]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-7xl px-4 space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <Users className="w-6 h-6 text-[#58a6ff]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Anonymous Operatives
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
                    {members.length} VERIFIED
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  Pseudonymous member roster. Identity secured via GPG keyrings and cryptographic zero-knowledge proofs.
                </p>
              </div>
            </div>
          </div>

          <Button asChild className="font-mono text-xs bg-[#238636] hover:bg-[#2ea043] text-white">
            <Link href="/join">
              <Terminal className="w-3.5 h-3.5 mr-2" />
              Apply for Codename
            </Link>
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#8b949e]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by codename, callsign, GPG key, or skill (e.g. Rust, eBPF, ZK)..."
              className="pl-9 h-10 bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-1 focus-visible:ring-[#58a6ff]"
            />
          </div>

          {/* Clearance Level Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { label: 'All Levels', value: 'ALL' },
              { label: 'Level 5 (Architect)', value: 'L5' },
              { label: 'Level 4 (Operative)', value: 'L4' },
              { label: 'Level 3 (Sentinel)', value: 'L3' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedClearance(tab.value)}
                className={`px-3 py-2 rounded-md font-mono transition-all whitespace-nowrap ${
                  selectedClearance === tab.value
                    ? 'bg-[#58a6ff] text-black font-bold shadow-sm'
                    : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setActiveDossier(member)}
              className="group relative p-5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-[#58a6ff]/5"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <CyberAvatar seed={member.avatarSeed} size={52} glow={member.status === 'ACTIVE'} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-mono group-hover:text-[#58a6ff] transition-colors">
                          {member.codename}
                        </h3>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'ACTIVE'
                              ? 'bg-[#3fb950] animate-pulse'
                              : member.status === 'STEALTH'
                              ? 'bg-[#a371f7]'
                              : 'bg-[#e3b341]'
                          }`}
                          title={`Status: ${member.status}`}
                        />
                      </div>
                      <div className="text-xs text-[#8b949e] font-mono">&quot;{member.callsign}&quot;</div>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono border-[#30363d] ${
                      member.clearanceLevel.includes('LEVEL 5')
                        ? 'text-[#f78166] bg-[#f78166]/10'
                        : member.clearanceLevel.includes('LEVEL 4')
                        ? 'text-[#58a6ff] bg-[#58a6ff]/10'
                        : 'text-[#3fb950] bg-[#3fb950]/10'
                    }`}
                  >
                    {member.clearanceLevel.split(' - ')[0]}
                  </Badge>
                </div>

                {/* Specialization & Bio */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-[#58a6ff]">
                    {member.specialization}
                  </div>
                  <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* GPG Key Bar */}
                <div className="mt-4 p-2 rounded bg-[#0d1117] border border-[#30363d] flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <div className="flex items-center gap-1.5 truncate mr-2">
                    <Key className="w-3.5 h-3.5 text-[#e3b341] shrink-0" />
                    <span className="truncate">{member.gpgFingerprint.slice(0, 19)}...</span>
                  </div>
                  <button
                    onClick={(e) => copyGpg(member.gpgFingerprint, e)}
                    className="text-[#58a6ff] hover:text-white shrink-0 p-1"
                    title="Copy full GPG fingerprint"
                  >
                    {copiedKey === member.gpgFingerprint ? (
                      <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Skills arsenal */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom statistics */}
              <div className="pt-4 mt-4 border-t border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
                <div className="flex items-center gap-1 text-[#e3b341]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{member.points} XP</span>
                </div>
                <div className="flex items-center gap-1 text-[#58a6ff] group-hover:underline">
                  <span>Inspect Dossier</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredMembers.length === 0 && (
          <div className="p-12 text-center rounded-lg bg-[#161b22] border border-[#30363d] font-mono">
            <Lock className="w-10 h-10 text-[#8b949e] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Operatives Found</h3>
            <p className="text-xs text-[#8b949e] mt-1">
              No operative matches the query &quot;{searchQuery}&quot;. Try searching for another skill or clearance level.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedClearance('ALL');
              }}
              variant="outline"
              size="sm"
              className="mt-4 border-[#30363d]"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Interactive Operative Dossier Modal */}
      <Dialog open={!!activeDossier} onOpenChange={(open) => !open && setActiveDossier(null)}>
        {activeDossier && (
          <DialogContent className="sm:max-w-2xl bg-[#161b22] border-[#30363d] text-[#c9d1d9] font-mono p-0 gap-0 overflow-hidden shadow-2xl">
            <DialogHeader className="p-4 bg-[#0d1117] border-b border-[#30363d] flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#58a6ff]" />
                <DialogTitle className="text-sm font-bold text-white font-mono">
                  CLASSIFIED DOSSIER // {activeDossier.codename}
                </DialogTitle>
              </div>
              <Badge variant="outline" className="text-[10px] border-[#30363d] text-[#3fb950]">
                {activeDossier.status}
              </Badge>
            </DialogHeader>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Profile Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                <CyberAvatar seed={activeDossier.avatarSeed} size={68} glow />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{activeDossier.codename}</h2>
                    <span className="text-xs text-[#8b949e]">(&quot;{activeDossier.callsign}&quot;)</span>
                  </div>
                  <div className="text-xs text-[#58a6ff] font-semibold">{activeDossier.specialization}</div>
                  <div className="text-xs text-[#8b949e]">Unit: {activeDossier.assignedUnit}</div>
                </div>
              </div>

              {/* Clearance & Lore */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                  <div className="text-[10px] text-[#8b949e] uppercase">Clearance</div>
                  <div className="text-xs font-bold text-[#f78166] mt-1">{activeDossier.clearanceLevel.split(' - ')[0]}</div>
                </div>
                <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                  <div className="text-[10px] text-[#8b949e] uppercase">Club XP</div>
                  <div className="text-xs font-bold text-[#e3b341] mt-1">{activeDossier.points} XP</div>
                </div>
                <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                  <div className="text-[10px] text-[#8b949e] uppercase">Commits</div>
                  <div className="text-xs font-bold text-[#3fb950] mt-1">{activeDossier.contributions}</div>
                </div>
                <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                  <div className="text-[10px] text-[#8b949e] uppercase">Completed Ops</div>
                  <div className="text-xs font-bold text-[#58a6ff] mt-1">{activeDossier.completedOps}</div>
                </div>
              </div>

              {/* Encrypted Bio */}
              <div>
                <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-[#8b949e]">
                  Operative Abstract
                </div>
                <p className="p-3 rounded bg-[#0d1117] border border-[#30363d] text-xs leading-relaxed text-[#c9d1d9] font-sans">
                  {activeDossier.bio}
                </p>
              </div>

              {/* GPG Fingerprint Full */}
              <div>
                <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-[#8b949e] flex items-center justify-between">
                  <span>Cryptographic GPG Fingerprint</span>
                  <span className="text-[10px] text-[#3fb950]">VERIFIED RSA-4096</span>
                </div>
                <div className="p-3 rounded bg-[#0d1117] border border-[#30363d] font-mono text-xs text-[#58a6ff] flex items-center justify-between">
                  <span className="select-all">{activeDossier.gpgFingerprint}</span>
                  <button
                    onClick={(e) => copyGpg(activeDossier.gpgFingerprint, e)}
                    className="text-[#8b949e] hover:text-white"
                  >
                    {copiedKey === activeDossier.gpgFingerprint ? (
                      <Check className="w-4 h-4 text-[#3fb950]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Past Operations */}
              <div>
                <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-[#8b949e]">
                  Field Operations Log
                </div>
                <div className="space-y-1.5">
                  {activeDossier.missions.map((mission, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-[#0d1117] border border-[#30363d] text-xs flex items-center gap-2 text-[#c9d1d9]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                      <span>{mission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Arsenal */}
              <div>
                <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-[#8b949e]">
                  Technical Arsenal
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDossier.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded text-xs bg-[#0d1117] text-[#58a6ff] border border-[#30363d]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex items-center justify-center font-mono">
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <Shield className="w-4 h-4 animate-spin text-[#58a6ff]" />
          <span>Decrypting Syndicate Roster...</span>
        </div>
      </div>
    }>
      <MembersContent />
    </Suspense>
  );
}

