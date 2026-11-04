import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { interviewQuestionsData } from '../data/interviewHub';
import { CodeBlock } from './CodeBlock';

interface InterviewHubViewProps {
  selectedQuestionId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const InterviewHubView: React.FC<InterviewHubViewProps> = ({
  selectedQuestionId,
  onBookmark,
  isBookmarked
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState(
    selectedQuestionId || interviewQuestionsData[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Confidence practice state: record user confidence rating per question
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({});

  const categories = [
    'All',
    'Recruiter Screening',
    'Behavioral (STAR)',
    'System Design',
    'Data Structures & Algorithms'
  ];

  const filteredQuestions = interviewQuestionsData.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.context.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeQuestion =
    interviewQuestionsData.find((q) => q.id === activeQuestionId) || interviewQuestionsData[0];

  const rateConfidence = (qId: string, rating: number) => {
    setConfidenceRatings((prev) => ({
      ...prev,
      [qId]: rating
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-900/40 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          Elite Engineering & Recruiter Screening Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Recruiter & Technical Interview Preparation
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          The exact questions, psychological expectations, and high-impact model answers demanded by
          Big Tech and high-growth engineering teams. Master the STAR framework, System Design trade-offs, and salary negotiation.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interview questions..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Grid: Questions Navigator + Question Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider px-1">
            Interview Questions ({filteredQuestions.length})
          </div>
          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = activeQuestion.id === q.id;
              const rating = confidenceRatings[q.id];
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition text-left ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 ring-1 ring-rose-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-semibold">
                      {q.category}
                    </span>
                    {rating ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        ★ {rating}/5 Confident
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">{q.difficulty}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 line-clamp-2">{q.question}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 space-y-8">
          {/* Question Title & Bookmark */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                  {activeQuestion.category} • Difficulty: {activeQuestion.difficulty}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  "{activeQuestion.question}"
                </h2>
              </div>
              <button
                onClick={() =>
                  onBookmark({
                    id: activeQuestion.id,
                    title: activeQuestion.question,
                    category: 'Interview Question'
                  })
                }
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-2 ${
                  isBookmarked(activeQuestion.id)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                {isBookmarked(activeQuestion.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Context & What Recruiters are Listening For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Interview Context:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeQuestion.context}</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-mono uppercase text-rose-300 font-bold block">
                  What Recruiters Are Really Listening For:
                </span>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  {activeQuestion.recruiterPerspective}
                </p>
              </div>
            </div>

            {/* Practice Confidence Self-Rating */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
              <span className="text-slate-400">Rate your readiness to answer this live:</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => rateConfidence(activeQuestion.id, star)}
                    className={`px-2 py-0.5 rounded text-xs font-mono transition ${
                      (confidenceRatings[activeQuestion.id] || 0) >= star
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Answer Breakdown (STAR or Full Strategy) */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Recommended Strategy & Model Answer</h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs text-indigo-200">
              <span className="font-bold text-indigo-300">Strategy Formula: </span>
              {activeQuestion.modelAnswer.strategy}
            </div>

            {activeQuestion.modelAnswer.breakdown ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                    [S] Situation:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.situation}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                    [T] Task:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.task}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                    [A] Action:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.action}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    [R] Result:
                  </span>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.result}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-mono">
                {activeQuestion.modelAnswer.fullResponse}
              </div>
            )}
          </div>

          {/* Code or Technical Blueprint (if present) */}
          {activeQuestion.technicalDiagramOrCode && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Technical Implementation & Proof</h3>
              <CodeBlock
                code={activeQuestion.technicalDiagramOrCode}
                language="typescript"
                title="Production Reference Code"
                explanation="Demonstrates optimal O(1) or distributed algorithmic guarantees."
              />
            </div>
          )}

          {/* Key Phrases & Red Flags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High-Impact Phrases */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-950/60 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="font-bold text-white text-sm">High-Impact Phrases to Use</h4>
              </div>
              <ul className="space-y-2">
                {activeQuestion.modelAnswer.keyPhrasesToUse.map((phrase, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200/90 leading-relaxed">
                    "{phrase}"
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags to Avoid */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-rose-950/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-bold text-white text-sm">Disastrous Red Flags to Avoid</h4>
              </div>
              <ul className="space-y-2">
                {activeQuestion.modelAnswer.redFlagsToAvoid.map((flag, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 leading-relaxed">
                    ⚠️ {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
