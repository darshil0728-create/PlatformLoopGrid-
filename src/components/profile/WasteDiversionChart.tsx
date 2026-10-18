import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Recycle,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface WasteDiversionDataPoint {
  month: string;
  fullMonth: string;
  diverted: number; // In metric tons (MT)
  target: number; // Regulatory/Circular quota in MT
  landfillRate: number; // % diverted from landfill
  metals: number; // Tons of metals & alloys diverted
  polymers: number; // Tons of polymers diverted
  textiles: number; // Tons of textiles diverted
  oils: number; // Tons of industrial oils diverted
  co2Saved: number; // MT CO2 avoided
}

const HISTORICAL_DATA: WasteDiversionDataPoint[] = [
  {
    month: 'Nov 25',
    fullMonth: 'November 2025',
    diverted: 84.5,
    target: 75.0,
    landfillRate: 92.1,
    metals: 42.0,
    polymers: 21.5,
    textiles: 14.0,
    oils: 7.0,
    co2Saved: 194.3,
  },
  {
    month: 'Dec 25',
    fullMonth: 'December 2025',
    diverted: 96.2,
    target: 85.0,
    landfillRate: 93.4,
    metals: 48.2,
    polymers: 24.0,
    textiles: 16.0,
    oils: 8.0,
    co2Saved: 221.2,
  },
  {
    month: 'Jan 26',
    fullMonth: 'January 2026',
    diverted: 114.0,
    target: 100.0,
    landfillRate: 94.6,
    metals: 58.0,
    polymers: 28.5,
    textiles: 18.5,
    oils: 9.0,
    co2Saved: 262.2,
  },
  {
    month: 'Feb 26',
    fullMonth: 'February 2026',
    diverted: 128.8,
    target: 110.0,
    landfillRate: 95.2,
    metals: 66.4,
    polymers: 31.2,
    textiles: 20.2,
    oils: 11.0,
    co2Saved: 296.2,
  },
  {
    month: 'Mar 26',
    fullMonth: 'March 2026',
    diverted: 142.5,
    target: 125.0,
    landfillRate: 95.9,
    metals: 74.5,
    polymers: 34.0,
    textiles: 22.0,
    oils: 12.0,
    co2Saved: 327.7,
  },
  {
    month: 'Apr 26',
    fullMonth: 'April 2026',
    diverted: 156.0,
    target: 135.0,
    landfillRate: 96.4,
    metals: 81.0,
    polymers: 38.0,
    textiles: 24.0,
    oils: 13.0,
    co2Saved: 358.8,
  },
  {
    month: 'May 26',
    fullMonth: 'May 2026',
    diverted: 168.2,
    target: 145.0,
    landfillRate: 96.8,
    metals: 88.2,
    polymers: 40.5,
    textiles: 25.5,
    oils: 14.0,
    co2Saved: 386.8,
  },
  {
    month: 'Jun 26',
    fullMonth: 'June 2026',
    diverted: 179.4,
    target: 155.0,
    landfillRate: 97.1,
    metals: 94.4,
    polymers: 43.0,
    textiles: 27.0,
    oils: 15.0,
    co2Saved: 412.6,
  },
  {
    month: 'Jul 26',
    fullMonth: 'July 2026',
    diverted: 192.0,
    target: 165.0,
    landfillRate: 97.5,
    metals: 101.0,
    polymers: 46.0,
    textiles: 29.0,
    oils: 16.0,
    co2Saved: 441.6,
  },
  {
    month: 'Aug 26',
    fullMonth: 'August 2026',
    diverted: 208.5,
    target: 180.0,
    landfillRate: 97.9,
    metals: 110.5,
    polymers: 50.0,
    textiles: 31.0,
    oils: 17.0,
    co2Saved: 479.5,
  },
  {
    month: 'Sep 26',
    fullMonth: 'September 2026',
    diverted: 224.2,
    target: 195.0,
    landfillRate: 98.2,
    metals: 119.2,
    polymers: 53.5,
    textiles: 33.5,
    oils: 18.0,
    co2Saved: 515.6,
  },
  {
    month: 'Oct 26',
    fullMonth: 'October 2026 (MTD)',
    diverted: 245.0,
    target: 210.0,
    landfillRate: 98.6,
    metals: 131.0,
    polymers: 58.0,
    textiles: 36.0,
    oils: 20.0,
    co2Saved: 563.5,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  viewMode: 'total' | 'streams';
}

const MinimalistTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, viewMode }) => {
  if (!active || !payload || !payload.length) return null;

  const data: WasteDiversionDataPoint = payload[0].payload;

  return (
    <div className="bg-neutral-900/95 backdrop-blur-md text-white rounded-2xl px-4 py-3 shadow-xl border border-neutral-800 text-xs font-sans min-w-[210px] space-y-2 pointer-events-none z-50">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="font-bold text-neutral-200">{data.fullMonth}</span>
        <span className="text-[10px] text-emerald-400 font-mono font-semibold">
          {data.landfillRate}% Diverted
        </span>
      </div>

      {viewMode === 'total' ? (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Total Diverted:</span>
            <span className="font-extrabold text-emerald-400 text-sm">
              {data.diverted.toFixed(1)} MT
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">CPCB Target:</span>
            <span className="text-neutral-300 font-mono">{data.target.toFixed(1)} MT</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-neutral-800/80">
            <span className="text-neutral-400">CO₂ Avoided:</span>
            <span className="text-sky-300 font-semibold">{data.co2Saved.toFixed(1)} MT</span>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00875A]" />
              Metals & Alloys:
            </span>
            <span className="font-semibold text-white">{data.metals.toFixed(1)} MT</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              Polymers:
            </span>
            <span className="font-semibold text-white">{data.polymers.toFixed(1)} MT</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              Textiles:
            </span>
            <span className="font-semibold text-white">{data.textiles.toFixed(1)} MT</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              Industrial Oils:
            </span>
            <span className="font-semibold text-white">{data.oils.toFixed(1)} MT</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface WasteDiversionChartProps {
  className?: string;
}

export const WasteDiversionChart: React.FC<WasteDiversionChartProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'6M' | '12M'>('12M');
  const [viewMode, setViewMode] = useState<'total' | 'streams'>('total');

  // Filtered dataset according to time range
  const data = timeRange === '6M' ? HISTORICAL_DATA.slice(-6) : HISTORICAL_DATA;

  // Key metrics calculation
  const totalDiverted = data.reduce((acc, curr) => acc + curr.diverted, 0);
  const totalTarget = data.reduce((acc, curr) => acc + curr.target, 0);
  const totalCO2 = data.reduce((acc, curr) => acc + curr.co2Saved, 0);
  const averageRate = (
    data.reduce((acc, curr) => acc + curr.landfillRate, 0) / data.length
  ).toFixed(1);
  const latestMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const monthlyGrowth = (
    ((latestMonth.diverted - previousMonth.diverted) / previousMonth.diverted) *
    100
  ).toFixed(1);

  return (
    <div
      className={`bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-6 ${className}`}
    >
      {/* Top Header & Minimalist Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <span className="font-semibold text-emerald-800">Circular Clearinghouse</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Landfill Mandate</span>
            <span aria-hidden="true">·</span>
            <span>CPCB Schedule-II Form-10 Verified</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#191C1E] flex items-center gap-2">
            Waste Diversion Over Time
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +{monthlyGrowth}% MTD
            </span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5 max-w-xl">
            Tonnage of verified industrial scrap diverted from landfills into sovereign circular remanufacturing channels.
          </p>
        </div>

        {/* Clean Functional Filter Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          {/* View Mode Toggle: Total Trend vs By Stream */}
          <div className="inline-flex items-center p-1 bg-neutral-100 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('total')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'total'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Overall Trend
            </button>
            <button
              type="button"
              onClick={() => setViewMode('streams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'streams'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              By Stream
            </button>
          </div>

          {/* Timeframe Toggle: 6M vs 12M */}
          <div className="inline-flex items-center p-1 bg-neutral-100 rounded-xl">
            <button
              type="button"
              onClick={() => setTimeRange('6M')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeRange === '6M'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              6M
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('12M')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeRange === '12M'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              12M
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Total Diverted
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-neutral-900">
              {totalDiverted.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs font-medium text-neutral-500">Tons</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
            +{((totalDiverted / totalTarget - 1) * 100).toFixed(1)}% vs CPCB Quota
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Landfill Diversion Rate
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-emerald-700">{averageRate}%</span>
            <span className="text-xs font-medium text-neutral-500">Avg</span>
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Peaked at {latestMonth.landfillRate}% (Oct '26)
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            CO₂ Avoided
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-sky-700">
              {totalCO2.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span className="text-xs font-medium text-neutral-500">MT CO₂e</span>
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Scope 3 supply chain reduction
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Sovereign Ledger Status
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 stroke-[2.2]" />
            <span className="text-sm font-bold text-neutral-900">100% Verified</span>
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Form-10 Auto-Reconciled
          </span>
        </div>
      </div>

      {/* Main Recharts Visualization Canvas */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'total' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="diversionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00875A" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#00875A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                dy={6}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}T`}
              />
              <Tooltip
                content={<MinimalistTooltip viewMode="total" />}
                cursor={{ stroke: '#00875A', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              {/* Diverted actual line & subtle area */}
              <Area
                type="monotone"
                dataKey="diverted"
                name="Diverted Waste (MT)"
                stroke="#00875A"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#diversionGradient)"
                activeDot={{
                  r: 5,
                  stroke: '#00875A',
                  strokeWidth: 2,
                  fill: '#FFFFFF',
                }}
              />
              {/* Target reference dashed curve */}
              <Area
                type="monotone"
                dataKey="target"
                name="Regulatory Target (MT)"
                stroke="#94A3B8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                dy={6}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}T`}
              />
              <Tooltip
                content={<MinimalistTooltip viewMode="streams" />}
                cursor={{ fill: 'rgba(0, 135, 90, 0.04)' }}
              />
              <Bar dataKey="metals" name="Metals & Alloys" stackId="a" fill="#00875A" radius={[0, 0, 0, 0]} />
              <Bar dataKey="polymers" name="Polymers & Plastics" stackId="a" fill="#0284C7" radius={[0, 0, 0, 0]} />
              <Bar dataKey="textiles" name="Cotton & Textiles" stackId="a" fill="#D97706" radius={[0, 0, 0, 0]} />
              <Bar dataKey="oils" name="Industrial Oils" stackId="a" fill="#7C3AED" radius={[3, 3, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend & Stream Disclosures */}
      <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
        <div className="flex flex-wrap items-center gap-4">
          {viewMode === 'total' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#00875A] rounded-full" />
                <span className="text-neutral-700 font-semibold">Actual Diverted Tons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-neutral-400" />
                <span className="text-neutral-500">CPCB Target Benchmark</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00875A]" />
                <span className="text-neutral-700">Metals & Alloys (53%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0284C7]" />
                <span className="text-neutral-700">Polymers (24%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#D97706]" />
                <span className="text-neutral-700">Textiles (15%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]" />
                <span className="text-neutral-700">Oils & Fluids (8%)</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-neutral-400">
          <Info className="w-3.5 h-3.5" />
          <span>Updated continuously via weighbridge telemetry</span>
        </div>
      </div>
    </div>
  );
};
