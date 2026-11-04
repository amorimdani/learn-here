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
import { ArrowUpRight } from 'lucide-react';
import { techCatalogData } from './data/techCatalog';

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

      {/* Minimalist Classic Footer */}
      <footer className="w-full border-t border-zinc-800/80 bg-[#070709] text-xs text-zinc-500 py-8 mt-16 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-850">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-200 font-mono text-[10px] font-bold">
                LH
              </div>
              <span className="font-semibold text-zinc-200 text-xs">learn-here</span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] text-zinc-400 font-sans">
                Minimalist Engineering Knowledge Hub
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <button onClick={() => { setActiveTab('career'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                Career
              </button>
              <button onClick={() => { setActiveTab('tech'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                Catalog ({techCatalogData.length})
              </button>
              <button onClick={() => { setActiveTab('ai'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                AI
              </button>
              <button onClick={() => { setActiveTab('trending'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                Trending
              </button>
              <button onClick={() => { setActiveTab('learning'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                Curriculums
              </button>
              <button onClick={() => { setActiveTab('interview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-200">
                Interviews
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-500">
            <div>
              100% in English • Built for software engineers and systems architects worldwide.
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/amorimdani/learn-here"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-300 flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
