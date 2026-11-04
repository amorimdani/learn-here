import React, { useState } from 'react';
import {
  TrendingUp,
  Zap,
  Award,
  GitCompare
} from 'lucide-react';
import { trendingTopicsData } from '../data/trending';
import { CodeBlock } from './CodeBlock';

interface TrendingViewProps {
  selectedTrendId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const TrendingView: React.FC<TrendingViewProps> = ({
  selectedTrendId,
  onBookmark,
  isBookmarked
}) => {
  const [activeTrendId, setActiveTrendId] = useState(selectedTrendId || trendingTopicsData[0].id);

  const activeTrend = trendingTopicsData.find((t) => t.id === activeTrendId) || trendingTopicsData[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-900/40 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          Industry Radar & Architectural Shifts
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Developers Should Know: 2026 Tech Trends
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Critical architectural paradigm shifts shaping the global software industry:
          Local-first CRDTs, Rustification of tooling, WebAssembly WASI micro-sandboxes, and Durable Execution workflows.
        </p>

        {/* Quick Shift Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          {trendingTopicsData.map((t) => {
            const isSelected = activeTrend.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrendId(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{t.title.split(',')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Trend Selector + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Trends Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider px-1">
            Active Ecosystem Shifts ({trendingTopicsData.length})
          </div>
          <div className="space-y-2.5">
            {trendingTopicsData.map((trend) => {
              const isSelected = activeTrend.id === trend.id;
              return (
                <div
                  key={trend.id}
                  onClick={() => setActiveTrendId(trend.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition text-left ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        trend.status === 'Bleeding Edge'
                          ? 'bg-rose-950 text-rose-300'
                          : trend.status === 'Accelerating'
                          ? 'bg-amber-950 text-amber-300'
                          : 'bg-emerald-950 text-emerald-300'
                      }`}
                    >
                      {trend.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{trend.category}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mb-1">{trend.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{trend.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Trend Deep Dive */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  {activeTrend.category} • {activeTrend.status}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {activeTrend.title}
                </h2>
              </div>
              <button
                onClick={() =>
                  onBookmark({
                    id: activeTrend.id,
                    title: activeTrend.title,
                    category: "What's Trending"
                  })
                }
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-2 ${
                  isBookmarked(activeTrend.id)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                {isBookmarked(activeTrend.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{activeTrend.summary}</p>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                Organizations Driving this Shift:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeTrend.whoIsLeadingIt.map((leader, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-850 border border-slate-700 text-xs font-mono text-amber-300"
                  >
                    {leader}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">Why It Matters to Engineers:</span>
            <p className="text-sm text-slate-200 leading-relaxed">{activeTrend.whyItMatters}</p>
          </div>

          {/* Legacy vs Modern Architectural Comparison */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <GitCompare className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Architectural Paradigm Comparison</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-rose-400 uppercase font-bold block">
                  Legacy / Status Quo Pattern
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeTrend.architecturalComparison.legacyWay}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold block">
                  Modern Emerging Paradigm
                </span>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {activeTrend.architecturalComparison.modernWay}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
              <span className="font-bold text-white">Efficiency Differential: </span>
              {activeTrend.architecturalComparison.efficiencyGain}
            </div>
          </div>

          {/* Deep Dive Analysis */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Deep-Dive Technical Analysis</h3>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-sans">
              {activeTrend.deepDiveAnalysis}
            </div>
          </div>

          {/* Practical Code or Config */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Practical Code Implementation / Benchmark</h3>
            <CodeBlock
              code={activeTrend.practicalCodeOrConfig.code}
              language={activeTrend.practicalCodeOrConfig.language}
              title={activeTrend.practicalCodeOrConfig.title}
              explanation={activeTrend.practicalCodeOrConfig.explanation}
            />
          </div>

          {/* Key Strategic Takeaways */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">Key Strategic Takeaways for Developers</h3>
            <ul className="space-y-2">
              {activeTrend.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
