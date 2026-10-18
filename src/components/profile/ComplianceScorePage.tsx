import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bell,
  TrendingUp,
  DollarSign,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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
} from 'lucide-react';
import { EnterpriseProfile } from '../ProfilePage';
import { useLanguage } from '../../context/LanguageContext';

interface ComplianceScorePageProps {
  profile: EnterpriseProfile;
  onReturnToDashboard: () => void;
  initialTab?: ComplianceTab;
}

export type ComplianceTab =
  | 'overview'
  | 'engine'
  | 'zed'
  | 'capital'
  | 'subsidies'
  | 'checklist'
  | 'dossier';

interface StatutoryTask {
  id: string;
  authority: string;
  authorityIcon: 'gstn' | 'epfo' | 'state' | 'cpcb' | 'spcb' | 'fire';
  authorityColor: string;
  taskTitle: string;
  taskDescription: string;
  deadline: string;
  isUrgent?: boolean;
  status: 'Urgent' | 'Pending' | 'Complied';
  receiptNumber?: string;
  filingType: string;
}

interface ChecklistItem {
  id: string;
  category: 'hazardous' | 'epr' | 'air_water' | 'energy' | 'safety';
  categoryLabel: string;
  title: string;
  regulationCode: string;
  points: number;
  description: string;
  operationalEfficiencyTip: string;
  lowCostImplementation: string;
  checked: boolean;
}

interface GovtScheme {
  id: string;
  name: string;
  agency: string;
  category: 'solar' | 'efficiency' | 'credit' | 'grant';
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  subsidyRate: string;
  concessionalRate: string;
  maxAmount: string;
  collateral: string;
  speed: string;
  eligibility: string;
  keyBenefits: string[];
}

