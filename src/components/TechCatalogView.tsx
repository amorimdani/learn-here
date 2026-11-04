import React, { useState } from 'react';
import {
  Cpu,
  History,
  Briefcase,
  Layers,
  Terminal,
  AlertOctagon,
  Award,
  CheckCircle,
  Search,
  Maximize2
} from 'lucide-react';
import { techCatalogData } from '../data/techCatalog';
import { CodeBlock } from './CodeBlock';

interface TechCatalogViewProps {
  selectedTechId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const TechCatalogView: React.FC<TechCatalogViewProps> = ({
  selectedTechId,
  onBookmark,
  isBookmarked
}) => {
  const [activeTechId, setActiveTechId] = useState(selectedTechId || techCatalogData[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullDiagram, setShowFullDiagram] = useState(false);

  const categories = ['All', 'Language', 'Systems & Distributed', 'Cloud & DevOps', 'Databases & APIs'];

  const filteredTech = techCatalogData.filter((tech) => {
    const matchesCategory = filterCategory === 'All' || tech.category === filterCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeTech = techCatalogData.find((t) => t.id === activeTechId) || techCatalogData[0];

  return (
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Catalog & Internals
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Technology & Systems Reference
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {techCatalogData.length} featured production platforms & runtimes
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition font-mono ${
                  filterCategory === cat
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference..."
              className="w-full pl-8 pr-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tech Selector Column */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider px-1">
            Index ({filteredTech.length})
          </div>
          <div className="space-y-1.5 max-h-[820px] overflow-y-auto pr-1">
            {filteredTech.map((tech) => {
              const isSelected = activeTech.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveTechId(tech.id)}
                  className={`p-3 rounded border cursor-pointer transition text-left ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-xs text-zinc-200">{tech.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 line-clamp-1">{tech.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Article Deep Dive Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Article Header Card */}
          <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  {activeTech.category}
                </span>
                <h2 className="text-2xl font-bold text-zinc-100 mt-0.5 font-serif-classic">
                  {activeTech.name}
                </h2>
                <p className="text-zinc-400 text-xs mt-1">{activeTech.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onBookmark({
                      id: activeTech.id,
                      title: activeTech.name,
                      category: activeTech.category
                    })
                  }
                  className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
                    isBookmarked(activeTech.id)
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Award className="w-3 h-3" />
                  {isBookmarked(activeTech.id) ? 'Saved' : 'Save Reference'}
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400">
              Industry Footprint: <span className="text-zinc-200 font-semibold">{activeTech.popularityRank}</span>
            </div>
          </div>

          {/* Dedicated Architecture Schematic / Image Diagram (If Available) */}
          {activeTech.architectureDiagram && (
            <div className="p-5 rounded border border-zinc-800 bg-[#0c0c0e] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-400" />
                  <h3 className="font-semibold text-xs font-mono uppercase tracking-wider text-zinc-200">
                    {activeTech.architectureDiagram.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFullDiagram(!showFullDiagram)}
                  className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>{showFullDiagram ? 'Compact' : 'Expand'}</span>
                </button>
              </div>

              {/* Rendered SVG Architecture Illustration */}
              <div
                className={`overflow-hidden rounded border border-zinc-800/80 bg-[#08080a] p-2 transition-all ${
                  showFullDiagram ? 'max-h-none' : 'max-h-[380px]'
                }`}
                dangerouslySetInnerHTML={{ __html: activeTech.architectureDiagram.svgContent }}
              />

              <p className="text-[11px] font-mono text-zinc-500 italic">
                Fig 1.0 — {activeTech.architectureDiagram.caption}
              </p>
            </div>
          )}

          {/* Section 1: History, Origin & Evolution */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <History className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Historical Context & Evolution
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 uppercase block text-[10px]">Origin:</span>
                <span className="text-zinc-200 font-medium">
                  {activeTech.historyAndEvolution.originYear} • {activeTech.historyAndEvolution.creator}
                </span>
              </div>
              <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 uppercase block text-[10px]">Modern State:</span>
                <span className="text-zinc-300">{activeTech.historyAndEvolution.modernStatus}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {activeTech.historyAndEvolution.background}
            </p>

            {/* Milestones Timeline */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold block">
                Key Technical Milestones:
              </span>
              <div className="divide-y divide-zinc-850 border border-zinc-800 rounded overflow-hidden bg-zinc-950/40">
                {activeTech.historyAndEvolution.keyMilestones.map((ms, idx) => (
                  <div key={idx} className="p-2.5 flex items-start gap-3 text-xs font-mono">
                    <span className="text-zinc-400 font-semibold w-12 shrink-0">{ms.year}</span>
                    <span className="text-zinc-300 font-sans">{ms.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Real-World Industry Use Cases */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Briefcase className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Industry Adoption & Case Studies
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeTech.realWorldUseCases.map((uc, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-100">{uc.exampleCompany}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                      {uc.industry}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    <span className="text-zinc-500 font-mono text-[11px]">Problem: </span>
                    {uc.problemSolved}
                  </p>
                  <p className="text-xs text-zinc-400 pt-1 border-t border-zinc-800/80">
                    <span className="text-zinc-500 font-mono text-[11px]">Fit: </span>
                    {uc.architectureFit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Deep Technical Internals */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Layers className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Technical Internals & Runtime Mechanics
              </h3>
            </div>
            <div className="space-y-3">
              {activeTech.deepTechnicalConcepts.map((concept, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                  <h4 className="font-semibold text-xs text-zinc-200">{concept.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{concept.explanation}</p>
                  <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 text-xs text-zinc-400 font-mono">
                    <span className="text-zinc-300 font-semibold block mb-0.5">Execution & Memory:</span>
                    {concept.internals}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Concrete Functional Code Examples */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Functional Implementation Examples
              </h3>
            </div>
            {activeTech.codeExamples.map((snippet, idx) => (
              <CodeBlock
                key={idx}
                code={snippet.code}
                language={snippet.language}
                title={snippet.title}
                explanation={snippet.explanation}
              />
            ))}
          </div>

          {/* Section 5: Step-by-Step Getting Started & Mastery Roadmap */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <CheckCircle className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Implementation Roadmap & Toolchain
              </h3>
            </div>
            <div className="space-y-3">
              {activeTech.gettingStartedRoadmap.map((step) => (
                <div key={step.step} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 font-mono font-semibold text-xs flex items-center justify-center border border-zinc-700">
                      {step.step}
                    </span>
                    <h4 className="font-semibold text-xs text-zinc-200">{step.phase}</h4>
                  </div>
                  <ul className="space-y-1 pl-7 text-xs text-zinc-300 font-sans">
                    {step.actionableTasks.map((task, tIdx) => (
                      <li key={tIdx} className="list-disc">
                        {task}
                      </li>
                    ))}
                  </ul>
                  {step.keyCommands.length > 0 && (
                    <div className="pl-7 pt-1">
                      <div className="p-2 rounded bg-[#09090b] font-mono text-xs text-zinc-300 border border-zinc-800 flex flex-wrap gap-2">
                        {step.keyCommands.map((cmd, cIdx) => (
                          <span key={cIdx} className="bg-zinc-850 px-1.5 py-0.5 rounded text-zinc-300">
                            $ {cmd}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Common Pitfalls & Solutions */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <AlertOctagon className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Production Pitfalls & Architectural Remediation
              </h3>
            </div>
            <div className="space-y-2.5">
              {activeTech.commonPitfalls.map((pitfall, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-xs">
                  <div className="font-semibold text-zinc-200">
                    <span className="text-zinc-500 font-mono uppercase text-[10px]">Mistake: </span>
                    {pitfall.mistake}
                  </div>
                  <div className="text-zinc-400">
                    <span className="text-zinc-500 font-mono uppercase text-[10px]">Why it hurts: </span>
                    {pitfall.whyItHurts}
                  </div>
                  <div className="p-2 rounded bg-[#09090b] text-zinc-300 border border-zinc-800/80 font-mono">
                    <span className="text-zinc-400 font-semibold">Solution: </span>
                    {pitfall.solution}
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
