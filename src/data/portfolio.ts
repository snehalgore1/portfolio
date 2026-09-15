// ─────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH for Snehal's portfolio.
//  Edit content here - every section reads from this file.
//  Facts sourced from Snehal's resume + GitHub. Do not invent metrics.
// ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceItem {
  company: string;
  context?: string;        // e.g. "Early-Stage InsurTech Startup"
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tech: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;         // one-line, plain English
  featured: boolean;       // shown on home + top of projects
  category: 'Systems' | 'ML Systems' | 'AI / LLM' | 'Tools';
  whatItIs: string;
  whyItMatters: string;
  whatIBuilt: string[];
  outcomes: string[];      // concrete metrics from the resume
  tech: string[];
  github?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  location: string;
  period: string;
  detail?: string;
}

export const profile = {
  name: 'Snehal Gore',
  role: 'AI / ML Engineer',
  // One concise positioning line for the hero.
  positioning:
    'I build and ship production ML systems, from distributed backends to inference runtimes that run on more than a million devices.',
  // A tiny playful technical aside for the hero.
  nowNote: 'Currently: writing CUDA kernels, and learning pickleball.',
  location: 'Los Angeles, CA',
  openToWork: true,
  summary:
    "Software engineer with 2.5+ years shipping production systems, finishing an M.S. in Computer Science (AI) at USC in December 2026. I work across backend services, distributed systems, and AI/ML infrastructure: the kind of work where something real has to run, stay up, and stay fast.",
  email: 'ssgore18@gmail.com',
  phone: '+1 310-462-7354',
  linkedin: 'https://linkedin.com/in/snehal-gore',
  github: 'https://github.com/snehalgore1',
  // Base-aware so it works both in dev ("/") and on GitHub Pages ("/portfolio/").
  resumeFile: `${import.meta.env.BASE_URL}Snehal_Gore_Resume.pdf`, // PDF lives in /public
};

export const nav: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export const experience: ExperienceItem[] = [
  {
    company: 'SnapRefund',
    context: 'Early-Stage InsurTech Startup',
    role: 'Software Engineer Intern',
    location: 'Los Angeles, CA',
    period: 'May 2026 – Aug 2026',
    bullets: [
      'Architected and deployed AiSnap, a production AI microservice using Gemini function calling over live PostgreSQL data spanning 112 ORM entities; exposed database-grounded tools through a NestJS API layer.',
      'Built a validation and grounding pipeline that detected responses lacking query provenance and triggered tool-grounded regeneration, improving reliability for financial queries.',
      'Built and shipped backend features end to end, including database migrations, administrative workflows, and payment-processing logic integrated into the production billing pipeline.',
      'Debugged and shipped features across backend and frontend services through test, staging, and production in a fast-moving startup environment.',
    ],
    tech: ['NestJS', 'PostgreSQL', 'Gemini', 'TypeScript', 'REST APIs'],
  },
  {
    company: 'Whirlpool Corporation',
    role: 'Software Engineer, Machine Learning',
    location: 'Pune, India',
    period: 'Jul 2022 – Dec 2024',
    bullets: [
      'Built and deployed production inference frameworks across 1M+ smart appliances, eliminating $250K+/year in cloud inference costs while delivering 3× lower latency.',
      'Owned production systems end to end: model optimization, automated pipelines, OTA rollouts, field evaluation, and production monitoring; mentored interns on development and deployment.',
      'Built large-scale time-series data and training pipelines on AWS Redshift, reducing dryer Estimated Time Remaining error 7× (from 35 to 5 minutes).',
      'Optimized models for constrained edge hardware with TensorFlow Lite Micro, cutting model size 60% while achieving 99.5% latency-SLA compliance and reducing deployment cycles from days to hours.',
      'Took a computer-vision system from proof-of-concept to production, replacing YOLOv3 with an InceptionV3 grid-based detector for lens-dirtiness classification and improving accuracy 12%.',
      'Shipped OTA model updates across cooking and laundry product lines; ran staged rollouts and A/B evaluations through EFT/CuFT platforms and triaged post-release regressions.',
      "Won 1st place at Whirlpool's internal hackathon for an AI recipe recommendation system delivered through the Android SDK.",
    ],
    tech: ['Python', 'TensorFlow', 'FastAPI', 'AWS SageMaker', 'MLflow', 'TF Lite Micro', 'AWS Redshift'],
  },
];

