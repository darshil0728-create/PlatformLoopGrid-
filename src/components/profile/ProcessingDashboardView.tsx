import React, { useState } from 'react';
import {
  Building2,
  Package,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Flame,
  ShieldCheck,
  Truck,
  DollarSign,
  FileText,
  SlidersHorizontal,
  Scale,
  ShoppingCart,
  Landmark,
  MapPin,
} from 'lucide-react';
import { DRPRecord } from './drpData';
import { ActivityLogSection } from './ActivityLogSection';
import { ManagedTransitTracker } from './ManagedTransitTracker';
import { WasteDiversionChart } from './WasteDiversionChart';
import { LivePriceDashboardWidget } from './LivePriceDashboardWidget';

interface ProcuredLot {
  id: string;
  lotName: string;
  category: string;
  grade: string;
  weight: string;
  drpId: string;
  purityScore: string;
  chemicalAssay: string;
  status: 'IN_TRANSIT' | 'PROCESSING' | 'SMELTED' | 'INSPECTION';
  supplierName: string;
  smelterBay: string;
  procurementCost: string;
  marketSpotRate: string;
  savingsVsVirginOre: string;
  transitCarrier: string;
  eta: string;
}

interface ProcessingDashboardViewProps {
  drpDatabase?: DRPRecord[];
  enterpriseName?: string;
  onInspectDrp: (drpId: string) => void;
  onAcquireLots: () => void;
  onCheckComplianceScore?: () => void;
  onViewActivityLog?: () => void;
  onViewTransitTracker?: () => void;
  onNavigateToLivePrices?: () => void;
  onNavigateToMarketplace?: () => void;
  onNavigateToPriceExplainer?: () => void;
}

