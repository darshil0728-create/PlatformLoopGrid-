import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Zap,
  Truck,
  DollarSign,
  Leaf,
  Sparkles,
  ArrowRight,
  Download,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import { UdyamAccountDetails } from './ComplianceScorePage';

interface GrowthOptimizationDashboardProps {
  udyam: UdyamAccountDetails;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
  onNavigateToCapexStore?: () => void;
  className?: string;
}

export const GrowthOptimizationDashboard: React.FC<GrowthOptimizationDashboardProps> = ({
  udyam,
  onShowToast,
  onNavigateToCapexStore,
  className = '',
}) => {
  // Interactive Levers for Real-Time Optimization Simulation
  const [shiftsPerDay, setShiftsPerDay] = useState<number>(2); // 1, 2, or 3 shifts
  const [solarMixPct, setSolarMixPct] = useState<number>(45); // 0% to 80% Solar Rooftop Mix
  const [logisticsClusterRadiusKm, setLogisticsClusterRadiusKm] = useState<number>(15); // 5km to 30km pooling
  const [scrapRecoveryEfficiency, setScrapRecoveryEfficiency] = useState<number>(85); // 50% to 98%
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'ebitda' | 'energy' | 'logistics'>('all');

  // Real-time calculations dynamic to factory throughput and levers
  const analytics = useMemo(() => {
    // Base annual metrics estimated from Udyam turnover and shifts
    const baseTurnoverRupees = 184000000; // ₹18.40 Crore
    const productionMultiplier = shiftsPerDay === 1 ? 0.65 : shiftsPerDay === 2 ? 1.0 : 1.35;

    // 1. EBITDA Expansion
    // Baseline EBITDA is 11.8%
    const baselineEbitdaMargin = 0.118;
    const baselineEbitdaRupees = baseTurnoverRupees * baselineEbitdaMargin * productionMultiplier;

    // Savings streams:
    // Energy: Solar + IE4 VFDs cut power spend
    const basePowerSpend = 5400000 * productionMultiplier; // ₹54 Lakhs base power spend
    const energySavings = basePowerSpend * (solarMixPct / 100 * 0.6 + 0.15); // up to 45% savings
    const postGreenPowerSpend = basePowerSpend - energySavings;

    // Logistics: Cluster Milk-Runs with nearby MIDC units
    const baseLogisticsSpend = 2640000 * productionMultiplier; // ₹26.4 Lakhs
    const poolingFactor = logisticsClusterRadiusKm >= 15 ? 0.28 : 0.18;
    const logisticsSavings = baseLogisticsSpend * poolingFactor;
    const postGreenLogisticsSpend = baseLogisticsSpend - logisticsSavings;

    // Waste / Secondary Raw Materials: Swarf centrifuge & circular exchange
    const baseWasteLoss = 1800000 * productionMultiplier;
    const wasteMonetization = baseWasteLoss * (scrapRecoveryEfficiency / 100 * 0.75);

    // Total EBITDA Expansion
    const totalAnnualSavingsRupees = energySavings + logisticsSavings + wasteMonetization;
    const optimizedEbitdaRupees = baselineEbitdaRupees + totalAnnualSavingsRupees;
    const optimizedEbitdaMargin = optimizedEbitdaRupees / (baseTurnoverRupees * productionMultiplier);
    const ebitdaMarginLiftBps = Math.round((optimizedEbitdaMargin - baselineEbitdaMargin) * 10000); // basis points
    const ebitdaExpansionPct = ((totalAnnualSavingsRupees / baselineEbitdaRupees) * 100).toFixed(1);

    // Logistics Metrics:
    const vehicleCapacityUtilization = Math.min(96, Math.round(58 + (logisticsClusterRadiusKm / 30) * 36));
    const tonKmFreightRate = (8.4 - (vehicleCapacityUtilization - 58) * 0.08).toFixed(2);
    const monthlyDieselSavedLitres = Math.round(840 * productionMultiplier * (vehicleCapacityUtilization / 65));

    // Energy Metrics:
    const monthlyKwhConserved = Math.round(14500 * (solarMixPct / 45) * productionMultiplier);
    const peakDemandShavedKva = Math.round(42 * (solarMixPct / 40));
    const annualCo2AbatedTonnes = Math.round((monthlyKwhConserved * 12 * 0.82) / 1000);

    return {
      productionMultiplier,
      baselineEbitdaRupees,
      baselineEbitdaMarginPct: (baselineEbitdaMargin * 100).toFixed(1),
      optimizedEbitdaRupees,
      optimizedEbitdaMarginPct: (optimizedEbitdaMargin * 100).toFixed(1),
      ebitdaMarginLiftBps,
      ebitdaExpansionPct,
      totalAnnualSavingsRupees,
      energySavings,
      postGreenPowerSpend,
      basePowerSpend,
      monthlyKwhConserved,
      peakDemandShavedKva,
      annualCo2AbatedTonnes,
      logisticsSavings,
      baseLogisticsSpend,
      postGreenLogisticsSpend,
      vehicleCapacityUtilization,
      tonKmFreightRate,
      monthlyDieselSavedLitres,
      wasteMonetization,
    };
  }, [shiftsPerDay, solarMixPct, logisticsClusterRadiusKm, scrapRecoveryEfficiency]);

  // Quarterly EBITDA Trajectory Chart Data
  const ebitdaQuarterlyData = useMemo(() => {
    const qBase = analytics.baselineEbitdaRupees / 4 / 100000;
    const qSavings = analytics.totalAnnualSavingsRupees / 4 / 100000;

    return [
      {
        quarter: 'Q1 (Current Baseline)',
        baselineEbitda: Math.round(qBase * 10) / 10,
        optimizedEbitda: Math.round(qBase * 10) / 10,
        ebitdaMarginPct: Number(analytics.baselineEbitdaMarginPct),
      },
      {
        quarter: 'Q2 (Solar + VFD Online)',
        baselineEbitda: Math.round(qBase * 10) / 10,
        optimizedEbitda: Math.round((qBase + qSavings * 0.4) * 10) / 10,
        ebitdaMarginPct: Number((Number(analytics.baselineEbitdaMarginPct) + 1.2).toFixed(1)),
      },
      {
        quarter: 'Q3 (Cluster Milk-Runs)',
        baselineEbitda: Math.round(qBase * 10) / 10,
        optimizedEbitda: Math.round((qBase + qSavings * 0.75) * 10) / 10,
        ebitdaMarginPct: Number((Number(analytics.baselineEbitdaMarginPct) + 2.8).toFixed(1)),
      },
      {
        quarter: 'Q4 (Full Optimization)',
        baselineEbitda: Math.round(qBase * 10) / 10,
        optimizedEbitda: Math.round((qBase + qSavings) * 10) / 10,
        ebitdaMarginPct: Number(analytics.optimizedEbitdaMarginPct),
      },
    ];
  }, [analytics]);

  // Energy & Logistics Comparative Breakdown Data
  const comparativePillarData = useMemo(() => {
    return [
      {
        pillar: 'Energy Spend (Power & Grid)',
        currentCost: Math.round((analytics.basePowerSpend / 100000) * 10) / 10,
        optimizedCost: Math.round((analytics.postGreenPowerSpend / 100000) * 10) / 10,
        savings: Math.round((analytics.energySavings / 100000) * 10) / 10,
      },
      {
        pillar: 'Freight & Logistics (Dispatch)',
        currentCost: Math.round((analytics.baseLogisticsSpend / 100000) * 10) / 10,
        optimizedCost: Math.round((analytics.postGreenLogisticsSpend / 100000) * 10) / 10,
        savings: Math.round((analytics.logisticsSavings / 100000) * 10) / 10,
      },
      {
        pillar: 'Scrap & Material Recovery',
        currentCost: Math.round((analytics.wasteMonetization * 1.5 / 100000) * 10) / 10,
        optimizedCost: Math.round((analytics.wasteMonetization * 0.3 / 100000) * 10) / 10,
        savings: Math.round((analytics.wasteMonetization / 100000) * 10) / 10,
      },
    ];
  }, [analytics]);

  const handleExportOptimizationReport = () => {
    onShowToast(
      'Optimization Blueprint Dispatched',
      `Exported real-time EBITDA expansion report (+${analytics.ebitdaMarginLiftBps} bps, ₹${(analytics.totalAnnualSavingsRupees / 100000).toFixed(1)}L annual lift).`,
      'success'
    );
    window.print();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SECTION HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Operational Alpha Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Growth & Optimization Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
              Translate real shop-floor parameters into verifiable P&L expansion. Quantify bottom-line EBITDA expansion, solar energy offset, and cluster logistics pooling in real time.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleExportOptimizationReport}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export Growth Blueprint</span>
            </button>
            {onNavigateToCapexStore && (
              <button
                type="button"
                onClick={onNavigateToCapexStore}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 transition-colors cursor-pointer shadow-md inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Execute Subsidies</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 CORE PILLAR KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {/* Card 1: EBITDA Expansion */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0F172A] text-white flex flex-col justify-between space-y-4 shadow-md relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  1. EBITDA MARGIN EXPANSION
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    +{analytics.ebitdaMarginLiftBps} bps
                  </span>
                  <span className="text-xs text-slate-300 font-bold">
                    ({analytics.baselineEbitdaMarginPct}% → {analytics.optimizedEbitdaMarginPct}%)
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Annual Cash Added to P&L:</span>
                <strong className="text-emerald-400 font-mono font-bold">
                  +₹{(analytics.totalAnnualSavingsRupees / 100000).toFixed(2)} Lakhs / yr
                </strong>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>EBITDA Uplift Rate:</span>
                <strong className="text-white font-mono">+{analytics.ebitdaExpansionPct}% expansion</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Energy Cost Savings */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  2. ENERGY TARIFF COLLAPSE
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                    ₹{(analytics.energySavings / 100000).toFixed(2)}{' '}
                    <span className="text-sm font-semibold text-neutral-500">Lakhs / yr</span>
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Monthly kWh Conserved:</span>
                <strong className="font-mono text-neutral-900 font-bold">
                  {analytics.monthlyKwhConserved.toLocaleString('en-IN')} kWh / mo
                </strong>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Peak Load Shaved:</span>
                <strong className="text-amber-700 font-mono">{analytics.peakDemandShavedKva} kVA off-grid</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Logistics Efficiency Improvements */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  3. CLUSTER LOGISTICS POOLING
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                    {analytics.vehicleCapacityUtilization}%{' '}
                    <span className="text-sm font-semibold text-neutral-500">Utilization</span>
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Ton-Km Freight Cost:</span>
                <strong className="font-mono text-neutral-900 font-bold">
                  ₹{analytics.tonKmFreightRate} / ton-km (was ₹8.40)
                </strong>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Fuel Conserved:</span>
                <strong className="text-sky-700 font-mono">{analytics.monthlyDieselSavedLitres} L / mo diesel</strong>
              </div>
            </div>
          </div>
        </div>

        {/* REAL-TIME INTERACTIVE OPERATIONAL LEVERS */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neutral-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Real-Time Operational Levers (Adjust Levers to Simulate Live P&L Impact)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Shop Floor: {udyam.enterpriseName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Lever 1: Factory Shifts */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Production Shifts</span>
                <span className="font-mono font-bold text-neutral-900">{shiftsPerDay} Shifts / Day</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((shift) => (
                  <button
                    key={shift}
                    type="button"
                    onClick={() => setShiftsPerDay(shift)}
                    className={`py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      shiftsPerDay === shift
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {shift} {shift === 1 ? 'Shift' : 'Shifts'}
                  </button>
                ))}
              </div>
            </div>

            {/* Lever 2: Solar Rooftop Mix */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Solar Power Share</span>
                <span className="font-mono font-bold text-emerald-700">{solarMixPct}% Off-Grid</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={5}
                value={solarMixPct}
                onChange={(e) => setSolarMixPct(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>0% Grid</span>
                <span>40% Hybrid</span>
                <span>80% Solar</span>
              </div>
            </div>

            {/* Lever 3: Logistics Cluster Radius */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">MIDC Pooling Radius</span>
                <span className="font-mono font-bold text-sky-700">{logisticsClusterRadiusKm} km Hub</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={logisticsClusterRadiusKm}
                onChange={(e) => setLogisticsClusterRadiusKm(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>5 km Local</span>
                <span>15 km MIDC</span>
                <span>30 km Regional</span>
              </div>
            </div>

            {/* Lever 4: Scrap Recovery Centrifuge */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Swarf Centrifuge Oil</span>
                <span className="font-mono font-bold text-amber-700">{scrapRecoveryEfficiency}% Reclaim</span>
              </div>
              <input
                type="range"
                min={50}
                max={98}
                step={2}
                value={scrapRecoveryEfficiency}
                onChange={(e) => setScrapRecoveryEfficiency(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>50% Basic</span>
                <span>75% Centrifuge</span>
                <span>98% ZED Gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECHARTS VISUALIZATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: COMPOSED CHART - Quarterly EBITDA Trajectory */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">
                Quarterly EBITDA Trajectory (₹ Lakhs & Margin %)
              </h3>
              <p className="text-xs text-neutral-500">
                Shows progressive EBITDA expansion as energy and logistics levers come online.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +{analytics.ebitdaMarginLiftBps} bps Lift
            </span>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ebitdaQuarterlyData} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#475569' }} unit=" L" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#059669' }} unit="%" domain={[10, 18]} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    name === 'ebitdaMarginPct' ? `${val}%` : `₹${val} Lakhs`,
                    name === 'baselineEbitda'
                      ? 'Baseline EBITDA'
                      : name === 'optimizedEbitda'
                      ? 'Expanded EBITDA'
                      : 'EBITDA Margin %',
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  formatter={(value) =>
                    value === 'baselineEbitda'
                      ? 'Baseline EBITDA (₹ Lakhs)'
                      : value === 'optimizedEbitda'
                      ? 'Expanded EBITDA (₹ Lakhs)'
                      : 'EBITDA Margin %'
                  }
                />
                <Bar yAxisId="left" dataKey="baselineEbitda" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="baselineEbitda" />
                <Bar yAxisId="left" dataKey="optimizedEbitda" fill="#0F172A" radius={[4, 4, 0, 0]} name="optimizedEbitda" />
                <Line yAxisId="right" type="monotone" dataKey="ebitdaMarginPct" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="ebitdaMarginPct" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: GROUPED BAR CHART - Energy & Logistics Cost Collapse */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">
                Pillar Cost Comparison: Baseline vs. Optimized (₹ Lakhs)
              </h3>
              <p className="text-xs text-neutral-500">
                Direct collapse in annual operating costs across Energy, Logistics, and Scrap.
              </p>
            </div>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              ₹{(analytics.totalAnnualSavingsRupees / 100000).toFixed(1)}L Net Savings
            </span>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativePillarData} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="pillar" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 10, fill: '#475569' }} unit=" L" />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `₹${val} Lakhs`,
                    name === 'currentCost'
                      ? 'Current Cost'
                      : name === 'optimizedCost'
                      ? 'Post-Optimization Cost'
                      : 'Annual Net Savings',
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  formatter={(value) =>
                    value === 'currentCost'
                      ? 'Current Cost (₹ Lakhs)'
                      : value === 'optimizedCost'
                      ? 'Optimized Cost (₹ Lakhs)'
                      : 'Net Savings Harvested'
                  }
                />
                <Bar dataKey="currentCost" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="currentCost" />
                <Bar dataKey="optimizedCost" fill="#0F172A" radius={[4, 4, 0, 0]} name="optimizedCost" />
                <Bar dataKey="savings" fill="#10B981" radius={[4, 4, 0, 0]} name="savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
