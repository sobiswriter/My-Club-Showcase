'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Zap,
  Star,
  Shield,
  Award,
  GitCommit,
  Flame,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Code2,
  Calendar
} from 'lucide-react';
import { members, bounties, badges, clubStats } from '@/lib/data';
import { CyberAvatar } from '@/components/cyber-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function WallOfFamePage() {
  const [selectedCategory, setSelectedCategory] = useState<'LEADERBOARD' | 'BOUNTIES' | 'BADGES'>('LEADERBOARD');
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [claimedBounties, setClaimedBounties] = useState<{ [key: string]: boolean }>({});

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => b.points - a.points);
  }, []);

  // Generate 52 weeks x 7 days heatmap data
  const heatmapData = useMemo(() => {
    const weeks: { date: string; count: number; level: number }[][] = [];
    const today = new Date(2026, 7, 26); // August 26, 2026

    for (let w = 51; w >= 0; w--) {
      const week: { date: string; count: number; level: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dayOffset = w * 7 + (6 - d);
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() - dayOffset);

        // Deterministic pseudo-random commit count
        const seed = (w * 13 + d * 19 + 7) % 100;
        let count = 0;
        let level = 0;

        if (seed > 85) {
          count = 8 + (seed % 9);
          level = 4;
        } else if (seed > 65) {
          count = 4 + (seed % 4);
          level = 3;
        } else if (seed > 40) {
          count = 2 + (seed % 2);
          level = 2;
        } else if (seed > 15) {
          count = 1;
          level = 1;
        } else {
          count = 0;
          level = 0;
        }

        week.push({
          date: dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          count,
          level,
        });
      }
      weeks.push(week);
    }
    return weeks;
  }, []);

  const handleClaimBounty = (bountyId: string) => {
    setClaimedBounties((prev) => ({
      ...prev,
      [bountyId]: true,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-7xl px-4 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <Trophy className="w-6 h-6 text-[#e3b341]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Wall of Fame & Activity Matrix
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  Syndicate contribution leaderboard, verified 52-week activity heatmap, open bounties, and achievement milestones.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded bg-[#0d1117] border border-[#30363d] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#f78166]" />
              <span className="text-[#8b949e]">Top Streak:</span>
              <strong className="text-white">42 Days</strong>
            </div>
          </div>
        </div>

        {/* GitHub 52-Week Contribution Matrix */}
        <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono">
              <Activity className="w-4 h-4 text-[#3fb950]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {clubStats.totalCommits} Contributions in the last year
              </h2>
            </div>
            <div className="text-xs font-mono text-[#8b949e]">
              {hoveredDay ? (
                <span className="text-[#3fb950] font-bold">
                  {hoveredDay.count} contributions on {hoveredDay.date}
                </span>
              ) : (
                <span>Hover over grid cells to inspect daily commits</span>
              )}
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => {
                    let bgClass = 'bg-[#161b22] border border-[#30363d]/60';
                    if (day.level === 1) bgClass = 'bg-[#0e4429] border border-[#0e4429]';
                    if (day.level === 2) bgClass = 'bg-[#006d32] border border-[#006d32]';
                    if (day.level === 3) bgClass = 'bg-[#26a641] border border-[#26a641]';
                    if (day.level === 4) bgClass = 'bg-[#39d353] border border-[#39d353] shadow-sm shadow-[#39d353]/30';

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${bgClass}`}
                        title={`${day.count} commits on ${day.date}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e] pt-2 border-t border-[#30363d]">
            <span>Learn how we count verified GPG commits</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-[#30363d]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-[#30363d] pb-2 font-mono text-xs">
          <button
            onClick={() => setSelectedCategory('LEADERBOARD')}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
              selectedCategory === 'LEADERBOARD'
                ? 'bg-[#58a6ff] text-black shadow-md'
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Operative Leaderboard ({sortedMembers.length})
          </button>

          <button
            onClick={() => setSelectedCategory('BOUNTIES')}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
              selectedCategory === 'BOUNTIES'
                ? 'bg-[#58a6ff] text-black shadow-md'
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Syndicate Bounties ({bounties.length})
          </button>

          <button
            onClick={() => setSelectedCategory('BADGES')}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
              selectedCategory === 'BADGES'
                ? 'bg-[#58a6ff] text-black shadow-md'
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Achievement Badges ({badges.length})
          </button>
        </div>

        {/* Category 1: Operative Leaderboard */}
        {selectedCategory === 'LEADERBOARD' && (
          <div className="border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden shadow-lg">
            <div className="p-4 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>Rank & Anonymous Operative</span>
              <div className="flex items-center gap-8 pr-4 hidden sm:flex">
                <span>Completed Ops</span>
                <span>Contributions</span>
                <span>Total XP</span>
              </div>
            </div>

            <div className="divide-y divide-[#30363d]">
              {sortedMembers.map((member, index) => {
                const rank = index + 1;
                let rankBadge = `${rank}`;
                let rankColor = 'text-[#8b949e] bg-[#21262d]';

                if (rank === 1) {
                  rankColor = 'text-black bg-[#e3b341] font-bold shadow-md shadow-[#e3b341]/30';
                } else if (rank === 2) {
                  rankColor = 'text-black bg-[#c9d1d9] font-bold';
                } else if (rank === 3) {
                  rankColor = 'text-black bg-[#f78166] font-bold';
                }

                return (
                  <div
                    key={member.id}
                    className="p-4 hover:bg-[#21262d]/40 transition-colors flex items-center justify-between gap-4 font-mono"
                  >
                    {/* Left Rank & Operative Info */}
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-xs ${rankColor}`}
                      >
                        #{rankBadge}
                      </span>

                      <CyberAvatar seed={member.avatarSeed} size={44} glow={rank === 1} />

                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/members?search=${encodeURIComponent(member.codename)}`}
                            className="font-bold text-white hover:text-[#58a6ff] hover:underline text-sm"
                          >
                            {member.codename}
                          </Link>
                          <span className="text-xs text-[#8b949e]">&quot;{member.callsign}&quot;</span>
                          <Badge variant="outline" className="text-[10px] border-[#30363d] text-[#58a6ff] hidden md:inline-flex">
                            {member.clearanceLevel.split(' - ')[0]}
                          </Badge>
                        </div>
                        <div className="text-xs text-[#8b949e] font-sans truncate max-w-[200px] sm:max-w-md">
                          {member.specialization}
                        </div>
                      </div>
                    </div>

                    {/* Right Stats */}
                    <div className="flex items-center gap-6 sm:gap-10 text-xs text-[#8b949e]">
                      <div className="hidden sm:block text-center">
                        <span className="font-bold text-white">{member.completedOps}</span>
                      </div>
                      <div className="hidden sm:block text-center">
                        <span className="font-bold text-[#3fb950]">{member.contributions}</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[#e3b341] font-bold text-sm">
                          <Zap className="w-4 h-4 fill-[#e3b341]" />
                          <span>{member.points} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Category 2: Syndicate Bounties */}
        {selectedCategory === 'BOUNTIES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bounties.map((bounty) => {
              const isClaimed = claimedBounties[bounty.id] || bounty.status === 'CLAIMED';

              return (
                <div
                  key={bounty.id}
                  className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                      <span className="text-[#58a6ff] font-bold">{bounty.id}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] border-[#30363d] ${
                            bounty.difficulty === 'NIGHTMARE'
                              ? 'text-[#f85149] bg-[#f85149]/10'
                              : bounty.difficulty === 'HARD'
                              ? 'text-[#f0883e] bg-[#f0883e]/10'
                              : 'text-[#3fb950] bg-[#3fb950]/10'
                          }`}
                        >
                          {bounty.difficulty}
                        </Badge>
                        <span className="text-[#8b949e]">[{bounty.category}]</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white font-mono leading-snug">
                      {bounty.title}
                    </h3>
                    <p className="text-xs text-[#8b949e] font-sans mt-2 leading-relaxed">
                      {bounty.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#30363d] flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-[#e3b341] font-bold">
                      <Zap className="w-4 h-4 fill-[#e3b341]" />
                      <span>+{bounty.rewardPoints} XP Reward</span>
                    </div>

                    {isClaimed ? (
                      <Badge variant="outline" className="text-[10px] border-[#3fb950]/40 text-[#3fb950] bg-[#3fb950]/10">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {bounty.claimedBy ? `Claimed by ${bounty.claimedBy}` : 'Claim Submitted'}
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => handleClaimBounty(bounty.id)}
                        size="sm"
                        className="h-8 bg-[#238636] hover:bg-[#2ea043] text-white font-mono text-xs"
                      >
                        Claim Bounty
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Category 3: Achievement Badges Vault */}
        {selectedCategory === 'BADGES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-lg bg-[#161b22] border ${badge.tierColor} flex flex-col justify-between space-y-3`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="font-bold">{badge.rarity} Badge</span>
                    <span className="text-[#8b949e]">{badge.unlockedCount} Operatives Unlocked</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-white">
                      <Award className="w-6 h-6 text-[#e3b341]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-mono">{badge.title}</h3>
                      <p className="text-xs text-[#8b949e] font-sans mt-0.5">{badge.description}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#30363d]/50 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <span>Criteria: Verified Mainnet Commit</span>
                  <span className="text-[#3fb950]">Audited</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
