import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Zap,
  Trash2,
  Truck,
  DollarSign,
  ArrowRight,
  Download,
  Sliders,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Award,
  Sparkles,
  Info,
  Calendar,
  Percent,
} from 'lucide-react';

interface GreenCostSavingsDashboardProps {
  onShowToast?: (title: string, message: string, type?: 'success' | 'info') => void;
  onNavigateToCapexStore?: () => void;
  className?: string;
}

export const GreenCostSavingsDashboard: React.FC<GreenCostSavingsDashboardProps> = ({
  onShowToast,
  onNavigateToCapexStore,
  className = '',
}) => {
  // Interactive Slider Parameters for the MSME Factory
  const [monthlyElectricityBill, setMonthlyElectricityBill] = useState<number>(450000); // ₹4,50,000 / mo
  const [monthlyScrapTonnage, setMonthlyScrapTonnage] = useState<number>(12); // 12 Tons / mo
  const [monthlyLogisticsSpend, setMonthlyLogisticsSpend] = useState<number>(220000); // ₹2,20,000 / mo
  const [applyGovtSubsidies, setApplyGovtSubsidies] = useState<boolean>(true); // 80% ZED + 15% CLCSS
  const [activeChartView, setActiveChartView] = useState<'comparison' | 'cumulative' | 'distribution'>('comparison');

  // Dynamic Financial & Operational Calculations
  const calculations = useMemo(() => {
    // 1. Energy Savings
    // 50kW solar + IE4 VFDs cut factory grid energy spend by ~38%
    const annualElectricitySpend = monthlyElectricityBill * 12;
    const annualEnergySavings = annualElectricitySpend * 0.38;
    const energyPostGreen = annualElectricitySpend - annualEnergySavings;

    // 2. Waste & Scrap Monetization
    // Swarf centrifuge reclaims 98% cutting oil (₹36,000/mo) + secondary exchange gets +18% higher rate
    const annualScrapTons = monthlyScrapTonnage * 12;
    const baselineScrapLossAndDisposal = annualScrapTons * 12000 + 180000; // disposal costs & unoptimized scrap rates
    const annualWasteSavingsAndRev = annualScrapTons * 6200 + 36000 * 12; // recovered cutting oil + secondary premium
    const wastePostGreen = Math.max(0, baselineScrapLossAndDisposal - annualWasteSavingsAndRev);

    // 3. Logistics & Supply Chain
    // Cluster milk-runs with MIDC neighbors cut localized freight by ~24%
    const annualLogisticsSpend = monthlyLogisticsSpend * 12;
    const annualLogisticsSavings = annualLogisticsSpend * 0.24;
    const logisticsPostGreen = annualLogisticsSpend - annualLogisticsSavings;

    // 4. Regulatory & Penalties (SPCB / CPCB consent violations, CTO renewal fines)
    const baselineStatutoryLoss = 480000; // ₹4.8 Lakhs / yr in compliance audit fees & penalties
    const statutoryPostGreen = 0; // 100% eliminated by LoopGrid auto-filing

    // Totals
    const totalBaselineOperatingCost =
      annualElectricitySpend + baselineScrapLossAndDisposal + annualLogisticsSpend + baselineStatutoryLoss;

    const totalAnnualSavings =
      annualEnergySavings + annualWasteSavingsAndRev + annualLogisticsSavings + baselineStatutoryLoss;

    const totalOptimizedOperatingCost = totalBaselineOperatingCost - totalAnnualSavings;

    // Green Hardware Capex (Solar 50kW + Centrifuge + VFDs + ETP)
    const grossHardwareCapex = 2450000; // ₹24.5 Lakhs
    // Govt Subsidy Coverage (ZED Gold 80% on certification & audits + CLCSS 15% grant + SIDBI interest offset)
    const govtSubsidyCoverage = applyGovtSubsidies ? 1120000 : 0; // ₹11.2 Lakhs covered
    const netUpfrontCapex = grossHardwareCapex - govtSubsidyCoverage; // ₹13.3 Lakhs net

    // Payback period in months
    const paybackMonths = Math.max(
      3.2,
      Math.round((netUpfrontCapex / (totalAnnualSavings / 12)) * 10) / 10
    );

    // 3-Year ROI %
    const threeYearNetSavings = totalAnnualSavings * 3 - netUpfrontCapex;
    const threeYearRoiPct = Math.round((threeYearNetSavings / Math.max(1, netUpfrontCapex)) * 100);

    // 5-Year Cumulative Wealth Created
    const fiveYearNetWealth = totalAnnualSavings * 5 - netUpfrontCapex;

    return {
      annualElectricitySpend,
      annualEnergySavings,
      energyPostGreen,
      baselineScrapLossAndDisposal,
      annualWasteSavingsAndRev,
      wastePostGreen,
      annualLogisticsSpend,
      annualLogisticsSavings,
      logisticsPostGreen,
      baselineStatutoryLoss,
      statutoryPostGreen,
      totalBaselineOperatingCost,
      totalAnnualSavings,
      totalOptimizedOperatingCost,
      grossHardwareCapex,
      govtSubsidyCoverage,
      netUpfrontCapex,
      paybackMonths,
      threeYearRoiPct,
      fiveYearNetWealth,
    };
  }, [monthlyElectricityBill, monthlyScrapTonnage, monthlyLogisticsSpend, applyGovtSubsidies]);

  // Chart 1: Grouped Bar Chart Data (Before vs After Green Initiative in ₹ Lakhs)
  const comparisonChartData = useMemo(() => {
    return [
      {
        category: 'Energy (Power & Grid)',
        baseline: Math.round((calculations.annualElectricitySpend / 100000) * 10) / 10,
        optimized: Math.round((calculations.energyPostGreen / 100000) * 10) / 10,
        savings: Math.round((calculations.annualEnergySavings / 100000) * 10) / 10,
      },
      {
        category: 'Waste & Scrap Losses',
        baseline: Math.round((calculations.baselineScrapLossAndDisposal / 100000) * 10) / 10,
        optimized: Math.round((calculations.wastePostGreen / 100000) * 10) / 10,
        savings: Math.round((calculations.annualWasteSavingsAndRev / 100000) * 10) / 10,
      },
      {
        category: 'Freight & Logistics',
        baseline: Math.round((calculations.annualLogisticsSpend / 100000) * 10) / 10,
        optimized: Math.round((calculations.logisticsPostGreen / 100000) * 10) / 10,
        savings: Math.round((calculations.annualLogisticsSavings / 100000) * 10) / 10,
      },
      {
        category: 'Statutory Penalties',
        baseline: Math.round((calculations.baselineStatutoryLoss / 100000) * 10) / 10,
        optimized: 0,
        savings: Math.round((calculations.baselineStatutoryLoss / 100000) * 10) / 10,
      },
    ];
  }, [calculations]);

  // Chart 2: 5-Year Cumulative Net Wealth & Payback Trajectory Data (in ₹ Lakhs)
  const cumulativeChartData = useMemo(() => {
    const netCapexLakhs = Math.round((calculations.netUpfrontCapex / 100000) * 10) / 10;
    const monthlySavingsLakhs = calculations.totalAnnualSavings / 12 / 100000;

    return [
      {
        month: 'M0 (Capex)',
        netCash: -netCapexLakhs,
        cumulativeSavings: 0,
        unsubsidizedCapex: -Math.round((calculations.grossHardwareCapex / 100000) * 10) / 10,
      },
      {
        month: 'M6',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 6) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 6) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 6) * 10) / 10,
      },
      {
        month: 'M12 (1 Yr)',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 12) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 12) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 12) * 10) / 10,
      },
      {
        month: `M${Math.round(calculations.paybackMonths)} (Break-even)`,
        netCash: 0,
        cumulativeSavings: netCapexLakhs,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * calculations.paybackMonths) * 10) / 10,
      },
      {
        month: 'M24 (2 Yr)',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 24) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 24) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 24) * 10) / 10,
      },
      {
        month: 'M36 (3 Yr)',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 36) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 36) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 36) * 10) / 10,
      },
      {
        month: 'M48 (4 Yr)',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 48) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 48) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 48) * 10) / 10,
      },
      {
        month: 'M60 (5 Yr)',
        netCash: Math.round((-netCapexLakhs + monthlySavingsLakhs * 60) * 10) / 10,
        cumulativeSavings: Math.round((monthlySavingsLakhs * 60) * 10) / 10,
        unsubsidizedCapex: Math.round((-calculations.grossHardwareCapex / 100000 + monthlySavingsLakhs * 60) * 10) / 10,
      },
    ];
  }, [calculations]);

  // Chart 3: Pie Chart Data - Savings Distribution
  const pieDistributionData = useMemo(() => {
    return [
      {
        name: 'Energy Efficiency (Solar & VFD)',
        value: Math.round((calculations.annualEnergySavings / calculations.totalAnnualSavings) * 100),
        amount: Math.round((calculations.annualEnergySavings / 100000) * 10) / 10,
        color: '#10B981', // Emerald 500
      },
      {
        name: 'Waste & Scrap Monetization',
        value: Math.round((calculations.annualWasteSavingsAndRev / calculations.totalAnnualSavings) * 100),
        amount: Math.round((calculations.annualWasteSavingsAndRev / 100000) * 10) / 10,
        color: '#0284C7', // Sky 600
      },
      {
        name: 'Cluster Logistics Milk-Runs',
        value: Math.round((calculations.annualLogisticsSavings / calculations.totalAnnualSavings) * 100),
        amount: Math.round((calculations.annualLogisticsSavings / 100000) * 10) / 10,
        color: '#F59E0B', // Amber 500
      },
      {
        name: 'Statutory Shield & Zero Fines',
        value: Math.round((calculations.baselineStatutoryLoss / calculations.totalAnnualSavings) * 100),
        amount: Math.round((calculations.baselineStatutoryLoss / 100000) * 10) / 10,
        color: '#6366F1', // Indigo 500
      },
    ];
  }, [calculations]);

  const handleDownloadReport = () => {
    if (onShowToast) {
      onShowToast(
        'Executive ROI Report Generated',
        `3-Year Green ROI of ${calculations.threeYearRoiPct}% & ₹${(calculations.totalAnnualSavings / 100000).toFixed(1)}L annual savings report exported as PDF.`,
        'success'
      );
    }
    window.print();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* EXECUTIVE HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Hardcore Operational Alpha & Unit Economics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Green Initiative ROI & Cost Savings Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
              Model your factory’s direct bottom-line expansion. Quantify exact rupee savings across Energy, Industrial Scrap, and Cluster Logistics, backed by government green subsidies.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export Executive ROI Report</span>
            </button>
            {onNavigateToCapexStore && (
              <button
                type="button"
                onClick={onNavigateToCapexStore}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 shadow-md transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Deploy Subsidized Capex</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 HIGH-IMPACT KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* KPI 1: Total Annual Savings */}
          <div className="p-5 rounded-2xl bg-[#0F172A] text-white flex flex-col justify-between space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                TOTAL ANNUAL BOTTOM-LINE LIFT
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-400">
                ₹{(calculations.totalAnnualSavings / 100000).toFixed(2)}{' '}
                <span className="text-sm font-semibold text-slate-300">Lakhs / yr</span>
              </div>
              <span className="text-[11px] text-slate-300 mt-0.5 block">
                +24.2% Estimated factory EBITDA expansion
              </span>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>₹{Math.round(calculations.totalAnnualSavings / 12).toLocaleString('en-IN')} / month saved</span>
            </div>
          </div>

          {/* KPI 2: Energy Savings */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                1. ENERGY CONSUMPTION CUT
              </span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                ₹{(calculations.annualEnergySavings / 100000).toFixed(2)}{' '}
                <span className="text-xs font-semibold text-neutral-500">Lakhs</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
                -38.0% DISCOM grid bill reduction
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-100">
              50kW Captive Solar PV + IE4 Motor Drives
            </div>
          </div>

          {/* KPI 3: Waste & Scrap Monetization */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                2. CIRCULAR SCRAP MONETIZATION
              </span>
              <Trash2 className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                ₹{(calculations.annualWasteSavingsAndRev / 100000).toFixed(2)}{' '}
                <span className="text-xs font-semibold text-neutral-500">Lakhs</span>
              </div>
              <span className="text-[11px] text-sky-700 font-bold mt-0.5 block">
                Zero landfill loss + Oil reclaimed
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-100">
              Centrifuge oil extraction + MIDC secondary exchange
            </div>
          </div>

          {/* KPI 4: Net Payback & 3-Year ROI */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                GREEN CAPITAL PAYBACK
              </span>
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-900">
                {calculations.paybackMonths}{' '}
                <span className="text-xs font-semibold text-emerald-700">Months</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-extrabold mt-0.5 block">
                {calculations.threeYearRoiPct}% 3-Year ROI
              </span>
            </div>
            <div className="text-[10px] text-emerald-800 pt-1 border-t border-emerald-200/60 font-medium">
              Subsidized by ZED Gold & CLCSS grants
            </div>
          </div>
        </div>

        {/* INTERACTIVE FACTORY SIMULATOR CONTROLS */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-neutral-50/90 border border-neutral-200/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neutral-700" />
              <h3 className="text-xs sm:text-sm font-extrabold text-neutral-900 uppercase tracking-wider">
                Interactive Factory Parameters (Drag Sliders to Simulate Real-time ROI)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={applyGovtSubsidies}
                  onChange={(e) => setApplyGovtSubsidies(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-neutral-800">
                  Apply Govt Subsidies (80% ZED + CLCSS)
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
            {/* Slider 1: Electricity Spend */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-neutral-200/70 shadow-2xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Monthly Electricity Bill
                </span>
                <span className="font-mono font-extrabold text-neutral-900">
                  ₹{(monthlyElectricityBill / 100000).toFixed(1)}L / mo
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={1500000}
                step={25000}
                value={monthlyElectricityBill}
                onChange={(e) => setMonthlyElectricityBill(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>₹1.0L</span>
                <span>₹7.5L</span>
                <span>₹15.0L</span>
              </div>
            </div>

            {/* Slider 2: Scrap Output */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-neutral-200/70 shadow-2xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-sky-600" />
                  Monthly Scrap & Swarf
                </span>
                <span className="font-mono font-extrabold text-neutral-900">
                  {monthlyScrapTonnage} Tons / mo
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                step={1}
                value={monthlyScrapTonnage}
                onChange={(e) => setMonthlyScrapTonnage(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>2 MT</span>
                <span>20 MT</span>
                <span>40 MT</span>
              </div>
            </div>

            {/* Slider 3: Logistics Spend */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-neutral-200/70 shadow-2xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  Monthly Freight & Logistics
                </span>
                <span className="font-mono font-extrabold text-neutral-900">
                  ₹{(monthlyLogisticsSpend / 100000).toFixed(1)}L / mo
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={800000}
                step={20000}
                value={monthlyLogisticsSpend}
                onChange={(e) => setMonthlyLogisticsSpend(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>₹0.5L</span>
                <span>₹4.0L</span>
                <span>₹8.0L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECHARTS VISUALIZATION STAGE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
        {/* Chart View Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900">
              Interactive Financial Projection Charts (Recharts Engine)
            </h3>
            <p className="text-xs text-neutral-500">
              Grounded in actual Indian MSME industrial benchmarks, electricity tariffs, and scrap commodity prices.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveChartView('comparison')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeChartView === 'comparison'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Before vs After Bar Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveChartView('cumulative')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeChartView === 'cumulative'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              5-Year Payback Area
            </button>
            <button
              type="button"
              onClick={() => setActiveChartView('distribution')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeChartView === 'distribution'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Savings Breakdown Donut
            </button>
          </div>
        </div>

        {/* CHART 1: GROUPED BAR CHART - Before vs After Operating Costs */}
        {activeChartView === 'comparison' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Comparing Annual Costs in <strong>₹ Lakhs</strong></span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-300" />
                  <span>Current Baseline Cost</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#0F172A]" />
                  <span>Optimized Cost</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Net Rupee Savings</span>
                </div>
              </div>
            </div>

            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} unit=" L" />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `₹${value} Lakhs`,
                      name === 'baseline'
                        ? 'Current Baseline Cost'
                        : name === 'optimized'
                        ? 'Post-Green Cost'
                        : 'Annual Savings',
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(value) =>
                      value === 'baseline'
                        ? 'Current Baseline Cost (₹ Lakhs)'
                        : value === 'optimized'
                        ? 'Optimized Post-Green Cost (₹ Lakhs)'
                        : 'Annual Net Savings (₹ Lakhs)'
                    }
                  />
                  <Bar dataKey="baseline" fill="#CBD5E1" radius={[6, 6, 0, 0]} name="baseline" />
                  <Bar dataKey="optimized" fill="#0F172A" radius={[6, 6, 0, 0]} name="optimized" />
                  <Bar dataKey="savings" fill="#10B981" radius={[6, 6, 0, 0]} name="savings" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
              {comparisonChartData.map((item) => (
                <div key={item.category} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                  <span className="font-bold text-neutral-800 block text-[11px] truncate">{item.category}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-neutral-400 text-[10px]">Annual Saved:</span>
                    <strong className="text-emerald-700 font-mono text-xs">₹{item.savings} Lakhs</strong>
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Drops from ₹{item.baseline}L to ₹{item.optimized}L
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHART 2: AREA CHART - 5-Year Cumulative ROI & Wealth Curve */}
        {activeChartView === 'cumulative' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 gap-2">
              <span>
                Break-even at <strong>Month {calculations.paybackMonths}</strong> · Net Cashflow in <strong>₹ Lakhs</strong>
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Subsidized Net Cash Flow (₹ Lakhs)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-400" />
                  <span>Cumulative Savings (₹ Lakhs)</span>
                </div>
              </div>
            </div>

            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumulativeChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="slateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} unit=" L" />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `₹${value} Lakhs`,
                      name === 'netCash' ? 'Net Cash Position (After Capex)' : 'Cumulative Gross Savings',
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(value) =>
                      value === 'netCash'
                        ? 'Net Cash Position After Capex (₹ Lakhs)'
                        : 'Cumulative Savings Harvested (₹ Lakhs)'
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeSavings"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#slateGradient)"
                    name="cumulativeSavings"
                  />
                  <Area
                    type="monotone"
                    dataKey="netCash"
                    stroke="#059669"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#emeraldGradient)"
                    name="netCash"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>5-Year Value Created:</strong> In 60 months, your factory accumulates{' '}
                  <strong className="text-emerald-800 font-mono">
                    ₹{(calculations.fiveYearNetWealth / 100000).toFixed(1)} Lakhs
                  </strong>{' '}
                  in pure net cash surplus after recovering all green hardware capex!
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300 whitespace-nowrap">
                EBITDA +24.2%
              </span>
            </div>
          </div>
        )}

        {/* CHART 3: PIE / DONUT - Savings Distribution */}
        {activeChartView === 'distribution' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-200">
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (₹${item.payload.amount} Lakhs/yr)`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-neutral-900 text-sm">Where does your ₹{(calculations.totalAnnualSavings / 100000).toFixed(1)}L annual savings come from?</h4>
              {pieDistributionData.map((entry) => (
                <div key={entry.name} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="font-semibold text-neutral-800">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-neutral-900 block">{entry.value}%</span>
                    <span className="text-neutral-500 text-[10px]">₹{entry.amount}L / yr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 ACTIONABLE HARDWARE BLUEPRINTS */}
        <div className="pt-4 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Recommended Zero-Upfront Hardware Upgrades (Funded from Savings)</span>
            </h4>
            <span className="text-[11px] text-neutral-500 hidden sm:inline">100% Subsidized / Fast-Track Sanctions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                  Energy Solar
                </span>
                <h5 className="font-bold text-neutral-900 text-xs mt-1.5">50 kW Captive Rooftop Solar PV</h5>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Eliminates peak-hour DISCOM grid unit charges at ₹11.50/kWh.
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-700">₹38,500 / mo saved</span>
                <span className="text-[10px] font-semibold text-neutral-600">MNRE + SIDBI</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded uppercase">
                  Waste Recovery
                </span>
                <h5 className="font-bold text-neutral-900 text-xs mt-1.5">Swarf Centrifuge & Chip Crusher</h5>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Reclaims 98% neat cutting oil and doubles dry swarf sale realization.
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-700">₹36,000 / mo saved</span>
                <span className="text-[10px] font-semibold text-neutral-600">80% ZED Gold</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  Logistics
                </span>
                <h5 className="font-bold text-neutral-900 text-xs mt-1.5">MIDC Cluster Milk-Run Route Pooling</h5>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Combines LTL metal dispatches with 8 neighboring MSME foundries.
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-700">₹54,000 / mo saved</span>
                <span className="text-[10px] font-semibold text-neutral-600">LoopGrid Fleet</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase">
                  SPCB Water
                </span>
                <h5 className="font-bold text-neutral-900 text-xs mt-1.5">Compact Zero Liquid Discharge (ZLD)</h5>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Recycles wash water in closed-loop, achieving instant Green SPCB CTO.
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-700">₹18,000 / mo saved</span>
                <span className="text-[10px] font-semibold text-neutral-600">15% CLCSS Grant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
