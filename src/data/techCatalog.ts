import { TechDeepDive } from '../types';
import { languageCurricula } from './languageCurriculum';

export const techCatalogData: TechDeepDive[] = [
  {
    id: 'typescript',
    name: 'TypeScript & Modern JavaScript',
    category: 'Language',
    tagline: 'Type-Safe Structural Typing, V8 Engine Internals, and Fullstack Scalability',
    iconName: 'Code2',
    popularityRank: '#1 Most Used by Developers Worldwide',
    curriculum: languageCurricula['typescript'],
    historyAndEvolution: {
      originYear: 2012,
      creator: 'Anders Hejlsberg (Microsoft)',
      background: 'Created to solve JavaScript\'s lack of static typing, module boundaries, and maintainability in massive web applications like Outlook and Office 365. Hejlsberg (also designer of Turbo Pascal and C#) designed TypeScript as a strict syntactic superset that compiles down to clean, portable JavaScript.',
      keyMilestones: [
        { year: 2012, event: 'TypeScript 0.8 public release announced by Microsoft.' },
        { year: 2016, event: 'TypeScript 2.0 introduces strictNullChecks and tagged union types, drastically reducing runtime crashes.' },
        { year: 2020, event: 'TypeScript 4.0 delivers template literal types, variadic tuple types, and massive performance improvements.' },
        { year: 2023, event: 'TypeScript 5.0 introduces ECMAScript Stage 3 Decorators, const type parameters, and lighter package footprint.' },
        { year: 2025, event: 'Adoption of isolatedDeclarations and native type-stripping support in Node.js and Bun.' }
      ],
      modernStatus: 'The de facto industry standard for web development, frontend frameworks (React, Next.js, Vue), and modern Node.js/Bun backend microservices.'
    },
    realWorldUseCases: [
      {
        industry: 'FinTech & Banking',
        exampleCompany: 'Stripe & Revolut',
        problemSolved: 'Preventing rounding errors, undefined currency parameters, and broken payment webhook contracts at compile time.',
        architectureFit: 'Shared type packages across frontend dashboards and backend payment orchestration gateways.'
      },
      {
        industry: 'Enterprise SaaS',
        exampleCompany: 'Slack & Airbnb',
        problemSolved: 'Enabling hundreds of concurrent developers to refactor multi-million line codebases without breaking downstream dependencies.',
        architectureFit: 'Micro-frontends and full-stack monorepos powered by Turborepo/Nx with strict type checking.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Structural Type System & Duck Typing Under the Hood',
        explanation: 'Unlike Java or C# which use nominal typing (where identity is determined by explicit class inheritance), TypeScript operates on structural subtyping. If shape A has all required properties of shape B with compatible types, A is assignable to B.',
        internals: 'The compiler uses a bidirectional type checker. When checking assignability, it builds an internal graph comparing properties and method signatures, evaluating variance rules (covariance for return types, contravariance for function parameters in strictFunctionTypes mode).'
      },
      {
        title: 'V8 JavaScript Engine Execution Pipeline',
        explanation: 'TypeScript strips all types at compile time. The resulting JavaScript runs on engines like V8. V8 parses source text into an Abstract Syntax Tree (AST), passes it to the Ignition bytecode interpreter, and profiles running code.',
        internals: 'Frequently executed ("hot") code is passed to the TurboFan optimizing compiler, which generates optimized machine code based on inline caches (Hidden Classes / Shapes). If polymorphic object shapes violate type assumptions, V8 deoptimizes back to bytecode, creating CPU stalls.'
      }
    ],
    architectureDiagram: {
      title: 'V8 Engine Execution Pipeline: Parsing, Ignition Bytecode & TurboFan JIT',
      caption: 'Source text compiled to AST, interpreted via Ignition bytecode, and JIT-optimized by TurboFan based on inline cache feedback.',
      type: 'flow',
      svgContent: `<svg viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="220" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="30" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">V8 RUNTIME PIPELINE: STATIC TYPES STRIPPED -> JIT MACHINE CODE</text>
        
        <rect x="36" y="55" width="130" height="130" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="48" y="80" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">TypeScript / JS</text>
        <text x="48" y="105" fill="#94a3b8" font-family="monospace" font-size="10">Source Code</text>
        <text x="48" y="125" fill="#64748b" font-family="monospace" font-size="10">Parser (Scanner)</text>
        <text x="48" y="145" fill="#38bdf8" font-family="monospace" font-size="10">AST Generation</text>

        <path d="M166 120 L210 120" stroke="#64748b" stroke-width="2"/>

        <rect x="210" y="55" width="140" height="130" rx="8" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="222" y="80" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold">Ignition</text>
        <text x="222" y="105" fill="#c7d2fe" font-family="monospace" font-size="10">Bytecode Interpreter</text>
        <text x="222" y="125" fill="#818cf8" font-family="monospace" font-size="10">Fast Startup</text>
        <text x="222" y="145" fill="#a5b4fc" font-family="monospace" font-size="10">Profiles hot paths</text>

        <path d="M350 120 L394 120" stroke="#6366f1" stroke-width="2"/>

        <rect x="394" y="55" width="140" height="130" rx="8" fill="#064e3b" stroke="#059669"/>
        <text x="406" y="80" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="bold">TurboFan</text>
        <text x="406" y="105" fill="#a7f3d0" font-family="monospace" font-size="10">Optimizing JIT</text>
        <text x="406" y="125" fill="#a7f3d0" font-family="monospace" font-size="10">Machine Code Gen</text>
        <text x="406" y="145" fill="#34d399" font-family="monospace" font-size="10">Inline Caching</text>

        <path d="M534 120 L578 120" stroke="#059669" stroke-width="2"/>

        <rect x="578" y="55" width="90" height="130" rx="8" fill="#0f172a" stroke="#475569"/>
        <text x="588" y="80" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold">CPU</text>
        <text x="588" y="105" fill="#94a3b8" font-family="monospace" font-size="9">Native Exec</text>
        <text x="588" y="130" fill="#38bdf8" font-family="monospace" font-size="9">O(1) shapes</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production Discriminated Union & Exhaustive Pattern Matching',
        language: 'typescript',
        code: `// Discriminated union for resilient payment state machine
export type PaymentState =
  | { status: 'idle' }
  | { status: 'processing'; transactionId: string; startedAt: number }
  | { status: 'succeeded'; transactionId: string; amountCharged: number; receiptUrl: string }
  | { status: 'failed'; transactionId?: string; errorCode: string; retryable: boolean };

// Exhaustive compile-time checker: guarantees compile error if a new state is added
export function assertNever(x: never): never {
  throw new Error(\`Unexpected object encountered: \${JSON.stringify(x)}\`);
}

export function renderPaymentBanner(state: PaymentState): string {
  switch (state.status) {
    case 'idle':
      return 'Ready to checkout.';
    case 'processing':
      return \`Processing transaction \${state.transactionId}...\`;
    case 'succeeded':
      return \`Paid $\${(state.amountCharged / 100).toFixed(2)}. Receipt: \${state.receiptUrl}\`;
    case 'failed':
      return \`Payment failed (\${state.errorCode}). \${state.retryable ? 'Click to retry.' : 'Please contact support.'}\`;
    default:
      // If a developer adds a new state like 'refunded' and forgets this switch,
      // TypeScript throws a compilation error right here!
      return assertNever(state);
  }
}`,
        explanation: 'Uses discriminated unions and TypeScript\'s "never" type to guarantee exhaustive handling of all domain states without runtime edge-case oversights.',
        runnableNotes: 'Paste into TypeScript playground or any TS project.'
      },
      {
        title: 'Advanced Generics with Conditional Types & Key Remapping',
        language: 'typescript',
        code: `// High-level utility: Create an event listener map from a domain model
type DomainEvents = {
  userCreated: { id: string; email: string };
  orderShipped: { orderId: string; trackingNumber: string };
  invoicePaid: { invoiceId: string; amountCents: number };
};

// Key remapping and template literal types
type EventHandlerMap<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (payload: T[K]) => Promise<void> | void;
};

// Resulting strongly typed contract:
// {
//   onUserCreated: (payload: { id: string; email: string }) => Promise<void> | void;
//   onOrderShipped: (payload: { orderId: string; trackingNumber: string }) => Promise<void> | void;
//   onInvoicePaid: (payload: { invoiceId: string; amountCents: number }) => Promise<void> | void;
// }
export class NotificationDispatcher implements EventHandlerMap<DomainEvents> {
  async onUserCreated(payload: { id: string; email: string }) {
    console.log(\`Sending welcome email to \${payload.email}\`);
  }
  async onOrderShipped(payload: { orderId: string; trackingNumber: string }) {
    console.log(\`Tracking \${payload.trackingNumber} for order \${payload.orderId}\`);
  }
  async onInvoicePaid(payload: { invoiceId: string; amountCents: number }) {
    console.log(\`Receipt recorded for $\${payload.amountCents / 100}\`);
  }
}`,
        explanation: 'Demonstrates mapped types, template literal string manipulation, and key remapping to enforce type-safe event-driven dispatchers across large codebases.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Modern Node & TS Toolchain Setup',
        actionableTasks: [
          'Install Node.js LTS and pnpm for lightning-fast deterministic package resolution.',
          'Initialize a modern repository with tsconfig.json using strict mode enabled by default.',
          'Configure tsx or ts-node for zero-compile-step script execution during development.'
        ],
        keyCommands: ['npm install -g pnpm', 'pnpm init', 'pnpm add -D typescript @types/node tsx', 'npx tsc --init --strict']
      },
      {
        step: 2,
        phase: 'Mastering Advanced Type Mechanics',
        actionableTasks: [
          'Study utility types: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, ReturnType, Parameters.',
          'Implement branded / nominal types (e.g. type UserId = string & { readonly __brand: unique symbol }) to prevent mixing incompatible IDs.',
          'Adopt Zod or Valibot for runtime input parsing at all network and database boundaries.'
        ],
        keyCommands: ['pnpm add zod', 'npx tsc --noEmit']
      },
      {
        step: 3,
        phase: 'Production Engineering & Bundling',
        actionableTasks: [
          'Use modern build engines like Vite, esbuild, or Turbopack for sub-second hot module reloading.',
          'Set up ESLint 9 flat config with typescript-eslint and Prettier formatting hooks.',
          'Establish continuous integration type-checking in GitHub Actions (tsc --noEmit).'
        ],
        keyCommands: ['pnpm build', 'pnpm lint', 'pnpm test']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using "any" to silence type compiler errors instead of proper type narrowing or "unknown".',
        whyItHurts: 'The "any" keyword disables all type safety transitively for any variable it touches, creating hidden runtime TypeError bugs.',
        solution: 'Use "unknown" for untyped values, and narrow them using type guards ("typeof", "instanceof", or Zod schema validation).'
      },
      {
        mistake: 'Non-null assertion operator (!) on nullable API responses or DOM queries.',
        whyItHurts: 'If the server returns null or the DOM element has not mounted yet, it immediately throws "Cannot read properties of null".',
        solution: 'Always use optional chaining (?.) with nullish coalescing (??) or explicit early return guards.'
      }
    ]
  },
  {
    id: 'python',
    name: 'Python 3.12+ & High-Performance Ecosystem',
    category: 'Language',
    tagline: 'Modern Asynchronous Concurrency, C-Extensions, and Machine Learning Backbone',
    iconName: 'Terminal',
    popularityRank: '#1 for AI, Data Science & Fast Backend APIs',
    curriculum: languageCurricula['python'],
    historyAndEvolution: {
      originYear: 1991,
      creator: 'Guido van Rossum (Centrum Wiskunde & Informatica)',
      background: 'Created as a successor to the ABC language capable of exception handling and interfacing with the Amoeba operating system. Prioritized developer productivity, clean readable syntax ("The Zen of Python"), and extensible C-bindings.',
      keyMilestones: [
        { year: 2008, event: 'Python 3.0 released, fixing unicode handling and core design quirks (backward-incompatible with Python 2).' },
        { year: 2015, event: 'Python 3.5 introduces async/await syntax and typing module (PEP 484).' },
        { year: 2020, event: 'Python 2 officially reaches End-of-Life (EOL).' },
        { year: 2022, event: 'Python 3.11 Faster CPython project delivers 10-60% speedups via specializing adaptive interpreter.' },
        { year: 2024, event: 'Python 3.13 introduces experimental Free-Threaded mode (PEP 703 - removing the Global Interpreter Lock GIL) and JIT compiler.' }
      ],
      modernStatus: 'Undisputed leader in Artificial Intelligence, Machine Learning (PyTorch, TensorFlow), Scientific Computing, and high-velocity backend APIs with FastAPI.'
    },
    realWorldUseCases: [
      {
        industry: 'Generative AI & Machine Learning',
        exampleCompany: 'OpenAI, Anthropic & Hugging Face',
        problemSolved: 'Training foundation models, managing tokenization pipelines, distributed GPU tensor computation.',
        architectureFit: 'PyTorch / Triton C++/CUDA extensions wrapped with expressive Python high-level APIs.'
      },
      {
        industry: 'Streaming & Video Distribution',
        exampleCompany: 'Netflix & Instagram',
        problemSolved: 'Serving hundreds of millions of requests using high-concurrency async web frameworks and data orchestration pipelines.',
        architectureFit: 'AsyncIO microservices orchestrated via Celery and Apache Airflow.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Global Interpreter Lock (GIL) & The Free-Threaded Revolution',
        explanation: 'Historically, CPython protected memory management (reference counting) with a mutual exclusion lock called the GIL, preventing multi-threaded CPU-bound parallelism in a single process.',
        internals: 'PEP 703 redesigns CPython internals using mimalloc, immortal objects, and biased reference counting, allowing true multi-core parallel execution across threads without the GIL in Python 3.13+.'
      },
      {
        title: 'AsyncIO Event Loop Mechanics',
        explanation: 'Python uses cooperative multitasking via coroutines. When an async function hits an "await" on network or disk I/O, it yields execution back to the event loop, which handles other pending tasks via OS epoll/kqueue.',
        internals: 'Coroutines are stateful generators behind the scenes. The Task object manages the step() progression, registering file descriptors with selectors to resume execution when data arrives.'
      }
    ],
    codeExamples: [
      {
        title: 'Production AsyncIO TaskGroup with Resilient Timeout & Retry Policy',
        language: 'python',
        code: `import asyncio
import httpx
from typing import Any, Dict

async def fetch_service_metrics(client: httpx.AsyncClient, service_name: str, url: str) -> Dict[str, Any]:
    """Fetch health metrics with exponential backoff retry and timeout."""
    max_retries = 3
    base_delay = 0.2

    for attempt in range(1, max_retries + 1):
        try:
            response = await client.get(url, timeout=2.0)
            response.raise_for_status()
            data = response.json()
            return {"service": service_name, "status": "UP", "latency_ms": data.get("latency_ms", 0)}
        except (httpx.RequestError, httpx.HTTPStatusError) as exc:
            if attempt == max_retries:
                return {"service": service_name, "status": "DOWN", "error": str(exc)}
            await asyncio.sleep(base_delay * (2 ** (attempt - 1)))
    return {"service": service_name, "status": "UNKNOWN"}

async def gather_cluster_health() -> list[Dict[str, Any]]:
    services = [
        ("auth-svc", "https://auth.internal.corp/health"),
        ("billing-svc", "https://billing.internal.corp/health"),
        ("search-svc", "https://search.internal.corp/health"),
    ]

    async with httpx.AsyncClient() as client:
        # Python 3.11+ TaskGroup provides structured concurrency:
        # If one critical subtask fails or cancels, the entire group cleans up safely!
        async with asyncio.TaskGroup() as tg:
            tasks = [
                tg.create_task(fetch_service_metrics(client, name, url))
                for name, url in services
            ]
        
        # All tasks are guaranteed complete here
        return [task.result() for task in tasks]

if __name__ == "__main__":
    results = asyncio.run(gather_cluster_health())
    print("Cluster Status:", results)`,
        explanation: 'Demonstrates Python 3.11+ structured concurrency via asyncio.TaskGroup, resilient HTTP connection pooling, and exponential backoff retry logic.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Modern Environment & Package Management with UV',
        actionableTasks: [
          'Replace slow legacy pip/virtualenv with astral-sh/uv (10-100x faster Rust-powered package manager).',
          'Create a virtual environment and define dependencies using pyproject.toml standards (PEP 621).',
          'Lock dependencies deterministically with uv.lock for reproducible builds across dev and CI/CD.'
        ],
        keyCommands: ['pip install uv', 'uv init my-project', 'uv add fastapi uvicorn pydantic httpx', 'uv run uvicorn main:app --reload']
      },
      {
        step: 2,
        phase: 'Production Code Quality & Static Analysis',
        actionableTasks: [
          'Enforce strict static type checking with Pyright or Mypy in strict mode.',
          'Format and lint instantaneously using Ruff (Rust-powered linter replacing Flake8, Black, isort).',
          'Write comprehensive unit and integration tests with Pytest and pytest-asyncio.'
        ],
        keyCommands: ['uv add --dev ruff pyright pytest pytest-asyncio', 'uv run ruff check . --fix', 'uv run pyright', 'uv run pytest']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Blocking the async event loop with synchronous operations like time.sleep() or requests.get().',
        whyItHurts: 'Synchronous blocking calls stop the entire Python process from executing any other concurrent coroutines, destroying throughput.',
        solution: 'Always use asyncio.sleep() or offload heavy CPU/sync calls via asyncio.to_thread(sync_function).'
      },
      {
        mistake: 'Using mutable default arguments in functions (def add_item(item, bucket=[]):).',
        whyItHurts: 'Default arguments are evaluated once at module load time. Every caller shares the same mutated list across invocations.',
        solution: 'Use None as default (def add_item(item, bucket=None): if bucket is None: bucket = []).'
      }
    ]
  },
  {
    id: 'golang',
    name: 'Go (Golang) Systems & Microservices',
    category: 'Systems & Distributed',
    tagline: 'Goroutines, CSP Concurrency, Static Binaries, and Low-Latency Microservices',
    iconName: 'Cpu',
    popularityRank: '#1 for Cloud Native, Kubernetes, Docker & High-Scale Microservices',
    curriculum: languageCurricula['golang'],
    historyAndEvolution: {
      originYear: 2009,
      creator: 'Robert Griesemer, Rob Pike, and Ken Thompson (Google)',
      background: 'Invented at Google to solve massive compilation times, memory leaks, and complex dependency graphs in large C++ and Java codebases. Focused on simplicity, fast compilation, pragmatic concurrency (CSP), and zero runtime dependencies (single static binary).',
      keyMilestones: [
        { year: 2012, event: 'Go 1.0 released with strict backwards compatibility guarantee.' },
        { year: 2014, event: 'Docker and Kubernetes written in Go, establishing Go as the language of cloud infrastructure.' },
        { year: 2018, event: 'Go 1.11 introduces Go Modules, fixing dependency management permanently.' },
        { year: 2022, event: 'Go 1.18 delivers parametric polymorphism (Generics) and native fuzzing.' },
        { year: 2024, event: 'Go 1.22+ introduces loop variable scoping fix, range-over-function iterators, and enhanced GC pacing.' }
      ],
      modernStatus: 'The backbone of the modern cloud: powering Kubernetes, Docker, Terraform, Prometheus, Envoy, CockroachDB, and modern FinTech infrastructure.'
    },
    realWorldUseCases: [
      {
        industry: 'Cloud Infrastructure & Containerization',
        exampleCompany: 'Google, Docker, Red Hat',
        problemSolved: 'Managing container lifecycles, network overlays, and distributed consensus with tiny memory footprints.',
        architectureFit: 'Kubernetes control plane, container runtimes (containerd), and API gateways.'
      },
      {
        industry: 'FinTech High-Frequency Microservices',
        exampleCompany: 'Uber & Monzo',
        problemSolved: 'Handling millions of concurrent network connections with deterministic GC pauses under 1ms.',
        architectureFit: 'High-throughput payment routing microservices communicating over gRPC.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'The Go M:N Scheduler (GMP Model)',
        explanation: 'Go multiplexes M goroutines onto N OS threads across P logical processors. Goroutines are lightweight (starting at only 2KB of stack memory compared to 1MB-8MB for OS threads).',
        internals: 'The scheduler uses work-stealing algorithms. If a goroutine makes a blocking system call, the OS thread is detached from P so other goroutines continue executing. Network I/O is routed through the non-blocking netpoller (epoll/kqueue).'
      },
      {
        title: 'Concurrent Tri-Color Mark-and-Sweep Garbage Collector',
        explanation: 'Go optimizes for low latency (pause times < 1ms) rather than maximum throughput. Objects are categorized into White (unvisited), Grey (visited, fields unvisited), and Black (visited, fields visited).',
        internals: 'The GC runs concurrently with application goroutines. A write barrier detects when pointer changes occur during GC marking to prevent accidental collection of live references.'
      }
    ],
    architectureDiagram: {
      title: 'Go Runtime GMP Scheduler: M (OS Threads) : N (Goroutines) over P (Processors)',
      caption: 'Work-stealing concurrency model where logical processors (P) bind runnable goroutines (G) to machine threads (M).',
      type: 'flow',
      svgContent: `<svg viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="220" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="30" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">GO CONCURRENCY: GMP WORK-STEALING SCHEDULER</text>

        <!-- Global Run Queue -->
        <rect x="40" y="55" width="620" height="35" rx="6" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="56" y="77" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="bold">Global Run Queue (GRQ): Low lock priority overflow goroutines</text>

        <!-- Processor P1 Column -->
        <rect x="40" y="105" width="290" height="95" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="56" y="125" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">Logical Processor P0 (GOMAXPROCS)</text>
        <rect x="56" y="135" width="130" height="22" rx="4" fill="#0f172a" stroke="#475569"/>
        <text x="66" y="150" fill="#a5b4fc" font-family="monospace" font-size="10">Local Queue (256 Gs)</text>
        <rect x="200" y="135" width="115" height="22" rx="4" fill="#064e3b" stroke="#059669"/>
        <text x="210" y="150" fill="#6ee7b7" font-family="monospace" font-size="10">OS Thread M0</text>
        <text x="56" y="185" fill="#64748b" font-family="monospace" font-size="10">Work-stealing if local queue drains</text>

        <!-- Processor P2 Column -->
        <rect x="370" y="105" width="290" height="95" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="386" y="125" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">Logical Processor P1 (GOMAXPROCS)</text>
        <rect x="386" y="135" width="130" height="22" rx="4" fill="#0f172a" stroke="#475569"/>
        <text x="396" y="150" fill="#a5b4fc" font-family="monospace" font-size="10">Local Queue (256 Gs)</text>
        <rect x="530" y="135" width="115" height="22" rx="4" fill="#064e3b" stroke="#059669"/>
        <text x="540" y="150" fill="#6ee7b7" font-family="monospace" font-size="10">OS Thread M1</text>
        <text x="386" y="185" fill="#64748b" font-family="monospace" font-size="10">Non-blocking netpoller async I/O</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production Worker Pool with Context Cancellation and Rate Limiting',
        language: 'go',
        code: `package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

type WorkItem struct {
	ID      string
	Payload string
}

type ProcessResult struct {
	ID       string
	Duration time.Duration
	Err      error
}

// Resilient worker pool honoring Context timeout and graceful shutdown
func RunWorkerPool(ctx context.Context, workers int, items []WorkItem) ([]ProcessResult, error) {
	jobs := make(chan WorkItem, len(items))
	results := make(chan ProcessResult, len(items))
	var wg sync.WaitGroup

	// Launch worker goroutines
	for i := 1; i <= workers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case item, ok := <-jobs:
					if !ok {
						return
					}
					start := time.Now()
					err := executeTask(ctx, item)
					results <- ProcessResult{
						ID:       item.ID,
						Duration: time.Since(start),
						Err:      err,
					}
				}
			}
		}(i)
	}

	// Feed jobs into channel
	for _, item := range items {
		jobs <- item
	}
	close(jobs)

	// Wait for workers to finish in background goroutine
	go func() {
		wg.Wait()
		close(results)
	}()

	var output []ProcessResult
	for res := range results {
		output = append(output, res)
	}

	if ctx.Err() != nil {
		return output, errors.New("worker pool execution terminated early due to context timeout")
	}
	return output, nil
}

