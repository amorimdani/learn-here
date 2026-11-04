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
      icon: <Compass className="w-3.5 h-3.5 text-zinc-400" />
    })),
    // Tech Catalog (Mapped to languages or systems)
    ...techCatalogData.map((tech) => ({
      id: tech.id,
      tab: (tech.category === 'Language' || tech.id === 'golang' || tech.id === 'rust' || tech.id === 'cpp-systems'
        ? 'languages'
        : 'systems') as ActiveTab,
      title: tech.name,
      subtitle: `${tech.category} • ${tech.tagline}`,
      category: tech.category === 'Language' || tech.id === 'golang' || tech.id === 'rust' || tech.id === 'cpp-systems' ? 'Programming Language' : 'Systems & Infrastructure',
      icon: <Cpu className="w-3.5 h-3.5 text-zinc-400" />
    })),
    // AI Hub
    ...aiCatalogData.map((ai) => ({
      id: ai.id,
      tab: 'ai' as ActiveTab,
      title: ai.title,
      subtitle: `${ai.category} • ${ai.difficulty} • ${ai.readTime}`,
      category: 'Artificial Intelligence',
      icon: <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
    })),
    // Trending
    ...trendingTopicsData.map((trend) => ({
      id: trend.id,
      tab: 'trending' as ActiveTab,
      title: trend.title,
      subtitle: `${trend.category} • Status: ${trend.status}`,
      category: "What's Trending",
      icon: <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
    })),
    // Learning Tracks
    ...learningTracksData.map((track) => ({
      id: track.id,
      tab: 'learning' as ActiveTab,
      title: track.title,
      subtitle: `${track.institutionInspiration} • ${track.duration}`,
      category: 'Learning Tracks',
      icon: <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
    })),
    // Interview Prep
    ...interviewQuestionsData.map((q) => ({
      id: q.id,
      tab: 'interview' as ActiveTab,
      title: q.question,
      subtitle: `${q.category} • Difficulty: ${q.difficulty}`,
      category: 'Interview Prep',
      icon: <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-[#0e0e11] border border-zinc-800 rounded shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 border-b border-zinc-800 bg-[#09090b]">
          <Search className="w-4 h-4 text-zinc-500 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search all knowledge topics..."
            className="w-full py-3 bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-zinc-500 hover:text-zinc-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd
            onClick={onClose}
            className="cursor-pointer ml-2.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-1.5 divide-y divide-zinc-850">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-zinc-500 text-xs font-mono">
              No matching topics found for "{query}".
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
                  className={`flex items-center justify-between p-2.5 rounded cursor-pointer transition ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-400 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs text-zinc-200">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-850 text-zinc-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-700'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3.5 py-2 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-zinc-800 px-1 py-0.2 rounded text-zinc-400">↑↓</kbd> navigate</span>
            <span><kbd className="bg-zinc-800 px-1 py-0.2 rounded text-zinc-400">↵</kbd> select</span>
          </div>
          <span>{filtered.length} references</span>
        </div>
      </div>
    </div>
  );
};
