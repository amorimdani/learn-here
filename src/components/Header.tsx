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
  Github,
  Zap
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
    { id: 'career', label: 'Career Progression', icon: <Compass className="w-4 h-4" /> },
    { id: 'tech', label: 'Tech Catalog', icon: <Cpu className="w-4 h-4" /> },
    { id: 'ai', label: 'AI Everything', icon: <Sparkles className="w-4 h-4" />, badge: 'Deep Dive' },
    { id: 'trending', label: "What's Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'learning', label: 'Learning Tracks', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'interview', label: 'Interview Hub', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="w-4 h-4" />, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('career')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  learn-here
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/40 font-semibold">
                  Hub v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Master Modern Software Engineering & Systems
              </p>
            </div>
          </div>

          {/* Quick Actions (Search & Repo) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition text-xs font-medium group"
              title="Search knowledge base"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="hidden md:inline">Search platform...</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700/60">
                /
              </kbd>
            </button>

            <a
              href="https://github.com/amorimdani/learn-here"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-900/60 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all relative ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400'
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
