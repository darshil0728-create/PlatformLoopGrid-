import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Info,
  Check,
  Building2,
  Factory,
  Layers,
  Leaf,
  Scale,
  Zap,
  HelpCircle,
  Download,
  Share2,
  Clock,
  Flame,
  Award,
  Sun,
  Calculator,
  Users,
  Landmark,
  BadgePercent,
  X,
  Sliders,
  CheckCircle,
  FileCheck2,
  AlertCircle,
  ShieldAlert,
  Percent,
  Printer,
  QrCode,
  ArrowRight,
  Filter,
  Plus,
  Link2,
  UserPlus,
  Fingerprint,
  FileCheck,
  RefreshCw,
  Search,
  Lock,
  Edit3,
  ShoppingCart,
  Network,
  Wallet,
  Menu,
  Activity,
  CreditCard,
} from 'lucide-react';
import { EnterpriseProfile } from '../ProfilePage';
import { useLanguage } from '../../context/LanguageContext';
import { SimplifiedUdyamVerifier } from './SimplifiedUdyamVerifier';
import { GreenCostSavingsDashboard } from './GreenCostSavingsDashboard';
import { GrowthOptimizationDashboard } from './GrowthOptimizationDashboard';
import { FinancialUnlockPanel } from './FinancialUnlockPanel';
import { RegulatoryRoadmap } from './RegulatoryRoadmap';
import { GreenRoiCalculator } from './GreenRoiCalculator';

export type GrowthEcosystemTab =
  | 'dashboard'
  | 'green_roi_calculator'
  | 'growth_optimization'
  | 'financial_unlock'
  | 'regulatory_roadmap'
  | 'udyam'
  | 'savings_roi'
  | 'pnl_engine'
  | 'capital_credit'
  | 'green_capex'
  | 'cluster_pool'
  | 'regulatory_shield'
  | 'dossier';

interface ComplianceScorePageProps {
  profile: EnterpriseProfile;
  onReturnToDashboard: () => void;
  initialTab?: GrowthEcosystemTab;
}

export interface UdyamAccountDetails {
  isConnected: boolean;
  udyamNumber: string;
  enterpriseName: string;
  enterpriseType: 'Micro' | 'Small' | 'Medium';
  majorActivity: 'Manufacturing' | 'Services';
  nicCode: string;
  nicDescription: string;
  pan: string;
  gstin: string;
  plantAddress: string;
  stateDistrict: string;
  pinCode: string;
  authorizedPerson: string;
  mobile: string;
  email: string;
  dateOfCommencement: string;
  bankAccount: string;
  ifscCode: string;
  cpcbCategory: 'Orange' | 'Green' | 'Red' | 'White';
  investmentPlantMachinery: string;
  annualTurnover: string;
  electricityConsumerNo: string;
  socialCategory: 'General' | 'OBC' | 'SC' | 'ST';
  gender: 'Male' | 'Female' | 'Other';
  lastSyncedAt: string;
}

export interface EnterpriseVendorTender {
  id: string;
  enterpriseGroup: string;
  sector: string;
  initials: string;
  rfpTitle: string;
  annualContractValue: string;
  mandatedRequirement: string;
  status: 'Approved to Bid' | 'Contract Awarded' | 'Under Audit Review';
  scope3SavingsTarget: string;
  biddingDeadline: string;
}

export interface GreenCapexItem {
  id: string;
  title: string;
  category: 'Solar' | 'ETP / Water' | 'Motors & Drives' | 'Swarf Centrifuges';
  capexValue: string;
  subsidizedUpfrontCost: string;
  monthlyPnlSavings: string;
  govtSubsidyCover: string;
  paybackPeriod: string;
  efficiencyGain: string;
  partnerVendor: string;
}

export interface ClusterResourceListing {
  id: string;
  material: string;
  tonnageMonthly: string;
  offeringEnterprise: string;
  receivingEnterprise: string;
  proximityDistance: string;
  landfillCostSaved: string;
  secondaryRevenueGenerated: string;
  carbonAbatement: string;
  status: 'Active Route' | 'Pending Dispatch' | 'Route Optimized';
}

