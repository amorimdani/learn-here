import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Eye,
  EyeOff,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { learningTracksData } from '../data/learningTracks';
import { CodeBlock } from './CodeBlock';

interface LearningTracksViewProps {
  selectedTrackId?: string;
  onBookmark: (item: { id: string; title: string; category: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const LearningTracksView: React.FC<LearningTracksViewProps> = ({
  selectedTrackId,
  onBookmark,
  isBookmarked
}) => {
  const [activeTrackId, setActiveTrackId] = useState(selectedTrackId || learningTracksData[0].id);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 1: true });

  const activeTrack = learningTracksData.find((t) => t.id === activeTrackId) || learningTracksData[0];

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleModule = (moduleNum: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleNum]: !prev[moduleNum]
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-900/40 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          University-Grade Curriculums
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Master-Level Learning Tracks & Syllabi
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Rigorous engineering curricula inspired by MIT 6.824, CMU 15-445, and Stanford Systems.
          Complete with concrete lab starter code, distributed consensus challenges, and self-assessment test suites.
        </p>

        {/* Track Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          {learningTracksData.map((t) => {
            const isSelected = activeTrack.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrackId(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Overview Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
              {activeTrack.institutionInspiration}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              {activeTrack.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">{activeTrack.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                onBookmark({
                  id: activeTrack.id,
                  title: activeTrack.title,
                  category: 'Learning Track'
                })
              }
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-2 ${
                isBookmarked(activeTrack.id)
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {isBookmarked(activeTrack.id) ? 'Saved' : 'Save Track'}
            </button>
          </div>
        </div>

        {/* Prerequisites & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
              <Clock className="w-4 h-4 text-purple-400" />
              Duration & Seniority Target:
            </div>
            <p className="text-sm font-semibold text-white">{activeTrack.duration} • {activeTrack.level}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">
              Prerequisites:
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              {activeTrack.prerequisites.map((pre, idx) => (
                <li key={idx}>• {pre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modules Syllabus */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Curriculum Modules & Hands-On Engineering Labs</h3>
        <div className="space-y-4">
          {activeTrack.syllabus.map((mod) => {
            const isExpanded = !!expandedModules[mod.moduleNumber];
            return (
              <div
                key={mod.moduleNumber}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg transition"
              >
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleModule(mod.moduleNumber)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850/60 transition bg-slate-850/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 font-mono font-bold text-sm flex items-center justify-center border border-purple-500/30">
                      M{mod.moduleNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-white">{mod.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Estimated effort: ~{mod.estimatedHours} hours
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Collapsible Module Details */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-800 space-y-6">
                    {/* Topics Covered */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-purple-400 font-bold">
                        Topics Covered:
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                        {mod.topicsCovered.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hands-On Engineering Lab */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Code2 className="w-4 h-4" />
                        <h5 className="font-bold text-sm text-white">{mod.handsOnLab.title}</h5>
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="font-semibold text-slate-400">Objective: </span>
                        {mod.handsOnLab.objective}
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="font-semibold text-slate-400">Expected Deliverable: </span>
                        {mod.handsOnLab.deliverable}
                      </div>
                      <CodeBlock
                        code={mod.handsOnLab.codeStarter}
                        language="go"
                        title="Lab Starter Scaffold"
                        explanation="Starting point for testing consensus and RPC state safety."
                      />
                    </div>

                    {/* Self-Assessment & Socratic Review */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-400">
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase font-bold">
                          Self-Assessment Review Questions:
                        </span>
                      </div>
                      <div className="space-y-3">
                        {mod.selfAssessmentQuestions.map((q, qIdx) => {
                          const key = `m${mod.moduleNumber}-q${qIdx}`;
                          const isRevealed = !!revealedAnswers[key];
                          return (
                            <div key={qIdx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                              <div className="flex items-start justify-between gap-3">
                                <p className="text-xs font-semibold text-slate-200">
                                  Q{qIdx + 1}: {q.question}
                                </p>
                                <button
                                  onClick={() => toggleAnswer(key)}
                                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 shrink-0"
                                >
                                  {isRevealed ? (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5" />
                                      <span>Hide</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Reveal Answer</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              {isRevealed && (
                                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-300/90 leading-relaxed animate-fade-in">
                                  <span className="font-bold text-emerald-400 block mb-1">Answer Analysis:</span>
                                  {q.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Capstone Project Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-900/60 space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Award className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Capstone Project Specification</h3>
        </div>
        <h4 className="text-base font-bold text-white">{activeTrack.capstoneProject.title}</h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {activeTrack.capstoneProject.description}
        </p>
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
            Core Technical Requirements:
          </span>
          <ul className="space-y-1.5">
            {activeTrack.capstoneProject.requirements.map((req, rIdx) => (
              <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono">
          <span className="text-slate-400 font-bold">Architecture Tip: </span>
          {activeTrack.capstoneProject.architectureTip}
        </div>
      </div>
    </div>
  );
};
