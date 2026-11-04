import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  Cpu,
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
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/50 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          The Complete Artificial Intelligence Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything About Artificial Intelligence
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          From the linear algebra of Transformer self-attention to autonomous ReAct agent loops,
          hybrid RAG pipelines, quantization (AWQ/GGUF), Model Context Protocol (MCP), and automated CI/CD evals.
        </p>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          {aiCatalogData.map((topic) => {
            const isSelected = activeTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{topic.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider px-1">
            Core AI Modules ({aiCatalogData.length})
          </div>
          <div className="space-y-2.5">
            {aiCatalogData.map((topic) => {
              const isSelected = activeTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition text-left ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold">
                      {topic.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{topic.readTime}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mb-1">{topic.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{topic.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* AI Engineering Architecture Cheat Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase block">
              Core Tech Stack in 2026
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• <span className="font-semibold text-white">Serving:</span> vLLM, TensorRT-LLM, Ollama</li>
              <li>• <span className="font-semibold text-white">Agents:</span> LangGraph, AutoGen, CrewAI</li>
              <li>• <span className="font-semibold text-white">Protocols:</span> Model Context Protocol (MCP)</li>
              <li>• <span className="font-semibold text-white">Retrieval:</span> Qdrant, Milvus, pgvector</li>
              <li>• <span className="font-semibold text-white">Evals:</span> Ragas, LangSmith, TruLens</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Active Topic Deep Dive */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                  {activeTopic.category} • {activeTopic.difficulty}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {activeTopic.title}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{activeTopic.tagline}</p>
              </div>
              <button
                onClick={() =>
                  onBookmark({
                    id: activeTopic.id,
                    title: activeTopic.title,
                    category: 'Artificial Intelligence'
                  })
                }
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-2 ${
                  isBookmarked(activeTopic.id)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                {isBookmarked(activeTopic.id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{activeTopic.summary}</p>
          </div>

          {/* Interactive Simulation Widgets */}
          {activeTopic.id === 'rag-vector-databases' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-900/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-base">Interactive Hybrid RAG Simulator</h3>
                </div>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                  RRF Algorithm
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Adjust sparse BM25 (keyword) and dense vector (semantic) weights to see how Reciprocal Rank Fusion ranks documents.
              </p>

              <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Vector (Dense Semantic) Weight:</span>
                      <span className="font-mono font-bold text-indigo-400">{vectorWeight.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={vectorWeight}
                      onChange={(e) => setVectorWeight(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>BM25 (Sparse Keyword) Weight:</span>
                      <span className="font-mono font-bold text-cyan-400">{bm25Weight.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={bm25Weight}
                      onChange={(e) => setBm25Weight(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2 text-xs font-mono text-slate-400">
                  Simulation Target Query: <span className="text-indigo-300 font-bold">"{queryInput}"</span>
                </div>
              </div>

              {/* Fused Results List */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">Fused RRF Rankings:</span>
                <div className="space-y-2">
                  {[
                    { title: 'Doc 1: Linux epoll(7) Kernel I/O Multiplexing Deep Dive', vectorScore: 0.94, bm25Score: 0.98 },
                    { title: 'Doc 2: Non-Blocking Socket Operations and EPOLLIN Event Loops', vectorScore: 0.88, bm25Score: 0.72 },
                    { title: 'Doc 3: Comparison of select vs poll vs epoll Latency', vectorScore: 0.81, bm25Score: 0.85 }
                  ].map((doc, idx) => {
                    const combinedScore = (doc.vectorScore * vectorWeight + doc.bm25Score * bm25Weight).toFixed(3);
                    return (
                      <div key={idx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold">
                            #{idx + 1}
                          </span>
                          <span className="text-slate-200 font-medium">{doc.title}</span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">Score: {combinedScore}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTopic.id === 'ai-agents-tool-calling' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-900/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-base">Interactive ReAct Agent Loop Simulator</h3>
                </div>
                <button
                  onClick={() => setAgentStep((prev) => (prev + 1) % agentSteps.length)}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  Next Step ({agentStep + 1}/{agentSteps.length})
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Trace how the agent progresses through Thought, Action (Tool Call), Observation (Output), and Resolution.
              </p>

              <div className="space-y-2.5">
                {agentSteps.slice(0, agentStep + 1).map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                      step.type === 'Thought'
                        ? 'bg-slate-850 border-slate-700 text-slate-200'
                        : step.type === 'Action'
                        ? 'bg-amber-950/20 border-amber-800/40 text-amber-200 font-mono'
                        : step.type === 'Observation'
                        ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-200 font-mono'
                        : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200 font-semibold'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded mr-2 font-bold ${
                        step.type === 'Thought'
                          ? 'bg-slate-700 text-slate-300'
                          : step.type === 'Action'
                          ? 'bg-amber-900/80 text-amber-300'
                          : step.type === 'Observation'
                          ? 'bg-cyan-900/80 text-cyan-300'
                          : 'bg-emerald-800 text-emerald-200'
                      }`}
                    >
                      {step.type}
                    </span>
                    {step.content}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Technical Concepts & Math */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Core Technical Concepts & Architectures</h3>
            </div>
            <div className="space-y-4">
              {activeTopic.coreConcepts.map((concept, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-slate-100">{concept.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{concept.description}</p>
                  {concept.mathOrDiagram && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                      {concept.mathOrDiagram}
                    </div>
                  )}
                  <div className="text-xs text-slate-400 pt-1">
                    <span className="font-semibold text-indigo-400">Production Impact: </span>
                    {concept.practicalImpact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Functional Code Implementation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Terminal className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Reference Code Implementation</h3>
            </div>
            <CodeBlock
              code={activeTopic.codeImplementation.code}
              language={activeTopic.codeImplementation.language}
              title={activeTopic.codeImplementation.title}
              explanation={activeTopic.codeImplementation.explanation}
            />
          </div>

          {/* Production Best Practices */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Production Best Practices & Guidelines</h3>
            </div>
            <ul className="space-y-2.5">
              {activeTopic.productionBestPractices.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benchmarks & Real-World Pitfalls */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-rose-950/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <Cpu className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Critical Benchmarks & Architecture Pitfalls</h3>
            </div>
            <div className="space-y-3">
              {activeTopic.benchmarksAndPitfalls.map((bp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <span className="font-bold text-xs text-rose-300 block">{bp.benchmark}</span>
                  <p className="text-xs text-slate-300">{bp.observation}</p>
                  <div className="p-2.5 rounded-lg bg-slate-900 text-xs text-emerald-300 border border-slate-800">
                    <span className="font-bold text-emerald-400">Engineering Workaround: </span>
                    {bp.workaround}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
