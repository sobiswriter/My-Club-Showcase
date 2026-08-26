'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCode2,
  Star,
  MessageSquare,
  Copy,
  Check,
  Code,
  Clock,
  Tag,
  Search,
  BookOpen,
  Terminal
} from 'lucide-react';
import { fieldLogs, FieldLog } from '@/lib/data';
import { CyberAvatar } from '@/components/cyber-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [starsMap, setStarsMap] = useState<{ [key: number]: boolean }>({});

  const toggleStar = (logId: number) => {
    setStarsMap((prev) => ({
      ...prev,
      [logId]: !prev[logId],
    }));
  };

  const copySnippet = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLogs = fieldLogs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.authorCodename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-6xl px-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <FileCode2 className="w-6 h-6 text-[#58a6ff]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  Field Logs & Secret Gists
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#58a6ff]/20 text-[#58a6ff] border border-[#58a6ff]/40">
                    {fieldLogs.length} WRITEUPS
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  Technical writeups, circuit schematics, exploit mitigations, and shader breakdowns from anonymous operatives.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <Button asChild className="bg-[#238636] hover:bg-[#2ea043] text-white">
              <Link href="/join">
                <Terminal className="w-3.5 h-3.5 mr-1.5" /> Publish New Gist
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative font-mono text-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#8b949e]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search field logs by topic, algorithm, author codename, or language..."
            className="pl-9 h-10 bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-1 focus-visible:ring-[#58a6ff]"
          />
        </div>

        {/* Logs Feed */}
        <div className="space-y-6">
          {filteredLogs.map((log) => {
            const isStarred = starsMap[log.id];
            const starCount = log.stars + (isStarred ? 1 : 0);

            return (
              <div
                key={log.id}
                className="border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden shadow-lg"
              >
                {/* Header Profile & Title */}
                <div className="p-4 sm:p-5 border-b border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CyberAvatar seed={log.authorAvatarSeed} size={42} />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/members?search=${encodeURIComponent(log.authorCodename)}`}
                          className="font-bold text-white hover:text-[#58a6ff] font-mono text-sm"
                        >
                          {log.authorCodename}
                        </Link>
                        <span className="text-xs text-[#8b949e]">/</span>
                        <span className="font-semibold text-[#58a6ff] font-mono text-sm">
                          {log.filename}
                        </span>
                      </div>
                      <div className="text-xs text-[#8b949e] font-mono mt-0.5 flex items-center gap-3">
                        <span>Published {log.publishedAt}</span>
                        <span>• {log.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Star & Comments) */}
                  <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
                    <button
                      onClick={() => toggleStar(log.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all ${
                        isStarred
                          ? 'bg-[#e3b341]/20 text-[#e3b341] border-[#e3b341]/40'
                          : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-[#e3b341]' : ''}`} />
                      <span>{starCount}</span>
                    </button>

                    <div className="px-3 py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-[#8b949e] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{log.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content & Description */}
                <div className="p-5 space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white font-mono">{log.title}</h2>
                    <p className="text-xs text-[#8b949e] font-sans mt-1 leading-relaxed">
                      {log.description}
                    </p>
                  </div>

                  {/* Code Viewer Container */}
                  <div className="rounded-md bg-[#0d1117] border border-[#30363d] overflow-hidden font-mono text-xs">
                    <div className="p-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-[#8b949e]">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-[#58a6ff]" />
                        <span className="font-semibold text-white">{log.filename}</span>
                        <Badge variant="outline" className="text-[10px] border-[#30363d]">
                          {log.language}
                        </Badge>
                      </div>
                      <button
                        onClick={() => copySnippet(log.code, log.id)}
                        className="text-[#58a6ff] hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === log.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                            <span className="text-[#3fb950]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Raw</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 overflow-x-auto text-[#c9d1d9] leading-relaxed">
                      {log.code}
                    </pre>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {log.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
