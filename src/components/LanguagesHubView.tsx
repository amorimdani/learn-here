import React, { useState } from 'react';
import {
  Code2,
  BookOpen,
  Cpu,
  Briefcase,
  CheckCircle,
  AlertOctagon,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { techCatalogData } from '../data/techCatalog';
import { CodeBlock } from './CodeBlock';

interface LanguagesHubViewProps {
  selectedTechId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const LanguagesHubView: React.FC<LanguagesHubViewProps> = ({
  selectedTechId,
  onBookmark,
  isBookmarked
}) => {
  // Only language category items
  const languageItems = techCatalogData.filter((t) => t.category === 'Language' || t.id === 'golang' || t.id === 'rust' || t.id === 'cpp-systems');
  
  const [activeLangId, setActiveLangId] = useState<string>(
    selectedTechId && languageItems.some((l) => l.id === selectedTechId)
      ? selectedTechId
      : languageItems[0].id
  );

  const [activeSubTab, setActiveSubTab] = useState<'curriculum' | 'architecture' | 'industry' | 'setup' | 'pitfalls'>('curriculum');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [showFullDiagram, setShowFullDiagram] = useState(false);

  const activeLang = languageItems.find((l) => l.id === activeLangId) || languageItems[0];
  const curriculum = activeLang.curriculum || [];
  const currentLesson = curriculum[activeLessonIndex] || curriculum[0];

  return (
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Top Language Navigation Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              Curriculum & Mastery
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Programming Languages Learning Hub
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {languageItems.length} languages with progressive fundamentals
          </p>
        </div>

        {/* Language Switcher Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {languageItems.map((lang) => {
            const isSelected = activeLang.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setActiveLangId(lang.id);
                  setActiveLessonIndex(0);
                }}
                className={`px-3 py-1.5 rounded text-xs transition font-mono whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Overview Header Card */}
      <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                Language Syllabus
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Created {activeLang.historyAndEvolution.originYear} by {activeLang.historyAndEvolution.creator}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-serif-classic">
              {activeLang.name}
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">{activeLang.tagline}</p>
          </div>
          <button
            onClick={() =>
              onBookmark({
                id: activeLang.id,
                title: activeLang.name,
                category: 'Language'
              })
            }
            className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 self-start sm:self-center ${
              isBookmarked(activeLang.id)
                ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Award className="w-3 h-3" />
            {isBookmarked(activeLang.id) ? 'Saved' : 'Save Language'}
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2 text-xs font-mono overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('curriculum')}
            className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 ${
              activeSubTab === 'curriculum'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Lessons ({curriculum.length})</span>
          </button>

          {activeLang.architectureDiagram && (
            <button
              onClick={() => setActiveSubTab('architecture')}
              className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 ${
                activeSubTab === 'architecture'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Runtime Engine</span>
            </button>
          )}

          <button
            onClick={() => setActiveSubTab('industry')}
            className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 ${
              activeSubTab === 'industry'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Industry Use Cases</span>
          </button>

          <button
            onClick={() => setActiveSubTab('setup')}
            className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 ${
              activeSubTab === 'setup'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            <span>Roadmap & Setup</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pitfalls')}
            className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 ${
              activeSubTab === 'pitfalls'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <AlertOctagon className="w-3 h-3" />
            <span>Pitfalls & Fixes</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: STRUCTURED LANGUAGE CURRICULUM (Variables, Functions, etc.) */}
      {activeSubTab === 'curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lesson Topic List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold tracking-wider px-1">
              Course Syllabus ({curriculum.length} Core Modules)
            </span>
            <div className="space-y-1.5">
              {curriculum.map((lesson, idx) => {
                const isSelected = activeLessonIndex === idx;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full p-3 rounded border text-left transition flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                        : 'bg-[#0e0e11] border-zinc-900/80 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          Lesson {lesson.topicNumber}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">
                          {lesson.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-zinc-200 line-clamp-1">
                        {lesson.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                        {lesson.summary}
                      </p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 mt-1 shrink-0 ${isSelected ? 'text-zinc-200' : 'text-zinc-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Lesson Deep Dive */}
          <div className="lg:col-span-8 space-y-5">
            {currentLesson ? (
              <div className="space-y-5">
                {/* Lesson Header */}
                <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      Lesson {currentLesson.topicNumber} • {currentLesson.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Module {activeLessonIndex + 1} of {curriculum.length}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 font-serif-classic">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {currentLesson.summary}
                  </p>
                </div>

                {/* Concept Deep Dive Text */}
                <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 text-xs leading-relaxed font-sans text-zinc-300">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
                    Core Engineering Principle:
                  </span>
                  <p>{currentLesson.conceptDeepDive}</p>
                </div>

                {/* Concrete, Complete Code Example */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                      Complete Code Implementation:
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {currentLesson.codeSnippet.language}
                    </span>
                  </div>
                  <CodeBlock
                    code={currentLesson.codeSnippet.code}
                    language={currentLesson.codeSnippet.language}
                    title={`${activeLang.name} — ${currentLesson.title}`}
                    explanation={currentLesson.codeSnippet.explanation}
                  />
                </div>

                {/* Key Takeaways & Rules */}
                <div className="p-4 rounded border border-zinc-800 bg-[#0e0e11] space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
                    Key Rules to Remember:
                  </span>
                  <ul className="space-y-1.5 font-sans text-zinc-300">
                    {currentLesson.keyTakeaways.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-500 mt-1.5 shrink-0"></span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Topic Button */}
                {activeLessonIndex < curriculum.length - 1 && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveLessonIndex((prev) => prev + 1);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded bg-zinc-100 text-zinc-950 font-mono text-xs font-semibold hover:bg-white transition flex items-center gap-1.5"
                    >
                      <span>Next: {curriculum[activeLessonIndex + 1].title}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-zinc-500">
                No lessons available for this language yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: ARCHITECTURE & RUNTIME ENGINE */}
      {activeSubTab === 'architecture' && activeLang.architectureDiagram && (
        <div className="p-5 rounded border border-zinc-800 bg-[#0c0c0e] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
                Runtime Architecture
              </span>
              <h3 className="font-semibold text-sm font-mono text-zinc-100">
                {activeLang.architectureDiagram.title}
              </h3>
            </div>
            <button
              onClick={() => setShowFullDiagram(!showFullDiagram)}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
            >
              <Maximize2 className="w-3 h-3" />
              <span>{showFullDiagram ? 'Compact' : 'Expand'}</span>
            </button>
          </div>

          <div
            className={`overflow-hidden rounded border border-zinc-800/80 bg-[#08080a] p-2 transition-all ${
              showFullDiagram ? 'max-h-none' : 'max-h-[420px]'
            }`}
            dangerouslySetInnerHTML={{ __html: activeLang.architectureDiagram.svgContent }}
          />

          <p className="text-[11px] font-mono text-zinc-500 italic">
            Fig 1.0 — {activeLang.architectureDiagram.caption}
          </p>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold block">
              Deep Technical Runtime Concepts:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeLang.deepTechnicalConcepts.map((concept, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-xs">
                  <h4 className="font-semibold text-zinc-200">{concept.title}</h4>
                  <p className="text-zinc-400 leading-relaxed font-sans">{concept.explanation}</p>
                  <div className="p-2 rounded bg-[#09090b] border border-zinc-850 font-mono text-[11px] text-zinc-300">
                    {concept.internals}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: INDUSTRY USE CASES & HISTORY */}
      {activeSubTab === 'industry' && (
        <div className="space-y-5">
          {/* History */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
              Origin & Ecosystem Evolution
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {activeLang.historyAndEvolution.background}
            </p>
            <div className="divide-y divide-zinc-850 border border-zinc-800 rounded overflow-hidden bg-zinc-950/40">
              {activeLang.historyAndEvolution.keyMilestones.map((ms, idx) => (
                <div key={idx} className="p-2.5 flex items-start gap-3 text-xs font-mono">
                  <span className="text-zinc-400 font-semibold w-12 shrink-0">{ms.year}</span>
                  <span className="text-zinc-300 font-sans">{ms.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Case Studies */}
          <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
            <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
              Real-World Industry Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeLang.realWorldUseCases.map((uc, idx) => (
                <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-100">{uc.exampleCompany}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                      {uc.industry}
                    </span>
                  </div>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 font-mono text-[11px]">Problem: </span>
                    {uc.problemSolved}
                  </p>
                  <p className="text-zinc-400 pt-1 border-t border-zinc-800/80">
                    <span className="text-zinc-500 font-mono text-[11px]">Architecture: </span>
                    {uc.architectureFit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: SETUP & TOOLCHAIN */}
      {activeSubTab === 'setup' && (
        <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
            Getting Started Toolchain Roadmap
          </h3>
          <div className="space-y-3">
            {activeLang.gettingStartedRoadmap.map((step) => (
              <div key={step.step} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 font-mono font-semibold text-xs flex items-center justify-center border border-zinc-700">
                    {step.step}
                  </span>
                  <h4 className="font-semibold text-xs text-zinc-200">{step.phase}</h4>
                </div>
                <ul className="space-y-1 pl-7 text-xs text-zinc-300 font-sans">
                  {step.actionableTasks.map((task, tIdx) => (
                    <li key={tIdx} className="list-disc">
                      {task}
                    </li>
                  ))}
                </ul>
                {step.keyCommands.length > 0 && (
                  <div className="pl-7 pt-1">
                    <div className="p-2 rounded bg-[#09090b] font-mono text-xs text-zinc-300 border border-zinc-800 flex flex-wrap gap-2">
                      {step.keyCommands.map((cmd, cIdx) => (
                        <span key={cIdx} className="bg-zinc-850 px-1.5 py-0.5 rounded text-zinc-300">
                          $ {cmd}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 5: PITFALLS & REMEDIATION */}
      {activeSubTab === 'pitfalls' && (
        <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
            Production Pitfalls & Architectural Remediation
          </h3>
          <div className="space-y-2.5">
            {activeLang.commonPitfalls.map((pitfall, idx) => (
              <div key={idx} className="p-3.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-xs">
                <div className="font-semibold text-zinc-200">
                  <span className="text-zinc-500 font-mono uppercase text-[10px]">Mistake: </span>
                  {pitfall.mistake}
                </div>
                <div className="text-zinc-400">
                  <span className="text-zinc-500 font-mono uppercase text-[10px]">Why it hurts: </span>
                  {pitfall.whyItHurts}
                </div>
                <div className="p-2 rounded bg-[#09090b] text-zinc-300 border border-zinc-800/80 font-mono">
                  <span className="text-zinc-400 font-semibold">Production Fix: </span>
                  {pitfall.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