func executeTask(ctx context.Context, item WorkItem) error {
	// Simulate work respecting context cancellation
	select {
	case <-time.After(20 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	items := []WorkItem{
		{ID: "JOB-01", Payload: "process-invoice"},
		{ID: "JOB-02", Payload: "send-webhook"},
		{ID: "JOB-03", Payload: "generate-pdf"},
	}

	results, err := RunWorkerPool(ctx, 3, items)
	if err != nil {
		fmt.Printf("Execution alert: %v\\n", err)
	}
	for _, r := range results {
		fmt.Printf("Job %s finished in %v (Error: %v)\\n", r.ID, r.Duration, r.Err)
	}
}`,
        explanation: 'Standard production Go pattern: bounded channel buffers, worker fan-out, wait group coordination, and deterministic graceful cancellation via context.Context.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Toolchain & Module Workspace',
        actionableTasks: [
          'Install latest Go compiler and configure GOPATH / GOBIN environment variables.',
          'Initialize a project with go mod init github.com/user/project.',
          'Format and check code automatically with gofmt and go vet.'
        ],
        keyCommands: ['go version', 'go mod init my-service', 'go fmt ./...', 'go vet ./...']
      },
      {
        step: 2,
        phase: 'Microservice Frameworks & Observability',
        actionableTasks: [
          'Build RESTful APIs with high-speed routers like Chi or Gin.',
          'Adopt structured logging with Go 1.21+ log/slog standard library.',
          'Add OpenTelemetry traces and Prometheus metric collectors.'
        ],
        keyCommands: ['go get github.com/go-chi/chi/v5', 'go get github.com/prometheus/client_golang/prometheus', 'go test -v -race ./...']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Goroutine leaks caused by reading/writing to unbuffered channels without receiver or timeout.',
        whyItHurts: 'Leaked goroutines remain in memory forever along with their allocated stack and referenced heap pointers, causing gradual Out-Of-Memory (OOM) crashes.',
        solution: 'Always pass context.Context to goroutines or ensure channels have adequate buffer / select timeouts.'
      },
      {
        mistake: 'Ignoring error return values (e.g. data, _ := doSomething()).',
        whyItHurts: 'In Go, errors are explicit values. Ignoring errors hides silent failures that corrupt database state.',
        solution: 'Always check if err != nil and handle or wrap it with fmt.Errorf("action failed: %w", err).'
      }
    ]
  },
  {
    id: 'rust',
    name: 'Rust Systems Programming & Memory Safety',
    category: 'Systems & Distributed',
    tagline: 'Zero-Cost Abstractions, Compile-Time Ownership, and Fearless Concurrency',
    iconName: 'ShieldCheck',
    popularityRank: '#1 Most Loved Language for 8 Consecutive Years',
    curriculum: languageCurricula['rust'],
    historyAndEvolution: {
      originYear: 2010,
      creator: 'Graydon Hoare (Mozilla Research)',
      background: 'Created to solve severe C++ memory safety vulnerabilities (use-after-free, buffer overflows, data races) that plagued web browsers like Firefox. Designed without a garbage collector while offering the memory safety of high-level languages through a revolutionary borrow checker.',
      keyMilestones: [
        { year: 2015, event: 'Rust 1.0 released with compile-time ownership, borrowing, and lifetime rules stabilized.' },
        { year: 2018, event: 'Rust 2018 edition introduces async/await foundation and non-lexical lifetimes (NLL).' },
        { year: 2021, event: 'Rust Foundation established with Amazon, Google, Microsoft, Meta, and Mozilla.' },
        { year: 2022, event: 'Linux Kernel merges initial Rust support in Linux 6.1 (first language added alongside C in 30 years).' },
        { year: 2024, event: 'Rust 2024 edition advances async closures, const traits, and cargo build caching.' }
      ],
      modernStatus: 'The modern standard for systems programming, operating systems, cryptographic libraries, browser engines, database storage engines, and high-performance WebAssembly.'
    },
    realWorldUseCases: [
      {
        industry: 'Cloud Infrastructure & Virtualization',
        exampleCompany: 'Amazon Web Services (AWS)',
        problemSolved: 'Powering AWS Lambda and AWS Fargate via Firecracker microVMs with sub-5ms boot times and absolute memory isolation.',
        architectureFit: 'Firecracker VMM written completely in Rust running on bare metal.'
      },
      {
        industry: 'FinTech & High-Frequency Trading',
        exampleCompany: 'Jane Street & Cloudflare',
        problemSolved: 'Serving millions of DNS/HTTP edge requests with zero garbage collection pause spikes and strict safety.',
        architectureFit: 'Cloudflare Pingora edge proxy replacing NGINX across global points of presence.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Ownership, Borrowing, and Lifetimes Mechanics',
        explanation: 'Every value in Rust has a single owner. When the owner goes out of scope, the memory is immediately deallocated (RAII). Values can be borrowed immutably (&T) an arbitrary number of times, or mutably (&mut T) exactly once at any given time.',
        internals: 'The compiler borrow checker (Polonius) models variables as origin points and regions. It tracks liveness and aliasing across function boundaries without incurring any runtime CPU or memory penalty.'
      },
      {
        title: 'Async Tokio Runtime & Cooperative Polling',
        explanation: 'Unlike Go where goroutines run automatically on runtime threads, Rust futures are lazy: they do nothing unless polled. Tokio executes futures by calling poll(cx: &mut Context) until they return Poll::Ready(T).',
        internals: 'Wakers notify the Tokio task scheduler when I/O ready events are signaled by the OS reactor (Mio/epoll), resuming execution on multi-threaded work-stealing thread pools.'
      }
    ],
    codeExamples: [
      {
        title: 'Production Tokio Async TCP Echo Service with Rate Limiting',
        language: 'rust',
        code: `use std::error::Error;
use std::sync::Arc;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpListener;
use tokio::sync::Semaphore;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind(addr).await?;
    println!("High-performance Rust TCP server running on {}", addr);

    // Limit concurrent active TCP connections to prevent resource exhaustion
    let connection_pool_limit = Arc::new(Semaphore::new(1000));

    loop {
        let (mut socket, client_addr) = listener.accept().await?;
        let permit = connection_pool_limit.clone().acquire_owned().await?;

        tokio::spawn(async move {
            let _permit = permit; // RAII guard: released when task finishes
            let mut buffer = [0u8; 1024];

            loop {
                match socket.read(&mut buffer).await {
                    Ok(0) => break, // Connection closed cleanly by client
                    Ok(n) => {
                        if let Err(e) = socket.write_all(&buffer[0..n]).await {
                            eprintln!("Socket write failure to {}: {}", client_addr, e);
                            break;
                        }
                    }
                    Err(e) => {
                        eprintln!("Socket read failure from {}: {}", client_addr, e);
                        break;
                    }
                }
            }
        });
    }
}`,
        explanation: 'Demonstrates zero-copy buffers, asynchronous network I/O with Tokio, and RAII-based semaphore concurrency throttling.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Toolchain Installation & Cargo Ecosystem',
        actionableTasks: [
          'Install rustup (the official Rust toolchain installer).',
          'Learn Cargo commands: cargo new, cargo check, cargo build --release, cargo test.',
          'Install rust-analyzer extension for rich IDE completion and inline type hints.'
        ],
        keyCommands: ['curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh', 'cargo new core_engine --bin', 'cargo check', 'cargo test']
      },
      {
        step: 2,
        phase: 'Mastering Idiomatic Rust & Web Services',
        actionableTasks: [
          'Master error handling with Result<T, E>, thiserror, and anyhow.',
          'Build lightning-fast async HTTP microservices with Axum and Tower middleware.',
          'Serialize and deserialize JSON/binary payloads with Serde at near-zero CPU overhead.'
        ],
        keyCommands: ['cargo add axum tokio --features tokio/full', 'cargo add serde --features serde/derive', 'cargo clippy -- -D warnings']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Calling .unwrap() or .expect() blindly on Option and Result types in production paths.',
        whyItHurts: 'When an unwrap encounters a None or Err, the thread panics. In single-threaded contexts or without catch_unwind, the entire process terminates.',
        solution: 'Use pattern matching (if let / match) or the question mark operator (?) to propagate errors up the call stack gracefully.'
      },
      {
        mistake: 'Fighting the borrow checker by excessive cloning (.clone()) of heavy data structures.',
        whyItHurts: 'Cloning eliminates borrow errors by allocating duplicate memory on the heap, degrading performance to slower than garbage-collected languages.',
        solution: 'Pass shared references (&T), use Arc<T> for multi-threaded sharing, or redesign data structures to minimize circular references.'
      }
    ]
  },
  {
    id: 'docker-kubernetes',
    name: 'Docker, Containers & Kubernetes (K8s)',
    category: 'Cloud & DevOps',
    tagline: 'Linux Namespaces, cgroups, OCI Images, Orchestration, and Self-Healing Pods',
    iconName: 'Boxes',
    popularityRank: 'Global Industry Standard for Cloud Orchestration',
    historyAndEvolution: {
      originYear: 2013,
      creator: 'Solomon Hykes (Docker) & Google (Kubernetes/Borg)',
      background: 'Docker democratized Linux kernel isolation features (namespaces, cgroups, chroot) into simple container images. Google open-sourced Kubernetes in 2014 based on 10+ years of internal experience running planet-scale workloads on Borg.',
      keyMilestones: [
        { year: 2013, event: 'Docker open-sourced at PyCon, transforming software delivery.' },
        { year: 2014, event: 'Google announces Kubernetes open-source project; CNCF founded.' },
        { year: 2018, event: 'Kubernetes becomes the first graduated project in CNCF history.' },
        { year: 2020, event: 'Dockershim deprecated in favor of standardized CRI (Container Runtime Interface) runtimes like containerd and CRI-O.' },
        { year: 2025, event: 'Widespread enterprise adoption of Gateway API, eBPF Cilium networking, and GitOps via ArgoCD.' }
      ],
      modernStatus: 'The operating system of the modern cloud. Over 85% of Fortune 500 enterprises run their production microservices on Kubernetes.'
    },
    realWorldUseCases: [
      {
        industry: 'Global E-Commerce',
        exampleCompany: 'Shopify & Amazon',
        problemSolved: 'Handling Black Friday traffic surges from 10k to 500k requests/second with automatic horizontal pod scaling (HPA).',
        architectureFit: 'Kubernetes clusters spanning multiple availability zones with automated node provisioning via Karpenter.'
      },
      {
        industry: 'Streaming Entertainment',
        exampleCompany: 'Spotify & WarnerMedia',
        problemSolved: 'Rolling out thousands of microservice deployments per day with zero downtime and automatic canary rollbacks.',
        architectureFit: 'ArgoCD declarative GitOps pipelines with Istio service mesh traffic shaping.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Containerization Under the Hood: Namespaces & cgroups',
        explanation: 'A container is not a virtual machine. It is a regular Linux process running with kernel-enforced isolation boundaries. It shares the host kernel directly with zero virtualization hypervisor overhead.',
        internals: 'Linux Namespaces provide isolation: PID (process IDs), NET (network interfaces/ports), MNT (filesystem mount points), IPC (inter-process communication), and UTS (hostnames). Control Groups (cgroups v2) enforce resource limits on CPU, memory, and disk I/O.'
      },
      {
        title: 'The Kubernetes Control Loop Reconciler',
        explanation: 'Kubernetes operates on a declarative reconciliation model. You specify the "Desired State" in YAML manifests. The K8s controllers continuously monitor the "Actual State" and execute actions to drive actual state toward desired state.',
        internals: 'The kube-apiserver persists state in etcd (a distributed consensus Raft key-value store). Kube-controller-manager and kube-scheduler bind unassigned Pods to healthy nodes based on affinity and resource requests.'
      }
    ],
    architectureDiagram: {
      title: 'Kubernetes Pod Architecture & Linux Kernel Namespaces / cgroups Isolation',
      caption: 'Container processes running on the shared host Linux kernel isolated via cgroups v2 resource ceilings and namespaces.',
      type: 'layers',
      svgContent: `<svg viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="220" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="30" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">CONTAINER RUNTIME: LINUX KERNEL NAMESPACES & CGROUPS V2</text>

        <!-- K8s Worker Node Border -->
        <rect x="40" y="50" width="620" height="150" rx="8" fill="#0f172a" stroke="#334155"/>
        <text x="56" y="70" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold">Kubernetes Worker Node (Bare Metal / EC2)</text>

        <!-- Pod 1 -->
        <rect x="56" y="82" width="280" height="70" rx="6" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="68" y="100" fill="#a5b4fc" font-family="sans-serif" font-size="11" font-weight="bold">Pod: order-service (PID + NET Namespace)</text>
        <rect x="68" y="112" width="125" height="26" rx="4" fill="#1e293b" stroke="#6366f1"/>
        <text x="76" y="129" fill="#c7d2fe" font-family="monospace" font-size="9">order-api container</text>
        <rect x="200" y="112" width="125" height="26" rx="4" fill="#1e293b" stroke="#6366f1"/>
        <text x="208" y="129" fill="#c7d2fe" font-family="monospace" font-size="9">sidecar (envoy/otel)</text>

        <!-- Pod 2 -->
        <rect x="356" y="82" width="280" height="70" rx="6" fill="#064e3b" stroke="#059669"/>
        <text x="368" y="100" fill="#6ee7b7" font-family="sans-serif" font-size="11" font-weight="bold">Pod: billing-service (Isolated CGroup)</text>
        <rect x="368" y="112" width="256" height="26" rx="4" fill="#0f172a" stroke="#10b981"/>
        <text x="376" y="129" fill="#a7f3d0" font-family="monospace" font-size="9">billing-worker (limit: 512MiB, 500m CPU)</text>

        <!-- Linux Kernel Floor -->
        <rect x="56" y="162" width="580" height="28" rx="4" fill="#1e293b" stroke="#475569"/>
        <text x="70" y="180" fill="#38bdf8" font-family="monospace" font-size="10">Shared Linux Host Kernel (eBPF Cilium CNI + Overlay Network + cgroups v2 scheduler)</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production Multi-Stage Dockerfile for Minimal Attack Surface',
        language: 'dockerfile',
        code: `# Build Stage: Compiles application with all build dependencies
FROM golang:1.23-alpine AS builder

WORKDIR /app
RUN apk add --no-cache git ca-certificates tzdata

COPY go.mod go.sum ./
RUN go mod download

COPY . .
# CGO_ENABLED=0 builds a 100% statically linked binary
# -ldflags="-w -s" strips debugging symbols to reduce binary size
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /app/server ./cmd/server

# Final Production Stage: Scratch / Distroless image (Zero shell, zero curl, zero attack surface)
FROM scratch

# Import root certificates for TLS HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/server /server

# Non-root user execution prevents container breakout privileges
USER 10001:10001
EXPOSE 8080

ENTRYPOINT ["/server"]`,
        explanation: 'Produces an ultra-secure, featherweight container image under 15MB with no shell, no package manager, and running as non-root.'
      },
      {
        title: 'Production Kubernetes Deployment with Probes & Topology Spread',
        language: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app.kubernetes.io/name: order-service
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0 # Zero downtime during rolling releases
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      # Spread pods across availability zones for high availability
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
              app: order-service
      containers:
        - name: order-api
          image: registry.internal.corp/order-service:v2.4.1
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi" # Prevents noisy neighbor memory hogs
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          ports:
            - containerPort: 8080
          # Liveness: Restarts container if deadlock occurs
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 15
          # Readiness: Pulls pod out of load balancer if overloaded
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5`,
        explanation: 'Enterprise K8s manifest implementing zero-downtime rolling upgrades, multi-AZ high-availability spread, strict non-root security contexts, and dual health probes.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Local Container Mastery',
        actionableTasks: [
          'Install Docker Desktop or OrbStack/Rancher Desktop.',
          'Understand container commands: docker build, docker run, docker exec, docker logs.',
          'Master docker-compose.yml for local multi-container development (app + postgres + redis).'
        ],
        keyCommands: ['docker build -t my-app:latest .', 'docker run -p 8080:8080 -d my-app:latest', 'docker-compose up -d']
      },
      {
        step: 2,
        phase: 'Kubernetes Cluster Architecture & Helm',
        actionableTasks: [
          'Spin up a local Kubernetes cluster with Kind (Kubernetes in Docker) or Minikube.',
          'Learn core primitives: Pods, Deployments, Services (ClusterIP/LoadBalancer), Ingress, ConfigMaps, and Secrets.',
          'Package applications into reusable Helm charts.'
        ],
        keyCommands: ['kind create cluster --name dev-cluster', 'kubectl get pods -A', 'helm install my-chart ./chart']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Omitting resource requests and limits in Kubernetes Pod manifests.',
        whyItHurts: 'Without requests/limits, the K8s scheduler cannot pack nodes efficiently. A single runaway container can consume 100% CPU and trigger OOM killer panics for every pod on the node.',
        solution: 'Always configure both requests (for scheduling) and limits (for hard throttling).'
      },
      {
        mistake: 'Using the ":latest" tag for production container images.',
        whyItHurts: ':latest is mutable. Node rollouts can pull different image builds unpredictably, causing inconsistent cluster versions and impossible rollbacks.',
        solution: 'Always tag images with immutable git commit SHAs or semantic version tags (e.g. :v1.4.2-sha8f9e).'
      }
    ]
  },
  {
    id: 'kafka',
    name: 'Apache Kafka & Event-Driven Architecture',
    category: 'Systems & Distributed',
    tagline: 'Distributed Commit Logs, Partitioning, Consumer Groups, and Exactly-Once Semantics',
    iconName: 'Network',
    popularityRank: 'Industry Standard for Enterprise Streaming & Event Backbones',
    historyAndEvolution: {
      originYear: 2011,
      creator: 'Jay Kreps, Neha Narkhede, Jun Rao (LinkedIn)',
      background: 'Created at LinkedIn to replace fragmented message queues (JMS, ActiveMQ) with a unified, high-throughput distributed commit log capable of handling hundreds of billions of daily events with zero data loss.',
      keyMilestones: [
        { year: 2011, event: 'Open-sourced by LinkedIn and joined Apache Software Foundation.' },
        { year: 2014, event: 'Founders leave LinkedIn to establish Confluent.' },
        { year: 2017, event: 'Kafka 0.11 introduces transactional messaging and Exactly-Once Semantics (EOS).' },
        { year: 2021, event: 'KRaft (Kafka Raft consensus) introduced, removing Apache ZooKeeper dependency.' },
        { year: 2024, event: 'ZooKeeper completely removed in Kafka 4.0; 100% KRaft native.' }
      ],
      modernStatus: 'The foundational nervous system of modern enterprise architectures, streaming data across banks, logistics, ride-sharing, and real-time analytics.'
    },
    realWorldUseCases: [
      {
        industry: 'FinTech & Real-Time Fraud Detection',
        exampleCompany: 'PayPal & Visa',
        problemSolved: 'Evaluating payment transactions against hundreds of machine learning fraud detection models in under 50 milliseconds.',
        architectureFit: 'Kafka partitioned topics consumed in parallel by stream processing engines (Flink, Kafka Streams).'
      },
      {
        industry: 'Ride-Hailing & Real-Time Geo-Tracking',
        exampleCompany: 'Uber & Lyft',
        problemSolved: 'Ingesting GPS location pings from millions of drivers simultaneously and dispatching ride matches.',
        architectureFit: 'Kafka partitioned by geohash/driver_id with strict ordering guarantees per partition.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Append-Only Commit Log & Zero-Copy I/O Internals',
        explanation: 'Kafka achieves millions of messages per second by treating topics as partitioned append-only disk logs. Disk sequential writes are nearly as fast as RAM sequential writes.',
        internals: 'Kafka utilizes the Linux kernel "sendfile" system call (Zero-Copy). Data is transferred directly from OS page cache memory to network sockets without copying bytes into JVM user-space memory, bypassing CPU copying overhead.'
      },
      {
        title: 'Partitioning & Consumer Group Rebalancing',
        explanation: 'A topic is split into partitions. Messages with the same partition key (e.g., customer_id) are guaranteed to arrive in strict chronological order within that partition.',
        internals: 'Consumer groups share the workload: each consumer thread reads from a unique subset of partitions. When consumers join or crash, the Group Coordinator initiates a partition rebalance to reassign ownership.'
      }
    ],
    codeExamples: [
      {
        title: 'Production Kafka Producer with Idempotence & Safe Retries',
        language: 'typescript',
        code: `// Enterprise Kafka Producer in TypeScript using Kafkajs
import { Kafka, Partitioners, CompressionTypes } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'billing-dispatcher',
  brokers: ['kafka-broker-1:9092', 'kafka-broker-2:9092', 'kafka-broker-3:9092'],
  ssl: true,
  retry: {
    initialRetryTime: 300,
    retries: 8
  }
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
  // Idempotent producer prevents duplicate message writes during network retries
  idempotent: true,
  maxInFlightRequests: 1
});

