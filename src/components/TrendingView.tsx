import React, { useState } from 'react';
import {
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
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Ecosystem & Architecture Radar
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Architectural & Industry Shifts (2026)
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {trendingTopicsData.length} core paradigm shifts
          </p>
        </div>

        {/* Quick Shift Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {trendingTopicsData.map((t) => {
            const isSelected = activeTrend.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrendId(t.id)}
                className={`px-2.5 py-1 rounded text-xs transition font-mono whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {t.title.split(',')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Trend Selector + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Trends Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider px-1">
            Active Shifts ({trendingTopicsData.length})
          </div>
          <div className="space-y-1.5">
            {trendingTopicsData.map((trend) => {
              const isSelected = activeTrend.id === trend.id;
              return (
                <div
                  key={trend.id}
                  onClick={() => setActiveTrendId(trend.id)}
                  className={`p-3 rounded border cursor-pointer transition text-left ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {trend.status}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{trend.category}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-zinc-200 mb-0.5">{trend.title}</h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-1">{trend.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Trend Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {activeTrend.category} • Status: {activeTrend.status}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5 font-serif-classic">
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
                className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
                  isBookmarked(activeTrend.id)
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Award className="w-3 h-3" />
                {isBookmarked(activeTrend.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">{activeTrend.summary}</p>

            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block mb-1">
                Engineering Pioneers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTrend.whoIsLeadingIt.map((leader, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    {leader}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-1.5 text-xs">
            <span className="font-mono text-zinc-500 uppercase text-[10px] font-semibold">Significance:</span>
            <p className="text-zinc-200 leading-relaxed font-sans">{activeTrend.whyItMatters}</p>
          </div>

          {/* Legacy vs Modern Architectural Comparison */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <GitCompare className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Architectural Paradigm Shift
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1 text-xs">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold block">
                  Legacy Pattern
                </span>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {activeTrend.architecturalComparison.legacyWay}
                </p>
              </div>
              <div className="p-3.5 rounded bg-zinc-900 border border-zinc-700/80 space-y-1 text-xs">
                <span className="text-[10px] font-mono text-zinc-300 uppercase font-semibold block">
                  Modern Emerging Pattern
                </span>
                <p className="text-zinc-200 leading-relaxed font-sans">
                  {activeTrend.architecturalComparison.modernWay}
                </p>
              </div>
            </div>
            <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 text-xs font-mono text-zinc-300">
              <span className="text-zinc-400 font-semibold">Differential: </span>
              {activeTrend.architecturalComparison.efficiencyGain}
            </div>
          </div>

          {/* Deep Dive Analysis */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
              Technical Deep-Dive
            </h3>
            <div className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
              {activeTrend.deepDiveAnalysis}
            </div>
          </div>

          {/* Practical Code or Config */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
              Reference Implementation
            </h3>
            <CodeBlock
              code={activeTrend.practicalCodeOrConfig.code}
              language={activeTrend.practicalCodeOrConfig.language}
              title={activeTrend.practicalCodeOrConfig.title}
              explanation={activeTrend.practicalCodeOrConfig.explanation}
            />
          </div>

          {/* Key Strategic Takeaways */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 text-xs">
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
              Strategic Takeaways
            </h3>
            <ul className="space-y-1.5 text-zinc-300 font-sans">
              {activeTrend.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-500 mt-1.5 shrink-0"></span>
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
