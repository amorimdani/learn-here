import { InterviewQuestion } from '../types';

export const interviewQuestionsData: InterviewQuestion[] = [
  {
    id: 'tell-me-about-yourself',
    category: 'Recruiter Screening',
    difficulty: 'Standard',
    question: 'Tell me about yourself and walk me through your engineering background.',
    context: 'The opening question in 95% of recruiter and hiring manager phone screens. Sets the first impression and tone for the entire interview cycle.',
    recruiterPerspective: 'Recruiters are listening for: 1) Can this person articulate their career journey concisely in under 2 minutes? 2) Do their skills match our job requirements? 3) Do they communicate with enthusiasm and clarity without rambling into irrelevant life details?',
    modelAnswer: {
      strategy: 'Use the "Present - Past - Future" framework. Start with your current scope and top technical achievements, mention key milestones that built your expertise, and explain why this specific company aligns with your next career trajectory.',
      fullResponse: `"I'm currently a Senior Software Engineer at FinEdge, where I lead the backend team responsible for our real-time payment settlement engine. Over the last two years, I spearheaded the migration of our monolithic payment processing system to an event-driven microservices architecture using Go and Apache Kafka. This slashed transaction latency from 450 milliseconds down to 65 milliseconds and supported a 4x growth in daily transactions to over 15 million without a single minute of downtime.

Before that, I spent three years at CloudScale building high-throughput APIs in TypeScript and PostgreSQL, where I developed a deep foundation in database query optimization, distributed caching, and zero-downtime CI/CD pipelines.

I've been following your engineering team's work on distributed edge databases, particularly your open-source contributions to WASM runtimes. I'm excited about this opportunity because it combines my passion for low-latency distributed systems with the chance to solve scale challenges for millions of developers worldwide."`,
      keyPhrasesToUse: [
        'Spearheaded the migration of...',
        'Reduced p99 latency from X to Y...',
        'Architected for high throughput under peak load...',
        'Collaborated cross-functionally with product and infrastructure teams...'
      ],
      redFlagsToAvoid: [
        'Reciting your resume line-by-line starting from high school or college graduation.',
        'Speaking negatively about past employers, managers, or teammates.',
        'Rambling for more than 2.5 minutes without checking in with the interviewer.'
      ]
    }
  },
  {
    id: 'star-conflict-resolution',
    category: 'Behavioral (STAR)',
    difficulty: 'Challenging',
    question: 'Describe a time you had a strong technical disagreement with a teammate or senior engineer. How did you resolve it?',
    context: 'Behavioral screening measuring emotional intelligence, intellectual humility, collaboration, and data-driven decision making.',
    recruiterPerspective: 'Recruiters want to see: Are you dogmatic and stubborn? Do you sulk or get aggressive when overruled? Do you rely on objective data and user impact rather than ego?',
    modelAnswer: {
      strategy: 'Structure using the STAR framework (Situation, Task, Action, Result). Emphasize psychological safety, active listening, creating a shared empirical benchmark, and disagreeing and committing when appropriate.',
      breakdown: {
        situation: 'During the redesign of our real-time notification engine, our principal architect advocated for adopting a bleeding-edge graph database, while I believed a partitioned PostgreSQL cluster with Redis caching was significantly safer and more cost-effective.',
        task: 'We had a 3-week deadline to finalize the architectural blueprint. Escalating into personal arguments was threatening the team delivery schedule.',
        action: 'Instead of debating theoretical benefits in endless meetings, I scheduled a 30-minute sync to understand his core concerns, which centered on complex multi-hop relationship queries for user groups. I proposed building a fast 3-day proof-of-concept (PoC) where we benchmarked both systems using realistic load tests of 10,000 queries/sec simulating peak Black Friday traffic. I set up k6 load scripts and Datadog monitoring to measure latency, operational complexity, and infrastructure cost.',
        result: 'The benchmark revealed that while the graph database offered elegant syntax, its write throughput under high concurrency lagged by 3x and lacked mature backup automation tooling. We unanimously agreed on PostgreSQL with JSONB and Redis. The project launched on time, maintained 99.99% uptime, and saved the company roughly $40,000 annually in licensing. Most importantly, the principal engineer and I built a strong foundation of mutual trust and collaborated on multiple RFCs afterward.'
      },
      fullResponse: 'See STAR breakdown above.',
      keyPhrasesToUse: [
        'Rather than arguing subjective opinions, I proposed an empirical benchmark...',
        'I scheduled a 1-on-1 to genuinely understand the underlying technical concerns...',
        'We agreed on clear success criteria before running the test...',
        'Once the data was clear, we aligned enthusiastically and executed together.'
      ],
      redFlagsToAvoid: [
        'Claiming you "proved the other person completely wrong and made them apologize".',
        'Claiming you have never had a disagreement because you get along with everyone (signals lack of experience or avoidance).',
        'Refusing to accept decisions once the team has reached consensus.'
      ]
    }
  },
  {
    id: 'system-design-url-shortener',
    category: 'System Design',
    difficulty: 'Standard',
    question: 'Design a highly available, globally scalable URL Shortener service (like Bit.ly or TinyURL).',
    context: 'The canonical System Design question testing capacity estimation, hashing algorithms, database selection, caching strategy, and global routing.',
    recruiterPerspective: 'Assesses whether the candidate can drive ambiguous requirements, perform back-of-the-envelope calculations, identify bottlenecks, and make reasoned architectural trade-offs.',
    modelAnswer: {
      strategy: 'Follow the 4-step System Design framework: 1) Requirements & Scope, 2) Capacity Estimation, 3) High-Level Architecture & API Design, 4) Deep-Dive Bottlenecks (Hashing, Race Conditions, Cache Invalidation).',
      fullResponse: `1. Requirements Clarification:
- Functional: Generate a unique short URL (e.g. https://sho.rt/a8F9k2) given a long URL; Redirect short URL to original destination with HTTP 301/302; Track click analytics.
- Non-Functional: High availability (99.99%), ultra-low read latency (<15ms), durable storage for 5 years, tamper-resistant IDs.

2. Capacity Estimation (Back-of-the-envelope):
- Write traffic: 100 million new URLs/month = ~40 writes/second (peak 100/sec).
- Read traffic: 100:1 Read-to-Write ratio = 4,000 reads/second (peak 10,000/sec).
- Storage: 100M URLs * 500 bytes = 50GB/month = 3TB over 5 years. (Easily fits on modern storage).
- Cache memory (80/20 Pareto rule): 20% of daily read traffic cached in Redis: 0.2 * (400M reads/day * 500 bytes) ≈ 40GB RAM.

3. Key Generation Strategy:
- Base62 encoding ([a-z, A-Z, 0-9] = 62 characters).
- A 7-character string provides 62^7 ≈ 3.5 trillion unique combinations, lasting decades.
- Avoid MD5/SHA256 truncation due to hash collisions.
- Use a distributed unique ID generator (Twitter Snowflake or pre-allocated range counters in Redis/Zookeeper) converted to Base62.

4. System Topology & Data Flow:
[Client] -> [Cloudflare Anycast CDN / Edge] -> [Load Balancer] -> [API Service (Go/Node)]
                                                                       |
                 +-----------------------------------------------------+---------------------------------------------------+
                 |                                                                                                         |
                 v (Read Path: Cache hit <5ms)                                                                             v (Write Path)
     [Redis Cluster (LRU Eviction)]                                                                           [PostgreSQL / DynamoDB Primary]
                 | (Cache miss)                                                                                            |
                 v                                                                                                         v
      [Read Replica DB]                                                                                       [Kafka Analytics Stream]
                                                                                                                           |
                                                                                                                           v
                                                                                                                [ClickHouse / BigQuery]`,
      keyPhrasesToUse: [
        'HTTP 301 Permanent vs 302 Temporary redirect tradeoff (301 reduces server load via browser caching but blinds click analytics; 302 tracks every click).',
        'Base62 encoding avoids collisions inherent in hash truncation.',
        'Cache-aside strategy with LRU eviction for the hottest 20% URLs.',
        'Rate limiting via Token Bucket algorithm in Redis to prevent crawler scraping.'
      ],
      redFlagsToAvoid: [
        'Jumping straight into drawing boxes before clarifying read/write ratios and latency SLAs.',
        'Suggesting auto-increment integer IDs in a multi-node database without addressing race conditions and predictable enumeration attacks.',
        'Ignoring cache eviction policies when Redis memory fills up.'
      ]
    },
    technicalDiagramOrCode: `// Base62 Converter for Distributed 64-bit Snowflake IDs
const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function encodeBase62(num: bigint): string {
  let encoded = '';
  let n = num;
  while (n > 0n) {
    const remainder = Number(n % 62n);
    encoded = BASE62_CHARS[remainder] + encoded;
    n = n / 62n;
  }
  return encoded.padStart(7, '0');
}

export function decodeBase62(str: string): bigint {
  let decoded = 0n;
  for (let i = 0; i < str.length; i++) {
    const charIndex = BigInt(BASE62_CHARS.indexOf(str[i]));
    decoded = decoded * 62n + charIndex;
  }
  return decoded;
}`
  },
  {
    id: 'salary-negotiation-recruiter',
    category: 'Recruiter Screening',
    difficulty: 'Standard',
    question: 'What are your salary expectations for this role?',
    context: 'Usually asked in the first recruiter screen or when advancing to offer stage. A critical conversation that dictates your total compensation package.',
    recruiterPerspective: 'Recruiters want to verify whether you fall within their budgeted band (e.g. $160k - $210k) and avoid presenting an offer you will immediately reject.',
    modelAnswer: {
      strategy: 'Deflect early in the process until you understand full role scope and expectations. Anchor on market research (Levels.fyi, Blind) and total compensation (Base + Equity + Bonus) rather than just base salary.',
      fullResponse: `"Right now, my primary priority is finding the right technical and cultural fit where I can deliver massive impact to your distributed systems infrastructure. Because total compensation varies widely depending on equity vesting schedules, bonus structures, and 401(k) matching, I prefer to understand the full scope of the role and technical challenges before discussing exact figures. 

Could you share the budgeted compensation range approved for this level? I'd be happy to confirm if we're in the right ballpark."

(If pressed for a specific number later in the offer stage):
"Based on market data for Senior Distributed Systems Engineers in our tier, alongside the scope of owning the core payment engine, I'm targeting a total compensation package in the $210,000 to $235,000 range. However, I'm flexible on the breakdown between base salary and equity for the right long-term opportunity."`,
      keyPhrasesToUse: [
        'I evaluate opportunities based on Total Compensation (Base, Equity, Bonus)...',
        'Could you share the approved compensation band for this level?',
        'I am confident that if we find mutual technical alignment, we will easily agree on fair market compensation.'
      ],
      redFlagsToAvoid: [
        'Blurting out your current salary (it is illegal for recruiters to demand this in many jurisdictions and anchors you low).',
        'Giving an unrealistically wide range (e.g. "I\'m looking for anything between $120k and $250k").',
        'Becoming adversarial or defensive about compensation.'
      ]
    }
  },
  {
    id: 'dsa-concurrency-pattern',
    category: 'Data Structures & Algorithms',
    difficulty: 'Challenging',
    question: 'Implement a Thread-Safe In-Memory LRU Cache with O(1) Get and Put operations.',
    context: 'Standard technical coding interview question asked by Google, Meta, Amazon, and Stripe to test understanding of Hash Tables, Doubly Linked Lists, and synchronization.',
    recruiterPerspective: 'Tests whether the candidate understands why a Hash Map alone cannot maintain LRU ordering (no O(1) eviction) and why a Doubly Linked List is required to re-link nodes in O(1) time.',
    modelAnswer: {
      strategy: 'Pair a Hash Table (for O(1) key-to-node pointer lookup) with a Doubly Linked List with dummy head and tail sentinel nodes (for O(1) node relocation and least-recently-used eviction).',
      fullResponse: 'See complete TypeScript implementation below.',
      keyPhrasesToUse: [
        'Dummy head and tail sentinel nodes eliminate edge cases when inserting/deleting from head or tail.',
        'Get operation moves node to head (most recently used).',
        'Put operation updates existing node or evicts node right before tail if capacity exceeded.',
        'Time complexity: O(1) for both get and put. Space complexity: O(Capacity).'
      ],
      redFlagsToAvoid: [
        'Using an Array instead of a Doubly Linked List (Array.shift() or splice() is O(N) time!).',
        'Forgetting to update the Hash Map when evicting a node from the Doubly Linked List.',
        'Off-by-one errors on capacity boundary checks.'
      ]
    },
    technicalDiagramOrCode: `// Production Doubly Linked List Node
class DNode<K, V> {
  key: K;
  value: V;
  prev: DNode<K, V> | null = null;
  next: DNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, DNode<K, V>>;
  private head: DNode<K, V>; // Sentinel Head (Most Recently Used side)
  private tail: DNode<K, V>; // Sentinel Tail (Least Recently Used side)

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error("Capacity must be positive");
    this.capacity = capacity;
    this.map = new Map();

    // Initialize dummy sentinels to avoid null checks
    this.head = new DNode<K, V>(null as any, null as any);
    this.tail = new DNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    // Move accessed node to head (Most Recently Used)
    this.removeNode(node);
    this.addToHead(node);
    return node.value;
  }

  public put(key: K, value: V): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.removeNode(existing);
      this.addToHead(existing);
      return;
    }

    if (this.map.size >= this.capacity) {
      // Evict Least Recently Used node (node right before sentinel tail)
      const lruNode = this.tail.prev!;
      this.removeNode(lruNode);
      this.map.delete(lruNode.key);
    }

    const newNode = new DNode(key, value);
    this.addToHead(newNode);
    this.map.set(key, newNode);
  }

  private removeNode(node: DNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private addToHead(node: DNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }
}`
  }
];