export async function publishOrderEvent(orderId: string, customerId: string, eventType: string, payload: object) {
  await producer.connect();

  await producer.send({
    topic: 'orders.events.v1',
    compression: CompressionTypes.GZIP,
    messages: [
      {
        // Using customerId as key guarantees that all events for the same customer
        // land on the exact same partition in strict sequential order!
        key: customerId,
        value: JSON.stringify({
          eventId: crypto.randomUUID(),
          orderId,
          customerId,
          eventType,
          timestamp: new Date().toISOString(),
          data: payload
        }),
        headers: {
          'correlation-id': crypto.randomUUID(),
          'producer-version': '2.1.0'
        }
      }
    ]
  });
}`,
        explanation: 'Demonstrates enterprise partition key routing, idempotent producer configuration, GZIP compression, and correlation ID tracing.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Local Kafka Cluster with KRaft',
        actionableTasks: [
          'Run a single-node KRaft Kafka cluster locally using Docker Compose without ZooKeeper.',
          'Use CLI tools (kafka-topics.sh, kafka-console-producer.sh, kafka-console-consumer.sh) to inspect offsets.',
          'Experiment with consumer groups and watch partition rebalancing when adding consumers.'
        ],
        keyCommands: ['docker run -d --name kafka -p 9092:9092 apache/kafka:latest', 'kafka-topics.sh --create --topic test-topic --partitions 3 --bootstrap-server localhost:9092']
      },
      {
        step: 2,
        phase: 'Stream Processing & Schema Registry',
        actionableTasks: [
          'Enforce API contracts using Avro or Protobuf with Confluent Schema Registry to prevent poison pill messages.',
          'Implement the Transactional Outbox Pattern to synchronize database writes with Kafka topics.',
          'Monitor consumer lag using Burrow or Prometheus metrics.'
        ],
        keyCommands: ['kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group order-processors']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using random keys or null keys for domain messages that require strict sequential ordering.',
        whyItHurts: 'Null keys are round-robined across all partitions. A "UserCancelled" event can be processed before "UserCreated", corrupting downstream database state.',
        solution: 'Always set a consistent partition key (such as entity ID or account ID) for messages that have ordering dependencies.'
      },
      {
        mistake: 'Committing consumer offsets before the business logic processing finishes.',
        whyItHurts: 'If the consumer process crashes mid-processing, the offset was already marked completed. The message is permanently lost.',
        solution: 'Disable auto-commit (enable.auto.commit=false) and commit offsets manually after the database transaction successfully completes.'
      }
    ]
  },
  {
    id: 'postgres-redis',
    name: 'PostgreSQL & Redis: High-Performance Data Architecture',
    category: 'Databases & APIs',
    tagline: 'MVCC, WAL, B-Tree Indexing, In-Memory Data Structures, and Distributed Caching',
    iconName: 'Database',
    popularityRank: '#1 Database & #1 In-Memory Cache in Global Enterprise',
    historyAndEvolution: {
      originYear: 1986,
      creator: 'Michael Stonebraker (Postgres) & Salvatore Sanfilippo (Redis - 2009)',
      background: 'Postgres originated at UC Berkeley as the successor to INGRES to implement object-relational capabilities with strict ACID compliance. Redis was created by Salvatore Sanfilippo (antirez) to solve high-velocity real-time log analysis and counter performance bottlenecks that traditional disk databases struggled with.',
      keyMilestones: [
        { year: 1996, event: 'PostgreSQL introduces SQL support and open-source governance.' },
        { year: 2009, event: 'Redis 1.0 released, revolutionizing in-memory key-value performance.' },
        { year: 2014, event: 'Postgres 9.4 adds native JSONB indexing (GIN index), outperforming MongoDB in many document workloads.' },
        { year: 2020, event: 'Redis 6.0 adds ACLs, multi-threaded I/O, and client-side caching.' },
        { year: 2024, event: 'PostgreSQL 17 optimizes memory management, query planning, and logical replication failover.' }
      ],
      modernStatus: 'The standard pairing in modern software architecture: PostgreSQL as the durable, transactional source of truth, and Redis as the ultra-fast sub-millisecond cache and ephemeral coordination layer.'
    },
    realWorldUseCases: [
      {
        industry: 'FinTech & Banking',
        exampleCompany: 'Robinhood & Nubank',
        problemSolved: 'Guaranteeing zero balance drift during concurrent transfers with PostgreSQL SERIALIZABLE isolation and Redis distributed redlocks.',
        architectureFit: 'Postgres primary-replica cluster with Redis cluster for live stock ticker caching.'
      },
      {
        industry: 'Social Networks & Feeds',
        exampleCompany: 'Twitter / X & Reddit',
        problemSolved: 'Serving billions of timeline queries per minute with under 5ms latency.',
        architectureFit: 'Redis Sorted Sets (ZSET) for timeline score ordering; Postgres for persistent user archives.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'PostgreSQL Multi-Version Concurrency Control (MVCC) & VACUUM',
        explanation: 'Postgres enables concurrent reads and writes without locking tables. When a row is updated or deleted, Postgres does not overwrite the physical disk block. Instead, it creates a new tuple version with xmin and xmax transaction IDs.',
        internals: 'Old tuple versions become "dead tuples". The autovacuum background worker scans pages and reclaims space for new tuples. B-Trees maintain index pointers until vacuum cleans up index leaves.'
      },
      {
        title: 'Redis Single-Threaded Event Loop & Skiplists',
        explanation: 'Redis executes commands on a single thread using non-blocking I/O multiplexing (epoll/kqueue). This eliminates context-switching overhead and lock contention, achieving over 100,000 operations per second per core.',
        internals: 'Sorted Sets (ZSET) are implemented using a dual data structure: a Hash Table (for O(1) score lookup) and a Skiplist (probabilistic balanced hierarchy for O(log N) range queries).'
      }
    ],
    codeExamples: [
      {
        title: 'Safe Redis Distributed Lock (Redlock Pattern) in TypeScript',
        language: 'typescript',
        code: `import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379');

