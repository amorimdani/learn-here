import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript', title, explanation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-850/80 border-b border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-medium text-slate-300">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0d131f]">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="pr-4 select-none text-right text-slate-600 font-mono text-[11px] w-8">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {explanation && (
        <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800/80 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Technical Note: </span>
          {explanation}
        </div>
      )}
    </div>
  );
};
