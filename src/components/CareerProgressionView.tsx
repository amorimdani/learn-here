import React, { useState } from 'react';
import {
  Compass,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { careerLevelsData } from '../data/careerLevels';
import { SeniorityLevel } from '../types';
import { CodeBlock } from './CodeBlock';

interface CareerProgressionViewProps {
  selectedLevelId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const CareerProgressionView: React.FC<CareerProgressionViewProps> = ({
  selectedLevelId,
  onBookmark,
  isBookmarked
}) => {
  const [activeLevel, setActiveLevel] = useState<SeniorityLevel>(
    (selectedLevelId as SeniorityLevel) || 'junior'
  );

  // Promotion checklist tracker saved in local state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Seniority Diagnostic Assessment State
  const [quizActive, setQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const levelData = careerLevelsData.find((l) => l.id === activeLevel) || careerLevelsData[0];

  const toggleChecklist = (task: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  const completedCount = levelData.promotionChecklist.filter(
    (item) => completedTasks[item]
  ).length;

  const progressPercentage = Math.round(
    (completedCount / levelData.promotionChecklist.length) * 100
  );

  // Seniority Quiz questions
  const quizQuestions = [
    {
      question: 'When asked to build a new feature, what is your standard approach?',
      options: [
        { text: 'I wait for detailed instructions and ask seniors for step-by-step guidance.', score: 1 },
        { text: 'I write unit tests, review the existing codebase, and execute the ticket independently.', score: 2 },
        { text: 'I write an RFC/Technical Design Doc exploring tradeoffs before touching code.', score: 3 },
        { text: 'I evaluate if the feature aligns with company strategy or if we can eliminate the need for it entirely.', score: 4 }
      ]
    },
    {
      question: 'How do you handle production incidents and outages?',
      options: [
        { text: 'I notify senior developers and observe them debugging.', score: 1 },
        { text: 'I inspect logs in Datadog/CloudWatch, fix the bug, and write tests.', score: 2 },
        { text: 'I lead the incident triage, coordinate mitigation, and write the blameless post-mortem.', score: 3 },
        { text: 'I analyze systemic failure patterns across all microservices and re-architect resilience boundaries.', score: 4 }
      ]
    },
    {
      question: 'What is your primary measure of day-to-day success?',
      options: [
        { text: 'Closing assigned Jira tickets and learning language syntax.', score: 1 },
        { text: 'Shipping reliable, tested features autonomously on schedule.', score: 2 },
        { text: 'Elevating the team through mentoring, architecture reviews, and high-leverage refactorings.', score: 3 },
        { text: 'Empowering entire engineering divisions and steering multi-year technological strategy.', score: 4 }
      ]
    }
  ];

  const handleQuizAnswer = (score: number) => {
    const updated = [...quizAnswers, score];
    setQuizAnswers(updated);
    if (updated.length === quizQuestions.length) {
      const average = updated.reduce((a, b) => a + b, 0) / updated.length;
      if (average <= 1.4) {
        setQuizResult('Junior Software Engineer (L1/L2) — Focus on mastering Git, testing, and execution velocity.');
      } else if (average <= 2.4) {
        setQuizResult('Mid-Level Engineer (L3) — Autonomous execution locked in. Next step: Technical Design Docs (RFCs) & system design.');
      } else if (average <= 3.4) {
        setQuizResult('Senior Software Engineer (L4/L5) — Strong technical anchor. Next step: Cross-squad organizational leverage.');
      } else {
        setQuizResult('Staff / Principal Engineer (L6/L7+) — Operating at strategic organizational impact.');
      }
    }
  };

  const resetQuiz = () => {
    setQuizAnswers([]);
    setQuizResult(null);
    setQuizActive(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            Global Engineering Career Rubric
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Career Progression & Seniority Hierarchy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Navigate the clear roadmap from entry-level Junior to Principal / Staff Engineer.
            Master the precise expectations, compensation benchmarks, production workflows,
            and system design criteria demanded by top-tier global tech platforms.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setQuizActive(true);
                setQuizAnswers([]);
                setQuizResult(null);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Take Seniority Self-Assessment Quiz
            </button>
            <button
              onClick={() =>
                onBookmark({
                  id: levelData.id,
                  title: levelData.title,
                  category: 'Career Level'
                })
              }
              className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center gap-2 ${
                isBookmarked(levelData.id)
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              {isBookmarked(levelData.id) ? 'Bookmarked' : 'Bookmark this Level'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Seniority Diagnostic Quiz Modal */}
      {quizActive && (
        <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 shadow-xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Seniority Level Diagnostic Assessment</h3>
            </div>
            <button onClick={resetQuiz} className="text-xs text-slate-400 hover:text-white">
              Close Assessment
            </button>
          </div>

          {!quizResult ? (
            <div className="space-y-4">
              <div className="text-xs text-indigo-300 font-mono">
                Question {quizAnswers.length + 1} of {quizQuestions.length}
              </div>
              <h4 className="text-lg font-semibold text-slate-100">
                {quizQuestions[quizAnswers.length].question}
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {quizQuestions[quizAnswers.length].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt.score)}
                    className="p-3 text-left rounded-xl bg-slate-900 hover:bg-indigo-900/50 border border-slate-800 hover:border-indigo-600/50 text-slate-200 text-xs sm:text-sm transition flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                Assessment Result:
              </div>
              <p className="text-emerald-100 font-semibold text-base">{quizResult}</p>
              <button
                onClick={resetQuiz}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}

      {/* Seniority Level Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {careerLevelsData.map((level) => {
          const isSelected = activeLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {level.badge}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-100 mb-1">{level.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{level.experienceYears}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Seniority Deep Dive Content */}
      <div className="space-y-8">
        {/* Core Metadata Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                Seniority Level Profile
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{levelData.title}</h2>
              <p className="text-slate-400 text-xs italic mt-1">{levelData.tagline}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-850 border border-slate-800">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Experience</div>
                  <div className="text-xs font-bold text-slate-200">{levelData.experienceYears}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-850 border border-slate-800">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Compensation (Global Tier 1)</div>
                  <div className="text-xs font-bold text-emerald-300">{levelData.compensationRange}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{levelData.summary}</p>
        </div>

        {/* Core Market-Demanded Languages & Concrete Code Quality */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Core Languages & Expected Production Code Quality</h3>
          </div>
          <p className="text-slate-400 text-xs">
            How code written at this seniority level differentiates itself in error handling, type safety, and concurrency.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {levelData.coreLanguages.map((lang, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-white">{lang.name}</span>
                    <span className="text-xs font-mono text-slate-400">({lang.role})</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold">
                    Market Demand: {lang.marketDemand}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{lang.description}</p>
                <CodeBlock
                  code={lang.codeExample}
                  language={lang.name.toLowerCase().includes('python') ? 'python' : lang.name.toLowerCase().includes('sql') ? 'sql' : lang.name.toLowerCase().includes('go') ? 'go' : lang.name.toLowerCase().includes('rust') ? 'rust' : 'typescript'}
                  title={`Production Standard Code (${lang.name})`}
                  explanation={`Exemplifies how ${levelData.badge} engineers structure defensive validation, error propagation, and concurrency.`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Global Market Workflows & Methodologies */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Market Workflows & Engineering Methodologies</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levelData.workflows.map((wf, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{wf.name}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{wf.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Industry Standard:</span>
                  <span className="text-xs font-mono text-indigo-300">{wf.marketStandard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Design Expectations */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">System Design Expectations for this Level</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Design Scope:</span>
                <p className="font-semibold text-slate-200 text-sm mt-0.5">{levelData.systemDesignExpectations.scope}</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Key Required Concepts:</span>
                <ul className="mt-1.5 space-y-1.5">
                  {levelData.systemDesignExpectations.keySkills.map((skill, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase">
                Sample Interview Challenge
              </span>
              <p className="text-xs font-medium text-white">{levelData.systemDesignExpectations.sampleProblem}</p>
              <div className="pt-2 text-xs text-slate-300 border-t border-slate-800">
                <span className="text-slate-400 font-semibold">Recommended Architecture: </span>
                {levelData.systemDesignExpectations.recommendedApproach}
              </div>
            </div>
          </div>
        </div>

        {/* Day in the Life Timeline */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Day in the Life of a {levelData.title}</h3>
          </div>
          <div className="divide-y divide-slate-800">
            {levelData.dayInTheLife.map((item, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-indigo-400 font-bold w-20">{item.time}</span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm">{item.activity}</span>
                </div>
                <p className="text-xs text-slate-400 sm:max-w-md">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Checklist & Anti-Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interactive Promotion Readiness Checklist */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Promotion Readiness Checklist</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                {progressPercentage}% Ready
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <ul className="space-y-2.5">
              {levelData.promotionChecklist.map((task, idx) => {
                const isChecked = !!completedTasks[task];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleChecklist(task)}
                    className="flex items-start gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-slate-850 transition"
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs ${
                        isChecked ? 'line-through text-slate-500' : 'text-slate-300'
                      }`}
                    >
                      {task}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Anti-Patterns & Common Traps */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-rose-950/60 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-white text-base">Dangerous Anti-Patterns at this Level</h3>
            </div>
            <p className="text-xs text-slate-400">
              Habits and behaviors that stall promotions or trigger performance improvement plans (PIPs).
            </p>
            <ul className="space-y-3">
              {levelData.antiPatterns.map((trap, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 leading-relaxed">
                  <span className="font-bold text-rose-300 block mb-0.5">Trap #{idx + 1}:</span>
                  {trap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
