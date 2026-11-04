import { TrendingTopic } from '../types';

export const trendingTopicsData: TrendingTopic[] = [
  {
    id: 'local-first-crdts',
    title: 'Local-First Software, SQLite in OPFS & CRDTs',
    category: 'Architecture',
    status: 'Accelerating',
    dateAdded: '2025/2026 Shift',
    summary: 'Local-first software combines the instant responsiveness and offline autonomy of traditional desktop applications with the seamless multi-user collaboration of cloud services. Users own their data locally on disk (or in browser SQLite via Origin Private File System - OPFS), while Conflict-Free Replicated Data Types (CRDTs) handle mathematical convergence across devices without server coordination bottlenecks.',
    whyItMatters: 'Traditional cloud apps feel sluggish because every keypress requires an HTTP roundtrip to a distant datacenter. If the user enters a tunnel or loses Wi-Fi, the app breaks. Local-first delivers 0ms local mutation latency, guaranteed offline functionality, and mathematical data consistency.',
    whoIsLeadingIt: ['Figma', 'Linear', 'Ink & Switch', 'ElectricSQL', 'Automerge', 'Yjs'],
    deepDiveAnalysis: `In a traditional client-server architecture, the server database (PostgreSQL) is the single source of truth. The client merely renders a temporary reflection of server state. If the connection fails or latency spikes, the user experience freezes.

Local-first inverts this paradigm:
1. Primary Source of Truth: The local storage engine (e.g. SQLite compiled to WASM running inside web worker using OPFS).
2. Instant Mutations: Writing a note, moving a kanban ticket, or drawing a vector shape writes directly to local SQLite in under 1 millisecond.
3. Asynchronous Replication: A background replication worker synchronizes changes to peers or cloud servers using CRDTs or state-based sync logs.
4. Mathematical Convergence: When two users edit the same entity simultaneously offline, CRDT algorithms (such as LWW-Element-Set or YATA) mathematically converge to identical state without data loss or manual merge conflicts.`,
    architecturalComparison: {
      legacyWay: 'Client fires POST /api/items -> waits 150ms for server response -> updates React state. Broken offline.',
      modernWay: 'Client mutates local SQLite in 0.5ms -> updates UI immediately -> background CRDT worker replicates delta changes when online.',
      efficiencyGain: '300x faster UI interactions, 100% offline uptime, zero optimistic-update rollbacks.'
    },
    practicalCodeOrConfig: {
      title: 'Minimal State-Based CRDT Counter (PN-Counter) Implementation',
      language: 'typescript',
      code: `// Positive-Negative Counter CRDT (PN-Counter)
// Guarantees distributed convergence across any number of disconnected nodes
export class PNCounter {
  public nodeId: string;
  private p: Map<string, number>; // Increments per node
  private n: Map<string, number>; // Decrements per node

  constructor(nodeId: string) {
    this.nodeId = nodeId;
    this.p = new Map();
    this.n = new Map();
  }

  public increment(value = 1): void {
    const current = this.p.get(this.nodeId) || 0;
    this.p.set(this.nodeId, current + value);
  }

  public decrement(value = 1): void {
    const current = this.n.get(this.nodeId) || 0;
    this.n.set(this.nodeId, current + value);
  }

  // Value calculation: Sum of all increments minus sum of all decrements
  public value(): number {
    let totalP = 0;
    let totalN = 0;
    this.p.forEach((v) => (totalP += v));
    this.n.forEach((v) => (totalN += v));
    return totalP - totalN;
  }

  // Merge operation: Idempotent, Commutative, and Associative
  // Taking the pairwise maximum ensures order-independent convergence
  public merge(other: PNCounter): void {
    other.p.forEach((v, k) => {
      this.p.set(k, Math.max(this.p.get(k) || 0, v));
    });
    other.n.forEach((v, k) => {
      this.n.set(k, Math.max(this.n.get(k) || 0, v));
    });
  }
}

// Verification of Order-Independent Convergence
const nodeA = new PNCounter('nodeA');
const nodeB = new PNCounter('nodeB');

nodeA.increment(5);
nodeB.decrement(2);

// Replicate across network in either order
nodeA.merge(nodeB);
nodeB.merge(nodeA);

console.log('Node A value:', nodeA.value()); // 3
console.log('Node B value:', nodeB.value()); // 3 (Guaranteed Identical!)`,
      explanation: 'Functional TypeScript code showing how Conflict-Free Replicated Data Types (CRDTs) achieve distributed consensus without locks or central servers.'
    },
    keyTakeaways: [
      'Local-first prioritizes local disk/OPFS as the authoritative state, sync becomes a background transport concern.',
      'CRDTs provide provable eventual consistency without distributed transaction locks.',
      'Critical for modern productivity tools (spreadsheets, docs, diagramming, mobile apps in poor connectivity).'
    ]
  },
  {
    id: 'rustification-toolchain',
    title: 'The Rustification of Developer Infrastructure & Tooling',
    category: 'Languages & Runtimes',
    status: 'Standardizing',
    dateAdded: 'Core Trend',
    summary: 'The software engineering ecosystem is undergoing a massive rewrite of core developer tools from JavaScript, Python, and Ruby into Rust and Zig. Tools like Turbopack, Biome, UV, Ruff, and Oxc deliver 10x to 100x performance improvements, slashing CI/CD build times from 30 minutes to 45 seconds.',
    whyItMatters: 'Slow build steps, sluggish linters, and bloated package managers waste tens of millions of engineering hours annually. Rewriting build systems in systems languages with multi-threaded parallel parsing, memory arena allocation, and zero-cost abstractions transforms developer velocity.',
    whoIsLeadingIt: ['Astral (Ruff / UV)', 'Vercel (Turbopack)', 'Biome Project', 'Babel / Webpack successors'],
    deepDiveAnalysis: `For the past decade, JavaScript developer tools (Babel, ESLint, Prettier, Webpack) and Python tools (pip, black, flake8) were written in the same interpreted language they processed. While convenient for contributors, single-threaded interpreted runtimes become devastating bottlenecks on codebases with millions of lines.

Why Rust is winning developer tooling:
1. Memory Arena Allocation (Bumpalo): Instead of allocating thousands of small AST nodes on the heap individually (which triggers heavy GC overhead in JS/V8), Rust tooling allocates the entire AST in a contiguous arena and deallocates it in one single CPU instruction.
2. Fearless Concurrency via Rayon: Rust can trivially parallelize file parsing and linting across all available CPU cores (e.g. 16 to 32 threads) without data race bugs.
3. Cache Locality & Zero Copy: Data structures are packed tightly in memory, maximizing L1/L2 CPU cache hits.`,
    architecturalComparison: {
      legacyWay: 'npm install taking 45s; ESLint & Prettier taking 60s in CI; Webpack cold build taking 2 minutes.',
      modernWay: 'uv installing in 0.8s; Biome linting 50k files in 1.2s; Turbopack incremental HMR in 15ms.',
      efficiencyGain: '20x - 80x reduction in CI duration and local test execution cycles.'
    },
    practicalCodeOrConfig: {
      title: 'High-Performance Rust Parallel File Parser using Rayon',
      language: 'rust',
      code: `use rayon::prelude::*;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Instant;

#[derive(Debug)]
struct ParseStats {
    file_count: usize,
    total_bytes: usize,
    lines_analyzed: usize,
}

// Parallel file processing leveraging all CPU hardware threads
fn analyze_source_tree(paths: &[PathBuf]) -> ParseStats {
    paths
        .par_iter() // Rayon parallel iterator creates work-stealing thread pool automatically
        .filter_map(|path| {
            let content = fs::read_to_string(path).ok()?;
            let lines = content.lines().count();
            let bytes = content.len();
            Some((1, bytes, lines))
        })
        .reduce(
            || (0, 0, 0),
            |acc, item| (acc.0 + item.0, acc.1 + item.1, acc.2 + item.2),
        )
        .into()
}

impl From<(usize, usize, usize)> for ParseStats {
    fn from(tuple: (usize, usize, usize)) -> Self {
        Self {
            file_count: tuple.0,
            total_bytes: tuple.1,
            lines_analyzed: tuple.2,
        }
    }
}`,
      explanation: 'Illustrates how Rust tools achieve order-of-magnitude speedups through work-stealing parallel iterators and zero-allocation parsing.'
    },
    keyTakeaways: [
      'Replace legacy JS formatters and linters with Biome for instant feedback in VSCode and CI.',
      'Replace pip and virtualenv with UV for instantaneous 100x package installation.',
      'Systems languages with strict memory guarantees are the permanent future of developer tooling.'
    ]
  },
  {
    id: 'wasm-wasi-edge',
    title: 'WebAssembly (WASM), WASI & Micro-Sandbox Edge Computing',
    category: 'Infrastructure',
    status: 'Accelerating',
    dateAdded: '2025/2026 Shift',
    summary: 'WebAssembly has evolved beyond the browser into a universal, secure, and ultra-fast bytecode execution format for cloud, edge, and plugin platforms. With the WASI (WebAssembly System Interface) Component Model, developers can compile code from any language (Rust, Go, C++, Python) into sandboxed modules that boot in microseconds and execute safely on untrusted multi-tenant cloud edge nodes.',
    whyItMatters: 'Traditional containers (Docker/K8s) take seconds to boot and consume hundreds of megabytes of memory per instance. WASM modules cold-start in less than 5 milliseconds, consume only kilobytes of RAM, and provide cryptographic hardware memory isolation by default.',
    whoIsLeadingIt: ['Bytecode Alliance', 'Fastly', 'Cloudflare Workers', 'Fermyon', 'Cosmonic'],
    deepDiveAnalysis: `Docker co-founder Solomon Hykes famously tweeted: "If WASM+WASI existed in 2008, we wouldn't have needed to create Docker. That's how important it is."

Why WASM on the server is transformative:
1. Micro-Virtualization: WASM uses a linear memory model with strict capability-based security. A WASM module cannot open a socket, access a file, or read memory unless the host runtime explicitly passes that capability.
2. Universal Interoperability (Component Model): A module written in Rust can import and call a library written in Python or Go without foreign function interface (FFI) glue code, thanks to standardized WIT (Wasm Interface Types) definitions.
3. Edge Cold Starts: Cloudflare Workers and Fastly spin up fresh WASM isolate sandboxes in 2-5ms right at the edge network close to the end user.`,
    architecturalComparison: {
      legacyWay: 'Heavy Linux VM or K8s Pod requiring 500MB RAM and 2-10 second cold start.',
      modernWay: 'WASM micro-isolate executing in 5ms with 15MB RAM and zero kernel privilege escalation risk.',
      efficiencyGain: '100x lower memory overhead, sub-millisecond cold starts, zero-trust sandbox.'
    },
    practicalCodeOrConfig: {
      title: 'WASI Component Model Definition (WIT Interface)',
      language: 'rust',
      code: `// WIT (Wasm Interface Type) Contract: Defines language-agnostic interface
/*
package company:edge-gateway;

interface http-middleware {
    record Request {
        method: string,
        uri: string,
        headers: list<tuple<string, string>>,
        body: list<u8>,
    }

    record Response {
        status: u16,
        headers: list<tuple<string, string>>,
        body: list<u8>,
    }

    process: func(req: Request) -> Response;
}
*/

// Rust implementation compiled to target wasm32-wasi
#[no_mangle]
pub extern "C" fn process_edge_request(ptr: *const u8, len: usize) -> u32 {
    // Sandboxed execution with zero direct OS syscalls
    // Host runtime enforces execution timeout and strict memory boundary
    200 // Returns HTTP 200 OK
}`,
      explanation: 'Shows how WebAssembly Interface Types (WIT) decouple implementation language from execution environment while enforcing micro-sandbox safety.'
    },
    keyTakeaways: [
      'WASM is becoming the standard for serverless edge execution and secure multi-tenant plugin systems.',
      'Offers microsecond boot times compared to multi-second Docker container cold starts.',
      'WASI provides capability-based security: modules have zero access to disk or network unless granted.'
    ]
  },
  {
    id: 'durable-execution-workflows',
    title: 'Durable Execution & Workflows-as-Code (Temporal / Inngest)',
    category: 'Architecture',
    status: 'Enterprise Adoption',
    dateAdded: 'Core Trend',
    summary: 'Durable Execution completely eliminates the complexity of distributed state management, retries, queues, and timers. Instead of maintaining ad-hoc state machines across Kafka, Redis, and cron jobs, developers write standard imperative code that survives process crashes, server restarts, network outages, and multi-month wait states without losing state.',
    whyItMatters: 'Building multi-step business transactions (e.g. user signup -> charge credit card -> wait 3 days -> send reminder email -> cancel if inactive) traditionally required complex combinations of message queues, retry tables, and cron pollers. If a worker crashed mid-flow, state corrupted. Durable execution makes workflows unbreakable.',
    whoIsLeadingIt: ['Temporal.io', 'Inngest', 'AWS Step Functions', 'Cadence (Uber)'],
    deepDiveAnalysis: `How Durable Execution works under the hood:
1. Event History Replay: Workflows execute deterministically. The runtime intercepts every external side-effect (API calls, DB writes, timers) as an "Activity".
2. Deterministic Replay: If the worker process crashes or the server is rebooted while waiting on a 30-day sleep timer, a new worker resumes the workflow. It replays previous events from the durable event log instantaneously without re-executing external activities, picking up at the exact line of code where it left off.
3. Automatic Retries & Compensation (Saga Pattern): If an activity fails due to a downstream 503 error, the engine automatically applies exponential backoff retries or executes compensating rollback transactions.`,
    architecturalComparison: {
      legacyWay: 'Fragmented patchwork: Cron job -> DB poll -> SQS queue -> worker -> Redis lock -> manually handling crash states.',
      modernWay: 'Single durable async function with await sleep("30 days") and automated fault recovery.',
      efficiencyGain: 'Eliminates 80% of glue code, prevents race conditions, and guarantees zero lost transactions.'
    },
    practicalCodeOrConfig: {
      title: 'Durable Workflow Implementation with Sleep & Retries (Temporal Style)',
      language: 'typescript',
      code: `// Imperative Durable Workflow that can run for 14 days without state loss
import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

// Configure activities with automatic exponential retries
const { chargeCustomerCard, provisionCloudResources, sendWelcomeEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '2s',
    backoffCoefficient: 2,
    maximumAttempts: 10, // Resilient to third-party API outages
  },
});

export async function customerOnboardingWorkflow(customerId: string, planTier: string): Promise<string> {
  // Step 1: Charge customer
  const paymentReceipt = await chargeCustomerCard(customerId, planTier);

  // Step 2: Provision cloud resources
  const clusterDetails = await provisionCloudResources(customerId, paymentReceipt.id);

  // Step 3: Send confirmation
  await sendWelcomeEmail(customerId, clusterDetails.endpoint);

  // Step 4: Durable Sleep! The server can restart or crash 50 times during this week;
  // the execution resumes at the exact line below when the timer fires!
  await sleep('7 days');

  // Step 5: Check usage and follow up
  console.log(\`Evaluating 7-day milestone for customer \${customerId}\`);
  return 'Onboarding completed successfully';
}`,
      explanation: 'Production durable workflow showing transparent multi-day sleep, automated activity retries, and guaranteed state recovery.'
    },
    keyTakeaways: [
      'Durable execution turns unreliable distributed networks into reliable, deterministic code execution.',
      'Replaces fragile cron jobs, retry tables, and message queues with a single clean async workflow.',
      'Adopted by top global tech companies (Netflix, Stripe, Descript) for mission-critical core flows.'
    ]
  }
];
