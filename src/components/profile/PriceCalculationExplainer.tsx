import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Scale,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Truck,
  Building2,
  FileText,
  SlidersHorizontal,
  CheckCircle2,
  Layers,
  HelpCircle,
  Info,
  DollarSign,
  Award,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PriceCalculationExplainerProps {
  onBackToExchange: () => void;
  onNavigateToMarketplace: () => void;
}

export const PriceCalculationExplainer: React.FC<PriceCalculationExplainerProps> = ({
  onBackToExchange,
  onNavigateToMarketplace,
}) => {
  const { t } = useLanguage();

  // Interactive Simulator Parameters
  const [baseBenchmark, setBaseBenchmark] = useState<number>(80.0); // Base MCX Index (₹/kg)
  const [purityPercent, setPurityPercent] = useState<number>(99.4); // Metallurgical Purity %
  const [demandPressure, setDemandPressure] = useState<number>(1.06); // Demand Multiplier (+6%)
  const [distanceKm, setDistanceKm] = useState<number>(45); // Freight Distance (km)
  const [includeEprCredit, setIncludeEprCredit] = useState<boolean>(true); // CPCB Green Credit

  // Toggles inside the visual mockup representation
  const [toggleLmeBenchmark, setToggleLmeBenchmark] = useState(true);
  const [toggleNablAssay, setToggleNablAssay] = useState(true);
  const [toggleOrderDepth, setToggleOrderDepth] = useState(true);
  const [toggleCorridorFreight, setToggleCorridorFreight] = useState(true);

  // Dynamic formula calculation
  const purityMultiplier = toggleNablAssay ? purityPercent / 100 : 0.95;
  const demandFactor = toggleOrderDepth ? demandPressure : 1.0;
  const benchmarkFactor = toggleLmeBenchmark ? baseBenchmark : 75.0;
  const freightDeduction = toggleCorridorFreight ? Number((distanceKm * 0.05).toFixed(2)) : 1.0;
  const eprCreditAmount = includeEprCredit ? 1.85 : 0.0;

  const calculatedPricePerKg = Number(
    (
      benchmarkFactor * demandFactor * purityMultiplier -
      freightDeduction +
      eprCreditAmount
    ).toFixed(2)
  );

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-16">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToExchange}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Prices Exchange</span>
          </button>
          <div className="h-5 w-px bg-neutral-200 hidden sm:block" />
          <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
            Algorithmic Spot Pricing Engine v3.8
          </span>
        </div>

        <button
          type="button"
          onClick={onNavigateToMarketplace}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <span>Trade on Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Explainer Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border border-[#C8E6C9]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Algorithmic Clearinghouse Formula</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
          How Spot Resource Prices Are Calculated
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Unlike speculative financial stocks, LoopGrid resource prices are derived from real physical manufacturing fundamentals: spectrometer purity assays, verified regional supply/demand depth, and highway freight equalization.
        </p>
      </div>

      {/* ======================================================== */}
      {/* VISUAL DEVICE MOCKUP REPRESENTATION (Per Reference Image) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-neutral-800 relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Smartphone Wireframe Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Bezel */}
            <div className="w-[300px] sm:w-[320px] bg-black rounded-[48px] p-3.5 border-4 border-neutral-700 shadow-2xl relative">
              {/* Notch / Speaker Ear-piece */}
              <div className="w-28 h-4 bg-neutral-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-1.5">
                <div className="w-8 h-1 bg-neutral-700 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
              </div>

              {/* Phone Inner Display Screen */}
              <div className="bg-neutral-950 rounded-[36px] p-4 text-white border border-neutral-800 space-y-4 relative overflow-hidden">
                {/* Header inside phone */}
                <div className="text-center pb-2 border-b border-neutral-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                    PRICE ENGINE SETTINGS
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Active Valuation Factors
                  </h4>
                </div>

                {/* VISUAL SWITCH ITEMS WITH ANNOTATED RED/EMERALD ARROW POINTERS (Per Reference Images) */}
                <div className="space-y-3 relative text-xs">
                  {/* Parameter Row 1: Global Benchmark */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 relative">
                    <div className="pr-2">
                      <span className="font-semibold text-neutral-200 block text-[11px]">
                        LME & MCX Benchmark
                      </span>
                      <span className="text-[10px] text-neutral-400">40% Global Weight</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToggleLmeBenchmark(!toggleLmeBenchmark)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        toggleLmeBenchmark ? 'bg-emerald-500' : 'bg-neutral-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                          toggleLmeBenchmark ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Parameter Row 2: NABL Spectrometer Purity with PROMINENT RED ANNOTATION ARROW */}
                  <div className="relative">
                    {/* The Reference Red Annotation Arrow pointing to the switch */}
                    <div className="absolute -top-7 -right-1 z-30 flex flex-col items-center pointer-events-none animate-bounce">
                      <div className="w-5 h-6 bg-gradient-to-b from-rose-500 to-rose-600 rounded-t-sm clip-arrow flex items-center justify-center shadow-lg shadow-rose-900/50">
                        <span className="text-[9px] font-black text-white">▼</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/90 border border-rose-500/40 relative">
                      <div className="pr-2">
                        <span className="font-semibold text-rose-300 block text-[11px] flex items-center gap-1">
                          NABL Assay Purity Multiplier
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        </span>
                        <span className="text-[10px] text-neutral-400">20% Spectrometer Parity</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setToggleNablAssay(!toggleNablAssay)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                          toggleNablAssay ? 'bg-emerald-500' : 'bg-neutral-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                            toggleNablAssay ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Parameter Row 3: Regional Order Book */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 relative">
                    <div className="pr-2">
                      <span className="font-semibold text-neutral-200 block text-[11px]">
                        Cluster Order Book Depth
                      </span>
                      <span className="text-[10px] text-neutral-400">25% Supply-Demand Deficit</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToggleOrderDepth(!toggleOrderDepth)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        toggleOrderDepth ? 'bg-emerald-500' : 'bg-neutral-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                          toggleOrderDepth ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Parameter Row 4: Freight Logistics with SECOND RED ANNOTATION ARROW */}
                  <div className="relative">
                    {/* The Second Red Annotation Arrow pointing to the switch */}
                    <div className="absolute -top-7 right-3 z-30 flex flex-col items-center pointer-events-none animate-pulse">
                      <div className="w-5 h-6 bg-gradient-to-b from-rose-500 to-rose-600 rounded-t-sm flex items-center justify-center shadow-lg shadow-rose-900/50">
                        <span className="text-[9px] font-black text-white">▼</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 relative">
                      <div className="pr-2">
                        <span className="font-semibold text-neutral-200 block text-[11px]">
                          Corridor Freight Deduction
                        </span>
                        <span className="text-[10px] text-neutral-400">10% NH-48 Km Equalization</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setToggleCorridorFreight(!toggleCorridorFreight)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                          toggleCorridorFreight ? 'bg-emerald-500' : 'bg-neutral-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                            toggleCorridorFreight ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated Live Output inside phone */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950 to-neutral-900 border border-emerald-500/30 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    Simulated Output
                  </span>
                  <div className="text-xl font-black text-white mt-0.5">
                    ₹{calculatedPricePerKg.toFixed(2)}
                    <span className="text-xs text-neutral-400 font-normal ml-1">/kg</span>
                  </div>
                  <span className="text-[9px] text-emerald-300 block mt-0.5">
                    Real-time Clearinghouse Rate
                  </span>
                </div>

                {/* Bottom action pills inside phone (as in reference image) */}
                <div className="space-y-1.5 pt-1">
                  <button
                    type="button"
                    onClick={onBackToExchange}
                    className="w-full py-2 rounded-full bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shadow-sm"
                  >
                    Confirm & View Exchange
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateToMarketplace}
                    className="w-full py-1.5 rounded-full bg-transparent border border-neutral-700 text-neutral-300 font-semibold text-[11px] hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    Skip to Marketplace
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 text-center mt-3 max-w-[260px]">
              Visual illustration of parameter switches that control the live spot price algorithm.
            </p>
          </div>

          {/* Right Column: Detailed Factor Breakdown & Interactive Simulator */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Multi-Factor Econometric Engine
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                The 5 Determinants of Secondary Resource Spot Rates
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Every resource lot listed on LoopGrid is calculated per kilogram (₹/kg) using this audited mathematical model:
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono space-y-1 text-emerald-300">
              <div className="text-[11px] text-neutral-400 font-sans uppercase font-bold">
                Audited Formula:
              </div>
              <div className="text-sm font-bold text-white">
                Spot Price (₹/kg) = [Index × (1 + DemandΔ) × Purity%] - Freight + EPR Credit
              </div>
            </div>

            {/* 5 Factors Cards */}
            <div className="space-y-2.5 text-xs">
              {/* Factor 1 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      Global & National Commodity Anchor (40% Weight)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">LME / MCX</span>
                  </div>
                  <p className="text-neutral-300 text-xs mt-0.5 leading-relaxed">
                    Ties the base rate directly to the London Metal Exchange (LME) and Multi Commodity Exchange of India (MCX) spot indexes for virgin ore, discounted by the historical 28% circular remelting arbitrage.
                  </p>
                </div>
              </div>

              {/* Factor 2 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      Cluster Order Book Depth (25% Weight)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Supply vs Demand</span>
                  </div>
                  <p className="text-neutral-300 text-xs mt-0.5 leading-relaxed">
                    Calculated from active buy orders placed by secondary processing smelters against available MSME supply lots within the regional hub (e.g. Peenya, Chakan, Jamnagar, Surat).
                  </p>
                </div>
              </div>

              {/* Factor 3 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      NABL 17025 Spectrometer Purity Assay (20% Weight)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Chemical Matrix</span>
                  </div>
                  <p className="text-neutral-300 text-xs mt-0.5 leading-relaxed">
                    Certified optical emission spectrometer results determine metallurgical cleanliness. Lots with purity &gt;99% earn price premiums, while moisture or tramp element inclusions trigger automatic parity deductions.
                  </p>
                </div>
              </div>

              {/* Factor 4 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      Spatial Logistics & Highway Toll Equalization (10% Weight)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">GPS Mileage</span>
                  </div>
                  <p className="text-neutral-300 text-xs mt-0.5 leading-relaxed">
                    Equalizes pricing across geographical distances. Consignments located closer to processing smelters experience lower freight deductions (approx. ₹0.05/kg per 10 km).
                  </p>
                </div>
              </div>

              {/* Factor 5 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      CPCB Form-10 Green Clearing Credit (5% Weight)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">EPR Compliance</span>
                  </div>
                  <p className="text-neutral-300 text-xs mt-0.5 leading-relaxed">
                    Enterprises providing verified Form-10 digital manifests unlock sovereign green credits, directly increasing the net per-kilogram payout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox Simulator */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#191C1E] flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#00875A]" />
              Interactive Price Calculation Sandbox
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Adjust variables below to see how our sovereign engine computes the final ₹/kg spot rate in real time.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-baseline gap-2 self-start sm:self-auto">
            <span className="text-xs text-[#166534] font-semibold">Live Computed Spot:</span>
            <span className="text-2xl font-black text-[#1B5E20]">
              ₹{calculatedPricePerKg.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-neutral-600">/kg</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          {/* Slider 1: Base Benchmark */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-800">MCX Base Index</span>
              <span className="font-mono font-bold text-[#00875A]">₹{baseBenchmark.toFixed(1)}/kg</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              step="1"
              value={baseBenchmark}
              onChange={(e) => setBaseBenchmark(Number(e.target.value))}
              className="w-full accent-[#00875A] cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400 block">
              Global baseline commodity spot index
            </span>
          </div>

          {/* Slider 2: Spectrometer Purity */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-800">Spectrometer Purity</span>
              <span className="font-mono font-bold text-[#00875A]">{purityPercent.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="85"
              max="99.9"
              step="0.1"
              value={purityPercent}
              onChange={(e) => setPurityPercent(Number(e.target.value))}
              className="w-full accent-[#00875A] cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400 block">
              NABL 17025 certified purity test result
            </span>
          </div>

          {/* Slider 3: Transit Distance */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-800">Corridor Distance</span>
              <span className="font-mono font-bold text-[#00875A]">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full accent-[#00875A] cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400 block">
              Deduction: -₹{freightDeduction.toFixed(2)}/kg freight
            </span>
          </div>

          {/* Toggle 4: CPCB Green Credit */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <span className="font-bold text-neutral-800 block">CPCB Form-10 Credit</span>
              <span className="text-[10px] text-neutral-500 mt-1 block">
                Regulatory green incentive: +₹1.85/kg
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
              <span className="text-[11px] font-semibold text-neutral-600">
                {includeEprCredit ? 'Active (+₹1.85)' : 'Inactive'}
              </span>
              <button
                type="button"
                onClick={() => setIncludeEprCredit(!includeEprCredit)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  includeEprCredit ? 'bg-[#00875A]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                    includeEprCredit ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-100 border border-neutral-200">
        <div>
          <h4 className="text-base font-bold text-neutral-900">
            Ready to trade at verified exchange spot rates?
          </h4>
          <p className="text-xs text-neutral-600">
            Explore live inventories in the Marketplace or monitor real-time ticks on the Exchange.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBackToExchange}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-300 transition-colors cursor-pointer"
          >
            Live Prices Exchange
          </button>
          <button
            type="button"
            onClick={onNavigateToMarketplace}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-xs"
          >
            Open Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
