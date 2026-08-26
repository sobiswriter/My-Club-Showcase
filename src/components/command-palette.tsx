'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Terminal,
  FolderGit2,
  Users,
  Calendar,
  FileCode2,
  Trophy,
  UserPlus,
  Shield,
  Zap,
  ArrowRight,
  CornerDownLeft
} from 'lucide-react';
import { members, projects, operations } from '@/lib/data';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const navCommands = [
    { label: 'Overview // Mainnet Node', href: '/', icon: Terminal, category: 'Navigation' },
    { label: 'Repositories // Projects Matrix', href: '/projects', icon: FolderGit2, category: 'Navigation' },
    { label: 'Anonymous Operatives // Clearance Roster', href: '/members', icon: Users, category: 'Navigation' },
    { label: 'Operations & Milestones // Events', href: '/events', icon: Calendar, category: 'Navigation' },
    { label: 'Field Logs // Gists & Writeups', href: '/blog', icon: FileCode2, category: 'Navigation' },
    { label: 'Wall of Fame // Activity & Heatmap', href: '/wall-of-fame', icon: Trophy, category: 'Navigation' },
    { label: 'Initiate Protocol // Join Team7', href: '/join', icon: UserPlus, category: 'Navigation' },
    { label: 'Manifesto & Lore // About Us', href: '/about', icon: Shield, category: 'Navigation' },
  ];

  const filteredMembers = members.filter(
    (m) =>
      m.codename.toLowerCase().includes(query.toLowerCase()) ||
      m.callsign.toLowerCase().includes(query.toLowerCase()) ||
      m.specialization.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.language.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onOpenChange(false);
    setQuery('');
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-border/80 bg-[#161b22] text-[#c9d1d9] shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Team7 Command Terminal</DialogTitle>
        </DialogHeader>

        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-[#30363d] bg-[#0d1117]/80">
          <Terminal className="w-5 h-5 text-[#58a6ff] mr-3 shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, operative codename, or repository name..."
            className="h-12 border-0 bg-transparent text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-mono"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8b949e] hover:text-[#c9d1d9] px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results / Command List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4 font-mono text-xs">
          {/* Quick Navigation */}
          <div>
            <div className="text-[11px] font-semibold text-[#8b949e] px-2 py-1 uppercase tracking-wider">
              System Modules
            </div>
            <div className="space-y-1 mt-1">
              {navCommands
                .filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()))
                .map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.href}
                      onClick={() => handleSelect(cmd.href)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#21262d] text-left text-[#c9d1d9] hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#58a6ff] group-hover:scale-110 transition-transform" />
                        <span>{cmd.label}</span>
                      </div>
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Operatives Section */}
          {filteredMembers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#8b949e] px-2 py-1 uppercase tracking-wider flex items-center justify-between">
                <span>Anonymous Operatives ({filteredMembers.length})</span>
                <span className="text-[10px] text-[#58a6ff]">Encrypted</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredMembers.slice(0, 4).map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleSelect(`/members?search=${encodeURIComponent(member.codename)}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#21262d] text-left text-[#c9d1d9] hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-3.5 h-3.5 text-[#a371f7]" />
                      <span className="font-bold text-[#58a6ff]">{member.codename}</span>
                      <span className="text-[#8b949e]">(&quot;{member.callsign}&quot;)</span>
                      <span className="text-[#8b949e] hidden sm:inline text-[11px] truncate max-w-[200px]">
                        — {member.specialization}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-[#30363d] text-[#8b949e]">
                      {member.clearanceLevel.split(' - ')[0]}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#8b949e] px-2 py-1 uppercase tracking-wider">
                Repositories ({filteredProjects.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredProjects.slice(0, 3).map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleSelect(`/projects`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#21262d] text-left text-[#c9d1d9] hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#3fb950]" />
                      <span className="font-semibold text-white">{project.name}</span>
                      <span className="text-[#8b949e] hidden sm:inline text-[11px] truncate max-w-[220px]">
                        — {project.description}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#58a6ff]">{project.language}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#30363d] bg-[#0d1117] text-[11px] text-[#8b949e] font-mono">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">ESC</kbd> to exit</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">↵</kbd> to execute</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3fb950]">
            <span className="w-2 h-2 rounded-full bg-[#238636] animate-ping" />
            <span>NODE ONLINE</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
