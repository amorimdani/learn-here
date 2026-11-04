import React, { useState } from 'react';
import {
  BrainCircuit,
  Layers,
  Database,
  CheckCircle2,
  Terminal,
  Play,
  Award
} from 'lucide-react';
import { aiCatalogData } from '../data/aiCatalog';
import { CodeBlock } from './CodeBlock';

interface AiHubViewProps {
  selectedTopicId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const AiHubView: React.FC<AiHubViewProps> = ({
  selectedTopicId,
  onBookmark,
  isBookmarked
}) => {
  const [activeTopicId, setActiveTopicId] = useState(selectedTopicId || aiCatalogData[0].id);

  // Interactive RAG Simulator State
  const [bm25Weight, setBm25Weight] = useState(0.5);
  const [vectorWeight, setVectorWeight] = useState(0.5);
  const [queryInput] = useState('How does epoll handle non-blocking sockets?');

  // Interactive Agent Loop Simulator State
  const [agentStep, setAgentStep] = useState(0);

  const activeTopic = aiCatalogData.find((t) => t.id === activeTopicId) || aiCatalogData[0];

  const agentSteps = [
    {
      type: 'Thought',
      content: 'User wants to identify high-memory pods in production Kubernetes. I will query Prometheus via the Prometheus MCP tool.'
    },
    {
      type: 'Action',
      content: 'Call tool "prometheus_query" with params: { query: "sum(container_memory_working_set_bytes) by (pod) > 1073741824" }'
    },
    {
      type: 'Observation',
      content: 'Result: [ { pod: "order-worker-7b9f", bytes: 1428582912 }, { pod: "billing-api-89d2", bytes: 1102934120 } ]'
    },
    {
      type: 'Thought',
      content: 'Two pods exceed 1GB. order-worker-7b9f is consuming 1.33GB and approaching its memory ceiling. I will formulate actionable remediation advice.'
    },
    {
      type: 'Final Answer',
      content: 'Critical memory alert: order-worker-7b9f is consuming 1.33GB RAM. Recommend increasing limit or inspecting recent goroutine profile.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Artificial Intelligence Systems
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Foundations, Agents & Applied Systems
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {aiCatalogData.length} core deep dives
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {aiCatalogData.map((topic) => {
            const isSelected = activeTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`px-2.5 py-1 rounded text-xs transition font-mono whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {topic.title.split(':')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider px-1">
            Index ({aiCatalogData.length})
          </div>
          <div className="space-y-1.5">
            {aiCatalogData.map((topic) => {
              const isSelected = activeTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-3 rounded border cursor-pointer transition text-left ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {topic.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{topic.readTime}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-zinc-200 mb-0.5">{topic.title}</h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-1">{topic.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* AI Engineering Architecture Cheat Card */}
          <div className="p-3.5 rounded border border-zinc-800 bg-[#0e0e11] space-y-1.5 text-xs font-mono">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase block">
              Production AI Stack (2026)
            </span>
            <ul className="text-zinc-400 space-y-1 text-[11px]">
              <li>• <span className="text-zinc-200 font-semibold">Serving:</span> vLLM, TensorRT-LLM, Ollama</li>
              <li>• <span className="text-zinc-200 font-semibold">Agents:</span> LangGraph, MCP Servers</li>
              <li>• <span className="text-zinc-200 font-semibold">Vector DBs:</span> Qdrant, Milvus, pgvector</li>
              <li>• <span className="text-zinc-200 font-semibold">Evaluation:</span> Ragas, LLM-as-a-Judge</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Active Topic Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {activeTopic.category} • {activeTopic.difficulty}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5 font-serif-classic">
                  {activeTopic.title}
                </h2>
                <p className="text-zinc-400 text-xs mt-0.5">{activeTopic.tagline}</p>
              </div>
              <button
                onClick={() =>
                  onBookmark({
                    id: activeTopic.id,
                    title: activeTopic.title,
                    category: 'Artificial Intelligence'
                  })
                }
                className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
                  isBookmarked(activeTopic.id)
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Award className="w-3 h-3" />
                {isBookmarked(activeTopic.id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">{activeTopic.summary}</p>
          </div>

          {/* Transformer Self-Attention Schematic Illustration */}
          {activeTopic.id === 'ai-fundamentals' && (
            <div className="p-5 rounded border border-zinc-800 bg-[#0c0c0e] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs font-mono uppercase tracking-wider text-zinc-200">
                  Transformer Scaled Dot-Product Attention Flow
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Vaswani et al.</span>
              </div>
              <div className="overflow-hidden rounded border border-zinc-800/80 bg-[#08080a] p-2">
                <svg viewBox="0 0 700 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <rect width="700" height="210" rx="10" fill="#09090b" stroke="#27272a"/>
                  <text x="24" y="28" fill="#71717a" fontFamily="monospace" fontSize="10" fontWeight="bold">MATHEMATICAL ATTENTION PIPELINE: Q @ K.T / SQRT(D_K) * V</text>
                  
                  {/* Query Input */}
                  <rect x="40" y="50" width="130" height="40" rx="6" fill="#18181b" stroke="#3f3f46"/>
                  <text x="52" y="74" fill="#f4f4f5" fontFamily="monospace" fontSize="11">Queries (Q)</text>

                  {/* Key Input */}
                  <rect x="40" y="100" width="130" height="40" rx="6" fill="#18181b" stroke="#3f3f46"/>
                  <text x="52" y="124" fill="#f4f4f5" fontFamily="monospace" fontSize="11">Keys (K)</text>

                  {/* Value Input */}
                  <rect x="40" y="150" width="130" height="40" rx="6" fill="#18181b" stroke="#3f3f46"/>
                  <text x="52" y="174" fill="#f4f4f5" fontFamily="monospace" fontSize="11">Values (V)</text>

                  {/* Dot Product & Scale */}
                  <path d="M170 70 L230 95" stroke="#71717a" strokeWidth="1.5"/>
                  <path d="M170 120 L230 95" stroke="#71717a" strokeWidth="1.5"/>
                  
                  <rect x="230" y="75" width="140" height="45" rx="6" fill="#27272a" stroke="#52525b"/>
                  <text x="242" y="96" fill="#e4e4e7" fontFamily="monospace" fontSize="10" fontWeight="bold">MatMul &amp; Scale</text>
                  <text x="242" y="110" fill="#a1a1aa" fontFamily="monospace" fontSize="9">/ sqrt(d_k)</text>

                  {/* Softmax */}
                  <path d="M370 97 L410 97" stroke="#71717a" strokeWidth="1.5"/>
                  <rect x="410" y="75" width="110" height="45" rx="6" fill="#18181b" stroke="#3f3f46"/>
                  <text x="422" y="102" fill="#38bdf8" fontFamily="monospace" fontSize="11" fontWeight="bold">Softmax</text>

                  {/* Matmul with V */}
                  <path d="M520 97 L560 125" stroke="#71717a" strokeWidth="1.5"/>
                  <path d="M170 170 L560 145" stroke="#71717a" strokeWidth="1.5"/>

                  <rect x="560" y="110" width="110" height="50" rx="6" fill="#27272a" stroke="#52525b"/>
                  <text x="572" y="132" fill="#34d399" fontFamily="monospace" fontSize="10" fontWeight="bold">Attention(Q,K,V)</text>
                  <text x="572" y="148" fill="#a1a1aa" fontFamily="monospace" fontSize="9">Context Vector</text>
                </svg>
              </div>
              <p className="text-[11px] font-mono text-zinc-500 italic">
                Fig 2.0 — High-dimensional dot-product cross-attention matrix transformation.
              </p>
            </div>
          )}

          {/* Interactive Simulation Widgets */}
          {activeTopic.id === 'rag-vector-databases' && (
            <div className="p-5 rounded border border-zinc-800 bg-[#0c0c0e] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-zinc-400" />
                  <h3 className="font-semibold text-xs font-mono uppercase text-zinc-200">
                    Interactive Hybrid RAG Simulator
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded border border-zinc-700">
                  RRF Algorithm
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Adjust sparse BM25 (keyword) and dense vector (semantic) weights to see how Reciprocal Rank Fusion ranks documents.
              </p>

              <div className="space-y-3 bg-zinc-900/60 p-3.5 rounded border border-zinc-850">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Vector (Dense Semantic):</span>
                      <span className="font-bold text-zinc-100">{vectorWeight.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={vectorWeight}
                      onChange={(e) => setVectorWeight(parseFloat(e.target.value))}
                      className="w-full accent-zinc-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>BM25 (Sparse Keyword):</span>
                      <span className="font-bold text-zinc-100">{bm25Weight.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={bm25Weight}
                      onChange={(e) => setBm25Weight(parseFloat(e.target.value))}
                      className="w-full accent-zinc-200 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-500">
                  Query: <span className="text-zinc-300">"{queryInput}"</span>
                </div>
              </div>

              {/* Fused Results List */}
              <div className="space-y-1.5">
                {[
                  { title: 'Doc 1: Linux epoll(7) Kernel I/O Multiplexing Deep Dive', vectorScore: 0.94, bm25Score: 0.98 },
                  { title: 'Doc 2: Non-Blocking Socket Operations and EPOLLIN Event Loops', vectorScore: 0.88, bm25Score: 0.72 },
                  { title: 'Doc 3: Comparison of select vs poll vs epoll Latency', vectorScore: 0.81, bm25Score: 0.85 }
                ].map((doc, idx) => {
                  const combinedScore = (doc.vectorScore * vectorWeight + doc.bm25Score * bm25Weight).toFixed(3);
                  return (
                    <div key={idx} className="p-2.5 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 font-semibold">#{idx + 1}</span>
                        <span className="text-zinc-300 font-sans">{doc.title}</span>
                      </div>
                      <span className="text-zinc-200 font-semibold">{combinedScore}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTopic.id === 'ai-agents-tool-calling' && (
            <div className="p-5 rounded border border-zinc-800 bg-[#0c0c0e] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-zinc-400" />
                  <h3 className="font-semibold text-xs font-mono uppercase text-zinc-200">
                    ReAct Agent Loop Step Execution
                  </h3>
                </div>
                <button
                  onClick={() => setAgentStep((prev) => (prev + 1) % agentSteps.length)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1 transition"
                >
                  <Play className="w-3 h-3" />
                  <span>Next Step ({agentStep + 1}/{agentSteps.length})</span>
                </button>
              </div>

              <div className="space-y-2">
                {agentSteps.slice(0, agentStep + 1).map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded border border-zinc-800 bg-zinc-900 text-xs leading-relaxed font-mono"
                  >
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded mr-2 bg-zinc-800 text-zinc-300 font-semibold">
                      {step.type}
                    </span>
                    <span className="text-zinc-200 font-sans">{step.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Technical Concepts & Math */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Layers className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Technical Fundamentals & Mathematics
              </h3>
            </div>
            <div className="space-y-3">
              {activeTopic.coreConcepts.map((concept, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                  <h4 className="font-semibold text-xs text-zinc-200">{concept.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{concept.description}</p>
                  {concept.mathOrDiagram && (
                    <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 font-mono text-xs text-zinc-300">
                      {concept.mathOrDiagram}
                    </div>
                  )}
                  <div className="text-xs text-zinc-400 font-sans">
                    <span className="font-mono text-zinc-500 uppercase text-[10px]">Impact: </span>
                    {concept.practicalImpact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Functional Code Implementation */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Production Implementation
              </h3>
            </div>
            <CodeBlock
              code={activeTopic.codeImplementation.code}
              language={activeTopic.codeImplementation.language}
              title={activeTopic.codeImplementation.title}
              explanation={activeTopic.codeImplementation.explanation}
            />
          </div>

          {/* Production Best Practices */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2.5">
            <div className="flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Production Guardrails
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
              {activeTopic.productionBestPractices.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-500 mt-1.5 shrink-0"></span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
