'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderGit2,
  Star,
  GitFork,
  Book,
  Code,
  Search,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  Shield,
  Eye,
  FileCode,
  Sparkles,
  GitBranch,
  Layers,
  ArrowRight
} from 'lucide-react';
import { projects, Project } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [selectedClearance, setSelectedClearance] = useState('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'readme' | 'code'>('readme');
  const [copiedClone, setCopiedClone] = useState(false);
  const [starredMap, setStarredMap] = useState<{ [key: string]: boolean }>({});

  const toggleStar = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const copyCloneCmd = (repoSlug: string) => {
    const cmd = `git clone https://github.com/team7-syndicate/${repoSlug}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.authorCodename.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLang =
        selectedLanguage === 'ALL' || p.language.toLowerCase() === selectedLanguage.toLowerCase();

      const matchesClearance =
        selectedClearance === 'ALL' || p.clearance === selectedClearance;

      return matchesSearch && matchesLang && matchesClearance;
    });
  }, [searchQuery, selectedLanguage, selectedClearance]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-7xl px-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <FolderGit2 className="w-6 h-6 text-[#3fb950]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Repositories & Systems
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#3fb950]/20 text-[#3fb950] border border-[#3fb950]/40">
                    {projects.length} Repos
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  Decentralized open-source codebases, zero-knowledge circuits, eBPF security tools, and shaders.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <Button
              onClick={() => copyCloneCmd('hyperspeed-warp-core')}
              variant="outline"
              className="bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]"
            >
              {copiedClone ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-[#3fb950]" />
                  Copied Clone URI
                </>
              ) : (
                <>
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-[#58a6ff]" />
                  Copy Syndicate Git URI
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#8b949e]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repositories by name, topic, or author codename..."
              className="pl-9 h-10 bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-1 focus-visible:ring-[#58a6ff]"
            />
          </div>

          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'TypeScript', 'Rust', 'Circom', 'Go', 'Python', 'C++'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-2 rounded-md font-mono transition-all whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-[#58a6ff] text-black font-bold shadow-sm'
                    : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories List */}
        <div className="border border-[#30363d] rounded-lg bg-[#161b22] divide-y divide-[#30363d] overflow-hidden shadow-lg">
          {filteredProjects.map((repo) => {
            const isStarred = starredMap[repo.id];
            const starCount = repo.stars + (isStarred ? 1 : 0);

            return (
              <div
                key={repo.id}
                onClick={() => {
                  setActiveProject(repo);
                  setActiveTab('readme');
                }}
                className="p-5 hover:bg-[#21262d]/40 transition-colors cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1">
                  {/* Title & Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Book className="w-4 h-4 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                    <h3 className="text-base font-bold text-[#58a6ff] group-hover:underline font-mono">
                      {repo.name}
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-mono border-[#30363d] text-[#8b949e]">
                      {repo.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono border-[#30363d] ${
                        repo.clearance === 'TOP-SECRET'
                          ? 'text-[#f85149] bg-[#f85149]/10'
                          : repo.clearance === 'CONFIDENTIAL'
                          ? 'text-[#e3b341] bg-[#e3b341]/10'
                          : 'text-[#3fb950] bg-[#3fb950]/10'
                      }`}
                    >
                      {repo.clearance}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#8b949e] leading-relaxed font-sans max-w-3xl">
                    {repo.description}
                  </p>

                  {/* Topics Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Meta Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8b949e] pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full ${repo.languageColor}`} />
                      <span className="text-[#c9d1d9]">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#8b949e]" />
                      <span>{starCount}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[#8b949e]" />
                      <span>{repo.forks}</span>
                    </div>

                    <div className="text-[11px]">
                      Lead: <span className="text-white font-semibold">{repo.authorCodename}</span>
                    </div>

                    <span className="text-[11px]">Updated {repo.updatedAt}</span>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 self-start pt-1 font-mono text-xs">
                  <button
                    onClick={(e) => toggleStar(repo.id, e)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all ${
                      isStarred
                        ? 'bg-[#e3b341]/20 text-[#e3b341] border-[#e3b341]/40'
                        : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-[#e3b341]' : ''}`} />
                    <span>{isStarred ? 'Starred' : 'Star'}</span>
                  </button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#30363d] bg-[#21262d] text-[#58a6ff] hover:bg-[#30363d]"
                  >
                    Inspect Code
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-lg bg-[#161b22] border border-[#30363d] font-mono">
            <Book className="w-10 h-10 text-[#8b949e] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Repositories Match</h3>
            <p className="text-xs text-[#8b949e] mt-1">
              No codebase found matching &quot;{searchQuery}&quot;.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('ALL');
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

      {/* Code / README Inspector Modal */}
      <Dialog open={!!activeProject} onOpenChange={(open) => !open && setActiveProject(null)}>
        {activeProject && (
          <DialogContent className="sm:max-w-3xl bg-[#161b22] border-[#30363d] text-[#c9d1d9] font-mono p-0 gap-0 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <DialogHeader className="p-4 bg-[#0d1117] border-b border-[#30363d] flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#58a6ff]" />
                <DialogTitle className="text-sm font-bold text-white font-mono">
                  {activeProject.name} <span className="text-[#8b949e]">({activeProject.version})</span>
                </DialogTitle>
              </div>
              <Badge variant="outline" className="text-[10px] border-[#30363d] text-[#3fb950]">
                {activeProject.status}
              </Badge>
            </DialogHeader>

            {/* Sub-tabs: README vs Source Code */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] bg-[#161b22]">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('readme')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    activeTab === 'readme'
                      ? 'bg-[#21262d] text-white font-bold border border-[#30363d]'
                      : 'text-[#8b949e] hover:text-[#c9d1d9]'
                  }`}
                >
                  README.md
                </button>
                {activeProject.codeSnippet && (
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      activeTab === 'code'
                        ? 'bg-[#21262d] text-white font-bold border border-[#30363d]'
                        : 'text-[#8b949e] hover:text-[#c9d1d9]'
                    }`}
                  >
                    {activeProject.codeSnippet.filename}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                <span>Author: <strong className="text-white">{activeProject.authorCodename}</strong></span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              {activeTab === 'readme' ? (
                <div className="p-4 rounded bg-[#0d1117] border border-[#30363d] font-sans text-xs space-y-4">
                  <div className="text-sm font-mono font-bold text-white flex items-center gap-2 border-b border-[#30363d] pb-2">
                    <FileCode className="w-4 h-4 text-[#58a6ff]" />
                    <span>Project Documentation</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-[#c9d1d9] bg-[#161b22] p-4 rounded border border-[#30363d]">
                    {activeProject.readme}
                  </pre>
                </div>
              ) : (
                activeProject.codeSnippet && (
                  <div className="p-4 rounded bg-[#0d1117] border border-[#30363d] font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-[#8b949e]">
                      <span>{activeProject.codeSnippet.filename} ({activeProject.codeSnippet.language})</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeProject.codeSnippet!.code);
                          setCopiedClone(true);
                          setTimeout(() => setCopiedClone(false), 2000);
                        }}
                        className="text-[#58a6ff] hover:text-white flex items-center gap-1"
                      >
                        {copiedClone ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Code</span>
                      </button>
                    </div>
                    <pre className="text-[#c9d1d9] overflow-x-auto p-2 bg-[#161b22] rounded">
                      {activeProject.codeSnippet.code}
                    </pre>
                  </div>
                )
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-xs">
              <div className="text-[#8b949e]">
                License: <span className="text-white">{activeProject.license}</span>
              </div>
              <Button
                onClick={() => copyCloneCmd(activeProject.slug)}
                size="sm"
                className="bg-[#238636] hover:bg-[#2ea043] text-white font-mono"
              >
                Copy Clone Command
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
