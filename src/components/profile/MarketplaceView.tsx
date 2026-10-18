import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Sparkles,
  HelpCircle,
  Truck,
  Building2,
  Landmark,
  CreditCard,
  DollarSign,
  Clock,
  Layers,
  MapPin,
  ChevronRight,
  X,
  FileText,
  AlertCircle,
  Zap,
  Info,
  TrendingDown,
  Award,
  Calendar,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { DRPRecord } from './drpData';
import { useLanguage } from '../../context/LanguageContext';

export interface MarketplaceViewProps {
  drpDatabase: DRPRecord[];
  onPurchaseLot: (
    drpId: string,
    paymentMethod: 'ESCROW_WALLET' | 'CREDIT_FACILITY',
    creditTerm?: '30_DAYS' | '60_DAYS' | '90_DAYS'
  ) => void;
  onInspectDrp: (drpId: string) => void;
  onNavigateToHowMarketplaceWorks: () => void;
  preFilterCategory?: string;
  enterpriseName: string;
}

interface ActiveCreditDrawdown {
  id: string;
  lender: string;
  lotDrp: string;
  resourceName: string;
  amountFinanced: number;
  tenor: string;
  interestRate: string;
  dueDate: string;
  status: 'ACTIVE' | 'SETTLED';
}

const SAMPLE_ACTIVE_DRAWDOWN: ActiveCreditDrawdown = {
  id: 'CRD-SIDBI-44910',
  lender: 'SIDBI Industrial Credit Fund',
  lotDrp: 'DRP-2026-AL-8921',
  resourceName: 'Alloy 6061 Aluminum Swarf (5.0 Tons)',
  amountFinanced: 450500,
  tenor: '60 Days',
  interestRate: '2.0% fixed',
  dueDate: 'December 17, 2026',
  status: 'ACTIVE',
};

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  drpDatabase,
  onPurchaseLot,
  onInspectDrp,
  onNavigateToHowMarketplaceWorks,
  preFilterCategory,
  enterpriseName,
}) => {
  const { t } = useLanguage();
  const [activeMarketTab, setActiveMarketTab] = useState<'INVENTORIES' | 'CREDIT_FACILITY'>('INVENTORIES');
  const [selectedCategory, setSelectedCategory] = useState<string>(preFilterCategory || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'DEFAULT' | 'PRICE_ASC' | 'PRICE_DESC' | 'PURITY'>('DEFAULT');
  const [selectedLotForPurchase, setSelectedLotForPurchase] = useState<DRPRecord | null>(null);

  // Purchase Modal Form State
  const [paymentMethod, setPaymentMethod] = useState<'ESCROW_WALLET' | 'CREDIT_FACILITY'>('CREDIT_FACILITY');
  const [creditTerm, setCreditTerm] = useState<'30_DAYS' | '60_DAYS' | '90_DAYS'>('60_DAYS');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState<DRPRecord | null>(null);
  const [generatedCreditRef, setGeneratedCreditRef] = useState<string>('');

  // Credit Facility Limits
  const creditLimitTotal = 5000000; // ₹50 Lakhs
  const [creditUtilized, setCreditUtilized] = useState(480000);
  const creditAvailable = creditLimitTotal - creditUtilized;

  // Available lots for purchase: Must have commercialStatus === 'LISTED'
  const availableLots = drpDatabase
    .filter((drp) => {
      const isListed = drp.commercialStatus === 'LISTED';
      const matchesCategory =
        selectedCategory === 'ALL' ||
        drp.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === '' ||
        drp.drpId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drp.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drp.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drp.originCluster.toLowerCase().includes(searchQuery.toLowerCase());

      return isListed && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.marketRate.spotPrice.replace(/[^0-9.-]+/g, '')) || 0;
      const priceB = parseFloat(b.marketRate.spotPrice.replace(/[^0-9.-]+/g, '')) || 0;
      const purityA = parseFloat(a.purityScore.replace(/[^0-9.-]+/g, '')) || 0;
      const purityB = parseFloat(b.purityScore.replace(/[^0-9.-]+/g, '')) || 0;

      if (sortBy === 'PRICE_ASC') return priceA - priceB;
      if (sortBy === 'PRICE_DESC') return priceB - priceA;
      if (sortBy === 'PURITY') return purityB - purityA;
      return 0;
    });

  // Calculate pricing estimates for purchase modal
  const lot = selectedLotForPurchase;
  const grossValNum = lot
    ? Number(lot.payoutBreakdown.grossLotValue.replace(/[^0-9.-]+/g, '')) || 45000
    : 0;
  const transitCost = Math.round(grossValNum * 0.06);
  const totalDue = grossValNum + transitCost;

  const creditInterestRate =
    creditTerm === '30_DAYS' ? 0.011 : creditTerm === '60_DAYS' ? 0.02 : 0.028;
  const creditFee = Math.round(totalDue * creditInterestRate);
  const totalWithCredit = totalDue + (paymentMethod === 'CREDIT_FACILITY' ? creditFee : 0);

  // Calculate repayment due date string
  const getRepaymentDueDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const currentDueDate =
    creditTerm === '30_DAYS'
      ? getRepaymentDueDate(30)
      : creditTerm === '60_DAYS'
      ? getRepaymentDueDate(60)
      : getRepaymentDueDate(90);

  const handleConfirmPurchase = () => {
    if (!lot) return;
    const refCode = `CRD-TATA-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedCreditRef(refCode);

    if (paymentMethod === 'CREDIT_FACILITY') {
      setCreditUtilized((prev) => prev + totalWithCredit);
    }

    onPurchaseLot(
      lot.drpId,
      paymentMethod,
      paymentMethod === 'CREDIT_FACILITY' ? creditTerm : undefined
    );
    setPurchaseSuccess(lot);
    setSelectedLotForPurchase(null);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-16">
      {/* Top Banner with "How Marketplace Works" Button & Credit Facility Headline */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-neutral-800 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold border border-white/10">
              <ShoppingCart className="w-3.5 h-3.5 text-sky-400" />
              <span>Processing Enterprise Procurement • Verified Inventories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Secondary Resource Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Procure certified industrial scrap lots uploaded by verified MSME producers. All materials are spectrometer-tested with NABL 17025 assays, weighed on calibrated weighbridges, and eligible for <strong className="text-emerald-300">instant trade credit financing</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 relative z-10">
            {/* HOW MARKETPLACE WORKS BUTTON (Leads to Separate Visual Page) */}
            <button
              type="button"
              onClick={onNavigateToHowMarketplaceWorks}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-neutral-900 bg-white hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-md cursor-pointer group"
              title="See visual explanation of marketplace workflows and credit facility"
            >
              <HelpCircle className="w-4 h-4 text-sky-600 group-hover:rotate-12 transition-transform" />
              <span>How Marketplace Works</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Integrated Credit Facility Status Box */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-500/30 shadow-inner">
              <Landmark className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  Integrated Trade Credit Facility Active
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-neutral-900">
                  Pre-Approved
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {enterpriseName} is approved for working capital financing through <strong className="text-white">SIDBI</strong> and <strong className="text-white">Tata Capital</strong>. Procure scrap lots today and defer payment for up to 90 days.
              </p>
            </div>
          </div>

          {/* Credit Limit Meter */}
          <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-300 text-[11px]">Available Credit:</span>
              <span className="font-black text-emerald-300 text-sm">
                ₹{(creditAvailable / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (creditUtilized / creditLimitTotal) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span>Sanctioned: ₹50.0 Lakhs</span>
              <span>Utilized: ₹{(creditUtilized / 100000).toFixed(2)}L</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs: Available Inventories vs Credit Lines */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMarketTab('INVENTORIES')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMarketTab === 'INVENTORIES'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            Available Lots ({availableLots.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveMarketTab('CREDIT_FACILITY')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMarketTab === 'CREDIT_FACILITY'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-600" />
            <span>Credit Line Facility</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>

        <span className="text-xs text-neutral-400 hidden sm:inline">
          Refreshed: Real-time CPCB Clearinghouse
        </span>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: INVENTORY LOTS MARKETPLACE                        */}
      {/* ======================================================== */}
      {activeMarketTab === 'INVENTORIES' && (
        <div className="space-y-5">
          {/* Search, Filter & Sort Controls */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search available inventories by alloy, grade, lot ID, or cluster..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00875A]/30 bg-neutral-50/50"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold py-2 px-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="DEFAULT">Default (Newest Listings)</option>
                  <option value="PRICE_ASC">Price: Low to High (₹/kg)</option>
                  <option value="PRICE_DESC">Price: High to Low (₹/kg)</option>
                  <option value="PURITY">Purity: Highest First</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {['ALL', 'Metals & Alloys', 'Polymers & Plastics', 'Textiles & Leather', 'Industrial Lubricants'].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#191C1E] text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Uploaded Inventories' : cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Available Lots Grid */}
          {availableLots.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-neutral-800">
                No Listed Lots Match Your Criteria
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try resetting your search filter or category selection. New MSME lots are uploaded continuously.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                  setSortBy('DEFAULT');
                }}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#00875A] bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {availableLots.map((item) => (
                <div
                  key={item.drpId}
                  className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:border-[#00875A] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header with Badges */}
                  <div className="p-5 pb-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                        {item.drpId}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {item.purityScore} Purity
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                          Credit Eligible
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 group-hover:text-[#00875A] transition-colors leading-snug mt-0.5">
                        {item.resourceName}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                        {item.grade}
                      </p>
                    </div>
                  </div>

                  {/* Price & Weight Box */}
                  <div className="px-5 py-3 bg-neutral-50/70 border-y border-neutral-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Spot Rate (₹/kg)
                      </span>
                      <span className="font-black text-neutral-900 text-base">
                        {item.marketRate.spotPrice}
                      </span>
                      <span className="text-[10px] text-neutral-500 ml-0.5">/kg</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Batch Weight
                      </span>
                      <span className="font-bold text-emerald-700 text-sm">
                        {item.batchWeight}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Total Lot Value
                      </span>
                      <span className="font-black text-neutral-900 text-base">
                        {item.payoutBreakdown.grossLotValue}
                      </span>
                    </div>
                  </div>

                  {/* Location & Actions */}
                  <div className="p-5 pt-3 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                        <span className="truncate">{item.originCluster}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 flex-shrink-0">
                        Save ~26% vs Ore
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onInspectDrp(item.drpId)}
                        className="flex-1 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition-colors cursor-pointer text-center"
                      >
                        Inspect DRP
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedLotForPurchase(item)}
                        className="flex-1 py-2 rounded-xl bg-[#00875A] hover:bg-[#065F46] text-white font-bold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Procure Lot</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CREDIT FACILITY DASHBOARD                         */}
      {/* ======================================================== */}
      {activeMarketTab === 'CREDIT_FACILITY' && (
        <div className="space-y-6 animate-fade-in">
          {/* Credit Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Total Credit Facility
              </span>
              <div className="text-2xl font-black text-neutral-900">
                ₹50,00,000
              </div>
              <p className="text-xs text-emerald-600 font-medium">
                • Sanctioned by SIDBI & Tata Capital
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Available to Draw
              </span>
              <div className="text-2xl font-black text-emerald-700">
                ₹{(creditAvailable).toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-neutral-500">
                • Instant 1-click checkout drawdowns
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Financing Interest Rates
              </span>
              <div className="text-2xl font-black text-sky-800">
                1.1% - 2.8%
              </div>
              <p className="text-xs text-neutral-500">
                • Depending on tenor (30, 60, or 90 days)
              </p>
            </div>
          </div>

          {/* Active Advances Table */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h4 className="text-base font-bold text-neutral-900">
                  Active Trade Credit Advances
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Working capital advances drawn against procured DRP scrap consignments.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                1 Active Consignment
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5">Advance Ref</th>
                    <th className="py-2.5">Financing Partner</th>
                    <th className="py-2.5">Resource Consignment</th>
                    <th className="py-2.5">Financed Amount</th>
                    <th className="py-2.5">Tenor & Rate</th>
                    <th className="py-2.5">Maturity Date</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  <tr>
                    <td className="py-3 font-mono font-bold text-neutral-900">
                      {SAMPLE_ACTIVE_DRAWDOWN.id}
                    </td>
                    <td className="py-3 font-medium text-neutral-900">
                      {SAMPLE_ACTIVE_DRAWDOWN.lender}
                    </td>
                    <td className="py-3">
                      <span className="font-bold text-neutral-800 block">
                        {SAMPLE_ACTIVE_DRAWDOWN.resourceName}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {SAMPLE_ACTIVE_DRAWDOWN.lotDrp}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-neutral-900">
                      ₹{SAMPLE_ACTIVE_DRAWDOWN.amountFinanced.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3">
                      <span className="font-semibold">{SAMPLE_ACTIVE_DRAWDOWN.tenor}</span>
                      <span className="text-[10px] text-neutral-400 block">
                        ({SAMPLE_ACTIVE_DRAWDOWN.interestRate})
                      </span>
                    </td>
                    <td className="py-3 font-medium text-neutral-800">
                      {SAMPLE_ACTIVE_DRAWDOWN.dueDate}
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-sky-50 text-sky-800 border border-sky-200">
                        ACTIVE IN TRANSIT
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <span>
                Automatic Escrow Settlement: When the shipment arrives at your secondary smelter and passes weighbridge inspection (±0.5% weight tolerance), the credit advance settles the seller immediately while giving your enterprise the full tenor to clear payment.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PURCHASE & CREDIT FACILITY MODAL                         */}
      {/* ======================================================== */}
      {selectedLotForPurchase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Procure Resource Lot & Select Financing
                  </h3>
                  <p className="text-xs text-neutral-500">
                    DRP ID: {selectedLotForPurchase.drpId} • {selectedLotForPurchase.resourceName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLotForPurchase(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lot Summary Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Resource:</span>
                <span className="font-bold text-neutral-900">{selectedLotForPurchase.resourceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Weight & Purity:</span>
                <span className="font-semibold text-neutral-800">
                  {selectedLotForPurchase.batchWeight} • {selectedLotForPurchase.purityScore}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Spot Rate (₹/kg):</span>
                <span className="font-bold text-neutral-900">
                  {selectedLotForPurchase.marketRate.spotPrice}/kg
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-200">
                <span className="text-neutral-500">Base Lot Value:</span>
                <span className="font-bold text-neutral-900">
                  {selectedLotForPurchase.payoutBreakdown.grossLotValue}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Corridor Freight (Est. 6%):</span>
                <span className="font-semibold text-neutral-700">₹{transitCost.toLocaleString()}</span>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                Select Settlement Mode
              </label>

              {/* Option 1: Integrated Trade Credit Facility */}
              <div
                onClick={() => setPaymentMethod('CREDIT_FACILITY')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                  paymentMethod === 'CREDIT_FACILITY'
                    ? 'border-[#00875A] bg-[#F4FBF5]'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900">
                          Integrated Trade Credit Facility
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Zero Cash Upfront
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Financed via integrated institutional partners (Tata Capital & SIDBI). Pay at end of tenor.
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'CREDIT_FACILITY'}
                    onChange={() => setPaymentMethod('CREDIT_FACILITY')}
                    className="accent-[#00875A] mt-1"
                  />
                </div>

                {/* Credit Term Selector (Visible when credit facility is chosen) */}
                {paymentMethod === 'CREDIT_FACILITY' && (
                  <div className="pt-2 border-t border-emerald-200/60 space-y-2">
                    <span className="text-[11px] font-bold text-neutral-700 block">
                      Choose Credit Repayment Tenor:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCreditTerm('30_DAYS')}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          creditTerm === '30_DAYS'
                            ? 'border-[#00875A] bg-white text-neutral-900 shadow-xs ring-1 ring-emerald-500'
                            : 'border-neutral-200 bg-white/50 text-neutral-600'
                        }`}
                      >
                        <span className="font-bold text-xs block">30 Days</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">1.1% fee</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCreditTerm('60_DAYS')}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          creditTerm === '60_DAYS'
                            ? 'border-[#00875A] bg-white text-neutral-900 shadow-xs ring-1 ring-emerald-500'
                            : 'border-neutral-200 bg-white/50 text-neutral-600'
                        }`}
                      >
                        <span className="font-bold text-xs block">60 Days</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">2.0% fee</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCreditTerm('90_DAYS')}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          creditTerm === '90_DAYS'
                            ? 'border-[#00875A] bg-white text-neutral-900 shadow-xs ring-1 ring-emerald-500'
                            : 'border-neutral-200 bg-white/50 text-neutral-600'
                        }`}
                      >
                        <span className="font-bold text-xs block">90 Days</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">2.8% fee</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-emerald-100 text-[11px] text-neutral-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Financing Fee ({creditTerm.replace('_', ' ')}):</span>
                        <strong className="text-neutral-800">₹{creditFee.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Repayment Due Date:</span>
                        <strong className="text-emerald-800">{currentDueDate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Upfront Payment Today:</span>
                        <strong className="text-emerald-600">₹0 (100% Financed)</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: Direct Escrow Wallet */}
              <div
                onClick={() => setPaymentMethod('ESCROW_WALLET')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                  paymentMethod === 'ESCROW_WALLET'
                    ? 'border-[#00875A] bg-[#F4FBF5]'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-neutral-900 block">
                      Direct Escrow Wallet Transfer
                    </span>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Debit immediately from {enterpriseName}&apos;s verified bank escrow balance.
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'ESCROW_WALLET'}
                  onChange={() => setPaymentMethod('ESCROW_WALLET')}
                  className="accent-[#00875A] mt-1"
                />
              </div>
            </div>

            {/* Total Settlement Calculation */}
            <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2 text-xs">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Total Procurement Cost:</span>
                <span className="text-emerald-400 font-black text-lg">
                  ₹{totalWithCredit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Settlement Terms:</span>
                <span>
                  {paymentMethod === 'CREDIT_FACILITY'
                    ? `Trade Credit (${creditTerm.replace('_', ' ')} • Due ${currentDueDate})`
                    : 'Instant RBI PA/PG Escrow Lock'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Logistics Dispatch:</span>
                <span>Automated via VRL Dedicated Fleet</span>
              </div>
            </div>

            {/* Regulatory Agreement */}
            <div className="flex items-start gap-2.5 text-xs text-neutral-600">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 accent-[#00875A]"
              />
              <label htmlFor="agreeTerms" className="cursor-pointer">
                I agree to the LoopGrid CPCB Schedule-II Form-10 Transfer Terms and authorize automatic DRP ownership transfer upon weighbridge reconciliation.
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedLotForPurchase(null)}
                className="flex-1 py-3 rounded-full text-xs sm:text-sm font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!agreedToTerms}
                onClick={handleConfirmPurchase}
                className="flex-1 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {paymentMethod === 'CREDIT_FACILITY'
                    ? 'Confirm via Credit Advance (₹0 Upfront)'
                    : 'Confirm Escrow Purchase'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PURCHASE SUCCESS CONFIRMATION MODAL                      */}
      {/* ======================================================== */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-neutral-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00875A] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                Purchase Confirmed & DRP Transferred!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                Lot <strong className="text-neutral-900">{purchaseSuccess.drpId}</strong> has been transferred to {enterpriseName}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Resource:</span>
                <span className="font-bold text-neutral-900">{purchaseSuccess.resourceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status in DRP:</span>
                <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                  IN_TRANSIT (Dispatched to Smelter)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Facility:</span>
                <span className="font-semibold text-emerald-800">
                  {paymentMethod === 'CREDIT_FACILITY'
                    ? `Tata Capital & SIDBI Advance (${creditTerm.replace('_', ' ')})`
                    : 'Direct Escrow Settlement'}
                </span>
              </div>
              {paymentMethod === 'CREDIT_FACILITY' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Credit Ref #:</span>
                    <span className="font-mono font-bold text-neutral-800">
                      {generatedCreditRef}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Repayment Due:</span>
                    <span className="font-bold text-emerald-700">{currentDueDate}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between pt-1 border-t border-neutral-200">
                <span className="text-neutral-500">Inventory Status:</span>
                <span className="text-emerald-700 font-bold">
                  Removed from public marketplace
                </span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400">
              The Digital Resource Passport has been cryptographically updated with your purchase order and dispatched carrier tracking.
            </p>

            <button
              type="button"
              onClick={() => setPurchaseSuccess(null)}
              className="w-full py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-md"
            >
              Continue to Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
