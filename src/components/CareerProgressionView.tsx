import React, { useState } from 'react';
import {
  Compass,
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
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Engineering Career Rubric
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Career Progression & Seniority Levels
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setQuizActive(true);
                setQuizAnswers([]);
                setQuizResult(null);
              }}
              className="px-3 py-1 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition font-mono flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              <span>Self-Assessment</span>
            </button>
            <button
              onClick={() =>
                onBookmark({
                  id: levelData.id,
                  title: levelData.title,
                  category: 'Career Level'
                })
              }
              className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
                isBookmarked(levelData.id)
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>{isBookmarked(levelData.id) ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-sans max-w-3xl leading-relaxed">
          Standardized global rubric detailing expectations, compensation benchmarks, workflows,
          and system design standards across Seniority Levels from Junior (L1) to Principal/Staff (L7+).
        </p>
      </div>

      {/* Interactive Seniority Diagnostic Quiz Modal */}
      {quizActive && (
        <div className="p-5 rounded border border-zinc-700 bg-[#0e0e11] space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-300" />
              <h3 className="font-semibold text-xs font-mono uppercase text-zinc-200">
                Seniority Level Diagnostic Assessment
              </h3>
            </div>
            <button onClick={resetQuiz} className="text-xs text-zinc-400 hover:text-zinc-200 font-mono">
              Close [x]
            </button>
          </div>

          {!quizResult ? (
            <div className="space-y-3">
              <div className="text-[11px] text-zinc-500 font-mono">
                Question {quizAnswers.length + 1} of {quizQuestions.length}
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">
                {quizQuestions[quizAnswers.length].question}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {quizQuestions[quizAnswers.length].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt.score)}
                    className="p-3 text-left rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs transition flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-xs font-mono uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Assessment Result:
              </div>
              <p className="text-zinc-200 font-medium text-xs sm:text-sm">{quizResult}</p>
              <button
                onClick={resetQuiz}
                className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 text-xs font-mono hover:bg-zinc-700 mt-1"
              >
                Close Assessment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Seniority Level Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {careerLevelsData.map((level) => {
          const isSelected = activeLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`p-3.5 rounded border text-left transition ${
                isSelected
                  ? 'bg-zinc-900 border-zinc-600 text-zinc-100 shadow-sm'
                  : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-200 font-semibold'
                      : 'bg-zinc-850 text-zinc-500'
                  }`}
                >
                  {level.badge}
                </span>
              </div>
              <h3 className="font-semibold text-xs text-zinc-200 mb-0.5">{level.title}</h3>
              <p className="text-[11px] text-zinc-500 font-mono">{level.experienceYears}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Seniority Deep Dive Content */}
      <div className="space-y-6">
        {/* Core Metadata Card */}
        <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Seniority Profile
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5 font-serif-classic">
                {levelData.title}
              </h2>
              <p className="text-zinc-400 text-xs mt-0.5 italic">{levelData.tagline}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] text-zinc-500 uppercase block">Experience</span>
                <span className="text-zinc-200 font-semibold">{levelData.experienceYears}</span>
              </div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-[9px] text-zinc-500 uppercase block">Compensation (Tier 1)</span>
                <span className="text-zinc-200 font-semibold">{levelData.compensationRange}</span>
              </div>
            </div>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{levelData.summary}</p>
        </div>

        {/* Core Market-Demanded Languages & Concrete Code Quality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <Layers className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
              Core Languages & Production Code Quality
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {levelData.coreLanguages.map((lang, idx) => (
              <div key={idx} className="p-4 rounded border border-zinc-800 bg-[#0e0e11] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-zinc-100">{lang.name}</span>
                    <span className="text-[11px] font-mono text-zinc-500">({lang.role})</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                    Demand: {lang.marketDemand}
                  </span>
                </div>
                <p className="text-xs text-zinc-300">{lang.description}</p>
                <CodeBlock
                  code={lang.codeExample}
                  language={lang.name.toLowerCase().includes('python') ? 'python' : lang.name.toLowerCase().includes('sql') ? 'sql' : lang.name.toLowerCase().includes('go') ? 'go' : lang.name.toLowerCase().includes('rust') ? 'rust' : 'typescript'}
                  title={`Production Standard (${lang.name})`}
                  explanation={`Standard ${levelData.badge} error handling, defensive parsing, and concurrency.`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Global Market Workflows & Methodologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <Compass className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
              Market Workflows & Engineering Operations
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {levelData.workflows.map((wf, idx) => (
              <div key={idx} className="p-4 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-zinc-100">{wf.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{wf.description}</p>
                </div>
                <div className="pt-2 border-t border-zinc-850">
                  <span className="text-[9px] uppercase font-mono text-zinc-500 block">Industry Standard:</span>
                  <span className="text-xs font-mono text-zinc-300">{wf.marketStandard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Design Expectations */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <Layers className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
              System Design Expectations
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono text-zinc-500 uppercase text-[10px]">Scope:</span>
                <p className="font-semibold text-zinc-200 mt-0.5">{levelData.systemDesignExpectations.scope}</p>
              </div>
              <div>
                <span className="font-mono text-zinc-500 uppercase text-[10px]">Required Concepts:</span>
                <ul className="mt-1 space-y-1">
                  {levelData.systemDesignExpectations.keySkills.map((skill, idx) => (
                    <li key={idx} className="text-zinc-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-zinc-500 inline-block"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-3 rounded bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                Sample Interview Challenge
              </span>
              <p className="font-medium text-zinc-100">{levelData.systemDesignExpectations.sampleProblem}</p>
              <div className="pt-1.5 text-zinc-400 border-t border-zinc-800 font-sans">
                <span className="text-zinc-300 font-semibold font-mono text-[11px]">Recommended: </span>
                {levelData.systemDesignExpectations.recommendedApproach}
              </div>
            </div>
          </div>
        </div>

        {/* Day in the Life Timeline */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
              Day in the Life: {levelData.title}
            </h3>
          </div>
          <div className="divide-y divide-zinc-850">
            {levelData.dayInTheLife.map((item, idx) => (
              <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-zinc-400 font-semibold w-18">{item.time}</span>
                  <span className="font-medium text-zinc-200">{item.activity}</span>
                </div>
                <p className="text-zinc-400 sm:max-w-md">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Checklist & Anti-Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Interactive Promotion Readiness Checklist */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                <h3 className="font-semibold text-xs font-mono uppercase">Promotion Checklist</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                {progressPercentage}% Completed
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded overflow-hidden">
              <div
                className="bg-zinc-200 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <ul className="space-y-1.5">
              {levelData.promotionChecklist.map((task, idx) => {
                const isChecked = !!completedTasks[task];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleChecklist(task)}
                    className="flex items-start gap-2.5 p-2 rounded cursor-pointer hover:bg-zinc-900 transition text-xs"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center border transition ${
                        isChecked
                          ? 'bg-zinc-200 border-zinc-200 text-zinc-950'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs ${
                        isChecked ? 'line-through text-zinc-500' : 'text-zinc-300'
                      }`}
                    >
                      {task}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Anti-Patterns */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <AlertTriangle className="w-4 h-4 text-zinc-400" />
              <h3 className="font-semibold text-xs font-mono uppercase">Dangerous Anti-Patterns</h3>
            </div>
            <ul className="space-y-2">
              {levelData.antiPatterns.map((trap, idx) => (
                <li key={idx} className="p-2.5 rounded bg-zinc-900 border border-zinc-850 text-xs text-zinc-300 leading-relaxed">
                  <span className="font-mono text-zinc-400 font-semibold block mb-0.5 text-[11px]">Pitfall #{idx + 1}:</span>
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