export const projects: Project[] = [
  {
    id: 'distributed-object-store',
    title: 'Distributed Object Store',
    tagline: 'A cloud-style storage system that keeps files safe and available even when servers crash.',
    featured: true,
    category: 'Systems',
    whatItIs:
      'A distributed, fault-tolerant object store written in C++20 that keeps data available and consistent even when storage nodes fail.',
    whyItMatters:
      'Object stores are the backbone of cloud storage. Building one end to end, including the consensus algorithm, means understanding replication, durability, and failure recovery at the level real systems need.',
    whatIBuilt: [
      'Consistent hashing with 3-way replication and quorum writes, checksum-verified reads, failure detection, and anti-entropy repair across nodes.',
      'A Raft consensus engine from scratch for the metadata control plane: pre-vote elections, persistent replicated logs, majority commit, follower catch-up, and leader failover over gRPC.',
      'Concurrent request handling with bounded thread pools, sharded read/write locks, WAL-backed crash recovery, and atomic fsync/rename writes.',
    ],
    outcomes: [
      '~3.8K requests/sec in distributed benchmarks',
      '131 unit/integration tests + ThreadSanitizer CI',
    ],
    tech: ['C++20', 'gRPC', 'Raft', 'Protobuf', 'SQLite', 'CMake', 'Docker', 'Kubernetes'],
    github: 'https://github.com/snehalgore1/distributed-object-storage',
  },
  {
    id: 'mini-tensorrt',
    title: 'MiniTensorRT',
    tagline: 'Custom software that runs AI language models fast, on both regular processors and GPUs.',
    featured: true,
    category: 'ML Systems',
    whatItIs:
      'A from-scratch C++17 inference runtime that runs GPT-2 (124M) with output parity to HuggingFace, on both CPU and GPU.',
    whyItMatters:
      'Inference cost and latency decide whether a model is usable in production. Writing the runtime by hand exposes exactly where the time and memory go, and how to get them back.',
    whatIBuilt: [
      'Optimized GEMM from 1.7 to 310 GFLOP/s (~180×) with ARM NEON SIMD and multithreading; cut transformer-block latency 56× and memory 12.5× via arena memory planning and operator fusion.',
      'Extended the runtime to CUDA, running GPT-2 in ~22 ms on a Tesla T4.',
      'Implemented FP16 Tensor Core and tiled SGEMM kernels, KV-cache decoding (1.87× speedup), FlashAttention-style online softmax, INT8 quantization, and ONNX model support.',
    ],
    outcomes: [
      '~180× GEMM speedup (1.7 → 310 GFLOP/s)',
      'GPT-2 in ~22 ms on a Tesla T4',
      '56× lower block latency, 12.5× less memory',
    ],
    tech: ['C++17', 'CUDA', 'ARM NEON SIMD', 'CMake', 'ONNX'],
    github: 'https://github.com/snehalgore1/mini-tensorrt',
  },
  {
    id: 'agentic-rag',
    title: 'Agentic RAG & Information Retrieval Platform',
    tagline: 'A search system that gives AI accurate, source-backed answers in under 2 seconds.',
    featured: true,
    category: 'AI / LLM',
    whatItIs:
      'A production-shaped retrieval-augmented-generation platform that indexes thousands of documents and serves grounded, low-latency answers.',
    whyItMatters:
      'RAG is only useful if answers are grounded and fast. This project focuses on retrieval quality and guardrails, not just wiring an LLM to a vector store.',
    whatIBuilt: [
      'End-to-end platform indexing 10K+ documents across 7 containerized services, serving grounded responses at <2s p95 latency.',
      'Hybrid retrieval combining BM25 and dense retrieval with Reciprocal Rank Fusion, improving Recall@10 by 35%.',
      'Adaptive retrieval workflow with relevance grading, query rewriting, retrieval routing, and out-of-domain guardrails.',
    ],
    outcomes: ['<2s p95 latency', '+35% Recall@10', '10K+ documents, 7 services'],
    tech: ['Python', 'LangGraph', 'FastAPI', 'OpenSearch', 'PostgreSQL', 'Redis', 'Airflow', 'Docker'],
    github: 'https://github.com/snehalgore1/agentic-rag',
  },
  {
    id: 'mode',
    title: 'MoDE: Difficulty-Aware Compute for Reasoning Models',
    tagline: 'Makes AI reasoning cheaper by spending extra effort only on the hard questions.',
    featured: true,
    category: 'AI / LLM',
    whatItIs:
      'A framework that predicts, per question, how much thinking effort a large model should spend, so easy questions stop wasting compute.',
    whyItMatters:
      'Reasoning models burn compute uniformly regardless of difficulty. Allocating budget by predicted complexity cuts cost without hurting answers.',
    whatIBuilt: [
      'Fine-tuned a LoRA-adapted Llama-3.2-3B on 484K reasoning traces to predict token budgets, achieving Pearson r=0.809.',
      'An 11-expert Mixture of Difficulty Experts (MoDE) routing architecture that allocates reasoning compute by predicted query complexity.',
    ],
    outcomes: ['Pearson r = 0.809', '−45.3% economic loss vs. instruction-tuned baseline'],
    tech: ['Python', 'PyTorch', 'Llama 3.2-3B', 'HuggingFace', 'LoRA', 'Vertex AI'],
    github: 'https://github.com/snehalgore1/reasoning-budget',
  },
  {
    id: 'efficient-llm',
    title: 'Efficient LLM Inference: INT4 + Mixture-of-Experts',
    tagline: 'Shrinks a large AI model by 60% so it runs on smaller, cheaper hardware.',
    featured: false,
    category: 'ML Systems',
    whatItIs:
      'A study in making LLM inference cheaper: per-group INT4 quantization plus a sparse Mixture-of-Experts on LLaMA 3.2-1B.',
    whyItMatters:
      'Memory footprint gates where a model can run. Quantization and sparsity are the two biggest levers, so I implemented both from the ground up.',
    whatIBuilt: [
      'Per-group INT4 weight-only quantization for LLaMA 3.2-1B via 4-bit weight packing and group-wise scaling, cutting memory 60.6% (2.86 GB → 1.13 GB).',
      'A top-2 Mixture-of-Experts with learned token routing and LoRA fine-tuning, training only 2.23M of 1.50B parameters (0.15%).',
    ],
    outcomes: ['−60.6% memory (2.86 → 1.13 GB)', '9.59 perplexity vs. 9.66 dense, training 0.15% of params'],
    tech: ['Python', 'PyTorch', 'CUDA', 'LLaMA 3.2-1B', 'LoRA'],
    github: 'https://github.com/snehalgore1/Efficient-LLM-Inference',
  },
  {
    id: 'preference-falsification',
    title: 'Preference Falsification in LLM Multi-Agent Networks',
    tagline: 'A study of when AI agents hide their true opinions under social pressure.',
    featured: false,
    category: 'AI / LLM',
    whatItIs:
      'A controlled experiment with many AI agents, studying when they misrepresent their private beliefs under social pressure.',
    whyItMatters:
      'As AI systems with many agents grow, understanding group behavior like conformity and self-censorship matters for reliability and safety.',
    whatIBuilt: [
      'A simulation with 24 Gemini agents across 7 experimental conditions varying social pressure and private information.',
      'Quantitative evaluation measuring a 2.26–2.72 Falsification Gap vs. a 1.32 stochastic baseline; a single whistleblower agent reduced the gap up to 47%.',
    ],
    outcomes: ['24 agents × 7 conditions', 'Whistleblower cut falsification up to 47%'],
    tech: ['Python', 'Gemini', 'Multi-Agent Systems', 'LLM Evaluation'],
    github: 'https://github.com/snehalgore1/Preference-Falsification',
  },
  {
    id: 'cuda-kernels',
    title: 'CUDA Kernel Implementations',
    tagline: 'Hand-optimized GPU code that speeds up the core math behind machine learning.',
    featured: false,
    category: 'ML Systems',
    whatItIs:
      'A set of seven GPU programs (reduction, matrix multiply, tiling, transpose) implemented and benchmarked on an NVIDIA P100.',
    whyItMatters:
      'GPU performance lives and dies on memory access patterns. These kernels make the difference between naive and optimized concrete and measurable.',
    whatIBuilt: [
      'Seven kernels covering parallel reduction, GEMM, 32×32 shared-memory tiling, memory coalescing, and matrix transpose.',
      'Eliminated 32-way shared-memory bank conflicts using padded 32×33 tiles; validated all kernels against CPU reference implementations.',
    ],
    outcomes: ['7 kernels, benchmarked on NVIDIA P100 (USC CARC)'],
    tech: ['CUDA C++', 'NVIDIA P100', 'USC CARC'],
    github: 'https://github.com/snehalgore1/CUDA-Kernel-Implementations',
  },
  {
    id: 'kernel-dataflow',
    title: 'Kernel Design & Dataflow Simulation',
    tagline: 'High-performance math code plus simulations of how AI chips move data.',
    featured: false,
    category: 'ML Systems',
    whatItIs:
      'Custom convolution and matrix-multiply code built as PyTorch extensions, plus simulations of how AI accelerator chips move data around.',
    whyItMatters:
      'Understanding how data moves through a chip is the key to AI hardware performance, so I modeled those dataflows directly.',
    whatIBuilt: [
      'im2col convolution and six custom GEMM kernels as PyTorch C++ extensions, from naive loop orderings to cache-blocked, AVX-vectorized, and multithreaded.',
      'Multiprocessing simulations of weight-, output-, and input-stationary accelerator dataflows, validating each against CPU ground truth.',
    ],
    outcomes: ['6 matrix-multiply kernels benchmarked vs. PyTorch', '3 accelerator dataflows simulated and validated'],
    tech: ['C++', 'Python', 'PyTorch C++ Extensions', 'AVX SIMD', 'Multithreading'],
    github: 'https://github.com/snehalgore1/Kernel-Design-Dataflow-Simulation',
  },
  {
    id: 'transformer-scratch',
    title: 'Transformer from Scratch',
    tagline: 'Built the core architecture behind modern AI (like ChatGPT) from scratch, then trained it to translate.',
    featured: false,
    category: 'AI / LLM',
    whatItIs:
      'A complete encoder-decoder Transformer implemented from scratch in PyTorch and trained for English→Spanish translation.',
    whyItMatters:
      'Building attention, masking, and decoding by hand is the clearest way to actually understand the architecture behind modern LLMs.',
    whatIBuilt: [
      'Multi-head scaled dot-product attention, sinusoidal positional encoding, masked self-attention, cross-attention, feed-forward layers, residuals, and layer norm.',
      'Full training/inference pipeline: custom tokenizer, variable-length batching, causal/source-target masking, and configurable beam search.',
    ],
    outcomes: ['Trained on 20K parallel sentence pairs (USC CARC / Colab)'],
    tech: ['Python', 'PyTorch', 'CUDA/GPU Training', 'NLP'],
    github: 'https://github.com/snehalgore1/Transformer-from-Scratch',
  },
  {
    id: 'greenprompt',
    title: 'GreenPrompt',
    tagline: 'A Chrome extension that rewrites AI prompts to cut cost and energy use.',
    featured: false,
    category: 'Tools',
    whatItIs:
      'A Chrome extension that injects a prompt-optimization workflow into the Gemini web UI and estimates the energy/cost savings.',
    whyItMatters:
      'Small prompt changes add up across millions of queries. GreenPrompt makes the token and energy cost of a prompt visible and actionable.',
    whatIBuilt: [
      'A Chrome extension integrating with Gemini via content scripts, background services, DOM observers, and the Gemini API.',
      'One-click prompt rewriting and evaluation comparing token usage and clarity, plus an impact dashboard built with Chart.js.',
    ],
    outcomes: ['Built at SF Hacks 2026'],
    tech: ['JavaScript', 'Chrome Extension APIs', 'Gemini API', 'Chart.js'],
    github: 'https://github.com/snehalgore1/sfhacks2026-greenprompt',
  },
];

