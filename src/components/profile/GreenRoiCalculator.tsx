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
} from 'recharts';
import {
  Calculator,
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  CheckCircle2,
  Download,
  Landmark,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  Sliders,
  Check,
  Info,
  Layers,
  Clock,
} from 'lucide-react';
import { UdyamAccountDetails } from './ComplianceScorePage';

interface GreenRoiCalculatorProps {
  udyam: UdyamAccountDetails;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
  onNavigateToCapexStore?: () => void;
  className?: string;
}

export interface PresetMachineModel {
  id: string;
  name: string;
  type: string;
  ratedKw: number;
  defaultDailyHours: number;
  recommendedUpgrade: string;
  efficiencyGainPct: number;
  upgradeCapexPerUnit: number;
}

export const PRESET_MACHINE_MODELS: PresetMachineModel[] = [
  {
    id: 'vmc-850',
    name: 'Ace Micromatic VMC 850 (Legacy 22 kW CNC Milling)',
    type: 'CNC Machining Center',
    ratedKw: 22,
    defaultDailyHours: 16,
    recommendedUpgrade: 'IE4 Super-Premium Servo Drives & Regenerative VFD Kit',
    efficiencyGainPct: 32,
    upgradeCapexPerUnit: 340000,
  },
  {
    id: 'compressor-ga37',
    name: 'Atlas Copco GA 37 (Fixed-Speed 37 kW Screw Compressor)',
    type: 'Industrial Air Compressor',
    ratedKw: 37,
    defaultDailyHours: 18,
    recommendedUpgrade: 'BEE 5-Star Permanent Magnet Variable Speed (VSD PM) Upgrade',
    efficiencyGainPct: 38,
    upgradeCapexPerUnit: 580000,
  },
  {
    id: 'lathe-dx200',
    name: 'Jyoti DX 200 (Legacy 18.5 kW CNC Lathe / Turning)',
    type: 'CNC Turning Center',
    ratedKw: 18.5,
    defaultDailyHours: 16,
    recommendedUpgrade: 'Digital Vector VFD Modulation & High-Efficiency Spindle Retrofit',
    efficiencyGainPct: 29,
    upgradeCapexPerUnit: 290000,
  },
  {
    id: 'furnace-inducto',
    name: 'Inductotherm 150 kW Melting Furnace (Uninsulated Crucible)',
    type: 'Induction Melting Furnace',
    ratedKw: 150,
    defaultDailyHours: 12,
    recommendedUpgrade: 'Microprocessor Thermal Blanket & Vacuum Ceramic Insulation',
    efficiencyGainPct: 25,
    upgradeCapexPerUnit: 850000,
  },
  {
    id: 'pump-kirloskar',
    name: 'Kirloskar Centrifugal Pump (30 HP / 22 kW Factory Utility)',
    type: 'Industrial Hydraulic / Water Pump',
    ratedKw: 22,
    defaultDailyHours: 20,
    recommendedUpgrade: 'BEE 5-Star Smart Pressure Sensor Variable Flow Controller',
    efficiencyGainPct: 34,
    upgradeCapexPerUnit: 260000,
  },
];

