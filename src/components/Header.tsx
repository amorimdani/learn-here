import React from 'react';
import {
  Compass,
  Cpu,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Bookmark,
  Search,
  Github
} from 'lucide-react';

export type ActiveTab = 'career' | 'tech' | 'ai' | 'trending' | 'learning' | 'interview' | 'bookmarks';

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
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'career', label: 'Career Progression', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'tech', label: 'Tech Catalog', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'Artificial Intelligence', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'trending', label: "What's Trending", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'learning', label: 'Learning Tracks', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'interview', label: 'Interview Hub', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="w-3.5 h-3.5" />, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Minimalist Classic Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('career')}>
            <div className="w-7 h-7 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-100 font-mono font-bold text-xs shadow-sm">
              LH
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-base tracking-tight text-zinc-100">
                learn-here
              </span>
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                engineering knowledge hub
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 transition text-xs font-mono"
              title="Search knowledge base"
            >
              <Search className="w-3 h-3 text-zinc-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="font-mono text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.2 rounded border border-zinc-700">
                /
              </kbd>
            </button>

            <a
              href="https://github.com/amorimdani/learn-here"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 transition"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Minimalist Navigation Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1.5 scrollbar-none border-t border-zinc-900/80 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-zinc-800/90 text-zinc-100 font-medium border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
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