export const education: EducationItem[] = [
  {
    school: 'University of Southern California',
    degree: 'M.S. Computer Science, AI Specialization',
    location: 'Los Angeles, CA',
    period: 'Jan 2025 – Dec 2026 (Expected)',
    detail:
      'Coursework: Analysis of Algorithms, Information Retrieval & Web Search, Hardware Foundations of ML, Machine Learning, Applied NLP, Deep Learning, Foundations of AI.',
  },
  {
    school: 'Savitribai Phule Pune University',
    degree: 'B.E. Computer Engineering',
    location: 'Pune, India',
    period: 'May 2018 – May 2022',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C++', 'Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Systems', items: ['Distributed Systems', 'Multithreading', 'Concurrency', 'gRPC', 'Protobuf', 'Raft', 'CUDA', 'ARM NEON SIMD', 'CMake'] },
  { group: 'Backend & Data', items: ['FastAPI', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'OpenSearch', 'MySQL', 'REST APIs'] },
  { group: 'Cloud & Infra', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Airflow', 'Pulumi'] },
  { group: 'ML Systems', items: ['PyTorch', 'TensorFlow', 'ONNX', 'MLflow', 'SageMaker', 'Quantization'] },
];

// Personality: subtle, never the main content. Only what the brief allows.
export const personal = {
  heading: 'Besides work, I like doing these things',
  sports: [
    { label: 'Soccer', note: 'since I was 14', icon: 'soccer' },
    { label: 'Table tennis', note: 'a longtime favorite', icon: 'pingpong' },
    { label: 'Pickleball', note: 'learning, about a year in', icon: 'pickleball' },
  ],
  cooking:
    'I cook a lot, and I like treating recipes the way I treat systems: experimenting, combining ingredients from different cuisines, and iterating until it works.',
};