export const ProcessingDashboardView: React.FC<ProcessingDashboardViewProps> = ({
  drpDatabase = [],
  enterpriseName = 'Processing Enterprise',
  onInspectDrp,
  onAcquireLots,
  onCheckComplianceScore,
  onViewActivityLog,
  onViewTransitTracker,
  onNavigateToLivePrices,
  onNavigateToMarketplace,
  onNavigateToPriceExplainer,
}) => {
  const [lotFilter, setLotFilter] = useState<'ALL' | 'IN_TRANSIT' | 'PROCESSING' | 'SMELTED' | 'INSPECTION'>('ALL');

  const lots: ProcuredLot[] = [
    {
      id: 'prc-01',
      lotName: 'High-Purity 6061-T6 Aluminum Swarf Lot',
      category: 'Metals & Alloys',
      grade: 'Aerospace Spec 6061-T6 (Si 0.6%, Mg 1.0%)',
      weight: '5.0 Tons Pooled Ingot Feedstock',
      drpId: 'DRP-2026-AL-8921',
      purityScore: '99.4% NABL Certified',
      chemicalAssay: 'Fe <0.18%, Cu 0.28%, Cr 0.15%, Mn 0.08%',
      status: 'IN_TRANSIT',
      supplierName: 'Apex Precision Works + Regional Cluster',
      smelterBay: 'Induction Crucible Furnace #2',
      procurementCost: '₹4,25,000',
      marketSpotRate: '₹85 / kg',
      savingsVsVirginOre: 'Save ₹1,48,000 (-26% vs Primary Ingot)',
      transitCarrier: 'Truck KA-04-E-2201 (VRL Logistics)',
      eta: '42 mins remaining',
    },
    {
      id: 'prc-02',
      lotName: 'De-oiled Ferrous Turning Pellets (Grade A)',
      category: 'Metals & Alloys',
      grade: 'Low-Carbon Sintered Steel Scrap (C <0.15%)',
      weight: '12.4 Tons',
      drpId: 'DRP-2026-ST-3301',
      purityScore: '98.7% Spectrometer Verified',
      chemicalAssay: 'Moisture <0.02%, Oil Contamination <0.01%',
      status: 'PROCESSING',
      supplierName: 'Bharat Auto Forgings Consortium',
      smelterBay: 'Electric Arc Furnace Line 1',
      procurementCost: '₹6,82,000',
      marketSpotRate: '₹55 / kg',
      savingsVsVirginOre: 'Save ₹2,10,000 (-23.5% vs DRI Sponge Iron)',
      transitCarrier: 'Delivered (Dock 2)',
      eta: 'In Melting Cycle (1450°C)',
    },
    {
      id: 'prc-03',
      lotName: 'Pure Indigo Denim Selvedge Raw Bales',
      category: 'Textiles & Leather',
      grade: '100% Cotton 400 GSM Long Staple Offcut',
      weight: '3.5 Tons Baled',
      drpId: 'DRP-2026-TX-4112',
      purityScore: '98.1% CIRCOT Verified',
      chemicalAssay: 'Zero Synthetic Blend, Neutral pH 7.1',
      status: 'INSPECTION',
      supplierName: 'Surat Eco-Weave Mills',
      smelterBay: 'Shoddy Yarn Garnett Blending Line',
      procurementCost: '₹84,000',
      marketSpotRate: '₹24 / kg',
      savingsVsVirginOre: 'Save ₹32,000 vs Virgin Raw Cotton',
      transitCarrier: 'Trailer GJ-06-TR-8812',
      eta: 'Dock Unloading Passed',
    },
    {
      id: 'prc-04',
      lotName: 'Virgin HDPE Polymer Injection Regrind',
      category: 'Polymers & Plastics',
      grade: 'MFI 0.35 g/10min Blow-Molding Grade',
      weight: '2.8 Tons Screened Granules',
      drpId: 'DRP-2026-PL-7729',
      purityScore: '99.0% CIPET Certified',
      chemicalAssay: 'Density 0.952 g/cm³, Tensile Yield 28 MPa',
      status: 'SMELTED',
      supplierName: 'Chakan Precision Molding Consortium',
      smelterBay: 'Twin-Screw Compounding Extruder 4',
      procurementCost: '₹1,12,000',
      marketSpotRate: '₹40 / kg',
      savingsVsVirginOre: 'Save ₹44,800 (-28.5% vs Virgin Granules)',
      transitCarrier: 'Tempo MH-12-Q-4491',
      eta: 'Compounded & Packaged into Pellets',
    },
  ];

  const filteredLots = lots.filter((l) => {
    if (lotFilter === 'ALL') return true;
    return l.status === lotFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Compliance Score Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-sky-900/50">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-300 flex-shrink-0 shadow-xs border border-white/15">
            <Scale className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/15 text-sky-200">
                Smelter & Recycler Statutory Index
              </span>
              <span className="text-xs text-emerald-300 font-semibold">• Live Mandates</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Secondary Processing Environmental Compliance
            </h3>
            <p className="text-xs text-sky-100 max-w-lg mt-0.5">
              Assess NABL ingot purity, CTO air/water consents, CPCB digital manifests, and low-cost thermal efficiency solutions.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCheckComplianceScore}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-extrabold text-[#0C4A6E] bg-white hover:bg-sky-50 active:scale-[0.98] transition-all shadow-md flex-shrink-0 cursor-pointer whitespace-nowrap"
        >
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          <span>CHECK YOUR COMPLIANCE SCORE</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Hero Action Banner: Acquire Standardized Lots */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] p-6 sm:p-8 text-white shadow-lg shadow-sky-900/10">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-8 -right-6 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 right-20 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-5 shadow-xs">
          <Flame className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Acquire Standardized Lots
        </h2>
        <p className="mt-2 text-sm sm:text-base text-sky-50 max-w-md font-normal leading-relaxed">
          Order NABL-certified pooled scrap lots tailored for secondary smelting, extrusion, and recycling furnaces at guaranteed parity.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToMarketplace || onAcquireLots}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#0369A1] bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span>Open Marketplace (Buy Lots & Credit)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {onNavigateToLivePrices && (
            <button
              type="button"
              onClick={onNavigateToLivePrices}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-emerald-300" />
              <span>Live Commodity Prices (₹/kg)</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Commodity Stock Exchange Prices Widget (Per Kilogram Quoted) */}
      <LivePriceDashboardWidget
        onNavigateToLivePrices={onNavigateToLivePrices || (() => {})}
        onNavigateToPriceExplainer={onNavigateToPriceExplainer || (() => {})}
        onActionClick={onNavigateToMarketplace || onAcquireLots}
        actionType="PROCESSING_BUY"
      />

      {/* Procurement & Ingestion Overview */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Secondary Smelting Economics
            </span>
            <h3 className="text-lg font-bold text-[#191C1E] mt-1">
              Procurement Spend & Virgin Ore Savings
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Fiscal Month: October 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-1">
              Total Feedstock Ingested
            </span>
            <div className="text-2xl font-black text-sky-950">
              3,850 Tons
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Total Spend: <strong className="text-neutral-900">₹34.8 Lakhs</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Feedstock Cost Reduction
            </span>
            <div className="text-2xl font-black text-emerald-900">
              -28.4% Average
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Saved vs Virgin Metals: <strong className="text-emerald-800">₹14.2 Lakhs</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
              Escrow Settlement Pool
            </span>
            <div className="text-2xl font-black text-emerald-400">
              ₹24.8 Lakhs
            </div>
            <p className="text-neutral-300 text-[11px] mt-1">
              Auto-releases to MSMEs upon spectrometer assay
            </p>
          </div>
        </div>
      </div>

      {/* Waste Diversion Over Time Recharts Visualization */}
      <WasteDiversionChart />

      {/* AVAILABLE MARKETPLACE RESOURCE LOTS (Procure with Credit Line) */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Resource Marketplace Live Feed
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                100% Trade Credit Eligible
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#191C1E] mt-1">
              Available MSME Resource Inventories
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified secondary feedstock lots with NABL spectrometer certificates ready for immediate procurement.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToMarketplace || onAcquireLots}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Open Full Marketplace ({drpDatabase.filter((d) => d.commercialStatus === 'LISTED').length} Lots)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Quick Lots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drpDatabase
            .filter((d) => d.commercialStatus === 'LISTED')
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.drpId}
                className="p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:bg-white hover:border-[#00875A] transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-700">
                      {item.drpId}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.purityScore}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mt-1 truncate" title={item.resourceName}>
                    {item.resourceName}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                    {item.grade}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Spot Rate</span>
                    <span className="font-bold text-neutral-900">{item.marketRate.spotPrice}/kg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Weight</span>
                    <span className="font-bold text-emerald-700">{item.batchWeight}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Value</span>
                    <span className="font-black text-neutral-900">{item.payoutBreakdown.grossLotValue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onInspectDrp(item.drpId)}
                    className="flex-1 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold text-xs transition-colors cursor-pointer text-center"
                  >
                    DRP Passport
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateToMarketplace || onAcquireLots}
                    className="flex-1 py-1.5 rounded-xl bg-[#00875A] hover:bg-[#065F46] text-white font-bold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-xs"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Procure</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* INGESTION QUEUE SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#191C1E]">
              Ingestion Queue & Incoming Shipments
            </h3>
            <p className="text-xs text-neutral-500">
              Live status of categorized raw scrap lots entering secondary processing
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['ALL', 'IN_TRANSIT', 'PROCESSING', 'SMELTED', 'INSPECTION'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setLotFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  lotFilter === filter
                    ? 'bg-[#191C1E] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {filter === 'ALL' ? 'All Lots (4)' : filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Lot Cards */}
        <div className="space-y-4">
          {filteredLots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                    <Layers className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                      {lot.lotName}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {lot.grade} • <strong className="text-neutral-800">{lot.weight}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      lot.status === 'IN_TRANSIT'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : lot.status === 'PROCESSING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : lot.status === 'SMELTED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {lot.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Chemical Assay & Smelter Assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-100">
                  <div className="flex items-center gap-1 text-neutral-500 font-medium text-[11px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>NABL Chemical Assay:</span>
                  </div>
                  <p className="font-bold text-emerald-700 text-xs">
                    {lot.purityScore}
                  </p>
                  <p className="text-neutral-600 text-[11px] mt-0.5">
                    {lot.chemicalAssay}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="flex items-center gap-1 text-sky-800 font-medium text-[11px] mb-1">
                    <Truck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Carrier Telemetry & ETA:</span>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">
                    {lot.transitCarrier}
                  </p>
                  <p className="text-neutral-600 text-[11px] mt-0.5">
                    Status: {lot.eta} • Assigned to: {lot.smelterBay}
                  </p>
                </div>
              </div>

              {/* Bottom Cost & DRP Link */}
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Procurement Cost
                    </span>
                    <span className="font-extrabold text-neutral-900 text-sm">
                      {lot.procurementCost}
                    </span>
                  </div>
                  <div className="border-l border-neutral-200 pl-3">
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Economic Benefit
                    </span>
                    <span className="font-bold text-emerald-700 text-xs">
                      {lot.savingsVsVirginOre}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectDrp(lot.drpId)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer"
                >
                  Inspect DRP Passport ({lot.drpId})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Managed Transit Incoming Consignments Tracker for Processing Buyer */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#166534] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#191C1E]">
                Incoming Managed Transit Consignments
              </h3>
              <p className="text-[11px] text-neutral-500">
                Live multi-stage progress bars and GPS telemetry for scrap lots en route to smelter
              </p>
            </div>
          </div>
          {onViewTransitTracker && (
            <button
              type="button"
              onClick={onViewTransitTracker}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] hover:text-[#0f4423] hover:underline cursor-pointer"
            >
              <span>View Full Transit Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <ManagedTransitTracker
          onInspectDrp={onInspectDrp}
          isCompact={true}
          maxCompactItems={2}
        />
      </div>

      {/* Recent History / Activity Log Section for Processing Enterprise */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0369A1] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#191C1E]">
                Recent Processing & Resource Activity Log
              </h3>
              <p className="text-[11px] text-neutral-500">
                Recent history of industrial resource lots registered, auctioned, or traded by your smelter node
              </p>
            </div>
          </div>
          {onViewActivityLog && (
            <button
              type="button"
              onClick={onViewActivityLog}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1] hover:text-[#0c4a6e] hover:underline cursor-pointer"
            >
              <span>View Full Activity Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <ActivityLogSection
          onInspectDrp={onInspectDrp}
          isCompact={true}
          maxCompactItems={3}
        />
      </div>
    </div>
  );
};
