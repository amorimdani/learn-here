import React, { useState } from 'react';
import {
  Award,
  ChevronDown,
  ChevronUp,
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
    <div className="space-y-6 animate-fade-in text-zinc-200">
      {/* Minimalist Classic Header */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              University Engineering Curricula
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-serif-classic">
              Master-Level Learning Tracks
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            MIT 6.824 & CMU 15-445 inspired syllabi
          </p>
        </div>

        {/* Track Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {learningTracksData.map((t) => {
            const isSelected = activeTrack.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrackId(t.id)}
                className={`px-2.5 py-1 rounded text-xs transition font-mono whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {t.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Overview Card */}
      <div className="p-6 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              {activeTrack.institutionInspiration}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5 font-serif-classic">
              {activeTrack.title}
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">{activeTrack.description}</p>
          </div>
          <button
            onClick={() =>
              onBookmark({
                id: activeTrack.id,
                title: activeTrack.title,
                category: 'Learning Track'
              })
            }
            className={`px-3 py-1 rounded border text-xs font-mono transition flex items-center gap-1.5 ${
              isBookmarked(activeTrack.id)
                ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Award className="w-3 h-3" />
            {isBookmarked(activeTrack.id) ? 'Saved' : 'Save Track'}
          </button>
        </div>

        {/* Prerequisites & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Duration & Scope:</span>
            <span className="text-zinc-200 font-medium">{activeTrack.duration} • {activeTrack.level}</span>
          </div>
          <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Prerequisites:</span>
            <ul className="text-zinc-400 space-y-0.5 text-[11px] font-sans">
              {activeTrack.prerequisites.map((pre, idx) => (
                <li key={idx}>• {pre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modules Syllabus */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-zinc-300">
          Curriculum Modules & Labs
        </h3>
        <div className="space-y-3">
          {activeTrack.syllabus.map((mod) => {
            const isExpanded = !!expandedModules[mod.moduleNumber];
            return (
              <div
                key={mod.moduleNumber}
                className="rounded border border-zinc-800 bg-[#0e0e11] overflow-hidden"
              >
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleModule(mod.moduleNumber)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50 transition bg-zinc-900/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 font-mono font-semibold text-xs flex items-center justify-center border border-zinc-700">
                      M{mod.moduleNumber}
                    </span>
                    <div>
                      <h4 className="font-semibold text-xs text-zinc-100">{mod.title}</h4>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        Estimated: ~{mod.estimatedHours} hours
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </div>

                {/* Collapsible Module Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-zinc-800/80 space-y-5">
                    {/* Topics Covered */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                        Topics Covered:
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-zinc-300 font-sans">
                        {mod.topicsCovered.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-zinc-500 mt-1.5 shrink-0"></span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hands-On Engineering Lab */}
                    <div className="p-4 rounded bg-[#09090b] border border-zinc-800 space-y-2">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                        <h5 className="font-semibold text-xs text-zinc-100">{mod.handsOnLab.title}</h5>
                      </div>
                      <div className="text-xs text-zinc-300 font-sans">
                        <span className="text-zinc-500 font-mono text-[11px]">Objective: </span>
                        {mod.handsOnLab.objective}
                      </div>
                      <div className="text-xs text-zinc-300 font-sans">
                        <span className="text-zinc-500 font-mono text-[11px]">Deliverable: </span>
                        {mod.handsOnLab.deliverable}
                      </div>
                      <CodeBlock
                        code={mod.handsOnLab.codeStarter}
                        language="go"
                        title="Lab Starter Code"
                        explanation="Starting point for testing consensus, RPC, and state safety."
                      />
                    </div>

                    {/* Self-Assessment & Socratic Review */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">
                        Self-Assessment Review:
                      </span>
                      <div className="space-y-2">
                        {mod.selfAssessmentQuestions.map((q, qIdx) => {
                          const key = `m${mod.moduleNumber}-q${qIdx}`;
                          const isRevealed = !!revealedAnswers[key];
                          return (
                            <div key={qIdx} className="p-3 rounded bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
                              <div className="flex items-start justify-between gap-3">
                                <p className="font-medium text-zinc-200 font-sans">
                                  Q{qIdx + 1}: {q.question}
                                </p>
                                <button
                                  onClick={() => toggleAnswer(key)}
                                  className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 shrink-0"
                                >
                                  {isRevealed ? (
                                    <>
                                      <EyeOff className="w-3 h-3" />
                                      <span>Hide</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-3 h-3" />
                                      <span>Reveal</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              {isRevealed && (
                                <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 text-xs text-zinc-300 font-mono leading-relaxed">
                                  <span className="text-zinc-400 font-semibold block mb-0.5">Answer Analysis:</span>
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
      <div className="p-5 rounded border border-zinc-800 bg-[#0e0e11] space-y-3">
        <div className="flex items-center gap-2 text-zinc-300">
          <Award className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold tracking-wide uppercase font-mono">
            Capstone Specification: {activeTrack.capstoneProject.title}
          </h3>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          {activeTrack.capstoneProject.description}
        </p>
        <div className="space-y-1 pt-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
            Requirements:
          </span>
          <ul className="space-y-1 text-xs text-zinc-300 font-sans">
            {activeTrack.capstoneProject.requirements.map((req, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2.5 rounded bg-[#09090b] border border-zinc-850 text-xs text-zinc-400 font-mono">
          <span className="text-zinc-300 font-semibold">Tip: </span>
          {activeTrack.capstoneProject.architectureTip}
        </div>
      </div>
    </div>
  );
};
