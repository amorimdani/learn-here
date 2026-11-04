import { CareerLevelData } from '../types';

export const careerLevelsData: CareerLevelData[] = [
  {
    id: 'junior',
    title: 'Junior Software Engineer (L1 / L2)',
    badge: 'Entry-Level / Associate',
    experienceYears: '0 - 2 Years',
    compensationRange: '$70,000 - $125,000 / year (Global Tier 1)',
    tagline: 'Execution Excellence, Clean Foundations, and Learning Velocity',
    summary: 'Junior engineers operate with defined tasks and close mentorship. Success is measured by code hygiene, test coverage, eagerness to receive feedback, and quickly mastering the team\'s git flow, build pipeline, and ticket lifecycle. Junior engineers transform well-scoped requirements into readable, resilient code.',
    coreLanguages: [
      {
        name: 'TypeScript / JavaScript',
        role: 'Fullstack & Web UI Foundations',
        marketDemand: 'Ultra-High',
        description: 'Ubiquitous for modern frontends (React, Next.js) and fullstack Node/Bun services. Junior engineers are expected to master strong typing, async/await promises, array transformations, and defensive validation using schemas.',
        codeExample: `// Production Junior Pattern: Strongly Typed Safe Fetcher with Zod validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  email: z.string().email(),
  isActive: z.boolean().default(true)
});

type User = z.infer<typeof UserSchema>;

export async function fetchUserById(userId: string): Promise<User> {
  const response = await fetch(\`https://api.internal.local/v1/users/\${userId}\`, {
    headers: { 'Accept': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(\`Failed to fetch user \${userId}: \${response.status} \${response.statusText}\`);
  }

  const rawData = await response.json();
  // Safe schema parsing prevents runtime crashes from bad API payloads
  const result = UserSchema.safeParse(rawData);
  if (!result.success) {
    throw new Error(\`Invalid schema for user payload: \${result.error.message}\`);
  }
  return result.data;
}`
      },
      {
        name: 'Python',
        role: 'Scripting, Automation, Backend APIs & Data Pipelines',
        marketDemand: 'Ultra-High',
        description: 'Python is standard for backend services (FastAPI), data exploration, and script orchestration. Juniors must understand virtual environments, list comprehensions, type hints, Pydantic, and comprehensive pytest testing.',
        codeExample: `# Junior Production Pattern: FastAPI endpoint with dependency injection and Pydantic validation
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, EmailStr
from typing import Optional

app = FastAPI(title="Junior Service API", version="1.0.0")

class OrderItem(BaseModel):
    sku: str = Field(..., pattern=r"^[A-Z]{3}-\\d{4}$")
    quantity: int = Field(gt=0, le=100)
    unit_price: float = Field(gt=0.0)

class CreateOrderRequest(BaseModel):
    customer_email: EmailStr
    items: list[OrderItem]
    notes: Optional[str] = None

@app.post("/v1/orders", status_code=status.HTTP_201_CREATED)
def create_order(payload: CreateOrderRequest):
    if not payload.items:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, 
            detail="Order must contain at least one item."
        )
    total_amount = sum(item.quantity * item.unit_price for item in payload.items)
    return {
        "status": "confirmed",
        "email": payload.customer_email,
        "items_count": len(payload.items),
        "total_amount": round(total_amount, 2)
    }`
      },
      {
        name: 'SQL (PostgreSQL)',
        role: 'Relational Data Querying & Integrity',
        marketDemand: 'Ultra-High',
        description: 'Crucial for persisting and querying transactional data. Junior engineers must understand primary/foreign keys, INNER/LEFT JOINs, GROUP BY aggregations, transactions, and basic B-tree indexing concepts.',
        codeExample: `-- Production query: Safe transactional order insertion with item tally
BEGIN;

INSERT INTO customer_orders (order_id, customer_id, status, created_at)
VALUES (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PENDING', NOW());

INSERT INTO order_items (order_id, sku, quantity, price)
VALUES 
  (currval(pg_get_serial_sequence('customer_orders', 'id')), 'PRD-1024', 2, 49.99),
  (currval(pg_get_serial_sequence('customer_orders', 'id')), 'MOU-5012', 1, 29.50);

COMMIT;`
      }
    ],
    primaryTools: [
      {
        category: 'Version Control & Code Review',
        tools: ['Git', 'GitHub / GitLab / Bitbucket', 'Conventional Commits'],
        description: 'Master branching strategies (feature branches), interactive rebasing (git rebase -i), clear atomic commit messages, resolving merge conflicts cleanly, and submitting focused PRs under 400 lines.'
      },
      {
        category: 'Containerization & Local Dev',
        tools: ['Docker', 'Docker Compose', 'Dev Containers'],
        description: 'Spinning up local databases, caches, and mock APIs via compose files without polluting the host OS. Writing clean Multi-stage Dockerfiles for minimal image size.'
      },
      {
        category: 'Testing & Quality Gates',
        tools: ['Vitest / Jest', 'Pytest', 'ESLint', 'Prettier', 'Husky (pre-commit hooks)'],
        description: 'Writing unit tests that cover edge cases, mocking external dependencies, and adhering to strict linter checks before pushing.'
      }
    ],
    workflows: [
      {
        name: 'Ticket Ingestion & Scope Clarification',
        description: 'Before coding, review Jira/Linear tickets, identify missing edge cases, clarify requirements with Senior leads or PMs, and create a 3-bullet implementation plan.',
        marketStandard: 'Agile / Scrum 2-week sprints with daily 15-minute standups and Jira task tracking.'
      },
      {
        name: 'Trunk-Based / Feature Branch PR Workflow',
        description: 'Create branch from main: feature/AUTH-102-jwt-refresh. Implement code, write unit tests, verify locally with docker-compose, run lint/tests, create PR with screenshots and test steps.',
        marketStandard: 'PRs must pass CI (automated unit tests, SonarQube quality gate) and require at least 1 Senior approval.'
      },
      {
        name: 'Observability & Basic Debugging',
        description: 'Reading server logs via Datadog, Grafana Loki, or AWS CloudWatch. Inspecting stack traces, identifying HTTP 500 causes, and reproducing bugs in isolated tests.',
        marketStandard: 'Local log tailing + Sentry error tracking integration.'
      }
    ],
    systemDesignExpectations: {
      scope: 'Single Component / API Endpoint / Database Schema Design',
      keySkills: [
        'RESTful API status codes & JSON design',
        'Database normalization & basic foreign keys',
        'Understanding synchronous vs asynchronous HTTP calls',
        'Basic caching with Redis for read-heavy operations'
      ],
      sampleProblem: 'Design an endpoint to return a user profile along with their last 5 purchase orders.',
      recommendedApproach: 'Write a single SQL JOIN query with LIMIT 5 or an optimized relation query. Avoid N+1 queries by eager-loading relations. Add unit tests for empty orders list.'
    },
    dayInTheLife: [
      { time: '09:00 AM', activity: 'Standup Prep & PR Reviews', detail: 'Check notifications, review pending comments on PR, review a peer PR to learn code patterns.' },
      { time: '09:30 AM', activity: 'Team Standup', detail: 'Report what was completed yesterday, today\'s target ticket, and raise blockers early.' },
      { time: '10:00 AM', activity: 'Deep Work: Coding & Unit Tests', detail: 'Implement ticket requirements, write comprehensive unit tests covering happy and error paths.' },
      { time: '01:00 PM', activity: 'Lunch & Tech Learning', detail: 'Review company architectural decision records (ADRs) and engineering blog posts.' },
      { time: '02:00 PM', activity: 'Pair Programming / Mentorship', detail: '30-minute sync with Senior Engineer to review tricky architectural pattern or debug local test.' },
      { time: '04:00 PM', activity: 'CI/CD Monitoring & Clean up', detail: 'Ensure staging environment deploy succeeded, verify ticket in staging, update Jira ticket.' }
    ],
    promotionChecklist: [
      'Consistently delivers sprint tasks on time without needing micro-supervision.',
      'Writes clear, testable code with high test coverage and minimal regression bugs.',
      'Proactively asks questions early when blocked rather than struggling silently for days.',
      'Demonstrates strong Git discipline and writes clear, reviewable pull requests.',
      'Understands the end-to-end user flow of the subsystem they work on.'
    ],
    antiPatterns: [
      'Ghosting or staying silent for 3 days when blocked on a technical hurdle.',
      'Submitting massive 1,500-line pull requests with no description or tests.',
      'Assuming code works because it didn\'t crash once locally without testing edge cases.',
      'Taking code review feedback personally rather than seeing it as free mentorship.'
    ]
  },
  {
    id: 'mid',
    title: 'Mid-Level Software Engineer (L3)',
    badge: 'Autonomous Contributor',
    experienceYears: '2 - 5 Years',
    compensationRange: '$120,000 - $185,000 / year (Global Tier 1)',
    tagline: 'Autonomous Feature Ownership, Resilience, and Cross-Service Integration',
    summary: 'Mid-level engineers own features from technical design through to production deployment and monitoring. They operate independently, identify unstated requirements, choose appropriate data models and external libraries, and mentor juniors.',
    coreLanguages: [
      {
        name: 'TypeScript & Go / Java',
        role: 'Microservices & Robust Backend Architectures',
        marketDemand: 'Ultra-High',
        description: 'Mid engineers frequently write concurrent backend services in Go or Java/Spring Boot alongside modern TypeScript frontends. They understand goroutines/channels, dependency injection, and clean architecture boundaries.',
        codeExample: `// Production Go Pattern: Concurrent worker pool with context cancellation and error handling
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID    int
	Email string
}

func Worker(ctx context.Context, id int, jobs <-chan Job, results chan<- error, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("Worker %d received cancellation signal\\n", id)
			return
		case job, ok := <-jobs:
			if !ok {
				return
			}
			// Simulate resilient network dispatch with timeout
			err := processNotification(ctx, job)
			results <- err
		}
	}
}

func processNotification(ctx context.Context, j Job) error {
	select {
	case <-time.After(50 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}`
      },
      {
        name: 'SQL & Database Optimization',
        role: 'Index tuning, transaction isolation, query execution plans',
        marketDemand: 'Ultra-High',
        description: 'Mid engineers know how to use EXPLAIN ANALYZE, prevent table locks, design composite indexes, and handle read replicas.',
        codeExample: `-- Optimization: Composite B-tree index for high-velocity multi-tenant filtering
CREATE INDEX CONCURRENTLY idx_orders_tenant_status_created 
ON orders (tenant_id, status, created_at DESC)
WHERE is_deleted = FALSE;

-- Analyzing execution cost to verify index scan over sequential scan
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_amount, created_at
FROM orders
WHERE tenant_id = 'c8b417c8-8924-4f24-9b88-5c4d623b0921'
  AND status = 'SHIPPED'
  AND is_deleted = FALSE
ORDER BY created_at DESC
LIMIT 20;`
      }
    ],
    primaryTools: [
      {
        category: 'CI/CD & Infrastructure',
        tools: ['GitHub Actions', 'ArgoCD', 'Terraform (Basic)', 'Helm'],
        description: 'Configuring multi-stage CI pipelines, automated security scanning (Trivy, Snyk), and preview environments for staging.'
      },
      {
        category: 'Observability & Telemetry',
        tools: ['OpenTelemetry', 'Datadog', 'Prometheus & Grafana', 'PagerDuty'],
        description: 'Instrumenting distributed tracing across HTTP/gRPC boundaries, defining custom business metrics, and diagnosing latency spikes via flame graphs.'
      },
      {
        category: 'Messaging & Caching',
        tools: ['Redis', 'RabbitMQ', 'Apache Kafka (Producer/Consumer)'],
        description: 'Implementing idempotency keys, dead-letter queues (DLQ), cache-aside patterns, and atomic Redis counters.'
      }
    ],
    workflows: [
      {
        name: 'Technical Design Proposal (One-Pager / RFC)',
        description: 'Write a 2-page document outlining API contract, DB migration plan, rollback strategy, capacity estimate, and edge case failures before writing large features.',
        marketStandard: 'RFC review with team seniors and security team.'
      },
      {
        name: 'Zero-Downtime Database Migrations',
        description: 'Execute expand-and-contract schema migrations: Add column (nullable) -> deploy code reading both -> backfill data -> deploy code requiring new column -> drop old column.',
        marketStandard: 'Liquibase, Flyway, or Prisma migrate with shadow DB testing.'
      },
      {
        name: 'On-Call Rotation Participation',
        description: 'Primary responder for production alerts during working hours or secondary on-call. Triage alerts, mitigate user impact, and author post-incident timeline drafts.',
        marketStandard: 'PagerDuty / Opsgenie alert dispatch with automated runbooks.'
      }
    ],
    systemDesignExpectations: {
      scope: 'Multi-Service Feature Design & Asynchronous Processing',
      keySkills: [
        'Idempotent API endpoint design with Redis deduplication tokens',
        'Database transactions vs eventual consistency tradeoffs',
        'Rate limiting (Token Bucket, Leaky Bucket)',
        'Circuit breakers and retry mechanisms with exponential backoff and jitter'
      ],
      sampleProblem: 'Design a high-volume payment processing webhook handler that receives events from Stripe and updates internal balances.',
      recommendedApproach: 'Verify webhook signature -> Record event in deduplication table (idempotency) -> Return 200 OK immediately -> Publish message to Kafka/SQS -> Worker pool processes balance update in DB transaction -> DLQ for failed retries.'
    },
    dayInTheLife: [
      { time: '09:00 AM', activity: 'Observability & Metrics Review', detail: 'Check Datadog dashboards for error budget consumption and latency p99 of owned microservices.' },
      { time: '09:30 AM', activity: 'Standup & Sprint Coordination', detail: 'Coordinate cross-dependencies with mobile/frontend engineers on API contract definitions.' },
      { time: '10:15 AM', activity: 'Architecture Design Review', detail: 'Defend technical design for new subscription billing service in team architectural forum.' },
      { time: '11:30 AM', activity: 'Core Feature Coding & Integration', detail: 'Build out Kafka consumer with batch processing and transaction guarantees.' },
      { time: '02:30 PM', activity: 'Mentoring Junior Developers', detail: 'Conduct 45-minute code review and pair on resolving a concurrency race condition.' },
      { time: '04:00 PM', activity: 'Canary Deployment & Verification', detail: 'Deploy release to 5% canary traffic, verify zero error rate increase, roll out to 100%.' }
    ],
    promotionChecklist: [
      'Delivers complex, multi-week features independently across multiple services.',
      'Identifies technical debt and proactively addresses it without being asked.',
      'Writes clear Technical Design Documents (TDD) that get approved with minimal rework.',
      'Effectively mentors juniors, raising the engineering bar for the team.',
      'Successfully diagnoses and resolves production incidents with calm, structured debugging.'
    ],
    antiPatterns: [
      'Over-engineering simple solutions with microservices or complex event buses when a monolithic modular approach was sufficient.',
      'Deploying breaking database migrations that lock tables during peak business traffic.',
      'Working in isolation for two weeks without communicating progress or blockers.'
    ]
  },
  {
    id: 'senior',
    title: 'Senior Software Engineer (L4 / L5)',
    badge: 'Technical Anchor & System Architect',
    experienceYears: '5 - 9 Years',
    compensationRange: '$180,000 - $290,000 / year (Global Tier 1)',
    tagline: 'System Architecture, Reliability, High Leverage, and Technical Leadership',
    summary: 'Senior engineers drive technical excellence across entire services and domains. They turn ambiguous business problems into scalable, resilient architectures, establish team standards, lead incident post-mortems, and amplify the impact of every engineer on their team.',
    coreLanguages: [
      {
        name: 'Rust / Go / Modern C++',
        role: 'High-Throughput, Low-Latency Core Infrastructure',
        marketDemand: 'Ultra-High',
        description: 'Seniors write performance-critical systems, understanding zero-copy deserialization, memory alignment, lock-free data structures, and CPU cache locality.',
        codeExample: `// Production Rust Pattern: High-throughput thread-safe cache with atomic reads and TTL eviction
use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::sync::RwLock;

#[derive(Clone)]
struct CacheEntry<T> {
    data: T,
    expires_at: Instant,
}

pub struct ConcurrentTtlCache<K, V> {
    store: Arc<RwLock<HashMap<K, CacheEntry<V>>>>,
    ttl: Duration,
}

impl<K: std::hash::Hash + Eq + Clone + Send + Sync + 'static, V: Clone + Send + Sync + 'static> ConcurrentTtlCache<K, V> {
    pub fn new(ttl: Duration) -> Self {
        let store = Arc::new(RwLock::new(HashMap::new()));
        let store_cleanup = Arc::clone(&store);

        // Background reaper prevents memory leaks without blocking worker threads
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(30));
            loop {
                interval.tick().await;
                let mut map = store_cleanup.write().await;
                let now = Instant::now();
                map.retain(|_, entry| entry.expires_at > now);
            }
        });

        Self { store, ttl }
    }

    pub async fn get(&self, key: &K) -> Option<V> {
        let map = self.store.read().await;
        map.get(key).and_then(|entry| {
            if entry.expires_at > Instant::now() {
                Some(entry.data.clone())
            } else {
                None
            }
        })
    }
}`
      },
      {
        name: 'Distributed Systems & Cloud Architecture',
        role: 'Event-driven, Partitioned, Resilient Topologies',
        marketDemand: 'Ultra-High',
        description: 'Designing systems across Kafka, Cassandra/DynamoDB, Kubernetes clusters, and multi-region failover configurations.',
        codeExample: `// Production System Design: Outbox Pattern implementation in TypeScript
// Guarantees distributed transactional atomicity between DB writes and Kafka dispatch
import { PoolClient } from 'pg';

export async function placeOrderWithOutbox(
  client: PoolClient, 
  orderId: string, 
  userId: string, 
  totalAmount: number
): Promise<void> {
  try {
    await client.query('BEGIN');

    // 1. Mutate primary business entity
    await client.query(
      'INSERT INTO orders (id, user_id, total, status) VALUES ($1, $2, $3, $4)',
      [orderId, userId, totalAmount, 'CREATED']
    );

    // 2. Persist event in outbox table within same ACID transaction
    const eventPayload = JSON.stringify({ orderId, userId, totalAmount, timestamp: Date.now() });
    await client.query(
      'INSERT INTO transactional_outbox (event_id, aggregate_type, aggregate_id, event_type, payload) VALUES (gen_random_uuid(), $1, $2, $3, $4)',
      ['ORDER', orderId, 'OrderPlaced', eventPayload]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  }
}`
      }
    ],
    primaryTools: [
      {
        category: 'Infrastructure as Code & Cloud',
        tools: ['Terraform', 'Kubernetes / EKS / GKE', 'AWS / GCP / Cloudflare Workers'],
        description: 'Writing reusable Terraform modules, managing Kubernetes manifests, defining ingress rules, and optimizing AWS cloud spend.'
      },
      {
        category: 'Chaos & Performance Engineering',
        tools: ['k6', 'Locust', 'Chaos Mesh / Gremlin', 'eBPF / bpftrace'],
        description: 'Conducting load stress tests up to 100k requests/sec, simulating network partition split-brain scenarios, and profiling kernel-level system call latency.'
      },
      {
        category: 'Incident Governance & SLAs',
        tools: ['PagerDuty', 'Blameless / Incident.io', 'SLI / SLO dashboards'],
        description: 'Defining Service Level Objectives (99.99% availability, p95 < 80ms), authoring blameless post-mortem RCA documents, and enforcing reliability guardrails.'
      }
    ],
    workflows: [
      {
        name: 'Architecture Decision Records (ADRs) & RFC Governance',
        description: 'Authored comprehensive architectural blueprints that define context, options considered, tradeoffs, security compliance, cost modeling, and long-term consequences.',
        marketStandard: 'Formal team reviews and engineering-wide RFC circulation.'
      },
      {
        name: 'Blameless Post-Mortem & Root Cause Analysis (RCA)',
        description: 'Facilitate blameless incident analysis meetings following SEV-1/SEV-2 outages. Map 5 Whys, identify systemic prevention steps, and assign JIRA prevention items.',
        marketStandard: 'Published to engineering org within 48 hours of resolution.'
      },
      {
        name: 'Technical Debt Prioritization Matrix',
        description: 'Collaborate with Product Management to allocate 20% of every sprint towards architectural refactoring, dependency upgrades, and security remediations.',
        marketStandard: 'Data-driven impact analysis (measuring bug rates and deploy friction).'
      }
    ],
    systemDesignExpectations: {
      scope: 'Large-scale Distributed Systems & High-Availability Platforms',
      keySkills: [
        'CAP Theorem & PACELC tradeoffs in real architectures',
        'Partitioning strategies (Consistent Hashing, Range, Sharding keys)',
        'Consensus protocols (Raft, Paxos) and leader election',
        'Multi-datacenter replication, active-active vs active-passive failover'
      ],
      sampleProblem: 'Design a globally distributed URL shortener (Bit.ly) handling 500 million reads/day and 50 million writes/day with <20ms p99 latency.',
      recommendedApproach: 'Base62 encoding with Snowflake ID generator for unique 7-char keys -> Distributed Redis cluster caching top 20% hottest URLs (LRU policy) -> Cassandra or DynamoDB NoSQL key-value store for global read replication -> Cloudflare CDN Anycast routing for edge caching.'
    },
    dayInTheLife: [
      { time: '09:00 AM', activity: 'Strategic Review & Incident Triage', detail: 'Inspect SLO burn rates, review high-priority architecture alerts and security vulnerabilities.' },
      { time: '10:00 AM', activity: 'Cross-functional Alignment', detail: 'Meet with Product Directors and Principal Engineers to refine H2 technical roadmap.' },
      { time: '11:00 AM', activity: 'Deep Architecture & Critical Code', detail: 'Implement core consensus mechanism or optimize mission-critical database connection pooler.' },
      { time: '02:00 PM', activity: 'RFC Architecture Committee', detail: 'Review RFC submitted by Mid-level engineer; guide tradeoffs regarding Redis vs Postgres.' },
      { time: '03:30 PM', activity: 'Career & Tech Mentoring', detail: '1-on-1 mentorship session with Junior/Mid engineer to review system design career progression.' },
      { time: '04:30 PM', activity: 'Post-Mortem Facilitation', detail: 'Lead RCA for yesterday\'s Redis failover glitch; identify automated mitigation tasks.' }
    ],
    promotionChecklist: [
      'Owns and delivers high-impact multi-quarter initiatives across multiple squads.',
      'Elevates the technical baseline of the team through mentoring, code reviews, and ADRs.',
      'Demonstrates mature risk management: balances rapid velocity with rock-solid reliability.',
      'Acts as a trusted technical partner to Product Management and Engineering Directors.',
      'Recognized as the primary domain expert for mission-critical core systems.'
    ],
    antiPatterns: [
      'Ivory tower architecture: drawing beautiful diagrams that are impossible for the team to build or maintain.',
      'Hoarding knowledge and becoming a single point of failure (SPOF) for the organization.',
      'Premature optimization: optimizing nanosecond CPU cycles when the real bottleneck is an unindexed database query.'
    ]
  },
  {
    id: 'staff',
    title: 'Staff / Principal Software Engineer (L6 / L7+)',
    badge: 'Organizational Leader & Tech Strategist',
    experienceYears: '9+ Years',
    compensationRange: '$280,000 - $550,000+ / year (Global Tier 1)',
    tagline: 'Multi-Year Strategy, Cross-Organization Multipliers, and Strategic Impact',
    summary: 'Staff and Principal engineers operate at organizational scale. They align technical strategy with multi-year business goals, unblock entire engineering departments, pioneer adoption of game-changing paradigms (e.g. AI-agent architectures, distributed edge computing), and represent company engineering externally.',
    coreLanguages: [
      {
        name: 'Polyglot Architecture & Core Runtimes',
        role: 'Language Selection Governance, Micro-VMs, WASM, High-Core Systems',
        marketDemand: 'Specialized',
        description: 'Staff engineers evaluate whole ecosystems (Rust, Zig, Go, Modern JVM, eBPF) against organizational talent supply, performance profiles, memory safety mandates, and cloud cost economics.',
        codeExample: `// Staff-Level Architectural Pattern: Dynamic Pluggable Kernel Architecture with WASM Runtime
// Allows multi-tenant isolation, safe untrusted plugin execution, and ultra-low cold starts (<5ms)
import { WasmRuntimeManager } from '@platform/core-wasm-kernel';

export class EnterpriseExtensibilityEngine {
  private runtime: WasmRuntimeManager;

  constructor() {
    this.runtime = new WasmRuntimeManager({
      maxMemoryPages: 256, // 16MB sandboxed memory ceiling per tenant
      timeoutMs: 50,       // Strict real-time execution cutoff
      allowedSyscalls: ['crypto_hash', 'kv_read']
    });
  }

  public async executeSandboxedPlugin(tenantId: string, byteCode: Uint8Array, contextPayload: Record<string, unknown>) {
    const instance = await this.runtime.instantiateTenant(tenantId, byteCode);
    try {
      return await instance.runEntryPoint('process_transaction', contextPayload);
    } catch (fault) {
      this.runtime.isolateFault(tenantId, fault);
      throw new Error(\`Tenant [\${tenantId}] sandboxed execution violated safety constraints\`);
    }
  }
}`
      },
      {
        name: 'Distributed Systems Formal Verification',
        role: 'TLA+, Formal Specification, Consensus, Zero-Downtime Global Migrations',
        marketDemand: 'Specialized',
        description: 'Validating safety and liveness invariants in concurrent distributed consensus protocols before writing production code.',
        codeExample: `(* TLA+ Distributed Consensus Safety Invariant Spec *)
---- MODULE DistributedLeaseEngine ----
EXTENDS Naturals, Sequences, FiniteSets

CONSTANTS Nodes, MaxTerm
VARIABLES currentTerm, leader, leaseExpires

TypeOK ==
  /\ currentTerm \\in 0..MaxTerm
  /\ leader \\in (Nodes \\cup {NULL})
  /\ leaseExpires \\in Nat

(* Invariant: At most one valid leader can hold the lease at any wall-clock epoch *)
SingleLeaderSafety ==
  \\A n1, n2 \\in Nodes :
    (n1 /= n2 /\\ leader = n1 /\\ leaseExpires > 0) => leader /= n2
====`
      }
    ],
    primaryTools: [
      {
        category: 'Enterprise Strategy & Governance',
        tools: ['Backstage / Developer Portals', 'OpenTelemetry Org Standard', 'FinOps (Kubecost, Vantage)'],
        description: 'Setting up developer platforms that reduce time-to-first-commit from 2 weeks to 2 hours for hundreds of engineers. Slashing multi-million-dollar cloud infrastructure bills.'
      },
      {
        category: 'Security & Compliance Engineering',
        tools: ['Zero-Trust Architecture', 'SPIFFE / SPIRE', 'HashiCorp Vault', 'Cosign (Supply Chain Security)'],
        description: 'Architecting cryptographic identity for all microservices, automated SLSA level-3 supply chain attestation, and enterprise compliance (SOC2 Type II, HIPAA, FedRAMP).'
      },
      {
        category: 'AI-Native Engineering Infrastructure',
        tools: ['vLLM', 'Ollama Enterprise Clusters', 'LangSmith / Phoenix', 'MCP (Model Context Protocol)'],
        description: 'Architecting company-wide AI copilot and agentic automation pipelines, ensuring enterprise private data never leaks to public frontier models.'
      }
    ],
    workflows: [
      {
        name: 'Multi-Year Technology Roadmapping & Strategy',
        description: 'Authoring 3-year vision documents. Anticipating ecosystem shifts (e.g., migration to arm64 Graviton processors saving 40% compute cost; adopting Agentic AI workflows).',
        marketStandard: 'Presented to C-Suite (CTO, VP of Eng) and Tech Steering Committees.'
      },
      {
        name: 'Cross-Department Technical Alignment & Unblocking',
        description: 'Dissolving technical gridlocks between siloed engineering departments (e.g. Infrastructure, Core Platform, Data Engineering, and Product squads).',
        marketStandard: 'Direct leadership of Architectural Council and Guilds.'
      },
      {
        name: 'Talent Sponsoring & Engineering Culture Amplification',
        description: 'Actively sponsoring Senior engineers for promotion to Staff, defining the engineering career rubric, and representing the firm at international keynote conferences.',
        marketStandard: 'Executive engineering sponsorship and open-source foundation leadership.'
      }
    ],
    systemDesignExpectations: {
      scope: 'Enterprise-Wide Multi-Region Platforms & Global Ecosystems',
      keySkills: [
        'Global active-active multi-region data replication (CRDTs, Spanner/CockroachDB)',
        'Zero-trust network architecture across multi-cloud infrastructure',
        'Cost engineering (FinOps) saving millions at scale',
        'Disaster recovery planning with Zero Data Loss (RPO=0, RTO < 60s)'
      ],
      sampleProblem: 'Architect a global multi-region streaming financial settlement platform processing 100k TPS with strict exactly-once semantics, sub-100ms cross-continent settlement, and full disaster recovery.',
      recommendedApproach: 'Distributed raft-replicated partitioned ledger -> Spanner or hybrid Raft log with vector clocks -> Hardware Security Module (HSM) signature validation -> Dedicated private dark fiber WAN links between regions -> Automated multi-cloud failover with zero manual intervention.'
    },
    dayInTheLife: [
      { time: '08:30 AM', activity: 'Executive & Industry Horizon Scanning', detail: 'Analyze cloud pricing updates, research emerging security vulnerabilities, review company burn rate.' },
      { time: '09:30 AM', activity: 'CTO & VP Engineering Strategy Sync', detail: 'Discuss next year\'s data platform migration and CAPEX/OPEX tradeoffs.' },
      { time: '11:00 AM', activity: 'High-Impact Architecture Consulting', detail: 'Deep-dive session with Staff engineers of the Payments team on distributed transaction rollback.' },
      { time: '01:30 PM', activity: 'Staff-Plus Engineering Guild', detail: 'Chair bi-weekly meeting of 20 Staff+ engineers to approve RFC standards across 500+ devs.' },
      { time: '03:00 PM', activity: 'Prototyping & High-Leverage PoC', detail: 'Write proof-of-concept eBPF firewall kernel module to eliminate Envoy sidecar latency overhead.' },
      { time: '05:00 PM', activity: 'Key Talent Sponsoring', detail: 'Career conversation with Senior Engineer outlining roadmap towards Staff promotion.' }
    ],
    promotionChecklist: [
      'Proven track record of delivering multi-million dollar business impact or architectural transformation.',
      'Sought after as an organizational advisor by executives, directors, and external partners.',
      'Demonstrates exceptional clarity in written and oral communication; simplifies complex topics.',
      'Acts as a cultural compass, fostering psychological safety, rigor, and inclusion across hundreds of engineers.',
      'Anticipates technology and industry shifts 2-3 years before they become bottlenecks.'
    ],
    antiPatterns: [
      'Dictating top-down mandates without buy-in from the engineers who have to implement and maintain them.',
      'Disconnecting entirely from code and becoming an abstract theorist disconnected from real operational pain.',
      'Building custom in-house frameworks when superior open-source industry standards exist.'
    ]
  }
];
