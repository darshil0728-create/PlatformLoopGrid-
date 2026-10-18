import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  FileCheck2,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Building2,
  Percent,
  Lock,
  Boxes
} from 'lucide-react';
import { DRPRecord } from './drpData';

interface CreditFacility {
  id: string;
  msmeEnterprise: string;
  location: string;
  invoiceValue: string;
  advanceDisbursed: string;
  ltvRatio: string;
  collateralDrp: string;
  collateralResource: string;
  interestRate: string;
  tenor: string;
  status: 'DISBURSED' | 'IN_REVIEW' | 'REPAID' | 'ESCROW_LOCKED';
  underwritingScore: string;
  clearinghouseUtr?: string;
  repaymentDueDate: string;
}

interface FinancingDashboardViewProps {
  onInspectDrp: (drpId: string) => void;
  onUnderwriteAdvance: () => void;
}

export const FinancingDashboardView: React.FC<FinancingDashboardViewProps> = ({
  onInspectDrp,
  onUnderwriteAdvance,
}) => {
  const [advanceFilter, setAdvanceFilter] = useState<'ALL' | 'DISBURSED' | 'IN_REVIEW' | 'REPAID' | 'ESCROW_LOCKED'>('ALL');

  const facilities: CreditFacility[] = [
    {
      id: 'fin-01',
      msmeEnterprise: 'Apex Precision Works Pvt Ltd',
      location: 'Peenya Industrial Estate, Bengaluru',
      invoiceValue: '₹42,500',
      advanceDisbursed: '₹38,250',
      ltvRatio: '90% LTV',
      collateralDrp: 'DRP-2026-AL-8921',
      collateralResource: 'Alloy 6061 Aluminum Swarf (500 kg NABL Verified)',
      interestRate: '9.25% p.a.',
      tenor: '30 Days Tenor',
      status: 'DISBURSED',
      underwritingScore: '99/100 (AAA Tier-1 Ancillary)',
      clearinghouseUtr: 'SYN-CITI-2026-99182',
      repaymentDueDate: 'Nov 16, 2026 (Auto-deducted from Smelter Escrow)',
    },
    {
      id: 'fin-02',
      msmeEnterprise: 'Surat Eco-Weave Mills',
      location: 'Sachin GIDC, Surat, Gujarat',
      invoiceValue: '₹28,800',
      advanceDisbursed: '₹25,920',
      ltvRatio: '90% LTV',
      collateralDrp: 'DRP-2026-TX-4112',
      collateralResource: 'Denim Selvedge Raw Bales (1.2 Tons CIRCOT Tested)',
      interestRate: '9.50% p.a.',
      tenor: '15 Days Tenor',
      status: 'DISBURSED',
      underwritingScore: '96/100 (AA+ Validated)',
      clearinghouseUtr: 'SYN-HDFC-2026-38419',
      repaymentDueDate: 'Oct 28, 2026',
    },
    {
      id: 'fin-03',
      msmeEnterprise: 'Chakan Precision Molding Unit 3',
      location: 'Chakan MIDC, Pune',
      invoiceValue: '₹34,000',
      advanceDisbursed: '₹30,600 (Requested)',
      ltvRatio: '90% LTV',
      collateralDrp: 'DRP-2026-PL-7729',
      collateralResource: 'Virgin HDPE Regrind (850 kg CIPET Assay)',
      interestRate: '9.25% p.a.',
      tenor: '21 Days Tenor',
      status: 'IN_REVIEW',
      underwritingScore: '98/100 (Pre-Approved Automated Line)',
      repaymentDueDate: 'Pending Final Digital Mandate',
    },
    {
      id: 'fin-04',
      msmeEnterprise: 'Karnataka Oil Reclamation Syndicate',
      location: 'Peenya CNC Turning Belt',
      invoiceValue: '₹18,400',
      advanceDisbursed: '₹16,560',
      ltvRatio: '90% LTV',
      collateralDrp: 'DRP-2026-OL-0391',
      collateralResource: 'ISO VG 46 Hydraulic Oil (200 L)',
      interestRate: '9.25% p.a.',
      tenor: '14 Days Tenor',
      status: 'REPAID',
      underwritingScore: '100/100 (Full Cycle Cleared)',
      clearinghouseUtr: 'SYN9921008432-CLR',
      repaymentDueDate: 'Repaid & Escrow Closed (Oct 02, 2026)',
    },
  ];

  const filteredFacilities = facilities.filter((f) => {
    if (advanceFilter === 'ALL') return true;
    return f.status === advanceFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Action Banner: Deploy Working Capital */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] p-6 sm:p-8 text-white shadow-lg shadow-purple-900/10">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-8 -right-6 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 right-20 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-5 shadow-xs">
          <Landmark className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          MSME Working Capital Underwriting
        </h2>
        <p className="mt-2 text-sm sm:text-base text-purple-100 max-w-md font-normal leading-relaxed">
          Provide instant T+24h invoice advances for resource providers, 100% collateralized by physical DRP passports and processing buyer escrow accounts.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onUnderwriteAdvance}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#5B21B6] bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span>Review Credit Applications</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Credit & Risk Overview */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Syndicate Credit Ledger
            </span>
            <h3 className="text-lg font-bold text-[#191C1E] mt-1">
              Active Lending Portfolio & Collateral Ratio
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Zero Default Guarantee (0.00% NPA)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block mb-1">
              Total Credit Disbursed
            </span>
            <div className="text-2xl font-black text-purple-950">
              ₹4.85 Crore
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Active Outstanding: <strong className="text-neutral-900">₹34.2 Lakhs</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              On-Time Repayment Ratio
            </span>
            <div className="text-2xl font-black text-emerald-900">
              99.9% Cleared
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Net Interest Yield: <strong className="text-emerald-800">9.25% p.a.</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Escrow Liquidity Vault
            </span>
            <div className="text-2xl font-black text-emerald-400">
              ₹82.4 Lakhs
            </div>
            <p className="text-neutral-300 text-[11px] mt-1">
              100% Backed by verified buyer purchase orders
            </p>
          </div>
        </div>
      </div>

      {/* FACILITIES / ADVANCES LIST */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#191C1E]">
              DRP Collateral Portfolio & Advances
            </h3>
            <p className="text-xs text-neutral-500">
              MSME invoice discounting facilities backed by verified scrap and materials
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['ALL', 'DISBURSED', 'IN_REVIEW', 'REPAID', 'ESCROW_LOCKED'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setAdvanceFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  advanceFilter === filter
                    ? 'bg-[#191C1E] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {filter === 'ALL' ? 'All Advances (4)' : filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Facility Cards */}
        <div className="space-y-4">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                    <Building2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                      {fac.msmeEnterprise}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {fac.location} • <strong className="text-purple-700">{fac.ltvRatio}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      fac.status === 'DISBURSED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : fac.status === 'IN_REVIEW'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {fac.status}
                  </span>
                </div>
              </div>

              {/* Collateral & Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-100">
                  <div className="flex items-center gap-1 text-neutral-500 font-medium text-[11px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Collateral DRP & Physical Resource:</span>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">
                    {fac.collateralResource}
                  </p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    Credit Rating: <strong className="text-emerald-700">{fac.underwritingScore}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-1 text-purple-800 font-medium text-[11px] mb-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Tenor & Settlement:</span>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">
                    {fac.tenor} @ {fac.interestRate}
                  </p>
                  <p className="text-neutral-600 text-[11px] mt-0.5 truncate">
                    {fac.repaymentDueDate}
                  </p>
                </div>
              </div>

              {/* Bottom Financial Values */}
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Invoice Face Value
                    </span>
                    <span className="font-semibold text-neutral-700 text-sm">
                      {fac.invoiceValue}
                    </span>
                  </div>
                  <div className="border-l border-neutral-200 pl-3">
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Advance Disbursed
                    </span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      {fac.advanceDisbursed}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectDrp(fac.collateralDrp)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer"
                >
                  Verify DRP Collateral ({fac.collateralDrp})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
