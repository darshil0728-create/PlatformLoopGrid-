import React, { useState, useEffect } from 'react';
import {
  Scale,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  HelpCircle,
  ShoppingCart,
  Plus,
  RefreshCw,
  Flame,
} from 'lucide-react';

interface QuickCommodity {
  id: string;
  symbol: string;
  name: string;
  category: string;
  pricePerKg: number;
  changePercent: number;
  demand: 'VERY_HIGH' | 'HIGH' | 'BALANCED';
  trend: 'up' | 'down';
  volume24h: string;
}

const INITIAL_QUICK_COMMODITIES: QuickCommodity[] = [
  {
    id: 'c1',
    symbol: 'LG-AL-6061',
    name: 'Aluminum 6061-T6 Swarf',
    category: 'Metals',
    pricePerKg: 85.4,
    changePercent: 3.42,
    demand: 'VERY_HIGH',
    trend: 'up',
    volume24h: '142.5 Tons',
  },
  {
    id: 'c2',
    symbol: 'LG-CU-BRY',
    name: 'Copper Berry Heavy Wire',
    category: 'Metals',
    pricePerKg: 748.2,
    changePercent: 1.85,
    demand: 'VERY_HIGH',
    trend: 'up',
    volume24h: '68.0 Tons',
  },
  {
    id: 'c3',
    symbol: 'LG-BR-HNY',
    name: 'Honey Brass Clean Machining',
    category: 'Metals',
    pricePerKg: 488.5,
    changePercent: -0.62,
    demand: 'BALANCED',
    trend: 'down',
    volume24h: '95.2 Tons',
  },
  {
    id: 'c4',
    symbol: 'LG-SS-304',
    name: 'Stainless Steel 304 Offcuts',
    category: 'Metals',
    pricePerKg: 144.0,
    changePercent: 2.15,
    demand: 'HIGH',
    trend: 'up',
    volume24h: '185.0 Tons',
  },
  {
    id: 'c5',
    symbol: 'LG-PL-PET',
    name: 'PET Clear Washed Flakes',
    category: 'Polymers',
    pricePerKg: 52.8,
    changePercent: 2.75,
    demand: 'VERY_HIGH',
    trend: 'up',
    volume24h: '160.0 Tons',
  },
  {
    id: 'c6',
    symbol: 'LG-PL-HDPE',
    name: 'HDPE Injection Regrind',
    category: 'Polymers',
    pricePerKg: 41.5,
    changePercent: 1.22,
    demand: 'HIGH',
    trend: 'up',
    volume24h: '210.0 Tons',
  },
  {
    id: 'c7',
    symbol: 'LG-TX-DNM',
    name: 'Denim Cotton Selvedge Bales',
    category: 'Textiles',
    pricePerKg: 24.8,
    changePercent: 3.12,
    demand: 'HIGH',
    trend: 'up',
    volume24h: '320.0 Tons',
  },
  {
    id: 'c8',
    symbol: 'LG-OL-H46',
    name: 'Reclaimed Hydraulic Oil ISO 46',
    category: 'Lubricants',
    pricePerKg: 92.5,
    changePercent: 1.54,
    demand: 'HIGH',
    trend: 'up',
    volume24h: '85.0 Tons',
  },
];

interface LivePriceDashboardWidgetProps {
  onNavigateToLivePrices: () => void;
  onNavigateToPriceExplainer: () => void;
  onActionClick?: () => void;
  actionType?: 'MSME_LIST' | 'PROCESSING_BUY';
}

export const LivePriceDashboardWidget: React.FC<LivePriceDashboardWidgetProps> = ({
  onNavigateToLivePrices,
  onNavigateToPriceExplainer,
  onActionClick,
  actionType = 'PROCESSING_BUY',
}) => {
  const [items, setItems] = useState<QuickCommodity[]>(INITIAL_QUICK_COMMODITIES);
  const [pulsingId, setPulsingId] = useState<string | null>(null);

  // Micro-fluctuations every 3 seconds to emulate stock exchange ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const target = prev[idx];
        const microChange = (Math.random() - 0.49) * 0.6; // ±0.3%
        const newPrice = Number((target.pricePerKg * (1 + microChange / 100)).toFixed(2));
        if (newPrice !== target.pricePerKg) {
          setPulsingId(target.id);
          setTimeout(() => setPulsingId(null), 1000);
          const next = [...prev];
          next[idx] = {
            ...target,
            pricePerKg: newPrice,
            changePercent: Number((target.changePercent + microChange).toFixed(2)),
            trend: microChange >= 0 ? 'up' : 'down',
          };
          return next;
        }
        return prev;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all hover:border-neutral-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200">
            <Scale className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Secondary Stock Exchange
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                ₹ / kg
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#191C1E] mt-1">
              Live Resource Commodity Prices (Per Kilogram)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Fluctuating in real-time based on smelter demand, regional supply depth, and NABL purity.
            </p>
          </div>
        </div>

        {/* Buttons for explainer and full exchange */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onNavigateToPriceExplainer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors cursor-pointer"
            title="See visual diagram of factors used to calculate live prices"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>How Are Prices Calculated?</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToLivePrices}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <span>Full Exchange</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of Commodity Cards Quoted in ₹/kg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        {items.map((item) => {
          const isUp = item.changePercent >= 0;
          const isPulsing = pulsingId === item.id;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                isPulsing
                  ? isUp
                    ? 'bg-emerald-50/80 border-emerald-400 scale-[1.02]'
                    : 'bg-rose-50/80 border-rose-400 scale-[1.02]'
                  : 'bg-neutral-50/70 border-neutral-200/80 hover:bg-white hover:border-neutral-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-[11px] font-bold text-neutral-600">
                  {item.symbol}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                    isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {isUp ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="font-semibold text-xs text-neutral-900 truncate" title={item.name}>
                {item.name}
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-xl font-black text-neutral-900">
                  ₹{item.pricePerKg.toFixed(2)}
                  <span className="text-xs font-medium text-neutral-500 ml-1">/ kg</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {item.volume24h}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar with prompt action */}
      <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="text-emerald-700 font-bold">• Weighbridge Verified:</span>
          <span>Both Resource MSMEs and Processing Smelters reference these live prices to take accurate supply and procurement decisions.</span>
        </div>

        {onActionClick && (
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer flex-shrink-0 shadow-xs"
          >
            {actionType === 'PROCESSING_BUY' ? (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy on Marketplace (Credit Available)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>List Scrap at Live Spot Price</span>
              </>
            )}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
