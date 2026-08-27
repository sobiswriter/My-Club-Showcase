'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function TerminalJoinSnippet() {
  const [copied, setCopied] = useState(false);
  const command = 'curl -sSL https://team7.sh/join | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
      <div className="space-y-1 text-center md:text-left w-full md:w-auto">
        <div className="flex items-center justify-center md:justify-start gap-2 text-white font-mono font-bold text-base sm:text-lg">
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[#3fb950]" />
          <span>Initiate Operative Protocol</span>
        </div>
        <p className="text-xs sm:text-sm text-[#8b949e] font-sans max-w-md mx-auto md:mx-0">
          Ready to join the syndicate? Submit your public GPG key and pass our zero-knowledge challenge.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto">
        <div
          onClick={handleCopy}
          className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] font-mono text-xs text-[#c9d1d9] cursor-pointer hover:border-[#58a6ff] transition-colors select-all group"
        >
          <span className="text-[#3fb950] shrink-0">$</span>
          <span className="text-[#58a6ff] group-hover:underline truncate text-[11px] sm:text-xs">{command}</span>
          <button
            type="button"
            className="text-[#8b949e] group-hover:text-white transition-colors shrink-0 p-1"
            title="Copy command"
          >
            {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

        <Button
          id="terminal-join-action-btn"
          asChild
          className="w-full sm:w-auto h-9 sm:h-10 font-mono text-xs bg-[#238636] hover:bg-[#2ea043] text-white border border-[#3fb950]/30 shadow-md"
        >
          <Link href="/join">
            Submit Application <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
