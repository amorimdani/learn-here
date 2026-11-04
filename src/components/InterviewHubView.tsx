import React, { useState } from 'react';
import {
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
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Engineering Interview & Screening
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Recruiter & Technical Interview Preparation
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {interviewQuestionsData.length} core interview models & frameworks
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition font-mono whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interview prep..."
              className="w-full pl-8 pr-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Grid: Questions Navigator + Question Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider px-1">
            Questions ({filteredQuestions.length})
          </div>
          <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = activeQuestion.id === q.id;
              const rating = confidenceRatings[q.id];
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-3 rounded border cursor-pointer transition text-left ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {q.category}
                    </span>
                    {rating ? (
                      <span className="text-[10px] font-mono text-zinc-300">
                        ★ {rating}/5
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500">{q.difficulty}</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-xs text-zinc-200 line-clamp-2">{q.question}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 space-y-6">
          {/* Question Title & Bookmark */}
          <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {activeQuestion.category} • {activeQuestion.difficulty}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-serif-classic">
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
                className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
                  isBookmarked(activeQuestion.id)
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Award className="w-3 h-3" />
                {isBookmarked(activeQuestion.id) ? 'Saved' : 'Save Question'}
              </button>
            </div>

            {/* Context & What Recruiters are Listening For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
                  Context:
                </span>
                <p className="text-zinc-300 leading-relaxed font-sans">{activeQuestion.context}</p>
              </div>
              <div className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">
                  Recruiter & Interviewer Expectations:
                </span>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {activeQuestion.recruiterPerspective}
                </p>
              </div>
            </div>

            {/* Practice Confidence Self-Rating */}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 text-xs font-mono">
              <span className="text-zinc-400">Readiness Score:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => rateConfidence(activeQuestion.id, star)}
                    className={`px-2 py-0.5 rounded text-xs transition ${
                      (confidenceRatings[activeQuestion.id] || 0) >= star
                        ? 'bg-zinc-200 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Answer Breakdown (STAR or Full Strategy) */}
          <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
                Strategy & Model Response
              </h3>
            </div>
            <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 text-xs text-zinc-300 font-mono">
              <span className="font-semibold text-zinc-200">Strategy Formula: </span>
              {activeQuestion.modelAnswer.strategy}
            </div>

            {activeQuestion.modelAnswer.breakdown ? (
              <div className="space-y-2 pt-1 font-sans">
                <div className="p-3 rounded bg-zinc-900 border border-zinc-850 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                    [S] Situation:
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.situation}
                  </p>
                </div>
                <div className="p-3 rounded bg-zinc-900 border border-zinc-850 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                    [T] Task:
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.task}
                  </p>
                </div>
                <div className="p-3 rounded bg-zinc-900 border border-zinc-855 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                    [A] Action:
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.action}
                  </p>
                </div>
                <div className="p-3 rounded bg-zinc-900 border border-zinc-850 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-300 font-semibold">
                    [R] Result:
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeQuestion.modelAnswer.breakdown.result}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded bg-[#09090b] border border-zinc-800 text-xs text-zinc-200 leading-relaxed whitespace-pre-line font-mono">
                {activeQuestion.modelAnswer.fullResponse}
              </div>
            )}
          </div>

          {/* Technical Diagram or Code */}
          {activeQuestion.technicalDiagramOrCode && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
                Technical Proof & Algorithmic Blueprint
              </h3>
              <CodeBlock
                code={activeQuestion.technicalDiagramOrCode}
                language="typescript"
                title="Production Reference Code"
                explanation="Algorithmic implementation with provable runtime complexity."
              />
            </div>
          )}

          {/* Key Phrases & Red Flags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                <h4 className="font-semibold text-xs font-mono uppercase">High-Impact Key Phrases</h4>
              </div>
              <ul className="space-y-1.5 font-sans">
                {activeQuestion.modelAnswer.keyPhrasesToUse.map((phrase, idx) => (
                  <li key={idx} className="p-2 rounded bg-zinc-900 border border-zinc-850 text-zinc-300">
                    "{phrase}"
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <AlertTriangle className="w-4 h-4 text-zinc-400" />
                <h4 className="font-semibold text-xs font-mono uppercase">Red Flags to Avoid</h4>
              </div>
              <ul className="space-y-1.5 font-sans">
                {activeQuestion.modelAnswer.redFlagsToAvoid.map((flag, idx) => (
                  <li key={idx} className="p-2 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">
                    • {flag}
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
