import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { Module } from '../types';
import { Trophy, TrendingUp, Award, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ProgressHistoryEntry {
  date: string;
  timestamp: number;
  completedCount: number;
  taskTitle?: string;
}

interface MasteryProgressChartProps {
  modules: Module[];
  completedTasks: Set<string>;
  history?: ProgressHistoryEntry[];
  compact?: boolean;
}

// Algorithm categories classification
const CATEGORY_MAPPING: Record<string, string> = {
  m1: 'Arrays & Memory',
  m2: 'Arrays & Memory',
  m3: 'Searching',
  m4: 'Sorting',
  m5: 'Matrices (2D)',
  m6: 'OOP & Structs',
  m7: 'Stacks (LIFO)',
  m8: 'Queues (FIFO)',
  m9: 'Queues (FIFO)',
  m10: 'Linked Lists (SLL)',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Arrays & Memory': '#3b82f6', // blue
  'Searching': '#10b981',       // emerald
  'Sorting': '#f59e0b',         // amber
  'Matrices (2D)': '#8b5cf6',   // purple
  'OOP & Structs': '#ec4899',   // pink
  'Stacks (LIFO)': '#06b6d4',   // cyan
  'Queues (FIFO)': '#14b8a6',   // teal
  'Linked Lists (SLL)': '#6366f1', // indigo
};

export default function MasteryProgressChart({
  modules,
  completedTasks,
  history,
  compact = false,
}: MasteryProgressChartProps) {
  const [activeChart, setActiveChart] = useState<'mastery' | 'timeline'>('mastery');
  const [isExpanded, setIsExpanded] = useState<boolean>(!compact);

  // 1. Calculate Mastery by Algorithm Type
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number }> = {
      'Arrays & Memory': { total: 0, completed: 0 },
      'Searching': { total: 0, completed: 0 },
      'Sorting': { total: 0, completed: 0 },
      'Matrices (2D)': { total: 0, completed: 0 },
      'OOP & Structs': { total: 0, completed: 0 },
      'Stacks (LIFO)': { total: 0, completed: 0 },
      'Queues (FIFO)': { total: 0, completed: 0 },
      'Linked Lists (SLL)': { total: 0, completed: 0 },
    };

    for (const mod of modules) {
      const cat = CATEGORY_MAPPING[mod.id] || 'Arrays & Memory';
      for (const t of mod.tasks) {
        if (!stats[cat]) stats[cat] = { total: 0, completed: 0 };
        stats[cat].total++;
        if (completedTasks.has(t.id)) {
          stats[cat].completed++;
        }
      }
    }

    return Object.entries(stats).map(([category, data]) => {
      const percentage = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
      return {
        category,
        shortName: category.split(' ')[0], // short name for x-axis
        total: data.total,
        completed: data.completed,
        mastery: percentage,
        fill: CATEGORY_COLORS[category] || '#3b82f6',
      };
    });
  }, [modules, completedTasks]);

  // Overall totals
  const totalTasks = useMemo(() => {
    return modules.reduce((acc, m) => acc + m.tasks.length, 0);
  }, [modules]);

  const completedModulesCount = useMemo(() => {
    return modules.filter(m => m.tasks.length > 0 && m.tasks.every(t => completedTasks.has(t.id))).length;
  }, [modules, completedTasks]);

  const overallMastery = totalTasks > 0 ? Math.round((completedTasks.size / totalTasks) * 100) : 0;

  // 2. Timeline Progress Data (construct realistic progress curve from completed tasks)
  const timelineData = useMemo(() => {
    if (history && history.length > 0) {
      return history;
    }

    // Default synthesized timeline up to current completion
    const count = completedTasks.size;
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 6);

    const points: ProgressHistoryEntry[] = [];
    for (let i = 0; i <= 6; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      // Interpolate progress curve
      const ratio = i / 6;
      const comp = Math.min(count, Math.round(count * Math.pow(ratio, 1.2)));
      points.push({
        date: dateStr,
        timestamp: d.getTime(),
        completedCount: comp,
      });
    }

    // Ensure the last point matches current count
    if (points.length > 0) {
      points[points.length - 1].completedCount = count;
    }

    return points;
  }, [history, completedTasks.size]);

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all">
      {/* Header bar / accordion toggle */}
      <div
        onClick={() => compact && setIsExpanded(!isExpanded)}
        className={cn(
          "px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between",
          compact ? "cursor-pointer hover:bg-slate-800/60" : ""
        )}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
            <BarChart3 size={15} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>Mastery & Progress</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded-full font-mono font-semibold">
                {overallMastery}%
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {completedTasks.size} of {totalTasks} tasks • {completedModulesCount}/{modules.length} modules
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Tab Switcher */}
          <div className="flex bg-slate-950 rounded-md p-0.5 border border-slate-800 text-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveChart('mastery');
                setIsExpanded(true);
              }}
              className={cn(
                "px-2 py-0.5 rounded font-medium transition-colors",
                activeChart === 'mastery'
                  ? "bg-purple-600/40 text-purple-200 border border-purple-500/30"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mastery
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveChart('timeline');
                setIsExpanded(true);
              }}
              className={cn(
                "px-2 py-0.5 rounded font-medium transition-colors",
                activeChart === 'timeline'
                  ? "bg-blue-600/40 text-blue-200 border border-blue-500/30"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Timeline
            </button>
          </div>

          {compact && (
            <button className="text-slate-400 hover:text-slate-200 p-1">
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Chart Body */}
      {isExpanded && (
        <div className="p-3 flex flex-col gap-3">
          {/* Progress Mini Overview Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Overall Curriculum Completion</span>
              <span className="text-slate-200 font-bold">{completedTasks.size}/{totalTasks} Tasks</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(4, overallMastery)}%` }}
              />
            </div>
          </div>

          {/* Chart Display */}
          <div className="h-44 w-full pt-1">
            {activeChart === 'mastery' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryStats}
                  margin={{ top: 8, right: 8, left: -24, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    stroke="#334155"
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 50, 100]}
                    tick={{ fill: '#64748b', fontSize: 9 }}
                    stroke="#334155"
                    unit="%"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs shadow-xl font-mono">
                            <div className="font-bold text-slate-200 mb-1">{d.category}</div>
                            <div className="text-emerald-400">Mastery: {d.mastery}%</div>
                            <div className="text-slate-400 text-[10px]">
                              Completed: {d.completed} of {d.total} tasks
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="mastery" radius={[4, 4, 0, 0]}>
                    {categoryStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        opacity={entry.mastery > 0 ? 0.9 : 0.25}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timelineData}
                  margin={{ top: 8, right: 8, left: -24, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                    stroke="#334155"
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 9 }}
                    stroke="#334155"
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs shadow-xl font-mono">
                            <div className="text-slate-400 text-[10px]">{d.date}</div>
                            <div className="font-bold text-blue-400">
                              {d.completedCount} Tasks Mastered
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completedCount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#progressGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Category Chips with Progress */}
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800/60">
            {categoryStats.slice(0, 4).map(c => (
              <div
                key={c.category}
                className="flex items-center justify-between px-2 py-1 bg-slate-900/60 border border-slate-800/60 rounded text-[10px]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: c.fill }}
                  />
                  <span className="text-slate-300 truncate">{c.shortName}</span>
                </div>
                <span className="font-mono font-bold text-slate-400 ml-1">
                  {c.completed}/{c.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
