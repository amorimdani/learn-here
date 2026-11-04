import { LearningTrack } from '../types';

export const learningTracksData: LearningTrack[] = [
  {
    id: 'distributed-systems',
    title: 'Distributed Systems & Consensus Engineering',
    institutionInspiration: 'Inspired by MIT 6.824 (Distributed Systems) & Stanford CS244B',
    duration: '12 Weeks (Self-Paced / 10-15 hrs/week)',
    level: 'Advanced / Senior Engineering Track',
    description: 'An exhaustive curriculum dissecting how planet-scale distributed databases and storage engines achieve fault-tolerance, linearizability, and consensus across unreliable networks subject to packet loss, clock drift, and node crashes.',
    prerequisites: [
      'Proficiency in Go or Rust (goroutines/threads, channels, mutexes)',
      'Basic networking knowledge (TCP/IP sockets, RPCs, HTTP)',
      'Understanding of basic data structures (hash maps, trees, queues)'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'RPCs, Concurrency Primitives & Network Failure Modes',
        estimatedHours: 12,
        topicsCovered: [
          'Remote Procedure Calls (RPC) semantics: At-least-once, At-most-once, Exactly-once',
          'Network partitions, Byzantine faults vs fail-stop crash model',
          'Locking hierarchies, deadlocks, and race detection with Go -race detector',
          'Linearizability vs Serializability vs Eventual Consistency'
        ],
        handsOnLab: {
          title: 'Lab 1: Resilient Multi-Threaded Key-Value RPC Server',
          objective: 'Build an in-memory key-value server with a custom RPC protocol supporting idempotent requests and deduplication tokens under simulated 20% packet loss.',
          deliverable: 'Go or Rust server that passes automated concurrency tests with zero data race warnings and handles duplicate client request retransmissions.',
          codeStarter: `package main

import (
	"sync"
)

type PutArgs struct {
	Key       string
	Value     string
	RequestID string // Idempotency token
}

type PutReply struct {
	Success bool
}

type KVServer struct {
	mu            sync.Mutex
	store         map[string]string
	processedReqs map[string]bool // Deduplication cache
}

func (kv *KVServer) Put(args *PutArgs, reply *PutReply) error {
	kv.mu.Lock()
	defer kv.mu.Unlock()

	// Check if already processed to guarantee at-most-once semantics
	if kv.processedReqs[args.RequestID] {
		reply.Success = true
		return nil
	}

	kv.store[args.Key] = args.Value
	kv.processedReqs[args.RequestID] = true
	reply.Success = true
	return nil
}`
        },
        selfAssessmentQuestions: [
          {
            question: 'Why is it impossible to achieve guaranteed "exactly-once" delivery over an unreliable network?',
            answer: 'Because of the Two Generals Paradox: over an unreliable channel, you can never be certain whether a lost message was the original request or the confirmation acknowledgment. You achieve effective exactly-once semantics by combining at-least-once network retries with server-side idempotent request deduplication.'
          },
          {
            question: 'What is the precise difference between Linearizability and Serializability?',
            answer: 'Linearizability is a real-time recency guarantee on single operations across distributed nodes (if write W completes at wall-clock time T, any read R starting after T must observe W or a later write). Serializability is a multi-operation transactional guarantee stating that the execution of concurrent transactions is equivalent to some serial ordering, but with no real-time constraint.'
          }
        ]
      },
      {
        moduleNumber: 2,
        title: 'The Raft Consensus Algorithm & Replicated State Machines',
        estimatedHours: 20,
        topicsCovered: [
          'Replicated State Machine architecture',
          'Raft Leader Election, randomized election timeouts, split votes',
          'Log replication, term numbers, commitIndex, and log matching invariant',
          'Safety property: Leader Completeness (a leader must contain all committed entries)'
        ],
        handsOnLab: {
          title: 'Lab 2: Implement Leader Election & Heartbeats in Raft',
          objective: 'Implement the Raft consensus core in Go: handle RequestVote and AppendEntries RPCs, manage leader heartbeats, and elect a single stable leader even during network disconnects.',
          deliverable: 'Raft consensus node passing automated election tests with 3 to 5 nodes.',
          codeStarter: `type NodeRole int
const (
	Follower NodeRole = iota
	Candidate
	Leader
)

type RaftNode struct {
	mu        sync.Mutex
	currentTerm int
	votedFor    int
	role        NodeRole
	log         []LogEntry
	commitIndex int
	// Heartbeat timers & channels
}`
        },
        selfAssessmentQuestions: [
          {
            question: 'Why does Raft require a strict majority quorum (N/2 + 1) to elect a leader and commit log entries?',
            answer: 'Because any two majorities of a cluster of size N must overlap in at least one node. This guaranteed overlap node ensures that any newly elected leader will contain the highest term and all committed entries from previous terms, preventing split-brain states.'
          }
        ]
      },
      {
        moduleNumber: 3,
        title: 'Log Compaction, Snapshots & Cluster Membership Changes',
        estimatedHours: 16,
        topicsCovered: [
          'State machine snapshotting to prevent unbounded log growth',
          'InstallSnapshot RPC for lagging followers',
          'Joint consensus for dynamic cluster reconfiguration (adding/removing nodes without downtime)',
          'Read-index optimization to prevent stale reads without writing to disk'
        ],
        handsOnLab: {
          title: 'Lab 3: Build a Distributed Raft-Backed Fault-Tolerant KV Database',
          objective: 'Assemble the Raft consensus module into a full distributed database that serves concurrent Get/Put requests and recovers state after leader process kills.',
          deliverable: 'Complete distributed database passing Jepsen-style network partition simulations.',
          codeStarter: `// Snapshotting state machine snapshot to disk
func (kv *RaftKV) CreateSnapshot(lastIndex int) []byte {
	// Serialize memory store into binary snapshot
	// Discard Raft log entries up to lastIndex
	return nil
}`
        },
        selfAssessmentQuestions: [
          {
            question: 'What is the purpose of ReadIndex in Raft?',
            answer: 'ReadIndex allows the leader to serve read queries without appending a new entry to the replicated log. The leader checks its commitIndex, sends a lightweight heartbeat round to confirm it is still the authoritative leader (avoiding partitioned stale leaders), and responds once the state machine catches up to that commitIndex.'
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Build a Distributed Partitioned Key-Value Store with Multi-Raft',
      description: 'Design and build a multi-raft partitioned storage system (similar to CockroachDB or TiKV). The dataset is split into ranges, where each range is managed by an independent Raft consensus group.',
      requirements: [
        'Range-based sharding with dynamic splitting when a partition exceeds 64MB.',
        'Multi-Raft leader balance across physical nodes.',
        'Two-Phase Commit (2PC) coordination for cross-partition transactions.',
        'Demonstrated linearizable reads and zero data loss during node failure injection.'
      ],
      architectureTip: 'Start with 3 nodes and 3 partitions. Use Go slog for structured tracing with trace IDs propagating across Raft RPC calls.'
    }
  },
  {
    id: 'database-storage-engines',
    title: 'Database Storage Engines, Internals & Query Optimization',
    institutionInspiration: 'Inspired by Carnegie Mellon CMU 15-445 / 645 (Database Systems)',
    duration: '10 Weeks (Self-Paced / 10 hrs/week)',
    level: 'Advanced Systems Track',
    description: 'Deep architectural study of how relational and analytical database engines manage physical disk storage, memory buffer pools, B+ Trees, Log-Structured Merge (LSM) Trees, transaction isolation, and query execution planning.',
    prerequisites: [
      'C++ or Rust familiarity (pointers, memory layout, structs, alignment)',
      'Understanding of disk I/O, file systems, and page caching',
      'Basic SQL schema design and query execution experience'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Disk Storage Architecture & Buffer Pool Management',
        estimatedHours: 12,
        topicsCovered: [
          'Slotted-page layout: header, tuple directory, and payload bytes',
          'Disk Manager: allocating and reading 4KB/8KB disk pages',
          'Buffer Pool Manager: Frame table, Dirty flags, Pin counts',
          'Eviction policies: LRU-K (K=2) vs CLOCK algorithm vs 2Q'
        ],
        handsOnLab: {
          title: 'Lab 1: Implement an LRU-K Buffer Pool Manager in C++ or Rust',
          objective: 'Build an in-memory buffer pool that caches disk pages, tracks pin counts, and evicts cold pages using LRU-K algorithm to prevent sequential scan cache pollution.',
          deliverable: 'Thread-safe buffer pool passing high-concurrency page eviction test suites.',
          codeStarter: `class BufferPoolManager {
public:
    Page* FetchPage(page_id_t page_id);
    bool UnpinPage(page_id_t page_id, bool is_dirty);
    bool FlushPage(page_id_t page_id);
    page_id_t NewPage();
private:
    std::unordered_map<page_id_t, frame_id_t> page_table_;
    std::vector<Page> pages_; // Fixed memory pool
    LRUReplacer replacer_;
    std::mutex latch_;
};`
        },
        selfAssessmentQuestions: [
          {
            question: 'Why does a DBMS implement its own Buffer Pool Manager instead of relying on the OS page cache (mmap)?',
            answer: 'Because the DBMS understands query execution plans. It can perform predictive pre-fetching, fine-grained dirty page flushing to enforce Write-Ahead Logging (WAL) order, manage page pin counts during transactions, and prevent bulk sequential scans from evicting hot index pages.'
          }
        ]
      },
      {
        moduleNumber: 2,
        title: 'B+ Tree Indexing vs LSM Trees (Log-Structured Merge)',
        estimatedHours: 16,
        topicsCovered: [
          'B+ Tree search, split, and merge operations; node balancing',
          'LSM Tree architecture: MemTable (Skiplist), Write-Ahead Log (WAL), SSTables',
          'Bloom Filters for fast negative lookups',
          'Compaction algorithms: Size-Tiered vs Leveled Compaction (RocksDB/Cassandra)'
        ],
        handsOnLab: {
          title: 'Lab 2: Build a Compact LSM-Tree Engine with MemTable & SSTables',
          objective: 'Implement an append-only LSM storage engine in Rust with an in-memory skiplist MemTable, immutable SSTable disk flushes, and Bloom filters.',
          deliverable: 'Functional LSM engine supporting Put, Get, and basic Leveled Compaction.',
          codeStarter: `pub struct LsmEngine {
    memtable: Arc<RwLock<Skiplist>>,
    immutable_memtable: Option<Arc<Skiplist>>,
    wal: File,
    sstables: Vec<SSTableReader>,
}`
        },
        selfAssessmentQuestions: [
          {
            question: 'What is the trade-off between B+ Trees and LSM Trees regarding read vs write amplification?',
            answer: 'B+ Trees optimize for read performance: lookups take predictable O(log N) page reads, but writes require updating random disk pages in place, causing high write amplification. LSM Trees optimize for write throughput: writes are appended sequentially to a WAL and MemTable in memory (O(1)), but reads may have to search multiple SSTable levels, causing higher read amplification.'
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Build a Fully Functional Mini SQL Database Engine',
      description: 'Construct a relational database engine from scratch incorporating a Disk Buffer Pool, B+ Tree index, simple SQL parser (AST), and Volcano-style iterator execution engine (SeqScan, IndexScan, NestedLoopJoin, HashJoin).',
      requirements: [
        'Persistent slotted-page file format on disk.',
        'ACID Write-Ahead Logging (WAL) with ARIES recovery (Analysis, Redo, Undo).',
        'Execution of SELECT, INSERT, UPDATE, DELETE with WHERE filters and primary key index lookups.'
      ],
      architectureTip: 'Structure the codebase cleanly into storage/, index/, catalog/, execution/, and concurrency/.'
    }
  }
];
