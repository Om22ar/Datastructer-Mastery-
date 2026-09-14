import React, { useState, useMemo } from 'react';
import { glossaryData } from '../data/glossary';
import { GlossaryConcept } from '../types';
import { Search, BookMarked, ArrowUpRight, Code, Sparkles, Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ConceptsGlossaryProps {
  onNavigateToTask: (moduleId: string, taskId?: string) => void;
}

export default function ConceptsGlossary({ onNavigateToTask }: ConceptsGlossaryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Arrays & Memory', 'Algorithms', 'OOP', 'Stacks', 'Queues', 'Linked Lists', 'Complexity'];

  const filteredConcepts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return glossaryData.filter(concept => {
      const matchesCategory = selectedCategory === 'All' || concept.category === selectedCategory;
      const matchesQuery =
        !query ||
        concept.term.toLowerCase().includes(query) ||
        concept.definition.toLowerCase().includes(query) ||
        concept.moduleTitle.toLowerCase().includes(query) ||
        concept.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (concept.complexity && concept.complexity.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <BookMarked size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Concepts Glossary</h2>
            <p className="text-xs text-slate-400">Searchable C++ Data Structures lexicon linked directly to curriculum modules</p>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="glossary-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, Big O, keywords..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter size={12} /> Category:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Glossary Items List */}
      <div className="flex-1 overflow-y-auto p-5 min-h-0">
        {filteredConcepts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6">
            <BookMarked size={36} className="text-slate-600 mb-3" />
            <div className="text-sm font-semibold text-slate-400">No matching concepts found</div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Try searching with different terms or select "All" from the category filter above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredConcepts.map(concept => (
              <div
                key={concept.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 inline-block mb-1.5 border border-slate-700/50">
                        {concept.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {concept.term}
                      </h3>
                    </div>
                    {concept.complexity && (
                      <span className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                        {concept.complexity}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {concept.definition}
                  </p>

                  {/* C++ Code Snippet */}
                  {concept.cppExample && (
                    <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800/80 mb-3 font-mono text-[11px] text-emerald-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                      <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-1 flex items-center gap-1">
                        <Code size={11} /> C++ Syntax / Usage
                      </div>
                      {concept.cppExample}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {concept.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link to Curriculum Module */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
                  <span className="text-xs text-slate-400 truncate">
                    Target: <strong className="text-slate-300">{concept.moduleTitle}</strong>
                  </span>
                  <button
                    onClick={() => onNavigateToTask(concept.moduleId, concept.taskId)}
                    className="shrink-0 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Practice in Lab</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
