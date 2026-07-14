import React, { useState, useEffect, useRef } from 'react';
import { CarData } from '../types';
import { CARS_DATABASE } from '../data/cars';
import { Flame, Play, RotateCcw, Award, Gauge, Zap, Sparkles } from 'lucide-react';

interface TelemetryPoint {
  time: number;
  speed: number;
  distance: number;
}

export default function DragSimulator() {
  const [car1, setCar1] = useState<CarData>(CARS_DATABASE[0]);
  const [car2, setCar2] = useState<CarData>(CARS_DATABASE[1]);

  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress1, setProgress1] = useState(0); // 0 to 100% of quarter mile
  const [progress2, setProgress2] = useState(0);

  const [telemetry1, setTelemetry1] = useState<TelemetryPoint[]>([]);
  const [telemetry2, setTelemetry2] = useState<TelemetryPoint[]>([]);

  const [commentary, setCommentary] = useState<string[]>([]);
  const [winner, setWinner] = useState<CarData | null>(null);

  const simInterval = useRef<NodeJS.Timeout | null>(null);

  const resetSimulation = () => {
    if (simInterval.current) clearInterval(simInterval.current);
    setIsRunning(false);
    setIsFinished(false);
    setProgress1(0);
    setProgress2(0);
    setTelemetry1([]);
    setTelemetry2([]);
    setCommentary(['Press STAMP THROTTLE to ignite the V12/V16 cylinders.']);
    setWinner(null);
  };

  useEffect(() => {
    return () => {
      if (simInterval.current) clearInterval(simInterval.current);
    };
  }, []);

  const runSimulation = () => {
    resetSimulation();
    setIsRunning(true);
    setCommentary(['Green light! GO GO GO! Engines screaming, tires clawing for traction!']);

    const QUARTER_MILE = 1320; // feet

    // Physics parameters for Car 1
    const hp1 = car1.specs.power;
    const wt1 = car1.specs.weight;
    const isAwd1 = car1.specs.drivetrain.toLowerCase().includes('all');
    const launchEfficiency1 = isAwd1 ? 0.95 : 0.72; // AWD launches way harder
    const zeroToSixty1 = car1.specs.zeroToSixty;

    // Physics parameters for Car 2
    const hp2 = car2.specs.power;
    const wt2 = car2.specs.weight;
    const isAwd2 = car2.specs.drivetrain.toLowerCase().includes('all');
    const launchEfficiency2 = isAwd2 ? 0.95 : 0.72;
    const zeroToSixty2 = car2.specs.zeroToSixty;

    // Let's model current state
    let dist1 = 0; // feet
    let speed1 = 0; // mph
    let dist2 = 0; // feet
    let speed2 = 0; // mph

    let time = 0; // seconds
    const dt = 0.1; // 100ms step

    const tempTelemetry1: TelemetryPoint[] = [];
    const tempTelemetry2: TelemetryPoint[] = [];
    const tempCommentary = ['Green light! GO GO GO! Engines screaming, tires clawing for traction!'];

    let commentTracker = {
      launched: false,
      midpoint: false,
      topend: false,
    };

    simInterval.current = setInterval(() => {
      time += dt;

      // --- CAR 1 PHYSICS ---
      // Acceleration is power / weight * traction factor, tapering as speed increases due to drag
      // 0-60 is a good baseline to calibrate initial acceleration
      const baseAcc1 = (hp1 / wt1) * 32.2 * 3.5; // conversion factor
      const aeroResistance1 = 0.00015 * speed1 * speed1; // drag quadratic
      let acc1 = (baseAcc1 / (1 + speed1 * 0.02)) * (time < 1.0 ? launchEfficiency1 : 1.0) - aeroResistance1;
      acc1 = Math.max(acc1, 2); // always forward

      // Euler integration
      speed1 += (acc1 * dt * 22) / 15; // convert ft/s^2 to mph
      dist1 += (((speed1 * 15) / 22) * dt) + (0.5 * acc1 * dt * dt);

      // --- CAR 2 PHYSICS ---
      const baseAcc2 = (hp2 / wt2) * 32.2 * 3.5;
      const aeroResistance2 = 0.00015 * speed2 * speed2;
      let acc2 = (baseAcc2 / (1 + speed2 * 0.02)) * (time < 1.0 ? launchEfficiency2 : 1.0) - aeroResistance2;
      acc2 = Math.max(acc2, 2);

      speed2 += (acc2 * dt * 22) / 15;
      dist2 += (((speed2 * 15) / 22) * dt) + (0.5 * acc2 * dt * dt);

      // Clamp distance
      const finalDist1 = Math.min(dist1, QUARTER_MILE);
      const finalDist2 = Math.min(dist2, QUARTER_MILE);

      // Push telemetry
      tempTelemetry1.push({ time: Math.round(time * 10) / 10, speed: Math.round(speed1), distance: Math.round(finalDist1) });
      tempTelemetry2.push({ time: Math.round(time * 10) / 10, speed: Math.round(speed2), distance: Math.round(finalDist2) });

      // Calculate progress percentage
      const prog1 = (finalDist1 / QUARTER_MILE) * 100;
      const prog2 = (finalDist2 / QUARTER_MILE) * 100;

      setProgress1(prog1);
      setProgress2(prog2);

      // Dynamic commentary injection based on current physics state
      if (time >= 0.5 && time < 0.8 && !commentTracker.launched) {
        commentTracker.launched = true;
        if (isAwd1 && !isAwd2) {
          tempCommentary.push(`[LAUNCH] The AWD system of the ${car1.brand} ${car1.name} grips instantly! It slingshots ahead of the RWD ${car2.name}.`);
        } else if (isAwd2 && !isAwd1) {
          tempCommentary.push(`[LAUNCH] Spectacular launch by ${car2.brand} ${car2.name}! AWD traction rockets it into an early lead.`);
        } else {
          tempCommentary.push(`[LAUNCH] Both machines launch with a thunderous roar! Wheelspin controlled by active torque vectoring.`);
        }
        setCommentary([...tempCommentary]);
      }

      if (time >= 3.0 && time < 4.0 && !commentTracker.midpoint) {
        commentTracker.midpoint = true;
        if (Math.abs(speed1 - speed2) < 5) {
          tempCommentary.push(`[3.0s MARK] They are side-by-side at ${Math.round(speed1)} MPH! The V-Max runways are shaking.`);
        } else {
          const leader = speed1 > speed2 ? car1 : car2;
          const chaser = speed1 > speed2 ? car2 : car1;
          tempCommentary.push(`[3.0s MARK] Gearing transition! The ${leader.brand} is pulling away at ${Math.round(Math.max(speed1, speed2))} MPH, but the ${chaser.brand}'s powerband is coming alive!`);
        }
        setCommentary([...tempCommentary]);
      }

      if (time >= 7.0 && time < 8.0 && !commentTracker.topend) {
        commentTracker.topend = true;
        const leader = dist1 > dist2 ? car1 : car2;
        const speedOfLeader = dist1 > dist2 ? speed1 : speed2;
        tempCommentary.push(`[HIGH SPEED ENCOUNTER] Approaching 1000 feet! The ${leader.brand} leads, flying past ${Math.round(speedOfLeader)} MPH with aerodynamic active flaps pinning it down.`);
        setCommentary([...tempCommentary]);
      }

      // Check if both finished
      if (dist1 >= QUARTER_MILE && dist2 >= QUARTER_MILE) {
        clearInterval(simInterval.current!);
        setIsRunning(false);
        setIsFinished(true);

        // Find precise finish times using linear interpolation
        const preciseTime1 = time - dt + ((QUARTER_MILE - tempTelemetry1[tempTelemetry1.length - 2].distance) / (finalDist1 - tempTelemetry1[tempTelemetry1.length - 2].distance)) * dt;
        const preciseTime2 = time - dt + ((QUARTER_MILE - tempTelemetry2[tempTelemetry2.length - 2].distance) / (finalDist2 - tempTelemetry2[tempTelemetry2.length - 2].distance)) * dt;

        const winnerCar = preciseTime1 < preciseTime2 ? car1 : car2;
        setWinner(winnerCar);

        setTelemetry1([...tempTelemetry1]);
        setTelemetry2([...tempTelemetry2]);

        const winnerTime = Math.min(preciseTime1, preciseTime2).toFixed(3);
        const loserTime = Math.max(preciseTime1, preciseTime2).toFixed(3);
        const winnerSpeed = winnerCar.id === car1.id ? Math.round(speed1) : Math.round(speed2);

        tempCommentary.push(`[CHECKERED FLAG] CROSSING THE LINE! The winner is the ${winnerCar.brand} ${winnerCar.name} with an ET of ${winnerTime} seconds @ ${winnerSpeed} MPH!`);
        setCommentary([...tempCommentary]);
      }
    }, 100);
  };

  // Build high-precision telemetry SVG charts
  const maxTime = Math.max(telemetry1.length, telemetry2.length) * 0.1 || 12;
  const maxSpeed = 220;

  return (
    <div className="space-y-8">
      {/* Selector Dashboard */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center space-x-2">
          <Flame className="h-5 w-5 text-amber-500" />
          <span>Quarter-Mile Drag Telemetry</span>
        </h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Stage two expensive hypercars side-by-side. Our reactive drag engine models launching friction coefficient, power curves, aero downforce drag, and gearbox ratios to calculate precise real-time performance telemetry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Staging Lane 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <label className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-2">
              Staging Lane 1 (Car A)
            </label>
            <select
              value={car1.id}
              onChange={(e) => setCar1(CARS_DATABASE.find(c => c.id === e.target.value)!)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500 font-sans tracking-wide"
              disabled={isRunning}
            >
              {CARS_DATABASE.map(car => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.name} ({car.specs.power} HP)
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center space-x-3">
              <img src={car1.image} alt={car1.name} className="h-10 w-16 object-cover rounded border border-slate-800" referrerPolicy="no-referrer" />
              <div>
                <span className="font-mono text-[10px] text-slate-500 block">Drivetrain Configuration</span>
                <span className="font-sans text-xs font-semibold text-slate-300">{car1.specs.drivetrain}</span>
              </div>
            </div>
          </div>

          {/* Staging Lane 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <label className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-2">
              Staging Lane 2 (Car B)
            </label>
            <select
              value={car2.id}
              onChange={(e) => setCar2(CARS_DATABASE.find(c => c.id === e.target.value)!)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500 font-sans tracking-wide"
              disabled={isRunning}
            >
              {CARS_DATABASE.map(car => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.name} ({car.specs.power} HP)
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center space-x-3">
              <img src={car2.image} alt={car2.name} className="h-10 w-16 object-cover rounded border border-slate-800" referrerPolicy="no-referrer" />
              <div>
                <span className="font-mono text-[10px] text-slate-500 block">Drivetrain Configuration</span>
                <span className="font-sans text-xs font-semibold text-slate-300">{car2.specs.drivetrain}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={runSimulation}
            disabled={isRunning || car1.id === car2.id}
            className="flex-1 rounded-lg bg-amber-500 px-4 py-3 text-xs font-bold font-mono uppercase tracking-wider text-slate-950 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="h-4 w-4 text-slate-950 fill-slate-950" />
            <span>Stamp the Throttle</span>
          </button>
          <button
            onClick={resetSimulation}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-bold font-mono uppercase text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {car1.id === car2.id && (
          <p className="text-red-400 font-mono text-[10px] uppercase text-center mt-3">
            Warning: Staging identical vehicles results in a perfect tie. Choose different candidates.
          </p>
        )}
      </div>

      {/* Visual Runway Field */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6 relative overflow-hidden">
        {/* Quarter Mile Start/Finish Label */}
        <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest">
          <span>Staging line [0 FT]</span>
          <span>Finishing Trap [1320 FT]</span>
        </div>

        <div className="space-y-4">
          {/* Lane 1 Progress */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-200 font-mono">{car1.brand} {car1.name}</span>
              <span className="font-mono text-xs text-amber-500 font-semibold">
                {telemetry1.length > 0 ? `${telemetry1[telemetry1.length - 1].speed} MPH` : '0 MPH'}
              </span>
            </div>
            <div className="h-8 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center">
              {/* Textured runway lines */}
              <div className="absolute inset-x-0 h-[2px] bg-slate-800 top-1/2 -translate-y-1/2 border-dashed border-t-2" />
              <div
                className="h-full bg-gradient-to-r from-amber-500/10 to-amber-500 transition-all duration-100 ease-out flex items-center justify-end pr-2 rounded-r"
                style={{ width: `${progress1}%` }}
              >
                <div className="h-6 w-10 flex items-center justify-center bg-slate-950 rounded border border-amber-500 font-mono text-[9px] font-bold text-amber-400 uppercase shadow-lg shadow-amber-500/20">
                  Car A
                </div>
              </div>
            </div>
          </div>

          {/* Lane 2 Progress */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-200 font-mono">{car2.brand} {car2.name}</span>
              <span className="font-mono text-xs text-amber-500 font-semibold">
                {telemetry2.length > 0 ? `${telemetry2[telemetry2.length - 1].speed} MPH` : '0 MPH'}
              </span>
            </div>
            <div className="h-8 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center">
              {/* Textured runway lines */}
              <div className="absolute inset-x-0 h-[2px] bg-slate-800 top-1/2 -translate-y-1/2 border-dashed border-t-2" />
              <div
                className="h-full bg-gradient-to-r from-amber-500/10 to-amber-500 transition-all duration-100 ease-out flex items-center justify-end pr-2 rounded-r"
                style={{ width: `${progress2}%` }}
              >
                <div className="h-6 w-10 flex items-center justify-center bg-slate-950 rounded border border-amber-500 font-mono text-[9px] font-bold text-amber-400 uppercase shadow-lg shadow-amber-500/20">
                  Car B
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Display / Commentary & Telemetry Grid */}
      {(commentary.length > 1 || isFinished) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Race commentary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-5 lg:col-span-1 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                Broadcaster Gearing Commentary
              </h3>
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                {commentary.map((log, idx) => (
                  <p key={idx} className="text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-amber-500/40">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {winner && (
              <div className="mt-6 pt-5 border-t border-slate-800 rounded-lg bg-amber-500/5 border-amber-500/20 p-4 text-center">
                <Award className="h-8 w-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <span className="font-mono text-[9px] text-amber-500 font-bold uppercase tracking-widest block">
                  Drag Winner
                </span>
                <span className="font-sans text-lg font-bold text-slate-100 block mt-0.5">
                  {winner.brand} {winner.name}
                </span>
                <span className="font-mono text-xs text-slate-400 block mt-1">
                  Quarter-Mile Triumph
                </span>
              </div>
            )}
          </div>

          {/* SVG Telemetry graphing */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-5">
              Live Speed (MPH) vs. Time (Seconds) Curve
            </h3>

            {telemetry1.length === 0 ? (
              <div className="h-64 flex items-center justify-center border border-slate-850 bg-slate-950/40 rounded-lg">
                <span className="font-mono text-[10px] text-slate-600 uppercase">Awaiting launch telemetry logs...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* SVG Graph rendering */}
                <div className="relative h-64 border-l border-b border-slate-850">
                  {/* Grid lines */}
                  {[50, 100, 150, 200].map((speedValue) => {
                    const y = 256 - (speedValue / maxSpeed) * 256;
                    return (
                      <div key={speedValue} className="absolute left-0 right-0 border-t border-slate-850/40 border-dashed" style={{ top: `${y}px` }}>
                        <span className="absolute -left-8 -top-2 font-mono text-[8px] text-slate-600">{speedValue}</span>
                      </div>
                    );
                  })}

                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Curve 1 (Car A) - Amber */}
                    {telemetry1.length > 1 && (
                      <path
                        d={telemetry1.map((p, i) => {
                          const x = (p.time / maxTime) * 100;
                          const y = 100 - (p.speed / maxSpeed) * 100;
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Curve 2 (Car B) - Slate/Silver */}
                    {telemetry2.length > 1 && (
                      <path
                        d={telemetry2.map((p, i) => {
                          const x = (p.time / maxTime) * 100;
                          const y = 100 - (p.speed / maxSpeed) * 100;
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </div>

                {/* Graph Legend */}
                <div className="flex items-center justify-center space-x-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-6 rounded bg-amber-500 block" />
                    <span className="font-mono text-[10px] text-slate-300 uppercase font-semibold">
                      Car A: {car1.brand} {car1.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-6 rounded bg-slate-400 block" />
                    <span className="font-mono text-[10px] text-slate-300 uppercase font-semibold">
                      Car B: {car2.brand} {car2.name}
                    </span>
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
