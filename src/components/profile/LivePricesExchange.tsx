import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  RefreshCw,
  Info,
  Clock,
  Layers,
  ShieldCheck,
  ChevronRight,
  ShoppingCart,
  SlidersHorizontal,
  DollarSign,
  Building2,
  AlertCircle,
  HelpCircle,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

export interface CommodityResource {
  id: string;
  symbol: string;
  name: string;
  category: 'Metals & Alloys' | 'Polymers & Plastics' | 'Textiles & Leather' | 'Industrial Lubricants';
  grade: string;
  pricePerKg: number; // in ₹/kg
  priceChange24h: number; // in %
  priceChangeAmount: number; // in ₹/kg
  dailyHigh: number;
  dailyLow: number;
  benchmarkIndex: string;
  demandIndex: 'VERY_HIGH' | 'HIGH' | 'BALANCED' | 'SURPLUS';
  availableSupplyTons: number;
  purityBenchmark: string;
  historical7d: { time: string; price: number }[];
  isHot?: boolean;
}

const INITIAL_COMMODITIES: CommodityResource[] = [
  {
    id: 'res-al-6061',
    symbol: 'LG-AL-6061',
    name: 'Aluminum 6061-T6 Swarf',
    category: 'Metals & Alloys',
    grade: 'Aero-Spec Si 0.6% Mg 1.0% (CNC Swarf)',
    pricePerKg: 85.4,
    priceChange24h: 3.42,
    priceChangeAmount: 2.82,
    dailyHigh: 86.8,
    dailyLow: 83.2,
    benchmarkIndex: 'MCX Secondary Aluminum Parity',
    demandIndex: 'VERY_HIGH',
    availableSupplyTons: 142.5,
    purityBenchmark: '99.4% Spectrometer Certified',
    isHot: true,
    historical7d: [
      { time: 'Day 1', price: 82.5 },
      { time: 'Day 2', price: 83.1 },
      { time: 'Day 3', price: 82.8 },
      { time: 'Day 4', price: 84.0 },
      { time: 'Day 5', price: 84.6 },
      { time: 'Day 6', price: 84.2 },
      { time: 'Today', price: 85.4 },
    ],
  },
  {
    id: 'res-cu-berry',
    symbol: 'LG-CU-BRY',
    name: 'Copper Berry Heavy Wire Scrap',
    category: 'Metals & Alloys',
    grade: 'Electrolytic Copper Rod & Wire (No Enamel)',
    pricePerKg: 748.2,
    priceChange24h: 1.85,
    priceChangeAmount: 13.6,
    dailyHigh: 755.0,
    dailyLow: 739.0,
    benchmarkIndex: 'LME Cash Copper Spot Index',
    demandIndex: 'VERY_HIGH',
    availableSupplyTons: 68.0,
    purityBenchmark: '99.8% Purity Assay',
    isHot: true,
    historical7d: [
      { time: 'Day 1', price: 732.0 },
      { time: 'Day 2', price: 738.5 },
      { time: 'Day 3', price: 742.0 },
      { time: 'Day 4', price: 739.0 },
      { time: 'Day 5', price: 744.5 },
      { time: 'Day 6', price: 746.0 },
      { time: 'Today', price: 748.2 },
    ],
  },
  {
    id: 'res-br-honey',
    symbol: 'LG-BR-HNY',
    name: 'Honey Brass Clean Machining',
    category: 'Metals & Alloys',
    grade: 'Yellow Brass Cu 60% Zn 40% Turnings',
    pricePerKg: 488.5,
    priceChange24h: -0.62,
    priceChangeAmount: -3.05,
    dailyHigh: 494.0,
    dailyLow: 486.0,
    benchmarkIndex: 'Jamnagar Brass Scrap Index',
    demandIndex: 'BALANCED',
    availableSupplyTons: 95.2,
    purityBenchmark: '98.7% Certified Non-Magnetic',
    historical7d: [
      { time: 'Day 1', price: 492.0 },
      { time: 'Day 2', price: 495.0 },
      { time: 'Day 3', price: 493.5 },
      { time: 'Day 4', price: 491.0 },
      { time: 'Day 5', price: 490.2 },
      { time: 'Day 6', price: 489.0 },
      { time: 'Today', price: 488.5 },
    ],
  },
  {
    id: 'res-ss-304',
    symbol: 'LG-SS-304',
    name: 'Stainless Steel 304 Offcuts',
    category: 'Metals & Alloys',
    grade: '18/8 Chrome-Nickel Non-Magnetic Scrap',
    pricePerKg: 144.0,
    priceChange24h: 2.15,
    priceChangeAmount: 3.03,
    dailyHigh: 146.5,
    dailyLow: 141.0,
    benchmarkIndex: 'Bhiwadi Secondary Steel Index',
    demandIndex: 'HIGH',
    availableSupplyTons: 185.0,
    purityBenchmark: '99.0% Cr 18% Ni 8%',
    historical7d: [
      { time: 'Day 1', price: 139.5 },
      { time: 'Day 2', price: 140.2 },
      { time: 'Day 3', price: 141.5 },
      { time: 'Day 4', price: 142.8 },
      { time: 'Day 5', price: 143.0 },
      { time: 'Day 6', price: 142.5 },
      { time: 'Today', price: 144.0 },
    ],
  },
  {
    id: 'res-pl-hdpe',
    symbol: 'LG-PL-HDPE',
    name: 'HDPE Injection & Blow Regrind',
    category: 'Polymers & Plastics',
    grade: 'Unfilled Virgin Scrap (MFI 0.35 g/10min)',
    pricePerKg: 41.5,
    priceChange24h: 1.22,
    priceChangeAmount: 0.5,
    dailyHigh: 42.2,
    dailyLow: 40.8,
    benchmarkIndex: 'CIPET Polymer Parity Board',
    demandIndex: 'HIGH',
    availableSupplyTons: 210.0,
    purityBenchmark: '99.1% Washed & Flaked',
    historical7d: [
      { time: 'Day 1', price: 40.0 },
      { time: 'Day 2', price: 40.5 },
      { time: 'Day 3', price: 40.2 },
      { time: 'Day 4', price: 41.0 },
      { time: 'Day 5', price: 41.2 },
      { time: 'Day 6', price: 41.1 },
      { time: 'Today', price: 41.5 },
    ],
  },
  {
    id: 'res-pl-pet',
    symbol: 'LG-PL-PET',
    name: 'PET Clear Washed Flakes',
    category: 'Polymers & Plastics',
    grade: 'Food-Grade Hot Washed (IV >0.72 dl/g)',
    pricePerKg: 52.8,
    priceChange24h: 2.75,
    priceChangeAmount: 1.41,
    dailyHigh: 53.5,
    dailyLow: 51.0,
    benchmarkIndex: 'PlastIndia Secondary PET Index',
    demandIndex: 'VERY_HIGH',
    availableSupplyTons: 160.0,
    purityBenchmark: '99.5% Moisture <0.5%',
    isHot: true,
    historical7d: [
      { time: 'Day 1', price: 49.5 },
      { time: 'Day 2', price: 50.2 },
      { time: 'Day 3', price: 51.0 },
      { time: 'Day 4', price: 51.5 },
      { time: 'Day 5', price: 52.0 },
      { time: 'Day 6', price: 52.2 },
      { time: 'Today', price: 52.8 },
    ],
  },
  {
    id: 'res-tx-denim',
    symbol: 'LG-TX-DNM',
    name: 'Denim Cotton Selvedge Bales',
    category: 'Textiles & Leather',
    grade: '100% Pure Indigo Cellulose 400 GSM',
    pricePerKg: 24.8,
    priceChange24h: 3.12,
    priceChangeAmount: 0.75,
    dailyHigh: 25.4,
    dailyLow: 23.8,
    benchmarkIndex: 'CIRCOT National Textile Scrap',
    demandIndex: 'HIGH',
    availableSupplyTons: 320.0,
    purityBenchmark: '98.5% Zero Synthetic Blend',
    historical7d: [
      { time: 'Day 1', price: 23.2 },
      { time: 'Day 2', price: 23.8 },
      { time: 'Day 3', price: 24.0 },
      { time: 'Day 4', price: 23.9 },
      { time: 'Day 5', price: 24.2 },
      { time: 'Day 6', price: 24.5 },
      { time: 'Today', price: 24.8 },
    ],
  },
  {
    id: 'res-ol-hyd',
    symbol: 'LG-OL-H46',
    name: 'Reclaimed Hydraulic Base Oil',
    category: 'Industrial Lubricants',
    grade: 'ISO VG 46 Anti-Wear Mineral Lubricant',
    pricePerKg: 92.5,
    priceChange24h: 1.54,
    priceChangeAmount: 1.4,
    dailyHigh: 94.0,
    dailyLow: 90.5,
    benchmarkIndex: 'National Re-Refiners Exchange',
    demandIndex: 'HIGH',
    availableSupplyTons: 85.0,
    purityBenchmark: '97.2% Moisture <0.04%',
    historical7d: [
      { time: 'Day 1', price: 89.0 },
      { time: 'Day 2', price: 90.2 },
      { time: 'Day 3', price: 91.0 },
      { time: 'Day 4', price: 91.5 },
      { time: 'Day 5', price: 91.8 },
      { time: 'Day 6', price: 92.0 },
      { time: 'Today', price: 92.5 },
    ],
  },
];

