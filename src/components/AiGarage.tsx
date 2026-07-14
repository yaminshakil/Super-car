import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, RefreshCw, AlertTriangle, ShieldCheck, Terminal } from 'lucide-react';
import FormattedText from './FormattedText';

export default function AiGarage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-message',
      sender: 'assistant',
      text: `Greetings, enthusiast! Welcome to the **V-Max Spec Garage**. I am your dedicated **Gearhead AI** — a custom automotive journalist and mechanical engineer. 

I have our complete supercar specifications database loaded in my system memory. You can ask me to:
* **Simulate matchups**: "Who wins in a drag race between the Pagani Utopia and Koenigsegg Jesko Absolut?"
* **Deconstruct mechanics**: "Why does the Koenigsegg LST transmission use 7 wet clutches instead of a dual-clutch?"
* **Compare architectures**: "How does Bugatti's new Cosworth naturally aspirated V16 compare to the legendary Chiron quad-turbo W16?"
* **Audit chassis structural materials**: "What are the differences between Carbo-Titanium HP62 and standard carbon fiber?"

What engineering mysteries can we solve today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMsg;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) setInputMsg('');
    setErrorMsg('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'The Gearhead AI encountered an engine misfire.');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'The Gearhead AI could not connect to telemetry systems. Verify your GEMINI_API_KEY is configured.');
    } finally {
      setIsLoading(false);
    }
  };

  const PRESETS = [
    { label: 'Bugatti NA V16 vs. Chiron W16', query: "How does Bugatti's new Cosworth NA V16 compare to the legacy quad-turbo W16 of the Chiron?" },
    { label: 'Deconstruct Koenigsegg LST Transmission', query: "Deconstruct Koenigsegg's LST (Light Speed Transmission) in detail. Why is it mechanically superior to dual-clutch?" },
    { label: 'Explain Carbo-Titanium Compositions', query: "Explain Pagani's Carbo-Titanium composites. What makes it structurally unique compared to standard carbon monocoques?" },
    { label: 'Analyze Valkyrie F1 Venturi Tunnels', query: "Explain how Adrian Newey utilized Venturi channels on the floor of the Aston Martin Valkyrie to create massive ground-effect downforce." },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Sidebar helper instructions */}
      <div className="xl:col-span-1 space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-5">
          <h3 className="text-sm font-bold text-slate-100 mb-2 flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-amber-500" />
            <span>Consultant Parameters</span>
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            The Gearhead AI uses advanced server-side Gemini intelligence grounded directly on hypercar technical specs. No marketing buzzwords—only absolute mechanical facts, gearing telemetry, and engineering layouts.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center space-x-2 text-[11px] text-emerald-400 font-mono">
            <ShieldCheck className="h-4 w-4" />
            <span>Grounded on CARS_DATABASE</span>
          </div>
        </div>

        {/* Query Presets */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-2 px-1">
            Expert Preset Queries
          </span>
          {PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(preset.query)}
              disabled={isLoading}
              className="w-full text-left rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-300 hover:border-amber-500/40 hover:bg-slate-900/40 hover:text-slate-100 disabled:opacity-50 transition-all duration-300 block"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary chat window */}
      <div className="xl:col-span-3 rounded-xl border border-slate-800 bg-slate-950/20 backdrop-blur-sm flex flex-col h-[580px] overflow-hidden">
        {/* Chat header banner */}
        <div className="border-b border-slate-800/80 bg-slate-950/60 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="font-sans text-sm font-bold text-slate-100">Gearhead AI Specialist</span>
              <span className="font-mono text-[9px] text-slate-500 block uppercase">Telemetry Consultation Live</span>
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 rounded-tr-none font-medium'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <FormattedText text={m.text} />
                    </div>
                  )}
                  <span
                    className={`block font-mono text-[9px] mt-1.5 text-right ${
                      isUser ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Chat Loader */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-5 py-3.5 text-slate-400 text-xs flex items-center space-x-2.5 shadow-sm">
                <RefreshCw className="h-4 w-4 animate-spin text-amber-500" />
                <span className="font-mono text-[10px] uppercase">Telemetry parsing...</span>
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorMsg && (
            <div className="rounded-lg border border-red-800 bg-red-950/20 px-4 py-3 text-red-400 text-xs flex items-center space-x-2 max-w-md mx-auto">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="border-t border-slate-800/80 bg-slate-950/40 p-3 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Query about V-Max dynamics, downforce calculations, engine layouts..."
            className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500 font-sans"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMsg.trim()}
            className="rounded-lg bg-amber-500 p-2.5 text-slate-950 hover:bg-amber-400 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
