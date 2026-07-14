import React from 'react';
import { Shield, Hammer, Info, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/60 pb-12 pt-8 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-slate-800 pb-8">
          <div>
            <h4 className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-3">
              Editorial Purpose
            </h4>
            <p className="text-slate-400 leading-relaxed">
              V-Max Spec is a technical journal and dynamic simulation workshop dedicated to analyzing the world’s most expensive, rare, and high-performance supercars.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-3">
              Telemetry Engines
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Physics simulation runs utilize standard mechanics formulas, accounting for drag coefficient quadratic curves, mass vectoring, and hybrid system launch torque factors.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-3">
              Intelligence
            </h4>
            <p className="text-slate-400 leading-relaxed">
              The Gearhead AI consultation terminal utilizes grounded server-side Gemini intelligence models to answer specialized engineering queries.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-sans font-black tracking-wider uppercase bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              V-Max Spec
            </span>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-[10px]">© 2026 Telemetry Lab</span>
          </div>

          <div className="flex space-x-6">
            <span className="flex items-center space-x-1 hover:text-slate-300 cursor-pointer">
              <Shield className="h-3.5 w-3.5" />
              <span>Grounded specs</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-slate-300 cursor-pointer">
              <Hammer className="h-3.5 w-3.5" />
              <span>Physics Engine v2.5</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
