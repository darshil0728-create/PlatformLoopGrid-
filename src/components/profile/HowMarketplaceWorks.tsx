import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Landmark,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Building2,
  Boxes,
  Scale,
  Sparkles,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';

interface HowMarketplaceWorksProps {
  onBackToMarketplace: () => void;
  onNavigateToLivePrices: () => void;
}

export const HowMarketplaceWorks: React.FC<HowMarketplaceWorksProps> = ({
  onBackToMarketplace,
  onNavigateToLivePrices,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Resource Upload & DRP Creation',
      subtitle: 'MSMEs upload scrap lots with NABL spectrometer tests',
      detail:
        'MSMEs register physical scrap batches (aluminum, copper, polymers, textiles). A sovereign Digital Resource Passport (DRP) is generated with NABL 17025 purity assays, weight, and initial GPS location.',
      badge: 'Step 1: Provenance',
    },
    {
      step: 2,
      title: 'Algorithmic Listing at ₹/kg Spot Parity',
      subtitle: 'Real-time clearinghouse spot price applied',
      detail:
        'Lots are listed on the LoopGrid Marketplace at transparent per-kilogram (₹/kg) prices calculated from the live commodity exchange, factoring in regional demand depth and distance.',
      badge: 'Step 2: Transparent Price',
    },
    {
      step: 3,
      title: 'Procurement & Integrated Credit Advance',
      subtitle: 'Buy with escrow wallet or 30-90 day credit line',
      detail:
        'Processing Enterprises select lots and choose settlement mode. If working capital is needed, our integrated credit facility (Tata Capital & SIDBI) advances 100% of the funds with zero upfront cash.',
      badge: 'Step 3: Instant Financing',
    },
    {
      step: 4,
      title: 'Smart Escrow Lock & Fleet Dispatch',
      subtitle: 'Automated transit dispatch with real-time waypoint GPS',
      detail:
        'Funds are locked into an RBI PA/PG compliant escrow contract. VRL or BLR Express fleets are dispatched with live GPS tracking and CPCB Form-10 digital transit manifests.',
      badge: 'Step 4: Sovereign Transit',
    },
    {
      step: 5,
      title: 'Smelter Gate Weighment & Settlement',
      subtitle: 'Weight reconciled within ±0.5% & escrow auto-released',
      detail:
        'Upon truck arrival at the secondary smelter, digital weighbridges verify the batch. The DRP status updates to DELIVERED, and escrow auto-releases net payout to the MSME.',
      badge: 'Step 5: Guaranteed Settlement',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-16">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToMarketplace}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>
          <div className="h-5 w-px bg-neutral-200 hidden sm:block" />
          <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
            Circular Clearinghouse Operating Model
          </span>
        </div>

        <button
          type="button"
          onClick={onNavigateToLivePrices}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>View Live Prices Exchange</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
          <ShoppingCart className="w-3.5 h-3.5 text-sky-600" />
          <span>Procurement & Credit Operating Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
          How the LoopGrid Marketplace Works
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Explore how secondary smelters and processing enterprises acquire certified scrap lots, unlock instant trade credit advances, and settle transactions with cryptographic DRP verification.
        </p>
      </div>

      {/* ======================================================== */}
      {/* VISUAL DEVICE MOCKUP REPRESENTATION (Per Reference Images) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-neutral-800 relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Smartphone Wireframe Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Bezel */}
            <div className="w-[300px] sm:w-[320px] bg-black rounded-[48px] p-3.5 border-4 border-neutral-700 shadow-2xl relative">
              {/* Notch */}
              <div className="w-28 h-4 bg-neutral-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-1.5">
                <div className="w-8 h-1 bg-neutral-700 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
              </div>

              {/* Phone Inner Display Screen */}
              <div className="bg-neutral-950 rounded-[36px] p-4 text-white border border-neutral-800 space-y-3.5 relative overflow-hidden">
                {/* Header inside phone */}
                <div className="text-center pb-2 border-b border-neutral-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block">
                    CHECKOUT & FINANCING
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Order Confirmation
                  </h4>
                </div>

                {/* VISUAL SWITCH ITEMS WITH ANNOTATED RED/EMERALD ARROW POINTERS (Per Reference Images) */}
                <div className="space-y-3 relative text-xs">
                  {/* Step Item 1 */}
                  <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-neutral-200 block text-[11px]">
                        Lot DRP-2026-AL-8921
                      </span>
                      <span className="text-[10px] text-neutral-400">500 kg @ ₹85.40/kg</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 font-mono">
                      ₹42,500
                    </span>
                  </div>

                  {/* Switch Row with PROMINENT RED ANNOTATION ARROW */}
                  <div className="relative">
                    {/* The Reference Red Annotation Arrow pointing to the toggle */}
                    <div className="absolute -top-7 right-2 z-30 flex flex-col items-center pointer-events-none animate-bounce">
                      <div className="w-5 h-6 bg-gradient-to-b from-rose-500 to-rose-600 rounded-t-sm flex items-center justify-center shadow-lg shadow-rose-900/50">
                        <span className="text-[9px] font-black text-white">▼</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-rose-500/50 flex items-center justify-between">
                      <div className="pr-2">
                        <span className="font-bold text-rose-300 block text-[11px] flex items-center gap-1">
                          Trade Credit Advance
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        </span>
                        <span className="text-[10px] text-neutral-400">60 Days @ 2.0% Term</span>
                      </div>
                      <div className="w-9 h-5 rounded-full bg-emerald-500 flex items-center justify-end px-0.5 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Escrow Lock Indicator */}
                  <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-neutral-200 block text-[11px]">
                        Smart Escrow Contract
                      </span>
                      <span className="text-[10px] text-neutral-400">RBI PA/PG Reconciled</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                      Auto-Locked
                    </span>
                  </div>
                </div>

                {/* Total box inside phone */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-950 to-neutral-900 border border-sky-500/30 text-center">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
                    Net Cash Required Now
                  </span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    ₹0.00
                  </div>
                  <span className="text-[9px] text-neutral-300 block mt-0.5">
                    100% financed via Integrated Credit Line
                  </span>
                </div>

                {/* Bottom action pills inside phone (as in reference image) */}
                <div className="space-y-1.5 pt-1">
                  <button
                    type="button"
                    onClick={onBackToMarketplace}
                    className="w-full py-2 rounded-full bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shadow-sm"
                  >
                    Confirm & Start Buying
                  </button>
                  <button
                    type="button"
                    onClick={onBackToMarketplace}
                    className="w-full py-1.5 rounded-full bg-transparent border border-neutral-700 text-neutral-300 font-semibold text-[11px] hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 text-center mt-3 max-w-[260px]">
              Visual illustration of one-click checkout with integrated trade credit facility.
            </p>
          </div>

          {/* Right Column: 5-Stage Visual Workflow Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                Sovereign Clearing Workflow
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                The 5-Step Lifecycle of Every Scrap Consignment
              </h3>
            </div>

            <div className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeStep === s.step
                      ? 'bg-white/10 border-sky-400 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-300 tracking-wider">
                      {s.badge}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{s.title}</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Credit Facility Explainer Section */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875A] flex items-center justify-center font-bold">
            <Landmark className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#191C1E]">
              How the Integrated Credit Facility Empowers Processing Enterprises
            </h3>
            <p className="text-xs text-neutral-500">
              Never miss an essential raw material scrap lot due to temporary working capital constraints.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-neutral-900 text-sm">Instant Pre-Approved Line</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Verified processing enterprises receive up to ₹50 Lakhs in instant trade credit backed by our banking consortium (Tata Capital, SIDBI, SBI).
            </p>
            <span className="text-[11px] font-mono text-emerald-700 font-bold block pt-1">
              Zero Physical Collateral Needed
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span className="font-bold text-neutral-900 text-sm">Flexible 30 to 90 Day Terms</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Match your procurement to your smelter production cycle. Smelt ingots, sell to automotive clients, and settle the credit advance with comfortable 1.1% to 2.8% rates.
            </p>
            <span className="text-[11px] font-mono text-sky-700 font-bold block pt-1">
              15-Day Zero Interest Grace Period
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-neutral-900 text-sm">DRP Escrow Underwriting</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              The physical resource lot itself acts as collateral while in transit. The MSME seller is paid immediately, while the buyer enjoys comfortable repayment terms.
            </p>
            <span className="text-[11px] font-mono text-neutral-800 font-bold block pt-1">
              Win-Win for Circular Ecosystem
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-100 border border-neutral-200">
        <div>
          <h4 className="text-base font-bold text-neutral-900">
            Ready to explore verified marketplace lots?
          </h4>
          <p className="text-xs text-neutral-600">
            Browse listed inventories or review real-time spot commodity prices.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onNavigateToLivePrices}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-300 transition-colors cursor-pointer"
          >
            Live Prices Exchange
          </button>
          <button
            type="button"
            onClick={onBackToMarketplace}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-xs"
          >
            Open Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
