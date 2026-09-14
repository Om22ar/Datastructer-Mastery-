import React, { useState, useEffect } from 'react';
import { Bot, Lightbulb, FileText, Settings, Code, TerminalSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { ChatMessage } from '../types';

interface ChatbotProps {
  externalPrompt?: string | null;
  onPromptHandled?: () => void;
}

export default function Chatbot({ externalPrompt, onPromptHandled }: ChatbotProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', parts: [{ text: 'Hello! I am your C++ Data Structures tutor. How can I help you today?' }] }]);
  const [input, setInput] = useState('');
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      handleSend(externalPrompt);
      onPromptHandled?.();
    }
  }, [externalPrompt]);

  const handleSend = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;
    const userMsg: ChatMessage = { role: 'user', parts: [{ text: textToSend }] };
    setMessages((prev) => [...prev, userMsg]);
    if (textToSend === input) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], useHighThinking })
      });
      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: 'model', parts: [{ text: `Error: ${e.message}` }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 z-40"
      >
        <Bot size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-400" />
              <h3 className="font-semibold text-white">AI Tutor</h3>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useHighThinking} 
                  onChange={(e) => setUseHighThinking(e.target.checked)} 
                  className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                />
                Deep Thinking
              </label>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("max-w-[85%] rounded-lg p-3 text-sm", m.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-slate-800 text-slate-200 self-start border border-slate-700')}>
                {m.parts[0].text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-slate-800 text-slate-200 self-start border border-slate-700 max-w-[85%] rounded-lg p-3 text-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s'}}></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-slate-700 bg-slate-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about C++..."
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </>
  );
}
