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
  Search
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
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-900/40 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          End-to-End Deep Dive Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Modern Technology & Language Deep Dives
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Exhaustive, production-grade technical analyses covering language engines, compiler pipelines,
          distributed logs, container runtimes, and storage engines. No summaries. No placeholders.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  filterCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter technologies..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tech Selector Column */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider px-1">
            Available Deep Dives ({filteredTech.length})
          </div>
          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredTech.map((tech) => {
              const isSelected = activeTech.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveTechId(tech.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition text-left ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{tech.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{tech.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Article Deep Dive Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Article Header Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {activeTech.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {activeTech.name}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{activeTech.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    onBookmark({
                      id: activeTech.id,
                      title: activeTech.name,
                      category: activeTech.category
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-2 ${
                    isBookmarked(activeTech.id)
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  {isBookmarked(activeTech.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <div className="inline-block text-xs font-mono text-slate-400 bg-slate-850 px-3 py-1 rounded-lg border border-slate-800">
              Market Adoption: <span className="text-cyan-300 font-bold">{activeTech.popularityRank}</span>
            </div>
          </div>

          {/* Section 1: History, Origin & Evolution */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <History className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Historical Context & Ecosystem Evolution</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                <span className="text-slate-500 font-mono uppercase block">Origin Year & Creator:</span>
                <span className="text-slate-200 font-bold text-sm">
                  {activeTech.historyAndEvolution.originYear} • {activeTech.historyAndEvolution.creator}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                <span className="text-slate-500 font-mono uppercase block">Modern State:</span>
                <span className="text-cyan-300 font-medium">{activeTech.historyAndEvolution.modernStatus}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTech.historyAndEvolution.background}
            </p>

            {/* Milestones Timeline */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Key Technical Milestones:
              </span>
              <div className="divide-y divide-slate-850 border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40">
                {activeTech.historyAndEvolution.keyMilestones.map((ms, idx) => (
                  <div key={idx} className="p-3 flex items-start gap-3 text-xs">
                    <span className="font-mono font-bold text-cyan-400 w-14 shrink-0">{ms.year}</span>
                    <span className="text-slate-300">{ms.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Real-World Industry Use Cases */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Real-World Industry Case Studies</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTech.realWorldUseCases.map((uc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{uc.exampleCompany}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {uc.industry}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-semibold text-slate-400">Problem: </span>
                    {uc.problemSolved}
                  </p>
                  <p className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                    <span className="font-semibold text-slate-400">Architectural Fit: </span>
                    {uc.architectureFit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Deep Technical Internals */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Deep Technical Internals & Runtime Mechanics</h3>
            </div>
            <div className="space-y-4">
              {activeTech.deepTechnicalConcepts.map((concept, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-slate-100">{concept.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{concept.explanation}</p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
                    <span className="text-indigo-400 font-semibold block mb-1">Runtime & Memory Internals:</span>
                    {concept.internals}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Concrete Functional Code Examples */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Terminal className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Concrete Functional Code Examples</h3>
            </div>
            <p className="text-xs text-slate-400">
              End-to-end, runnable snippets illustrating production error handling, defensive parsing, and concurrency.
            </p>
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
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Step-by-Step Mastery Roadmap & Commands</h3>
            </div>
            <div className="space-y-4">
              {activeTech.gettingStartedRoadmap.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/40">
                      {step.step}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100">{step.phase}</h4>
                  </div>
                  <ul className="space-y-1.5 pl-9">
                    {step.actionableTasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-300 list-disc">
                        {task}
                      </li>
                    ))}
                  </ul>
                  {step.keyCommands.length > 0 && (
                    <div className="pl-9 pt-2">
                      <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800 flex flex-wrap gap-2">
                        {step.keyCommands.map((cmd, cIdx) => (
                          <span key={cIdx} className="bg-slate-800 px-2 py-0.5 rounded text-slate-200">
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
          <div className="p-6 rounded-2xl bg-slate-900 border border-rose-950/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertOctagon className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Common Production Pitfalls & Hard Solutions</h3>
            </div>
            <div className="space-y-3">
              {activeTech.commonPitfalls.map((pitfall, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <div className="text-xs font-bold text-rose-300">
                    Mistake: <span className="text-slate-200 font-normal">{pitfall.mistake}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-rose-400 font-semibold">Why it hurts: </span>
                    {pitfall.whyItHurts}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 text-xs text-emerald-300 border border-slate-800">
                    <span className="font-bold text-emerald-400">Production Solution: </span>
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
