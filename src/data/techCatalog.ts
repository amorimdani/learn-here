import { TechDeepDive } from '../types';

export const techCatalogData: TechDeepDive[] = [
  {
    id: 'typescript',
    name: 'TypeScript & Modern JavaScript',
    category: 'Language',
    tagline: 'Type-Safe Structural Typing, V8 Engine Internals, and Fullstack Scalability',
    iconName: 'Code2',
    popularityRank: '#1 Most Used by Developers Worldwide',
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
  }
];
