import React, { useState } from 'react';
import { BookMarked, FileText, Sparkles } from 'lucide-react';
import ConceptsGlossary from './ConceptsGlossary';
import Summarizer from './Summarizer';
import { cn } from '../lib/utils';

interface StudyDocsProps {
  onNavigateToTask: (moduleId: string, taskId?: string) => void;
}

export default function StudyDocs({ onNavigateToTask }: StudyDocsProps) {
  const [studyTab, setStudyTab] = useState<'glossary' | 'summarizer'>('glossary');

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Level Study Docs Tabs */}
      <div className="bg-slate-950 border-b border-slate-800 px-5 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            id="study-tab-glossary"
            onClick={() => setStudyTab('glossary')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
              studyTab === 'glossary'
                ? "bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <BookMarked size={15} /> Concepts Glossary
          </button>
          <button
            id="study-tab-summarizer"
            onClick={() => setStudyTab('summarizer')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
              studyTab === 'summarizer'
                ? "bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <FileText size={15} /> AI Review Summarizer
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          <Sparkles size={13} className="text-indigo-400" />
          <span>Click any concept to jump directly to its interactive code lab</span>
        </div>
      </div>

      {/* Content View */}
      <div className="flex-1 overflow-hidden">
        {studyTab === 'glossary' ? (
          <ConceptsGlossary onNavigateToTask={onNavigateToTask} />
        ) : (
          <Summarizer />
        )}
      </div>
    </div>
  );
}