export const ComplianceScorePage: React.FC<ComplianceScorePageProps> = ({
  profile,
  onReturnToDashboard,
  initialTab = 'overview',
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ComplianceTab>(initialTab);

  // In-app feedback toast notification
  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Statutory Compliance Tasks Engine
  const [tasks, setTasks] = useState<StatutoryTask[]>([
    {
      id: 'task-1',
      authority: 'GSTN',
      authorityIcon: 'gstn',
      authorityColor: 'bg-sky-50 text-sky-700 border-sky-200',
      taskTitle: 'GSTR-3B Monthly Return',
      taskDescription: 'Monthly self-declaration of outward secondary scrap sales & input tax credit reconciliations.',
      deadline: 'Today',
      isUrgent: true,
      status: 'Urgent',
      filingType: 'Tax Reconciliation',
    },
    {
      id: 'task-2',
      authority: 'EPFO',
      authorityIcon: 'epfo',
      authorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
      taskTitle: 'Provident Fund Chalan Generation',
      taskDescription: 'Statutory ECR chalan generation for shop-floor machinists and secondary material handlers.',
      deadline: 'Nov 15, 2026',
      status: 'Pending',
      filingType: 'Labor Compliance',
    },
    {
      id: 'task-3',
      authority: 'State Govt',
      authorityIcon: 'state',
      authorityColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      taskTitle: 'Factory License Renewal',
      taskDescription: 'Annual Department of Factories & Boilers operational manufacturing compliance renewal.',
      deadline: 'Oct 01, 2026',
      status: 'Complied',
      receiptNumber: 'REC-KA-FAC-2026-9921',
      filingType: 'Statutory License',
    },
    {
      id: 'task-4',
      authority: 'CPCB',
      authorityIcon: 'cpcb',
      authorityColor: 'bg-teal-50 text-teal-700 border-teal-200',
      taskTitle: 'Form-10 Hazardous Scrap Movement Manifest',
      taskDescription: 'Centralized manifest tracking for physical industrial scrap transported to authorized smelters.',
      deadline: 'Weekly Cycle',
      status: 'Complied',
      receiptNumber: 'CPCB-MAN-88102',
      filingType: 'Hazardous Waste',
    },
    {
      id: 'task-5',
      authority: 'SPCB',
      authorityIcon: 'spcb',
      authorityColor: 'bg-purple-50 text-purple-700 border-purple-200',
      taskTitle: 'Consent to Operate (CTO) Air & Water Renewal',
      taskDescription: 'Triennial State Pollution Control Board emission & effluent discharge compliance validation.',
      deadline: 'Dec 31, 2026',
      status: 'Pending',
      filingType: 'Environmental Consent',
    },
    {
      id: 'task-6',
      authority: 'Fire Dept',
      authorityIcon: 'fire',
      authorityColor: 'bg-rose-50 text-rose-700 border-rose-200',
      taskTitle: 'Industrial Fire Safety NOC Audit',
      taskDescription: 'Annual inspection certificate for spark arrestors, hydrants, and chip centrifuge drainage.',
      deadline: 'Jan 15, 2027',
      status: 'Complied',
      receiptNumber: 'FSNOC-BLR-2026-4410',
      filingType: 'Safety Clearance',
    },
  ]);

  const [engineFilter, setEngineFilter] = useState<'all' | 'urgent' | 'pending' | 'complied'>('all');

  // Interactive 100-Point Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'chk-01',
      category: 'hazardous',
      categoryLabel: 'Hazardous Waste & Secondary Scrap Handling',
      title: 'Digital Scrap Manifest Form 10 Logging',
      regulationCode: 'CPCB Hazardous & Other Wastes Rules, Rule 20',
      points: 7,
      description: 'Maintain electronic movement document (Form 10) for all non-ferrous and ferrous swarf lots transported outside factory premises.',
      operationalEfficiencyTip: 'Replaces paper ledger books with automated QR-coded DRP dispatch slips generated in under 30 seconds.',
      lowCostImplementation: 'Free via LoopGrid DRP system. Eliminates external compliance agent retainer fees of ₹15,000/year.',
      checked: true,
    },
    {
      id: 'chk-02',
      category: 'hazardous',
      categoryLabel: 'Hazardous Waste & Secondary Scrap Handling',
      title: 'Impervious Concrete Flooring & Bunding for Oil Scrap',
      regulationCode: 'SPCB Industrial Storage Norms (IS 14489)',
      points: 6,
      description: 'Dedicated scrap collection area with epoxy-coated impervious flooring and catchment channels to prevent ground seepage of residual cutting fluids.',
      operationalEfficiencyTip: 'Captures and pools dripped neat cutting oil, keeping the machine shop dry, clean, and accident-free.',
      lowCostImplementation: 'Use modular second-hand steel containment drip trays (₹3,200) instead of expensive full-bay epoxy civil overhaul.',
      checked: true,
    },
    {
      id: 'chk-03',
      category: 'hazardous',
      categoryLabel: 'Hazardous Waste & Secondary Scrap Handling',
      title: 'NABL Certified Material Assay & Purity Documentation',
      regulationCode: 'Bureau of Indian Standards IS 737 / IS 12614',
      points: 6,
      description: 'Periodic spectrographic testing of secondary metal offcuts verifying zero hazardous heavy metal (lead/cadmium) contamination.',
      operationalEfficiencyTip: 'Guarantees tier-1 foundries accept lots at premium spot rates without dockside rejection.',
      lowCostImplementation: 'Avail MSME Cluster Testing Center subsidies (80% fee discount) via Udyam portal.',
      checked: true,
    },
    {
      id: 'chk-04',
      category: 'hazardous',
      categoryLabel: 'Hazardous Waste & Secondary Scrap Handling',
      title: 'Designated Color-Coded Segregation Bins at Source',
      regulationCode: 'Solid Waste Management Rules 2016 (Schedule II)',
      points: 6,
      description: 'Separation of ferrous, aluminum 6061, brass, and plastics directly at the machine tool head prior to shop-floor dumping.',
      operationalEfficiencyTip: 'Preventing cross-contamination increases scrap resale revenue by 22% compared to mixed scrap.',
      lowCostImplementation: 'Refurbished 200L HDPE drums painted green/blue/yellow with stencil markings (₹800/bin).',
      checked: true,
    },
    {
      id: 'chk-05',
      category: 'epr',
      categoryLabel: 'EPR & Digital Circular Traceability',
      title: 'CPCB Centralized Portal EPR Registration',
      regulationCode: 'CPCB Circular Economy Mandate 2024',
      points: 7,
      description: 'Official registration on the national EPR portal as a generator/recycler of secondary metal or polymer packaging scrap.',
      operationalEfficiencyTip: 'Unlocks formal trading of green EPR credit certificates, providing an extra secondary revenue stream.',
      lowCostImplementation: 'Self-register directly via Parivesh / CPCB portal using Aadhaar & Udyam without paying middleman legal fees.',
      checked: true,
    },
    {
      id: 'chk-06',
      category: 'epr',
      categoryLabel: 'EPR & Digital Circular Traceability',
      title: 'End-to-End Digital Resource Passport (DRP) Verification',
      regulationCode: 'National Circular Economy Framework / ISO 14044',
      points: 7,
      description: 'Every outgoing production scrap batch is accompanied by an authenticated DRP detailing carbon abatement and chain of custody.',
      operationalEfficiencyTip: 'Makes your enterprise audit-proof during surprise state pollution control inspections.',
      lowCostImplementation: 'Native LoopGrid DRP generator included with every registered resource listing at zero cost.',
      checked: true,
    },
    {
      id: 'chk-07',
      category: 'epr',
      categoryLabel: 'EPR & Digital Circular Traceability',
      title: 'Annual Environmental Audit & Scrap Return Filing',
      regulationCode: 'Environment Protection Act Section 6, Form V',
      points: 6,
      description: 'Submission of Form V Environmental Statement on or before September 30 annually to the respective SPCB.',
      operationalEfficiencyTip: 'Consolidated records avoid sudden compounding fines and prevent factory sealing notices.',
      lowCostImplementation: 'Auto-export pre-filled Form V directly from your LoopGrid transaction history.',
      checked: false,
    },
    {
      id: 'chk-08',
      category: 'epr',
      categoryLabel: 'EPR & Digital Circular Traceability',
      title: 'Minimum 25% Certified Recycled Feedstock Ingestion',
      regulationCode: 'BIS Secondary Aluminum / Plastics Ingestion Mandate',
      points: 5,
      description: 'Ensuring secondary smelters or molders blend minimum mandated post-industrial scrap into finished production ingots.',
      operationalEfficiencyTip: 'Directly lowers raw material input cost by 24% to 28% compared to virgin primary ingots.',
      lowCostImplementation: 'Order pre-tested, standardized LoopGrid pooled lots with guaranteed metallurgical specs.',
      checked: true,
    },
    {
      id: 'chk-09',
      category: 'air_water',
      categoryLabel: 'Air & Water Statutory Consents',
      title: 'Active Consent to Operate (CTO) Under Orange/Green Category',
      regulationCode: 'Air Act 1981 & Water Act 1974',
      points: 7,
      description: 'Current valid CTO renewal certificate displayed at the premises with all operational conditions strictly followed.',
      operationalEfficiencyTip: 'Enables continuous bank credit limit renewals without audit friction from financial partners.',
      lowCostImplementation: 'Apply 90 days before expiry through the automated state single-window portal (reduces processing fees).',
      checked: true,
    },
    {
      id: 'chk-10',
      category: 'air_water',
      categoryLabel: 'Air & Water Statutory Consents',
      title: 'Oil-Water Separator / Sump Trap on Wash bays',
      regulationCode: 'CPCB Guidelines for Machining Effluents',
      points: 7,
      description: 'Gravity-fed skimming trap to recover insoluble tramp oils from floor wash and CNC coolant spills before municipal discharge.',
      operationalEfficiencyTip: 'Prevents toxic coolant discharge, avoiding SPCB closure notices and heavy water pollution penalties.',
      lowCostImplementation: 'Fabricate a 3-chamber baffle drum separator using local scrap sheet metal for ~₹4,500.',
      checked: true,
    },
    {
      id: 'chk-11',
      category: 'energy',
      categoryLabel: 'Energy Efficiency & Clean Fuel Transition',
      title: 'Power Factor Correction (APFC Panel) Maintenance',
      regulationCode: 'Electricity Act 2003 / State DISCOM Tariff Regulations',
      points: 6,
      description: 'Maintaining factory electrical power factor above 0.98 lagging to avoid DISCOM penalty surcharges.',
      operationalEfficiencyTip: 'DISCOMs in Karnataka, Gujarat, and Tamil Nadu offer a 1.5% to 3.0% bill rebate for maintaining >0.98 PF.',
      lowCostImplementation: 'Install automated APFC capacitor banks; payback is typically under 4 months.',
      checked: true,
    },
    {
      id: 'chk-12',
      category: 'energy',
      categoryLabel: 'Energy Efficiency & Clean Fuel Transition',
      title: 'Variable Frequency Drives (VFD) on Blowers & Compressors',
      regulationCode: 'Bureau of Energy Efficiency (BEE) MSME Guidelines',
      points: 6,
      description: 'Speed regulation on electric motors matching real-time air demands rather than full-throttle continuous idling.',
      operationalEfficiencyTip: 'Cuts motor power draw by 28%, directly shaving ₹8,000 to ₹18,000 from monthly electricity bills.',
      lowCostImplementation: 'Avail SIDBI STAR subvention finance to cover 90% of equipment retrofit cost.',
      checked: true,
    },
    {
      id: 'chk-13',
      category: 'safety',
      categoryLabel: 'Worker Safety & Industrial Hygiene',
      title: 'PPE Provision & Coolant Dermatitis Prevention',
      regulationCode: 'Factories Act 1948 (Section 41-C)',
      points: 5,
      description: 'Providing neoprene barrier gloves, splash goggles, and machine chip guards for metal cutting operators.',
      operationalEfficiencyTip: 'Prevents worker downtime and medical compensation claims.',
      lowCostImplementation: 'Bulk procurement through Udyam MSME cluster consortiums at 35% discount.',
      checked: true,
    },
    {
      id: 'chk-14',
      category: 'safety',
      categoryLabel: 'Worker Safety & Industrial Hygiene',
      title: 'Scrap Chip Crushers & Swarf Centrifuge Spin-Dryers',
      regulationCode: 'Occupational Safety and Health Code 2020',
      points: 5,
      description: 'Centrifugal spinning of wet metal swarf to extract up to 98% of adhering cutting oil for reuse.',
      operationalEfficiencyTip: 'Recovers 120-200 Liters of neat cutting oil per month (Saving ₹36,000/mo) and doubles scrap dry value.',
      lowCostImplementation: 'Lease a compact batch centrifuge with SIDBI Green Financing.',
      checked: false,
    },
  ]);

  // Checklist Category Filter
  const [checklistFilter, setChecklistFilter] = useState<'all' | 'hazardous' | 'epr' | 'air_water' | 'energy' | 'safety'>('all');

  // Green Capital Simulator States
  const [capitalAmountLakhs, setCapitalAmountLakhs] = useState<number>(150); // ₹150 Lakhs
  const [repaymentTenureYears, setRepaymentTenureYears] = useState<number>(5); // 5 Years
  const [capitalPurpose, setCapitalPurpose] = useState<'solar' | 'etp' | 'furnace' | 'machinery'>('solar');
  const subsidizedInterestRate = 7.5; // 7.5% Subsidized Concessional Rate
  const commercialInterestRate = 11.2; // 11.2% Standard Commercial Benchmark

  // Modal states
  const [filingSuccessModal, setFilingSuccessModal] = useState<StatutoryTask | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [applySchemeModal, setApplySchemeModal] = useState<GovtScheme | null>(null);
  const [zedUpgradeModalOpen, setZedUpgradeModalOpen] = useState(false);
  const [zedInfoModalOpen, setZedInfoModalOpen] = useState(false);
  const [schemeDetailModal, setSchemeDetailModal] = useState<GovtScheme | null>(null);

  // Compute live compliance score
  const totalPoints = useMemo(() => {
    return checklist.reduce((sum, item) => sum + (item.checked ? item.points : 0), 0);
  }, [checklist]);

  const maxPoints = 88;
  const complianceHealthPercent = Math.min(100, Math.round((totalPoints / maxPoints) * 100));

  // Compute Monthly EMI & Savings
  const calculationResults = useMemo(() => {
    const P = capitalAmountLakhs * 100000;
    const n = repaymentTenureYears * 12;

    // Subsidized Rate (7.5%)
    const rSub = subsidizedInterestRate / 100 / 12;
    const emiSub = (P * rSub * Math.pow(1 + rSub, n)) / (Math.pow(1 + rSub, n) - 1);
    const totalSubsidizedPaid = emiSub * n;

    // Commercial Rate (11.2%)
    const rComm = commercialInterestRate / 100 / 12;
    const emiComm = (P * rComm * Math.pow(1 + rComm, n)) / (Math.pow(1 + rComm, n) - 1);
    const totalCommercialPaid = emiComm * n;

    const totalInterestSaved = Math.max(0, totalCommercialPaid - totalSubsidizedPaid);

    return {
      monthlyEMI: Math.round(emiSub),
      commercialEMI: Math.round(emiComm),
      totalSubsidizedPaid: Math.round(totalSubsidizedPaid),
      totalCommercialPaid: Math.round(totalCommercialPaid),
      totalInterestSaved: Math.round(totalInterestSaved),
    };
  }, [capitalAmountLakhs, repaymentTenureYears]);

  // Government Green Transmission Schemes Directory
  const govtSchemes: GovtScheme[] = [
    {
      id: 'sch-sidbi-4e',
      name: 'SIDBI 4E (End to End Energy Efficiency)',
      agency: 'Small Industries Development Bank of India (SIDBI)',
      category: 'efficiency',
      badge: 'TOP CONCESSIONAL RATE',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      headline: 'Term loan up to ₹500 Lakhs covering 90% of equipment cost for industrial energy-saving retrofits.',
      description: 'Comprehensive scheme offering concessional loans for replacing low-efficiency motors, furnaces, compressors, and boilers with BEE 5-star or high-efficiency units.',
      subsidyRate: '2% Interest Subvention',
      concessionalRate: '7.00% - 7.50% p.a.',
      maxAmount: 'Up to ₹500 Lakhs',
      collateral: 'Asset hypothecation + CGTMSE cover available',
      speed: 'T+5 Days Fast-Track Sanction',
      eligibility: 'Udyam-registered MSMEs operational for at least 2 years with positive net worth.',
      keyBenefits: [
        'Covers up to 90% of technical project expenditure',
        'Moratorium up to 12 months during installation',
        'Subsidized BEE energy audit report reimbursement up to ₹50,000',
      ],
    },
    {
      id: 'sch-sidbi-speed',
      name: 'SIDBI SPEED (Solar Power Eco-Efficiency Drive)',
      agency: 'SIDBI & Ministry of New and Renewable Energy',
      category: 'solar',
      badge: '100% FINANCING',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      headline: '100% debt financing for industrial rooftop solar PV installations without third-party collateral.',
      description: 'Designed specifically to help MSME factories lower electrical operating expenses by generating captive clean power on factory rooftops.',
      subsidyRate: 'Zero Processing Fee + Direct Capital Offset',
      concessionalRate: '7.25% - 7.75% p.a.',
      maxAmount: 'Up to ₹100 Lakhs (New Units) / ₹200 Lakhs (Existing)',
      collateral: 'Zero Collateral Required (Solar Plant Hypothecation only)',
      speed: 'T+48 Hours Automated Sanction',
      eligibility: 'Manufacturing MSMEs with factory roof ownership or long-term registered lease.',
      keyBenefits: [
        '100% financing with zero promoter margin money needed',
        'Repayment tenure up to 7 years with seasonal flexibility',
        'Direct net metering integration with state DISCOMs',
      ],
    },
    {
      id: 'sch-cgtmse-green',
      name: 'CGTMSE Green Credit Guarantee Scheme',
      agency: 'Credit Guarantee Fund Trust for Micro and Small Enterprises',
      category: 'credit',
      badge: '100% COLLATERAL-FREE',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      headline: 'Complete 100% sovereign credit guarantee for MSME loans up to ₹5 Crores for green investments.',
      description: 'Enables Indian MSMEs to secure bank credit for Zero Defect Zero Effect (ZED) compliance, Effluent Treatment Plants (ETP), and circular manufacturing without mortgaging personal property.',
      subsidyRate: '100% Guarantee Cover (No Collateral)',
      concessionalRate: 'Standard Bank MCLR - 0.75%',
      maxAmount: 'Up to ₹500 Lakhs (₹5 Crores)',
      collateral: 'None (CGTMSE Trust provides full sovereign guarantee)',
      speed: 'Single Window Digital Approval',
      eligibility: 'All Micro and Small manufacturing enterprises with valid Udyam registration and ZED Bronze or higher.',
      keyBenefits: [
        'Banks cannot demand third-party guarantees or residential collateral',
        'Reduced annual guarantee fee of only 0.37% for green borrowers',
        'Covers term loans as well as working capital limits',
      ],
    },
    {
      id: 'sch-clcss-green',
      name: 'Credit Linked Capital Subsidy Scheme (CLCSS)',
      agency: 'Ministry of MSME, Government of India',
      category: 'grant',
      badge: 'UPFRONT CAPITAL GRANT',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      headline: '15% upfront direct capital subsidy (up to ₹15 Lakhs) for technological modernization.',
      description: 'Direct cash grant deposited into the MSME bank account for upgrading old machinery to cleaner, low-emission, and energy-conserving technology variants.',
      subsidyRate: '15% Direct Upfront Cash Grant',
      concessionalRate: 'Standard Project Loan',
      maxAmount: 'Up to ₹15 Lakhs Capital Subsidy',
      collateral: 'As per lending bank norms',
      speed: 'Quarterly nodal disbursement cycle',
      eligibility: 'Micro and Small enterprises upgrading to government-approved clean technology list.',
      keyBenefits: [
        'Non-refundable direct cash injection into loan account',
        'Approved machinery includes CNC metal swarf centrifuges, modern induction furnaces, and oil recovery skimmers',
        'Combined with state state industrial development incentives',
      ],
    },
    {
      id: 'sch-prsf-wb',
      name: 'PRSF (Partial Risk Sharing Facility)',
      agency: 'World Bank & SIDBI & Global Environment Facility (GEF)',
      category: 'efficiency',
      badge: 'WORLD BANK BACKED',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      headline: '75% risk guarantee for energy service performance contracts implemented in manufacturing clusters.',
      description: 'Risk guarantee facility that backs energy efficiency projects executed via Energy Service Companies (ESCOs), guaranteeing performance savings.',
      subsidyRate: 'Covers up to 75% loan loss risk',
      concessionalRate: '7.50% fixed project line',
      maxAmount: 'Up to ₹300 Lakhs',
      collateral: 'Performance guarantee backing',
      speed: 'T+7 Days Cluster Verification',
      eligibility: 'Enterprises in designated energy-intensive sectors (Foundry, Auto Ancillary, Plastics, Textiles).',
      keyBenefits: [
        'Equipment costs paid from generated energy bill savings',
        'Independent measurement and verification by certified BEE auditors',
        'Zero upfront cash outflow from the enterprise working capital',
      ],
    },
    {
      id: 'sch-cpcb-epr',
      name: 'CPCB EPR Circular Trading Facility',
      agency: 'Central Pollution Control Board (CPCB)',
      category: 'grant',
      badge: 'SECONDARY REVENUE STREAM',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      headline: 'Monetize verified secondary recycling certificates directly to brand owners needing EPR credits.',
      description: 'Official framework allowing registered recyclers and secondary material processors to sell Extended Producer Responsibility certificates for recycled plastic and secondary metals.',
      subsidyRate: 'Market Certificate Value (₹3 - ₹12 per kg)',
      concessionalRate: 'Trading Platform Credit',
      maxAmount: 'Unlimited (Based on verified tonnage)',
      collateral: 'Digital Resource Passport (DRP) Batch Verification',
      speed: 'Weekly Escrow Settlement',
      eligibility: 'Processing enterprises and secondary metal recyclers registered on the Central CPCB Portal.',
      keyBenefits: [
        'Turns waste documentation into immediate cash flow',
        'Automated transfer of credits via verified LoopGrid DRP manifests',
        'Zero legal friction with audited chain of custody',
      ],
    },
  ];

  const filteredSchemes = useMemo(() => {
    return govtSchemes;
  }, [govtSchemes]);

  // Handle 1-Click File
  const handle1ClickFile = (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;

    const generatedReceipt = `ARN-${target.authority}-${Math.floor(100000 + Math.random() * 900000)}`;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'Complied',
              isUrgent: false,
              receiptNumber: generatedReceipt,
            }
          : t
      )
    );

    setFilingSuccessModal({
      ...target,
      status: 'Complied',
      receiptNumber: generatedReceipt,
    });

    showToast('Filing Synchronized', `${target.taskTitle} successfully submitted with receipt ${generatedReceipt}!`);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.checked;
          showToast(
            next ? 'Compliance Fulfilled' : 'Item Marked Pending',
            `${item.title}: ${next ? '+' + item.points + ' points earned!' : item.points + ' points deducted.'}`,
            next ? 'success' : 'info'
          );
          return { ...item, checked: next };
        }
        return item;
      })
    );
  };

  const handleApplyScheme = (scheme: GovtScheme) => {
    setApplySchemeModal(scheme);
  };

  const handleConfirmSchemeApplication = () => {
    if (!applySchemeModal) return;
    const trackingRef = `MSME-GRN-${Math.floor(100000 + Math.random() * 900000)}`;
    showToast(
      'Application Submitted',
      `Your application for ${applySchemeModal.name} was successfully dispatched to the Nodal Agency! Ref: ${trackingRef}`
    );
    setApplySchemeModal(null);
  };

  const handleConfirmZedUpgrade = () => {
    const zedRef = `ZED-GOLD-${Math.floor(100000 + Math.random() * 900000)}`;
    showToast(
      'ZED Gold Application Dispatched',
      `Application for Gold Tier upgrade submitted to Quality Council of India. Assessor Ref: ${zedRef}`
    );
    setZedUpgradeModalOpen(false);
  };

  // Filter tasks in compliance engine
  const filteredTasks = useMemo(() => {
    if (engineFilter === 'all') return tasks;
    if (engineFilter === 'urgent') return tasks.filter((t) => t.status === 'Urgent');
    if (engineFilter === 'pending') return tasks.filter((t) => t.status === 'Pending');
    if (engineFilter === 'complied') return tasks.filter((t) => t.status === 'Complied');
    return tasks;
  }, [tasks, engineFilter]);

  // Filter checklist items
  const filteredChecklist = useMemo(() => {
    if (checklistFilter === 'all') return checklist;
    return checklist.filter((item) => item.category === checklistFilter);
  }, [checklist, checklistFilter]);

  const urgentCount = tasks.filter((t) => t.status === 'Urgent').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col font-sans pb-24 animate-fade-in selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
            }`}>
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

      {/* Top Application Bar with Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReturnToDashboard}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Profile</span>
            </button>
            <div className="h-5 w-px bg-neutral-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-sm text-neutral-900">{profile.name}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                Udyam Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>ZED Silver</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Score: {complianceHealthPercent}%</span>
            </div>
          </div>
        </div>

        {/* Dedicated Navigation Bar / Section Switcher (Organized, Not Bombarding) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-100 overflow-x-auto no-scrollbar py-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Overview & Pulse</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('engine')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'engine'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>Statutory Compliance Engine</span>
            {urgentCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('zed')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'zed'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>ZED Certification Desk</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('capital')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'capital'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Green Capital Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subsidies')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'subsidies'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
            <span>Govt Schemes & Subsidies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Assessment & Hacks ({totalPoints} Pts)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dossier'
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-neutral-700" />
            <span>Compliance Dossier</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full flex-grow">
        {/* ======================================================== */}
        {/* VIEW 1: OVERVIEW & ENTERPRISE PULSE                      */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-7 animate-fade-in">
            {/* Header Title & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
                  Overview
                </h1>
                <p className="text-sm sm:text-base text-neutral-500">
                  Welcome back. Here is your enterprise compliance snapshot and green transmission standing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('dossier')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Download Green Dossier</span>
                </button>
              </div>
            </div>

            {/* THE 3 EXACT CARDS FROM REFERENCE IMAGES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* CARD 1: Compliance Health */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-neutral-600">
                    Compliance Health
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
                    {complianceHealthPercent}%
                  </div>

                  <div className="flex items-center gap-2">
                    {urgentCount > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{urgentCount} Action Needed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>All Clear • Audit Proof</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('engine')}
                    className="w-full py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer text-center"
                  >
                    Review {urgentCount} Alerts
                  </button>
                </div>
              </div>

              {/* CARD 2: Active Subsidies */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-neutral-600">
                    Active Subsidies
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 border border-sky-100">
                    <span className="text-lg font-black font-sans">₹</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
                    ₹12.4L
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    <span>Disbursal in progress (SIDBI STAR)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('subsidies')}
                    className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer text-center shadow-xs"
                  >
                    Claim Funds
                  </button>
                </div>
              </div>

              {/* CARD 3: ZED Status (Royal Blue Card) */}
              <div className="bg-gradient-to-br from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-blue-100 font-medium block">
                    ZED Certification Rating
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Silver Tier
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Valid until Oct 2029 (14 Params)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('zed')}
                    className="w-full py-2.5 rounded-full text-xs font-extrabold text-neutral-900 bg-white hover:bg-neutral-100 active:scale-[0.98] transition-all cursor-pointer text-center shadow-md"
                  >
                    Upgrade to Gold
                  </button>
                </div>
              </div>
            </div>

            {/* Score Calculation Factor Breakdown */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    How Your Compliance Score is Calculated
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Weighted across 4 statutory dimensions mandated by CPCB, State PCB, and Ministry of MSME.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Total Earned: {totalPoints} / {maxPoints} Points
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800">1. Statutory Returns</span>
                    <span className="font-mono text-emerald-700 font-bold">25 Pts</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    GSTN scrap declarations, EPFO e-returns, and annual factory renewals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800">2. CPCB & DRP Manifests</span>
                    <span className="font-mono text-emerald-700 font-bold">25 Pts</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Digital Form-10 manifests, chain-of-custody, and EPR recycled feedstock quotas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800">3. Environmental Consents</span>
                    <span className="font-mono text-emerald-700 font-bold">20 Pts</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Air & Water CTO status, oil-water separators, and NABL spectrographic testing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800">4. Energy & ZED Norms</span>
                    <span className="font-mono text-emerald-700 font-bold">18 Pts</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    APFC power factor correction, VFDs, worker PPE, and swarf oil centrifugal recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick-Access Interactive Hub Grid */}
            <div className="pt-2">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-neutral-900">
                  Green Transmission & Statutory Hub
                </h3>
                <p className="text-xs text-neutral-500">
                  Select a dedicated center to explore and fulfill Indian MSME programs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* Hub 1: Statutory Engine */}
                <div
                  onClick={() => setActiveTab('engine')}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm group-hover:text-rose-700 transition-colors">
                    Compliance Engine
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    Track GSTR-3B, EPFO, and CPCB Form-10 manifests with 1-click filing.
                  </p>
                </div>

                {/* Hub 2: Green Capital Simulator */}
                <div
                  onClick={() => setActiveTab('capital')}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm group-hover:text-emerald-700 transition-colors">
                    Green Capital Simulator
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    Calculate monthly EMIs for rooftop solar and ETPs at 7.5% subsidized rate.
                  </p>
                </div>

                {/* Hub 3: Govt Subsidies */}
                <div
                  onClick={() => setActiveTab('subsidies')}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm group-hover:text-amber-700 transition-colors">
                    SIDBI STAR & PMEGP
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    Direct 2% interest subvention and up to 25% capital grants for MSMEs.
                  </p>
                </div>

                {/* Hub 4: ZED Gold Upgrade */}
                <div
                  onClick={() => setActiveTab('zed')}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm group-hover:text-blue-700 transition-colors">
                    ZED Silver to Gold
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    Avail Govt ₹5 Lakhs consulting subsidy and 0.5% bank loan rebate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: COMPLIANCE ENGINE (Screenshots 2, 3, 8)           */}
        {/* ======================================================== */}
        {activeTab === 'engine' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
                  Statutory Compliance Engine
                </h1>
                <p className="text-sm sm:text-base text-neutral-500">
                  Unified statutory tracking. APIs sync directly with MCA, GSTN, EPFO, and CPCB portals.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-white border border-neutral-200 rounded-full text-xs">
                {(['all', 'urgent', 'pending', 'complied'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setEngineFilter(filter)}
                    className={`px-3 py-1 rounded-full font-bold capitalize transition-all cursor-pointer ${
                      engineFilter === filter
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Table / Card Container matching Screenshot 2, 3, 8 */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider text-[11px] bg-neutral-50/50">
                      <th className="py-4 px-6">AUTHORITY</th>
                      <th className="py-4 px-6">FILING / TASK DESCRIPTION</th>
                      <th className="py-4 px-6">DEADLINE</th>
                      <th className="py-4 px-6">STATUS</th>
                      <th className="py-4 px-6 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-800">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-neutral-50/80 transition-colors">
                        {/* AUTHORITY Column */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${task.authorityColor}`}>
                              {task.authorityIcon === 'gstn' && <Calculator className="w-4 h-4" />}
                              {task.authorityIcon === 'epfo' && <Users className="w-4 h-4" />}
                              {task.authorityIcon === 'state' && <Factory className="w-4 h-4" />}
                              {task.authorityIcon === 'cpcb' && <Leaf className="w-4 h-4" />}
                              {task.authorityIcon === 'spcb' && <Scale className="w-4 h-4" />}
                              {task.authorityIcon === 'fire' && <Flame className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className="font-bold text-neutral-900 text-sm block">
                                {task.authority}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-medium">
                                {task.filingType}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* FILING DESCRIPTION Column */}
                        <td className="py-4 px-6">
                          <div className="max-w-md">
                            <span className="font-bold text-neutral-900 text-sm block">
                              {task.taskTitle}
                            </span>
                            <span className="text-neutral-500 text-[11px] mt-0.5 line-clamp-1">
                              {task.taskDescription}
                            </span>
                          </div>
                        </td>

                        {/* DEADLINE Column */}
                        <td className="py-4 px-6 font-semibold">
                          <span
                            className={
                              task.status === 'Complied'
                                ? 'line-through text-neutral-400'
                                : task.isUrgent
                                ? 'text-rose-600 font-black'
                                : 'text-neutral-700'
                            }
                          >
                            {task.deadline}
                          </span>
                        </td>

                        {/* STATUS Column */}
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                              task.status === 'Urgent'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : task.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>

                        {/* ACTION Column matching exact screenshot buttons */}
                        <td className="py-4 px-6 text-right">
                          {task.status === 'Urgent' ? (
                            <button
                              type="button"
                              onClick={() => handle1ClickFile(task.id)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#191C1E] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs whitespace-nowrap"
                            >
                              1-Click File
                            </button>
                          ) : task.status === 'Pending' ? (
                            <button
                              type="button"
                              onClick={() => handle1ClickFile(task.id)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Prepare Draft
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedReceipt(task.receiptNumber || 'REC-2026-OK')}
                              className="text-xs font-bold text-neutral-600 hover:text-neutral-900 hover:underline cursor-pointer whitespace-nowrap"
                            >
                              View Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-100 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>Encrypted API gateway connected to GSTN / MCA 21 / Parivesh SPCB portal.</span>
                <span className="font-mono text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: ZED CERTIFICATION HUB (Screenshots 7, 10, 13)    */}
        {/* ======================================================== */}
        {activeTab === 'zed' && (
          <div className="space-y-6 animate-fade-in">
            {/* Government MSME ZED Banner matching Screenshot 13 */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <Award className="w-3.5 h-3.5" />
                    <span>Ministry of MSME • Govt of India Initiative</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191C1E]">
                    MSME Sustainable (ZED) Certification
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    MSME Sustainable (ZED) Certification is an extensive national drive to create awareness amongst Indian MSMEs about Zero Defect Zero Effect practices and motivate and incentivise them for ZED Certification while also encouraging them to become MSME Champions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setZedUpgradeModalOpen(true)}
                    className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-all shadow-md cursor-pointer text-center"
                  >
                    UPGRADE TO GOLD
                  </button>
                  <button
                    type="button"
                    onClick={() => setZedInfoModalOpen(true)}
                    className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer text-center"
                  >
                    SCHEME GUIDELINES
                  </button>
                </div>
              </div>

              {/* Official Subsidy Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-900 block">
                    Micro Enterprises
                  </span>
                  <div className="text-2xl font-black text-blue-950">80% Subsidy</div>
                  <p className="text-neutral-600 text-[11px]">
                    On certification fees, audits, and clean equipment testing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block">
                    Small Enterprises
                  </span>
                  <div className="text-2xl font-black text-emerald-950">60% Subsidy</div>
                  <p className="text-neutral-600 text-[11px]">
                    Direct reimbursement on Quality Council of India audits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-900 block">
                    Medium Enterprises
                  </span>
                  <div className="text-2xl font-black text-purple-950">50% Subsidy</div>
                  <p className="text-neutral-600 text-[11px]">
                    Plus additional 10% for Women / SC / ST / NER units.
                  </p>
                </div>
              </div>

              {/* 3 Certification Levels & Progression */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-neutral-900">
                  Certification Levels & Enterprise Pathway
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Bronze */}
                  <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral-900 text-sm">Bronze Level</span>
                      <span className="text-[10px] font-bold text-neutral-500">5 Parameters</span>
                    </div>
                    <p className="text-neutral-500 text-[11px]">
                      Basic shop floor cleanliness, energy conservation, worker safety gear, and daily scrap logging.
                    </p>
                    <span className="text-emerald-700 font-bold text-[11px] block">✓ Completed & Cleared</span>
                  </div>

                  {/* Silver (Current) */}
                  <div className="p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/30 space-y-2 text-xs relative">
                    <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      CURRENT STATUS
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-950 text-sm">Silver Level</span>
                      <span className="text-[10px] font-bold text-blue-800">14 Parameters</span>
                    </div>
                    <p className="text-neutral-600 text-[11px]">
                      NABL assay testing, segregated scrap bins, DRP traceability, and APFC power factor correction.
                    </p>
                    <span className="text-blue-700 font-bold text-[11px] block">Active Valid until Oct 2029</span>
                  </div>

                  {/* Gold (Next Target) */}
                  <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/30 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-950 text-sm">Gold Level (Target)</span>
                      <span className="text-[10px] font-bold text-amber-800">20 Parameters</span>
                    </div>
                    <p className="text-neutral-600 text-[11px]">
                      Zero Liquid Discharge, solar energy integration, complete circular supply chain verification.
                    </p>
                    <button
                      type="button"
                      onClick={() => setZedUpgradeModalOpen(true)}
                      className="w-full mt-2 py-2 rounded-xl text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 transition-colors cursor-pointer text-center"
                    >
                      Apply for Gold Upgrade →
                    </button>
                  </div>
                </div>
              </div>

              {/* Benefits of ZED Certification in India */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2.5">
                <span className="font-bold text-neutral-800 text-sm block">
                  Commercial & Financial Incentives for ZED Certified MSMEs:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>0.5% Concession on Bank Interest Rates:</strong> Available across SBI, Canara, PNB, and Bank of Baroda.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>₹5,00,000 Handholding Consulting Grant:</strong> Complete financial support by Quality Council of India.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>GeM Portal Priority:</strong> Fast-track allocation in government procurement contracts and tenders.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Green Channel SPCB Exemption:</strong> Waiver of routine third-party factory inspection visits.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: GREEN CAPITAL SIMULATOR (Screenshot 5)           */}
        {/* ======================================================== */}
        {activeTab === 'capital' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            {/* Header matching Screenshot 5 */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
                Green Capital
              </h1>
              <p className="text-sm sm:text-base text-neutral-500">
                Simulate investments for solar or ETPs and discover matched subsidized schemes.
              </p>
            </div>

            {/* Purpose Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'solar', label: 'Rooftop Solar PV' },
                { id: 'etp', label: 'Effluent Treatment Plant (ETP/ZLD)' },
                { id: 'furnace', label: 'Clean Electric Furnace' },
                { id: 'machinery', label: 'High-Efficiency VFD Machinery' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCapitalPurpose(item.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    capitalPurpose === item.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Simulator Card matching Screenshot 5 */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-7">
              {/* Slider 1: Required Capital Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-800">
                    Required Capital Amount
                  </span>
                  <span className="px-3.5 py-1 rounded-2xl bg-sky-100/70 text-sky-800 text-sm font-extrabold">
                    ₹{capitalAmountLakhs} L
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={capitalAmountLakhs}
                  onChange={(e) => setCapitalAmountLakhs(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />

                <div className="flex justify-between text-[11px] font-bold text-neutral-400 tracking-wider">
                  <span>₹5 LAKHS</span>
                  <span>₹5 CRORES</span>
                </div>
              </div>

              {/* Slider 2: Repayment Tenure */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-800">
                    Repayment Tenure
                  </span>
                  <span className="px-3.5 py-1 rounded-2xl bg-sky-100/70 text-sky-800 text-sm font-extrabold">
                    {repaymentTenureYears} Yrs
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={repaymentTenureYears}
                  onChange={(e) => setRepaymentTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />

                <div className="flex justify-between text-[11px] font-bold text-neutral-400 tracking-wider">
                  <span>1 YEAR</span>
                  <span>10 YEARS</span>
                </div>
              </div>

              {/* Calculation Result Card matching Screenshot 5 */}
              <div className="bg-neutral-50/80 rounded-3xl p-6 border border-neutral-200/80 text-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                  EST. MONTHLY EMI
                </span>

                <div className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                  ₹{calculationResults.monthlyEMI.toLocaleString('en-IN')}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <span>7.5% Subsidized Rate Applied</span>
                </div>

                {/* Savings compared to commercial bank */}
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Commercial Benchmark EMI (11.2%):</span>
                    <span className="line-through text-neutral-400">₹{calculationResults.commercialEMI.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Total Interest Saved via Subsidies:</span>
                    <span>₹{(calculationResults.totalInterestSaved / 100000).toFixed(2)} Lakhs</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 max-w-sm mx-auto pt-1 leading-relaxed">
                  Includes 2% interest subvention through SIDBI STAR Scheme and CGTMSE sovereign collateral waiver.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const scheme = govtSchemes[0];
                      handleApplyScheme(scheme);
                    }}
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer shadow-xs"
                  >
                    Apply for this Subsidized Green Line →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: GOVT SUBSIDIES & SCHEMES (Screenshots 4 & 9)      */}
        {/* ======================================================== */}
        {activeTab === 'subsidies' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
                Government Subsidies & Schemes
              </h1>
              <p className="text-sm sm:text-base text-neutral-500">
                Direct financing lines, interest subventions, and capital grants for green transition in Indian MSMEs.
              </p>
            </div>

            <div className="space-y-5">
              {filteredSchemes.map((scheme, idx) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4 relative hover:shadow-md transition-shadow"
                >
                  <span className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${scheme.badgeColor}`}>
                    {scheme.badge}
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    {scheme.category === 'solar' && <Sun className="w-6 h-6 text-amber-600 stroke-[2.2]" />}
                    {scheme.category === 'efficiency' && <Zap className="w-6 h-6 text-emerald-600 stroke-[2.2]" />}
                    {scheme.category === 'credit' && <ShieldCheck className="w-6 h-6 text-blue-600 stroke-[2.2]" />}
                    {scheme.category === 'grant' && <DollarSign className="w-6 h-6 text-purple-600 stroke-[2.2]" />}
                  </div>

                  <div className="space-y-1.5 pr-24">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      {scheme.agency}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {scheme.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {scheme.headline}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block">Incentive</span>
                      <strong className="text-emerald-700 text-[11px]">{scheme.subsidyRate}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block">Interest Rate</span>
                      <strong className="text-neutral-800 text-[11px]">{scheme.concessionalRate}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block">Outlay</span>
                      <strong className="text-neutral-800 text-[11px]">{scheme.maxAmount}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block">Collateral</span>
                      <strong className="text-blue-700 text-[11px]">{scheme.collateral}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setSchemeDetailModal(scheme)}
                      className="text-xs font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer text-left"
                    >
                      View Scheme Guidelines & Eligibility →
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyScheme(scheme)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#191C1E] hover:bg-neutral-800 transition-colors cursor-pointer text-center shadow-xs"
                    >
                      Apply via LoopGrid Desk →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 6: ASSESSMENT CHECKLIST & HACKS                     */}
        {/* ======================================================== */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-fade-in">
            {/* Scorecard Header */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  CPCB & SPCB Statutory Index
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">
                  Compliance Assessment Checklist & Frugal Hacks
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Fulfill statutory requirements to automatically increase your enterprise compliance health score.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Earned Score
                </span>
                <div className="text-3xl font-black text-emerald-700">
                  {totalPoints} / {maxPoints}
                </div>
              </div>
            </div>

            {/* Checklist Category Filter */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'all', label: 'All Requirements' },
                { id: 'hazardous', label: 'Hazardous Scrap & Manifests' },
                { id: 'epr', label: 'EPR & DRP Passports' },
                { id: 'air_water', label: 'Air & Water Consents' },
                { id: 'energy', label: 'Energy & APFC' },
                { id: 'safety', label: 'Worker Safety & OSH' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChecklistFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    checklistFilter === tab.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {filteredChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    item.checked
                      ? 'bg-white border-neutral-200/90 shadow-xs'
                      : 'bg-neutral-50/60 border-neutral-200 opacity-80'
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="w-5 h-5 rounded-md accent-[#00875A] cursor-pointer"
                    />
                  </div>

                  <div className="flex-grow space-y-1 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-neutral-900 text-sm">
                        {item.title}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        +{item.points} Points
                      </span>
                    </div>

                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {item.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 mt-2 space-y-1">
                      <div className="text-[11px] text-neutral-700">
                        <strong className="text-neutral-900">Efficiency Benefit: </strong>
                        {item.operationalEfficiencyTip}
                      </div>
                      <div className="text-[11px] text-emerald-800">
                        <strong className="text-emerald-950">Frugal MSME Hack: </strong>
                        {item.lowCostImplementation}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-400 border-t border-neutral-100 mt-2 font-mono">
                      <span>Regulation: {item.regulationCode}</span>
                      <span className="font-sans font-bold text-neutral-700">
                        Category: {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 7: GREEN COMPLIANCE DOSSIER (Certificate View)      */}
        {/* ======================================================== */}
        {activeTab === 'dossier' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191C1E]">
                  Enterprise Green Compliance Passport
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Official tamper-evident compliance audit record ready for bank underwriting and SPCB submission.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#191C1E] hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dossier</span>
              </button>
            </div>

            {/* Official Passport Card */}
            <div className="bg-white rounded-3xl border-2 border-neutral-300 p-8 shadow-md space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-neutral-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                      LG
                    </div>
                    <span className="text-sm font-black tracking-tight text-neutral-900">
                      LoopGrid Statutory Registry
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900 mt-2">
                    {profile.name}
                  </h2>
                  <span className="text-xs text-neutral-500 font-mono">
                    UDYAM-KR-03-0098412 • Primary MSME Manufacturing Unit
                  </span>
                </div>

                <div className="text-right">
                  <div className="inline-block p-2 bg-neutral-50 rounded-xl border border-neutral-200">
                    <QrCode className="w-16 h-16 text-neutral-800 mx-auto" />
                    <span className="text-[9px] font-mono text-neutral-400 block mt-1">VERIFY ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Core Credentials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 block">ZED STATUS</span>
                  <strong className="text-blue-700 text-sm">SILVER TIER</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 block">HEALTH SCORE</span>
                  <strong className="text-emerald-700 text-sm">{complianceHealthPercent}% (GRADE A)</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 block">CPCB FORM-10</span>
                  <strong className="text-neutral-800 text-sm">VERIFIED ACTIVE</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 block">VALID UNTIL</span>
                  <strong className="text-neutral-800 text-sm">OCT 31, 2029</strong>
                </div>
              </div>

              {/* Statutory Manifest Summary */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-neutral-900 text-sm block">
                  Complied Statutory Mandates & Clean Traceability
                </span>
                <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
                  <div className="p-3 bg-neutral-50 flex justify-between font-semibold">
                    <span>Statutory Requirement</span>
                    <span>Regulatory Framework</span>
                    <span>Status</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>GSTR-3B Scrap Tax Filing</span>
                    <span className="text-neutral-500">GSTN Council</span>
                    <span className="text-emerald-700 font-bold">Complied</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>Hazardous Scrap Manifest Form 10</span>
                    <span className="text-neutral-500">CPCB Rules 2016</span>
                    <span className="text-emerald-700 font-bold">Complied</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>Consent to Operate (CTO) Air/Water</span>
                    <span className="text-neutral-500">SPCB Karnataka</span>
                    <span className="text-blue-700 font-bold">In-Renewal</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>Power Factor APFC (&gt;0.98)</span>
                    <span className="text-neutral-500">BEE Guidelines</span>
                    <span className="text-emerald-700 font-bold">Complied (1.5% Rebate)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Digital Ledger Hash</span>
                  <span className="font-mono text-[11px] text-emerald-800">
                    sha256: 4f98e2c071d5b3a4a7610fae829dc7792e31f903e1a0b5f128e47c7d912
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* 1-CLICK FILING SUCCESS MODAL                             */}
      {/* ======================================================== */}
      {filingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-neutral-900">
                Filing Successfully Recorded!
              </h3>
              <p className="text-xs text-neutral-600">
                {filingSuccessModal.taskTitle} has been synchronized with the {filingSuccessModal.authority} statutory server.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Acknowledgement ARN:</span>
                <span className="font-bold text-neutral-800">{filingSuccessModal.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="font-bold text-emerald-700">COMPLIED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Compliance Health:</span>
                <span className="font-bold text-blue-700">+3% Boost</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFilingSuccessModal(null)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-[#191C1E] hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Continue to Compliance Hub
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* RECEIPT PREVIEW MODAL                                    */}
      {/* ======================================================== */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Statutory Acknowledgement Receipt
              </span>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 text-xs font-mono space-y-2 border border-neutral-200">
              <div className="flex justify-between">
                <span>Receipt Ref:</span>
                <strong className="text-neutral-900">{selectedReceipt}</strong>
              </div>
              <div className="flex justify-between">
                <span>Enterprise:</span>
                <span className="text-neutral-800">{profile.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified Authority:</span>
                <span className="text-emerald-700">Dept of Factories & Boilers / CPCB</span>
              </div>
              <div className="flex justify-between">
                <span>Validity:</span>
                <span className="text-neutral-800">Until Oct 31, 2027</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* APPLY FOR SCHEME MODAL                                   */}
      {/* ======================================================== */}
      {applySchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Direct Government MSME Desk
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">
                  Apply for {applySchemeModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setApplySchemeModal(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs space-y-2 text-neutral-600">
              <p className="leading-relaxed">
                LoopGrid has pre-populated your application dossier with verified KYC, Udyam Registration, and DRP material ledger certificates.
              </p>
              <div className="pt-2 border-t border-neutral-200 space-y-1.5 font-mono">
                <div className="flex justify-between text-neutral-800 font-semibold">
                  <span>Applicant Enterprise:</span>
                  <span>{profile.name}</span>
                </div>
                <div className="flex justify-between text-neutral-800 font-semibold">
                  <span>Incentive Subvention:</span>
                  <span className="text-emerald-700">{applySchemeModal.subsidyRate}</span>
                </div>
                <div className="flex justify-between text-neutral-800 font-semibold">
                  <span>Concessional Rate:</span>
                  <span className="text-blue-700">{applySchemeModal.concessionalRate}</span>
                </div>
                <div className="flex justify-between text-neutral-800 font-semibold">
                  <span>Collateral Status:</span>
                  <span className="text-neutral-700">{applySchemeModal.collateral}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setApplySchemeModal(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSchemeApplication}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] cursor-pointer shadow-xs"
              >
                Submit Application to SIDBI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCHEME DETAIL MODAL                                      */}
      {/* ======================================================== */}
      {schemeDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  {schemeDetailModal.agency}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
                  {schemeDetailModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSchemeDetailModal(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {schemeDetailModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
              <span className="font-bold text-neutral-900 block">Key Scheme Advantages:</span>
              <ul className="space-y-1.5 text-neutral-600">
                {schemeDetailModal.keyBenefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-neutral-500 space-y-1">
              <span className="font-bold text-neutral-800 block">Eligibility Criteria:</span>
              <p>{schemeDetailModal.eligibility}</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSchemeDetailModal(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const s = schemeDetailModal;
                  setSchemeDetailModal(null);
                  handleApplyScheme(s);
                }}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-[#191C1E] hover:bg-neutral-800 cursor-pointer shadow-xs"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ZED UPGRADE TO GOLD MODAL                                */}
      {/* ======================================================== */}
      {zedUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  ZED Silver to Gold Upgrade Desk
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZedUpgradeModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-600">
              <p>
                Your enterprise currently holds <strong className="text-blue-700">ZED Silver Tier (14 Parameters Cleared)</strong>. Upgrading to <strong className="text-amber-600">Gold Tier (20 Parameters)</strong> unlocks:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>Up to <strong>₹5,00,000 Govt Grant</strong> for Quality Council of India consulting handholding.</li>
                <li><strong>0.5% interest rate rebate</strong> on all public sector term loans (SBI, PNB, Canara).</li>
                <li>Priority allocation on MSME Government e-Marketplace (GeM) tenders.</li>
                <li>Exemption from routine SPCB consent inspections under Green Channel.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZedUpgradeModalOpen(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleConfirmZedUpgrade}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 cursor-pointer shadow-md"
              >
                Begin Gold Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ZED INFO GUIDELINES MODAL                                */}
      {/* ======================================================== */}
      {zedInfoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900">
                ZED Scheme Overview & Parameters
              </h3>
              <button
                type="button"
                onClick={() => setZedInfoModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed max-h-80 overflow-y-auto">
              <p>
                The <strong>MSME Sustainable (ZED) Certification Scheme</strong> was launched by the Ministry of MSME to enable Indian manufacturers to achieve global quality benchmarks with minimal environmental degradation.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <strong className="text-neutral-900 block">Zero Defect Focus:</strong>
                  Production with minimal rework, waste reduction, precision grading, and standardized secondary scrap recovery.
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <strong className="text-neutral-900 block">Zero Effect Focus:</strong>
                  Zero air/water pollution, zero industrial landfill dumping, carbon footprint mitigation, and maximum circular feedstock reuse.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setZedInfoModalOpen(false)}
                className="w-full py-2.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
