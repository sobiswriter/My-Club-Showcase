export interface Member {
  id: string;
  codename: string;
  callsign: string;
  clearanceLevel: 'LEVEL 5 - ARCHITECT' | 'LEVEL 4 - OPERATIVE' | 'LEVEL 3 - SENTINEL' | 'LEVEL 2 - APPRENTICE';
  specialization: string;
  avatarSeed: string;
  bio: string;
  status: 'ACTIVE' | 'STEALTH' | 'ENCRYPTED' | 'STANDBY';
  gpgFingerprint: string;
  skills: string[];
  points: number;
  contributions: number;
  completedOps: number;
  assignedUnit: string;
  joinedEpoch: string;
  socials: {
    github: string;
    signal?: string;
    matrix?: string;
  };
  missions: string[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  clearance: 'UNRESTRICTED' | 'CONFIDENTIAL' | 'TOP-SECRET';
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  status: 'Production' | 'Active Development' | 'Classified' | 'Archived';
  updatedAt: string;
  version: string;
  license: string;
  topics: string[];
  authorCodename: string;
  imageUrl: string;
  dataAiHint: string;
  readme: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface OperationEvent {
  id: number;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'CTF Operation' | 'Briefing' | 'Code Jam';
  status: 'Open' | 'Classified' | 'Completed';
  date: string;
  time: string;
  location: string;
  authorCodename: string;
  clearanceRequired: string;
  participants: number;
  maxParticipants: number;
  description: string;
  rewards: string;
  tags: string[];
}

export interface FieldLog {
  id: number;
  title: string;
  filename: string;
  authorCodename: string;
  authorAvatarSeed: string;
  description: string;
  publishedAt: string;
  readTime: string;
  stars: number;
  comments: number;
  tags: string[];
  code: string;
  language: string;
}

export interface Bounty {
  id: string;
  title: string;
  rewardPoints: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'NIGHTMARE';
  category: 'Reverse Eng' | 'Zero-Knowledge' | 'Infra' | 'Kernel' | 'AI Models';
  description: string;
  claimedBy?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLAIMED';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlockedCount: number;
  tierColor: string;
}

export const members: Member[] = [
  {
    id: 'op-001',
    codename: 'ZERO-DAY',
    callsign: 'NullPointer',
    clearanceLevel: 'LEVEL 5 - ARCHITECT',
    specialization: 'Kernel Exploitation & Low-Level Systems',
    avatarSeed: 'zeroday',
    bio: 'Lead Architect of Team7. Specialized in eBPF kernel tracing, memory safety bypass mitigation, and zero-overhead microkernels.',
    status: 'ACTIVE',
    gpgFingerprint: '9B2A 4C8E 11F0 33D9 778A E801 4B22 90CC',
    skills: ['Rust', 'C/C++', 'eBPF', 'Assembly x86_64', 'Linux Kernel', 'QEMU'],
    points: 3840,
    contributions: 1420,
    completedOps: 28,
    assignedUnit: 'Cybernetic Core Architecture',
    joinedEpoch: 'Epoch 1.0 (Founder)',
    socials: { github: 'nullpointer-sec', matrix: '@zeroday:team7.mesh' },
    missions: ['Operation Chimera Core', 'Project Memory Shield', 'Decentralized Mesh Node v2']
  },
  {
    id: 'op-002',
    codename: 'CIPHER-07',
    callsign: 'GhostByte',
    clearanceLevel: 'LEVEL 5 - ARCHITECT',
    specialization: 'Post-Quantum Cryptography & Zero-Knowledge',
    avatarSeed: 'cipher07',
    bio: 'Architect in zero-knowledge proof generation and lattice-based cryptography. Guardian of club secure communication channels.',
    status: 'ACTIVE',
    gpgFingerprint: '4F92 B7A1 33C8 DD10 8821 00FA 7C39 12B8',
    skills: ['Circom', 'Rust', 'ZK-SNARKs', 'Elliptic Curves', 'Go', 'Halo2'],
    points: 3420,
    contributions: 1180,
    completedOps: 24,
    assignedUnit: 'Cryptographic Protocol Division',
    joinedEpoch: 'Epoch 1.0 (Founder)',
    socials: { github: 'ghostbyte-zk', matrix: '@cipher07:team7.mesh' },
    missions: ['Zero-Knowledge Identity Relayer', 'Post-Quantum Key Exchange Protocol']
  },
  {
    id: 'op-003',
    codename: 'NEON-VIPER',
    callsign: 'Vortex-X',
    clearanceLevel: 'LEVEL 4 - OPERATIVE',
    specialization: 'Autonomous Neural Agents & Swarm Systems',
    avatarSeed: 'neonviper',
    bio: 'Pioneering decentralized AI swarm intelligence and on-device neural quantized models. Builds autonomous consensus bots.',
    status: 'ACTIVE',
    gpgFingerprint: '7D11 80F2 AA49 2210 99BB CF18 31E4 66A7',
    skills: ['PyTorch', 'TypeScript', 'CUDA', 'Wasm', 'Distributed ML', 'Python'],
    points: 2950,
    contributions: 940,
    completedOps: 19,
    assignedUnit: 'Autonomous Intelligence Cell',
    joinedEpoch: 'Epoch 2.1',
    socials: { github: 'vortex-neural', matrix: '@neonviper:team7.mesh' },
    missions: ['Swarm Consensus Alpha', 'Neural Audio Hyperspeed Synthesizer']
  },
  {
    id: 'op-004',
    codename: 'OBSIDIAN-9',
    callsign: 'ShadowRoot',
    clearanceLevel: 'LEVEL 4 - OPERATIVE',
    specialization: 'Distributed Systems & Mesh Infrastructure',
    avatarSeed: 'obsidian9',
    bio: 'Architect behind Team7 high-availability peer-to-peer relay clusters and dark-fiber routing nodes. Zero downtime zealot.',
    status: 'STEALTH',
    gpgFingerprint: '11A8 39E4 C002 994F 55D1 E308 88A9 45F1',
    skills: ['Go', 'Kubernetes', 'BGP Routing', 'gRPC', 'PostgreSQL', 'WireGuard'],
    points: 2680,
    contributions: 890,
    completedOps: 17,
    assignedUnit: 'Stealth Infrastructure Grid',
    joinedEpoch: 'Epoch 2.3',
    socials: { github: 'shadowroot-mesh', matrix: '@obsidian9:team7.mesh' },
    missions: ['High-Throughput Gossip Relayer', 'Operation Global Edge Tunnel']
  },
  {
    id: 'op-005',
    codename: 'PHANTOM-HEX',
    callsign: 'ByteWarlock',
    clearanceLevel: 'LEVEL 4 - OPERATIVE',
    specialization: 'Reverse Engineering & Vulnerability Research',
    avatarSeed: 'phantomhex',
    bio: 'Decompiles binary targets, unpacks proprietary protocols, and constructs proof-of-concept mitigation payloads.',
    status: 'ACTIVE',
    gpgFingerprint: 'AA33 99B1 F004 88C1 22E4 56A1 D889 0042',
    skills: ['Ghidra', 'IDA Pro', 'C', 'Radare2', 'Binary Instrumentation', 'Python'],
    points: 2410,
    contributions: 780,
    completedOps: 15,
    assignedUnit: 'Vulnerability Defense Unit',
    joinedEpoch: 'Epoch 2.5',
    socials: { github: 'bytewarlock-re', matrix: '@phantomhex:team7.mesh' },
    missions: ['Operation HexBreaker', 'Firmware Disassembly Framework']
  },
  {
    id: 'op-006',
    codename: 'KRYPTON-X',
    callsign: 'QuantumEcho',
    clearanceLevel: 'LEVEL 3 - SENTINEL',
    specialization: 'Quantum Algorithms & High-Performance Compute',
    avatarSeed: 'kryptonx',
    bio: 'Simulates quantum tensor networks, develops algebraic state solvers, and accelerates matrix pipelines with AVX-512 & WebGPU.',
    status: 'STANDBY',
    gpgFingerprint: '55E1 00A9 77B4 33F2 88C0 19A2 BE44 5590',
    skills: ['C++', 'WebGPU', 'Julia', 'SIMD', 'OpenMP', 'Rust'],
    points: 1980,
    contributions: 630,
    completedOps: 12,
    assignedUnit: 'Quantum Compute Simulation',
    joinedEpoch: 'Epoch 3.0',
    socials: { github: 'quantumecho-hpc', matrix: '@kryptonx:team7.mesh' },
    missions: ['Matrix Tensor Hyper-Acceleration', 'Quantum State Emulator']
  },
  {
    id: 'op-007',
    codename: 'GLITCH-WEAVER',
    callsign: 'Synapse',
    clearanceLevel: 'LEVEL 3 - SENTINEL',
    specialization: 'Creative Computing & WebGL Shaders',
    avatarSeed: 'glitchweaver',
    bio: 'Crafts real-time procedural graphics, WebGL/Three.js visualizers, dynamic hyperspeed tunnels, and terminal user interfaces.',
    status: 'ACTIVE',
    gpgFingerprint: 'CC88 12F4 00E9 99A1 44D3 77B2 98E0 112A',
    skills: ['Three.js', 'GLSL Shaders', 'TypeScript', 'Tailwind', 'Canvas2D', 'React'],
    points: 1850,
    contributions: 610,
    completedOps: 11,
    assignedUnit: 'Visual Matrix & Cyber Interfaces',
    joinedEpoch: 'Epoch 3.1',
    socials: { github: 'synapse-visual', matrix: '@glitchweaver:team7.mesh' },
    missions: ['Hyperspeed Warp Renderer', 'Team7 Terminal Canvas Suite']
  },
  {
    id: 'op-008',
    codename: 'SPECTRE-01',
    callsign: 'Chronos',
    clearanceLevel: 'LEVEL 3 - SENTINEL',
    specialization: 'Hardware Security & Embedded Firmware',
    avatarSeed: 'spectre01',
    bio: 'Specialized in microcontroller exploitation, logic analyzers, side-channel power analysis, and FPGA synthesis.',
    status: 'ENCRYPTED',
    gpgFingerprint: 'EE44 88A1 99B2 0014 33C7 55D9 AA12 8871',
    skills: ['Verilog', 'Embedded C', 'Rust', 'JTAG / SWD', 'FPGA', 'KiCad'],
    points: 1720,
    contributions: 540,
    completedOps: 10,
    assignedUnit: 'Hardware & Silicon Research',
    joinedEpoch: 'Epoch 3.2',
    socials: { github: 'chronos-silicon', matrix: '@spectre01:team7.mesh' },
    missions: ['Secure Hardware Enclave v1', 'CAN Bus Cyber Injector']
  }
];

export const projects: Project[] = [
  {
    id: 'repo-001',
    name: 'hyperspeed-warp-core',
    slug: 'hyperspeed-warp-core',
    description: 'High-performance Three.js & GLSL post-processing relativistic warp tunnel with interactive light-trail distortions.',
    clearance: 'UNRESTRICTED',
    language: 'TypeScript',
    languageColor: 'bg-[#3178c6]',
    stars: 512,
    forks: 64,
    status: 'Production',
    updatedAt: '22 minutes ago',
    version: 'v3.2.0-stable',
    license: 'MIT',
    topics: ['threejs', 'glsl-shaders', 'webgl', 'interactive-canvas', 'hyperspeed'],
    authorCodename: 'GLITCH-WEAVER',
    imageUrl: 'https://placehold.co/800x500/0d1117/58a6ff?text=Hyperspeed+Warp+Core',
    dataAiHint: 'hyperspeed relativistic tunnel interface',
    readme: `# Hyperspeed Warp Core

Ultra-responsive relativistic space distortion engine constructed with Three.js, raw GLSL fragment shaders, and postprocessing pipelines.

### Features
- Real-time turbulent curvature distortions
- Customizable particle velocity and car-light trail vectors
- Interactive hold-to-accelerate kinetic physics
- Optimized for 60+ FPS on mobile & desktop WebGL2

\`\`\`bash
git clone https://github.com/team7-syndicate/hyperspeed-warp-core.git
npm install
npm run dev
\`\`\`
`,
    codeSnippet: {
      filename: 'warp-physics.glsl',
      language: 'glsl',
      code: `uniform float uTime;
uniform float uSpeed;
uniform vec2 uDistortion;

varying vec2 vUv;

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    float angle = atan(p.y, p.x);
    
    // Relativistic relativistic contraction
    float warp = 1.0 / (1.0 + r * uSpeed * 0.4);
    vec3 color = vec3(sin(angle * 4.0 + uTime * 2.0), cos(r * 10.0 - uTime * 5.0), 1.0);
    
    gl_FragColor = vec4(color * warp, 1.0);
}`
    }
  },
  {
    id: 'repo-002',
    name: 'ebpf-threat-sentinel',
    slug: 'ebpf-threat-sentinel',
    description: 'Kernel-space eBPF security daemon monitoring syscall anomalies, memory injection, and unauthorized socket bindings.',
    clearance: 'TOP-SECRET',
    language: 'Rust',
    languageColor: 'bg-[#dea584]',
    stars: 780,
    forks: 92,
    status: 'Production',
    updatedAt: '3 hours ago',
    version: 'v1.8.4',
    license: 'Apache-2.0',
    topics: ['ebpf', 'rust', 'kernel-security', 'zero-overhead', 'threat-detection'],
    authorCodename: 'ZERO-DAY',
    imageUrl: 'https://placehold.co/800x500/0d1117/3fb950?text=eBPF+Threat+Sentinel',
    dataAiHint: 'kernel security monitor code dashboard',
    readme: `# eBPF Threat Sentinel

Zero-overhead Linux kernel security daemon. Attaches probe points to \`sys_enter_execve\`, \`security_socket_connect\`, and \`ptrace\` syscalls.

### Architecture
- User space telemetry pipeline in Rust (Tokio async engine)
- Ring-buffer data transfer with zero memory allocations
- Instant anomalous PID containment via cgroups v2
`,
    codeSnippet: {
      filename: 'sentinel_probe.rs',
      language: 'rust',
      code: `#[kprobe(name="sys_enter_execve")]
pub fn handle_execve(ctx: ProbeContext) -> u32 {
    let pid = ctx.pid();
    let comm = ctx.command_name();
    
    if is_untrusted_binary(&comm) {
        alert_sentinel_ring_buffer(pid, Severity::Critical);
        contain_pid_cgroup(pid);
    }
    0
}`
    }
  },
  {
    id: 'repo-003',
    name: 'zk-mesh-identity',
    slug: 'zk-mesh-identity',
    description: 'Zero-Knowledge cryptographic authentication protocol allowing anonymous verification without exposing keys or metadata.',
    clearance: 'CONFIDENTIAL',
    language: 'Circom',
    languageColor: 'bg-[#a371f7]',
    stars: 640,
    forks: 88,
    status: 'Active Development',
    updatedAt: 'yesterday',
    version: 'v0.9.1-beta',
    license: 'GPL-3.0',
    topics: ['zkp', 'cryptography', 'circom', 'privacy', 'snark-proofs'],
    authorCodename: 'CIPHER-07',
    imageUrl: 'https://placehold.co/800x500/0d1117/a371f7?text=ZK+Mesh+Identity',
    dataAiHint: 'cryptographic zero knowledge proof visual',
    readme: `# ZK-Mesh Identity Protocol

Proves membership in Team7 without disclosing user identifiers, public keys, or transaction history.

### Verification Flow
1. Prover generates cryptographic witness via Groth16.
2. Relayer validates proof off-chain in < 12ms.
3. Access token granted for peer-to-peer encrypted mesh.
`,
    codeSnippet: {
      filename: 'identity_proof.circom',
      language: 'circom',
      code: `template VerifyClubMembership(nLevels) {
    signal input root;
    signal input secretKey;
    signal input pathElements[nLevels];
    signal output isValid;
    
    component hasher = Poseidon(2);
    hasher.inputs[0] <== secretKey;
    hasher.inputs[1] <== 0x7E4A7;
    
    component treeChecker = MerkleProof(nLevels);
    treeChecker.leaf <== hasher.out;
    treeChecker.root <== root;
    isValid <== treeChecker.valid;
}`
    }
  },
  {
    id: 'repo-004',
    name: 'autonomous-swarm-kernel',
    slug: 'autonomous-swarm-kernel',
    description: 'Decentralized swarm coordination engine for AI micro-agents utilizing Byzantine consensus and vector clustering.',
    clearance: 'CONFIDENTIAL',
    language: 'Python',
    languageColor: 'bg-[#3572A5]',
    stars: 490,
    forks: 57,
    status: 'Active Development',
    updatedAt: '2 days ago',
    version: 'v2.0.0-rc1',
    license: 'MIT',
    topics: ['ai-agents', 'swarm-intelligence', 'p2p-consensus', 'neural-clustering'],
    authorCodename: 'NEON-VIPER',
    imageUrl: 'https://placehold.co/800x500/0d1117/f0883e?text=Autonomous+Swarm+Kernel',
    dataAiHint: 'swarm intelligence neural nodes graph',
    readme: `# Autonomous Swarm Kernel

Coordinates distributed AI agents across heterogeneous compute nodes. Supports dynamic agent task delegation, shared memory embeddings, and leaderless consensus.
`,
    codeSnippet: {
      filename: 'swarm_node.py',
      language: 'python',
      code: `class SwarmNode:
    def __init__(self, node_id: str, vector_dim: int = 1536):
        self.node_id = node_id
        self.peer_table = P2PRoutingTable()
        self.embedding_memory = VectorRingBuffer(dim=vector_dim)

    async def broadcast_intent(self, task_payload: dict):
        encrypted_task = self.cipher.seal(task_payload)
        await self.peer_table.gossip_multicast(encrypted_task)
`
    }
  },
  {
    id: 'repo-005',
    name: 'stealth-mesh-router',
    slug: 'stealth-mesh-router',
    description: 'High-throughput UDP packet multiplexer with onion routing layers and automatic WireGuard handshake rotations.',
    clearance: 'TOP-SECRET',
    language: 'Go',
    languageColor: 'bg-[#00ADD8]',
    stars: 375,
    forks: 41,
    status: 'Production',
    updatedAt: '4 days ago',
    version: 'v1.4.2',
    license: 'MPL-2.0',
    topics: ['golang', 'networking', 'onion-routing', 'wireguard', 'p2p-mesh'],
    authorCodename: 'OBSIDIAN-9',
    imageUrl: 'https://placehold.co/800x500/0d1117/00ADD8?text=Stealth+Mesh+Router',
    dataAiHint: 'network routing nodes map',
    readme: `# Stealth Mesh Router

Multiplexes arbitrary TCP/UDP traffic across multi-hop peer relay routes with zero persistent state stored on intermediate hops.
`,
    codeSnippet: {
      filename: 'onion_hop.go',
      language: 'go',
      code: `func (m *MeshRelay) ForwardHop(ctx context.Context, packet []byte) error {
    layer, nextHop, err := m.peelOnionLayer(packet)
    if err != nil {
        return fmt.Errorf("decryption failure: %w", err)
    }
    return m.udpConn.SendTo(nextHop, layer)
}`
    }
  },
  {
    id: 'repo-006',
    name: 'ghidra-decompiler-ai-lens',
    slug: 'ghidra-decompiler-ai-lens',
    description: 'Ghidra plugin translating raw disassembled control-flow graphs into structured pseudo-code using local LLM inference.',
    clearance: 'UNRESTRICTED',
    language: 'C++',
    languageColor: 'bg-[#f34b7d]',
    stars: 620,
    forks: 73,
    status: 'Production',
    updatedAt: '5 days ago',
    version: 'v2.1.0',
    license: 'MIT',
    topics: ['ghidra', 'reverse-engineering', 'binary-analysis', 'decompilation', 'cpp'],
    authorCodename: 'PHANTOM-HEX',
    imageUrl: 'https://placehold.co/800x500/0d1117/f34b7d?text=Ghidra+AI+Lens',
    dataAiHint: 'reverse engineering binary graph',
    readme: `# Ghidra Decompiler AI Lens

Transforms complex stripped binaries and obfuscated assembly into clear, annotated high-level C/Rust structures.
`
  }
];

export const operations: OperationEvent[] = [
  {
    id: 101,
    title: 'OP #101: Global Zero-Day CTF Defense Operation',
    type: 'CTF Operation',
    status: 'Open',
    date: '2026-09-12',
    time: '18:00 UTC - 48H Marathon',
    location: 'Encrypted Matrix War Room / Discord Voice',
    authorCodename: 'ZERO-DAY',
    clearanceRequired: 'LEVEL 2+ (All Initiates Welcome)',
    participants: 48,
    maxParticipants: 64,
    description: 'Team7 defensive security squad takes on the international cyber warfare CTF. Tracks in Binary Exploitation, Web3 Cryptanalysis, Reverse Engineering, and Hardware Hacking.',
    rewards: '500 XP Points + "CTF Veteran" Badge + Secret Repository Access',
    tags: ['ctf', 'binary-exploit', 'cryptography', 'team-competition']
  },
  {
    id: 102,
    title: 'OP #102: Workshop: Kernel Tracing & eBPF Security Deep-Dive',
    type: 'Workshop',
    status: 'Open',
    date: '2026-09-18',
    time: '19:30 UTC - 2.5 Hours',
    location: 'Virtual Mesh Stream & Live Terminal Studio',
    authorCodename: 'ZERO-DAY',
    clearanceRequired: 'UNRESTRICTED',
    participants: 82,
    maxParticipants: 100,
    description: 'Hands-on practical workshop writing real-time kernel probes in Rust with Aya/BCC. Learn how to monitor suspicious syscalls with sub-microsecond overhead.',
    rewards: '250 XP Points + eBPF Sentinel Certificate',
    tags: ['rust', 'ebpf', 'linux-kernel', 'systems-programming']
  },
  {
    id: 103,
    title: 'OP #103: Hackathon: Autonomous Agent Swarm Jam 2026',
    type: 'Hackathon',
    status: 'Open',
    date: '2026-09-26',
    time: '00:00 UTC - 72 Hours',
    location: 'Global Asynchronous / Matrix Hub',
    authorCodename: 'NEON-VIPER',
    clearanceRequired: 'UNRESTRICTED',
    participants: 120,
    maxParticipants: 150,
    description: 'Build collaborative AI agents that solve multi-step algorithmic challenges or execute autonomous cyber security protocols without human intervention.',
    rewards: '1000 XP Bounty Pool + Featured Showcase on Team7 Mainnet',
    tags: ['hackathon', 'ai-agents', 'distributed-systems', 'bounty']
  },
  {
    id: 104,
    title: 'OP #104: Briefing: Post-Quantum Cryptography & Lattice Schemes',
    type: 'Briefing',
    status: 'Completed',
    date: '2026-08-10',
    time: '20:00 UTC',
    location: 'Encrypted Voice Relay',
    authorCodename: 'CIPHER-07',
    clearanceRequired: 'LEVEL 3 - SENTINEL',
    participants: 45,
    maxParticipants: 50,
    description: 'Technical teardown of Kyber and Dilithium NIST standards, side-channel vulnerabilities, and hardware implementation constraints.',
    rewards: '150 XP Points + Cryptography Badge',
    tags: ['post-quantum', 'kyber', 'cryptography', 'zero-knowledge']
  }
];

export const fieldLogs: FieldLog[] = [
  {
    id: 1,
    title: 'Bypassing Memory Constraints with eBPF Ring Buffers in Rust',
    filename: 'ebpf_ringbuffer_zero_copy.rs',
    authorCodename: 'ZERO-DAY',
    authorAvatarSeed: 'zeroday',
    description: 'A comprehensive engineering write-up on constructing lockless ring-buffers between Linux kernel space and user-space telemetry daemons in Rust.',
    publishedAt: 'Aug 22, 2026',
    readTime: '6 min read',
    stars: 89,
    comments: 18,
    tags: ['Rust', 'eBPF', 'Kernel', 'Performance'],
    language: 'Rust',
    code: `// Lockless kernel to userspace event streaming
#[repr(C)]
pub struct ThreatEvent {
    pub timestamp_ns: u64,
    pub pid: u32,
    pub uid: u32,
    pub filename: [u8; 64],
}

#[map]
static mut EVENTS: RingBuffer = RingBuffer::pinned(1024 * 64, 0);

#[kprobe]
pub fn trace_sys_execve(ctx: ProbeContext) -> u32 {
    let mut entry = EVENTS.reserve::<ThreatEvent>()?;
    entry.timestamp_ns = bpf_ktime_get_ns();
    entry.pid = ctx.pid();
    entry.submit(0);
    0
}`
  },
  {
    id: 2,
    title: 'Constructing Non-Interactive Zero-Knowledge Identity Circuits',
    filename: 'zk_identity_circuit.circom',
    authorCodename: 'CIPHER-07',
    authorAvatarSeed: 'cipher07',
    description: 'Step-by-step mathematical guide to Poseidon hashing and Merkle tree inclusion verification in under 12,000 arithmetic constraints.',
    publishedAt: 'Aug 14, 2026',
    readTime: '9 min read',
    stars: 124,
    comments: 32,
    tags: ['ZKP', 'Circom', 'Mathematics', 'Privacy'],
    language: 'Circom',
    code: `pragma circom 2.1.0;

template AnonymitySetVerifier(depth) {
    signal input leafHash;
    signal input path[depth];
    signal input pathIndices[depth];
    signal output root;

    // Merkle tree verification logic...
    component selectors[depth];
    component hashers[depth];
    
    signal currentHash[depth + 1];
    currentHash[0] <== leafHash;
    
    for (var i = 0; i < depth; i++) {
        selectors[i] = DualMux();
        selectors[i].in[0] <== currentHash[i];
        selectors[i].in[1] <== path[i];
        selectors[i].s <== pathIndices[i];
        
        hashers[i] = Poseidon(2);
        hashers[i].inputs[0] <== selectors[i].out[0];
        hashers[i].inputs[1] <== selectors[i].out[1];
        
        currentHash[i + 1] <== hashers[i].out;
    }
    
    root <== currentHash[depth];
}`
  },
  {
    id: 3,
    title: 'GPU Shader Magic: Generating Relativistic Warp Curvature in Three.js',
    filename: 'hyperspeed_shader_vertex.glsl',
    authorCodename: 'GLITCH-WEAVER',
    authorAvatarSeed: 'glitchweaver',
    description: 'How to build mathematically accurate light streak bending with custom Three.js mesh instances and vertex shader deformations.',
    publishedAt: 'Aug 04, 2026',
    readTime: '5 min read',
    stars: 215,
    comments: 47,
    tags: ['Three.js', 'GLSL', 'WebGL', 'Creative Coding'],
    language: 'GLSL',
    code: `uniform vec2 uDistortion;
uniform float uSpeed;
uniform float uTime;

vec3 getDistortion(float z) {
    float x = sin(z * uDistortion.x + uTime * 0.5) * 4.0;
    float y = cos(z * uDistortion.y + uTime * 0.3) * 2.5;
    return vec3(x, y, 0.0);
}

void main() {
    vec3 transformed = position;
    vec3 distortion = getDistortion(transformed.z);
    transformed += distortion;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}`
  }
];

export const bounties: Bounty[] = [
  {
    id: 'BNT-801',
    title: 'Implement SIMD AVX-512 matrix acceleration in Rust for Quantum Tensor Engine',
    rewardPoints: 600,
    difficulty: 'HARD',
    category: 'Kernel',
    description: 'Optimize tensor dot-product calculation using target_feature="avx512f" intrinsics to achieve < 1.2ns per cell.',
    status: 'OPEN'
  },
  {
    id: 'BNT-802',
    title: 'Write Groth16 Verifier in Pure WebAssembly with zero JS glue overhead',
    rewardPoints: 450,
    difficulty: 'MEDIUM',
    category: 'Zero-Knowledge',
    description: 'Package arkworks-rs curve pairing operations into a standalone < 80KB wasm artifact for client-side proof checks.',
    status: 'IN_PROGRESS',
    claimedBy: 'CIPHER-07'
  },
  {
    id: 'BNT-803',
    title: 'Reverse engineer proprietary IoT radio firmware packet structure',
    rewardPoints: 850,
    difficulty: 'NIGHTMARE',
    category: 'Reverse Eng',
    description: 'Extract symmetric encryption keys from obfuscated ARM Cortex-M4 binary and document RF packet headers.',
    status: 'OPEN'
  },
  {
    id: 'BNT-804',
    title: 'Build automated CI fuzzing harness for mesh routing multiplexer',
    rewardPoints: 300,
    difficulty: 'EASY',
    category: 'Infra',
    description: 'Implement libFuzzer / cargo-fuzz tests targeting UDP packet unmarshaling edge cases.',
    status: 'CLAIMED',
    claimedBy: 'OBSIDIAN-9'
  }
];

export const badges: AchievementBadge[] = [
  {
    id: 'badge-01',
    title: 'Kernel Breaker',
    description: 'Authored an accepted low-level system patch or eBPF probe.',
    icon: 'Terminal',
    rarity: 'Legendary',
    unlockedCount: 3,
    tierColor: 'border-yellow-500/60 text-yellow-400 bg-yellow-950/30'
  },
  {
    id: 'badge-02',
    title: 'Zero-Knowledge Pioneer',
    description: 'Constructed an audited arithmetic circuit with verified proofs.',
    icon: 'ShieldCheck',
    rarity: 'Epic',
    unlockedCount: 5,
    tierColor: 'border-purple-500/60 text-purple-400 bg-purple-950/30'
  },
  {
    id: 'badge-03',
    title: 'Warp Speed Pilot',
    description: 'Pushed Three.js visual pipelines past 60fps relativistic benchmark.',
    icon: 'Zap',
    rarity: 'Rare',
    unlockedCount: 8,
    tierColor: 'border-cyan-500/60 text-cyan-400 bg-cyan-950/30'
  },
  {
    id: 'badge-04',
    title: 'Night Owl Operative',
    description: 'Over 100 verified commits pushed between 02:00 and 06:00 UTC.',
    icon: 'Moon',
    rarity: 'Common',
    unlockedCount: 14,
    tierColor: 'border-green-500/60 text-green-400 bg-green-950/30'
  },
  {
    id: 'badge-05',
    title: 'CTF Top Fragger',
    description: 'Captured first-blood flags in 3 or more international security CTFs.',
    icon: 'Trophy',
    rarity: 'Legendary',
    unlockedCount: 4,
    tierColor: 'border-amber-500/60 text-amber-400 bg-amber-950/30'
  }
];

export const clubStats = {
  activeOperatives: 16,
  totalCommits: 4892,
  repositories: 24,
  opsCompleted: 38,
  networkBandwidth: '42.8 TB/mo',
  linesOfCode: '1.24M',
  gpgVerifiedRatio: '100%',
  uptime: '99.98%'
};
