import React, { useState } from 'react';
import { CARS_DATABASE } from './data/cars';
import { CarData } from './types';
import Header from './components/Header';
import CarCard from './components/CarCard';
import SpecsDetails from './components/SpecsDetails';
import ComparisonTool from './components/ComparisonTool';
import DragSimulator from './components/DragSimulator';
import AiGarage from './components/AiGarage';
import Footer from './components/Footer';
import { Search, Filter, Shield, Award, Sparkles, Cpu, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'compare' | 'drag-race' | 'ai-garage'>('catalog');
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<CarData | null>(null);
  const [comparisonList, setComparisonList] = useState<CarData[]>([CARS_DATABASE[0], CARS_DATABASE[1]]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  // Comparison toggle handlers
  const handleToggleCompare = (car: CarData) => {
    setComparisonList(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        return prev.filter(c => c.id !== car.id);
      }
      if (prev.length >= 3) {
        return prev; // Limit to 3 max
      }
      return [...prev, car];
    });
  };

  const handleRemoveCompare = (car: CarData) => {
    setComparisonList(prev => prev.filter(c => c.id !== car.id));
  };

  const handleAddCompare = (car: CarData) => {
    setComparisonList(prev => {
      if (prev.some(c => c.id === car.id) || prev.length >= 3) return prev;
      return [...prev, car];
    });
  };

  // Run filters
  const filteredCars = CARS_DATABASE.filter(car => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.specs.engine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesOrigin = selectedOrigin === 'all' || car.origin === selectedOrigin;

    return matchesSearch && matchesCategory && matchesOrigin;
  });

  // Extract unique origins for filtering
  const uniqueOrigins = Array.from(new Set(CARS_DATABASE.map(car => car.origin)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500/30 selection:text-amber-400">
      {/* Premium Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto-collapse car detail viewer if navigating elsewhere
          setSelectedCarForDetail(null);
        }}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'catalog' && !selectedCarForDetail && (
          <div>
            {/* Majestic Hero Banner */}
            <div className="relative h-[320px] sm:h-[420px] overflow-hidden bg-slate-950 border-b border-slate-900">
              <img
                src="/src/assets/images/hero_supercar_bg_1784039401570.jpg"
                alt="Supercar twilight background"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl">
                    <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold tracking-wider text-amber-400 uppercase border border-amber-500/20">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>The Hypercar Archive</span>
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                      Deconstruct <br />
                      <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-slate-100 bg-clip-text text-transparent">
                        Absolute Velocity
                      </span>
                    </h1>
                    <p className="mt-4 text-slate-300 text-sm leading-relaxed sm:text-base">
                      A premium technical journal and mechanical encyclopedia built for pure automotive enthusiasts. Analyze structure composites, cylinder redlines, active aerodynamics, and full performance specifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog content filters */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-100">Supercar Encyclopedia</h2>
                  <p className="text-slate-500 text-xs mt-1">Browse our handpicked technical catalog of global engineering marvels.</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search bar */}
                  <div className="relative min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search V16, Bugatti, etc..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900/40 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center space-x-2">
                    <Filter className="h-3.5 w-3.5 text-slate-500" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-300 outline-none focus:border-amber-500 font-mono uppercase"
                    >
                      <option value="all">All Classes</option>
                      <option value="hypercar">Hypercars</option>
                      <option value="coachbuilt">Coachbuilt</option>
                      <option value="track-weapon">Track Weapon</option>
                    </select>
                  </div>

                  {/* Origin Filter */}
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-300 outline-none focus:border-amber-500 font-mono uppercase"
                  >
                    <option value="all">All Origins</option>
                    {uniqueOrigins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cards Grid */}
              {filteredCars.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-900 rounded-2xl bg-slate-950/20">
                  <Shield className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                  <span className="font-mono text-xs text-slate-500 uppercase block">No results matched your parameters</span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedOrigin('all');
                    }}
                    className="mt-4 rounded-lg bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map(car => (
                    <CarCard
                      key={car.id}
                      car={car}
                      onViewDetails={(c) => setSelectedCarForDetail(c)}
                      onToggleCompare={handleToggleCompare}
                      isComparing={comparisonList.some(c => c.id === car.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Selected Car Details View */}
        {activeTab === 'catalog' && selectedCarForDetail && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <SpecsDetails
              car={selectedCarForDetail}
              onBack={() => setSelectedCarForDetail(null)}
              onToggleCompare={handleToggleCompare}
              isComparing={comparisonList.some(c => c.id === selectedCarForDetail.id)}
            />
          </div>
        )}

        {/* Spec Comparison Dashboard */}
        {activeTab === 'compare' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="mb-8">
              <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1.5">
                Sector Telemetry Analysis
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase flex items-center space-x-2">
                <Cpu className="h-7 w-7 text-amber-500" />
                <span>Supercar Comparator</span>
              </h1>
            </div>
            <ComparisonTool
              selectedCars={comparisonList}
              onRemoveCar={handleRemoveCompare}
              onAddCar={handleAddCompare}
            />
          </div>
        )}

        {/* Telemetry Drag Racing Simulator */}
        {activeTab === 'drag-race' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="mb-8">
              <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1.5">
                Real-Time Physics Workshop
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase flex items-center space-x-2">
                <Flame className="h-7 w-7 text-amber-500" />
                <span>Quarter-Mile Drag telemetries</span>
              </h1>
            </div>
            <DragSimulator />
          </div>
        )}

        {/* AI Garage Consultant Chat */}
        {activeTab === 'ai-garage' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="mb-8">
              <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1.5">
                Full-Stack Gemini Assistant
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase flex items-center space-x-2">
                <Sparkles className="h-7 w-7 text-amber-500" />
                <span>The Gearhead AI Garage</span>
              </h1>
            </div>
            <AiGarage />
          </div>
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
