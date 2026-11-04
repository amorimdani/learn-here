import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Compass, Cpu, Sparkles, TrendingUp, GraduationCap, Briefcase } from 'lucide-react';
import { careerLevelsData } from '../data/careerLevels';
import { techCatalogData } from '../data/techCatalog';
import { aiCatalogData } from '../data/aiCatalog';
import { trendingTopicsData } from '../data/trending';
import { learningTracksData } from '../data/learningTracks';
import { interviewQuestionsData } from '../data/interviewHub';
import { ActiveTab } from './Header';

interface SearchResultItem {
  id: string;
  tab: ActiveTab;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: ActiveTab, itemId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Aggregate all items
  const allItems: SearchResultItem[] = [
    // Career Levels
    ...careerLevelsData.map((lvl) => ({
      id: lvl.id,
      tab: 'career' as ActiveTab,
      title: lvl.title,
      subtitle: `${lvl.badge} • ${lvl.experienceYears} • ${lvl.tagline}`,
      category: 'Career Progression',
      icon: <Compass className="w-4 h-4 text-emerald-400" />
    })),
    // Tech Catalog
    ...techCatalogData.map((tech) => ({
      id: tech.id,
      tab: 'tech' as ActiveTab,
      title: tech.name,
      subtitle: `${tech.category} • ${tech.tagline}`,
      category: 'Technology Catalog',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />
    })),
    // AI Hub
    ...aiCatalogData.map((ai) => ({
      id: ai.id,
      tab: 'ai' as ActiveTab,
      title: ai.title,
      subtitle: `${ai.category} • ${ai.difficulty} • ${ai.readTime}`,
      category: 'Artificial Intelligence',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />
    })),
    // Trending
    ...trendingTopicsData.map((trend) => ({
      id: trend.id,
      tab: 'trending' as ActiveTab,
      title: trend.title,
      subtitle: `${trend.category} • Status: ${trend.status}`,
      category: "What's Trending",
      icon: <TrendingUp className="w-4 h-4 text-amber-400" />
    })),
    // Learning Tracks
    ...learningTracksData.map((track) => ({
      id: track.id,
      tab: 'learning' as ActiveTab,
      title: track.title,
      subtitle: `${track.institutionInspiration} • ${track.duration}`,
      category: 'Learning Tracks',
      icon: <GraduationCap className="w-4 h-4 text-purple-400" />
    })),
    // Interview Prep
    ...interviewQuestionsData.map((q) => ({
      id: q.id,
      tab: 'interview' as ActiveTab,
      title: q.question,
      subtitle: `${q.category} • Difficulty: ${q.difficulty}`,
      category: 'Interview Prep',
      icon: <Briefcase className="w-4 h-4 text-rose-400" />
    }))
  ];

  const filtered = query.trim() === ''
    ? allItems.slice(0, 10)
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      const item = filtered[selectedIndex];
      onSelectResult(item.tab, item.id);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-850">
          <Search className="w-5 h-5 text-indigo-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search technologies, career levels, AI topics, system design..."
            className="w-full py-4 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            onClick={onClose}
            className="cursor-pointer ml-3 text-[11px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 hover:text-slate-200"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching knowledge topics found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.tab}-${item.id}`}
                  onClick={() => {
                    onSelectResult(item.tab, item.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-100">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <span><kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">↑↓</kbd> to navigate</span>
            <span><kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">↵</kbd> to select</span>
            <span><kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">esc</kbd> to close</span>
          </div>
          <span className="font-mono text-indigo-400/80">{filtered.length} resources available</span>
        </div>
      </div>
    </div>
  );
};
