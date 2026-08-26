'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code,
  FolderGit2,
  Users,
  Calendar,
  FileCode2,
  Trophy,
  UserPlus,
  ShieldAlert,
  GitBranch,
  ShieldCheck,
} from 'lucide-react';
import { members, projects, operations } from '@/lib/data';

export function GitHubSubnav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Overview',
      href: '/',
      icon: Code,
      badge: null,
      active: pathname === '/',
    },
    {
      name: 'Repositories',
      href: '/projects',
      icon: FolderGit2,
      badge: projects.length,
      active: pathname === '/projects',
    },
    {
      name: 'Operatives',
      href: '/members',
      icon: Users,
      badge: members.length,
      active: pathname === '/members',
    },
    {
      name: 'Operations',
      href: '/events',
      icon: Calendar,
      badge: operations.filter(o => o.status === 'Open').length,
      active: pathname === '/events',
    },
    {
      name: 'Field Logs',
      href: '/blog',
      icon: FileCode2,
      badge: 3,
      active: pathname === '/blog',
    },
    {
      name: 'Wall of Fame',
      href: '/wall-of-fame',
      icon: Trophy,
      badge: 'XP',
      active: pathname === '/wall-of-fame',
    },
  ];

  return (
    <div
      id="app-subnav-bar"
      className="w-full bg-[#0d1117]/95 border-b border-[#30363d]/80 overflow-x-auto scrollbar-none sticky top-14 z-40 backdrop-blur-xl transition-all"
    >
      <div className="container max-w-7xl px-4 sm:px-6 flex items-center justify-between min-w-max">
        <nav className="flex space-x-1 py-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                id={`subnav-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={tab.href}
                className={`flex items-center gap-2 py-2 px-3 text-xs font-mono font-medium rounded-md transition-all duration-150 whitespace-nowrap select-none ${
                  tab.active
                    ? 'text-white bg-[#161b22] border border-[#30363d] shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/50 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    tab.active ? 'text-[#58a6ff]' : 'text-[#8b949e] group-hover:text-[#c9d1d9]'
                  }`}
                />
                <span>{tab.name}</span>
                {tab.badge !== null && (
                  <span
                    className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                      tab.active
                        ? 'bg-[#21262d] text-[#58a6ff] border border-[#388bfd]/30 font-semibold'
                        : 'bg-[#161b22] text-[#8b949e] border border-[#30363d]/60'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Node & Git Indicator */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-[#8b949e] pl-4">
          <div className="flex items-center gap-1.5 bg-[#161b22] px-2.5 py-1 rounded-md border border-[#30363d]">
            <GitBranch className="w-3.5 h-3.5 text-[#a371f7]" />
            <span className="text-[#c9d1d9]">mainnet</span>
            <span className="text-[#3fb950] font-bold">@v3.2</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161b22]/70 border border-[#30363d]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="text-[#3fb950] font-semibold">CLUSTER SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
