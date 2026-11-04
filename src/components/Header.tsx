import React from 'react';
import {
  Code2,
  Server,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Bookmark,
  Search,
  Github,
  Compass
} from 'lucide-react';

export type ActiveTab =
  | 'languages'
  | 'systems'
  | 'ai'
  | 'career'
  | 'interview'
  | 'learning'
  | 'trending'
  | 'bookmarks';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearch: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  bookmarkCount
}) => {
  const primaryNav: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'languages', label: '1. Programming Languages', icon: <Code2 className="w-3.5 h-3.5 text-zinc-300" />, badge: 'Curriculums' },
    { id: 'systems', label: '2. Systems & Cloud', icon: <Server className="w-3.5 h-3.5 text-zinc-300" /> },
    { id: 'ai', label: '3. Artificial Intelligence', icon: <Sparkles className="w-3.5 h-3.5 text-zinc-300" /> },
    { id: 'career', label: '4. Career Progression', icon: <Compass className="w-3.5 h-3.5 text-zinc-300" /> },
    { id: 'interview', label: '5. Interview Hub', icon: <Briefcase className="w-3.5 h-3.5 text-zinc-300" /> },
    { id: 'learning', label: 'University Tracks', icon: <GraduationCap className="w-3.5 h-3.5 text-zinc-400" /> },
    { id: 'trending', label: "What's Trending", icon: <TrendingUp className="w-3.5 h-3.5 text-zinc-400" /> },
    { id: 'bookmarks', label: 'Saved Queue', icon: <Bookmark className="w-3.5 h-3.5 text-zinc-400" />, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between h-13 py-2 border-b border-zinc-900/60">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('languages')}
          >
            <div className="w-6 h-6 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-100 font-mono font-bold text-[11px] shadow-sm">
              LH
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-sm tracking-tight text-zinc-100 font-serif-classic">
                learn-here
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:inline">
                Structured Software Engineering Hub
              </span>
            </div>
          </div>

          {/* Quick Search & Git */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 transition text-xs font-mono"
              title="Search knowledge base"
            >
              <Search className="w-3 h-3 text-zinc-400" />
              <span className="hidden sm:inline">Search Platform</span>
              <kbd className="font-mono text-[9px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded border border-zinc-700">
                /
              </kbd>
            </button>

            <a
              href="https://github.com/amorimdani/learn-here"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 transition"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Clear Categorized Hub Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs -mx-4 px-4 sm:mx-0 sm:px-0">
          {primaryNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs whitespace-nowrap transition-all font-mono ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-zinc-300 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
