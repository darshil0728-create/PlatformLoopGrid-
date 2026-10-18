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
  Award
} from 'lucide-react';
import { EnterpriseProfile } from '../ProfilePage';
import { useLanguage } from '../../context/LanguageContext';

interface ComplianceScorePageProps {
  profile: EnterpriseProfile;
  onReturnToDashboard: () => void;
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

interface GovtRegulation {
  id: string;
  ministry: string;
  badgeColor: string;
  notificationNumber: string;
  date: string;
  title: string;
  synopsis: string[];
  effectiveDate: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  sectorsAffected: string[];
  loopGridSupport: string;
}

interface LowCostHack {
  title: string;
  category: string;
  equipmentCost: string;
  monthlySavings: string;
  paybackPeriod: string;
  environmentalBenefit: string;
  governmentSubsidy: string;
  stepByStepAction: string[];
}

export const ComplianceScorePage: React.FC<ComplianceScorePageProps> = ({
  profile,
  onReturnToDashboard,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'assessment' | 'regulations' | 'implementation' | 'low-cost-hacks'>('assessment');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'ALL' | 'hazardous' | 'epr' | 'air_water' | 'energy' | 'safety'>('ALL');
  const [expandedRegulationId, setExpandedRegulationId] = useState<string | null>('reg-01');

  // Interactive Assessment Checklist items with exact mathematical weights
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Category 1: Hazardous Waste & Scrap Segregation (25 Points)
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

    // Category 2: Extended Producer Responsibility (EPR) & Digital Traceability (25 Points)
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

    // Category 3: Air & Water Consents & Effluent Monitoring (20 Points)
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
      title: 'Zero Discharge of Water Soluble Cutting Fluids',
      regulationCode: 'General Effluent Standards GSR 422(E)',
      points: 7,
      description: 'Prohibition of disposing used synthetic/mineral coolants into municipal drainage. Closed-loop recovery or authorized disposal.',
      operationalEfficiencyTip: 'Filtration and tramp-oil skimming extends coolant sump life from 3 weeks to over 6 months.',
      lowCostImplementation: 'Install an air-driven tramp-oil skimmer (₹4,500). Saves ₹28,000/year in fresh coolant purchases.',
      checked: false,
    },
    {
      id: 'chk-11',
      category: 'air_water',
      categoryLabel: 'Air & Water Statutory Consents',
      title: 'Ambient Particulate Matter (PM10/PM2.5) Air Monitoring',
      regulationCode: 'National Ambient Air Quality Standards (NAAQS)',
      points: 6,
      description: 'Periodic stack emission test for smelting furnaces or extraction cyclone maintenance for dry swarf machining.',
      operationalEfficiencyTip: 'Clean air ducts minimize worker absenteeism caused by respiratory issues and prevent motor overheating.',
      lowCostImplementation: 'Fabricate local centrifugal duct filters with washable polyester sleeves instead of proprietary HEPA units.',
      checked: true,
    },

    // Category 4: Energy Efficiency & Decarbonization (15 Points)
    {
      id: 'chk-12',
      category: 'energy',
      categoryLabel: 'Energy Efficiency & Decarbonization',
      title: 'Variable Frequency Drives (VFD) & Power Factor Optimization',
      regulationCode: 'Energy Conservation Act 2001 / BEE MSME Scheme',
      points: 5,
      description: 'Maintaining factory power factor >0.98 and equipping high-load CNC hydraulic pumps and blowers with VFDs.',
      operationalEfficiencyTip: 'Eliminates electricity board low power factor penalty and earns a 1.5% prompt rebate on monthly power bill.',
      lowCostImplementation: 'Install automatic power factor correction (APFC) capacitor bank. Immediate 2-month payback.',
      checked: true,
    },
    {
      id: 'chk-13',
      category: 'energy',
      categoryLabel: 'Energy Efficiency & Decarbonization',
      title: 'Furnace Insulation & Waste Heat Recovery (Smelters/Foundries)',
      regulationCode: 'BEE Thermal Energy Efficiency Benchmark',
      points: 5,
      description: 'Ceramic fiber blanket lining on secondary melting furnaces to reduce shell radiation losses below 5%.',
      operationalEfficiencyTip: 'Cuts LPG/diesel melting fuel consumption by 18% per ton of molten metal tapped.',
      lowCostImplementation: 'Retrofit ceramic refractory coating over existing brickwork (₹8,000 total material cost).',
      checked: false,
    },
    {
      id: 'chk-14',
      category: 'energy',
      categoryLabel: 'Energy Efficiency & Decarbonization',
      title: 'Rooftop Solar PV or Green Power Wheeling Participation',
      regulationCode: 'Green Energy Open Access Rules 2022',
      points: 5,
      description: 'Offsetting minimum 20% of daytime connected machinery load with clean solar renewable energy.',
      operationalEfficiencyTip: 'Locks in levelized electricity tariff at ₹3.80/kWh vs commercial grid tariff of ₹8.40/kWh.',
      lowCostImplementation: 'Apply for Ministry of MNRE 40% capital subsidy for MSME industrial rooftop solar.',
      checked: true,
    },

    // Category 5: Occupational Safety, PPE & ZED Standards (15 Points)
    {
      id: 'chk-15',
      category: 'safety',
      categoryLabel: 'Occupational Safety & ZED Certification',
      title: 'Mandatory PPE for Scrap Sorting & Metal Machining',
      regulationCode: 'Factories Act 1948 Section 41F',
      points: 5,
      description: 'Enforcement of level-5 cut-resistant Kevlar gloves, steel-toe footwear, and eye protection during metal offcut handling.',
      operationalEfficiencyTip: 'Reduces shop-floor lost-time injury (LTI) frequency to zero, lowering workmen compensation insurance premiums.',
      lowCostImplementation: 'Bulk purchase certified cut-resistant gloves in bulk from MSME safety syndicates (₹95/pair).',
      checked: true,
    },
    {
      id: 'chk-16',
      category: 'safety',
      categoryLabel: 'Occupational Safety & ZED Certification',
      title: 'MSME Zero Defect Zero Effect (ZED) Certification',
      regulationCode: 'Ministry of MSME ZED Scheme 2022',
      points: 5,
      description: 'Formal bronze, silver, or gold accreditation verifying environmental responsibility and production quality.',
      operationalEfficiencyTip: 'Grants 0.50% interest concession on all working capital bank loans and priority public procurement tenders.',
      lowCostImplementation: 'Ministry pays 80% subsidy for micro enterprises, 60% for small enterprises on certification costs.',
      checked: true,
    },
    {
      id: 'chk-17',
      category: 'safety',
      categoryLabel: 'Occupational Safety & ZED Certification',
      title: 'Emergency Eye-Wash & Secondary Spill Kits',
      regulationCode: 'Occupational Safety, Health and Working Conditions Code 2020',
      points: 5,
      description: 'Readily accessible neutralizing eyewash stations and absorbent sand/sawdust spill kits near chemical/coolant storage.',
      operationalEfficiencyTip: 'Prevents minor spill containment from turning into an expensive SPCB show-cause notice.',
      lowCostImplementation: 'DIY mobile spill station utilizing dedicated dry sawdust bins and HDPE wall-mounted squeeze eyewash bottles (₹1,200).',
      checked: true,
    },
  ]);

  // Real-time Government Regulations Feed
  const regulationsFeed: GovtRegulation[] = [
    {
      id: 'reg-01',
      ministry: 'CPCB / MoEFCC',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      notificationNumber: 'Notification F.No. 12-28/2024-HSMD',
      date: 'Gazetted: Oct 04, 2026',
      title: 'Mandatory Digital QR-Coded Movement Manifest for Non-Ferrous Scrap',
      synopsis: [
        'All industrial machine shops generating more than 200 kg of non-ferrous metal scrap (Aluminum, Copper, Brass, Zinc) per month must generate an electronic Form 10 movement document with a tamper-proof QR code before dispatch.',
        'Paper delivery challans will no longer be considered valid proof of safe disposal during SPCB transit checks.',
        'Vehicles found transporting scrap without digital consignment registration are liable for impoundment and compounding fines up to ₹50,000.',
      ],
      effectiveDate: 'Enforced from November 01, 2026',
      impactLevel: 'CRITICAL',
      sectorsAffected: ['Automotive Ancillaries', 'CNC Turning Units', 'Secondary Smelters', 'Transit Carriers'],
      loopGridSupport: 'LoopGrid automatically embeds the required MoEFCC digital QR code directly onto every Digital Resource Passport (DRP). Zero additional paperwork needed.',
    },
    {
      id: 'reg-02',
      ministry: 'Ministry of Finance / CBIC',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      notificationNumber: 'CBIC Circular No. 238/2026-GST',
      date: 'Issued: Sep 22, 2026',
      title: 'Clarification on RCM (Reverse Charge Mechanism) on Secondary Scrap Lots',
      synopsis: [
        'Where scrap is sold by an unregistered MSME to a registered processing enterprise, GST shall be payable under Reverse Charge Mechanism (RCM) by the purchasing smelter at 18%.',
        'Registered MSME units with valid GSTIN can sell under forward charge with 2% TDS deduction under Section 194Q.',
        'Requires clear material assay classification code (HSN 7602 for Aluminum scrap) on all invoices to avoid input tax credit (ITC) blockages.',
      ],
      effectiveDate: 'Effective Immediately',
      impactLevel: 'HIGH',
      sectorsAffected: ['All Scrap Generators', 'Foundries', 'Factoring & Banking Partners'],
      loopGridSupport: 'Automated invoice generator with validated HSN codes and direct integration with buyer escrow for transparent tax compliance.',
    },
    {
      id: 'reg-03',
      ministry: 'Central Pollution Control Board (CPCB)',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      notificationNumber: 'CPCB Circular B-29016/EPR-Metals/2026',
      date: 'Published: Sep 10, 2026',
      title: 'Incentive Framework for Recycled Aluminum Ingot Content in Auto Castings',
      synopsis: [
        'Automotive OEM suppliers utilizing more than 35% certified recycled aluminum secondary ingot are granted fast-track green clearances and priority access to national EV component production-linked subsidies.',
        'Requires accredited traceability showing secondary scrap origin from verified regional machine shops.',
      ],
      effectiveDate: 'Financial Year 2026-2027',
      impactLevel: 'MODERATE',
      sectorsAffected: ['Die Casters', 'CNC Machining Units', 'Foundry Smelters'],
      loopGridSupport: 'Provides digital provenance certificates that auto components manufacturers can submit to OEMs to claim premium green pricing.',
    },
    {
      id: 'reg-04',
      ministry: 'Ministry of MSME / BEE',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      notificationNumber: 'MSME/BEE/Energy-EE/44/2026',
      date: 'Published: Aug 28, 2026',
      title: 'Energy Efficiency Capital Subsidy Scheme for Secondary Induction Furnaces',
      synopsis: [
        'Secondary metallurgical processing units installing energy-efficient thyristor power packs or ceramic thermal insulation are eligible for a 35% direct capital grant up to ₹15 Lakhs.',
        'Targeted at reducing average melting kWh per ton of aluminum from 620 kWh to under 510 kWh.',
      ],
      effectiveDate: 'Applications Open until Dec 31, 2026',
      impactLevel: 'HIGH',
      sectorsAffected: ['Secondary Smelters', 'Ingot Casting Foundries'],
      loopGridSupport: 'Pre-formatted energy audit baseline templates accepted by BEE regional offices for instant grant approval.',
    },
  ];

  // Low-Cost Compliance & Profitability Blueprints
  const lowCostHacks: LowCostHack[] = [
    {
      title: 'Centrifugal Chip Spinner & Coolant Reclaimer',
      category: 'Hazardous Waste & Coolant Management',
      equipmentCost: '₹22,000 (Low-Cost Local Fabricated Spinner)',
      monthlySavings: '₹14,200 per month (Coolant + Scrap Premium)',
      paybackPeriod: '1.5 Months Payback',
      environmentalBenefit: 'Eliminates 100% of hazardous oil dripping from scrap bins, passing SPCB unannounced inspections.',
      governmentSubsidy: 'Up to 50% under MSME Tool Room Scheme',
      stepByStepAction: [
        'Place aluminum or steel CNC turning swarf into the basket spinner before dumping into scrap storage bins.',
        'Centrifugal rotation spins out 95% of adhering neat cutting oil in 2 minutes.',
        'Filter reclaimed oil through a 10-micron cartridge and pour back into machine sump.',
        'Result: Bone-dry metal scrap fetches ₹14/kg extra from foundries + saves 120 liters of fresh cutting oil monthly.',
      ],
    },
    {
      title: 'Micro-Briquetting of Aluminum Swarf into Dense Pucks',
      category: 'Thermal Melting & Air Quality',
      equipmentCost: '₹0 Capital Outlay (Shared LoopGrid Cluster Briquetter)',
      monthlySavings: '₹38,000 per ton smelted',
      paybackPeriod: 'Immediate (Pay-per-use ₹1.20/kg)',
      environmentalBenefit: 'Stops particulate swarf fly-loss in induction furnaces, complying with stack air quality norms.',
      governmentSubsidy: 'Zero GST on green cluster processing',
      stepByStepAction: [
        'Loose swarf burns and oxidizes up to 12% in the melting furnace, generating heavy dross and polluting smoke.',
        'Compressing into solid 90% dense briquette pucks cuts oxidation burn-loss from 12% to under 2.5%.',
        'Produces clean, dense charges with 25% faster melt times and zero black smoke.',
      ],
    },
    {
      title: 'MSME ZED Scheme Certification for 0.50% Bank Interest Concession',
      category: 'Statutory Certification & Banking',
      equipmentCost: '₹6,000 (After 80% Ministry Subsidy)',
      monthlySavings: '₹24,500 per month on working capital interest',
      paybackPeriod: '14 Days Payback',
      environmentalBenefit: 'Standardized zero-defect production methodology with formal third-party green verification.',
      governmentSubsidy: '80% subsidy on certification fees by Ministry of MSME',
      stepByStepAction: [
        'Apply on the official zed.msme.gov.in portal using Udyam Registration number.',
        'Upload shop-floor safety PPE photos, Form 10 digital manifest logs, and waste segregation bins.',
        'Obtain Bronze/Silver ZED certificate in 10 business days.',
        'Submit certificate to your lending bank (Canara, SBI, PNB, SIDBI) to immediately knock 0.50% off loan interest.',
      ],
    },
    {
      title: 'Air-Driven Tramp Oil Belt Skimmer',
      category: 'Water Pollution & Coolant Longevity',
      equipmentCost: '₹4,800 (Compact Magnetic / Poly Belt Unit)',
      monthlySavings: '₹8,400 per month in chemical disposal',
      paybackPeriod: '3 Weeks Payback',
      environmentalBenefit: 'Prevents bacterial anaerobic decay of machine coolants, stopping foul odors and toxic disposal.',
      governmentSubsidy: 'Tax 100% accelerated depreciation in Year 1',
      stepByStepAction: [
        'Tramp hydraulic oil floating on coolant creates anaerobic bacteria and noxious sulfur odors.',
        'Mount small belt skimmer on the coolant tank rim. It continuously wipes off surface oil into a waste jug.',
        'Extends coolant sump life from 4 weeks to 28 weeks.',
        'Eliminates need for costly hazardous effluent waste tanker pickups.',
      ],
    },
  ];

  // Mathematical Calculation of the Score:
  // Total achievable points = 100
  // Each item has defined points based on statutory severity.
  const totalPossiblePoints = useMemo(() => {
    return checklist.reduce((sum, item) => sum + item.points, 0);
  }, [checklist]);

  const currentScore = useMemo(() => {
    return checklist
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.points, 0);
  }, [checklist]);

  // Score percentage and category breakdowns
  const scorePercentage = Math.round((currentScore / totalPossiblePoints) * 100);

  const categoryBreakdown = useMemo(() => {
    const categories: Record<string, { label: string; current: number; total: number }> = {
      hazardous: { label: 'Hazardous Waste & Scrap', current: 0, total: 0 },
      epr: { label: 'EPR & DRP Traceability', current: 0, total: 0 },
      air_water: { label: 'Air & Water Consents', current: 0, total: 0 },
      energy: { label: 'Energy & Decarbonization', current: 0, total: 0 },
      safety: { label: 'Worker Safety & ZED', current: 0, total: 0 },
    };

    checklist.forEach((item) => {
      categories[item.category].total += item.points;
      if (item.checked) {
        categories[item.category].current += item.points;
      }
    });

    return categories;
  }, [checklist]);

  // Toggle checklist item
  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Filtered checklist
  const filteredChecklist = useMemo(() => {
    if (selectedCategoryFilter === 'ALL') return checklist;
    return checklist.filter((item) => item.category === selectedCategoryFilter);
  }, [checklist, selectedCategoryFilter]);

  // Performance Rating tier
  const getRatingTier = (score: number) => {
    if (score >= 90) {
      return {
        tier: 'Tier-A+ ESG Pioneer',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        barColor: 'from-emerald-500 to-green-600',
        badge: 'Exemplary Environmental Performance',
        summary: 'Zero regulatory liability. Eligible for lowest 8.75% bank interest and priority public enterprise procurement.',
      };
    }
    if (score >= 75) {
      return {
        tier: 'Tier-A High Compliance',
        color: 'text-emerald-800 bg-[#EAF8EE] border-[#C8E6C9]',
        barColor: 'from-emerald-500 to-teal-600',
        badge: 'Audit-Proof Industrial Operations',
        summary: 'Fully insulated from SPCB inspection notices. Compliant with CPCB 2026 digital manifest mandates.',
      };
    }
    if (score >= 55) {
      return {
        tier: 'Tier-B Moderate Compliance',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        barColor: 'from-amber-400 to-amber-600',
        badge: 'Action Recommended on 3 Items',
        summary: 'Minor operational gaps in hazardous waste or effluent documentation. Low risk of immediate compounding fines.',
      };
    }
    return {
      tier: 'Tier-C Critical Attention Needed',
      color: 'text-red-700 bg-red-50 border-red-300',
      barColor: 'from-red-500 to-orange-600',
      badge: 'High Statutory Risk',
      summary: 'Action required on core consent renewals or scrap manifest logging to prevent show-cause notices.',
    };
  };

  const currentTier = getRatingTier(currentScore);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col font-sans selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Application Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>{t.compliance.returnBtn}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00875A] flex items-center justify-center text-white shadow-xs">
              <Scale className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#191C1E]">
              CERCI Compliance Engine
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] hidden sm:inline">
              CPCB / SPCB 2026 Aligned
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 hidden md:block">
              {profile.name}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
              {profile.role}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-8">
        {/* EXECUTIVE HERO SCORECARD (Mathematical Scoring System) */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B5E20] via-[#10B981] to-[#0284C7]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Environmental & Operational Compliance Index</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191C1E]">
                {profile.name} Compliance Score
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl leading-relaxed">
                A rigorous, mathematically weighted assessment measuring adherence to CPCB/SPCB hazardous scrap guidelines, digital DRP traceability, and energy benchmarks. Compliance is transformed into measurable operational savings.
              </p>
            </div>

            {/* Live Score Dial Display */}
            <div className="flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex-shrink-0">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#1B5E20] tracking-tight">
                    {currentScore}
                  </span>
                  <span className="text-lg font-bold text-neutral-400">
                    / 100
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5">
                  Mathematical Index
                </span>
              </div>

              <div className="border-l border-neutral-200 pl-4 space-y-1">
                <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${currentTier.color}`}>
                  {currentTier.tier}
                </span>
                <p className="text-[11px] text-neutral-500">
                  Cluster Percentile: <strong className="text-neutral-800">Top 12%</strong>
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Est. Annual Benefit: +₹2,48,000/yr
                </p>
              </div>
            </div>
          </div>

          {/* Category Progress Bars */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(categoryBreakdown).map(([key, cat]) => {
              const catPercent = Math.round((cat.current / cat.total) * 100);
              return (
                <div key={key} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                    <span className="truncate pr-1">{cat.label}</span>
                    <span className="text-[#166534]">{cat.current}/{cat.total} pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#10B981] rounded-full transition-all duration-300"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 block">
                    {catPercent}% Achieved
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 CORE NAVIGATION TABS */}
        <div className="border-b border-neutral-200">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('assessment')}
              className={`pb-3.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'assessment'
                  ? 'border-[#00875A] text-[#00875A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.compliance.tabAssessment} ({checklist.filter(c => c.checked).length}/{checklist.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('regulations')}
              className={`pb-3.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'regulations'
                  ? 'border-[#00875A] text-[#00875A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{t.compliance.tabRegulations} ({regulationsFeed.length})</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('implementation')}
              className={`pb-3.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'implementation'
                  ? 'border-[#00875A] text-[#00875A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.compliance.tabImplementation}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('low-cost-hacks')}
              className={`pb-3.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'low-cost-hacks'
                  ? 'border-[#00875A] text-[#00875A]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{t.compliance.tabLowCostHacks}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: INTERACTIVE SELF-ASSESSMENT CHECKLIST            */}
        {/* ======================================================== */}
        {activeTab === 'assessment' && (
          <div className="space-y-6 animate-fade-in">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {(['ALL', 'hazardous', 'epr', 'air_water', 'energy', 'safety'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#191C1E] text-white shadow-xs'
                        : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                    }`}
                  >
                    {cat === 'ALL'
                      ? t.compliance.filterAll
                      : cat === 'hazardous'
                      ? `${t.compliance.filterHazardous} (25p)`
                      : cat === 'epr'
                      ? `${t.compliance.filterEpr} (25p)`
                      : cat === 'air_water'
                      ? `${t.compliance.filterAirWater} (20p)`
                      : cat === 'energy'
                      ? `${t.compliance.filterEnergy} (15p)`
                      : `${t.compliance.filterSafety} (15p)`}
                  </button>
                ))}
              </div>

              <span className="text-xs text-neutral-500">
                Check off items your factory implements to recompute your score live.
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3.5">
              {filteredChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
                    item.checked
                      ? 'bg-white border-[#C8E6C9] shadow-xs'
                      : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox Icon */}
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? 'bg-[#166534] text-white shadow-xs'
                          : 'border-2 border-neutral-300 bg-white'
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    {/* Content */}
                    <div className="flex-grow space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-base font-bold ${item.checked ? 'text-neutral-900' : 'text-neutral-700'}`}>
                            {item.title}
                          </h3>
                          <span className="font-mono text-[11px] font-bold text-[#166534] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                            +{item.points} pts
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500">
                          {item.regulationCode}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Operational Efficiency & Low-Cost Blueprint Badges */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-900 text-[11px] block">
                              Operational Efficiency Benefit:
                            </span>
                            <span className="text-neutral-700 text-[11px]">
                              {item.operationalEfficiencyTip}
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2">
                          <DollarSign className="w-3.5 h-3.5 text-sky-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-sky-950 text-[11px] block">
                              Low-Cost Execution Strategy:
                            </span>
                            <span className="text-neutral-700 text-[11px]">
                              {item.lowCostImplementation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: REAL-TIME GOVERNMENT REGULATIONS & SYNOPSIS      */}
        {/* ======================================================== */}
        {activeTab === 'regulations' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3">
              <Bell className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Real-Time Central & State Regulatory Intelligence
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  We monitor the Gazette of India, CPCB circulars, and SPCB notifications 24/7. Rather than dense legal jargon, you receive executive synopses with turnkey implementation roadmaps.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {regulationsFeed.map((reg) => {
                const isExpanded = expandedRegulationId === reg.id;
                return (
                  <div
                    key={reg.id}
                    className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:border-[#10B981] transition-all p-5 sm:p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${reg.badgeColor}`}>
                          {reg.ministry}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          {reg.notificationNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          reg.impactLevel === 'CRITICAL'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          Impact: {reg.impactLevel}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {reg.date}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#191C1E]">
                        {reg.title}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                        Enforcement Timeline: {reg.effectiveDate}
                      </p>
                    </div>

                    {/* Synopsis Points */}
                    <div className="space-y-2 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                        Detailed Regulatory Synopsis:
                      </span>
                      {reg.synopsis.map((syn, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{syn}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sectors & LoopGrid Implementation Support */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-neutral-400 text-[11px]">Sectors Affected:</span>
                        {reg.sectorsAffected.map((sec, secIdx) => (
                          <span key={secIdx} className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-medium">
                            {sec}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50 text-[#166534] border border-emerald-200 text-xs font-medium w-full sm:w-auto">
                        <strong>LoopGrid Execution:</strong> {reg.loopGridSupport}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: STEP-BY-STEP IMPLEMENTATION (TURNKEY SOPS)       */}
        {/* ======================================================== */}
        {activeTab === 'implementation' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                  Frictionless Execution
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#191C1E] mt-2">
                  Transforming Statutory Burden into Shop-Floor Efficiency
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Compliance fails when treated as a quarterly legal panic. LoopGrid embeds compliance directly into day-to-day material movements so standards are achieved automatically as part of production.
                </p>
              </div>

              {/* 3 Step Implementation Flow */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#166534] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    01
                  </div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    Source-Level Swarf Spin & Segregation
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Machinists drop CNC chips into categorized color-coded baskets. Neat oil is spun out on-site in 2 minutes, preventing shop-floor puddles and hazardous liquid classification.
                  </p>
                  <div className="pt-2 border-t border-neutral-200 text-[11px] font-semibold text-emerald-800">
                    Result: Zero oil spill notices + 120L reclaimed oil
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    02
                  </div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    One-Tap Digital DRP Generation
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    When lot reaches pickup weight (500 kg+), the dock supervisor generates a LoopGrid DRP. The platform auto-generates CPCB Form 10, GST e-Way bills, and transit insurance.
                  </p>
                  <div className="pt-2 border-t border-neutral-200 text-[11px] font-semibold text-sky-800">
                    Result: 100% paperless compliance + audit protection
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    03
                  </div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    Direct Smelter Delivery & Bank Credit
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Verified transit carriers transport the lot directly to secondary smelting foundries. Escrow releases automatically to the MSME bank account upon gate spectrometer check.
                  </p>
                  <div className="pt-2 border-t border-neutral-200 text-[11px] font-semibold text-purple-800">
                    Result: T+24h bank settlement + zero payment default
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LOW-COST COMPLIANCE & PROFITABILITY HACKS        */}
        {/* ======================================================== */}
        {activeTab === 'low-cost-hacks' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Economic Return on Sustainability
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                  Low-Cost Implementations That Directly Boost Profitability
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Compliance should never be a cost center. Every blueprint below generates net positive monthly cash flow while satisfying statutory norms.
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs text-neutral-500 block">Avg. Cluster Profit Lift</span>
                <span className="text-2xl font-black text-[#1B5E20]">+₹38,000 / mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lowCostHacks.map((hack, hIdx) => (
                <div
                  key={hIdx}
                  className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                        {hack.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {hack.paybackPeriod}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#191C1E]">
                      {hack.title}
                    </h4>

                    {/* Cost vs Savings Matrix */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                          Capital Outlay:
                        </span>
                        <span className="font-bold text-neutral-800 text-sm">
                          {hack.equipmentCost}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                          Monthly Direct Savings:
                        </span>
                        <span className="font-extrabold text-[#166534] text-sm">
                          {hack.monthlySavings}
                        </span>
                      </div>
                    </div>

                    {/* Step by Step Action */}
                    <div className="space-y-1.5 text-xs text-neutral-700">
                      <span className="font-bold text-neutral-800 block text-[11px]">
                        Implementation Roadmap:
                      </span>
                      {hack.stepByStepAction.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-emerald-700 font-medium">
                      Govt Subsidy: {hack.governmentSubsidy}
                    </span>
                    <span className="font-bold text-neutral-800">
                      High ROI
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
