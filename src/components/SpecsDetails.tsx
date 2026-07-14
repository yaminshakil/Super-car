import React, { useState } from 'react';
import { CarData } from '../types';
import { ArrowLeft, Sparkles, Cpu, Image, Newspaper, ShieldAlert, DollarSign, Calendar, MapPin, Gauge, Zap } from 'lucide-react';

interface SpecsDetailsProps {
  car: CarData;
  onBack: () => void;
  onToggleCompare: (car: CarData) => void;
  isComparing: boolean;
}

export default function SpecsDetails({ car, onBack, onToggleCompare, isComparing }: SpecsDetailsProps) {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'editorial' | 'gallery'>('blueprint');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Format price helper
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 transition-all duration-300">
      {/* Back button and basic header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-mono tracking-widest uppercase text-xs">Back to encyclopedia</span>
        </button>

        <button
          onClick={() => onToggleCompare(car)}
          className={`rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
            isComparing
              ? 'bg-amber-500/10 border border-amber-500 text-amber-400'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold'
          }`}
        >
          {isComparing ? 'Selected for Comparison' : 'Queue for Comparison'}
        </button>
      </div>

      {/* Main hero showcase banner */}
      <div className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[380px] bg-slate-950 border border-slate-800 mb-8">
        <img
          src={car.gallery[activeGalleryIndex] || car.image}
          alt={`${car.brand} ${car.name}`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">{car.brand}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">{car.origin}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 uppercase">
              {car.name}
            </h1>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-xl px-5 py-3 backdrop-blur-md">
            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Estimated Value</div>
            <div className="font-sans text-xl sm:text-2xl font-extrabold text-amber-400">{formattedPrice}</div>
          </div>
        </div>
      </div>

      {/* Showroom Tabs Navigation */}
      <div className="flex border-b border-slate-800 mb-8">
        {[
          { id: 'blueprint', name: 'Technical Blueprint', icon: Cpu },
          { id: 'editorial', name: 'Editorial Review', icon: Newspaper },
          { id: 'gallery', name: 'High-Def Gallery', icon: Image },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                isActive
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden xs:inline">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Engineering highlight panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-3">Chassis & Power Overview</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{car.overview}</p>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
                  Structural Core
                </span>
                <p className="text-slate-200 font-mono text-xs">{car.specs.chassis}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-3">Mechanical Innovation</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{car.engineeringHighlight}</p>
            </div>
          </div>

          {/* Specs Details list */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-6">
              <h3 className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
                Full Technical Specifications
              </h3>

              <div className="space-y-3">
                {[
                  { label: 'Powertrain', value: car.specs.engine },
                  { label: 'Displacement', value: car.specs.displacement },
                  { label: 'Total Output', value: `${car.specs.power} HP` },
                  { label: 'Peak Torque', value: `${car.specs.torque} lb-ft` },
                  { label: 'Engine Redline', value: `${car.specs.redline.toLocaleString()} RPM` },
                  { label: 'Transmission', value: car.specs.transmission },
                  { label: 'Drivetrain', value: car.specs.drivetrain },
                  { label: 'Acceleration 0-60', value: `${car.specs.zeroToSixty}s` },
                  { label: 'V-Max Top Speed', value: `${car.specs.topSpeed} MPH` },
                  { label: 'Curb Weight', value: `${car.specs.weight.toLocaleString()} lbs` },
                  { label: 'Power-to-Weight', value: car.specs.powerToWeight },
                  { label: 'Braking Package', value: car.specs.brakes },
                  { label: 'Production Limits', value: `Only ${car.specs.productionLimit} worldwide` },
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-slate-800/40 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{spec.label}</span>
                    <span className="font-sans text-sm font-medium text-slate-200 mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'editorial' && (
        <div className="max-w-3xl mx-auto rounded-xl border border-slate-800 bg-slate-900/10 p-6 sm:p-10">
          <div className="text-center mb-8 border-b border-slate-800 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight mb-3">
              {car.article.title}
            </h2>
            <div className="flex items-center justify-center space-x-4 text-xs font-mono text-slate-500">
              <span>BY {car.article.author.toUpperCase()}</span>
              <span>•</span>
              <span>{car.article.publishDate.toUpperCase()}</span>
              <span>•</span>
              <span className="text-amber-500">{car.article.readTime.toUpperCase()}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-4">
            {car.article.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-amber-400 mt-6 mb-2 font-sans tracking-tight">
                    {trimmed.substring(4)}
                  </h3>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl font-bold text-amber-300 mt-8 mb-4 border-b border-slate-800 pb-2">
                    {trimmed.substring(3)}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify mb-4">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {car.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border transition-all duration-300 ${
                  activeGalleryIndex === idx
                    ? 'border-amber-500 ring-2 ring-amber-500/20 scale-[0.98]'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {activeGalleryIndex === idx && (
                  <div className="absolute inset-0 bg-amber-500/5 flex items-center justify-center">
                    <span className="bg-slate-950/80 rounded px-2 py-0.5 font-mono text-[9px] text-amber-400 uppercase font-bold border border-amber-500/20">
                      Active
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 text-center">
            <p className="font-mono text-xs text-slate-400">
              Click any picture thumbnail to load it into the primary showroom spotlight frame above. All pictures are full quality high-dynamic renders.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
