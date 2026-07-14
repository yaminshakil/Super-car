import React from 'react';
import { Shield, Sparkles, Cpu, Flame } from 'lucide-react';

interface HeaderProps {
  activeTab: 'catalog' | 'compare' | 'drag-race' | 'ai-garage';
  setActiveTab: (tab: 'catalog' | 'compare' | 'drag-race' | 'ai-garage') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: 'catalog', name: 'Encyclopedia', icon: Shield },
    { id: 'compare', name: 'Spec Comparator', icon: Cpu },
    { id: 'drag-race', name: 'Telemetry Drag', icon: Flame },
    { id: 'ai-garage', name: 'AI Garage', icon: Sparkles },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/20">
            <Flame className="h-6 w-6 text-slate-950 animate-pulse" />
          </div>
          <div>
            <span className="font-sans text-xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-amber-200 to-slate-200 bg-clip-text text-transparent">
              V-Max Spec
            </span>
            <div className="font-mono text-[9px] tracking-widest text-amber-500 uppercase font-semibold leading-none">
              Hypercar Archive
            </div>
          </div>
        </div>

        <nav className="flex space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center space-x-1.5 rounded-lg px-3 py-2 text-xs font-medium tracking-wide transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'
                }`} />
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
