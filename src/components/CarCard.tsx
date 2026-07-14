import React from 'react';
import { CarData } from '../types';
import { Sparkles, Gauge, Zap, Plus, Check } from 'lucide-react';

interface CarCardProps {
  car: CarData;
  onViewDetails: (car: CarData) => void;
  onToggleCompare: (car: CarData) => void;
  isComparing: boolean;
}

export default function CarCard({ car, onViewDetails, onToggleCompare, isComparing }: CarCardProps) {
  // Format price helper
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-mono tracking-wider text-amber-400 uppercase border border-slate-800">
          {car.category.replace('-', ' ')}
        </span>

        {/* Rarity Label */}
        <span className="absolute top-3 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-mono font-bold tracking-tight text-slate-950 uppercase">
          1 of {car.specs.productionLimit}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">{car.brand}</span>
            <span className="font-mono text-xs font-bold text-slate-300">{car.specs.powerToWeight}</span>
          </div>
          <h3 className="font-sans text-xl font-bold tracking-tight text-slate-100 group-hover:text-amber-300 transition-colors duration-200">
            {car.name}
          </h3>

          <p className="font-mono text-lg font-extrabold text-slate-100 mt-2">
            {formattedPrice}
          </p>

          <p className="text-slate-400 text-xs line-clamp-2 mt-3 leading-relaxed">
            {car.overview}
          </p>
        </div>

        {/* Performance Quick Badges */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center p-2 rounded bg-slate-950/40 border border-slate-800/40">
            <Zap className="h-3.5 w-3.5 text-amber-400 mb-1" />
            <span className="font-mono text-xs font-bold text-slate-200">{car.specs.power} HP</span>
            <span className="font-mono text-[9px] text-slate-500 uppercase">Power</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded bg-slate-950/40 border border-slate-800/40">
            <Gauge className="h-3.5 w-3.5 text-amber-400 mb-1" />
            <span className="font-mono text-xs font-bold text-slate-200">{car.specs.topSpeed} MPH</span>
            <span className="font-mono text-[9px] text-slate-500 uppercase">V-Max</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded bg-slate-950/40 border border-slate-800/40">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 mb-1" />
            <span className="font-mono text-xs font-bold text-slate-200">{car.specs.zeroToSixty}s</span>
            <span className="font-mono text-[9px] text-slate-500 uppercase">0-60 MPH</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-5 flex space-x-2.5">
          <button
            onClick={() => onViewDetails(car)}
            className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 transition-colors duration-200 hover:bg-slate-800 hover:text-white"
          >
            Technical Review
          </button>
          <button
            onClick={() => onToggleCompare(car)}
            className={`flex items-center justify-center rounded-lg p-2 transition-all duration-300 border ${
              isComparing
                ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title={isComparing ? 'Remove from compare' : 'Add to compare'}
          >
            {isComparing ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