export const ComplianceScorePage: React.FC<ComplianceScorePageProps> = ({
  profile,
  onReturnToDashboard,
  initialTab = 'dashboard',
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<GrowthEcosystemTab>(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // In-app feedback toast notification
  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // ========================================================
  // 1. UDYAM MASTER RECORD (Sovereign Data Anchor)
  // ========================================================
  const [udyam, setUdyam] = useState<UdyamAccountDetails>({
    isConnected: true,
    udyamNumber: 'MH-00-1234567',
    enterpriseName: profile.name || 'Apex Precision Engineering & Circular Foundry Pvt Ltd',
    enterpriseType: 'Small',
    majorActivity: 'Manufacturing',
    nicCode: '24202',
    nicDescription: 'Manufacture of basic precious and non-ferrous metals, automotive castings & alloys',
    pan: 'AABCU9821K',
    gstin: '27AABCU9821K1ZM',
    plantAddress: profile.address || 'Plot No. 44, Sector 7, MIDC Industrial Area, Chakan, Pune, Maharashtra',
    stateDistrict: 'Maharashtra / Pune',
    pinCode: '410501',
    authorizedPerson: 'Rajesh V. Patel (Managing Director)',
    mobile: profile.phone || '+91 98201 44820',
    email: profile.email || 'compliance@apexprecision.in',
    dateOfCommencement: '14-Aug-2021',
    bankAccount: 'HDFC Bank - Current A/C 50200049821034',
    ifscCode: 'HDFC0001824',
    cpcbCategory: 'Orange',
    investmentPlantMachinery: '₹4.85 Crores',
    annualTurnover: '₹18.40 Crores',
    electricityConsumerNo: 'MSEDCL-HT-049821',
    socialCategory: 'General',
    gender: 'Male',
    lastSyncedAt: 'Real-time Synced',
  });

  // ========================================================
  // 2. NATIONAL ESG TRUST SCORE & CREDIT ENGINE
  // "Data as a Currency - Translate compliance into 1.5% interest reduction"
  // ========================================================
  const [nationalEsgScore, setNationalEsgScore] = useState<number>(84);
  const esgPercentile = 'TOP 10%';
  const interestDiscountRate = '1.5% Interest Discount';
  const approvedWorkingCapital = '₹1,25,00,000'; // ₹1.25 Crore

  // ========================================================
  // 3. ENTERPRISE VENDOR STATUS (Scope 3 Gateway)
  // "The Enterprise Squeeze - Tier-1 Conglomerates mandate LoopGrid"
  // ========================================================
  const [enterpriseTenders, setEnterpriseTenders] = useState<EnterpriseVendorTender[]>([
    {
      id: 'tender-01',
      enterpriseGroup: 'National Energy & Retail Conglomerate',
      sector: 'Energy & Advanced Materials',
      initials: 'ERC',
      rfpTitle: 'Annual Secondary Aluminum Ingot Supply (1,200 MT)',
      annualContractValue: '₹3.40 Crores',
      mandatedRequirement: 'LoopGrid DRP Verified Recycled Feedstock > 25%',
      status: 'Approved to Bid',
      scope3SavingsTarget: '480 MT CO2e Abated',
      biddingDeadline: 'Nov 12, 2026',
    },
    {
      id: 'tender-02',
      enterpriseGroup: 'Major Automotive Group (OEM Ancillary)',
      sector: 'Commercial Vehicles & EV Drive Systems',
      initials: 'AUTO',
      rfpTitle: 'Precision Cast Brackets & Machined Hubs Supply',
      annualContractValue: '₹2.85 Crores',
      mandatedRequirement: 'ZED Silver/Gold Tier + 100% Zero-Landfill Audit',
      status: 'Approved to Bid',
      scope3SavingsTarget: '320 MT CO2e Abated',
      biddingDeadline: 'Nov 20, 2026',
    },
    {
      id: 'tender-03',
      enterpriseGroup: 'Leading FMCG Packaging Consortium',
      sector: 'Industrial Corrugated & Metal Closures',
      initials: 'FMCG',
      rfpTitle: 'Recycled Polymer & Metal Swarf Circular Ingestion',
      annualContractValue: '₹1.90 Crores',
      mandatedRequirement: 'CPCB EPR Centralized Portal Certificate',
      status: 'Approved to Bid',
      scope3SavingsTarget: '210 MT CO2e Abated',
      biddingDeadline: 'Dec 05, 2026',
    },
  ]);

  // ========================================================
  // 4. GOVT. SUBSIDIES MINED (Direct Cash Pipeline)
  // Matches exact Screenshot 2 & 3: ₹12.5L Available
  // ========================================================
  const [subsidiesMinedAmount, setSubsidiesMinedAmount] = useState<string>('₹12.5L');
  const [preApprovedSubsidies, setPreApprovedSubsidies] = useState([
    {
      id: 'sub-zed',
      name: 'ZED Gold Certification',
      coverage: '80% cost coverage pre-approved.',
      amount: '₹5,00,000',
      status: 'Ready for 1-Click Claim',
      agency: 'Quality Council of India',
    },
    {
      id: 'sub-pmegp',
      name: 'PMEGP Tech Upgradation',
      coverage: 'Margin money subsidy ready.',
      amount: '₹7,50,000',
      status: 'Ready for 1-Click Claim',
      agency: 'Ministry of MSME',
    },
  ]);

  // ========================================================
  // 5. REGULATORY SHIELD ACTIVE (Auto-Filing Timeline)
  // Matches exact Screenshot 2 & 3
  // ========================================================
  const [regulatoryShieldEvents, setRegulatoryShieldEvents] = useState([
    {
      id: 'shield-1',
      title: 'EPR Quarterly Return (Plastic)',
      description: 'Data compiled from GST invoices and auto-submitted.',
      tagDate: 'Filed Today',
      badgeType: 'auto_filed',
      badgeLabel: 'Auto-Filed',
      status: 'completed',
    },
    {
      id: 'shield-2',
      title: 'State Pollution Board (CTO Renewal)',
      description: 'Drafting water/air consent forms using master profile.',
      tagDate: 'Due in 14 Days',
      badgeType: 'queued',
      badgeLabel: 'Auto-Filer Queued',
      status: 'pending',
    },
    {
      id: 'shield-3',
      title: 'Annual Energy Audit',
      description: 'Awaiting operational data for next fiscal cycle.',
      tagDate: 'Due in 6 Months',
      badgeType: 'scheduled',
      badgeLabel: 'Scheduled',
      status: 'scheduled',
    },
  ]);

  // ========================================================
  // 6. P&L IMPACT ENGINE (The Operational Alpha)
  // "Translates every compliance gap into lost rupees"
  // ========================================================
  const [monthlyBleedRupees, setMonthlyBleedRupees] = useState<number>(118900); // ₹1,18,900 / mo bled
  const [annualPotentialEbitdaLift, setAnnualPotentialEbitdaLift] = useState<number>(1426800); // ₹14.26 Lakhs
  const [pnlItems, setPnlItems] = useState([
    {
      id: 'pnl-1',
      leakSource: 'Continuous Idling on 45kW Compressor',
      complianceLink: 'BEE MSME Energy Mandate (Code 12)',
      monthlyLoss: '₹28,400 / mo',
      operationalFix: 'Install VFD frequency drive speed modulation matching tool demand',
      savingsEbitdaImpact: '+₹3,40,800 / year',
      status: 'Actionable',
    },
    {
      id: 'pnl-2',
      leakSource: 'Disposing Wet Oily Swarf as Mixed Low-Grade Scrap',
      complianceLink: 'CPCB Rule 20 & Solid Waste Sch II',
      monthlyLoss: '₹42,000 / mo',
      operationalFix: 'Centrifugal spin-dryer extracts 160L neat oil/mo + doubles dry chip value',
      savingsEbitdaImpact: '+₹5,04,000 / year',
      status: 'Actionable',
    },
    {
      id: 'pnl-3',
      leakSource: 'Power Factor 0.89 (DISCOM Surcharge Penalty)',
      complianceLink: 'Electricity Act 2003 / DISCOM Tariff',
      monthlyLoss: '₹14,500 / mo',
      operationalFix: 'Automate APFC capacitor bank to maintain 0.99 PF (Earns 2.0% rebate)',
      savingsEbitdaImpact: '+₹1,74,000 / year',
      status: 'Actionable',
    },
    {
      id: 'pnl-4',
      leakSource: 'Direct Water Discharge without Gravity Oil Trap',
      complianceLink: 'Water Act 1974 & CPCB CTO Norms',
      monthlyLoss: '₹34,000 / mo',
      operationalFix: 'Modular 3-chamber baffle drum skims tramp oil for secondary boiler fuel',
      savingsEbitdaImpact: '+₹4,08,000 / year',
      status: 'Actionable',
    },
  ]);

  // ========================================================
  // 7. GREEN CAPEX STORE (0-Upfront Hardware Subsidy)
  // ========================================================
  const [greenCapexCatalog, setGreenCapexCatalog] = useState<GreenCapexItem[]>([
    {
      id: 'capex-solar',
      title: '50 kW Industrial Captive Rooftop Solar PV Plant',
      category: 'Solar',
      capexValue: '₹22,50,000',
      subsidizedUpfrontCost: '₹0 Upfront',
      monthlyPnlSavings: '₹38,500 / mo on DISCOM Bill',
      govtSubsidyCover: '100% Debt via SIDBI SPEED + MNRE offset',
      paybackPeriod: 'Funded from energy savings',
      efficiencyGain: 'Cuts factory electricity bill by 62%',
      partnerVendor: 'Tier-1 National EPC Consortium',
    },
    {
      id: 'capex-swarf',
      title: 'Automated Continuous Swarf Centrifuge & Chip Crusher',
      category: 'Swarf Centrifuges',
      capexValue: '₹6,80,000',
      subsidizedUpfrontCost: '₹0 Upfront',
      monthlyPnlSavings: '₹36,000 / mo cutting oil recovered',
      govtSubsidyCover: '80% ZED Gold Subsidy + SIDBI 4E Loan',
      paybackPeriod: 'Funded in 4.5 months',
      efficiencyGain: 'Reclaims 98% cutting oil, doubles scrap sale rate',
      partnerVendor: 'Apex Machining Technologies',
    },
    {
      id: 'capex-etp',
      title: 'Compact 5 KLD Baffle Zero Liquid Discharge (ZLD) Trap',
      category: 'ETP / Water',
      capexValue: '₹4,50,000',
      subsidizedUpfrontCost: '₹0 Upfront',
      monthlyPnlSavings: '₹18,000 / mo fresh water haulage',
      govtSubsidyCover: '15% CLCSS Cash Grant + CGTMSE',
      paybackPeriod: 'Immediate SPCB CTO Green Channel',
      efficiencyGain: 'Zero industrial effluent discharge penalty',
      partnerVendor: 'EcoClean Industrial Engineering',
    },
    {
      id: 'capex-vfd',
      title: 'BEE 5-Star IE4 Variable Frequency Drive Retrofit Kit',
      category: 'Motors & Drives',
      capexValue: '₹3,20,000',
      subsidizedUpfrontCost: '₹0 Upfront',
      monthlyPnlSavings: '₹14,000 / mo power draw reduction',
      govtSubsidyCover: '90% SIDBI STAR Concessional Credit',
      paybackPeriod: 'Funded in 6 months',
      efficiencyGain: 'Cuts motor kWh consumption by 28%',
      partnerVendor: 'National Drive Systems Ltd',
    },
  ]);

  // ========================================================
  // 8. CLUSTER RESOURCE POOL (MIDC / Industrial Hub Waste-to-Wealth)
  // ========================================================
  const [clusterLocation, setClusterLocation] = useState('Chakan MIDC Industrial Area, Pune (Cluster Hub #4)');
  const [clusterListings, setClusterListings] = useState<ClusterResourceListing[]>([
    {
      id: 'cls-1',
      material: 'Aluminum 6061 CNC Lathe Turnings (Cleaned & Crushed)',
      tonnageMonthly: '4.8 Tons / Month',
      offeringEnterprise: 'Apex Precision Engineering (You)',
      receivingEnterprise: 'Western Alloy Foundries Ltd (Plot 18B)',
      proximityDistance: '3.4 km',
      landfillCostSaved: '₹24,000 / mo',
      secondaryRevenueGenerated: '₹9,84,000 / mo (@ ₹205/kg)',
      carbonAbatement: '38.4 MT CO2e abated',
      status: 'Active Route',
    },
    {
      id: 'cls-2',
      material: 'Reclaimed Neat Cutting Fluid (Sediment Filtered)',
      tonnageMonthly: '450 Liters / Month',
      offeringEnterprise: 'Apex Precision Engineering (You)',
      receivingEnterprise: 'Shree Balaji Heavy Forgings (Sector 3)',
      proximityDistance: '5.1 km',
      landfillCostSaved: '₹18,500 / mo',
      secondaryRevenueGenerated: '₹54,000 / mo',
      carbonAbatement: '4.2 MT CO2e abated',
      status: 'Active Route',
    },
    {
      id: 'cls-3',
      material: 'Secondary Brass Dross & Swarf Slag',
      tonnageMonthly: '1.2 Tons / Month',
      offeringEnterprise: 'Apex Precision Engineering (You)',
      receivingEnterprise: 'Omkar Metallurgy Works (Gala 9)',
      proximityDistance: '2.1 km',
      landfillCostSaved: '₹9,200 / mo',
      secondaryRevenueGenerated: '₹3,48,000 / mo (@ ₹290/kg)',
      carbonAbatement: '11.8 MT CO2e abated',
      status: 'Route Optimized',
    },
  ]);

  // Modals
  const [claimCreditModalOpen, setClaimCreditModalOpen] = useState(false);
  const [disbursementModalOpen, setDisbursementModalOpen] = useState(false);
  const [bidTenderModal, setBidTenderModal] = useState<EnterpriseVendorTender | null>(null);
  const [orderCapexModal, setOrderCapexModal] = useState<GreenCapexItem | null>(null);
  const [clusterMatchingModalOpen, setClusterMatchingModalOpen] = useState(false);
  const [connectUdyamModalOpen, setConnectUdyamModalOpen] = useState(false);
  const [createUdyamModalOpen, setCreateUdyamModalOpen] = useState(false);
  const [editMasterProfileOpen, setEditMasterProfileOpen] = useState(false);

  // Udyam Form State
  const [udyamInputNumber, setUdyamInputNumber] = useState('MH-00-1234567');
  const [isVerifyingUdyam, setIsVerifyingUdyam] = useState(false);

  // Handlers
  const handleClaimWorkingCapital = () => {
    showToast(
      'Capital Sanction Initiated',
      `Disbursement of ${approvedWorkingCapital} at 9.25% (1.50% ESG Discount applied) initiated to ${udyam.bankAccount}!`,
      'success'
    );
    setClaimCreditModalOpen(false);
  };

  const handle1ClickDisbursement = () => {
    showToast(
      'Subsidies Disbursed in 1 Click',
      `₹12,50,000 from ZED Gold & PMEGP credited directly to ${udyam.bankAccount}. Acknowledgement generated!`,
      'success'
    );
    setDisbursementModalOpen(false);
  };

  const handleSubmitVendorBid = (tender: EnterpriseVendorTender) => {
    showToast(
      'Vendor Packet Dispatched',
      `Scope 3 Compliance Dossier & Price Quote submitted to ${tender.enterpriseGroup} Procurement Desk!`,
      'success'
    );
    setBidTenderModal(null);
  };

  const handleOrderGreenCapex = (item: GreenCapexItem) => {
    showToast(
      'Zero-Upfront Capex Dispatched',
      `${item.title} ordered. Subsidies applied; installation scheduled with ${item.partnerVendor}!`,
      'success'
    );
    setOrderCapexModal(null);
  };

  const handleSyncUdyam = () => {
    setIsVerifyingUdyam(true);
    setTimeout(() => {
      setIsVerifyingUdyam(false);
      setUdyam((prev) => ({
        ...prev,
        isConnected: true,
        lastSyncedAt: 'Real-time Synced',
      }));
      setConnectUdyamModalOpen(false);
      showToast('Udyam Synchronized', 'Master profile synchronized with MSME National Portal & GSTN servers.');
    }, 1500);
  };

  const handleUpdateUdyamPartial = (updated: Partial<UdyamAccountDetails>) => {
    setUdyam((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#DCFCE7] selection:text-[#166534]">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-neutral-200/90 p-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                toast.type === 'success' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-sky-50 text-sky-700'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-neutral-900">{toast.title}</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TOP HEADER: Clean institutional fintech bar with single unified profile return */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Single Unified Profile Box / Return Button */}
            <button
              type="button"
              onClick={onReturnToDashboard}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer shadow-2xs"
              title="Return to Profile Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-600" />
              <span>Back to Profile</span>
            </button>

            <div className="h-4 w-px bg-neutral-200" />

            {/* Brand Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-bold text-xs">
                LG
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#0F172A]">
                LoopGrid
              </span>
              <span className="text-neutral-300 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 hidden md:inline">
                Growth Ecosystem
              </span>
            </div>
          </div>

          {/* Right: Notification Alerts */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('regulatory_shield')}
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 relative transition-colors cursor-pointer"
              title="Regulatory Shield Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
            </button>
          </div>
        </div>
      </header>

      {/* WORKSPACE LAYOUT: Sidebar (Growth Ecosystem) + Main Dynamic Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-grow flex gap-6">
        {/* ======================================================== */}
        {/* SIDEBAR: "GROWTH ECOSYSTEM" (Exact match to Screenshot 4)*/}
        {/* ======================================================== */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] text-white p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:rounded-3xl md:z-auto shadow-xl md:shadow-sm ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* Top Brand & Close on mobile */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-[#0F172A]">
                  <Leaf className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">LoopGrid</span>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3 mb-2">
                GROWTH ECOSYSTEM
              </span>

              <nav className="space-y-1.5 text-xs font-semibold">
                {/* 1. Ecosystem Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Ecosystem Dashboard</span>
                </button>

                {/* 1A. Green Machine ROI Calculator */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('green_roi_calculator');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'green_roi_calculator'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Green ROI Calculator</span>
                </button>

                {/* 1B. Growth & Optimization Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('growth_optimization');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'growth_optimization'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Growth & Optimization</span>
                </button>

                {/* 1C. Financial Unlock Panel */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('financial_unlock');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'financial_unlock'
                      ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Financial Unlock Hub</span>
                </button>

                {/* 1D. Regulatory Roadmap (AI) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('regulatory_roadmap');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'regulatory_roadmap'
                      ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Scale className="w-4 h-4 text-sky-400" />
                  <span>AI Regulatory Roadmap</span>
                </button>

                {/* 2. Udyam Sync Status */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('udyam');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'udyam'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Udyam Verification & Schemes</span>
                </button>

                {/* 2B. Green Cost Savings & ROI Dashboard (Recharts) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('savings_roi');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'savings_roi'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Cost Savings & ROI (Recharts)</span>
                </button>

                {/* 3. P&L Impact Engine (Operational Alpha) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('pnl_engine');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'pnl_engine'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  <span>P&L Impact Engine</span>
                </button>

                {/* 4. Capital & Credit (Data as Currency) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('capital_credit');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'capital_credit'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-sky-400" />
                  <span>Capital & Credit</span>
                </button>

                {/* 5. Green Capex Store (Hardware Subsidy) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('green_capex');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'green_capex'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <span>Green Capex Store</span>
                </button>

                {/* 6. Cluster Resource Pool (Waste to Wealth) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('cluster_pool');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'cluster_pool'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4 text-teal-400" />
                  <span>Cluster Resource Pool</span>
                </button>

                {/* 7. Regulatory Shield */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('regulatory_shield');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'regulatory_shield'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Regulatory Shield</span>
                </button>

                {/* 8. Digital Stamped Dossier */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('dossier');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'dossier'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-neutral-300" />
                  <span>Audit Dossier</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Floating Sparkle Button (matches Screenshot 4) */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              <span className="block font-bold text-white">Ecosystem v4.2</span>
              <span>Cluster: Pune MIDC</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white text-[#0F172A] flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MAIN STAGE: DYNAMIC CONTENT PER TAB                      */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* IN-PAGE CONTROL & STATUS BAR (Relocated from Top Header) */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Left: Ecosystem Navigation Menu Button + Search Control */}
            <div className="flex items-center gap-2.5 flex-1 min-w-[260px]">
              {/* 1. Three-Lines Navigation Button */}
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors cursor-pointer"
                title="Toggle Growth Ecosystem Menu"
              >
                <Menu className="w-4 h-4 text-neutral-700" />
                <span>Ecosystem Menu</span>
              </button>

              {/* 2. Search Button & Input */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Search regulations, schemes, P&L leaks, capex..."
                  onClick={() => {
                    if (activeTab !== 'pnl_engine' && activeTab !== 'regulatory_shield') {
                      setActiveTab('pnl_engine');
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Right: 3. Udyam Synced Status Box */}
            <div
              onClick={() => setActiveTab('udyam')}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-50/90 hover:bg-emerald-100/80 border border-emerald-200 text-xs transition-colors cursor-pointer shadow-2xs"
              title="Click to view & manage Udyam Master Record"
            >
              <div className="flex items-center gap-1.5 text-neutral-800">
                <Factory className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 hidden sm:inline">
                  UDYAM ID
                </span>
                <span className="font-mono font-bold text-neutral-900">{udyam.udyamNumber}</span>
              </div>
              <div className="h-3.5 w-px bg-emerald-300" />
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{udyam.lastSyncedAt}</span>
              </div>
            </div>
          </div>
          {/* ======================================================== */}
          {/* VIEW 1: ECOSYSTEM DASHBOARD (Screenshots 1, 2, 3)         */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Hero Banner: "Sustainability is your new Profit Center" */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs relative overflow-hidden">
                <div className="max-w-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                    <span>OPERATIONAL ALPHA & SCALE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                    Sustainability is your new{' '}
                    <span className="text-emerald-700 relative">Profit Center.</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                    Stop viewing ESG as a compliance cost. Connect your sovereign Udyam profile to collapse your borrowing
                    rates by 1.5%, win tier-1 enterprise procurement contracts, and eliminate physical factory resource waste.
                  </p>
                </div>
              </div>

              {/* SIMPLIFIED UDYAM ID VERIFICATION & AUTO-SCHEMES REGISTRATION */}
              <SimplifiedUdyamVerifier
                udyam={udyam}
                onUpdateUdyam={handleUpdateUdyamPartial}
                onShowToast={showToast}
                onCreateUdyamClick={() => setCreateUdyamModalOpen(true)}
              />

              {/* GREEN ROI CALCULATOR (Machine Model Energy Savings & Loan Payback) */}
              <GreenRoiCalculator
                udyam={udyam}
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />

              {/* GROWTH & OPTIMIZATION DASHBOARD (EBITDA, Energy, Logistics) */}
              <GrowthOptimizationDashboard
                udyam={udyam}
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />

              {/* FINANCIAL UNLOCK PANEL (Modern Fintech Cards for Credit & Subsidies) */}
              <FinancialUnlockPanel
                udyam={udyam}
                onShowToast={showToast}
              />

              {/* AI REGULATORY ROADMAP (State-Level Gazette Mapping & 1-Click Filing) */}
              <RegulatoryRoadmap
                udyam={udyam}
                onShowToast={showToast}
              />

              {/* GREEN COST SAVINGS & ROI DASHBOARD (RECHARTS VISUALIZATION) */}
              <GreenCostSavingsDashboard
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />

              {/* STACK OF EXACT CARDS FROM SCREENSHOTS 1, 2, 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ---------------------------------------------------- */}
                {/* CARD 1: NATIONAL ESG TRUST SCORE (From Screenshot 1) */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-neutral-500">
                      NATIONAL ESG TRUST SCORE
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div className="flex items-center gap-5">
                    {/* Circular Score Indicator */}
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50 border-4 border-emerald-500 shadow-inner">
                      <div className="text-center">
                        <div className="text-3xl font-black text-neutral-900 tracking-tight leading-none">
                          {nationalEsgScore}
                        </div>
                        <span className="text-[9px] font-black uppercase text-emerald-700 tracking-wider block mt-0.5">
                          {esgPercentile}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-neutral-700 leading-snug">
                        Your score automatically unlocks cheaper capital.
                      </p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold border border-[#A7F3D0]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{interestDiscountRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setClaimCreditModalOpen(true)}
                      className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-[#0F172A] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>Claim Green Working Capital</span>
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CARD 2: ENTERPRISE VENDOR STATUS (From Screenshot 1) */}
                {/* Dark slate theme #0F172A                             */}
                {/* ---------------------------------------------------- */}
                <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                        ENTERPRISE VENDOR STATUS
                      </span>
                      <h3 className="text-2xl font-black text-white tracking-tight">Scope 3 Eligible</h3>
                    </div>
                    <Network className="w-5 h-5 text-emerald-400" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your compliance metrics auto-qualify you for enterprise procurement tenders.
                  </p>

                  {/* Conglomerate Vendor Rows */}
                  <div className="space-y-2.5 pt-1">
                    {enterpriseTenders.slice(0, 2).map((tender) => (
                      <div
                        key={tender.id}
                        className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-3 hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                            {tender.initials}
                          </div>
                          <div>
                            <span className="font-bold text-white text-xs block">{tender.enterpriseGroup}</span>
                            <span className="text-[10px] text-slate-400 block line-clamp-1">{tender.rfpTitle}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setBidTenderModal(tender)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer"
                        >
                          Approved to Bid
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('capital_credit')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View all tier-1 corporate tenders</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CARD 3: GOVT. SUBSIDIES MINED (Screenshots 2 & 3)    */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
                        GOVT. SUBSIDIES MINED
                      </span>
                      <div className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
                        {subsidiesMinedAmount}{' '}
                        <span className="text-sm font-semibold text-neutral-500">Available</span>
                      </div>
                    </div>
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>

                  <p className="text-xs text-neutral-600">
                    Based on your Udyam profile, we matched 2 pre-approved subsidies.
                  </p>

                  <div className="space-y-2.5 pt-1 text-xs">
                    {preApprovedSubsidies.map((sub) => (
                      <div key={sub.id} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-900 block font-bold">{sub.name}</strong>
                          <span className="text-neutral-500 text-[11px]">{sub.coverage}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setDisbursementModalOpen(true)}
                      className="w-full py-3 rounded-full text-xs font-extrabold text-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] active:scale-[0.98] transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>1-Click Disbursement</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CARD 4: REGULATORY SHIELD ACTIVE (Screenshots 2 & 3) */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-bold text-neutral-900">Regulatory Shield Active</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <p className="text-xs text-neutral-600">
                    LoopGrid is auto-filing your compliance based on your operations data.
                  </p>

                  {/* Stepper Timeline */}
                  <div className="space-y-4 pt-1 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 text-xs">
                    {regulatoryShieldEvents.map((event) => (
                      <div key={event.id} className="relative flex items-start gap-3 pl-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-white z-10 flex-shrink-0 ${
                            event.status === 'completed'
                              ? 'bg-emerald-600'
                              : event.status === 'pending'
                              ? 'bg-blue-600'
                              : 'bg-neutral-300 text-neutral-600'
                          }`}
                        >
                          {event.status === 'completed' && <Check className="w-3 h-3 stroke-[3]" />}
                          {event.status === 'pending' && <Clock className="w-3 h-3" />}
                          {event.status === 'scheduled' && <FileText className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="font-bold text-neutral-900 block text-xs">{event.title}</span>
                          <span className="text-neutral-500 text-[11px] block">{event.description}</span>
                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                              {event.tagDate}
                            </span>
                            {event.badgeType === 'auto_filed' && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                {event.badgeLabel}
                              </span>
                            )}
                            {event.badgeType === 'queued' && (
                              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-sky-600" />
                                {event.badgeLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('regulatory_shield')}
                      className="w-full py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer text-center"
                    >
                      Review All 18 Regulatory Filings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: UDYAM SYNC STATUS & SOVEREIGN MASTER PROFILE     */}
          {/* ======================================================== */}
          {activeTab === 'udyam' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Sovereign Udyam Synchronization
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Your single master enterprise record. Updates automatically propagate across all 18+ portals.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConnectUdyamModalOpen(true)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sync National Databank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMasterProfileOpen(true)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Master Record</span>
                  </button>
                </div>
              </div>

              {/* SIMPLIFIED UDYAM VERIFIER & SCHEMES AUTO-REGISTRATION */}
              <SimplifiedUdyamVerifier
                udyam={udyam}
                onUpdateUdyam={handleUpdateUdyamPartial}
                onShowToast={showToast}
                onCreateUdyamClick={() => setCreateUdyamModalOpen(true)}
              />

              {/* Udyam Master Record Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-neutral-900">{udyam.enterpriseName}</h3>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Active & Verified
                        </span>
                      </div>
                      <p className="text-xs font-mono text-neutral-500 mt-0.5">
                        URN: <strong className="text-neutral-900">{udyam.udyamNumber}</strong> · {udyam.enterpriseType} Enterprise
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-neutral-400 block">Ministry Synchronization</span>
                    <strong className="text-emerald-700 font-bold">{udyam.lastSyncedAt}</strong>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">Authorized Signatory</span>
                    <span className="font-bold text-neutral-900 block">{udyam.authorizedPerson}</span>
                    <span className="text-neutral-500 text-[11px]">{udyam.mobile} · {udyam.email}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">Tax & Commercial Records</span>
                    <span className="font-mono font-bold text-neutral-900 block">GSTIN: {udyam.gstin}</span>
                    <span className="font-mono text-neutral-500 text-[11px]">PAN: {udyam.pan}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">NIC 5-Digit Industry Classification</span>
                    <span className="font-mono font-bold text-neutral-900 block">NIC Code {udyam.nicCode}</span>
                    <span className="text-neutral-500 text-[11px] line-clamp-1">{udyam.nicDescription}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">Plant Premises</span>
                    <span className="font-bold text-neutral-900 block line-clamp-1">{udyam.plantAddress}</span>
                    <span className="text-neutral-500 text-[11px]">{udyam.stateDistrict} - {udyam.pinCode}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">Bank Account for Subsidies & Grants</span>
                    <span className="font-mono font-bold text-neutral-900 block">{udyam.bankAccount}</span>
                    <span className="font-mono text-neutral-500 text-[11px]">IFSC: {udyam.ifscCode}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1">
                    <span className="text-neutral-400 font-medium block">Environmental & Investment Category</span>
                    <span className="font-bold text-neutral-900 block">CPCB {udyam.cpcbCategory} Category</span>
                    <span className="text-neutral-500 text-[11px]">Plant & Mach: {udyam.investmentPlantMachinery} · T/O: {udyam.annualTurnover}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: GREEN MACHINE ROI CALCULATOR                       */}
          {/* ======================================================== */}
          {activeTab === 'green_roi_calculator' && (
            <div className="space-y-6 animate-fade-in">
              <GreenRoiCalculator
                udyam={udyam}
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: GROWTH & OPTIMIZATION DASHBOARD                    */}
          {/* ======================================================== */}
          {activeTab === 'growth_optimization' && (
            <div className="space-y-6 animate-fade-in">
              <GrowthOptimizationDashboard
                udyam={udyam}
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: FINANCIAL UNLOCK PANEL                             */}
          {/* ======================================================== */}
          {activeTab === 'financial_unlock' && (
            <div className="space-y-6 animate-fade-in">
              <FinancialUnlockPanel
                udyam={udyam}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: AI REGULATORY ROADMAP                             */}
          {/* ======================================================== */}
          {activeTab === 'regulatory_roadmap' && (
            <div className="space-y-6 animate-fade-in">
              <RegulatoryRoadmap
                udyam={udyam}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2B: GREEN COST SAVINGS & ROI DASHBOARD (RECHARTS)   */}
          {/* ======================================================== */}
          {activeTab === 'savings_roi' && (
            <div className="space-y-6 animate-fade-in">
              <GreenCostSavingsDashboard
                onShowToast={showToast}
                onNavigateToCapexStore={() => setActiveTab('green_capex')}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 3: P&L IMPACT ENGINE (The Operational Alpha)        */}
          {/* ======================================================== */}
          {activeTab === 'pnl_engine' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    P&L Impact Engine (Operational Alpha)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Translates environmental and operational compliance gaps directly into lost rupees and EBITDA expansion.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                    Monthly Bleed: ₹{monthlyBleedRupees.toLocaleString('en-IN')} / mo
                  </span>
                </div>
              </div>

              {/* Big Metric Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    ANNUAL RECOVERABLE MARGIN
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    +₹{(annualPotentialEbitdaLift / 100000).toFixed(2)} Lakhs EBITDA Expansion
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    By resolving these 4 operational inefficiencies, your MSME recovers ₹1.18L in monthly cash drain and
                    automatically complies with CPCB, SPCB, and BEE regulations with zero net cost.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('green_capex')}
                  className="px-6 py-3 rounded-full text-xs font-extrabold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center gap-2 flex-shrink-0"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Subsidize Fixes in Capex Store</span>
                </button>
              </div>

              {/* P&L Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pnlItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          Losing {item.monthlyLoss}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">{item.complianceLink}</span>
                      </div>

                      <h4 className="text-base font-bold text-neutral-900 leading-snug">{item.leakSource}</h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">{item.operationalFix}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-extrabold">{item.savingsEbitdaImpact}</span>
                      <button
                        type="button"
                        onClick={() => {
                          showToast('Operational Blueprint Activated', `Guidance dispatched for: ${item.leakSource}`);
                        }}
                        className="text-xs font-bold text-neutral-800 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Activate Fix</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comprehensive Recharts Savings & ROI Dashboard */}
              <div className="pt-4">
                <GreenCostSavingsDashboard
                  onShowToast={showToast}
                  onNavigateToCapexStore={() => setActiveTab('green_capex')}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: CAPITAL & CREDIT (Data as Currency)              */}
          {/* ======================================================== */}
          {activeTab === 'capital_credit' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Capital & Credit Terminal (Data as Currency)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Your National ESG Trust Score translates directly into pre-approved credit lines and discounted borrowing.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setClaimCreditModalOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Disburse Approved Credit</span>
                  </button>
                </div>
              </div>

              {/* Credit Status Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-neutral-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Pre-Approved Working Capital
                    </span>
                    <div className="text-3xl font-black text-neutral-900">{approvedWorkingCapital}</div>
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                      Collateral-free CGTMSE backed
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Discounted Borrowing Rate
                    </span>
                    <div className="text-3xl font-black text-emerald-700">9.25% p.a.</div>
                    <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5 line-through">
                      10.75% Standard MCLR Rate
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Basis-Point Concession
                    </span>
                    <div className="text-3xl font-black text-blue-700">-150 bps</div>
                    <span className="text-[11px] text-blue-700 font-semibold block mt-0.5">
                      1.5% ESG Trust Score Bonus
                    </span>
                  </div>
                </div>

                {/* Partner Lending Institutions */}
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-neutral-900 text-sm">Underwriting Partner Banks & Disbursers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-neutral-900 block font-bold">SIDBI Green Term Line</strong>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          7.50% Fixed
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        End-to-End Energy Efficiency & Solar equipment financing with 12 months moratorium.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-neutral-900 block font-bold">SBI MSME Green Express</strong>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          9.25% Discounted
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        Supply chain invoice discounting with direct TReDS automated settlement in T+24 hours.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-neutral-900 block font-bold">HDFC SmartHub Credit</strong>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Instant Line
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        Pre-scored credit line against secondary scrap receivables with zero real estate mortgage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 5: GREEN CAPEX STORE (0-Upfront Hardware Subsidy)   */}
          {/* ======================================================== */}
          {activeTab === 'green_capex' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Green Capex Store (Zero-Upfront Hardware)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Upgrade physical factory infrastructure at ₹0 upfront. Funded through government subsidies and future energy savings.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('green_roi_calculator')}
                    className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Calculate Machine ROI & EMI</span>
                  </button>
                </div>
              </div>

              {/* Catalog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {greenCapexCatalog.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {item.subsidizedUpfrontCost}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">{item.category}</span>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-900 leading-snug">{item.title}</h3>

                      <p className="text-xs text-neutral-600 leading-relaxed">{item.efficiencyGain}</p>

                      <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-neutral-100">
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Monthly P&L Savings</span>
                          <span className="font-bold text-emerald-700">{item.monthlyPnlSavings}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Subsidy Cover</span>
                          <span className="font-bold text-neutral-800">{item.govtSubsidyCover}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOrderGreenCapex(item)}
                        className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs text-center"
                      >
                        Order at ₹0 Upfront
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 6: CLUSTER RESOURCE POOL (Waste to Wealth Exchange) */}
          {/* ======================================================== */}
          {activeTab === 'cluster_pool' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Cluster Resource Pool (Waste-to-Wealth)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Geolocated industrial park matching. One enterprise's operational scrap becomes another's direct feedstock.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    {clusterLocation}
                  </span>
                </div>
              </div>

              {/* Cluster Exchange Table */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider text-[11px] bg-neutral-50/50">
                        <th className="py-4 px-6">SECONDARY RESOURCE</th>
                        <th className="py-4 px-6">CLUSTER ROUTE & PROXIMITY</th>
                        <th className="py-4 px-6">MONTHLY TONNAGE</th>
                        <th className="py-4 px-6">REVENUE / SAVINGS</th>
                        <th className="py-4 px-6 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-800">
                      {clusterListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-neutral-900">
                            <span>{listing.material}</span>
                            <span className="text-[10px] text-emerald-700 block font-normal mt-0.5">
                              {listing.carbonAbatement}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            <span className="font-semibold text-neutral-800 block">
                              {listing.receivingEnterprise}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Distance: {listing.proximityDistance}
                            </span>
                          </td>

                          <td className="py-4 px-6 font-mono font-bold text-neutral-700">
                            {listing.tonnageMonthly}
                          </td>

                          <td className="py-4 px-6">
                            <span className="font-bold text-emerald-700 block">
                              {listing.secondaryRevenueGenerated}
                            </span>
                            <span className="text-[10px] text-neutral-500 block">
                              Landfill Saved: {listing.landfillCostSaved}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
                              <CheckCircle className="w-3.5 h-3.5" />
                              {listing.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 7: REGULATORY SHIELD (Auto-Filing & Gazette Rules)  */}
          {/* ======================================================== */}
          {activeTab === 'regulatory_shield' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    AI Regulatory Shield (Auto-Filing Engine)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Gazette notifications mapped directly to NIC 24202. LoopGrid auto-generates paperwork before laws take effect.
                  </p>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-3">
                {regulatoryShieldEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-neutral-900 text-sm">{event.title}</h4>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {event.badgeLabel}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{event.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 font-mono">{event.tagDate}</span>
                      <button
                        type="button"
                        onClick={() => showToast('Receipt Downloaded', `Generated acknowledgement receipt for ${event.title}`)}
                        className="px-4 py-1.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 8: DIGITAL CERTIFICATE & AUDIT DOSSIER              */}
          {/* ======================================================== */}
          {activeTab === 'dossier' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Digital Stamped Compliance Dossier
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Official tamper-evident certificate verified via SHA-256 ledger and Udyam Master Record.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-full text-xs font-bold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>

              {/* Certificate Frame */}
              <div className="bg-white rounded-3xl border-2 border-neutral-300 p-8 sm:p-10 shadow-sm space-y-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
                      <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                        National Circular Economy Certification
                      </span>
                      <h3 className="text-xl font-black text-neutral-900">Digital Compliance Dossier</h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 font-mono block">CERTIFICATE ID:</span>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      LPG-CERT-2026-99214
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
                  <p>
                    This official statutory audit dossier certifies that <strong className="text-neutral-900">{udyam.enterpriseName}</strong>,
                    operating under Sovereign Udyam Registration Number <strong className="font-mono text-neutral-900">{udyam.udyamNumber}</strong>,
                    maintains full statutory environmental and circular resource compliance.
                  </p>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>National ESG Trust Score:</span>
                      <span className="font-bold text-emerald-700">{nationalEsgScore}/100 (Top 10% Cluster Benchmark)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enterprise Status:</span>
                      <span className="font-bold text-neutral-900">Scope 3 Eligible (Approved for Corporate Tenders)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CPCB Industrial Category:</span>
                      <span className="font-bold text-neutral-900">{udyam.cpcbCategory} Category Unit</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plant Address:</span>
                      <span className="text-neutral-800">{udyam.plantAddress}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">Tamper-Evident SHA-256 Ledger Hash</span>
                      <span className="font-mono text-[11px] text-emerald-800 break-all">
                        sha256: 4f98e2c071d5b3a4a7610fae829dc7792e31f903e1a0b5f128e47c7d912049281
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 ml-3">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL: CLAIM GREEN WORKING CAPITAL (1.5% Discount)       */}
      {/* ======================================================== */}
      {claimCreditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Claim Green Working Capital</h3>
                  <p className="text-xs text-neutral-500">ESG-Linked 1.5% Concessional Credit Disbursal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setClaimCreditModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Sanctioned Credit Limit:</span>
                  <span className="text-xl font-black text-neutral-900">{approvedWorkingCapital}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Applied Interest Rate:</span>
                  <span className="text-emerald-700 font-extrabold text-sm">9.25% p.a. (150 bps discount)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Receiving Bank Account:</span>
                  <span className="font-mono font-bold text-neutral-800">{udyam.bankAccount}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-950 border border-emerald-200 space-y-1">
                <span className="font-bold block">Zero-Mortgage Guarantee:</span>
                <p className="text-[11px] leading-relaxed">
                  Backed by CGTMSE sovereign trust guarantee and verified LoopGrid ESG Trust Score. No physical property mortgage required.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setClaimCreditModalOpen(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClaimWorkingCapital}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Disbursal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: 1-CLICK SUBSIDIES DISBURSEMENT (₹12.5L)           */}
      {/* ======================================================== */}
      {disbursementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">1-Click Subsidy Disbursement</h3>
                  <p className="text-xs text-neutral-500">Government of India MSME Grant Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDisbursementModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                <div className="flex justify-between">
                  <span className="font-bold text-neutral-900">1. ZED Gold Certification Grant</span>
                  <span className="font-mono font-bold text-emerald-700">₹5,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-neutral-900">2. PMEGP Margin Money Subsidy</span>
                  <span className="font-mono font-bold text-emerald-700">₹7,50,000</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-black">
                  <span>Total Disbursable:</span>
                  <span className="text-emerald-700">₹12,50,000</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Directly transferred to verified account <strong className="text-neutral-800">{udyam.bankAccount}</strong> under
                Udyam ID <strong className="text-neutral-800">{udyam.udyamNumber}</strong>. Zero broker fees.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDisbursementModalOpen(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handle1ClickDisbursement}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 cursor-pointer shadow-md"
              >
                Disburse ₹12.5L Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SUBMIT ENTERPRISE VENDOR BID                      */}
      {/* ======================================================== */}
      {bidTenderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Tier-1 Enterprise Gateway
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-0.5">{bidTenderModal.enterpriseGroup}</h3>
              </div>
              <button
                type="button"
                onClick={() => setBidTenderModal(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-700">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span>RFP Title:</span>
                  <span className="font-bold text-neutral-900">{bidTenderModal.rfpTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Contract:</span>
                  <span className="font-bold text-emerald-700">{bidTenderModal.annualContractValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scope 3 Abatement:</span>
                  <span className="font-bold text-blue-700">{bidTenderModal.scope3SavingsTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mandate Met:</span>
                  <span className="text-emerald-700 font-bold">Verified via LoopGrid DRP</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                By submitting, LoopGrid transmits your verified CPCB Form-10 records, ZED certification, and metallurgical
                assays directly to the conglomerate’s procurement ERP.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBidTenderModal(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleSubmitVendorBid(bidTenderModal)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 cursor-pointer shadow-md"
              >
                Submit Verified Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CONNECT UDYAM ACCOUNT                             */}
      {/* ======================================================== */}
      {connectUdyamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Connect Udyam Account</h3>
                  <p className="text-xs text-neutral-500">Ministry of MSME Single-Window Link</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConnectUdyamModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Udyam Registration Number (URN)
                </label>
                <input
                  type="text"
                  value={udyamInputNumber}
                  onChange={(e) => setUdyamInputNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MH-00-1234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 font-mono text-sm focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 text-neutral-700 space-y-1 border border-emerald-100">
                <span className="font-bold text-emerald-950 block">Single-Source Guarantee:</span>
                <p className="text-[11px] leading-relaxed">
                  Your Udyam ID auto-populates your GSTIN, NIC classification, and plant address across all 18+ portals.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConnectUdyamModalOpen(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSyncUdyam}
                disabled={isVerifyingUdyam}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isVerifyingUdyam ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Syncing API...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Verify & Link Udyam</span>
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
