import React, { useState, useEffect, useMemo } from "react";
import { modulesData } from "./data/modules";
import { Module, Task, SimulationFrame, TaskDifficulty } from "./types";
import CodeSandbox from "./components/CodeSandbox";
import VisualSimulator from "./components/VisualSimulator";
import Chatbot from "./components/Chatbot";
import StudyDocs from "./components/StudyDocs";
import MasteryProgressChart, {
  ProgressHistoryEntry,
} from "./components/MasteryProgressChart";
import { ExecutionResult } from "./lib/cppInterpreter";
import {
  BookOpen,
  Code2,
  Trophy,
  FileText,
  CheckCircle2,
  Filter,
  Gauge,
  Sparkles,
  BarChart3,
  Keyboard,
  X,
} from "lucide-react";
import { cn } from "./lib/utils";

export default function App() {
  const [activeTab, setActiveTab] = useState<"learn" | "summarize">("learn");
  const [activeModule, setActiveModule] = useState<Module>(modulesData[0]);
  const [activeTask, setActiveTask] = useState<Task>(modulesData[0].tasks[0]);
  const [difficultyFilter, setDifficultyFilter] = useState<
    "All" | TaskDifficulty
  >("All");
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const [shortcutToast, setShortcutToast] = useState<string | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<SimulationFrame[]>([]);
  const [currentStdout, setCurrentStdout] = useState<string>("");
  const [currentFeedback, setCurrentFeedback] = useState<string | null>(null);
  const [isGoalAchieved, setIsGoalAchieved] = useState<boolean>(false);

  // Time complexity state
  const [submittedTimeComplexity, setSubmittedTimeComplexity] =
    useState<string>(modulesData[0].tasks[0].optimalTimeComplexity);
  const [optimalTimeComplexity, setOptimalTimeComplexity] = useState<string>(
    modulesData[0].tasks[0].optimalTimeComplexity
  );
  const [timeComplexityStatus, setTimeComplexityStatus] = useState<
    "optimal" | "suboptimal" | "unknown"
  >("optimal");
  const [timeComplexityAnalysis, setTimeComplexityAnalysis] = useState<string>(
    modulesData[0].tasks[0].complexityNotes || ""
  );

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("completedTasks");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [progressHistory, setProgressHistory] = useState<
    ProgressHistoryEntry[]
  >(() => {
    try {
      const saved = localStorage.getItem("progressHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [chatbotPrompt, setChatbotPrompt] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(Array.from(completedTasks))
    );
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Keep progress history updated as tasks are completed
  useEffect(() => {
    const today = new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    setProgressHistory((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.date === today) {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          completedCount: completedTasks.size,
          timestamp: Date.now(),
        };
        try {
          localStorage.setItem("progressHistory", JSON.stringify(updated));
        } catch {}
        return updated;
      } else {
        const next = [
          ...prev,
          {
            date: today,
            timestamp: Date.now(),
            completedCount: completedTasks.size,
          },
        ];
        try {
          localStorage.setItem("progressHistory", JSON.stringify(next));
        } catch {}
        return next;
      }
    });
  }, [completedTasks.size]);

  // Global Keyboard Shortcuts: Ctrl+D, Ctrl+Enter, Ctrl+Shift+L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // 1. Ctrl+D (or Cmd+D): Toggle between Interactive Labs and Study Docs
      if (
        isCtrlOrCmd &&
        (e.key === "d" || e.key === "D") &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setActiveTab((prev) => {
          const nextTab = prev === "learn" ? "summarize" : "learn";
          setShortcutToast(
            `Switched to ${
              nextTab === "learn" ? "Interactive Labs" : "Study Docs"
            } (Ctrl+D)`
          );
          setTimeout(() => setShortcutToast(null), 2200);
          return nextTab;
        });
        return;
      }

      // 2. Ctrl+Enter: Run and visualize code in sandbox
      if (isCtrlOrCmd && e.key === "Enter") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("app:run-code"));
        return;
      }

      // 3. Ctrl+Shift+L: Clear editor
      if (isCtrlOrCmd && e.shiftKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("app:clear-code"));
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Support shared task and code solution URLs (?task=...&code=...)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const sharedTaskId = searchParams.get("task");
      const sharedCodeParam = searchParams.get("code");

      if (sharedTaskId) {
        for (const mod of modulesData) {
          const matched = mod.tasks.find((t) => t.id === sharedTaskId);
          if (matched) {
            setActiveTab("learn");
            setActiveModule(mod);

            let restoredCode = matched.initialCode;
            if (sharedCodeParam) {
              try {
                restoredCode = decodeURIComponent(atob(sharedCodeParam));
              } catch {
                try {
                  restoredCode = decodeURIComponent(sharedCodeParam);
                } catch {
                  restoredCode = sharedCodeParam;
                }
              }
            }

            const customTask: Task = {
              ...matched,
              initialCode: restoredCode,
            };

            handleSelectTask(customTask);
            setShortcutToast(`Loaded shared solution: "${matched.title}"`);
            setTimeout(() => setShortcutToast(null), 3500);
            break;
          }
        }
      }
    } catch (err) {
      console.error("Failed to parse shared task URL:", err);
    }
  }, []);

  // Difficulty counts
  const difficultyCounts = useMemo(() => {
    let all = 0;
    let beginner = 0;
    let intermediate = 0;
    let advanced = 0;

    for (const mod of modulesData) {
      for (const t of mod.tasks) {
        all++;
        if (t.difficulty === "Beginner") beginner++;
        else if (t.difficulty === "Intermediate") intermediate++;
        else if (t.difficulty === "Advanced") advanced++;
      }
    }
    return {
      All: all,
      Beginner: beginner,
      Intermediate: intermediate,
      Advanced: advanced,
    };
  }, []);

  const filteredModules = useMemo(() => {
    return modulesData
      .map((mod) => {
        const tasks = mod.tasks.filter(
          (t) => difficultyFilter === "All" || t.difficulty === difficultyFilter
        );
        return {
          ...mod,
          tasks,
        };
      })
      .filter((mod) => mod.tasks.length > 0);
  }, [difficultyFilter]);

  const handleSelectTask = (task: Task) => {
    setActiveTask(task);
    setIsRunning(false);
    setCurrentFrames([]);
    setCurrentStdout("");
    setCurrentFeedback(null);
    setIsGoalAchieved(false);
    setOptimalTimeComplexity(task.optimalTimeComplexity);
    setSubmittedTimeComplexity("");
    setTimeComplexityStatus("optimal");
    setTimeComplexityAnalysis(
      task.complexityNotes ||
        "Benchmark optimal complexity for this algorithmic challenge."
    );
  };

  const handleSelectModule = (mod: Module) => {
    setActiveModule(mod);
    const availableTasks = mod.tasks.filter(
      (t) => difficultyFilter === "All" || t.difficulty === difficultyFilter
    );
    if (availableTasks.length > 0) {
      handleSelectTask(availableTasks[0]);
    } else if (mod.tasks.length > 0) {
      handleSelectTask(mod.tasks[0]);
    }
  };

  const handleExecuteResult = (result: ExecutionResult) => {
    setIsRunning(true);
    setCurrentFrames(result.frames);
    setCurrentStdout(result.stdout);
    setCurrentFeedback(result.goalFeedback || null);
    setIsGoalAchieved(result.isTaskGoalAchieved);

    if (result.submittedTimeComplexity) {
      setSubmittedTimeComplexity(result.submittedTimeComplexity);
    }
    if (result.optimalTimeComplexity) {
      setOptimalTimeComplexity(result.optimalTimeComplexity);
    }
    if (result.timeComplexityStatus) {
      setTimeComplexityStatus(result.timeComplexityStatus);
    }
    if (result.timeComplexityAnalysis) {
      setTimeComplexityAnalysis(result.timeComplexityAnalysis);
    }

    if (result.isTaskGoalAchieved) {
      setCompletedTasks((prev) => {
        const newSet = new Set(prev);
        newSet.add(activeTask.id);
        return newSet;
      });
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentFrames([]);
    setCurrentStdout("");
    setCurrentFeedback(null);
    setIsGoalAchieved(false);
    setSubmittedTimeComplexity("");
    setTimeComplexityStatus("optimal");
    setTimeComplexityAnalysis(activeTask.complexityNotes || "");
  };

  const handleRequestAI = (prompt: string) => {
    setChatbotPrompt(prompt);
  };

  const handleNavigateFromGlossary = (moduleId: string, taskId?: string) => {
    const targetModule = modulesData.find((m) => m.id === moduleId);
    if (targetModule) {
      setActiveModule(targetModule);
      if (taskId) {
        const targetTask = targetModule.tasks.find((t) => t.id === taskId);
        if (targetTask) {
          handleSelectTask(targetTask);
          if (
            difficultyFilter !== "All" &&
            targetTask.difficulty !== difficultyFilter
          ) {
            setDifficultyFilter("All");
          }
        } else {
          handleSelectTask(targetModule.tasks[0]);
        }
      } else {
        handleSelectTask(targetModule.tasks[0]);
      }
      setActiveTab("learn");
    }
  };

  const getDifficultyBadge = (difficulty: TaskDifficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Intermediate":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Advanced":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans relative">
      {/* Toast for Global Shortcut (Ctrl+D) */}
      {shortcutToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-blue-500/50 text-slate-100 text-xs px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Keyboard size={14} className="text-blue-400" />
          <span>{shortcutToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
            <Code2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Data Structures & Array Mastery
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Main Navigation Tabs with Shortcut Badge */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700/50">
            <button
              id="nav-interactive-labs"
              onClick={() => setActiveTab("learn")}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                activeTab === "learn"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Interactive Labs
            </button>
            <button
              id="nav-study-docs"
              onClick={() => setActiveTab("summarize")}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                activeTab === "summarize"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <FileText size={16} />
              <span>Study Docs & Glossary</span>
            </button>
            <div
              className="hidden sm:flex items-center ml-1 pl-2 border-l border-slate-700/70 text-[10px] text-slate-400 font-mono"
              title="Shortcut to toggle views: Ctrl+D"
            >
              <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-slate-300">
                Ctrl+D
              </kbd>
            </div>
          </div>

          {/* Progress & Mastery Chart Trigger Button */}
          <button
            id="btn-open-progress-chart"
            onClick={() => setShowProgressModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 rounded-full transition-all group shadow-sm text-xs cursor-pointer"
            title="Open Progress & Mastery Visualization Chart"
          >
            <Trophy
              size={15}
              className="text-yellow-400 group-hover:scale-110 transition-transform"
            />
            <span className="font-medium text-slate-300">
              {completedTasks.size} Tasks
            </span>
            <BarChart3 size={13} className="text-blue-400 ml-0.5" />
          </button>
        </div>
      </header>

      {/* Fullscreen / Modal Progress Analytics View */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              id="btn-close-progress-modal"
              onClick={() => setShowProgressModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-blue-400" size={20} />
                Mastery & Learning Progress Overview
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing completion rates, module achievements, and mastery
                percentages across algorithm domains.
              </p>
            </div>

            <MasteryProgressChart
              modules={modulesData}
              completedTasks={completedTasks}
              history={progressHistory}
              compact={false}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === "learn" ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Modules List */}
          <aside className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col overflow-y-auto shrink-0">
            <div className="p-5 flex flex-col gap-4">
              {/* Progress & Mastery Chart (In Sidebar) */}
              <div className="p-1">
                <MasteryProgressChart
                  modules={modulesData}
                  completedTasks={completedTasks}
                  history={progressHistory}
                  compact={true}
                />
              </div>

              {/* Difficulty Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Filter size={13} className="text-blue-400" /> Filter by
                    Difficulty
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-lg">
                  {(
                    ["All", "Beginner", "Intermediate", "Advanced"] as const
                  ).map((diff) => (
                    <button
                      key={diff}
                      id={`filter-${diff.toLowerCase()}`}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium flex items-center justify-between transition-colors",
                        difficultyFilter === diff
                          ? "bg-slate-800 text-white shadow-sm font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      )}
                    >
                      <span>{diff}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/60 font-mono">
                        {difficultyCounts[diff]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules & Tasks Navigation */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <BookOpen size={14} /> Curriculum ({filteredModules.length}{" "}
                  Modules)
                </h3>
                <div className="flex flex-col gap-2">
                  {filteredModules.length === 0 ? (
                    <div className="text-xs text-slate-500 italic p-3 bg-slate-950/50 rounded-lg text-center border border-slate-800/60">
                      No tasks found for "{difficultyFilter}" difficulty.
                    </div>
                  ) : (
                    filteredModules.map((mod) => (
                      <div key={mod.id} className="flex flex-col">
                        <button
                          onClick={() => handleSelectModule(mod)}
                          className={cn(
                            "text-left p-2.5 rounded-lg border transition-all flex items-center justify-between",
                            activeModule.id === mod.id
                              ? "bg-blue-950/30 border-blue-500/40 text-blue-300"
                              : "bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                          )}
                        >
                          <span className="font-semibold text-xs leading-snug">
                            {mod.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono ml-1">
                            {mod.tasks.length}
                          </span>
                        </button>

                        {activeModule.id === mod.id && (
                          <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l-2 border-slate-800 pl-2.5">
                            {mod.tasks.map((task) => (
                              <button
                                key={task.id}
                                id={`task-${task.id}`}
                                onClick={() => handleSelectTask(task)}
                                className={cn(
                                  "text-left text-xs py-2 px-2.5 rounded flex items-center justify-between transition-colors border",
                                  activeTask.id === task.id
                                    ? "bg-slate-800/90 text-white font-medium border-slate-700 shadow-sm"
                                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                                )}
                              >
                                <div className="flex flex-col min-w-0 pr-2">
                                  <span className="truncate font-medium">
                                    {task.title}
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span
                                      className={cn(
                                        "text-[9px] px-1.5 py-0.2 rounded border font-semibold",
                                        getDifficultyBadge(task.difficulty)
                                      )}
                                    >
                                      {task.difficulty}
                                    </span>
                                    <span className="text-[9px] font-mono text-slate-500">
                                      {task.optimalTimeComplexity}
                                    </span>
                                  </div>
                                </div>
                                {completedTasks.has(task.id) && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Editor & Visualizer Panel */}
          <main className="flex-1 flex flex-col p-6 gap-4 overflow-hidden">
            {/* Task Header Info */}
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 bg-slate-900/40 border border-slate-800/80 p-3.5 rounded-xl">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">
                    {activeTask.title}
                  </h2>
                  <span
                    className={cn(
                      "text-xs px-2.5 py-0.5 rounded-full border font-semibold",
                      getDifficultyBadge(activeTask.difficulty)
                    )}
                  >
                    {activeTask.difficulty}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono font-medium flex items-center gap-1">
                    <Gauge size={12} /> Target:{" "}
                    {activeTask.optimalTimeComplexity}
                  </span>
                  {completedTasks.has(activeTask.id) && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium">
                      <CheckCircle2 size={13} /> Completed
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs max-w-3xl leading-relaxed">
                  {activeTask.description}
                </p>
              </div>
            </div>

            {/* Split Screen: Code Editor & Visual Simulator */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">
              <div className="min-h-0 h-full">
                <CodeSandbox
                  taskId={activeTask.id}
                  initialCode={activeTask.initialCode}
                  solutionCode={activeTask.solutionCode}
                  solutionRegex={activeTask.solutionRegex}
                  taskTitle={activeTask.title}
                  taskDescription={activeTask.description}
                  onExecuteResult={handleExecuteResult}
                  onReset={handleReset}
                  onRequestAI={handleRequestAI}
                />
              </div>
              <div className="min-h-0 h-full">
                <VisualSimulator
                  frames={currentFrames}
                  isRunning={isRunning}
                  stdout={currentStdout}
                  feedback={currentFeedback}
                  isGoalAchieved={isGoalAchieved}
                  submittedTimeComplexity={submittedTimeComplexity}
                  optimalTimeComplexity={optimalTimeComplexity}
                  timeComplexityStatus={timeComplexityStatus}
                  timeComplexityAnalysis={timeComplexityAnalysis}
                />
              </div>
            </div>

            {/* Personal Notes Section */}
            <div className="shrink-0 pt-2 border-t border-slate-800/80">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                <FileText size={14} className="text-blue-400" /> Personal Notes
                & Key Takeaways
              </label>
              <textarea
                value={notes[activeTask.id] || ""}
                onChange={(e) =>
                  setNotes({ ...notes, [activeTask.id]: e.target.value })
                }
                placeholder="Jot down key takeaways, reminders, or insights for this task (auto-saved to your browser)..."
                className="w-full h-16 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 resize-y transition-colors"
              />
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full h-full overflow-hidden">
          <StudyDocs onNavigateToTask={handleNavigateFromGlossary} />
        </div>
      )}

      {/* Floating AI Chatbot */}
      <Chatbot
        externalPrompt={chatbotPrompt}
        onPromptHandled={() => setChatbotPrompt(null)}
      />
    </div>
  );
}