interface LivePricesExchangeProps {
  onNavigateToCalculationExplainer: () => void;
  onNavigateToMarketplace: (preFilterCategory?: string) => void;
}

export const LivePricesExchange: React.FC<LivePricesExchangeProps> = ({
  onNavigateToCalculationExplainer,
  onNavigateToMarketplace,
}) => {
  const { t } = useLanguage();
  const [commodities, setCommodities] = useState<CommodityResource[]>(INITIAL_COMMODITIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCommodityId, setActiveCommodityId] = useState<string>('res-al-6061');
  const [pulseState, setPulseState] = useState<{ [key: string]: 'up' | 'down' | null }>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate real-time stock-exchange fluctuations every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCommodities((prev) => {
        // Pick 1-2 random commodities to fluctuate
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        // ±0.1% to ±0.5% micro-fluctuation
        const deltaPercent = (Math.random() - 0.48) * 0.8;
        const newPrice = Number((item.pricePerKg * (1 + deltaPercent / 100)).toFixed(2));
        const priceDiff = Number((newPrice - item.pricePerKg).toFixed(2));

        if (priceDiff !== 0) {
          const direction = priceDiff > 0 ? 'up' : 'down';
          setPulseState((p) => ({ ...p, [item.id]: direction }));
          setTimeout(() => {
            setPulseState((p) => ({ ...p, [item.id]: null }));
          }, 1200);

          const updated = [...prev];
          const newChange24h = Number((item.priceChange24h + deltaPercent).toFixed(2));
          const newHigh = Math.max(item.dailyHigh, newPrice);
          const newLow = Math.min(item.dailyLow, newPrice);

          const newHistory = [...item.historical7d];
          newHistory[newHistory.length - 1] = {
            ...newHistory[newHistory.length - 1],
            price: newPrice,
          };

          updated[randomIndex] = {
            ...item,
            pricePerKg: newPrice,
            priceChange24h: newChange24h,
            priceChangeAmount: Number((item.priceChangeAmount + priceDiff).toFixed(2)),
            dailyHigh: newHigh,
            dailyLow: newLow,
            historical7d: newHistory,
          };
          return updated;
        }
        return prev;
      });
      setLastUpdated(new Date());
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const filteredCommodities = commodities.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedCommodity =
    commodities.find((c) => c.id === activeCommodityId) || commodities[0];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Real-time Scrolling Ticker Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl py-2 px-4 shadow-sm border border-neutral-800 overflow-hidden flex items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-neutral-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            LIVE COMMODITY BOARD
          </span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs font-mono py-0.5">
          {commodities.map((item) => {
            const isPositive = item.priceChange24h >= 0;
            const pulse = pulseState[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCommodityId(item.id)}
                className={`inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded ${
                  pulse === 'up'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : pulse === 'down'
                    ? 'bg-red-500/20 text-red-300'
                    : 'text-neutral-300'
                }`}
              >
                <span className="font-bold text-white">{item.symbol}</span>
                <span className="font-extrabold text-neutral-100">
                  ₹{item.pricePerKg.toFixed(2)}
                  <span className="text-[10px] text-neutral-400 font-sans font-normal">/kg</span>
                </span>
                <span
                  className={`text-[11px] font-semibold flex items-center ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.priceChange24h.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 pl-3 border-l border-neutral-700 text-[11px] text-neutral-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-time Order Book</span>
        </div>
      </div>

      {/* Main Stock Exchange Header Card */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-neutral-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold border border-white/10">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>LoopGrid Sovereign Scrap Commodity Board • Quoted in ₹/kg</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Real-Time Secondary Scrap Stock Exchange
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Transparent, per-kilogram (<strong className="text-white">₹/kg</strong>) spot prices for verified industrial resources traded across Indian MSME clusters and secondary processing smelters. Prices fluctuate dynamically based on regional supply-demand depth, spectrometer purity, and freight distance.
            </p>
          </div>

          {/* Prominent "HOW ARE PRICES CALCULATED" Button leading to Visual Representation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onNavigateToCalculationExplainer}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition-all shadow-lg shadow-emerald-950/40 cursor-pointer group"
              title="See visual diagram of factors used to determine live prices"
            >
              <Sparkles className="w-4 h-4 text-emerald-950 group-hover:rotate-12 transition-transform" />
              <span>How Are Prices Calculated?</span>
              <ArrowRight className="w-4 h-4 text-emerald-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateToMarketplace()}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-neutral-200" />
              <span>Go to Marketplace</span>
            </button>
          </div>
        </div>

        {/* Macro Index Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Secondary Metals Arbitrage
            </span>
            <span className="text-base font-bold text-white mt-0.5 block">28.4% Discount</span>
            <span className="text-[10px] text-emerald-400">vs Virgin Ore Ingots</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Pricing Base Standard
            </span>
            <span className="text-base font-bold text-white mt-0.5 block">Per Kilogram (₹/kg)</span>
            <span className="text-[10px] text-neutral-300">Weighbridge Reconciled</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Active Traded Volume (24h)
            </span>
            <span className="text-base font-bold text-white mt-0.5 block">1,240 Metric Tons</span>
            <span className="text-[10px] text-emerald-400">+12% Liquidity</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Sovereign Clearing Standard
            </span>
            <span className="text-base font-bold text-white mt-0.5 block">NABL 17025 Calibrated</span>
            <span className="text-[10px] text-neutral-300">CPCB Form-10 Escrow</span>
          </div>
        </div>
      </div>

      {/* Interactive Active Commodity Focus & Mini Sparkline Chart */}
      {selectedCommodity && (
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-800">
                  {selectedCommodity.symbol}
                </span>
                <span className="text-xs text-neutral-500">• {selectedCommodity.category}</span>
                {selectedCommodity.isHot && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <Flame className="w-3 h-3 text-amber-600" />
                    High Ingot Demand
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#191C1E]">
                {selectedCommodity.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {selectedCommodity.grade} • {selectedCommodity.purityBenchmark}
              </p>
            </div>

            {/* Live Price Highlight with ₹/kg */}
            <div className="flex items-baseline sm:flex-col sm:items-end justify-between gap-2">
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Current Spot Exchange Price
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#191C1E]">
                    ₹{selectedCommodity.pricePerKg.toFixed(2)}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#00875A]">/ kg</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedCommodity.priceChange24h >= 0
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {selectedCommodity.priceChange24h >= 0 ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {selectedCommodity.priceChange24h >= 0 ? '+' : ''}
                  {selectedCommodity.priceChange24h.toFixed(2)}% (₹
                  {selectedCommodity.priceChangeAmount.toFixed(2)}/kg)
                </span>
                <span className="text-xs text-neutral-400 font-mono">24h Change</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & 7-Day Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
            {/* Stats Overview */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                <span className="text-neutral-500">24h Day High / Low:</span>
                <span className="font-mono font-bold text-neutral-900">
                  ₹{selectedCommodity.dailyHigh.toFixed(2)} / ₹{selectedCommodity.dailyLow.toFixed(2)}
                  <span className="text-neutral-400 font-normal"> /kg</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                <span className="text-neutral-500">Benchmark Index:</span>
                <span className="font-semibold text-neutral-800 text-right">
                  {selectedCommodity.benchmarkIndex}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                <span className="text-neutral-500">Available Platform Supply:</span>
                <span className="font-bold text-emerald-700">
                  {selectedCommodity.availableSupplyTons} Metric Tons
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                <span className="text-neutral-500">Regional Demand Index:</span>
                <span className="font-bold px-2 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800">
                  {selectedCommodity.demandIndex.replace('_', ' ')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToMarketplace(selectedCommodity.category)}
                className="w-full py-2.5 rounded-xl bg-[#191C1E] hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy {selectedCommodity.name} in Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 7-Day Price Trend Recharts Canvas */}
            <div className="lg:col-span-2 bg-neutral-50/70 rounded-2xl p-4 border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-700">
                  7-Day Per-Kilogram Trendline (₹/kg)
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Live Market Updates Continuous
                </span>
              </div>

              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={selectedCommodity.historical7d}
                    margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00875A" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#00875A" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <YAxis
                      domain={['auto', 'auto']}
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${Number(val).toFixed(2)}/kg`, 'Price']}
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '11px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#00875A"
                      strokeWidth={2.5}
                      fill="url(#priceGradient)"
                      activeDot={{ r: 4, stroke: '#00875A', strokeWidth: 2, fill: '#FFFFFF' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Updated in real-time as weighbridge orders settle</span>
                <button
                  type="button"
                  onClick={onNavigateToCalculationExplainer}
                  className="text-[#00875A] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>See How Price is Calculated</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Exchange Table / Cards List */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#191C1E]">
              All Quoted Industrial Resources (₹/kg)
            </h3>
            <p className="text-xs text-neutral-500">
              Live quotes refreshed continuously. Select any row to inspect historical pricing and demand.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource, alloy, or symbol..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00875A]/30"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['ALL', 'Metals & Alloys', 'Polymers & Plastics', 'Textiles & Leather', 'Industrial Lubricants'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#191C1E] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                {cat === 'ALL' ? 'All Resources' : cat}
              </button>
            )
          )}
        </div>

        {/* Grid of Commodity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredCommodities.map((item) => {
            const isSelected = item.id === selectedCommodity?.id;
            const isPositive = item.priceChange24h >= 0;
            const pulse = pulseState[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setActiveCommodityId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                  isSelected
                    ? 'border-[#00875A] bg-[#F4FBF5] shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/70 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                        {item.symbol}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#00875A] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {item.grade}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`transition-all rounded-lg px-2 py-0.5 inline-block ${
                        pulse === 'up'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pulse === 'down'
                          ? 'bg-rose-100 text-rose-800'
                          : ''
                      }`}
                    >
                      <span className="text-base sm:text-lg font-black text-neutral-900">
                        ₹{item.pricePerKg.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-neutral-600 ml-1">/kg</span>
                    </div>

                    <div
                      className={`text-[11px] font-bold flex items-center justify-end gap-0.5 mt-0.5 ${
                        isPositive ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.priceChange24h.toFixed(2)}%
                      <span className="text-neutral-400 font-normal">
                        ({isPositive ? '+' : ''}₹{item.priceChangeAmount.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <div className="flex items-center gap-3">
                    <span>
                      High: <strong>₹{item.dailyHigh.toFixed(2)}</strong>
                    </span>
                    <span>
                      Low: <strong>₹{item.dailyLow.toFixed(2)}</strong>
                    </span>
                    <span className="hidden sm:inline">
                      Supply: <strong className="text-neutral-800">{item.availableSupplyTons}T</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToMarketplace(item.category);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00875A] hover:underline cursor-pointer"
                  >
                    <span>Trade Lots</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
