'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  Award,
  Search,
  Check,
  Shield,
  Milestone,
  Plus,
  Terminal
} from 'lucide-react';
import { operations, OperationEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'COMPLETED'>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [rsvpMap, setRsvpMap] = useState<{ [key: number]: boolean }>({});

  const toggleRsvp = (opId: number) => {
    setRsvpMap((prev) => ({
      ...prev,
      [opId]: !prev[opId],
    }));
  };

  const filteredOps = useMemo(() => {
    return operations.filter((op) => {
      const matchesSearch =
        op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.authorCodename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'OPEN' && op.status === 'Open') ||
        (statusFilter === 'COMPLETED' && op.status === 'Completed');

      const matchesType =
        typeFilter === 'ALL' || op.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const openCount = operations.filter((o) => o.status === 'Open').length;
  const completedCount = operations.filter((o) => o.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-7xl px-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <Calendar className="w-6 h-6 text-[#f0883e]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Operations & Milestones
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#f0883e]/20 text-[#f0883e] border border-[#f0883e]/40">
                    {openCount} ACTIVE OPS
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  GitHub Issues & Milestones tracker for CTFs, security workshops, hackathons, and cryptographic briefings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <Button asChild className="bg-[#238636] hover:bg-[#2ea043] text-white">
              <Link href="/join">
                <Plus className="w-4 h-4 mr-1.5" /> Propose New Operation
              </Link>
            </Button>
          </div>
        </div>

        {/* Milestones Progress Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Milestone className="w-4 h-4 text-[#a371f7]" />
                <span className="font-bold text-white">Milestone: Q3 Autonomous Swarm Jam</span>
              </div>
              <span className="text-[#3fb950] font-bold">82% Complete</span>
            </div>
            <Progress value={82} className="h-2 bg-[#0d1117]" />
            <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
              <span>18 of 22 Tasks Closed</span>
              <span>Due in 14 Days</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Milestone className="w-4 h-4 text-[#58a6ff]" />
                <span className="font-bold text-white">Milestone: Global Mesh Node v3.2 Deployment</span>
              </div>
              <span className="text-[#3fb950] font-bold">95% Complete</span>
            </div>
            <Progress value={95} className="h-2 bg-[#0d1117]" />
            <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
              <span>38 of 40 Nodes Online</span>
              <span>Audited</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#8b949e]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search operations by keyword, author codename, or tag..."
              className="pl-9 h-10 bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-1 focus-visible:ring-[#58a6ff]"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'CTF Operation', 'Workshop', 'Hackathon', 'Briefing'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-2 rounded-md font-mono transition-all whitespace-nowrap ${
                  typeFilter === t
                    ? 'bg-[#58a6ff] text-black font-bold shadow-sm'
                    : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Issues List Container */}
        <div className="border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden shadow-lg">
          {/* List Header */}
          <div className="p-4 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`flex items-center gap-1.5 transition-colors ${
                  statusFilter === 'ALL' ? 'text-white font-bold' : 'text-[#8b949e] hover:text-white'
                }`}
              >
                <AlertCircle className="w-4 h-4 text-[#3fb950]" />
                <span>{openCount} Open</span>
              </button>
              <button
                onClick={() => setStatusFilter('COMPLETED')}
                className={`flex items-center gap-1.5 transition-colors ${
                  statusFilter === 'COMPLETED' ? 'text-white font-bold' : 'text-[#8b949e] hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#a371f7]" />
                <span>{completedCount} Completed</span>
              </button>
            </div>
            <span className="text-[#8b949e] hidden sm:inline">Sort: Newest First</span>
          </div>

          {/* Issues Rows */}
          <div className="divide-y divide-[#30363d]">
            {filteredOps.map((op) => {
              const isRsvp = rsvpMap[op.id];
              const currentParticipants = op.participants + (isRsvp ? 1 : 0);

              return (
                <div
                  key={op.id}
                  className="p-5 hover:bg-[#21262d]/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    {op.status === 'Open' ? (
                      <AlertCircle className="w-4 h-4 text-[#3fb950] shrink-0 mt-1" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#a371f7] shrink-0 mt-1" />
                    )}

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white hover:text-[#58a6ff] transition-colors font-mono">
                          {op.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-mono border-[#30363d] ${
                            op.type === 'CTF Operation'
                              ? 'text-[#f85149] bg-[#f85149]/10'
                              : op.type === 'Hackathon'
                              ? 'text-[#3fb950] bg-[#3fb950]/10'
                              : op.type === 'Workshop'
                              ? 'text-[#58a6ff] bg-[#58a6ff]/10'
                              : 'text-[#a371f7] bg-[#a371f7]/10'
                          }`}
                        >
                          {op.type}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-mono border-[#30363d] text-[#e3b341]">
                          {op.clearanceRequired}
                        </Badge>
                      </div>

                      <p className="text-xs text-[#8b949e] font-sans leading-relaxed">
                        {op.description}
                      </p>

                      {/* Operation Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8b949e] pt-1">
                        <span className="text-[#c9d1d9]">#op-{op.id} by <strong className="text-[#58a6ff]">{op.authorCodename}</strong></span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{op.date} ({op.time})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{op.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#3fb950]">
                          <Award className="w-3.5 h-3.5" />
                          <span>{op.rewards}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {op.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RSVP & Capacity Action */}
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0 font-mono text-xs">
                    <div className="text-[11px] text-[#8b949e]">
                      Roster: <strong className="text-white">{currentParticipants}</strong> / {op.maxParticipants} Operatives
                    </div>

                    {op.status === 'Open' ? (
                      <button
                        onClick={() => toggleRsvp(op.id)}
                        className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-all flex items-center gap-1.5 ${
                          isRsvp
                            ? 'bg-[#238636] text-white shadow-md shadow-[#238636]/30'
                            : 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d]'
                        }`}
                      >
                        {isRsvp ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            RSVP Confirmed
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            RSVP / Join Op
                          </>
                        )}
                      </button>
                    ) : (
                      <Badge variant="outline" className="text-[10px] border-[#30363d] text-[#8b949e]">
                        Operation Concluded
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
