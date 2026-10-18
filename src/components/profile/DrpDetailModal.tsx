import React from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  Truck,
  MapPin,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  Navigation,
  Phone,
  Layers,
  ArrowRight,
  ExternalLink,
  Building2,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { DRPRecord } from './drpData';
import { useLanguage } from '../../context/LanguageContext';

interface DrpDetailModalProps {
  drp: DRPRecord;
  onClose: () => void;
}

export const DrpDetailModal: React.FC<DrpDetailModalProps> = ({ drp, onClose }) => {
  const { t } = useLanguage();
  const getStatusBadge = (status: DRPRecord['commercialStatus']) => {
    switch (status) {
      case 'BEING_SOLD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            BEING SOLD (ACTIVE AUCTION / MATCHING)
          </span>
        );
      case 'IN_TRANSIT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
            SOLD & IN TRANSIT TO SMELTER
          </span>
        );
      case 'SOLD':
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            SOLD & DELIVERED (SETTLED)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
            CATALOGED & LISTED
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 my-auto overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-[#FAFBFB] border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1B5E20] uppercase tracking-wider">
                  {t.drpModal.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                  {t.drpModal.sovereignBadge}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#191C1E] mt-0.5">
                {drp.resourceName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
            aria-label="Close DRP Passport"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Identity & Status Snapshot */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7]">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#C8E6C9] flex items-center justify-center text-neutral-800 shadow-xs flex-shrink-0">
                <QrCode className="w-11 h-11" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#166534] bg-white px-2.5 py-0.5 rounded border border-[#C8E6C9]">
                  {drp.drpId}
                </span>
                <p className="text-xs font-semibold text-neutral-800 mt-1">
                  Batch: {drp.batchWeight} • {drp.category}
                </p>
                <p className="text-[11px] text-neutral-500 font-mono truncate max-w-xs">
                  Hash: {drp.verificationHash}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                Commercial Stage
              </span>
              {getStatusBadge(drp.commercialStatus)}
            </div>
          </div>

          {/* 1. CURRENT CUSTODY & PHYSICAL LOCATION */}
          <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                1. Current Physical Location & Custody
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-start justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-neutral-900 block text-sm">
                  {drp.currentLocation}
                </span>
                <span className="text-neutral-500 mt-0.5 block">
                  Origin: {drp.originCluster} → Destination: {drp.buyerCluster}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase whitespace-nowrap">
                Geo-Verified
              </span>
            </div>
          </div>

          {/* 2 & 3. COMMERCIAL STATUS (IS IT BEING SOLD / IS IT SOLD?) */}
          <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                2 & 3. Sales State & Buyer Contract
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[11px]">Trade Status:</span>
                <span className="font-bold text-neutral-800 text-sm mt-0.5 block">
                  {drp.commercialStatus === 'IN_TRANSIT' || drp.commercialStatus === 'SOLD' || drp.commercialStatus === 'DELIVERED'
                    ? 'SOLD & CONTRACT LOCKED'
                    : 'CURRENTLY BEING SOLD / BIDDING'}
                </span>
                <span className="text-neutral-500 text-[11px] mt-1 block">
                  Contract PO: {drp.purchaseOrderId || 'Generating automated clearing lock'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[11px]">Assigned Buyer:</span>
                <span className="font-bold text-[#0369A1] text-sm mt-0.5 block">
                  {drp.buyerName || 'Open for Regional Smelters'}
                </span>
                <span className="text-neutral-500 text-[11px] mt-1 block">
                  Escrow Guarantee: 100% Backed via Smart Clearinghouse
                </span>
              </div>
            </div>
          </div>

          {/* 4. LIVE TRACKING TELEMETRY IF IN TRANSIT */}
          {drp.transitDetails && (
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-700 animate-spin" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    4. In-Transit Live GPS Telemetry
                  </h3>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-2xs">
                  ⚡ {drp.transitDetails.speed}
                </span>
              </div>

              {/* Vehicle & Driver Card */}
              <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-2xs mb-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-neutral-900">
                      {drp.transitDetails.vehicleNumber}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500">
                    {drp.transitDetails.carrierName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-600 pt-1 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">Driver:</span>
                    <span className="font-semibold text-neutral-800">
                      {drp.transitDetails.driverName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Phone className="w-3 h-3" />
                    <span>{drp.transitDetails.driverPhone}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Milestones */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-blue-900">
                    Current Milestone: {drp.transitDetails.currentMilestone}
                  </span>
                  <span className="text-blue-700 font-bold">
                    ETA: {drp.transitDetails.eta}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-[#0284C7] rounded-full transition-all duration-500"
                    style={{ width: `${drp.transitDetails.routeProgressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span className="truncate max-w-[45%]">Origin: {drp.transitDetails.originAddress}</span>
                  <span className="truncate max-w-[45%] text-right">Destination: {drp.transitDetails.destinationAddress}</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. CURRENT MARKET RATE GOING ON FOR THOSE RESOURCES */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  5. Current Spot Market Rate
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                {drp.marketRate.benchmarkTrend}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-emerald-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Live Clearing Rate
                </span>
                <span className="text-lg font-black text-[#1B5E20] block mt-0.5">
                  {drp.marketRate.spotPrice}
                </span>
                <span className="text-[10px] text-neutral-500">{drp.marketRate.priceUnit}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  24h High / Low
                </span>
                <span className="font-bold text-neutral-800 block mt-0.5">
                  {drp.marketRate.dailyHigh} / {drp.marketRate.dailyLow}
                </span>
                <span className="text-[10px] text-neutral-500">MCX / Secondary Index</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Price Authority
                </span>
                <span className="font-medium text-neutral-700 block mt-0.5 text-[11px]">
                  {drp.marketRate.indexName}
                </span>
              </div>
            </div>
          </div>

          {/* 6. FINAL PAYOUT THAT THE UNIT IS GOING TO ACHIEVE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white shadow-md">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  6. Final Unit Payout Waterfall
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                Status: {drp.payoutBreakdown.settlementStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs divide-y divide-neutral-800">
              <div className="flex justify-between py-1 text-neutral-300">
                <span>Gross Lot Value ({drp.batchWeight} @ {drp.marketRate.spotPrice}/{drp.marketRate.priceUnit}):</span>
                <span className="font-semibold text-white">{drp.payoutBreakdown.grossLotValue}</span>
              </div>
              <div className="flex justify-between py-1 text-neutral-400">
                <span>Transit Freight Deduction:</span>
                <span className="font-medium text-amber-400">{drp.payoutBreakdown.transitFreightDeduction}</span>
              </div>
              <div className="flex justify-between py-1 text-neutral-400">
                <span>Platform Clearinghouse Protocol (4%):</span>
                <span className="font-medium text-neutral-400">{drp.payoutBreakdown.platformClearingFee}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-white">Net Payout to Your Unit:</span>
                <span className="text-emerald-400 text-base">{drp.payoutBreakdown.netUnitPayout}</span>
              </div>
            </div>

            {drp.payoutBreakdown.utrNumber && (
              <div className="mt-3 p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Bank Settlement UTR:</span>
                <span className="font-mono font-bold text-emerald-300">{drp.payoutBreakdown.utrNumber}</span>
              </div>
            )}
            <p className="text-[10px] text-neutral-400 mt-2">
              Settlement Timeline: {drp.payoutBreakdown.settlementDate || 'T+24h on digital gate receipt'}
            </p>
          </div>

          {/* Chemical Assay & Purity Accreditation */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
            <h4 className="font-bold text-neutral-800 text-xs uppercase tracking-wider">
              Material Specification & NABL Certification
            </h4>
            <div className="grid grid-cols-2 gap-2 text-neutral-600">
              <div>
                <span className="text-neutral-400 block text-[10px]">Material Grade:</span>
                <span className="font-medium text-neutral-900">{drp.grade}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Purity Assay:</span>
                <span className="font-bold text-emerald-700">{drp.purityScore}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Testing Lab:</span>
                <span className="font-medium text-neutral-900">{drp.nablLab}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">CO₂ Abatement:</span>
                <span className="font-bold text-blue-700">{drp.co2Saved}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Verified by LoopGrid Protocol
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#191C1E] hover:bg-[#1B5E20] transition-colors shadow-xs cursor-pointer"
          >
            {t.drpModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
