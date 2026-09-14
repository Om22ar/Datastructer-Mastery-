import React, { useState, useEffect, useCallback } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import {
  Bot,
  Lightbulb,
  Play,
  RotateCcw,
  Eye,
  Copy,
  Check,
  Trash2,
  Share2,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { executeCppCode, ExecutionResult } from '../lib/cppInterpreter';
import { formatCppCode } from '../lib/cppFormatter';
import { cn } from '../lib/utils';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css'; // dark theme

interface CodeSandboxProps {
  taskId: string;
  initialCode: string;
  solutionCode?: string;
  solutionRegex?: string;
  taskTitle: string;
  taskDescription: string;
  onExecuteResult: (result: ExecutionResult) => void;
  onReset: () => void;
  onRequestAI: (prompt: string) => void;
}

export default function CodeSandbox({
  taskId,
  initialCode,
  solutionCode,
  taskTitle,
  taskDescription,
  onExecuteResult,
  onReset,
  onRequestAI,
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [clearToast, setClearToast] = useState(false);
  const [formatToast, setFormatToast] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setError(null);
  }, [initialCode, taskId]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleFormat = useCallback(() => {
    try {
      const formatted = formatCppCode(code);
      setCode(formatted);
      setFormatToast(true);
      setTimeout(() => setFormatToast(false), 2200);
    } catch (err) {
      console.error('Failed to format code: ', err);
    }
  }, [code]);

  const handleShare = async () => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('task', taskId);
      const encodedCode = btoa(encodeURIComponent(code));
      url.searchParams.set('code', encodedCode);

      const shareUrl = url.toString();

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setIsShared(true);
      setShareToast(true);
      setTimeout(() => setIsShared(false), 2500);
      setTimeout(() => setShareToast(false), 3500);
    } catch (err) {
      console.error('Failed to copy share link: ', err);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  const handleRun = useCallback(() => {
    const result = executeCppCode(code, taskId);

    if (!result.success && result.syntaxError) {
      setError(result.syntaxError);
    } else {
      setError(null);
      onExecuteResult(result);
    }
  }, [code, taskId, onExecuteResult]);

  const handleClear = useCallback(() => {
    setCode('');
    setError(null);
    setClearToast(true);
    setTimeout(() => setClearToast(false), 2500);
  }, []);

  // Listen for Escape key to exit full screen and Shift+Alt+F to format
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
      if (e.shiftKey && e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        handleFormat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, handleFormat]);

  // Listen for custom app-level events dispatched from global keyboard shortcuts
  useEffect(() => {
    const onRunEvent = () => handleRun();
    const onClearEvent = () => handleClear();

    window.addEventListener('app:run-code', onRunEvent);
    window.addEventListener('app:clear-code', onClearEvent);

    return () => {
      window.removeEventListener('app:run-code', onRunEvent);
      window.removeEventListener('app:clear-code', onClearEvent);
    };
  }, [handleRun, handleClear]);

  const handleReveal = () => {
    if (solutionCode) {
      setCode(solutionCode);
      setError(null);
      const result = executeCppCode(solutionCode, taskId);
      onExecuteResult(result);
    }
  };

  const explainAlgorithm = () => {
    onRequestAI(
      `Can you explain the underlying algorithm for the task "${taskTitle}"? Here is the task description:\n${taskDescription}\n\nPlease provide a clear step-by-step breakdown of how it works in C++.`
    );
  };

  const explainError = () => {
    onRequestAI(
      `My C++ code for "${taskTitle}" has an issue or validation error: "${error}". Can you explain why this happens and how to fix it?\n\nCurrent code:\n\`\`\`cpp\n${code}\n\`\`\``
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col transition-all duration-200",
        isFullScreen
          ? "fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl border-0 rounded-none"
          : "h-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner relative"
      )}
    >
      {/* Full screen focus banner when active */}
      {isFullScreen && (
        <div className="bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-xs px-4 py-2 rounded-t-lg flex items-center justify-between gap-2 shrink-0 mb-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="font-semibold">Full Screen Focus Mode</span>
            <span className="text-slate-400 hidden sm:inline">— Zero sidebar distractions for C++ coding</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Press <kbd className="bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-white">Esc</kbd> to exit</span>
            <button
              onClick={() => setIsFullScreen(false)}
              className="text-xs text-indigo-300 hover:text-white bg-indigo-900/60 hover:bg-indigo-800 px-2 py-0.5 rounded transition-colors"
            >
              Exit Focus
            </button>
          </div>
        </div>
      )}

      {/* Editor Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-3.5 py-2.5 flex flex-wrap justify-between items-center gap-2 z-20 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 mr-1 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">main.cpp</span>
          {isFullScreen && (
            <span className="text-xs text-slate-300 font-medium truncate max-w-xs sm:max-w-md hidden md:inline">
              — {taskTitle}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Format Code Button */}
          <button
            id="btn-format-code"
            onClick={handleFormat}
            className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 px-2.5 py-1.5 rounded transition-colors"
            title="Auto-format C++ indentation and spacing (Shift+Alt+F)"
          >
            <Sparkles size={13} className="text-cyan-400" />
            <span>Format Code</span>
          </button>

          {/* Share Button */}
          <button
            id="btn-share-code"
            onClick={handleShare}
            className={cn(
              "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded transition-all border",
              isShared
                ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-300 font-medium"
                : "text-amber-300 hover:text-white bg-amber-950/50 hover:bg-amber-900 border-amber-500/30"
            )}
            title="Copy shareable link with your task progress and C++ solution"
          >
            {isShared ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            <span>{isShared ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Copy Code Button */}
          <button
            id="btn-copy-code"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded transition-all border ${
              isCopied
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 font-medium'
                : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border-slate-700/60'
            }`}
            title="Copy C++ code to clipboard for local development (VS Code, CLion, g++)"
          >
            {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          {/* Explain Algorithm Button */}
          <button
            id="btn-explain-algo"
            onClick={explainAlgorithm}
            className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 px-2.5 py-1.5 rounded transition-colors"
            title="Get AI step-by-step breakdown of the algorithm"
          >
            <Lightbulb size={13} />
            <span className="hidden sm:inline">Explain</span>
          </button>

          {/* Reveal Solution Button */}
          {solutionCode && (
            <button
              id="btn-reveal-solution"
              onClick={handleReveal}
              className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-white bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 px-2.5 py-1.5 rounded transition-colors"
              title="Fill in the correct standard solution"
            >
              <Eye size={13} />
              <span>Reveal</span>
            </button>
          )}

          {/* Full Screen Toggle Button */}
          <button
            id="btn-fullscreen-toggle"
            onClick={toggleFullScreen}
            className={cn(
              "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded transition-colors border",
              isFullScreen
                ? "bg-purple-950/80 border-purple-500/50 text-purple-300 font-medium"
                : "text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border-slate-700/60"
            )}
            title={isFullScreen ? "Exit Full Screen focus mode (Esc)" : "Enter Full Screen focus mode without distractions"}
          >
            {isFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          {/* Clear Button */}
          <button
            id="btn-clear-code"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-300 bg-slate-800 hover:bg-red-950/40 border border-transparent hover:border-red-500/30 px-2 py-1.5 rounded transition-colors"
            title="Clear the editor (Ctrl+Shift+L)"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Reset Button */}
          <button
            id="btn-reset-code"
            onClick={() => {
              setCode(initialCode);
              onReset();
              setError(null);
            }}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded transition-colors"
            title="Reset to initial boilerplate"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          {/* Run Button */}
          <button
            id="btn-run-code"
            onClick={handleRun}
            className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3.5 py-1.5 rounded shadow-sm transition-all group"
            title="Run and visualize any custom code (Ctrl+Enter)"
          >
            <Play size={13} className="fill-white" />
            <span>Run</span>
            <span className="hidden md:inline text-[10px] font-mono opacity-70 group-hover:opacity-100 bg-emerald-700/60 px-1 py-0.2 rounded">
              Ctrl+↵
            </span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm relative z-0">
        <Editor
          value={code}
          onValueChange={c => setCode(c)}
          highlight={c => Prism.highlight(c, Prism.languages.cpp, 'cpp')}
          padding={12}
          className="editor text-slate-200 min-h-full outline-none"
          textareaClassName="focus:outline-none"
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
            fontSize: isFullScreen ? 15 : 14,
            lineHeight: '1.6',
          }}
        />

        {/* Clear feedback toast */}
        {clearToast && (
          <div className="absolute top-4 right-4 bg-slate-900 border border-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-30">
            <Trash2 size={13} className="text-red-400" />
            <span>Editor cleared. Press <strong>Reset</strong> to restore boilerplate.</span>
          </div>
        )}

        {/* Format feedback toast */}
        {formatToast && (
          <div className="absolute top-4 right-4 bg-cyan-950 border border-cyan-500/40 text-cyan-200 text-xs px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-30">
            <Sparkles size={14} className="text-cyan-400" />
            <span>C++ Code formatted with clean indentation & spacing!</span>
          </div>
        )}

        {/* Share feedback toast */}
        {shareToast && (
          <div className="absolute top-4 right-4 bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-30">
            <Check size={14} className="text-emerald-400" />
            <span>Share URL copied! Anyone opening this link will load your exact task and C++ code.</span>
          </div>
        )}

        {/* Real Syntax/Compilation Error Overlay */}
        {error && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10 text-center animate-in fade-in duration-200">
            <div className="bg-red-950/60 text-red-300 p-4 rounded-xl mb-6 border border-red-500/40 max-w-lg shadow-xl text-left">
              <div className="flex items-center gap-2 font-bold text-red-400 mb-1">
                <span>Compilation / Syntax Error:</span>
              </div>
              <p className="text-xs font-mono text-red-200 whitespace-pre-wrap leading-relaxed">
                {error}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {solutionCode && (
                <button
                  onClick={handleReveal}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors shadow"
                >
                  Show Correct Answer
                </button>
              )}
              <button
                onClick={explainError}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors shadow"
              >
                <Bot size={15} /> Explain with AI Tutor
              </button>
              <button
                onClick={() => setError(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Close and Edit Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer Hint & Shortcut Badges */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <span>💡 Indentation, classes, pointers, & cout fully supported</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.2 rounded text-slate-300">Shift+Alt+F</kbd> Format
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.2 rounded text-slate-300">Ctrl+Enter</kbd> Run
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.2 rounded text-slate-300">Ctrl+Shift+L</kbd> Clear
          </span>
        </div>
        <span className="font-mono text-slate-400">C++17</span>
      </div>
    </div>
  );
}
