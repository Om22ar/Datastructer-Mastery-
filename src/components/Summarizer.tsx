import React, { useState } from 'react';
import { FileText, Wand2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setSummary(data.text);
    } catch (e: any) {
      setSummary("Error: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
          <FileText size={20} />
        </div>
        <h2 className="text-lg font-semibold text-slate-100">Study Docs Summarizer</h2>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4 p-6 min-h-0">
        <div className="flex flex-col gap-2 min-h-0">
          <label className="text-sm text-slate-400 font-medium">Paste learning material here:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
            placeholder="Paste C++ notes, lab assignments, or code snippets to get a structured summary..."
          />
          <button 
            onClick={handleSummarize}
            disabled={isLoading || !text.trim()}
            className="mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors"
          >
            <Wand2 size={18} />
            {isLoading ? 'Summarizing...' : 'Generate Review Summary'}
          </button>
        </div>
        <div className="flex flex-col gap-2 min-h-0">
          <label className="text-sm text-slate-400 font-medium">Automated Summary:</label>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 text-sm overflow-y-auto leading-relaxed">
            {summary ? (
              <div className="whitespace-pre-wrap">{summary}</div>
            ) : (
              <div className="text-slate-500 h-full flex items-center justify-center italic">
                Summary will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
