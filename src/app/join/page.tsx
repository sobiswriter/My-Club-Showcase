'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  Key,
  Sparkles,
  CheckCircle2,
  Lock,
  Zap,
  HelpCircle,
  ArrowRight,
  Code2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const codenamePrefixes = ['ZERO', 'CYBER', 'PHANTOM', 'NEON', 'OBSIDIAN', 'KRYPTON', 'QUANTUM', 'SYNAPSE', 'SHADOW', 'AERO', 'ECHO', 'TITAN'];
const codenameSuffixes = ['BYTE', 'ROOT', 'HEX', 'VIPER', 'WARLOCK', 'WEAVER', 'SENTINEL', 'CORE', 'FLUX', 'DRIFT', 'PROTOCOL', 'PRIME'];

export default function JoinPage() {
  const [codename, setCodename] = useState('');
  const [callsign, setCallsign] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [cipherInput, setCipherInput] = useState('');
  const [cipherSolved, setCipherSolved] = useState<boolean | null>(null);
  const [statement, setStatement] = useState(
    `// State your primary area of interest & most ambitious project\nfunction initiate() {\n  return {\n    specialty: "Kernel Exploit / ZK-Circuits / WebGL",\n    motivation: "Building high-performance sovereign tech",\n    experience: "3+ years hacking in Rust / C / TypeScript"\n  };\n}`
  );
  const [submitted, setSubmitted] = useState(false);

  const availableSkills = [
    'Rust / C++',
    'eBPF & Kernel Tracing',
    'Zero-Knowledge Proofs',
    'Three.js & GLSL Shaders',
    'Reverse Engineering / Ghidra',
    'Distributed Systems & P2P',
    'Autonomous AI Swarms',
    'Hardware Security / FPGA',
    'Post-Quantum Cryptography',
  ];

  const generateCodename = () => {
    const prefix = codenamePrefixes[Math.floor(Math.random() * codenamePrefixes.length)];
    const suffix = codenameSuffixes[Math.floor(Math.random() * codenameSuffixes.length)];
    const num = Math.floor(Math.random() * 89) + 10;
    const generated = `${prefix}-${suffix}-${num}`;
    setCodename(generated);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const verifyCipher = () => {
    // Puzzle: Decrypt HEX: 5465616D37 -> "Team7" or "team7"
    const cleaned = cipherInput.trim().toLowerCase();
    if (cleaned === 'team7' || cleaned === 'team 7' || cleaned === 'syndicate') {
      setCipherSolved(true);
    } else {
      setCipherSolved(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-8">
      <div className="container max-w-5xl px-4 space-y-6">
        {/* Header Section */}
        <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                <Terminal className="w-6 h-6 text-[#3fb950]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center gap-2">
                  The Initiate Protocol
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
                    OPEN ADMISSION
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#8b949e] font-sans mt-0.5">
                  Submit your pseudonymous credentials to apply for Team7 operative clearance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8b949e]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span>RSA-4096 ENCRYPTED FORM</span>
          </div>
        </div>

        {submitted ? (
          /* Submission Success Terminal */
          <div className="p-8 rounded-lg bg-[#161b22] border border-[#238636] space-y-6 text-center font-mono">
            <div className="w-16 h-16 rounded-full bg-[#238636]/20 border border-[#238636] flex items-center justify-center mx-auto text-[#3fb950]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Initiate Application Dispatched // {codename || 'CANDIDATE-07'}
              </h2>
              <p className="text-xs text-[#8b949e] max-w-lg mx-auto">
                Your dossier has been cryptographically signed and multicast to Team7 architect keyrings. Keep your PGP key active for encrypted verification challenges.
              </p>
            </div>

            <div className="p-4 max-w-md mx-auto rounded bg-[#0d1117] border border-[#30363d] text-left text-xs space-y-1.5 text-[#8b949e]">
              <div><strong className="text-white">Assigned Codename:</strong> {codename || 'AUTO-ASSIGNED'}</div>
              <div><strong className="text-white">Callsign:</strong> {callsign || 'N/A'}</div>
              <div><strong className="text-white">GitHub:</strong> @{githubUser || 'anonymous'}</div>
              <div><strong className="text-white">Status:</strong> <span className="text-[#3fb950]">AWAITING PEER REVIEW</span></div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button asChild className="bg-[#238636] hover:bg-[#2ea043] text-white">
                <Link href="/projects">Explore Active Repositories</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#30363d]">
                <Link href="/wall-of-fame">Inspect Leaderboard</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Codename & Identity */}
                <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-4 font-mono">
                  <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                    <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#58a6ff]" />
                      01 // Pseudonymous Identity
                    </h3>
                    <Button
                      type="button"
                      onClick={generateCodename}
                      variant="outline"
                      size="sm"
                      className="h-7 text-[11px] bg-[#0d1117] border-[#30363d] text-[#58a6ff] hover:bg-[#21262d]"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Generate Codename
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <Label htmlFor="codename" className="text-[#c9d1d9]">
                        Proposed Codename *
                      </Label>
                      <Input
                        id="codename"
                        value={codename}
                        onChange={(e) => setCodename(e.target.value)}
                        placeholder="e.g., CIPHER-09"
                        required
                        className="mt-1.5 bg-[#0d1117] border-[#30363d] text-white uppercase font-bold tracking-wider"
                      />
                    </div>

                    <div>
                      <Label htmlFor="callsign" className="text-[#c9d1d9]">
                        Personal Callsign (Nickname)
                      </Label>
                      <Input
                        id="callsign"
                        value={callsign}
                        onChange={(e) => setCallsign(e.target.value)}
                        placeholder="e.g., Ghost, Null, Matrix"
                        className="mt-1.5 bg-[#0d1117] border-[#30363d] text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <Label htmlFor="github" className="text-[#c9d1d9]">
                        GitHub Username *
                      </Label>
                      <Input
                        id="github"
                        value={githubUser}
                        onChange={(e) => setGithubUser(e.target.value)}
                        placeholder="e.g., torvalds"
                        required
                        className="mt-1.5 bg-[#0d1117] border-[#30363d] text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-[#c9d1d9]">
                        Encrypted Contact (Email / Signal / Matrix) *
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operative@proton.me"
                        required
                        className="mt-1.5 bg-[#0d1117] border-[#30363d] text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Technical Arsenal & Skills Matrix */}
                <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-4 font-mono">
                  <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 border-b border-[#30363d] pb-3">
                    <Code2 className="w-4 h-4 text-[#3fb950]" />
                    02 // Technical Skills Matrix
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableSkills.map((skill) => {
                      const selected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all border ${
                            selected
                              ? 'bg-[#238636] text-white border-[#3fb950] font-semibold shadow-sm'
                              : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:text-[#c9d1d9] hover:bg-[#21262d]'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Terminal Statement */}
                <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-4 font-mono">
                  <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 border-b border-[#30363d] pb-3">
                    <Terminal className="w-4 h-4 text-[#a371f7]" />
                    03 // Developer Manifesto & Past Projects
                  </h3>

                  <div>
                    <Label htmlFor="statement" className="text-xs text-[#8b949e]">
                      Tell us what you love to build, breaking things you fixed, or research you pursue:
                    </Label>
                    <Textarea
                      id="statement"
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      rows={7}
                      required
                      className="mt-2 font-mono text-xs bg-[#0d1117] border-[#30363d] text-[#c9d1d9] leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Cipher Challenge & Protocol Rules */}
              <div className="space-y-6">
                {/* Cryptographic Gatekeeper Challenge */}
                <div className="p-6 rounded-lg bg-[#161b22] border border-[#e3b341]/40 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#e3b341]">
                    <Key className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">Cipher Gatekeeper</span>
                  </div>

                  <p className="text-[#8b949e] font-sans leading-relaxed">
                    Decode this hex string to verify developer intuition:
                  </p>

                  <div className="p-3 rounded bg-[#0d1117] border border-[#30363d] text-center text-sm font-bold text-[#58a6ff] tracking-widest select-all">
                    54 65 61 6D 37
                  </div>

                  <div className="space-y-2">
                    <Input
                      value={cipherInput}
                      onChange={(e) => setCipherInput(e.target.value)}
                      placeholder="Enter decoded string..."
                      className="bg-[#0d1117] border-[#30363d] text-white text-xs"
                    />
                    <Button
                      type="button"
                      onClick={verifyCipher}
                      size="sm"
                      className="w-full bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]"
                    >
                      Verify Cipher
                    </Button>
                  </div>

                  {cipherSolved === true && (
                    <div className="p-2 rounded bg-[#238636]/20 border border-[#238636] text-[#3fb950] text-center font-bold">
                      ✓ Cipher Decrypted: &quot;Team7&quot; (Verified!)
                    </div>
                  )}

                  {cipherSolved === false && (
                    <div className="p-2 rounded bg-[#f85149]/20 border border-[#f85149] text-[#f85149] text-center">
                      ✗ Incorrect. Hint: ASCII Hexadecimal
                    </div>
                  )}
                </div>

                {/* Protocol Rules & Clearance */}
                <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3 font-mono text-xs">
                  <h4 className="font-bold text-white uppercase">Syndicate Rules</h4>
                  <ul className="space-y-2 text-[#8b949e] font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-[#3fb950] font-mono font-bold">01.</span>
                      <span>Never disclose true identity in public channels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3fb950] font-mono font-bold">02.</span>
                      <span>All mainnet commits must be cryptographically signed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3fb950] font-mono font-bold">03.</span>
                      <span>Teach, mentor, and contribute to open-source systems.</span>
                    </li>
                  </ul>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 bg-[#238636] hover:bg-[#2ea043] text-white font-mono font-bold text-sm shadow-lg shadow-[#238636]/25"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Submit Initiate Protocol
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
