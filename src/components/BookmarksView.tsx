import React from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen, Compass, Cpu, Sparkles, TrendingUp, GraduationCap, Briefcase } from 'lucide-react';
import { ActiveTab } from './Header';

export interface BookmarkItem {
  id: string;
  title: string;
  category: string;
  savedAt: string;
}

interface BookmarksViewProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onNavigateToItem: (tab: ActiveTab, id: string) => void;
  onClearAll: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  onNavigateToItem,
  onClearAll
}) => {
  const getTabForCategory = (category: string): ActiveTab => {
    switch (category) {
      case 'Career Level':
        return 'career';
      case 'Language':
      case 'Systems & Distributed':
      case 'Cloud & DevOps':
      case 'Databases & APIs':
        return 'tech';
      case 'Artificial Intelligence':
        return 'ai';
      case "What's Trending":
        return 'trending';
      case 'Learning Track':
        return 'learning';
      case 'Interview Question':
        return 'interview';
      default:
        return 'career';
    }
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Career Level':
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'Language':
      case 'Systems & Distributed':
      case 'Cloud & DevOps':
      case 'Databases & APIs':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Artificial Intelligence':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case "What's Trending":
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
      case 'Learning Track':
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case 'Interview Question':
        return <Briefcase className="w-4 h-4 text-rose-400" />;
      default:
        return <Bookmark className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            Personal Knowledge Study List
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Saved Bookmarks & Study Queue ({bookmarks.length})
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Revisit your saved senior engineering topics, system design blueprints, and interview responses.
          </p>
        </div>
        {bookmarks.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-900/50 text-xs font-medium transition flex items-center gap-2 self-start sm:self-center"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Bookmarks
          </button>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Your study queue is currently empty</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            As you explore Career Levels, Deep Dive Technologies, AI Architectures, and Interview Prep,
            click the <span className="text-amber-400 font-semibold">"Save"</span> button to pin topics here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((item) => {
            const targetTab = getTabForCategory(item.category);
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-4 group"
              >
                <div
                  onClick={() => onNavigateToItem(targetTab, item.id)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1"
                >
                  <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-700/60 group-hover:border-indigo-500/50 transition">
                    {getIconForCategory(item.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition mt-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      Saved {item.savedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateToItem(targetTab, item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                    title="Open Topic"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
