import { AiTopic } from '../types';

export const aiCatalogData: AiTopic[] = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals: Neural Networks & The Transformer Architecture',
    category: 'Fundamentals',
    tagline: 'Math, Vectors, Scaled Dot-Product Attention, and the Foundation of Modern Deep Learning',
    readTime: '18 min read',
    difficulty: 'Intermediate',
    summary: 'The modern artificial intelligence revolution is anchored by the Transformer architecture introduced in the landmark 2017 paper "Attention Is All You Need" (Vaswani et al.). Unlike recurrent neural networks (RNNs) that processed tokens sequentially and suffered from vanishing gradients, Transformers leverage self-attention to process entire sequences in parallel across high-dimensional vector spaces.',
    coreConcepts: [
      {
        title: 'High-Dimensional Embeddings & Vector Spaces',
        description: 'Text cannot be consumed by neural networks as raw characters. Text is tokenized into integer IDs (e.g., using Byte-Pair Encoding BPE), which are then mapped to dense continuous vectors in an embedding space (typically 4,096 to 8,192 dimensions in modern LLMs). Words or concepts with similar semantic meanings cluster together in this geometric space.',
        mathOrDiagram: 'Embedding: E(x) ∈ ℝ^d, where cosine similarity cos(θ) = (A · B) / (||A|| ||B||) measures semantic alignment.',
        practicalImpact: 'Powers vector search, semantic clustering, RAG retrieval, and classification without relying on exact keyword matching.'
      },
      {
        title: 'Scaled Dot-Product Self-Attention',
        description: 'The core mechanism that allows a model to weigh the relevance of every token in a sentence against every other token simultaneously. For each token, the model projects three vectors: Query (Q), Key (K), and Value (V). The dot product of Query and Key measures compatibility, scaled by the square root of the dimension (sqrt(d_k)) to prevent vanishing gradients in softmax.',
        mathOrDiagram: 'Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) * V',
        practicalImpact: 'Enables the model to resolve ambiguous pronouns (e.g. "The bank was full of water" vs "The bank approved my loan") with contextual precision.'
      },
      {
        title: 'Multi-Head Attention & Rotary Positional Embeddings (RoPE)',
        description: 'Instead of performing a single attention function, Multi-Head Attention projects Q, K, and V multiple times with learned linear projections. This allows the model to jointly attend to information from different representation subspaces (e.g., syntactic structure, semantic roles, long-range factual dependencies) at different positions.',
        practicalImpact: 'RoPE encodes positional information by rotating query and key vectors in complex space, allowing seamless extrapolation to massive context windows (128k to 1M+ tokens).'
      }
    ],
    interactiveDemo: {
      type: 'tokenization',
      title: 'Attention Matrix & Token Weights Explorer',
      description: 'Inspect how tokens attend to preceding context in a self-attention layer.'
    },
    codeImplementation: {
      title: 'Pure Python/NumPy Scaled Dot-Product Attention Implementation',
      language: 'python',
      code: `import numpy as np

def softmax(x: np.ndarray, axis: int = -1) -> np.ndarray:
    """Numerically stable softmax using the max subtraction trick."""
    e_x = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return e_x / np.sum(e_x, axis=axis, keepdims=True)

def scaled_dot_product_attention(
    Q: np.ndarray, 
    K: np.ndarray, 
    V: np.ndarray, 
    mask: np.ndarray = None
) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute Scaled Dot-Product Attention:
    Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V
    
    Q shape: (seq_len, d_k)
    K shape: (seq_len, d_k)
    V shape: (seq_len, d_v)
    """
    d_k = Q.shape[-1]
    
    # Step 1: Compute raw similarity scores via matrix multiplication
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    
    # Step 2: Apply causal mask (optional) to prevent looking at future tokens
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
        
    # Step 3: Normalize scores into probabilities via Softmax
    attention_weights = softmax(scores, axis=-1)
    
    # Step 4: Multiply attention weights by Value vectors
    output = np.matmul(attention_weights, V)
    
    return output, attention_weights

# Example Demonstration
if __name__ == "__main__":
    np.random.seed(42)
    seq_len = 4  # e.g., ["The", "neural", "network", "learns"]
    d_k = 8      # dimension of keys/queries
    
    Q = np.random.randn(seq_len, d_k)
    K = np.random.randn(seq_len, d_k)
    V = np.random.randn(seq_len, d_k)
    
    output, weights = scaled_dot_product_attention(Q, K, V)
    print("Attention Output Shape:", output.shape)
    print("Attention Weights (Row sum = 1.0):\\n", np.round(weights, 3))`,
      explanation: 'Functional, mathematically rigorous implementation of the Attention mechanism showing the exact matrix multiplications and numerical stabilization.'
    },
    productionBestPractices: [
      'Use FlashAttention-2 or FlashAttention-3 in production PyTorch/vLLM for IO-aware GPU memory tiling, cutting memory complexity from O(N^2) to O(N).',
      'Always use FP16 or BF16 (Brain Floating Point) instead of FP32 during inference to double memory throughput with zero accuracy degradation.',
      'Pre-allocate Key-Value (KV) cache memory to avoid GPU heap reallocations during iterative autoregressive generation.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Attention Memory Quadratic Scaling',
        observation: 'Standard self-attention memory scales quadratically with sequence length (O(N^2)). At 32k tokens, raw attention tensors can exhaust 80GB VRAM.',
        workaround: 'Use FlashAttention (which never writes the full N x N attention matrix to GPU HBM) and PagedAttention (vLLM) to manage fragmented KV cache.'
      }
    ]
  },
  {
    id: 'llm-architecture-quantization',
    title: 'LLM Architecture, Training Lifecycle & Quantization',
    category: 'LLM Architecture',
    tagline: 'Pre-Training, SFT, RLHF/DPO, and Weight Quantization (GGUF, AWQ, GPTQ)',
    readTime: '22 min read',
    difficulty: 'Advanced',
    summary: 'Building and deploying Large Language Models involves a three-phase training pipeline: unsupervised Pre-training on trillions of tokens, Supervised Fine-Tuning (SFT) on curated instruction-response pairs, and Preference Alignment (RLHF or Direct Preference Optimization - DPO). For efficient edge and cloud deployment, weight quantization compresses 16-bit floating point parameters down to 4-bit or 8-bit integers with minimal perplexity degradation.',
    coreConcepts: [
      {
        title: 'Decoder-Only Autoregressive Architecture',
        description: 'Modern flagship models (Llama 3, Mistral, GPT-4, Claude) use a Decoder-only architecture. Given a prefix of tokens [t_1, t_2, ..., t_n], the model outputs a probability distribution over the entire vocabulary for token t_{n+1}. During training, causal masking prevents tokens from attending to subsequent tokens.',
        practicalImpact: 'Simplifies training and inference into a single next-token prediction objective.'
      },
      {
        title: 'Alignment: SFT and Direct Preference Optimization (DPO)',
        description: 'While pre-training teaches the model world knowledge and language syntax, SFT teaches it to follow instructions in conversational format. DPO replaces complex Reinforcement Learning from Human Feedback (PPO/reward models) with a closed-form mathematical loss that directly increases the likelihood of preferred responses over rejected responses.',
        practicalImpact: 'Aligns raw base models into helpful, harmless, and steered chat assistants with high adherence.'
      },
      {
        title: 'Post-Training Quantization (AWQ, GPTQ, GGUF)',
        description: 'A 70B parameter model in FP16 requires 140 GB of VRAM just to store weights. Quantization maps floating point values to lower precision (INT8, INT4). AWQ (Activation-aware Weight Quantization) protects the 1% most salient weights that cause large activation spikes, quantizing the remaining 99% to INT4 with zero perceptible quality loss.',
        practicalImpact: 'Allows a 70B model to run comfortably on two consumer 24GB RTX 3090 GPUs instead of requiring an $80,000 server.'
      }
    ],
    interactiveDemo: {
      type: 'prompt-eval',
      title: 'Quantization VRAM Calculator & Precision Tradeoff Matrix',
      description: 'Calculate memory requirements for 7B, 13B, 34B, and 70B models across FP16, INT8, and INT4.'
    },
    codeImplementation: {
      title: 'Production vLLM High-Throughput Serving Configuration with AWQ',
      language: 'python',
      code: `# Serving an open-weights model with vLLM PagedAttention and AWQ Quantization
from vllm import LLM, SamplingParams

# Initialize engine with continuous batching and PagedAttention
llm = LLM(
    model="meta-llama/Meta-Llama-3-70B-Instruct",
    quantization="awq",              # Enables 4-bit AWQ hardware acceleration
    tensor_parallel_size=2,          # Shard model weights across 2 GPUs
    gpu_memory_utilization=0.92,     # Allocate 92% of VRAM to KV cache
    max_model_len=8192,              # Context window
    trust_remote_code=True
)

# Define generation parameters
sampling_params = SamplingParams(
    temperature=0.2,                 # Low temperature for deterministic, factual outputs
    top_p=0.9,
    max_tokens=1024,
    stop=["<|eot_id|>"]             # Llama 3 end-of-turn token
)

prompts = [
    "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\\nYou are an expert systems engineer.<|eot_id|><|start_header_id|>user<|end_header_id|>\\nExplain how epoll works in Linux.<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
]

outputs = llm.generate(prompts, sampling_params)
for output in outputs:
    print("Generated:", output.outputs[0].text)`,
      explanation: 'Production script demonstrating how enterprise AI engineering teams serve 70B parameter models at 1,500+ tokens/second using vLLM continuous batching.'
    },
    productionBestPractices: [
      'Select AWQ for GPU-accelerated server inference; select GGUF/llama.cpp for CPU or unified-memory Mac (Metal) local execution.',
      'Always configure continuous batching in inference engines to eliminate idle GPU compute during request queuing.',
      'Pin the KV cache size based on expected peak concurrent user streams to prevent GPU Out-of-Memory (OOM) evictions.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Perplexity Degradation in INT4',
        observation: 'Naive uniform INT4 quantization increases model perplexity substantially, causing hallucination in mathematical reasoning.',
        workaround: 'Always use AWQ or GGUF K-quants (Q4_K_M) which preserve outlier channels and crucial attention weights in higher precision.'
      }
    ]
  },
  {
    id: 'ai-agents-tool-calling',
    title: 'AI Agents: ReAct, Planning, Tool Calling & Multi-Agent Orchestration',
    category: 'AI Agents',
    tagline: 'Autonomous Problem-Solving, Dynamic Reflection, and LangGraph State Machines',
    readTime: '25 min read',
    difficulty: 'Expert',
    summary: 'An AI Agent is an autonomous system that combines a Large Language Model (the reasoning engine) with memory, planning, and execution tools (APIs, databases, bash shells, code interpreters). Unlike static chatbot prompts, agents operate in an iterative perception-reasoning-action loop (ReAct) until a goal is achieved or a human-in-the-loop checkpoint is reached.',
    coreConcepts: [
      {
        title: 'The ReAct Framework (Reasoning + Acting)',
        description: 'Introduced by Yao et al. (2022), ReAct prompts the LLM to generate interleaved Thought, Action, and Observation steps. By articulating an explicit "Thought" before choosing a tool, the model avoids impulsive mistakes, self-corrects after unexpected tool errors, and breaks down complex problems into verifiable increments.',
        practicalImpact: 'Drastically improves success rates on multi-step workflows like codebase migration, database debugging, and research synthesis.'
      },
      {
        title: 'Native Function Calling & Structured Tool Schemas',
        description: 'Modern frontier models are fine-tuned to emit valid JSON conforming to OpenAPI schemas when calling tools. The application intercepts the tool call, executes the underlying native code (e.g. running a SQL query or git commit), and feeds the result back into the agent conversation context as a "tool" role message.',
        practicalImpact: 'Guarantees reliable parameter types, eliminates regex parsing hacks, and prevents prompt injection into tool execution arguments.'
      },
      {
        title: 'Multi-Agent Orchestration & LangGraph State Machines',
        description: 'Complex enterprise tasks fail when handled by a single agent due to context pollution. Multi-agent systems decompose tasks across specialized agents (e.g., Planner -> Coder -> Reviewer -> Security Auditor). LangGraph models these interactions as a cyclic directed graph with deterministic state transitions.',
        practicalImpact: 'Enables fault-tolerant workflows with automated loops for self-healing tests, compiler verification, and human approval gates.'
      }
    ],
    interactiveDemo: {
      type: 'agent-loop',
      title: 'Interactive ReAct Agent Step-by-Step Execution Visualizer',
      description: 'Trace how an AI Agent formulates thoughts, executes tools, inspects observations, and achieves goals.'
    },
    codeImplementation: {
      title: 'Complete Autonomous Agent Loop with Tool Calling in TypeScript',
      language: 'typescript',
      code: `// Autonomous Agent Loop with Tool Calling & Error Self-Correction
type Tool = {
  name: string;
  description: string;
  parameters: Record<string, string>;
  execute: (args: Record<string, any>) => Promise<string>;
};

// Registered tools available to the agent
const tools: Record<string, Tool> = {
  execute_sql: {
    name: 'execute_sql',
    description: 'Executes a read-only SQL query against the database.',
    parameters: { query: 'string' },
    execute: async ({ query }) => {
      console.log(\`[Tool] Executing SQL: \${query}\`);
      if (query.includes('FROM orders')) {
        return JSON.stringify([{ id: 'ORD-982', total: 1450.00, status: 'DELIVERED' }]);
      }
      return JSON.stringify({ error: 'Table not found' });
    }
  },
  send_email: {
    name: 'send_email',
    description: 'Dispatches an email alert to the user.',
    parameters: { recipient: 'string', body: 'string' },
    execute: async ({ recipient, body }) => {
      return \`Email successfully delivered to \${recipient}\`;
    }
  }
};

interface AgentMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCall?: { name: string; args: Record<string, any> };
}

export async function runAgentLoop(userGoal: string, maxSteps = 5): Promise<string> {
  const history: AgentMessage[] = [
    { role: 'system', content: 'You are an autonomous engineering agent. Use tools to satisfy the user goal.' },
    { role: 'user', content: userGoal }
  ];

  for (let step = 1; step <= maxSteps; step++) {
    console.log(\`--- Agent Step \${step} ---\`);

    // In production, call your LLM provider (Anthropic / OpenAI / Ollama) here.
    // Simulating LLM deciding to query DB, then sending email:
    let decision: AgentMessage;
    if (step === 1) {
      decision = {
        role: 'assistant',
        content: 'I need to check the database for customer orders first.',
        toolCall: { name: 'execute_sql', args: { query: 'SELECT * FROM orders WHERE total > 1000' } }
      };
    } else {
      decision = {
        role: 'assistant',
        content: 'I found the high-value order ORD-982. The user goal is complete.',
      };
    }

    history.push(decision);

    if (decision.toolCall) {
      const tool = tools[decision.toolCall.name];
      const result = await tool.execute(decision.toolCall.args);
      history.push({
        role: 'tool',
        content: result
      });
    } else {
      // Goal achieved, return final text
      return decision.content;
    }
  }
  return 'Agent step limit reached without full resolution.';
}`,
      explanation: 'Complete runnable reference implementation of the core Agent Loop pattern with execution state, tool dispatching, and feedback injection.'
    },
    productionBestPractices: [
      'Set hard limits on maximum iteration steps (e.g. max_steps = 10) to prevent infinite billing loops if an agent gets stuck.',
      'Enforce read-only tools or require explicit human-in-the-loop authorization for mutating actions (DROP table, git push main, transfer funds).',
      'Persist conversation state externally in Redis or Postgres so agent workflows can survive container restarts and resume seamlessly.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Agent Context Window Bloat',
        observation: 'When agents inspect large terminal outputs or web pages, context window expands rapidly, degrading reasoning quality (the "Lost in the Middle" phenomenon).',
        workaround: 'Truncate or summarize tool outputs before feeding them back into context, or use dedicated retrieval tools.'
      }
    ]
  },
  {
    id: 'rag-vector-databases',
    title: 'Advanced RAG & Vector Databases: From Naive to GraphRAG',
    category: 'RAG Systems',
    tagline: 'Semantic Chunking, Hybrid BM25 + Dense Search, Cross-Encoders, and Knowledge Graphs',
    readTime: '24 min read',
    difficulty: 'Advanced',
    summary: 'Retrieval-Augmented Generation (RAG) overcomes LLM knowledge cutoffs and private data limitations by dynamically fetching relevant context from external knowledge stores. Production RAG has evolved far beyond naive chunking into a multi-stage pipeline: semantic chunking, hybrid search (combining dense vector embeddings with sparse keyword BM25), reciprocal rank fusion, cross-encoder re-ranking, and knowledge graph relationship traversal (GraphRAG).',
    coreConcepts: [
      {
        title: 'Chunking Strategies & Semantic Density',
        description: 'Naive fixed-character chunking (e.g. 500 characters with 50-character overlap) breaks sentences in half and destroys contextual meaning. Semantic chunking splits documents along paragraph boundaries, Markdown headings, or embedding distance thresholds to ensure every chunk contains a coherent, standalone thought.',
        practicalImpact: 'Increases retrieval precision and prevents the model from generating answers based on fractured context fragments.'
      },
      {
        title: 'Hybrid Search: Dense Vectors + Sparse BM25',
        description: 'Dense vector search excels at high-level semantic similarity ("how do I reset password") but fails at exact alphanumeric identifiers ("SKU-4912-X"). Sparse BM25 excels at exact keyword matching but misses synonyms. Hybrid search executes both in parallel and merges rankings using Reciprocal Rank Fusion (RRF).',
        practicalImpact: 'Achieves the highest overall retrieval accuracy across technical documentation, codebases, and compliance manuals.'
      },
      {
        title: 'Cross-Encoder Re-Ranking',
        description: 'Vector databases use bi-encoders (which compute embeddings independently) to retrieve top 50 candidates in milliseconds. A Cross-Encoder re-ranker then takes the exact query and chunk together as a single input, passing them through full cross-attention layers to score true relevance with extreme precision.',
        practicalImpact: 'Filters out superficially matching chunks, leaving only the top 3-5 most pertinent context snippets for the final LLM prompt.'
      }
    ],
    interactiveDemo: {
      type: 'rag-simulator',
      title: 'Interactive RAG Pipeline & Re-Ranking Simulator',
      description: 'Observe how a user query undergoes chunking, vector distance calculation, hybrid fusion, and re-ranking.'
    },
    codeImplementation: {
      title: 'Production Hybrid Search & Reciprocal Rank Fusion (RRF) in TypeScript',
      language: 'typescript',
      code: `// Reciprocal Rank Fusion (RRF) Algorithm for Hybrid Search
interface SearchResult {
  id: string;
  content: string;
}

export function reciprocalRankFusion(
  denseResults: SearchResult[],
  sparseResults: SearchResult[],
  k = 60
): { id: string; content: string; score: number }[] {
  const scores: Record<string, { content: string; score: number }> = {};

  // Score dense vector results based on their rank position
  denseResults.forEach((doc, rank) => {
    if (!scores[doc.id]) {
      scores[doc.id] = { content: doc.content, score: 0 };
    }
    // RRF formula: 1 / (k + rank)
    scores[doc.id].score += 1 / (k + (rank + 1));
  });

  // Score sparse BM25 results based on their rank position
  sparseResults.forEach((doc, rank) => {
    if (!scores[doc.id]) {
      scores[doc.id] = { content: doc.content, score: 0 };
    }
    scores[doc.id].score += 1 / (k + (rank + 1));
  });

  // Sort descending by combined RRF score
  return Object.entries(scores)
    .map(([id, item]) => ({ id, content: item.content, score: item.score }))
    .sort((a, b) => b.score - a.score);
}

// Example usage:
const denseTopHits = [
  { id: 'doc-A', content: 'Authentication using OAuth2 and PKCE tokens' },
  { id: 'doc-B', content: 'Setting up PostgreSQL database connection pools' }
];

const bm25TopHits = [
  { id: 'doc-C', content: 'Legacy password reset guidelines' },
  { id: 'doc-A', content: 'Authentication using OAuth2 and PKCE tokens' } // Appears in both!
];

const fusedRankings = reciprocalRankFusion(denseTopHits, bm25TopHits);
console.log('Top Ranked Document:', fusedRankings[0].id, 'Score:', fusedRankings[0].score);`,
      explanation: 'Production algorithm standard for combining vector search and keyword search without needing to calibrate raw score ranges.'
    },
    productionBestPractices: [
      'Always store the source metadata (URL, file path, section heading, author, timestamp) alongside each chunk to provide citations to the user.',
      'Use a Cross-Encoder (like Cohere Rerank or bge-reranker-large) on the top 25 retrieved candidates before assembling the final prompt.',
      'Implement an automated evaluation pipeline (using Ragas or TruLens) to monitor faithfulness, answer relevance, and context precision.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Lost in the Middle Phenomenon',
        observation: 'LLMs attend strongly to tokens at the very beginning and very end of their context window, frequently overlooking relevant facts placed in the middle.',
        workaround: 'Order retrieved chunks by placing the highest-scoring chunks first and last in the prompt template, and keep total retrieved chunks under 5.'
      }
    ]
  },
  {
    id: 'developer-tooling-mcp',
    title: 'Modern AI Developer Tooling & Model Context Protocol (MCP)',
    category: 'Developer Tooling',
    tagline: 'Cursor, Cline, Local Ollama Clusters, and Open Standard Tooling Interfaces',
    readTime: '20 min read',
    difficulty: 'Intermediate',
    summary: 'Developer tooling has transformed from basic tab-autocomplete into agentic coding environments capable of editing multiple files, running unit tests, fixing compiler errors, and reasoning over massive repositories. Standardizing how AI models connect to development environments and databases is the Model Context Protocol (MCP), created by Anthropic as an open standard for tool and resource integration.',
    coreConcepts: [
      {
        title: 'Agentic IDEs: Indexing, Semantic Graphs, and Shadow Workspaces',
        description: 'Modern AI IDEs (Cursor, Windsurf) maintain an incremental AST and vector index of your entire git repository. When you request a refactor, the agent generates diffs in a shadow workspace, runs linter checks, and presents a multi-file diff for human review.',
        practicalImpact: 'Increases refactoring velocity by 3-5x while reducing syntax regressions.'
      },
      {
        title: 'Model Context Protocol (MCP) Architecture',
        description: 'MCP establishes a universal client-server architecture over JSON-RPC. Instead of writing custom plugins for every AI tool, an MCP server exposes Resources (read-only file/database access), Prompts (reusable templates), and Tools (executable functions). Clients like Claude Desktop or Cursor connect dynamically.',
        practicalImpact: 'Write an MCP server once in TypeScript or Python, and every compliant AI assistant can query your internal databases, Kubernetes clusters, and APIs securely.'
      },
      {
        title: 'Local AI Runtimes with Ollama & Hardware Acceleration',
        description: 'Ollama packages open-weight models (Llama 3.3, DeepSeek-R1, Qwen 2.5) into self-contained bundles running on local GPU/Metal acceleration. It provides an OpenAI-compatible REST API (/v1/chat/completions) for complete data privacy with zero cloud latency.',
        practicalImpact: 'Enables offline development, zero data leakage for confidential source code, and eliminates per-token API costs.'
      }
    ],
    interactiveDemo: {
      type: 'tokenization',
      title: 'MCP Server Inspector & Tool Protocol Simulator',
      description: 'Explore the JSON-RPC request and response lifecycle between an MCP Client and Server.'
    },
    codeImplementation: {
      title: 'Production Model Context Protocol (MCP) Server in TypeScript',
      language: 'typescript',
      code: `// Minimalist Model Context Protocol (MCP) Server using JSON-RPC 2.0
import * as readline from 'readline';

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params?: any;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Expose server capabilities to MCP client
const capabilities = {
  tools: {
    get_system_metrics: {
      description: 'Returns real-time server CPU and memory utilization',
      parameters: { type: 'object', properties: {} }
    }
  }
};

rl.on('line', (line) => {
  try {
    const req: JsonRpcRequest = JSON.parse(line);
    
    if (req.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id: req.id,
        result: {
          tools: [
            {
              name: 'get_system_metrics',
              description: capabilities.tools.get_system_metrics.description,
              inputSchema: capabilities.tools.get_system_metrics.parameters
            }
          ]
        }
      };
      console.log(JSON.stringify(response));
    } else if (req.method === 'tools/call') {
      const toolName = req.params?.name;
      if (toolName === 'get_system_metrics') {
        const response = {
          jsonrpc: '2.0',
          id: req.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ cpu_usage_percent: 18.4, mem_free_gb: 32.1 })
              }
            ]
          }
        };
        console.log(JSON.stringify(response));
      }
    }
  } catch (err) {
    // Handle parsing errors
  }
});`,
      explanation: 'Exemplifies the Model Context Protocol (MCP) standard over standard I/O (stdio), allowing Cursor and Claude to securely invoke system diagnostic tools.'
    },
    productionBestPractices: [
      'Always configure .cursorrules or AGENTS.md in your repository root to establish strict coding style, testing mandates, and forbidden patterns.',
      'Run Ollama with OLLAMA_NUM_PARALLEL=4 to support concurrent developer requests on a shared office workstation.',
      'Never allow unverified AI tools direct write access to git main or production databases without manual user confirmation.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Token Exhaustion in Context Windows',
        observation: 'Adding entire repositories into AI agent context degrades reasoning latency and hits hard model limits.',
        workaround: 'Use repository semantic search (embeddings) to inject only relevant symbols and interfaces rather than raw full files.'
      }
    ]
  },
  {
    id: 'applied-workflows-evals',
    title: 'Applied AI Workflows: Prompt Engineering & Automated Evals',
    category: 'Applied Workflows & Evals',
    tagline: 'Few-Shot, Chain-of-Thought, LLM-as-a-Judge, and Ragas Evaluation Frameworks',
    readTime: '21 min read',
    difficulty: 'Advanced',
    summary: 'Moving an AI application from a flashy prototype to a robust production system requires rigorous Prompt Engineering and quantitative Automated Evaluations. Guesswork and manual testing must be replaced by continuous evaluation suites (LLM-as-a-Judge, ground-truth benchmarking, latency/cost budgets) embedded directly into your CI/CD pipeline.',
    coreConcepts: [
      {
        title: 'Chain-of-Thought (CoT) & Few-Shot Prompting',
        description: 'Direct question answering often fails on reasoning tasks. By prompting the model with "Think step by step before outputting your final answer" (Zero-Shot CoT) or providing 2-3 input/reasoning/output examples (Few-Shot), the model allocates more forward-pass compute tokens to reasoning, dramatically reducing arithmetic and logical errors.',
        practicalImpact: 'Increases accuracy on mathematical and architectural reasoning tasks by up to 40%.'
      },
      {
        title: 'LLM-as-a-Judge Automated Evaluation',
        description: 'Human grading does not scale. Modern engineering teams use frontier models (GPT-4o, Claude 3.5 Sonnet) with strict grading rubrics to evaluate candidate outputs against criteria: correctness, tone, conciseness, hallucination detection, and format compliance.',
        practicalImpact: 'Enables automated regression testing in CI: pull requests that lower answer quality scores below 90% are automatically blocked.'
      },
      {
        title: 'Ragas Metrics (Retrieval Augmented Generation Assessment)',
        description: 'Standardizes RAG evaluation into four orthogonal metrics: Faithfulness (is the answer grounded in the retrieved context?), Answer Relevance (does the answer directly address the user query?), Context Precision (are the relevant chunks ranked at the top?), and Context Recall (did retrieval capture all necessary facts?).',
        practicalImpact: 'Pinpoints exactly whether an inaccurate response was caused by poor retrieval or poor generation.'
      }
    ],
    interactiveDemo: {
      type: 'prompt-eval',
      title: 'Automated Evaluation Matrix & Prompt Scoring Sandbox',
      description: 'Test prompts against a structured evaluation rubric and inspect pass/fail criteria.'
    },
    codeImplementation: {
      title: 'Automated LLM-as-a-Judge Evaluation Script in TypeScript',
      language: 'typescript',
      code: `// Automated CI Evaluation Pipeline using LLM-as-a-Judge
interface EvalResult {
  score: number; // 1 to 5
  reasoning: string;
  passed: boolean;
}

export async function evaluateAnswerQuality(
  userQuestion: string,
  referenceContext: string,
  generatedAnswer: string
): Promise<EvalResult> {
  const judgePrompt = \`
You are an impartial evaluator assessing the accuracy of an AI assistant's response.
Evaluate the candidate answer against the reference context.

[QUESTION]:
\${userQuestion}

[REFERENCE CONTEXT]:
\${referenceContext}

[CANDIDATE ANSWER]:
\${generatedAnswer}

CRITERIA:
1. Is the candidate answer 100% faithful to the reference context without hallucination?
2. Does it directly address the user question?

Respond in JSON format with two fields:
{
  "score": <integer from 1 to 5, where 5 is flawless>,
  "reasoning": "<concise justification>"
}
\`;

  // In production, execute against OpenAI / Anthropic API:
  // const res = await openai.chat.completions.create({...})
  
  // Simulated evaluation response:
  const simulatedJudgeResponse = {
    score: 5,
    reasoning: "The candidate answer accurately describes the process using only facts grounded in the context."
  };

  return {
    score: simulatedJudgeResponse.score,
    reasoning: simulatedJudgeResponse.reasoning,
    passed: simulatedJudgeResponse.score >= 4
  };
}`,
      explanation: 'Demonstrates automated evaluation pipelines that run in CI/CD to prevent regressions in AI output accuracy.'
    },
    productionBestPractices: [
      'Never rely on subjective "vibes" when modifying prompts; always run evaluations across a golden benchmark dataset of at least 100 test cases.',
      'Log full request and response traces using LangSmith, Phoenix, or OpenTelemetry to inspect prompt drift over time.',
      'Implement strict semantic caching for identical user prompts to save up to 40% on API costs and deliver instant responses.'
    ],
    benchmarksAndPitfalls: [
      {
        benchmark: 'Judge Model Self-Preference Bias',
        observation: 'When evaluating models, LLMs tend to favor responses generated by themselves or models from the same vendor.',
        workaround: 'Use an independent model as judge or cross-evaluate using multiple frontier judges and average their scores.'
      }
    ]
  }
];
