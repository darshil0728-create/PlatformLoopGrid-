import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Zap,
  Recycle,
  Truck,
  DollarSign,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';

export const GreenSavingsRoiDashboard: React.FC = () => {
  // Interactive Simulator Sliders
  const [monthlyPowerBill, setMonthlyPowerBill] = useState<number>(180000); // ₹1,80,000 / month
  const [monthlyScrapTons, setMonthlyScrapTons] = useState<number>(8.5); // 8.5 Tons / month
  const [averageHaulageKm, setAverageHaulageKm] = useState<number>(45); // 45 km average haulage

  // Chart view toggle: Monthly Savings Breakdown vs Cumulative ROI
  const [activeChartMode, setActiveChartMode] = useState<'monthly' | 'cumulative'>('monthly');

  // Dynamic calculations based on simulator sliders
  const calculations = useMemo(() => {
    // 1. Energy Savings: APFC power factor correction (>0.98 gives 2% rebate) + VFD speed modulation (saves 22%) + Rooftop Solar offset
    const monthlyEnergySaved = Math.round(monthlyPowerBill * 0.28); // 28% net energy bill reduction

    // 2. Waste Monetization: Swarf centrifugal spin drying (recovers neat cutting fluid) + pre-tested segregated alloy premium (+22% resale)
    const monthlyWasteSaved = Math.round(monthlyScrapTons * 1000 * 8.5); // ₹8.5/kg net recovered value

    // 3. Logistics Optimization: AI cluster proximity matching (reduces haulage from 45km to 4.2km local foundries)
    const monthlyLogisticsSaved = Math.round((averageHaulageKm - 4.2) * monthlyScrapTons * 85); // ₹85/ton-km saved

    const totalMonthlySavings = monthlyEnergySaved + monthlyWasteSaved + monthlyLogisticsSaved;
    const totalAnnualSavings = totalMonthlySavings * 12;

    // Upfront hardware investment after ZED (80%) + CLCSS (15%) government subsidies
    // Gross Capex: ~₹12.5L -> Subsidies cover 80% (₹10.0L) -> Net MSME Outlay: ₹2.5L (often 100% funded via energy savings)
    const grossHardwareCapex = 1250000;
    const govtSubsidiesClaimed = Math.round(grossHardwareCapex * 0.8);
    const netMsmeCapexOutlay = grossHardwareCapex - govtSubsidiesClaimed; // ₹2,50,000

    const paybackPeriodMonths = Math.max(0.8, Number((netMsmeCapexOutlay / totalMonthlySavings).toFixed(1)));
    const threeYearNetSavings = totalAnnualSavings * 3 - netMsmeCapexOutlay;
    const threeYearRoiPercent = Math.round((threeYearNetSavings / Math.max(1, netMsmeCapexOutlay)) * 100);

    return {
      monthlyEnergySaved,
      monthlyWasteSaved,
      monthlyLogisticsSaved,
      totalMonthlySavings,
      totalAnnualSavings,
      grossHardwareCapex,
      govtSubsidiesClaimed,
      netMsmeCapexOutlay,
      paybackPeriodMonths,
      threeYearNetSavings,
      threeYearRoiPercent,
    };
  }, [monthlyPowerBill, monthlyScrapTons, averageHaulageKm]);

  // 12-Month Simulated Trend Data for Recharts
  const monthlyChartData = useMemo(() => {
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'];
    return months.map((m, idx) => {
      // Ramp-up factor as initiatives stabilize
      const ramp = Math.min(1.0, 0.75 + idx * 0.03);
      const energy = Math.round(calculations.monthlyEnergySaved * ramp);
      const waste = Math.round(calculations.monthlyWasteSaved * ramp);
      const logistics = Math.round(calculations.monthlyLogisticsSaved * ramp);
      const total = energy + waste + logistics;

      return {
        month: m,
        Energy: energy,
        Waste: waste,
        Logistics: logistics,
        TotalSavings: total,
      };
    });
  }, [calculations]);

  // Cumulative ROI Data over 24 Months
  const cumulativeRoiData = useMemo(() => {
    let cumulative = -calculations.netMsmeCapexOutlay;
    const data = [];
    for (let i = 1; i <= 24; i++) {
      cumulative += calculations.totalMonthlySavings;
      data.push({
        month: `M${i}`,
        CumulativeNetProfit: Math.round(cumulative),
        BreakevenLine: 0,
        CapexOutlay: -calculations.netMsmeCapexOutlay,
      });
    }
    return data;
  }, [calculations]);

  // Donut distribution data
  const pieData = useMemo(() => {
    return [
      { name: 'Energy Efficiency', value: calculations.monthlyEnergySaved, color: '#10B981' },
      { name: 'Waste-to-Wealth', value: calculations.monthlyWasteSaved, color: '#0F172A' },
      { name: 'Cluster Logistics', value: calculations.monthlyLogisticsSaved, color: '#0284C7' },
    ];
  }, [calculations]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <TrendingUp className="w-4 h-4" />
            <span>RETURN ON INVESTMENT (ROI) ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-0.5">
            Green Initiatives Cost Savings & ROI Dashboard
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time financial simulation measuring unit economics across Energy, Waste-to-Wealth, and Cluster Logistics.
          </p>
        </div>

        {/* Segmented Control for Chart Mode */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-full text-xs font-bold flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveChartMode('monthly')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeChartMode === 'monthly'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Monthly Savings by Pillar
          </button>
          <button
            type="button"
            onClick={() => setActiveChartMode('cumulative')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeChartMode === 'cumulative'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Cumulative 24M ROI
          </button>
        </div>
      </div>

      {/* Top 4 Real-Time Impact Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Annual Savings */}
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>ANNUAL SAVINGS</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
            ₹{(calculations.totalAnnualSavings / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            ₹{calculations.totalMonthlySavings.toLocaleString('en-IN')}/mo net added to EBITDA
          </span>
        </div>

        {/* Metric 2: Payback Period */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
            <span>PAYBACK PERIOD</span>
            <Calendar className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            {calculations.paybackPeriodMonths} Months
          </div>
          <span className="text-[11px] text-neutral-500 font-semibold block">
            Subsidized Capex breakeven
          </span>
        </div>

        {/* Metric 3: 3-Year Projected ROI */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-sky-800">
            <span>3-YEAR NET ROI</span>
            <Sparkles className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">
            {calculations.threeYearRoiPercent}%
          </div>
          <span className="text-[11px] text-sky-700 font-semibold block">
            +₹{(calculations.threeYearNetSavings / 100000).toFixed(2)}L net cash generated
          </span>
        </div>

        {/* Metric 4: Government Subsidy Offset */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-blue-800">
            <span>SUBSIDY OFFSET</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
            ₹{(calculations.govtSubsidiesClaimed / 100000).toFixed(1)} Lakhs
          </div>
          <span className="text-[11px] text-blue-700 font-semibold block">
            80% ZED + CLCSS hardware cover
          </span>
        </div>
      </div>

      {/* Main Visualizations: Chart + Donut Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Main Chart Column */}
        <div className="lg:col-span-8 bg-neutral-50/60 rounded-3xl p-5 border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800">
              {activeChartMode === 'monthly'
                ? 'Monthly Cost Savings by Strategic Pillar (₹ in Rupees)'
                : 'Cumulative Cash Breakeven & Net Profit Horizon (24 Months)'}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">Simulated for your MIDC unit</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartMode === 'monthly' ? (
                <BarChart data={monthlyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString('en-IN')}`, name]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    iconType="circle"
                  />
                  <Bar dataKey="Energy" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Energy Efficiency" />
                  <Bar dataKey="Waste" stackId="a" fill="#0F172A" radius={[0, 0, 0, 0]} name="Waste-to-Wealth" />
                  <Bar dataKey="Logistics" stackId="a" fill="#0284C7" radius={[4, 4, 0, 0]} name="Cluster Logistics" />
                </BarChart>
              ) : (
                <AreaChart data={cumulativeRoiData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Net Cumulative Cash']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="CumulativeNetProfit"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#profitGrad)"
                    name="Net Cumulative Profit"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Distribution Donut Column */}
        <div className="lg:col-span-4 bg-neutral-50/60 rounded-3xl p-5 border border-neutral-200/80 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-neutral-800 block">Savings Distribution by Pillar</span>
            <span className="text-[11px] text-neutral-500">Share of monthly ₹{calculations.totalMonthlySavings.toLocaleString('en-IN')}</span>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString('en-IN')}/mo`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-1 border-t border-neutral-200/60">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Energy Efficiency
              </span>
              <strong className="font-mono text-neutral-900">
                ₹{calculations.monthlyEnergySaved.toLocaleString('en-IN')}/mo
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]" />
                Waste-to-Wealth
              </span>
              <strong className="font-mono text-neutral-900">
                ₹{calculations.monthlyWasteSaved.toLocaleString('en-IN')}/mo
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                Cluster Logistics
              </span>
              <strong className="font-mono text-neutral-900">
                ₹{calculations.monthlyLogisticsSaved.toLocaleString('en-IN')}/mo
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Sliders: Customize for your Factory */}
      <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Simulate Your Factory Parameters (Live Dynamic Recalculation)
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">Move sliders to see live ROI adjustments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs">
          {/* Slider 1: Monthly Power Bill */}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-neutral-700">Monthly Electricity Bill</span>
              <span className="font-mono text-emerald-700">₹{monthlyPowerBill.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="600000"
              step="10000"
              value={monthlyPowerBill}
              onChange={(e) => setMonthlyPowerBill(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>₹50k</span>
              <span>₹3L</span>
              <span>₹6L</span>
            </div>
          </div>

          {/* Slider 2: Monthly Scrap Generation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-neutral-700">Monthly Metal Scrap / Swarf</span>
              <span className="font-mono text-[#0F172A]">{monthlyScrapTons} Tons</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={monthlyScrapTons}
              onChange={(e) => setMonthlyScrapTons(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>1 Ton</span>
              <span>12 Tons</span>
              <span>25 Tons</span>
            </div>
          </div>

          {/* Slider 3: Average Haulage Distance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-neutral-700">Current Freight Haulage Distance</span>
              <span className="font-mono text-sky-700">{averageHaulageKm} km</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={averageHaulageKm}
              onChange={(e) => setAverageHaulageKm(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>10 km</span>
              <span>65 km</span>
              <span>120 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
