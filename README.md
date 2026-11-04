# ⚡ learn-here

> **Master Modern Software Engineering, Distributed Systems & Applied AI**

`learn-here` is an exhaustive, self-contained technology learning and knowledge hub designed to help developers level up their engineering capabilities, navigate career progression from Junior to Staff/Principal, and master modern systems.

---

## 🌟 Core Pillars & Modules

### 1. 🧭 Career Progression by Levels (Junior to Principal/Staff)
- **Hierarchy:** Junior (L1/L2), Mid-Level (L3), Senior (L4/L5), Staff / Principal (L6/L7+).
- **Global Market Expectations:** Compensation benchmarks (Global Tier 1), real-world day-in-the-life schedules, and engineering workflows (Trunk-based dev, RFC / ADR process, zero-downtime DB migrations, on-call incident response).
- **Production Code Standards:** Side-by-side production code patterns illustrating how code quality scales from entry-level to staff-level fault tolerance.
- **Interactive Promotion Checklist:** Real-time readiness tracker with anti-patterns and career pitfalls.
- **Seniority Diagnostic Quiz:** Interactive 3-question diagnostic assessment that calculates current engineering seniority and pinpoints growth gaps.

### 2. 💻 Deep-Dive Language & Technology Catalog
End-to-end, production-grade breakdowns with zero summaries and zero placeholders:
- **TypeScript & Modern JavaScript:** V8 hidden classes, AST optimization, discriminated unions, template literal types, and defensive schema parsing.
- **Python 3.12+ Ecosystem:** Free-Threaded mode (PEP 703 - No-GIL), TaskGroup structured concurrency, UV package management, and FastAPI.
- **Go (Golang):** GMP scheduler mechanics, CSP channel concurrency, worker pools, and low-latency garbage collection pacing.
- **Rust Systems Programming:** Ownership, borrow checker (Polonius), RAII, Tokio async runtime, and zero-cost abstractions.
- **Docker & Kubernetes:** Linux namespaces & cgroups v2, multi-stage minimal distroless builds, rolling deployment strategies, topology spread constraints, and liveness/readiness probes.
- **Apache Kafka & Event-Driven Architecture:** Commit log internals, zero-copy `sendfile` I/O, partition key ordering, and transactional outbox patterns.
- **PostgreSQL & Redis Data Architecture:** MVCC & Autovacuum, B-Tree index optimization, Redis single-threaded event loop, and distributed redlocks.
- **Linux Internals, Systems & eBPF:** Virtual memory TLBs, non-blocking `epoll`, and live incident diagnosis commands.

### 3. ✨ Everything About Artificial Intelligence
- **Fundamentals:** High-dimensional vector spaces, token embeddings, Scaled Dot-Product Attention, and RoPE.
- **LLM Architecture & Quantization:** Pre-training, SFT, DPO alignment, and post-training quantization (AWQ, GGUF, GPTQ) with vLLM continuous batching.
- **AI Agents & Tool Calling:** ReAct loop (Thought, Action, Observation), OpenAPI tool calling, and multi-agent LangGraph orchestration.
- **Advanced RAG & Vector Databases:** Semantic chunking, Hybrid search (BM25 + Dense vector retrieval), Reciprocal Rank Fusion (RRF), and Cross-Encoder re-ranking.
- **Interactive Simulations:** Live Hybrid RAG simulator and ReAct Agent Step-by-Step loop visualizer.
- **Developer Tooling & Protocols:** Model Context Protocol (MCP) servers, agentic IDEs, and local Ollama clusters.
- **Applied Workflows & Evals:** LLM-as-a-Judge automated CI/CD testing suites and Ragas evaluation metrics.

### 4. 📈 What's Trending (2026 Ecosystem Shifts)
- **Local-First & CRDTs:** SQLite in OPFS, zero-latency mutations, and PN-Counter convergence.
- **The Rustification of Tooling:** Biome, UV, Turbopack, and Ruff replacing interpreted toolchains.
- **WebAssembly (WASM) & WASI:** Micro-isolate sandboxes booting in under 5ms at the edge.
- **Durable Execution:** Temporal and Inngest workflows-as-code eliminating distributed state bugs.

### 5. 🎓 University-Grade Learning Tracks
- Curricula inspired by **MIT 6.824** (Distributed Systems & Consensus) and **CMU 15-445** (Database Storage Engines).
- Complete with concrete lab starters, self-assessment review questions with toggleable answers, and capstone project specifications.

### 6. 💼 Recruiter & Technical Interview Preparation
- **Recruiter Phone Screen:** Behavioral frameworks, STAR breakdown, salary negotiation strategies, and what recruiters are really listening for.
- **System Design Screenings:** Scalable URL shortener, global real-time chat, Base62 encoding, and capacity estimations.
- **DSA Coding Interview:** Thread-safe O(1) LRU Cache paired with Doubly Linked List and Hash Table.
- **Confidence Rating System:** Rate your readiness per question and build a custom study queue.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node v22)
- npm or pnpm

### Installation & Run

```bash
# 1. Clone repository
git clone git@github.com:amorimdani/learn-here.git
cd learn-here

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## ⌨️ Keyboard Shortcuts
- `/` or `⌘K` / `Ctrl+K`: Open global full-text search across all 100+ topics, guides, code examples, and interviews.
- `ESC`: Close search modal.
- `↑` / `↓` / `Enter`: Navigate search results.

---

## 📄 License
MIT License. Crafted with precision for software engineers leveling up to Senior, Staff, and Principal roles.
