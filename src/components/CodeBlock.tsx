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
    <div className="my-3 rounded border border-zinc-800 bg-[#09090b] overflow-hidden text-xs">
      {title && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#0e0e11] border-b border-zinc-800/80 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block"></span>
            <span className="font-medium text-zinc-300">{title}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase text-zinc-400 bg-zinc-850 px-1.5 py-0.2 rounded border border-zinc-700/60">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition text-[11px]"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <div className="p-3.5 overflow-x-auto font-mono leading-relaxed bg-[#060608]">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                <td className="pr-4 select-none text-right text-zinc-600 font-mono text-[10px] w-7">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-zinc-200 text-xs">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {explanation && (
        <div className="px-3.5 py-2 bg-[#0c0c0e] border-t border-zinc-800/80 text-[11px] text-zinc-400 font-sans">
          <span className="font-semibold text-zinc-300 font-mono">Note: </span>
          {explanation}
        </div>
      )}
    </div>
  );
};
