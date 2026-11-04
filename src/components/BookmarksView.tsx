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
        return <Compass className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Language':
      case 'Systems & Distributed':
      case 'Cloud & DevOps':
      case 'Databases & APIs':
        return <Cpu className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Artificial Intelligence':
        return <Sparkles className="w-3.5 h-3.5 text-zinc-400" />;
      case "What's Trending":
        return <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Learning Track':
        return <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Interview Question':
        return <Briefcase className="w-3.5 h-3.5 text-zinc-400" />;
      default:
        return <Bookmark className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
            Personal Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
            Saved References ({bookmarks.length})
          </h1>
          <p className="text-zinc-400 text-xs mt-0.5">
            Personal index of saved systems architecture, language internals, and interview models.
          </p>
        </div>
        {bookmarks.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs font-mono transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3 h-3" />
            Clear Queue
          </button>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="p-12 text-center rounded border border-dashed border-zinc-800 bg-[#0e0e11] space-y-2.5">
          <div className="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 text-zinc-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold text-zinc-200 font-mono uppercase">Queue is empty</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">
            Click "Save" on any technical reference, career level, or interview question to pin it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bookmarks.map((item) => {
            const targetTab = getTabForCategory(item.category);
            return (
              <div
                key={item.id}
                className="p-4 rounded border border-zinc-850 bg-[#0e0e11] hover:border-zinc-700 transition flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => onNavigateToItem(targetTab, item.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    {getIconForCategory(item.category)}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-850 text-zinc-400">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-xs text-zinc-200 group-hover:text-zinc-100 transition mt-0.5 line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      Saved {item.savedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigateToItem(targetTab, item.id)}
                    className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
                    title="Open"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
