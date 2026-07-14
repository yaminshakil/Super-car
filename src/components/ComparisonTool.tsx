import React, { useState } from 'react';
import { CarData } from '../types';
import { CARS_DATABASE } from '../data/cars';
import { Cpu, Sparkles, AlertTriangle, Check, RefreshCw, Trophy, Minimize } from 'lucide-react';
import FormattedText from './FormattedText';

interface ComparisonToolProps {
  selectedCars: CarData[];
  onRemoveCar: (car: CarData) => void;
  onAddCar: (car: CarData) => void;
}

export default function ComparisonTool({ selectedCars, onRemoveCar, onAddCar }: ComparisonToolProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const generateAiAnalysis = async () => {
    if (selectedCars.length < 2) {
      setErrorMsg('Select at least 2 cars to generate a deep-dive AI comparison.');
      return;
    }

    setIsLoadingAnalysis(true);
    setErrorMsg('');
    setAnalysis('');

    try {
      const response = await fetch('/api/compare-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carIds: selectedCars.map(car => car.id) }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to fetch AI insights');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An unexpected error occurred while contacting the Gearhead AI.');
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // Compare specs helpers to highlight the "winner" of each category
  const getWinner = (field: 'power' | 'torque' | 'topSpeed' | 'zeroToSixty' | 'weight' | 'price' | 'productionLimit', mode: 'min' | 'max') => {
    if (selectedCars.length < 2) return null;
    let targetCar = selectedCars[0];
    let targetVal = field === 'zeroToSixty' || field === 'weight' || field === 'price' || field === 'productionLimit'
      ? selectedCars[0].specs[field] || selectedCars[0][field as any]
      : selectedCars[0].specs[field];

    selectedCars.forEach(car => {
      const val = field === 'zeroToSixty' || field === 'weight' || field === 'price' || field === 'productionLimit'
        ? car.specs[field] || car[field as any]
        : car.specs[field];

      if (mode === 'max' && val > targetVal) {
        targetVal = val;
        targetCar = car;
      } else if (mode === 'min' && val < targetVal) {
        targetVal = val;
        targetCar = car;
      }
    });

    return targetCar.id;
  };

  const winners = {
    power: getWinner('power', 'max'),
    torque: getWinner('torque', 'max'),
    topSpeed: getWinner('topSpeed', 'max'),
    zeroToSixty: getWinner('zeroToSixty', 'min'),
    weight: getWinner('weight', 'min'),
    price: getWinner('price', 'min'), // Cheaper is "better" for specs victory
    rarity: getWinner('productionLimit', 'min'), // Rarer is "better"
  };

  const availableToCompare = CARS_DATABASE.filter(
    car => !selectedCars.some(s => s.id === car.id)
  );

  return (
    <div className="space-y-8">
      {/* Top selection drawer */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-amber-500" />
          <span>Spec Comparator Tray</span>
        </h2>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Queue up to 3 luxury hypercars from our archive to see their full technical specifications side-by-side, find the theoretical sector winner, and tap our server-side Gemini system for an elite mechanical audit.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {CARS_DATABASE.map(car => {
            const isSelected = selectedCars.some(s => s.id === car.id);
            return (
              <button
                key={car.id}
                onClick={() => isSelected ? onRemoveCar(car) : selectedCars.length < 3 ? onAddCar(car) : null}
                className={`flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
                disabled={!isSelected && selectedCars.length >= 3}
              >
                {isSelected ? <Check className="h-3.5 w-3.5" /> : <PlusIcon />}
                <span>{car.brand} {car.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCars.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
          <Cpu className="h-12 w-12 text-slate-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-300">Tray is empty</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto mt-1.5 leading-relaxed">
            Select supercars from the list above or directly in the main encyclopedia cards to generate side-by-side specs sheets.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Comparisons Table Grid */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/20 backdrop-blur-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  <th className="py-4 px-6">Specification Profile</th>
                  {selectedCars.map(car => (
                    <th key={car.id} className="py-4 px-6 w-1/4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] text-amber-500 font-semibold leading-none mb-1">{car.brand}</span>
                          <span className="text-sm font-bold text-slate-100">{car.name}</span>
                        </div>
                        <button
                          onClick={() => onRemoveCar(car)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove car"
                        >
                          <Minimize className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {/* Image thumb */}
                <tr className="bg-slate-950/20">
                  <td className="py-4 px-6 font-mono text-xs text-slate-400 font-semibold uppercase">Showroom render</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="py-4 px-6">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Estimated Price (USD)</td>
                  {selectedCars.map(car => {
                    const isWin = winners.price === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-semibold font-mono ${isWin ? 'text-emerald-400' : 'text-slate-200'}`}>
                        ${car.price.toLocaleString()}
                        {isWin && <WinnerBadge />}
                      </td>
                    );
                  })}
                </tr>

                {/* Engine Powertrain */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Powertrain System</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="py-3 px-6 text-slate-200 leading-snug">
                      {car.specs.engine}
                    </td>
                  ))}
                </tr>

                {/* Total Output */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Total Output (HP)</td>
                  {selectedCars.map(car => {
                    const isWin = winners.power === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-bold font-mono text-base ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.power} HP
                        {isWin && <WinnerBadge label="Max Power" />}
                      </td>
                    );
                  })}
                </tr>

                {/* Torque */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Peak Torque (lb-ft)</td>
                  {selectedCars.map(car => {
                    const isWin = winners.torque === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-semibold font-mono ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.torque} lb-ft
                        {isWin && <WinnerBadge label="Max Torque" />}
                      </td>
                    );
                  })}
                </tr>

                {/* 0-60 MPH */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Acceleration (0-60 mph)</td>
                  {selectedCars.map(car => {
                    const isWin = winners.zeroToSixty === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-bold font-mono text-base ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.zeroToSixty}s
                        {isWin && <WinnerBadge label="Quickest" />}
                      </td>
                    );
                  })}
                </tr>

                {/* V-Max Top Speed */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">V-Max Top Speed</td>
                  {selectedCars.map(car => {
                    const isWin = winners.topSpeed === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-bold font-mono text-base ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.topSpeed} MPH
                        {isWin && <WinnerBadge label="V-Max" />}
                      </td>
                    );
                  })}
                </tr>

                {/* Curb Weight */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Curb Weight</td>
                  {selectedCars.map(car => {
                    const isWin = winners.weight === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-semibold font-mono ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.weight.toLocaleString()} lbs
                        {isWin && <WinnerBadge label="Lightest" />}
                      </td>
                    );
                  })}
                </tr>

                {/* Power-to-weight */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Power-to-Weight</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="py-3 px-6 font-semibold text-slate-200 font-mono">
                      {car.specs.powerToWeight}
                    </td>
                  ))}
                </tr>

                {/* Transmission */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Transmission Type</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="py-3 px-6 text-slate-200">
                      {car.specs.transmission}
                    </td>
                  ))}
                </tr>

                {/* Drivetrain layout */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Drivetrain layout</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="py-3 px-6 text-slate-200">
                      {car.specs.drivetrain}
                    </td>
                  ))}
                </tr>

                {/* Rarity */}
                <tr>
                  <td className="py-3 px-6 font-mono text-xs text-slate-400">Rarity Limits</td>
                  {selectedCars.map(car => {
                    const isWin = winners.rarity === car.id;
                    return (
                      <td key={car.id} className={`py-3 px-6 font-semibold font-mono ${isWin ? 'text-amber-400' : 'text-slate-200'}`}>
                        {car.specs.productionLimit} units
                        {isWin && <WinnerBadge label="Rarest" />}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI Advisor Button section */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-48 w-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-center space-x-2.5">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Gemini Mechanical Audit</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Generate an elite technical analysis of these hypercars, focusing on thermal efficiency, structural materials, hybrid vector dynamics, and quarter-mile simulations compiled by the server-side Gearhead AI.
              </p>

              <button
                onClick={generateAiAnalysis}
                disabled={isLoadingAnalysis || selectedCars.length < 2}
                className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-xs tracking-wider uppercase text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 transition-all duration-300 flex items-center space-x-2"
              >
                {isLoadingAnalysis ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    <span>Analyzing Dynamics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-slate-950" />
                    <span>Generate AI Comparison Report</span>
                  </>
                )}
              </button>
            </div>

            {/* Error handling */}
            {errorMsg && (
              <div className="mt-5 rounded-lg border border-red-800 bg-red-950/20 px-4 py-3 text-red-400 text-xs flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* AI response panel */}
            {analysis && (
              <div className="mt-8 pt-8 border-t border-slate-800/80 animate-fade-in">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.01] p-5 sm:p-7">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                      Gemini AI Engineering Review
                    </span>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <FormattedText text={analysis} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WinnerBadge({ label = 'Value' }: { label?: string }) {
  return (
    <span className="inline-flex items-center ml-2 rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight text-amber-400 uppercase border border-amber-500/20">
      <Trophy className="h-2.5 w-2.5 text-amber-400 mr-0.5" />
      {label}
    </span>
  );
}

function PlusIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