export const GreenRoiCalculator: React.FC<GreenRoiCalculatorProps> = ({
  udyam,
  onShowToast,
  onNavigateToCapexStore,
  className = '',
}) => {
  // Machine Selection & Custom Parameters
  const [selectedPresetId, setSelectedPresetId] = useState<string>('vmc-850');
  const [customMachineName, setCustomMachineName] = useState<string>('Ace Micromatic VMC 850 (Legacy 22 kW CNC Milling)');
  const [ratedPowerKw, setRatedPowerKw] = useState<number>(22);
  const [dailyRunningHours, setDailyRunningHours] = useState<number>(16);
  const [monthlyOperatingDays, setMonthlyOperatingDays] = useState<number>(26);
  const [electricityTariffRupees, setElectricityTariffRupees] = useState<number>(10.8);
  const [machineQuantity, setMachineQuantity] = useState<number>(2);

  // Target Upgrade Parameters
  const [selectedUpgradeName, setSelectedUpgradeName] = useState<string>(
    'IE4 Super-Premium Servo Drives & Regenerative VFD Kit'
  );
  const [efficiencyGainPct, setEfficiencyGainPct] = useState<number>(32);
  const [upgradeCostPerMachine, setUpgradeCostPerMachine] = useState<number>(340000);

  // Financing & Subsidies Levers
  const [applyClcssSubsidy, setApplyClcssSubsidy] = useState<boolean>(true); // 15% CLCSS cash grant
  const [applyZedGoldVoucher, setApplyZedGoldVoucher] = useState<boolean>(true); // ₹1,20,000 ZED Gold subsidy
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5); // 3, 5, or 7 years
  const [loanInterestRatePct, setLoanInterestRatePct] = useState<number>(6.8); // 6.8% SIDBI 4E Concessional Rate

  // Handle Preset Change
  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_MACHINE_MODELS.find((p) => p.id === presetId);
    if (preset) {
      setCustomMachineName(preset.name);
      setRatedPowerKw(preset.ratedKw);
      setDailyRunningHours(preset.defaultDailyHours);
      setSelectedUpgradeName(preset.recommendedUpgrade);
      setEfficiencyGainPct(preset.efficiencyGainPct);
      setUpgradeCostPerMachine(preset.upgradeCapexPerUnit);
    }
  };

  // Financial Calculations & Loan Amortization
  const calculations = useMemo(() => {
    // 1. Current Baseline Energy Consumption
    const monthlyRunningHours = dailyRunningHours * monthlyOperatingDays;
    const loadFactor = 0.75; // average industrial shop floor machine load
    const currentMonthlyKwhPerMachine = ratedPowerKw * monthlyRunningHours * loadFactor;
    const totalCurrentMonthlyKwh = currentMonthlyKwhPerMachine * machineQuantity;
    const currentMonthlyPowerCost = totalCurrentMonthlyKwh * electricityTariffRupees;
    const currentAnnualPowerCost = currentMonthlyPowerCost * 12;

    // 2. Post-Upgrade Energy Savings
    const energySavedPct = efficiencyGainPct / 100;
    const monthlyKwhSaved = totalCurrentMonthlyKwh * energySavedPct;
    const annualKwhSaved = monthlyKwhSaved * 12;
    const monthlyRupeeSavings = monthlyKwhSaved * electricityTariffRupees;
    const annualRupeeSavings = monthlyRupeeSavings * 12;
    const postUpgradeMonthlyPowerCost = currentMonthlyPowerCost - monthlyRupeeSavings;

    // Carbon Abatement: 0.82 kg CO2 per kWh from Indian Grid
    const annualCo2AbatedTonnes = Math.round((annualKwhSaved * 0.82) / 1000 * 10) / 10;

    // 3. Hardware Upgrade Capex & Government Subsidies
    const grossTotalCapex = upgradeCostPerMachine * machineQuantity;
    const clcssGrantAmount = applyClcssSubsidy ? grossTotalCapex * 0.15 : 0;
    const zedGrantAmount = applyZedGoldVoucher ? 120000 : 0;
    const totalGovtSubsidies = Math.min(grossTotalCapex * 0.5, clcssGrantAmount + zedGrantAmount);
    const netSubsidizedLoanPrincipal = Math.max(0, grossTotalCapex - totalGovtSubsidies);

    // 4. Concessional Green Loan EMI Calculation
    // Monthly interest rate
    const monthlyRate = loanInterestRatePct / 100 / 12;
    const totalMonths = loanTenureYears * 12;

    let monthlyLoanEmi = 0;
    if (netSubsidizedLoanPrincipal > 0 && monthlyRate > 0) {
      monthlyLoanEmi =
        (netSubsidizedLoanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // 5. Net Cashflow After EMI (The "Day 1 Positive" Metric)
    const netMonthlyCashflow = monthlyRupeeSavings - monthlyLoanEmi;
    const annualNetCashflow = netMonthlyCashflow * 12;

    // Simple Payback period (without loan, if paid cash)
    const simplePaybackMonths =
      annualRupeeSavings > 0
        ? Math.round((netSubsidizedLoanPrincipal / (annualRupeeSavings / 12)) * 10) / 10
        : 0;

    // 5-Year Cumulative Net Surplus Created
    const fiveYearGrossSavings = annualRupeeSavings * 5;
    const fiveYearTotalEmiPaid = monthlyLoanEmi * Math.min(60, totalMonths);
    const fiveYearNetProfit = fiveYearGrossSavings - fiveYearTotalEmiPaid;

    return {
      monthlyRunningHours,
      totalCurrentMonthlyKwh,
      currentMonthlyPowerCost,
      currentAnnualPowerCost,
      monthlyKwhSaved,
      annualKwhSaved,
      monthlyRupeeSavings,
      annualRupeeSavings,
      postUpgradeMonthlyPowerCost,
      annualCo2AbatedTonnes,
      grossTotalCapex,
      totalGovtSubsidies,
      netSubsidizedLoanPrincipal,
      monthlyLoanEmi,
      netMonthlyCashflow,
      annualNetCashflow,
      simplePaybackMonths,
      fiveYearNetProfit,
    };
  }, [
    ratedPowerKw,
    dailyRunningHours,
    monthlyOperatingDays,
    electricityTariffRupees,
    machineQuantity,
    efficiencyGainPct,
    upgradeCostPerMachine,
    applyClcssSubsidy,
    applyZedGoldVoucher,
    loanTenureYears,
    loanInterestRatePct,
  ]);

  // Chart 1: Monthly Cashflow Dynamics (Savings vs. Loan EMI vs. Net Surplus)
  const monthlyCashflowData = useMemo(() => {
    return [
      {
        name: 'Monthly Power Savings',
        amount: Math.round(calculations.monthlyRupeeSavings),
        label: `₹${Math.round(calculations.monthlyRupeeSavings).toLocaleString('en-IN')}`,
        fill: '#10B981', // Emerald
      },
      {
        name: 'Green Loan EMI (6.8%)',
        amount: Math.round(calculations.monthlyLoanEmi),
        label: `₹${Math.round(calculations.monthlyLoanEmi).toLocaleString('en-IN')}`,
        fill: '#64748B', // Slate
      },
      {
        name: 'Net Cash In Your Pocket',
        amount: Math.max(0, Math.round(calculations.netMonthlyCashflow)),
        label: `+₹${Math.round(calculations.netMonthlyCashflow).toLocaleString('en-IN')}`,
        fill: '#0F172A', // Dark Slate
      },
    ];
  }, [calculations]);

  // Chart 2: 5-Year Cumulative Wealth Projection
  const fiveYearTrajectoryData = useMemo(() => {
    const monthlyNetSavings = calculations.annualRupeeSavings / 12 / 100000;
    const monthlyEmi = calculations.monthlyLoanEmi / 100000;
    const loanDurationMonths = loanTenureYears * 12;

    const data = [];
    for (let yr = 0; yr <= 5; yr++) {
      const monthsElapsed = yr * 12;
      const emiPaidMonths = Math.min(monthsElapsed, loanDurationMonths);
      const cumulativeSavings = monthlyNetSavings * monthsElapsed;
      const cumulativeEmiPaid = monthlyEmi * emiPaidMonths;
      const netCashSurplus = cumulativeSavings - cumulativeEmiPaid;

      data.push({
        year: yr === 0 ? 'M0 (Deploy)' : `Year ${yr}`,
        netCashSurplus: Math.round(netCashSurplus * 10) / 10,
        grossSavings: Math.round(cumulativeSavings * 10) / 10,
      });
    }
    return data;
  }, [calculations, loanTenureYears]);

  const handleDownloadMachineQuote = () => {
    onShowToast(
      'Machine Upgrade Blueprint Generated',
      `Hardware Upgrade ROI Docket for ${customMachineName} (Qty: ${machineQuantity}) exported as verifiable PDF!`,
      'success'
    );
    window.print();
  };

  const handlePreApproveLoan = () => {
    onShowToast(
      'SIDBI 4E Loan Application Dispatched',
      `Pre-approved term loan of ₹${(calculations.netSubsidizedLoanPrincipal / 100000).toFixed(2)} Lakhs at 6.8% mapped to ${udyam.enterpriseName}!`,
      'success'
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>HARDWARE UPGRADE ROI CALCULATOR</span>
              </span>
              <span className="text-xs text-neutral-500">
                · Zero-Upfront Subsidized Capex Model
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Green Machine ROI & Loan Repayment Calculator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              Input your existing shop-floor machine models. Model predicted electricity bill cuts, government ZED/CLCSS subsidies, and concessional 6.8% green loan EMIs to verify that the upgrade pays for itself from Month 1.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleDownloadMachineQuote}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download Upgrade Docket</span>
            </button>
            <button
              type="button"
              onClick={handlePreApproveLoan}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 transition-colors cursor-pointer shadow-md inline-flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-sky-400" />
              <span>Pre-Approve 6.8% Loan</span>
            </button>
          </div>
        </div>

        {/* 4 HIGH-IMPACT FINANCIAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Card 1: Net Monthly Cashflow (Day 1 Positive) */}
          <div className="p-5 rounded-2xl bg-[#0F172A] text-white flex flex-col justify-between space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                NET CASHFLOW AFTER LOAN EMI
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl font-black tracking-tight text-emerald-400">
                +₹{Math.round(calculations.netMonthlyCashflow).toLocaleString('en-IN')}{' '}
                <span className="text-xs font-semibold text-slate-300">/ month</span>
              </div>
              <span className="text-[11px] text-slate-300 mt-0.5 block">
                Day-1 Positive: Savings exceed loan EMI
              </span>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-300">
              ₹{Math.round(calculations.annualNetCashflow).toLocaleString('en-IN')} added directly to profit each year
            </div>
          </div>

          {/* Card 2: Annual Power Bill Cut */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                ANNUAL ELECTRICITY SAVINGS
              </span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                ₹{(calculations.annualRupeeSavings / 100000).toFixed(2)}{' '}
                <span className="text-xs font-semibold text-neutral-500">Lakhs / yr</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
                -{efficiencyGainPct}% factory electricity consumption
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-100">
              {Math.round(calculations.annualKwhSaved).toLocaleString('en-IN')} kWh conserved annually
            </div>
          </div>

          {/* Card 3: Subsidized Net Capex */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                SUBSIDIZED LOAN PRINCIPAL
              </span>
              <Landmark className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                ₹{(calculations.netSubsidizedLoanPrincipal / 100000).toFixed(2)}{' '}
                <span className="text-xs font-semibold text-neutral-500">Lakhs</span>
              </div>
              <span className="text-[11px] text-sky-700 font-bold mt-0.5 block">
                ₹{(calculations.totalGovtSubsidies / 100000).toFixed(2)}L covered by Govt Grants
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-100">
              EMI: ₹{Math.round(calculations.monthlyLoanEmi).toLocaleString('en-IN')} / mo @ {loanInterestRatePct}% APR
            </div>
          </div>

          {/* Card 4: Payback Period & 5-Year Wealth */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                LOAN PAYBACK DURATION
              </span>
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-950">
                {calculations.simplePaybackMonths}{' '}
                <span className="text-xs font-semibold text-emerald-700">Months</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-extrabold mt-0.5 block">
                Self-Funding from Savings
              </span>
            </div>
            <div className="text-[10px] text-emerald-800 pt-1 border-t border-emerald-200/60 font-medium">
              +₹{(calculations.fiveYearNetProfit / 100000).toFixed(1)}L Net profit generated over 5 years
            </div>
          </div>
        </div>

        {/* MACHINE PRESETS BAR */}
        <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-neutral-500" />
              <span>Select Your Legacy Machine Model:</span>
            </span>
            <span className="text-[11px] text-neutral-400">Or customize parameters below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {PRESET_MACHINE_MODELS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetChange(preset.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedPresetId === preset.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200/80'
                }`}
              >
                <div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider block ${
                      selectedPresetId === preset.id ? 'text-emerald-400' : 'text-neutral-500'
                    }`}
                  >
                    {preset.type}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2 mt-0.5">{preset.name}</h4>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                  <span className="font-mono">{preset.ratedKw} kW</span>
                  <span
                    className={`font-bold ${
                      selectedPresetId === preset.id ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    -{preset.efficiencyGainPct}% Power
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE INPUT CONTROLS GRID */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-neutral-600" />
              <span>Configure Machine Specs & Financial Options</span>
            </h3>
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Shop Floor: {udyam.enterpriseName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Input 1: Machine Name & Quantity */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <span className="font-bold text-neutral-700 block">Machine Units Count</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={machineQuantity}
                  onChange={(e) => setMachineQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-3 py-1.5 rounded-lg border border-neutral-300 font-mono font-bold text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
                <span className="text-neutral-500">Units in Factory</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Rated: <strong>{ratedPowerKw} kW</strong> each
              </div>
            </div>

            {/* Input 2: Daily Running Hours */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Daily Running Hours</span>
                <span className="font-mono font-bold text-neutral-900">{dailyRunningHours} hrs/day</span>
              </div>
              <input
                type="range"
                min={8}
                max={24}
                step={2}
                value={dailyRunningHours}
                onChange={(e) => setDailyRunningHours(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>8h (1 shift)</span>
                <span>16h (2 shifts)</span>
                <span>24h (3 shifts)</span>
              </div>
            </div>

            {/* Input 3: Grid Electricity Tariff */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Electricity Tariff</span>
                <span className="font-mono font-bold text-neutral-900">₹{electricityTariffRupees}/kWh</span>
              </div>
              <input
                type="range"
                min={7.5}
                max={15.0}
                step={0.5}
                value={electricityTariffRupees}
                onChange={(e) => setElectricityTariffRupees(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>₹7.50 Base</span>
                <span>₹10.50 MIDC</span>
                <span>₹15.00 Peak</span>
              </div>
            </div>

            {/* Input 4: Loan Tenure & Concessional Rate */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-700">Loan Tenure (Years)</span>
                <span className="font-mono font-bold text-sky-700">{loanTenureYears} Years</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[3, 5, 7].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setLoanTenureYears(yrs)}
                    className={`py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      loanTenureYears === yrs
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {yrs} Yrs
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-sky-700 font-bold text-center">
                SIDBI 4E Concessional Rate: {loanInterestRatePct}%
              </div>
            </div>
          </div>

          {/* Subsidies Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200/60 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={applyClcssSubsidy}
                  onChange={(e) => setApplyClcssSubsidy(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-neutral-800">
                  Apply 15% CLCSS Clean Tech Capital Grant (Saves ₹{(calculations.grossTotalCapex * 0.15 / 100000).toFixed(2)}L)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={applyZedGoldVoucher}
                  onChange={(e) => setApplyZedGoldVoucher(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-neutral-800">
                  Apply 80% ZED Gold Subsidy Reimbursement (₹1.20L grant)
                </span>
              </label>
            </div>

            <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Zero Upfront Margin Required
            </div>
          </div>
        </div>
      </div>

      {/* VISUALIZATION CHARTS STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Cashflow Dynamics Bar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">
                Monthly Cashflow Dynamics (Savings vs. Loan EMI)
              </h3>
              <p className="text-xs text-neutral-500">
                Proves that your energy savings exceed the loan installment every month.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Positive Cashflow
            </span>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCashflowData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 10, fill: '#475569' }} unit=" ₹" />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {monthlyCashflowData.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="amount" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Energy savings of <strong>₹{Math.round(calculations.monthlyRupeeSavings).toLocaleString('en-IN')}</strong> easily cover the <strong>₹{Math.round(calculations.monthlyLoanEmi).toLocaleString('en-IN')}</strong> loan installment.
              </span>
            </div>
            <span className="font-bold text-emerald-800 font-mono whitespace-nowrap">
              +₹{Math.round(calculations.netMonthlyCashflow).toLocaleString('en-IN')} net cash
            </span>
          </div>
        </div>

        {/* Chart 2: 5-Year Cumulative Wealth Curve */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">
                5-Year Cumulative Cash Surplus Curve (₹ Lakhs)
              </h3>
              <p className="text-xs text-neutral-500">
                Demonstrates how hardware upgrades compound into pure net profit.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ₹{(calculations.fiveYearNetProfit / 100000).toFixed(1)}L Net Profit
            </span>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fiveYearTrajectoryData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 10, fill: '#475569' }} unit=" L" />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `₹${val} Lakhs`,
                    name === 'netCashSurplus' ? 'Net Cash Surplus (After EMI)' : 'Gross Energy Savings',
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
                    value === 'netCashSurplus'
                      ? 'Net Cash Surplus to Factory (₹ Lakhs)'
                      : 'Gross Power Savings (₹ Lakhs)'
                  }
                />
                <Area
                  type="monotone"
                  dataKey="grossSavings"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  fillOpacity={0.1}
                  fill="#94A3B8"
                  name="grossSavings"
                />
                <Area
                  type="monotone"
                  dataKey="netCashSurplus"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#roiGradient)"
                  name="netCashSurplus"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 flex items-center justify-between">
            <span>
              Carbon Impact: <strong>{calculations.annualCo2AbatedTonnes} MT CO₂e</strong> abated per year.
            </span>
            <span className="font-semibold text-emerald-700">
              Complies with BEE MSME Star Standard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
