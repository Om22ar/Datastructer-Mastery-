import React, { useState, useEffect, useMemo } from "react";
import { SimulationFrame } from "../types";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  StepBack,
  Terminal,
  Cpu,
  CheckCircle2,
  Sparkles,
  Gauge,
  ArrowRight,
  Zap,
  Info,
  Flame,
  Activity,
  ListOrdered,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "../lib/utils";

function getPointerBadgeStyle(ptr: string): string {
  const p = ptr.toLowerCase();
  if (p.includes("head"))
    return "text-indigo-300 bg-indigo-500/20 border-indigo-500/40";
  if (p.includes("tail"))
    return "text-amber-300 bg-amber-500/20 border-amber-500/40";
  if (p.includes("pred"))
    return "text-rose-300 bg-rose-500/20 border-rose-500/40";
  if (p.includes("tmp") || p === "p" || p === "q")
    return "text-cyan-300 bg-cyan-500/20 border-cyan-500/40";
  if (p.includes("front"))
    return "text-emerald-300 bg-emerald-500/20 border-emerald-500/40";
  if (p.includes("rear"))
    return "text-purple-300 bg-purple-500/20 border-purple-500/40";
  if (p.includes("top"))
    return "text-fuchsia-300 bg-fuchsia-500/20 border-fuchsia-500/40";
  if (p === "i" || p === "l")
    return "text-blue-300 bg-blue-500/20 border-blue-500/40";
  if (p === "j" || p === "mid")
    return "text-orange-300 bg-orange-500/20 border-orange-500/40";
  return "text-emerald-300 bg-emerald-500/20 border-emerald-500/40";
}

interface VisualSimulatorProps {
  frames: SimulationFrame[];
  isRunning: boolean;
  stdout?: string;
  feedback?: string | null;
  isGoalAchieved?: boolean;
  submittedTimeComplexity?: string;
  optimalTimeComplexity?: string;
  timeComplexityStatus?: "optimal" | "suboptimal" | "unknown";
  timeComplexityAnalysis?: string;
}

