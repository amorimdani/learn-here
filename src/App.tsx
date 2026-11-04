import { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { SearchModal } from './components/SearchModal';
import { CareerProgressionView } from './components/CareerProgressionView';
import { TechCatalogView } from './components/TechCatalogView';
import { AiHubView } from './components/AiHubView';
import { TrendingView } from './components/TrendingView';
import { LearningTracksView } from './components/LearningTracksView';
import { InterviewHubView } from './components/InterviewHubView';
import { BookmarksView, BookmarkItem } from './components/BookmarksView';
import { Zap, Shield, ArrowUpRight } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('career');
  const [searchOpen, setSearchOpen] = useState(false);

  // Sub-item direct navigation states
  const [targetLevelId, setTargetLevelId] = useState<string | undefined>();
  const [targetTechId, setTargetTechId] = useState<string | undefined>();
  const [targetAiId, setTargetAiId] = useState<string | undefined>();
  const [targetTrendId, setTargetTrendId] = useState<string | undefined>();
  const [targetTrackId, setTargetTrackId] = useState<string | undefined>();
  const [targetQuestionId, setTargetQuestionId] = useState<string | undefined>();

  // Bookmarks with localStorage
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const stored = localStorage.getItem('learn_here_bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('learn_here_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // storage error
    }
  }, [bookmarks]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && !searchOpen) {
        // Prevent default only if not inside an input/textarea
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const toggleBookmark = (item: { id: string; title: string; category: string }) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        const newItem: BookmarkItem = {
          ...item,
          savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        return [newItem, ...prev];
      }
    });
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  const handleSelectSearchResult = (tab: ActiveTab, itemId: string) => {
    setActiveTab(tab);
    if (tab === 'career') setTargetLevelId(itemId);
    if (tab === 'tech') setTargetTechId(itemId);
    if (tab === 'ai') setTargetAiId(itemId);
    if (tab === 'trending') setTargetTrendId(itemId);
    if (tab === 'learning') setTargetTrackId(itemId);
    if (tab === 'interview') setTargetQuestionId(itemId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600/40 selection:text-indigo-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSearch={() => setSearchOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'career' && (
          <CareerProgressionView
            selectedLevelId={targetLevelId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'tech' && (
          <TechCatalogView
            selectedTechId={targetTechId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'ai' && (
          <AiHubView
            selectedTopicId={targetAiId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'trending' && (
          <TrendingView
            selectedTrendId={targetTrendId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'learning' && (
          <LearningTracksView
            selectedTrackId={targetTrackId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'interview' && (
          <InterviewHubView
            selectedQuestionId={targetQuestionId}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
        {activeTab === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            onRemoveBookmark={removeBookmark}
            onNavigateToItem={handleSelectSearchResult}
            onClearAll={clearAllBookmarks}
          />
        )}
      </main>

      {/* Enterprise Platform Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 text-xs text-slate-400 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-extrabold text-white text-sm tracking-tight">learn-here</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  Global Knowledge Base
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                Zero summaries. Zero placeholders. Production-grade software engineering mastery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <button
                onClick={() => {
                  setActiveTab('career');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                Career Levels
              </button>
              <button
                onClick={() => {
                  setActiveTab('tech');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                Tech Catalog
              </button>
              <button
                onClick={() => {
                  setActiveTab('ai');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                AI Everything
              </button>
              <button
                onClick={() => {
                  setActiveTab('trending');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                What's Trending
              </button>
              <button
                onClick={() => {
                  setActiveTab('learning');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                Learning Tracks
              </button>
              <button
                onClick={() => {
                  setActiveTab('interview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition"
              >
                Interview Prep
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
            <div>
              100% in English • Built for elite developers & systems engineers worldwide.
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                Production Verified Content
              </span>
              <span>•</span>
              <a
                href="https://github.com/amorimdani/learn-here"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 flex items-center gap-1"
              >
                GitHub Repo <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
