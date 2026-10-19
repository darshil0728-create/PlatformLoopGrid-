import React, { useState } from 'react';
import {
  Landmark,
  Award,
  Zap,
  ShieldCheck,
  CreditCard,
  DollarSign,
  ArrowRight,
  Download,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Percent,
  Clock,
  ExternalLink,
  ChevronRight,
  Shield,
  FileCheck2,
  Building,
  Check,
  X,
} from 'lucide-react';
import { UdyamAccountDetails } from './ComplianceScorePage';

interface FinancialUnlockPanelProps {
  udyam: UdyamAccountDetails;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
  className?: string;
}

export interface FintechFacilityCard {
  id: string;
  category: 'credit' | 'zed' | 'subsidy';
  title: string;
  provider: string;
  amountLabel: string;
  rateOrBenefit: string;
  badgeLabel: string;
  badgeColor: string;
  description: string;
  actionLabel: string;
  collateral: string;
  status: 'Pre-Approved' | 'Claim Staged' | 'Active Shield' | 'Eligible';
  terms: string;
}

export const FinancialUnlockPanel: React.FC<FinancialUnlockPanelProps> = ({
  udyam,
  onShowToast,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'credit' | 'zed' | 'subsidy'>('all');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<FintechFacilityCard | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Fintech Facilities Deck
  const facilities: FintechFacilityCard[] = [
    // Category 1: Credit Facilities
    {
      id: 'fac-cgtmse',
      category: 'credit',
      title: 'CGTMSE Collateral-Free Credit Line',
      provider: 'SIDBI & Ministry of MSME Partner Consortium',
      amountLabel: '₹2,50,00,000 (₹2.50 Cr)',
      rateOrBenefit: '8.75% APR (-1.50% ESG Trust Rebate)',
      badgeLabel: 'Pre-Approved',
      badgeColor: 'emerald',
      description: 'Zero-collateral working capital & term finance backed by sovereign credit guarantee trust.',
      actionLabel: 'Instant Sanction',
      collateral: 'Zero Collateral Required',
      status: 'Pre-Approved',
      terms: 'Linked directly to URN & GSTN cashflows. Zero physical mortgage.',
    },
    {
      id: 'fac-sidbi4e',
      category: 'credit',
      title: 'SIDBI 4E Concessional Green Capex Loan',
      provider: 'Small Industries Development Bank of India',
      amountLabel: '₹1,20,00,000 (₹1.20 Cr)',
      rateOrBenefit: '6.80% Concessional Fixed APR',
      badgeLabel: 'Fast-Track Approved',
      badgeColor: 'sky',
      description: 'Term funding for 50kW captive rooftop solar, swarf chip centrifuges, and IE4 VFD retrofits.',
      actionLabel: 'Drawdown Capex Loan',
      collateral: 'Hypothecation of Green Machinery Only',
      status: 'Pre-Approved',
      terms: '7-year repayment tenure with funded moratorium from energy savings.',
    },
    {
      id: 'fac-treds',
      category: 'credit',
      title: 'Dynamic TReDS Invoice Liquidity',
      provider: 'RXIL / M1xchange National Gateway',
      amountLabel: '₹48,50,000 Revolving Limit',
      rateOrBenefit: '7.20% p.a. Discounting Rate',
      badgeLabel: 'Live Linked',
      badgeColor: 'purple',
      description: 'T+1 early cash settlement for accepted purchase orders from Tier-1 industrial buyers.',
      actionLabel: 'Discount Invoices',
      collateral: 'Secured Against Corporate POs',
      status: 'Pre-Approved',
      terms: 'Automatic clearinghouse against accepted enterprise invoices.',
    },

    // Category 2: ZED Certification Incentives
    {
      id: 'fac-zed-gold',
      category: 'zed',
      title: 'ZED Gold Certification Reimbursement',
      provider: 'Ministry of MSME / Quality Council of India',
      amountLabel: '80% Direct Subsidy (₹1,20,000)',
      rateOrBenefit: '+ 0.50% Bank Interest Concession',
      badgeLabel: 'Claim Staged',
      badgeColor: 'emerald',
      description: 'Full 80% reimbursement on certification & consultancy, plus ₹50,000 free testing vouchers.',
      actionLabel: 'Claim 80% Subsidy',
      collateral: 'Zero',
      status: 'Claim Staged',
      terms: 'Direct DBT credit into registered enterprise bank account.',
    },
    {
      id: 'fac-zed-silver',
      category: 'zed',
      title: 'ZED Silver & Bronze Tier Upgrades',
      provider: 'Quality Council of India',
      amountLabel: '60% - 75% Cost Coverage',
      rateOrBenefit: 'Fast-Track Gold Upgrade',
      badgeLabel: 'Eligible',
      badgeColor: 'amber',
      description: 'Stepwise progression subsidy covering energy audits, scrap audits, and shop-floor safety checks.',
      actionLabel: 'Upgrade Tier',
      collateral: 'Zero',
      status: 'Eligible',
      terms: 'Subsidized audit slots reserved in Pune & Chakan MIDC cluster.',
    },

    // Category 3: Green Capital Subsidies
    {
      id: 'fac-clcss',
      category: 'subsidy',
      title: 'CLCSS Capital Subsidy for Clean Tech',
      provider: 'Office of DC-MSME, Govt of India',
      amountLabel: '15% Upfront Grant (Up to ₹15 Lakhs)',
      rateOrBenefit: 'Non-Repayable Cash Grant',
      badgeLabel: 'Pre-Matched',
      badgeColor: 'blue',
      description: '15% cash reimbursement on modern CNC machines, closed-loop ETP baffles, and waste heat recovery.',
      actionLabel: 'Stage 15% Claim',
      collateral: 'Zero',
      status: 'Claim Staged',
      terms: 'Requires verified Udyam classification & GST invoice matching.',
    },
    {
      id: 'fac-mnre-tax',
      category: 'subsidy',
      title: 'MNRE Solar 40% Accelerated Depreciation',
      provider: 'Ministry of New & Renewable Energy / CBDT',
      amountLabel: '₹4,80,000 Tax Deduction',
      rateOrBenefit: '40% Year-1 Tax Write-Off',
      badgeLabel: 'Auto-Calculated',
      badgeColor: 'emerald',
      description: 'Deduct 40% of the captive rooftop solar plant value against taxable corporate profit in Year 1.',
      actionLabel: 'Generate Tax Schedule',
      collateral: 'Zero',
      status: 'Active Shield',
      terms: 'Auto-generated Form 3CD depreciation annexure ready for CA filing.',
    },
    {
      id: 'fac-samadhaan',
      category: 'subsidy',
      title: 'MSME Samadhaan Statutory Payment Shield',
      provider: 'Ministry of MSME Statutory Facilitation Council',
      amountLabel: '₹18,40,000 Receivables Shield',
      rateOrBenefit: '3x RBI Compound Interest Penalty',
      badgeLabel: 'Active Protection',
      badgeColor: 'indigo',
      description: 'Statutory 45-day payment recovery guarantee protecting against buyer delayed payments.',
      actionLabel: 'View Protected Invoices',
      collateral: 'Sovereign Statute Section 16',
      status: 'Active Shield',
      terms: 'Mandatory statutory recovery with penal compound interest.',
    },
  ];

  const filteredFacilities = facilities.filter(
    (f) => activeCategory === 'all' || f.category === activeCategory
  );

  const handleExecuteAction = (facility: FintechFacilityCard) => {
    setSelectedFacilityModal(facility);
  };

  const handleConfirmDisbursement = () => {
    if (!selectedFacilityModal) return;
    setIsProcessingAction(true);

    setTimeout(() => {
      setIsProcessingAction(false);
      onShowToast(
        'Transaction Executed',
        `${selectedFacilityModal.title} (${selectedFacilityModal.amountLabel}) processed successfully! Linked to Bank Account ${udyam.bankAccount}.`,
        'success'
      );
      setSelectedFacilityModal(null);
    }, 1200);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* FINTECH HEADER CARD */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL FINTECH SUITE</span>
              </span>
              <span className="text-xs text-slate-400">· Sovereign Udyam Backed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Financial Unlock Panel
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Your environmental compliance transforms into hard currency. Access pre-approved collateral-free credit lines, 80% ZED Gold reimbursement grants, and green capex subsidies directly into your bank account.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col justify-between space-y-1 flex-shrink-0 min-w-[240px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL SANCTION CAPACITY UNLOCKED
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
              ₹4,18,50,000
            </div>
            <span className="text-[11px] text-slate-300">
              Pre-approved credit & direct cash subsidies
            </span>
          </div>
        </div>

        {/* FINTECH CATEGORY TABS */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            All Financial Facilities (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('credit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'credit'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-sky-400" />
            <span>Credit Facilities (3)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('zed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'zed'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZED Certification Incentives (2)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('subsidy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'subsidy'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Green Capital Grants (3)</span>
          </button>
        </div>
      </div>

      {/* FINTECH CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:border-emerald-500/80 hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-neutral-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
                  {facility.provider}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                    facility.badgeColor === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : facility.badgeColor === 'sky'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : facility.badgeColor === 'purple'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {facility.badgeLabel}
                </span>
              </div>

              {/* Facility Amount & Title */}
              <div className="mt-3 space-y-1">
                <div className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                  {facility.amountLabel}
                </div>
                <h4 className="text-sm font-extrabold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  {facility.title}
                </h4>
              </div>

              {/* Rate & Details */}
              <div className="mt-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Interest / Benefit:</span>
                  <strong className="text-emerald-700 font-bold">{facility.rateOrBenefit}</strong>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-neutral-400">Security:</span>
                  <span className="text-neutral-700 font-semibold">{facility.collateral}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {facility.description}
              </p>
            </div>

            {/* Bottom 1-Click Action Button */}
            <div className="pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => handleExecuteAction(facility)}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#0F172A] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{facility.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FINTECH EXECUTION MODAL */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">
                    {selectedFacilityModal.title}
                  </h3>
                  <span className="text-xs text-neutral-500">{selectedFacilityModal.provider}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFacilityModal(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Sanctioned Amount:</span>
                <strong className="text-neutral-900 font-mono text-sm">{selectedFacilityModal.amountLabel}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Effective Rate / Benefit:</span>
                <strong className="text-emerald-700 font-bold">{selectedFacilityModal.rateOrBenefit}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Collateral Requirement:</span>
                <span className="font-semibold text-neutral-800">{selectedFacilityModal.collateral}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Linked Bank Account:</span>
                <span className="font-mono font-bold text-neutral-900">{udyam.bankAccount}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              <strong>Institutional Protocol:</strong> This facility is underwritten against your verified Udyam registration (URN: <strong className="font-mono">{udyam.udyamNumber}</strong>) and verified CPCB/SPCB green compliance score. Zero duplicate mortgage documentation is required.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedFacilityModal(null)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDisbursement}
                disabled={isProcessingAction}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5 disabled:opacity-70"
              >
                {isProcessingAction ? (
                  <span>Disbursing via National Gateway...</span>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm & Credit to Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