// Atomic lock acquisition using SET with NX (only if Not eXists) and PX (millisecond TTL)
export async function acquireLock(lockKey: string, ttlMs: number): Promise<string | null> {
  const token = crypto.randomUUID();
  const acquired = await redis.set(\`lock:\${lockKey}\`, token, 'PX', ttlMs, 'NX');
  return acquired === 'OK' ? token : null;
}

// Atomic lock release using Lua script to guarantee we only release our own token!
export async function releaseLock(lockKey: string, token: string): Promise<boolean> {
  const luaScript = \`
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  \`;
  const result = await redis.eval(luaScript, 1, \`lock:\${lockKey}\`, token);
  return result === 1;
}

// Resilient execution wrapper
export async function withLock<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const token = await acquireLock(key, ttlMs);
  if (!token) {
    throw new Error(\`Failed to acquire lock for resource: \${key}\`);
  }
  try {
    return await fn();
  } finally {
    await releaseLock(key, token);
  }
}`,
        explanation: 'Implements atomic distributed mutual exclusion using Redis SET NX and safe Lua script release verification.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Postgres & Redis Local Infrastructure',
        actionableTasks: [
          'Spin up PostgreSQL and Redis with persistence (AOF/RDB) via Docker Compose.',
          'Connect using psql and redis-cli to practice index creation and Redis data structures (Hash, Set, ZSet, HyperLogLog).',
          'Learn EXPLAIN (ANALYZE, BUFFERS) to optimize slow queries.'
        ],
        keyCommands: ['docker-compose up -d postgres redis', 'psql -U postgres -d mydb', 'redis-cli ping', 'EXPLAIN ANALYZE SELECT * FROM users;']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using KEYS * in production Redis instances.',
        whyItHurts: 'KEYS * is an O(N) blocking operation. On a database with millions of keys, it halts the single-threaded event loop for seconds or minutes, triggering cascade timeouts.',
        solution: 'Use SCAN instead, which iterates keys incrementally in non-blocking batches.'
      },
      {
        mistake: 'Missing foreign key indexes in PostgreSQL.',
        whyItHurts: 'Postgres creates indexes on PRIMARY KEYs automatically, but NOT on foreign key columns. Deleting a parent row will cause a sequential table scan of the child table, locking it.',
        solution: 'Always explicitly create an index on every foreign key column.'
      }
    ]
  },
  {
    id: 'linux-systems',
    name: 'Linux Internals, Systems & eBPF',
    category: 'Systems & Distributed',
    tagline: 'Kernel Syscalls, Memory Virtualization, epoll, and Programmable eBPF Observability',
    iconName: 'Cpu',
    popularityRank: 'Foundational Substrate for 95%+ of Global Cloud Servers',
    historyAndEvolution: {
      originYear: 1991,
      creator: 'Linus Torvalds (University of Helsinki)',
      background: 'Created as a free, open-source UNIX-like kernel for x86 PCs. Evolved into the universal computing engine powering cloud datacenters, supercomputers, Android devices, and aerospace systems.',
      keyMilestones: [
        { year: 1991, event: 'Linus Torvalds posts famous announcement on comp.os.minix.' },
        { year: 2002, event: 'Linux 2.6 introduces the O(1) scheduler and epoll for scalable network I/O.' },
        { year: 2014, event: 'Extended Berkeley Packet Filter (eBPF) introduced, making the kernel safely programmable at runtime.' },
        { year: 2020, event: 'io_uring added, enabling zero-syscall asynchronous I/O.' },
        { year: 2025, event: 'Widespread production adoption of eBPF-based networking (Cilium) and security observability (Falco).' }
      ],
      modernStatus: 'The foundational platform for virtually all cloud infrastructure, container engines, and distributed databases.'
    },
    realWorldUseCases: [
      {
        industry: 'Cloud Infrastructure & High-Speed Networking',
        exampleCompany: 'Meta & Cloudflare',
        problemSolved: 'Filtering out multi-terabit DDoS attack traffic at the network card level before packets touch the Linux network stack.',
        architectureFit: 'eBPF XDP (eXpress Data Path) programs running directly on the network driver.'
      },
      {
        industry: 'FinTech Ultra-Low Latency Trading',
        exampleCompany: 'Citadel & Two Sigma',
        problemSolved: 'Bypassing kernel context-switching latency using user-space networking and memory pinning.',
        architectureFit: 'Kernel bypass (DPDK) and CPU core pinning (isolcpus) on bare metal Linux nodes.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Virtual Memory, Page Tables, and Translation Lookaside Buffers (TLB)',
        explanation: 'Processes do not access physical RAM directly; they interact with a 64-bit virtual address space managed by the Memory Management Unit (MMU).',
        internals: 'The kernel maps 4KB virtual pages to physical frames using hierarchical multi-level page tables. The TLB caches recent translations. A TLB miss incurs high-latency page table walks in RAM.'
      },
      {
        title: 'Non-Blocking I/O Multiplexing with epoll',
        explanation: 'Legacy select/poll required scanning thousands of file descriptors (O(N)). epoll operates in O(1) time by maintaining an event interest list in the kernel using a Red-Black tree and a ready list using a linked list.',
        internals: 'When data arrives on a network interface card (NIC), the hardware interrupt triggers the network driver, which marks the file descriptor and wakes up the sleeping process via the ready list.'
      }
    ],
    codeExamples: [
      {
        title: 'Essential Linux Performance Troubleshooting Commands & eBPF Trace',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Production SRE Linux Triage Checklist

echo "=== 1. CPU & Load Average (Verify saturation vs starvation) ==="
uptime
# Check user, system, iowait (%iowait > 10% indicates disk bottleneck)
vmstat 1 5

echo "=== 2. Memory & Swapping (Check for memory leak pressure) ==="
free -h
# Check which processes consume top resident memory (RSS)
ps aux --sort=-%mem | head -n 10

echo "=== 3. Disk I/O Saturation (Look at %util and await ms) ==="
iostat -xz 1 3

echo "=== 4. Network Connections & TCP Socket States ==="
# Check sockets in TIME_WAIT, CLOSE_WAIT, ESTABLISHED
ss -s
# Check TCP retransmits (indicating packet loss)
netstat -s | grep -i retrans

echo "=== 5. eBPF Real-Time Tracing (Trace slow block I/O > 10ms) ==="
# Using bpftrace to inspect block device I/O latency distribution
# bpftrace -e 'kprobe:blk_account_io_done { @[kstack] = count(); }'`,
        explanation: 'Comprehensive diagnostic commands used by Senior Site Reliability Engineers (SREs) during live production incidents.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Systems Fundamentals & Shell Scripting',
        actionableTasks: [
          'Master POSIX shell scripting, signals (SIGTERM, SIGKILL, SIGHUP), and exit codes.',
          'Inspect /proc filesystem: /proc/cpuinfo, /proc/meminfo, /proc/[pid]/status.',
          'Learn systemd service configuration and journalctl logging.'
        ],
        keyCommands: ['top', 'htop', 'strace -p <PID>', 'journalctl -u my-service -f']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Misinterpreting Linux "Load Average" as strictly CPU utilization.',
        whyItHurts: 'On Linux, load average includes processes in the Uninterruptible Sleep (D) state waiting for disk I/O or NFS locks. You might scale CPU when the disk is the true bottleneck.',
        solution: 'Use vmstat or pidstat to check if threads are waiting on CPU (%usr/%sys) or disk (%wa).'
      }
    ]
  },
  {
    id: 'java-jvm',
    name: 'Java 21+ & The Modern JVM',
    category: 'Language',
    tagline: 'Virtual Threads (Project Loom), ZGC Generational Garbage Collection & GraalVM Native Images',
    iconName: 'Coffee',
    popularityRank: '#1 Enterprise Banking & High-Throughput Global Backend Workloads',
    curriculum: languageCurricula['java'],
    historyAndEvolution: {
      originYear: 1995,
      creator: 'James Gosling (Sun Microsystems)',
      background: 'Created under the mantra "Write Once, Run Anywhere" (WORA) via bytecode running on the Java Virtual Machine (JVM). Transformed enterprise computing through robust memory management, static typing, and high-performance HotSpot JIT compiling.',
      keyMilestones: [
        { year: 1996, event: 'JDK 1.0 released by Sun Microsystems.' },
        { year: 2004, event: 'Java 5 introduces Generics, Annotations, and java.util.concurrent.' },
        { year: 2014, event: 'Java 8 introduces Lambdas, Streams API, and CompletableFuture.' },
        { year: 2018, event: 'Oracle shifts to a predictable 6-month release cadence with Long-Term Support (LTS) releases.' },
        { year: 2023, event: 'Java 21 LTS ships Virtual Threads (Project Loom), Pattern Matching, and Record Patterns.' },
        { year: 2025, event: 'Java 25 LTS delivers Project Leyden faster startup, Project Valhalla value objects.' }
      ],
      modernStatus: 'The foundational enterprise runtime powering global banking, trading platforms, Kafka clusters, Cassandra, and high-scale Spring Boot microservices.'
    },
    realWorldUseCases: [
      {
        industry: 'Global Investment Banking & Trading',
        exampleCompany: 'Goldman Sachs & JPMorgan Chase',
        problemSolved: 'Processing millions of financial ledger movements per second with strict thread isolation and sub-millisecond GC pauses.',
        architectureFit: 'Low-latency JVM clusters running with Generational ZGC on high-memory multi-socket servers.'
      },
      {
        industry: 'Big Data & Streaming Platforms',
        exampleCompany: 'Netflix & LinkedIn',
        problemSolved: 'Running massive distributed compute clusters (Apache Spark, Apache Flink, Kafka) over terabytes of memory.',
        architectureFit: 'HotSpot JVM optimizing JIT loops dynamically at runtime.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Virtual Threads (Project Loom) & Continuation Mechanics',
        explanation: 'Traditional Java threads map 1:1 to heavy Operating System kernel threads (~1MB stack each). Virtual Threads are M:N lightweight threads managed by the JVM runtime that consume only a few hundred bytes.',
        internals: 'When a Virtual Thread executes a blocking operation (e.g. database query, network socket read), the JVM unmounts the Virtual Thread continuation from its carrier OS thread. The carrier thread immediately processes other tasks. When I/O completes, the OS unblocks and the continuation resumes on any available carrier thread.'
      },
      {
        title: 'Generational Z Garbage Collector (ZGC) Internals',
        explanation: 'Legacy G1GC or ParallelGC suffered from stop-the-world (STW) pauses proportional to heap size. ZGC achieves pause times under 1 millisecond on multi-terabyte heaps.',
        internals: 'ZGC uses colored pointers (reference bits storing GC metadata) and load barriers. The garbage collector marks, relocates, and compacts memory concurrently with application threads.'
      }
    ],
    architectureDiagram: {
      title: 'Project Loom: Virtual Threads Multiplexing over Carrier OS Threads',
      caption: 'Millions of lightweight Virtual Threads efficiently scheduled over a small pool of ForkJoinPool Carrier OS Threads.',
      type: 'flow',
      svgContent: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="240" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="32" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">JAVA 21 CONCURRENCY: M:N VIRTUAL THREAD MULTIPLEXING</text>
        
        <!-- Virtual Threads Tier -->
        <rect x="40" y="60" width="620" height="50" rx="8" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="56" y="80" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold">User Space: Virtual Threads Pool (1,000,000+ Concurrent Tasks)</text>
        <circle cx="80" cy="98" r="6" fill="#818cf8"/>
        <circle cx="110" cy="98" r="6" fill="#818cf8"/>
        <circle cx="140" cy="98" r="6" fill="#818cf8"/>
        <circle cx="170" cy="98" r="6" fill="#818cf8"/>
        <circle cx="200" cy="98" r="6" fill="#818cf8"/>
        <text x="220" y="102" fill="#64748b" font-family="monospace" font-size="11">... ~few hundred bytes RAM per task</text>

        <!-- Dispatcher arrows -->
        <path d="M140 110 L140 140" stroke="#6366f1" stroke-width="2" stroke-dasharray="3 3"/>
        <path d="M350 110 L350 140" stroke="#6366f1" stroke-width="2" stroke-dasharray="3 3"/>
        <path d="M560 110 L560 140" stroke="#6366f1" stroke-width="2" stroke-dasharray="3 3"/>

        <!-- Carrier OS Threads Tier -->
        <rect x="40" y="145" width="620" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
        <text x="56" y="168" fill="#e2e8f0" font-family="sans-serif" font-size="12" font-weight="bold">JVM Carrier Pool (ForkJoinPool): N Threads = Number of CPU Cores</text>
        
        <rect x="56" y="180" width="130" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
        <text x="68" y="195" fill="#38bdf8" font-family="monospace" font-size="10">Carrier Thread 1</text>

        <rect x="200" y="180" width="130" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
        <text x="212" y="195" fill="#38bdf8" font-family="monospace" font-size="10">Carrier Thread 2</text>

        <rect x="344" y="180" width="130" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
        <text x="356" y="195" fill="#38bdf8" font-family="monospace" font-size="10">Carrier Thread 3</text>

        <rect x="488" y="180" width="130" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
        <text x="500" y="195" fill="#38bdf8" font-family="monospace" font-size="10">Carrier Thread 4</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production Java 21 Structured Concurrency with Virtual Threads & AutoCloseable',
        language: 'java',
        code: `package com.platform.billing;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.Executors;

public class HighThroughputPaymentService {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(2))
            .build();

    public record SettlementResult(String accountId, boolean approved, long latencyMs) {}

    // Java 21 Structured Task Execution using Virtual Threads
    public SettlementResult processSettlement(String accountId, double amount) throws Exception {
        long startTime = System.currentTimeMillis();

        // Executors.newVirtualThreadPerTaskExecutor creates lightweight threads on demand
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            
            var fraudCheckTask = executor.submit(() -> checkFraudRules(accountId, amount));
            var creditBalanceTask = executor.submit(() -> queryCreditLimit(accountId));

            // Structured boundary: Both virtual threads execute in parallel without blocking OS threads
            boolean fraudClean = fraudCheckTask.get();
            boolean sufficientBalance = creditBalanceTask.get();

            boolean approved = fraudClean && sufficientBalance;
            long duration = System.currentTimeMillis() - startTime;

            return new SettlementResult(accountId, approved, duration);
        }
    }

    private boolean checkFraudRules(String accountId) throws Exception {
        var req = HttpRequest.newBuilder(URI.create("https://fraud.corp.internal/v1/check?acc=" + accountId))
                .GET().build();
        var res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        return res.statusCode() == 200;
    }

    private boolean queryCreditLimit(String accountId) throws Exception {
        var req = HttpRequest.newBuilder(URI.create("https://ledger.corp.internal/v1/balance?acc=" + accountId))
                .GET().build();
        var res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        return res.statusCode() == 200;
    }
}`,
        explanation: 'Demonstrates modern Java 21 LTS virtual thread per task execution, record types, and synchronous-style non-blocking network I/O.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'JDK 21 LTS Installation & SDKMAN Toolchain',
        actionableTasks: [
          'Install latest OpenJDK 21 LTS (Temurin or GraalVM) via sdkman.',
          'Adopt modern build tools: Gradle with Kotlin DSL or Maven 3.9+ with wrapper.',
          'Enable preview features when experimenting with Vector API or Foreign Function & Memory API (FFM).'
        ],
        keyCommands: ['sdk install java 21.0.2-tem', 'java --version', './gradlew build']
      },
      {
        step: 2,
        phase: 'Spring Boot 3 & Native Image Compilation',
        actionableTasks: [
          'Initialize Spring Boot 3 with Spring Data JPA and Spring Web.',
          'Configure server.tomcat.threads.virtual.enabled=true for instant 5x concurrency scaling.',
          'Compile to GraalVM Ahead-of-Time (AOT) native image for sub-20ms container boot times.'
        ],
        keyCommands: ['./gradlew bootRun', './gradlew nativeCompile', 'docker build -t app:native .']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using synchronized blocks around blocking I/O calls when using Virtual Threads ("Thread Pinning").',
        whyItHurts: 'Holding an intrinsic synchronized monitor lock during blocking I/O pins the Virtual Thread to its carrier OS thread, preventing other virtual threads from using the CPU core.',
        solution: 'Replace synchronized blocks with java.util.concurrent.locks.ReentrantLock, which releases cleanly during blocking waits.'
      }
    ]
  },
  {
    id: 'cpp-systems',
    name: 'Modern C++ (C++20 / C++23) Systems Engineering',
    category: 'Systems & Distributed',
    tagline: 'Concepts, Ranges, Coroutines, RAII, Memory Models & Direct Hardware Control',
    iconName: 'Cpu',
    popularityRank: '#1 for Ultra-Low-Latency Trading Engines, Game Engines & Operating Systems',
    curriculum: languageCurricula['cpp-systems'],
    historyAndEvolution: {
      originYear: 1985,
      creator: 'Bjarne Stroustrup (Bell Labs)',
      background: 'Created as "C with Classes" to add object-oriented programming to C while retaining zero runtime overhead and direct hardware access. Transformed in 2011 (Modern C++11) with move semantics and smart pointers, and modernized in C++20 with Concepts and Modules.',
      keyMilestones: [
        { year: 1998, event: 'C++98 standardized with the Standard Template Library (STL).' },
        { year: 2011, event: 'C++11 revolution: auto, move semantics (std::move), lambda functions, std::unique_ptr.' },
        { year: 2020, event: 'C++20 introduces Concepts, Ranges, Coroutines, and Modules.' },
        { year: 2023, event: 'C++23 introduces std::expected, deducing this, std::mdspan multi-dimensional arrays.' }
      ],
      modernStatus: 'The foundational language for performance-critical systems: game engines (Unreal Engine 5), browser engines (Chromium/V8), LLM inference engines (llama.cpp), and high-frequency trading (HFT).'
    },
    realWorldUseCases: [
      {
        industry: 'High-Frequency Trading (HFT)',
        exampleCompany: 'Citadel Securities & Jump Trading',
        problemSolved: 'Executing stock market orders in sub-microsecond latency (<800 nanoseconds) directly on network interface cards.',
        architectureFit: 'Lock-free ring buffers, cache-line aligned memory structs, and compiler intrinsics.'
      },
      {
        industry: 'Generative AI & Inference Systems',
        exampleCompany: 'llama.cpp & vLLM core',
        problemSolved: 'Computing quantized matrix multiplications on CPU and GPU with zero runtime memory bloat.',
        architectureFit: 'SIMD AVX-512 / ARM Neon vector instructions mapped to raw memory buffers.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Resource Acquisition Is Initialization (RAII) & Move Semantics',
        explanation: 'In C++, resources (heap memory, socket descriptors, mutex locks) are tied to object lifetimes. When an object goes out of stack scope, its destructor is deterministically invoked immediately.',
        internals: 'Move semantics (rvalue references &&) allow transferring ownership of expensive heap resources by swapping pointer addresses in O(1) time without allocating or copying memory buffers.'
      },
      {
        title: 'Concepts & Compile-Time Metaprogramming in C++20',
        explanation: 'Legacy template metaprogramming produced thousand-line compiler error spews. C++20 Concepts enforce compile-time predicates on template arguments.',
        internals: 'Concepts are evaluated during type deduction before code generation, rejecting invalid types instantaneously and enabling compiler SFINAE optimizations.'
      }
    ],
    architectureDiagram: {
      title: 'Modern C++ Memory Layout: Stack Frames vs Heap & RAII Destruction Order',
      caption: 'Deterministic stack unwind invoking destructors in reverse declaration order, preventing leaks without garbage collection.',
      type: 'memory',
      svgContent: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="240" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="32" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">MODERN C++ MEMORY HIERARCHY & DETERMINISTIC RAII</text>
        
        <!-- Stack Memory Column -->
        <rect x="40" y="55" width="280" height="160" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="56" y="78" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">Stack Memory (High Speed / O(1))</text>
        
        <rect x="56" y="90" width="248" height="32" rx="4" fill="#0f172a" stroke="#475569"/>
        <text x="68" y="110" fill="#e2e8f0" font-family="monospace" font-size="10">std::unique_ptr&lt;Buffer&gt; (8 bytes ptr)</text>

        <rect x="56" y="130" width="248" height="32" rx="4" fill="#0f172a" stroke="#475569"/>
        <text x="68" y="150" fill="#e2e8f0" font-family="monospace" font-size="10">std::lock_guard&lt;std::mutex&gt; (RAII)</text>

        <text x="56" y="195" fill="#64748b" font-family="monospace" font-size="10">↓ Stack Unwinds: ~0ns deallocation</text>

        <!-- Pointer Arrow -->
        <path d="M304 106 L410 106" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Heap Memory Column -->
        <rect x="410" y="55" width="250" height="160" rx="8" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="426" y="78" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold">Heap Memory (Dynamic Storage)</text>

        <rect x="426" y="90" width="218" height="60" rx="4" fill="#0f172a" stroke="#6366f1"/>
        <text x="438" y="115" fill="#c7d2fe" font-family="monospace" font-size="11">Contiguous Buffer</text>
        <text x="438" y="135" fill="#818cf8" font-family="monospace" font-size="10">100,000 raw market ticks</text>
        
        <text x="426" y="195" fill="#a5b4fc" font-family="monospace" font-size="10">✓ Freed by unique_ptr destructor</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production C++20 Concepts & Zero-Copy Lock-Free Ring Buffer',
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <concepts>
#include <memory>
#include <atomic>
#include <span>

// C++20 Concept: Enforce that T is trivially copyable for SIMD and memory-mapped I/O
template <typename T>
concept TriviallyMovable = std::is_trivially_copyable_v<T> && sizeof(T) <= 64;

template <TriviallyMovable T, size_t Capacity>
class LockFreeRingBuffer {
private:
    alignas(64) T buffer_[Capacity]; // Cache-line aligned (prevents false sharing)
    alignas(64) std::atomic<size_t> head_{0};
    alignas(64) std::atomic<size_t> tail_{0};

public:
    LockFreeRingBuffer() = default;

    bool push(const T& item) noexcept {
        size_t current_tail = tail_.load(std::memory_order_relaxed);
        size_t next_tail = (current_tail + 1) % Capacity;

        // If buffer full, reject push in O(1)
        if (next_tail == head_.load(std::memory_order_acquire)) {
            return false;
        }

        buffer_[current_tail] = item;
        tail_.store(next_tail, std::memory_order_release);
        return true;
    }

    bool pop(T& out_item) noexcept {
        size_t current_head = head_.load(std::memory_order_relaxed);

        if (current_head == tail_.load(std::memory_order_acquire)) {
            return false; // Empty buffer
        }

        out_item = buffer_[current_head];
        head_.store((current_head + 1) % Capacity, std::memory_order_release);
        return true;
    }
};

struct MarketTick {
    uint64_t timestamp_ns;
    uint32_t security_id;
    double price;
    uint32_t volume;
};

int main() {
    LockFreeRingBuffer<MarketTick, 1024> queue;
    MarketTick tick{1710000000000, 42, 185.50, 100};

    if (queue.push(tick)) {
        std::cout << "Tick pushed with zero locks and zero heap allocation.\\n";
    }
    return 0;
}`,
        explanation: 'Shows modern C++20 concepts, cache-line alignment to eliminate multi-core false sharing, and atomic memory order semantics.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Compiler Toolchain & CMake Build Systems',
        actionableTasks: [
          'Install Clang 18 or GCC 14 with C++20/C++23 support enabled.',
          'Adopt modern CMake (version 3.28+) with target-based configuration (target_compile_features).',
          'Configure sanitizers: AddressSanitizer (-fsanitize=address) and ThreadSanitizer (-fsanitize=thread).'
        ],
        keyCommands: ['clang++ --version', 'cmake -B build -S . -DCMAKE_CXX_STANDARD=20', 'cmake --build build']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using raw pointers with manual new / delete.',
        whyItHurts: 'If an exception is thrown before delete is called, memory leaks permanently.',
        solution: 'Always use std::unique_ptr for exclusive ownership or std::shared_ptr for shared ownership.'
      }
    ]
  },
  {
    id: 'csharp-dotnet',
    name: 'C# 13 & High-Performance .NET 9',
    category: 'Language',
    tagline: 'Tiered JIT Compilation, Span<T> Zero-Allocation Slices & High-Scale Kestrel Microservices',
    iconName: 'Code',
    popularityRank: 'Top Enterprise & Cloud Platform Language',
    curriculum: languageCurricula['csharp-dotnet'],
    historyAndEvolution: {
      originYear: 2000,
      creator: 'Anders Hejlsberg (Microsoft)',
      background: 'Created as an elegant, object-oriented language for the Common Language Runtime (CLR). Rebuilt from scratch in 2016 as cross-platform, open-source .NET Core, becoming one of the fastest runtime engines in the world.',
      keyMilestones: [
        { year: 2002, event: 'C# 1.0 launched alongside .NET Framework 1.0.' },
        { year: 2012, event: 'C# 5.0 introduces modern async/await syntax, revolutionizing asynchronous programming.' },
        { year: 2016, event: '.NET Core 1.0 released: cross-platform, open-source, modular runtime.' },
        { year: 2020, event: '.NET 5 unifies .NET Framework, Core, and Mono into a single ecosystem.' },
        { year: 2024, event: '.NET 9 & C# 13 introduce Dynamic PGO JIT optimizations and Native AOT improvements.' }
      ],
      modernStatus: 'A powerhouse in enterprise backends, gaming (Unity), and microservices, outperforming Node.js, Go, and Java in TechEmpower web benchmarks.'
    },
    realWorldUseCases: [
      {
        industry: 'Gaming & Interactive Media',
        exampleCompany: 'Unity Technologies & Microsoft Xbox',
        problemSolved: 'Driving millions of game physics and rendering calculations per second across millions of player devices.',
        architectureFit: 'High-speed C# scripting compiled via IL2CPP down to native C++ machine code.'
      },
      {
        industry: 'Cloud Microservices',
        exampleCompany: 'Stack Overflow & Microsoft Azure',
        problemSolved: 'Serving tens of billions of web requests per month on minimal server hardware with Kestrel.',
        architectureFit: 'ASP.NET Core Minimal APIs compiled with Native AOT for zero-overhead cloud deployment.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Span<T> and Memory<T> Zero-Copy Allocation Mechanics',
        explanation: 'String slicing traditionally creates duplicate heap objects, filling the garbage collector. Span<T> is a ref struct representing a contiguous region of arbitrary memory (stack, heap, or native memory) without allocating a single byte.',
        internals: 'A Span<T> contains only a managed pointer and a 32-bit length integer. The CLR JIT optimizes away index bounds checks when iterating spans.'
      },
      {
        title: 'Tiered Compilation with Dynamic Profile-Guided Optimization (PGO)',
        explanation: 'When a method first executes, the JIT compiles it quickly (Tier 0) without optimization. The runtime profiles call frequency and branch probability.',
        internals: 'Hot methods are recompiled (Tier 1) with aggressive inlining, loop unrolling, and vectorization based on real production execution profiles.'
      }
    ],
    architectureDiagram: {
      title: '.NET CLR Dynamic PGO (Profile-Guided Optimization) Tiered JIT',
      caption: 'Two-tier JIT compiler delivering instant cold boot times while progressively optimizing hot execution paths.',
      type: 'flow',
      svgContent: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="240" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="32" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">.NET 9 JIT: TIERED COMPILATION WITH DYNAMIC PGO</text>

        <!-- Step 1: IL Code -->
        <rect x="40" y="65" width="160" height="135" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="56" y="90" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">1. Intermediate (IL)</text>
        <text x="56" y="115" fill="#94a3b8" font-family="monospace" font-size="10">Portable Bytecode</text>
        <text x="56" y="135" fill="#94a3b8" font-family="monospace" font-size="10">Class metadata</text>
        <text x="56" y="170" fill="#64748b" font-family="monospace" font-size="10">~Sub-millisecond load</text>

        <path d="M200 132 L250 132" stroke="#64748b" stroke-width="2"/>

        <!-- Step 2: Tier 0 JIT -->
        <rect x="250" y="65" width="180" height="135" rx="8" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="266" y="90" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold">2. Tier 0 JIT (Fast)</text>
        <text x="266" y="115" fill="#c7d2fe" font-family="monospace" font-size="10">Zero optimizations</text>
        <text x="266" y="135" fill="#818cf8" font-family="monospace" font-size="10">Instrumenting calls...</text>
        <text x="266" y="170" fill="#a5b4fc" font-family="monospace" font-size="10">Tracks branch stats</text>

        <path d="M430 132 L480 132" stroke="#6366f1" stroke-width="2"/>

        <!-- Step 3: Tier 1 Optimized JIT -->
        <rect x="480" y="65" width="180" height="135" rx="8" fill="#064e3b" stroke="#059669"/>
        <text x="496" y="90" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="bold">3. Tier 1 Optimized</text>
        <text x="496" y="115" fill="#a7f3d0" font-family="monospace" font-size="10">Dynamic PGO inlining</text>
        <text x="496" y="135" fill="#a7f3d0" font-family="monospace" font-size="10">Loop vectorization (SIMD)</text>
        <text x="496" y="170" fill="#34d399" font-family="monospace" font-size="10">Maximum machine speed</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Zero-Allocation Header Parsing with Span<char> in C#',
        language: 'csharp',
        code: `using System;

public class HighSpeedHttpParser
{
    // Zero heap allocations: Span operates directly on the input string buffer
    public static (ReadOnlySpan<char> Key, ReadOnlySpan<char> Value) ParseHeaderLine(ReadOnlySpan<char> line)
    {
        int colonIndex = line.IndexOf(':');
        if (colonIndex == -1)
        {
            return (ReadOnlySpan<char>.Empty, ReadOnlySpan<char>.Empty);
        }

        // Slice produces a window into existing memory without allocating new string objects!
        ReadOnlySpan<char> key = line.Slice(0, colonIndex).Trim();
        ReadOnlySpan<char> value = line.Slice(colonIndex + 1).Trim();

        return (key, value);
    }
}

class Program
{
    static void Main()
    {
        string rawHeader = "Content-Type: application/json; charset=utf-8";
        var (name, val) = HighSpeedHttpParser.ParseHeaderLine(rawHeader.AsSpan());
        Console.WriteLine($"Header parsed with zero memory allocations: {name.ToString()} = {val.ToString()}");
    }
}`,
        explanation: 'Demonstrates C# Span<T> zero-allocation string parsing, preventing GC garbage generation in high-velocity web servers.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: '.NET 9 SDK & Minimal Web APIs',
        actionableTasks: [
          'Install latest .NET 9 SDK from dotnet.microsoft.com.',
          'Create a minimal web API using dotnet new web -o ApiService.',
          'Build and test with dotnet watch for sub-second hot reload.'
        ],
        keyCommands: ['dotnet --version', 'dotnet new webapi -o MyMicroservice', 'dotnet run']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Using .Result or .Wait() on asynchronous Tasks (sync-over-async).',
        whyItHurts: 'Blocking on async tasks causes thread pool starvation in ASP.NET Core, causing latency to spike from 10ms to timeouts under load.',
        solution: 'Always use async and await up the entire call chain.'
      }
    ]
  },
  {
    id: 'graphql-grpc',
    name: 'Modern API Protocols: gRPC, Protobuf & GraphQL Federation',
    category: 'Databases & APIs',
    tagline: 'Binary HTTP/2 Multiplexing, Strict Schema Contracts & Microservice Federation',
    iconName: 'Network',
    popularityRank: 'Standard Communication Backbone for Cloud Microservices',
    historyAndEvolution: {
      originYear: 2015,
      creator: 'Google (gRPC / Protobuf) & Meta (GraphQL)',
      background: 'Created to solve REST API inefficiencies: JSON parsing CPU bottlenecks, HTTP/1.1 head-of-line blocking, and over/under-fetching across mobile client devices.',
      keyMilestones: [
        { year: 2015, event: 'Google open-sources gRPC built on HTTP/2; Facebook open-sources GraphQL specification.' },
        { year: 2019, event: 'GraphQL Foundation formed under the Linux Foundation.' },
        { year: 2021, event: 'Apollo introduces Federation 2 for composable subgraphs.' },
        { year: 2024, event: 'gRPC over HTTP/3 (QUIC) and Connect protocol adoption.' }
      ],
      modernStatus: 'gRPC is the universal standard for internal backend microservice RPCs, while GraphQL dominates multi-platform client aggregation gateways.'
    },
    realWorldUseCases: [
      {
        industry: 'Microservice Architectures',
        exampleCompany: 'Netflix & Uber',
        problemSolved: 'Internal microservices exchanging billions of calls with minimal network serialization overhead and strict type contracts.',
        architectureFit: 'gRPC over HTTP/2 with bidirectional streaming and Protocol Buffer binary wire format.'
      },
      {
        industry: 'E-Commerce & Mobile Frontends',
        exampleCompany: 'Shopify & GitHub',
        problemSolved: 'Preventing over-fetching on mobile networks by allowing clients to request exactly the JSON fields they render.',
        architectureFit: 'Apollo GraphQL Federated Gateway querying downstream microservices.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Protocol Buffers (Protobuf) Varint Wire Encoding',
        explanation: 'JSON serializes field names as repetitive text strings on every packet. Protobuf encodes fields as numerical tags with variable-length zigzag integers (Varints).',
        internals: 'A payload of 100 bytes in JSON compresses down to 15-20 bytes in binary Protobuf, deserializing up to 10x faster with zero string parsing.'
      },
      {
        title: 'HTTP/2 Binary Framing & Multiplexing',
        explanation: 'HTTP/1.1 required opening multiple TCP connections to avoid blocking. HTTP/2 splits streams into independent binary frames multiplexed over a single TCP connection.',
        internals: 'Frames from concurrent RPC streams interleave transparently. Stream prioritization prevents large file transfers from starving latency-critical heartbeat pings.'
      }
    ],
    architectureDiagram: {
      title: 'gRPC HTTP/2 Multiplexed Binary Streams vs Legacy HTTP/1.1 REST',
      caption: 'Multiple concurrent bidirectional RPC streams packed into binary frames over a single persistent TCP connection.',
      type: 'network',
      svgContent: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="240" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="32" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">PROTOCOL ARCHITECTURE: HTTP/2 MULTIPLEXED BINARY FRAMES</text>

        <!-- Service A -->
        <rect x="40" y="70" width="140" height="130" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="56" y="100" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold">Client Service</text>
        <text x="56" y="125" fill="#94a3b8" font-family="monospace" font-size="10">gRPC Stub</text>
        <text x="56" y="145" fill="#94a3b8" font-family="monospace" font-size="10">Protobuf Serializer</text>

        <!-- Single Multiplexed TCP Pipeline -->
        <rect x="220" y="95" width="260" height="80" rx="6" fill="#0f172a" stroke="#6366f1"/>
        <text x="230" y="115" fill="#a5b4fc" font-family="monospace" font-size="11">Single TCP Connection (HTTP/2)</text>
        
        <rect x="230" y="125" width="70" height="20" rx="3" fill="#1e1b4b" stroke="#818cf8"/>
        <text x="236" y="139" fill="#c7d2fe" font-family="monospace" font-size="9">Stream 1 Frame</text>

        <rect x="310" y="125" width="70" height="20" rx="3" fill="#064e3b" stroke="#34d399"/>
        <text x="316" y="139" fill="#a7f3d0" font-family="monospace" font-size="9">Stream 2 Frame</text>

        <rect x="390" y="125" width="70" height="20" rx="3" fill="#1e1b4b" stroke="#818cf8"/>
        <text x="396" y="139" fill="#c7d2fe" font-family="monospace" font-size="9">Stream 1 Frame</text>

        <text x="230" y="165" fill="#64748b" font-family="monospace" font-size="10">0 Head-of-Line Blocking at HTTP layer</text>

        <!-- Service B -->
        <rect x="520" y="70" width="140" height="130" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="536" y="100" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="bold">Target Microservice</text>
        <text x="536" y="125" fill="#94a3b8" font-family="monospace" font-size="10">gRPC Server</text>
        <text x="536" y="145" fill="#94a3b8" font-family="monospace" font-size="10">Protobuf Deserializer</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Protobuf IDL Definition & Strongly Typed gRPC Service',
        language: 'protobuf',
        code: `syntax = "proto3";

package billing.v1;

option go_package = "github.com/corp/billing/gen/v1;billingv1";

service PaymentGateway {
  // Unary RPC: Single request, single response
  rpc ProcessPayment(PaymentRequest) returns (PaymentResponse);

  // Server Streaming: Client sends one request, server streams settlement events
  rpc StreamTransactions(TransactionQuery) returns (stream TransactionEvent);
}

message PaymentRequest {
  string transaction_id = 1; // Field tags save wire bytes!
  string account_id = 2;
  int64 amount_cents = 3;
  string currency = 4;
}

message PaymentResponse {
  bool success = 1;
  string authorization_code = 2;
  int64 settled_timestamp = 3;
}

message TransactionQuery {
  string account_id = 1;
  int64 start_time = 2;
}

message TransactionEvent {
  string event_id = 1;
  int64 amount_cents = 2;
  string status = 3;
}`,
        explanation: 'Protocol Buffer IDL defining unary and streaming gRPC endpoints with compact tag-based wire serializing.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Protobuf Compiler & Buf Tooling',
        actionableTasks: [
          'Install buf (modern CLI replacing complex raw protoc setups).',
          'Define service schemas in proto files with strict backward compatibility linting.',
          'Generate client and server code for Go, TypeScript, and Java automatically.'
        ],
        keyCommands: ['brew install bufbuild/buf/buf', 'buf lint', 'buf generate']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Reordering or changing existing field tag numbers in .proto definitions.',
        whyItHurts: 'Protobuf binary encoding relies entirely on tag numbers. Changing a tag corrupts deserialization for existing deployed services.',
        solution: 'Never change existing tag numbers. If deprecating a field, mark it as reserved.'
      }
    ]
  },
  {
    id: 'cloud-terraform',
    name: 'Cloud Native & Terraform (Infrastructure as Code)',
    category: 'Cloud & DevOps',
    tagline: 'Declarative State Graphs, Multi-Cloud Orchestration & Zero-Trust Cloud Architecture',
    iconName: 'Cloud',
    popularityRank: '#1 Standard for Enterprise Cloud Infrastructure Automation',
    historyAndEvolution: {
      originYear: 2014,
      creator: 'Mitchell Hashimoto (HashiCorp)',
      background: 'Created to replace fragile bash scripts and manual cloud console clicks with declarative HashiCorp Configuration Language (HCL), bringing version control and reproducibility to cloud infrastructure.',
      keyMilestones: [
        { year: 2014, event: 'Terraform 0.1 released by HashiCorp.' },
        { year: 2019, event: 'Terraform 0.12 modernizes HCL syntax with rich type expressions.' },
        { year: 2021, event: 'Terraform 1.0 released with enterprise stability guarantee.' },
        { year: 2023, event: 'OpenTofu created as open-source Linux Foundation fork under MPL license.' }
      ],
      modernStatus: 'The universal language for provisioning multi-cloud resources across AWS, GCP, Azure, and Kubernetes.'
    },
    realWorldUseCases: [
      {
        industry: 'FinTech Enterprise Platforms',
        exampleCompany: 'Coinbase & Stripe',
        problemSolved: 'Provisioning isolated, multi-region Virtual Private Clouds (VPCs) with strict SOC2 and PCI-DSS compliance audits.',
        architectureFit: 'Terraform modular blueprints provisioned via automated Atlantis or GitHub Actions pull requests.'
      }
    ],
    deepTechnicalConcepts: [
      {
        title: 'Directed Acyclic Graph (DAG) Resource Resolution',
        explanation: 'Terraform does not execute sequentially line by line. It compiles all resource references into a Directed Acyclic Graph (DAG).',
        internals: 'Independent resources are provisioned in parallel across multiple worker threads. Resources with dependencies (e.g. an EC2 subnet requiring a VPC ID) wait until parent nodes complete.'
      },
      {
        title: 'State Locking & Drift Detection',
        explanation: 'Terraform records real-world infrastructure IDs in a state file (terraform.tfstate). Remote backends (S3 + DynamoDB) enforce distributed locks.',
        internals: 'State locking prevents two team members from running concurrent mutations that corrupt cloud topologies. terraform plan compares state against real cloud APIs to detect configuration drift.'
      }
    ],
    architectureDiagram: {
      title: 'Terraform Execution Pipeline: HCL -> Dependency DAG -> Cloud Provider APIs',
      caption: 'Declarative resource graph parsed into parallel provisioning tasks synchronized with locked remote state.',
      type: 'flow',
      svgContent: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="700" height="240" rx="12" fill="#090d16" stroke="#1e293b"/>
        <text x="24" y="32" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">INFRASTRUCTURE AS CODE: TERRAFORM PARALLEL DAG PIPELINE</text>

        <!-- Step 1: HCL Code -->
        <rect x="40" y="65" width="160" height="135" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="56" y="90" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">1. HCL Declarative</text>
        <text x="56" y="115" fill="#94a3b8" font-family="monospace" font-size="10">main.tf / vpc.tf</text>
        <text x="56" y="135" fill="#94a3b8" font-family="monospace" font-size="10">Desired State Spec</text>
        <text x="56" y="170" fill="#64748b" font-family="monospace" font-size="10">Version Controlled Git</text>

        <path d="M200 132 L250 132" stroke="#64748b" stroke-width="2"/>

        <!-- Step 2: DAG Resolution & S3 State Lock -->
        <rect x="250" y="65" width="190" height="135" rx="8" fill="#1e1b4b" stroke="#4338ca"/>
        <text x="266" y="90" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold">2. DAG Graph Engine</text>
        <text x="266" y="115" fill="#c7d2fe" font-family="monospace" font-size="10">VPC -> Subnet -> EKS</text>
        <text x="266" y="135" fill="#818cf8" font-family="monospace" font-size="10">Parallel Thread Dispatch</text>
        <text x="266" y="170" fill="#a5b4fc" font-family="monospace" font-size="10">DynamoDB Lock Acquired</text>

        <path d="M440 132 L490 132" stroke="#6366f1" stroke-width="2"/>

        <!-- Step 3: Cloud APIs -->
        <rect x="490" y="65" width="170" height="135" rx="8" fill="#0f172a" stroke="#38bdf8"/>
        <text x="506" y="90" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">3. Cloud APIs</text>
        <text x="506" y="115" fill="#94a3b8" font-family="monospace" font-size="10">AWS VPC (ID: vpc-9a)</text>
        <text x="506" y="135" fill="#94a3b8" font-family="monospace" font-size="10">K8s Cluster (EKS)</text>
        <text x="506" y="170" fill="#34d399" font-family="monospace" font-size="10">✓ Applied (0 Drift)</text>
      </svg>`
    },
    codeExamples: [
      {
        title: 'Production Terraform HCL for Zero-Trust Multi-AZ AWS VPC',
        language: 'hcl',
        code: `# Production Multi-AZ VPC Blueprint with Remote State Locking
terraform {
  required_version = ">= 1.8.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
  backend "s3" {
    bucket         = "corp-terraform-state-prod"
    key            = "networking/vpc/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks" # Prevents concurrent write conflicts
    encrypt        = true
  }
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "production-vpc"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

# Subnets mapped across multiple Availability Zones for high availability
resource "aws_subnet" "private" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 4, count.index)
  availability_zone = element(["us-east-1a", "us-east-1b", "us-east-1c"], count.index)

  tags = {
    Name = "private-subnet-\${count.index + 1}"
    Tier = "Private"
  }
}`,
        explanation: 'Standard enterprise Terraform pattern: S3 encrypted remote backend, DynamoDB distributed state lock, and multi-AZ subnet subnetting.'
      }
    ],
    gettingStartedRoadmap: [
      {
        step: 1,
        phase: 'Terraform Core Commands & State Basics',
        actionableTasks: [
          'Install terraform or opentofu binary.',
          'Understand core command sequence: terraform init, terraform plan, terraform apply, terraform destroy.',
          'Never commit terraform.tfstate or secrets into git repositories.'
        ],
        keyCommands: ['terraform init', 'terraform plan -out=tfplan', 'terraform apply tfplan']
      }
    ],
    commonPitfalls: [
      {
        mistake: 'Manually editing cloud resources in the AWS/GCP web console (ClickOps).',
        whyItHurts: 'Creates silent state drift. The next time someone runs terraform apply, Terraform may detect the unmanaged changes and destroy or revert them.',
        solution: 'Enforce that all infrastructure modifications occur exclusively through Git pull requests and CI/CD pipelines.'
      }
    ]
  }
];