export default function VisualSimulator({
  frames,
  isRunning,
  stdout,
  feedback,
  isGoalAchieved,
  submittedTimeComplexity,
  optimalTimeComplexity,
  timeComplexityStatus,
  timeComplexityAnalysis,
}: VisualSimulatorProps) {
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "memory" | "trace" | "terminal" | "complexity"
  >("memory");

  // Heatmap Controls
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapScope, setHeatmapScope] = useState<"cumulative" | "total">(
    "cumulative"
  );

  // Trace filter
  const [traceFilterChangesOnly, setTraceFilterChangesOnly] = useState(false);

  useEffect(() => {
    setCurrentFrameIdx(0);
    setAutoPlay(isRunning);
  }, [frames, isRunning]);

  useEffect(() => {
    let timer: any;
    if (autoPlay && currentFrameIdx < frames.length - 1) {
      timer = setTimeout(() => {
        setCurrentFrameIdx((p) => p + 1);
      }, 1400); // 1.4s per step
    } else if (currentFrameIdx >= frames.length - 1) {
      setAutoPlay(false);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, currentFrameIdx, frames.length]);

  const frame = frames[currentFrameIdx] ||
    frames[0] || { description: "Awaiting execution...", array: [] };

  // 1. Performance Heatmap calculation
  const { accessCounts, maxAccessCount } = useMemo(() => {
    const counts: Record<number, number> = {};
    const targetFrames =
      heatmapScope === "total" ? frames : frames.slice(0, currentFrameIdx + 1);

    targetFrames.forEach((f) => {
      // highlighted indices count as an access (read/write/compare/swap)
      f.highlightIndices?.forEach((idx) => {
        counts[idx] = (counts[idx] || 0) + 1;
      });
      // pointers pointing to an index also indicate reference
      if (f.pointers) {
        Object.values(f.pointers).forEach((ptrIdx) => {
          if (typeof ptrIdx === "number" && ptrIdx >= 0) {
            counts[ptrIdx] = (counts[ptrIdx] || 0) + 1;
          }
        });
      }
    });

    const maxCount = Math.max(1, ...Object.values(counts));
    return { accessCounts: counts, maxAccessCount: maxCount };
  }, [frames, currentFrameIdx, heatmapScope]);

  // 2. Chronological Pointer Trace calculation
  const pointerTrace = useMemo(() => {
    return frames.map((f, i) => {
      const prevPointers = i > 0 ? frames[i - 1].pointers || {} : {};
      const currentPointers = f.pointers || {};
      const allKeys = Array.from(
        new Set([...Object.keys(prevPointers), ...Object.keys(currentPointers)])
      );

      const changes = allKeys.map((key) => {
        const prev = prevPointers[key];
        const curr = currentPointers[key];
        const changed = i === 0 || prev !== curr;
        const delta =
          typeof prev === "number" && typeof curr === "number"
            ? curr - prev
            : undefined;
        return { name: key, prev, curr, changed, delta };
      });

      const hasPointerMovement = changes.some((c) => c.changed);

      return {
        step: i + 1,
        frameIndex: i,
        description: f.description,
        pointers: currentPointers,
        changes,
        hasPointerMovement,
        highlightIndices: f.highlightIndices || [],
        variables: f.variables || {},
        arraySnapshot: f.array || [],
      };
    });
  }, [frames]);

  // Current step's pointer changes for memory tab summary
  const currentStepTrace = pointerTrace[currentFrameIdx] || null;

  // Pointer names found across the entire execution
  const allKnownPointers = useMemo(() => {
    const set = new Set<string>();
    frames.forEach((f) => {
      if (f.pointers) {
        Object.keys(f.pointers).forEach((k) => set.add(k));
      }
    });
    return Array.from(set);
  }, [frames]);

  const complexityScales = [
    { label: "O(1)", name: "Constant", rating: "Excellent", color: "emerald" },
    { label: "O(log n)", name: "Logarithmic", rating: "Great", color: "teal" },
    { label: "O(n)", name: "Linear", rating: "Fair", color: "yellow" },
    {
      label: "O(n log n)",
      name: "Linearithmic",
      rating: "Moderate",
      color: "orange",
    },
    { label: "O(n²)", name: "Quadratic", rating: "Slow", color: "red" },
  ];

  const hasComplexity = !!submittedTimeComplexity && !!optimalTimeComplexity;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap justify-between items-center gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="tab-memory"
            onClick={() => setActiveTab("memory")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors",
              activeTab === "memory"
                ? "bg-blue-600/30 border border-blue-500/40 text-blue-300"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Cpu size={14} /> Memory State
          </button>
          <button
            id="tab-trace"
            onClick={() => setActiveTab("trace")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors relative",
              activeTab === "trace"
                ? "bg-cyan-600/30 border border-cyan-500/40 text-cyan-300"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Activity size={14} /> Pointer Trace
            {allKnownPointers.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono font-bold">
                {allKnownPointers.length} ptrs
              </span>
            )}
          </button>
          <button
            id="tab-terminal"
            onClick={() => setActiveTab("terminal")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors relative",
              activeTab === "terminal"
                ? "bg-emerald-600/30 border border-emerald-500/40 text-emerald-300"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Terminal size={14} /> Terminal
            {stdout && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            )}
          </button>
          <button
            id="tab-complexity"
            onClick={() => setActiveTab("complexity")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors relative",
              activeTab === "complexity"
                ? "bg-purple-600/30 border border-purple-500/40 text-purple-300"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Gauge size={14} /> Time Complexity
            {hasComplexity && (
              <span
                className={cn(
                  "px-1.5 py-0.2 font-mono text-[10px] rounded font-bold ml-0.5",
                  timeComplexityStatus === "optimal"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                )}
              >
                {submittedTimeComplexity}
              </span>
            )}
          </button>
        </div>

        {/* Stepper Controls */}
        {isRunning && frames.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              id="btn-prev-frame"
              onClick={() => setCurrentFrameIdx((p) => Math.max(0, p - 1))}
              disabled={currentFrameIdx === 0}
              className="p-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded text-slate-300 transition-colors"
              title="Previous Step"
            >
              <StepBack size={14} />
            </button>
            <button
              id="btn-autoplay"
              onClick={() => setAutoPlay(!autoPlay)}
              className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
              title={autoPlay ? "Pause" : "Auto Play"}
            >
              {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              id="btn-next-frame"
              onClick={() =>
                setCurrentFrameIdx((p) => Math.min(frames.length - 1, p + 1))
              }
              disabled={currentFrameIdx >= frames.length - 1}
              className="p-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded text-slate-300 transition-colors"
              title="Next Step"
            >
              <StepForward size={14} />
            </button>
            <button
              id="btn-restart-frames"
              onClick={() => {
                setCurrentFrameIdx(0);
                setAutoPlay(false);
              }}
              className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
              title="Restart"
            >
              <RotateCcw size={14} />
            </button>
            <div className="text-xs text-slate-400 font-mono ml-2">
              Step {currentFrameIdx + 1} / {frames.length}
            </div>
          </div>
        )}
      </div>

      {/* Goal Feedback Banner (if run) */}
      {feedback && (
        <div
          className={cn(
            "px-4 py-2 text-xs font-medium border-b flex items-start gap-2 shrink-0 transition-all",
            isGoalAchieved
              ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
              : "bg-blue-950/60 border-blue-500/30 text-blue-300"
          )}
        >
          {isGoalAchieved ? (
            <CheckCircle2
              size={16}
              className="text-emerald-400 shrink-0 mt-0.5"
            />
          ) : (
            <Sparkles size={16} className="text-blue-400 shrink-0 mt-0.5" />
          )}
          <span className="whitespace-pre-line leading-relaxed">
            {feedback}
          </span>
        </div>
      )}

      {/* Persistent Compact Time Complexity Banner (Visible across tabs when executed) */}
      {hasComplexity && (
        <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Your Complexity:</span>
              <span
                className={cn(
                  "font-mono font-bold px-2 py-0.5 rounded text-xs border",
                  timeComplexityStatus === "optimal"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                )}
              >
                {submittedTimeComplexity}
              </span>
              {timeComplexityStatus === "optimal" ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <Zap size={12} /> Optimal
                </span>
              ) : (
                <span className="text-amber-400 font-medium text-[11px]">
                  Needs Optimization
                </span>
              )}
            </div>

            <div className="h-3 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Optimal Target:</span>
              <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                {optimalTimeComplexity}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("complexity")}
            className="text-[11px] text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 hover:underline"
          >
            <span>View Big O Breakdown</span>
            <ArrowRight size={12} />
          </button>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="flex-1 flex flex-col p-5 overflow-hidden">
        {activeTab === "memory" ? (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Top Toolbar: Description + Heatmap Toggle */}
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 border border-slate-800 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-medium shadow-sm">
                <span className="truncate max-w-lg">
                  {frame.description || "Awaiting execution..."}
                </span>

                {/* Heatmap Overlay Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    id="btn-toggle-heatmap"
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all border",
                      showHeatmap
                        ? "bg-gradient-to-r from-orange-950 to-red-950 border-orange-500/50 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                    title="Toggle color-coded access frequency heatmap overlay"
                  >
                    <Flame
                      size={13}
                      className={
                        showHeatmap
                          ? "text-orange-400 animate-pulse"
                          : "text-slate-500"
                      }
                    />
                    <span>Heatmap: {showHeatmap ? "ON" : "OFF"}</span>
                  </button>

                  {showHeatmap && (
                    <button
                      onClick={() =>
                        setHeatmapScope(
                          heatmapScope === "cumulative" ? "total" : "cumulative"
                        )
                      }
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                      title="Switch between cumulative step heat and full simulation heat"
                    >
                      {heatmapScope === "cumulative" ? "Step Heat" : "Full Run"}
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Pointer Activity Ribbon */}
              {currentStepTrace && currentStepTrace.changes.length > 0 && (
                <div className="bg-slate-950/70 border border-slate-800/80 px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
                      <Activity size={12} className="text-cyan-400" /> Pointers:
                    </span>
                    {currentStepTrace.changes.map((ch) => (
                      <span
                        key={ch.name}
                        className={cn(
                          "px-2 py-0.5 rounded font-mono text-[10px] border whitespace-nowrap",
                          ch.changed
                            ? "bg-cyan-950/80 border-cyan-500/40 text-cyan-300 font-bold"
                            : "bg-slate-900/80 border-slate-800 text-slate-400"
                        )}
                      >
                        {ch.name}: {ch.curr !== undefined ? ch.curr : "null"}
                        {ch.changed && ch.prev !== undefined && (
                          <span className="text-cyan-400/80 ml-1">
                            (was {ch.prev})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("trace")}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium shrink-0 flex items-center gap-0.5 hover:underline"
                  >
                    <span>Full Trace</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              )}
            </div>

            {/* Array Visualization Grid with Heatmap Overlay */}
            <div className="flex-1 flex flex-col items-center justify-center my-3">
              {frame.array && frame.array.length > 0 ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="flex flex-wrap justify-center gap-2.5 max-w-full">
                    {frame.array.map((val, idx) => {
                      const isHighlighted =
                        frame.highlightIndices?.includes(idx);
                      const pointersHere = Object.entries(frame.pointers || {})
                        .filter(([_, ptrIdx]) => ptrIdx === idx)
                        .map(([name]) => name);

                      const accessCount = accessCounts[idx] || 0;
                      const accessRatio =
                        maxAccessCount > 0 ? accessCount / maxAccessCount : 0;

                      // Determine Heatmap color & glow styling
                      let heatClass =
                        "border-slate-700 bg-slate-800/90 text-slate-100 font-semibold";
                      let heatBadge = null;

                      if (showHeatmap && accessCount > 0 && !isHighlighted) {
                        if (accessCount >= 4 || accessRatio >= 0.7) {
                          // High heat (critical cycle consumption / inner loop hotspots)
                          heatClass =
                            "border-red-500 bg-gradient-to-t from-red-950/80 via-orange-950/50 to-red-900/30 text-white font-bold shadow-[0_0_18px_rgba(239,68,68,0.45)] ring-1 ring-red-500/40";
                          heatBadge = (
                            <span className="text-[9px] font-mono font-bold text-red-300 bg-red-950/90 border border-red-500/50 px-1 rounded shadow-sm">
                              🔥{accessCount}x
                            </span>
                          );
                        } else if (accessCount >= 2 || accessRatio >= 0.35) {
                          // Medium heat
                          heatClass =
                            "border-amber-500/70 bg-amber-950/40 text-amber-100 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.25)]";
                          heatBadge = (
                            <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-500/50 px-1 rounded shadow-sm">
                              🔥{accessCount}x
                            </span>
                          );
                        } else {
                          // Low / mild heat
                          heatClass =
                            "border-emerald-500/50 bg-emerald-950/30 text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.15)]";
                          heatBadge = (
                            <span className="text-[9px] font-mono font-medium text-emerald-400 bg-slate-950/90 border border-emerald-500/30 px-1 rounded shadow-sm">
                              {accessCount}x
                            </span>
                          );
                        }
                      }

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-1.5"
                        >
                          {/* Pointers Top Label */}
                          <div className="min-h-6 flex items-end justify-center flex-wrap gap-1">
                            {pointersHere.map((ptr) => (
                              <div
                                key={ptr}
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-sm whitespace-nowrap",
                                  getPointerBadgeStyle(ptr)
                                )}
                              >
                                {ptr}↓
                              </div>
                            ))}
                          </div>

                          {/* Slot Box with Heatmap & Highlight */}
                          <div
                            className={cn(
                              "w-14 h-14 relative flex items-center justify-center rounded-lg border-2 font-mono text-base transition-all duration-300 select-none shadow-sm",
                              isHighlighted
                                ? "border-emerald-400 bg-emerald-500/30 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.45)] scale-110 font-bold z-10"
                                : val === null || val === undefined
                                ? "border-slate-800 border-dashed bg-slate-950/60 text-slate-600"
                                : heatClass
                            )}
                          >
                            {/* Access count badge */}
                            {showHeatmap && heatBadge && (
                              <div className="absolute -top-2.5 -right-2 z-10">
                                {heatBadge}
                              </div>
                            )}

                            {val !== null && val !== undefined
                              ? String(val)
                              : ""}
                          </div>

                          {/* Index Bottom Label */}
                          <div className="text-[11px] font-mono text-slate-500 font-medium">
                            [{idx}]
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Heatmap Legend */}
                  {showHeatmap && (
                    <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-400 bg-slate-950/70 border border-slate-800/80 px-3 py-1.5 rounded-full font-mono">
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <Flame size={12} className="text-orange-400" /> Access
                        Heatmap:
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-700"></span>{" "}
                        0x (Cold)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                        1x (Low)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>{" "}
                        2-3x (Warm)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>{" "}
                        4+x (Critical Churn)
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-600 text-sm font-mono italic">
                  Run code to view memory allocation...
                </div>
              )}
            </div>

            {/* Local Variables & Offsets Table */}
            {frame.variables && Object.keys(frame.variables).length > 0 && (
              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3.5 mt-auto">
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{" "}
                  Runtime Variables & Offsets
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(frame.variables).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between font-mono text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800/60 rounded"
                    >
                      <span className="text-slate-400 truncate mr-2">{k}:</span>
                      <span className="text-emerald-400 font-semibold truncate">
                        {String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : activeTab === "trace" ? (
          /* Chronological Pointer Trace Log View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Trace Header & Filter */}
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg mb-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Activity size={15} />
                  <span>Chronological Pointer Execution Log</span>
                </div>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {frames.length} Total Steps • {allKnownPointers.length} Active
                  Pointer(s)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setTraceFilterChangesOnly(!traceFilterChangesOnly)
                  }
                  className={cn(
                    "text-[10px] font-medium px-2 py-1 rounded border transition-colors",
                    traceFilterChangesOnly
                      ? "bg-cyan-950 border-cyan-500/50 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {traceFilterChangesOnly
                    ? "Showing Movements Only"
                    : "Show All Steps"}
                </button>
              </div>
            </div>

            {/* Trace Step Rows */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {pointerTrace
                .filter(
                  (step) => !traceFilterChangesOnly || step.hasPointerMovement
                )
                .map((step) => {
                  const isCurrent = step.frameIndex === currentFrameIdx;

                  return (
                    <div
                      key={step.step}
                      id={`trace-step-${step.step}`}
                      onClick={() => setCurrentFrameIdx(step.frameIndex)}
                      className={cn(
                        "p-3 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        isCurrent
                          ? "bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                      )}
                    >
                      {/* Left: Step number & description */}
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <div
                          className={cn(
                            "w-7 h-7 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 border",
                            isCurrent
                              ? "bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-sm"
                              : "bg-slate-900 text-slate-300 border-slate-800"
                          )}
                        >
                          #{step.step}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {step.description}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                                Current Frame
                              </span>
                            )}
                          </div>

                          {/* Highlighted index info */}
                          {step.highlightIndices.length > 0 && (
                            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                              <span className="text-slate-500">Access:</span>
                              {step.highlightIndices.map((idx) => (
                                <span
                                  key={idx}
                                  className="text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-500/30"
                                >
                                  Index [{idx}] (
                                  {step.arraySnapshot[idx] !== undefined
                                    ? String(step.arraySnapshot[idx])
                                    : "null"}
                                  )
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Pointers state and delta changes */}
                      <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
                        {step.changes.map((ch) => (
                          <div
                            key={ch.name}
                            className={cn(
                              "px-2 py-1 rounded text-xs font-mono flex items-center gap-1 border",
                              ch.changed
                                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            )}
                          >
                            <span className="font-semibold">{ch.name}:</span>
                            <span>
                              {ch.curr !== undefined ? ch.curr : "null"}
                            </span>
                            {ch.changed && ch.prev !== undefined && (
                              <span className="text-[10px] text-emerald-400 font-normal">
                                ({ch.prev} → {ch.curr}
                                {ch.delta !== undefined && (
                                  <span className="ml-0.5 font-bold">
                                    {ch.delta > 0 ? `+${ch.delta}` : ch.delta}
                                  </span>
                                )}
                                )
                              </span>
                            )}
                          </div>
                        ))}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentFrameIdx(step.frameIndex);
                            setActiveTab("memory");
                          }}
                          className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 ml-1 transition-colors"
                          title="View this step in Memory State"
                        >
                          Inspect Step
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : activeTab === "terminal" ? (
          /* Terminal Output View */
          <div className="flex-1 flex flex-col bg-black rounded-lg border border-slate-800 p-4 font-mono text-sm overflow-hidden shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                Console Standard Output (stdout)
              </span>
              <span>g++ C++17</span>
            </div>
            <pre className="flex-1 overflow-auto text-emerald-400 whitespace-pre-wrap leading-relaxed text-xs">
              {stdout ? (
                stdout
              ) : (
                <span className="text-slate-600 italic">
                  No output yet. Click "Run & Visualize" to execute the program.
                </span>
              )}
            </pre>
          </div>
        ) : (
          /* Time Complexity Analysis Tab */
          <div className="flex-1 flex flex-col overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Submitted Complexity Card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    Your Submitted Solution
                  </div>
                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-3xl font-mono font-bold text-white">
                      {submittedTimeComplexity || "O(?)"}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-semibold border",
                        timeComplexityStatus === "optimal"
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                          : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      )}
                    >
                      {timeComplexityStatus === "optimal"
                        ? "Optimal Performance"
                        : "Suboptimal / Unverified"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {timeComplexityAnalysis ||
                      "Execute your code to track and analyze runtime time complexity."}
                  </p>
                </div>
              </div>

              {/* Optimal Algorithm Card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Optimal Target Algorithm
                  </div>
                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-3xl font-mono font-bold text-emerald-400">
                      {optimalTimeComplexity || "O(1)"}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold border bg-emerald-950/50 border-emerald-500/30 text-emerald-300">
                      Benchmark
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    The theoretical lowest asymptotic time bound attainable for
                    this algorithmic problem.
                  </p>
                </div>
              </div>
            </div>

            {/* Big O Spectrum Bar */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Info size={14} className="text-purple-400" />
                Big-O Hierarchy Scale
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {complexityScales.map((scale) => {
                  const isSubmitted = submittedTimeComplexity === scale.label;
                  const isOptimal = optimalTimeComplexity === scale.label;

                  return (
                    <div
                      key={scale.label}
                      className={cn(
                        "p-2.5 rounded-lg border text-center transition-all relative flex flex-col items-center justify-center",
                        isSubmitted && isOptimal
                          ? "bg-emerald-950/60 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                          : isSubmitted
                          ? "bg-amber-950/60 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                          : isOptimal
                          ? "bg-blue-950/50 border-blue-400/80"
                          : "bg-slate-900 border-slate-800/80 opacity-70"
                      )}
                    >
                      <div className="font-mono text-sm font-bold text-slate-100">
                        {scale.label}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {scale.name}
                      </div>

                      {/* Badges for pointers */}
                      <div className="flex flex-col gap-1 mt-1.5 w-full">
                        {isOptimal && (
                          <span className="text-[9px] font-bold py-0.5 px-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            ★ Target
                          </span>
                        )}
                        {isSubmitted && (
                          <span
                            className={cn(
                              "text-[9px] font-bold py-0.5 px-1 rounded border",
                              isOptimal
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            )}
                          >
                            ✓ Your Code
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
