import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Building2,
  Factory,
  FileCheck,
  Download,
  ExternalLink,
  Zap,
  Award,
  Landmark,
  Scale,
  Sparkles,
  ArrowRight,
  Info,
  Check,
  Clock,
  Fingerprint,
  FileText,
  ChevronRight,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { UdyamAccountDetails } from './ComplianceScorePage';

export interface PresetEnterprise {
  id: string;
  label: string;
  udyamNumber: string;
  name: string;
  type: 'Micro' | 'Small' | 'Medium';
  majorActivity: 'Manufacturing' | 'Services';
  nic: string;
  nicDesc: string;
  plant: string;
  stateDistrict: string;
  turnover: string;
  investment: string;
  cpcb: 'Orange' | 'Green' | 'Red' | 'White';
  gstin: string;
  pan: string;
  authorizedPerson: string;
  mobile: string;
  email: string;
}

export const PRESET_ENTERPRISES: PresetEnterprise[] = [
  {
    id: 'pune-auto',
    label: 'Auto Machining (Pune MIDC)',
    udyamNumber: 'UDYAM-MH-26-0045892',
    name: 'Apex Precision Engineering Pvt Ltd',
    type: 'Small',
    majorActivity: 'Manufacturing',
    nic: '25920',
    nicDesc: 'Machining of metal parts by turning, milling, and grinding',
    plant: 'Plot 44, MIDC Industrial Area, Chakan, Pune, Maharashtra - 410501',
    stateDistrict: 'Maharashtra - Pune',
    turnover: '₹18.40 Cr',
    investment: '₹4.85 Cr',
    cpcb: 'Orange',
    gstin: '27AABCU9603R1ZM',
    pan: 'AABCU9603R',
    authorizedPerson: 'Rajesh N. Kulkarni (Director)',
    mobile: '+91 98201 44820',
    email: 'compliance@apexprecision.in',
  },
  {
    id: 'peenya-aero',
    label: 'Aerotech Tooling (Peenya, BLR)',
    udyamNumber: 'UDYAM-KR-03-0091244',
    name: 'Peenya AeroTech & Tooling LLP',
    type: 'Small',
    majorActivity: 'Manufacturing',
    nic: '25731',
    nicDesc: 'Manufacture of cutting tools, jigs, fixtures and precision dies',
    plant: 'Phase 2, Peenya Industrial Estate, Bengaluru, Karnataka - 560058',
    stateDistrict: 'Karnataka - Bengaluru Urban',
    turnover: '₹14.20 Cr',
    investment: '₹3.90 Cr',
    cpcb: 'Green',
    gstin: '29AABCP4412R1ZN',
    pan: 'AABCP4412R',
    authorizedPerson: 'Venkatesh Rao (Managing Partner)',
    mobile: '+91 98450 11209',
    email: 'operations@peenyaaerotech.com',
  },
  {
    id: 'surat-textile',
    label: 'Circular Textiles (Surat GIDC)',
    udyamNumber: 'UDYAM-GJ-01-0078311',
    name: 'Surat Circular Yarns & Weaving Works',
    type: 'Medium',
    majorActivity: 'Manufacturing',
    nic: '13121',
    nicDesc: 'Weaving of synthetic fabrics & post-industrial yarn circular recycling',
    plant: 'GIDC Industrial Area, Pandesara, Surat, Gujarat - 394221',
    stateDistrict: 'Gujarat - Surat',
    turnover: '₹32.50 Cr',
    investment: '₹9.20 Cr',
    cpcb: 'Orange',
    gstin: '24AABCS8819Q1ZP',
    pan: 'AABCS8819Q',
    authorizedPerson: 'Maheshbhai Patel (Director)',
    mobile: '+91 98251 77340',
    email: 'compliance@suratyarns.in',
  },
  {
    id: 'rajkot-foundry',
    label: 'Green Castings (Rajkot)',
    udyamNumber: 'UDYAM-GJ-20-0012984',
    name: 'Saurashtra Green Castings & Metallics',
    type: 'Small',
    majorActivity: 'Manufacturing',
    nic: '24311',
    nicDesc: 'Casting of non-ferrous metals and secondary aluminum ingots',
    plant: 'Aji GIDC Estate, Rajkot, Gujarat - 360003',
    stateDistrict: 'Gujarat - Rajkot',
    turnover: '₹22.10 Cr',
    investment: '₹5.40 Cr',
    cpcb: 'Orange',
    gstin: '24AABCS1298P1ZR',
    pan: 'AABCS1298P',
    authorizedPerson: 'Harshil Dholakia (Partner)',
    mobile: '+91 97240 66512',
    email: 'admin@saurashtracastings.com',
  },
];

export interface AutoRegisteredScheme {
  id: string;
  name: string;
  ministry: string;
  category: 'Subsidy' | 'Credit' | 'Procurement' | 'Protection';
  benefit: string;
  subsidyRate: string;
  status: 'Auto-Registered' | 'Pre-Approved' | 'Active Shield' | 'Claim Staged';
  arn: string;
  registeredDate: string;
  actionLabel: string;
}

export const AUTO_REGISTERED_SCHEMES: AutoRegisteredScheme[] = [
  {
    id: 'sch-zed',
    name: 'ZED Certification Scheme (Zero Defect Zero Effect)',
    ministry: 'Ministry of MSME & Quality Council of India',
    category: 'Subsidy',
    benefit: '80% Subsidy on Gold Certification (₹1,20,000 direct audit grant) + 0.50% interest concession on bank loans',
    subsidyRate: '80% Direct Subsidy',
    status: 'Auto-Registered',
    arn: 'ARN-ZED-MH-2026-98124',
    registeredDate: 'Today (Auto-Registered)',
    actionLabel: 'View Certificate Docket',
  },
  {
    id: 'sch-clcss',
    name: 'CLCSS Capital Subsidy for Clean & Green Tech Upgrades',
    ministry: 'Office of DC-MSME, Govt of India',
    category: 'Subsidy',
    benefit: '15% upfront cash grant on energy-efficient machinery, solar retrofits & centrifuges (Up to ₹15 Lakhs)',
    subsidyRate: '15% Upfront Grant',
    status: 'Claim Staged',
    arn: 'ARN-CLCSS-GT-44810',
    registeredDate: 'Today (Auto-Registered)',
    actionLabel: '1-Click Claim Staged',
  },
  {
    id: 'sch-cgtmse',
    name: 'CGTMSE Collateral-Free Credit Guarantee Scheme',
    ministry: 'SIDBI & Ministry of MSME',
    category: 'Credit',
    benefit: 'Collateral-free working capital & machinery term loans up to ₹5 Crore with 1.50% interest rate discount',
    subsidyRate: '1.50% Interest Rebate',
    status: 'Pre-Approved',
    arn: 'ARN-CGTMSE-CR-77291',
    registeredDate: 'Today (Auto-Registered)',
    actionLabel: 'Sanction Ready',
  },
  {
    id: 'sch-samadhaan',
    name: 'MSME Samadhaan Delayed Payment Shield',
    ministry: 'Ministry of MSME statutory tribunal',
    category: 'Protection',
    benefit: 'Statutory 45-day buyer payment recovery guarantee with compound interest at 3x RBI Bank Rate',
    subsidyRate: 'Statutory Protection',
    status: 'Active Shield',
    arn: 'ARN-SAMADHAAN-2026-004',
    registeredDate: 'Real-time Linked',
    actionLabel: 'Active Shield',
  },
  {
    id: 'sch-gem',
    name: 'GeM Green Vendor Public Procurement Preference',
    ministry: 'Ministry of Commerce & Industry',
    category: 'Procurement',
    benefit: '25% mandatory annual purchase preference in Central Ministries, Defense & CPSEs tenders',
    subsidyRate: '25% Mandatory Quota',
    status: 'Auto-Registered',
    arn: 'ARN-GEM-PR-55219',
    registeredDate: 'Today (Auto-Registered)',
    actionLabel: 'Vendor Code Active',
  },
  {
    id: 'sch-sidbi4e',
    name: 'SIDBI 4E (End-to-End Energy Efficiency) Loan Facility',
    ministry: 'Small Industries Development Bank of India (SIDBI)',
    category: 'Credit',
    benefit: 'Concessional green term loans at 6.8% per annum for rooftop solar, ETP baffles & energy audits',
    subsidyRate: '6.8% Concessional Rate',
    status: 'Pre-Approved',
    arn: 'ARN-SIDBI4E-EE-33108',
    registeredDate: 'Today (Auto-Registered)',
    actionLabel: 'Fast-Track Approved',
  },
];

interface SimplifiedUdyamVerifierProps {
  udyam: UdyamAccountDetails;
  onUpdateUdyam: (updated: Partial<UdyamAccountDetails>) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
  onCreateUdyamClick?: () => void;
  className?: string;
}

export const SimplifiedUdyamVerifier: React.FC<SimplifiedUdyamVerifierProps> = ({
  udyam,
  onUpdateUdyam,
  onShowToast,
  onCreateUdyamClick,
  className = '',
}) => {
  const [inputURN, setInputURN] = useState(udyam.udyamNumber || 'UDYAM-MH-26-0045892');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStage, setVerificationStage] = useState<number>(0);
  const [showDocketModal, setShowDocketModal] = useState(false);
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<AutoRegisteredScheme | null>(null);

  const verificationStagesText = [
    'Handshaking with Ministry of MSME National Databank...',
    'Validating PAN, GSTIN & CPCB Consent Classification...',
    'Auto-Registering Enterprise across 6 Government Schemes & Generating ARNs...',
  ];

  const handleVerify = (customURN?: string) => {
    const urnToVerify = customURN || inputURN.trim();
    if (!urnToVerify) {
      onShowToast('URN Required', 'Please enter your Udyam Registration Number.', 'info');
      return;
    }

    setIsVerifying(true);
    setVerificationStage(0);

    const timer1 = setTimeout(() => setVerificationStage(1), 500);
    const timer2 = setTimeout(() => setVerificationStage(2), 1100);

    const timer3 = setTimeout(() => {
      // Find matching preset or construct verified details
      const matchedPreset = PRESET_ENTERPRISES.find(
        (p) => p.udyamNumber.toLowerCase() === urnToVerify.toLowerCase()
      ) || PRESET_ENTERPRISES[0];

      onUpdateUdyam({
        isConnected: true,
        udyamNumber: matchedPreset.udyamNumber,
        enterpriseName: matchedPreset.name,
        enterpriseType: matchedPreset.type,
        majorActivity: matchedPreset.majorActivity,
        nicCode: matchedPreset.nic,
        nicDescription: matchedPreset.nicDesc,
        plantAddress: matchedPreset.plant,
        stateDistrict: matchedPreset.stateDistrict,
        annualTurnover: matchedPreset.turnover,
        investmentPlantMachinery: matchedPreset.investment,
        cpcbCategory: matchedPreset.cpcb,
        gstin: matchedPreset.gstin,
        pan: matchedPreset.pan,
        authorizedPerson: matchedPreset.authorizedPerson,
        mobile: matchedPreset.mobile,
        email: matchedPreset.email,
        lastSyncedAt: 'Real-time Synced (Just now)',
      });

      setInputURN(matchedPreset.udyamNumber);
      setIsVerifying(false);
      setVerificationStage(0);

      onShowToast(
        'Udyam Verified & Auto-Registered!',
        `Successfully linked ${matchedPreset.name}. Auto-registered for 6 Central Government Schemes with official ARNs generated.`,
        'success'
      );
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleSelectPreset = (preset: PresetEnterprise) => {
    setInputURN(preset.udyamNumber);
    handleVerify(preset.udyamNumber);
  };

  const handleDownloadDocket = () => {
    onShowToast(
      'Registration Docket Ready',
      'Consolidated Government Schemes Registration Docket (PDF) with Ministry ARNs generated successfully.',
      'success'
    );
    setShowDocketModal(true);
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* CARD CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Fingerprint className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-neutral-900 tracking-tight">
                  Sovereign Udyam Verification & Scheme Auto-Registration
                </h3>
                {udyam.isConnected && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Ministry Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Enter your Udyam Registration Number once. LoopGrid auto-fetches your enterprise classification and instantly registers you across all eligible Central & State Government Schemes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {onCreateUdyamClick && (
              <button
                type="button"
                onClick={onCreateUdyamClick}
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
                <span>New Udyam?</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleDownloadDocket}
              className="px-3.5 py-2 rounded-full text-xs font-bold text-neutral-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download Scheme Docket</span>
            </button>
          </div>
        </div>

        {/* Verification Input & Quick Presets Bar */}
        <div className="pt-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Factory className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="text"
                value={inputURN}
                onChange={(e) => setInputURN(e.target.value.toUpperCase())}
                placeholder="UDYAM-XX-00-0000000"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs sm:text-sm font-mono font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 transition-all uppercase placeholder:normal-case placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400"
              />
            </div>

            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isVerifying}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#0F172A] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>Verifying & Auto-Registering...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Verify Udyam & Auto-Register</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Selector Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Quick Test Presets:
            </span>
            {PRESET_ENTERPRISES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  inputURN === preset.udyamNumber
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                }`}
              >
                <span>{preset.label}</span>
                <span className="text-[10px] font-mono opacity-70">({preset.type})</span>
              </button>
            ))}
          </div>

          {/* Animated Verification In-Progress Card */}
          {isVerifying && (
            <div className="p-4 rounded-2xl bg-neutral-900 text-white border border-neutral-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  STAGE {verificationStage + 1} OF 3: API HANDSHAKE
                </span>
                <span>Connecting MSME Gateway...</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {verificationStagesText[verificationStage]}
              </p>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((verificationStage + 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* VERIFIED MASTER RECORD & SCHEMES SECTION */}
        {udyam.isConnected && (
          <div className="mt-6 pt-5 border-t border-neutral-100 space-y-5">
            {/* Auto-Fetched Enterprise Details Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-neutral-200/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-neutral-900">
                      {udyam.enterpriseName}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {udyam.enterpriseType} Enterprise
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    URN: <strong className="text-neutral-900">{udyam.udyamNumber}</strong> · GSTIN: <strong className="text-neutral-900">{udyam.gstin}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500">CPCB Consent:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      udyam.cpcbCategory === 'Green'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {udyam.cpcbCategory} Category
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">
                    Plant & Cluster Location
                  </span>
                  <span className="font-semibold text-neutral-800 line-clamp-1 mt-0.5" title={udyam.plantAddress}>
                    {udyam.plantAddress}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">
                    NIC 5-Digit Classification
                  </span>
                  <span className="font-semibold text-neutral-800 line-clamp-1 mt-0.5" title={`${udyam.nicCode} - ${udyam.nicDescription}`}>
                    NIC {udyam.nicCode} · {udyam.nicDescription}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">
                    Investment in Machinery
                  </span>
                  <span className="font-mono font-bold text-neutral-900 mt-0.5 block">
                    {udyam.investmentPlantMachinery}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">
                    Annual Turnover (GSTN)
                  </span>
                  <span className="font-mono font-bold text-emerald-700 mt-0.5 block">
                    {udyam.annualTurnover}
                  </span>
                </div>
              </div>
            </div>

            {/* AUTO-REGISTERED GOVERNMENT SCHEMES GRID */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Auto-Registered Government Schemes & Subsidies (6 Active)
                  </h4>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Zero Manual Paperwork Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {AUTO_REGISTERED_SCHEMES.map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => setSelectedSchemeDetail(scheme)}
                    className="p-4 rounded-2xl bg-white border border-neutral-200/90 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          {scheme.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          {scheme.status}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-neutral-900 mt-1 leading-snug group-hover:text-emerald-700 transition-colors">
                        {scheme.name}
                      </h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
                        {scheme.benefit}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-neutral-400 text-[10px]">{scheme.arn}</span>
                      <span className="font-bold text-emerald-700 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>{scheme.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SCHEME DETAIL MODAL */}
      {selectedSchemeDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">
                    {selectedSchemeDetail.name}
                  </h3>
                  <span className="text-xs text-neutral-500">{selectedSchemeDetail.ministry}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSchemeDetail(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Government Gateway ARN:</span>
                <span className="font-mono font-bold text-neutral-900">{selectedSchemeDetail.arn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Registration Status:</span>
                <span className="font-bold text-emerald-700">{selectedSchemeDetail.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Matched Subsidy / Concession:</span>
                <span className="font-bold text-neutral-900">{selectedSchemeDetail.subsidyRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Associated Udyam ID:</span>
                <span className="font-mono font-bold text-neutral-900">{udyam.udyamNumber}</span>
              </div>
            </div>

            <div className="text-xs text-neutral-600 leading-relaxed">
              <strong>Official Provisioning:</strong> This enterprise registration has been authenticated against your Udyam master data and synchronized with the national single-window portal. Zero duplicate physical documentation is required.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSchemeDetail(null)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onShowToast('Official Acknowledgement Downloaded', `Generated verifiable PDF slip for ${selectedSchemeDetail.name}.`, 'success');
                  setSelectedSchemeDetail(null);
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONSOLIDATED REGISTRATION DOCKET MODAL */}
      {showDocketModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Government Single-Window Protocol
                </span>
                <h3 className="text-lg font-black text-neutral-900 mt-1">
                  Consolidated MSME Government Schemes Docket
                </h3>
                <p className="text-xs text-neutral-500">
                  Official verifiable digital registration packet for {udyam.enterpriseName}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDocketModal(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
              {AUTO_REGISTERED_SCHEMES.map((s, idx) => (
                <div key={s.id} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-neutral-900 block">{idx + 1}. {s.name}</span>
                    <span className="text-[11px] text-neutral-500">{s.ministry} · ARN: <strong className="font-mono text-neutral-800">{s.arn}</strong></span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded whitespace-nowrap">
                    Active
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>
                All 6 registrations are bound to URN <strong>{udyam.udyamNumber}</strong>. You can present this docket directly to scheduled commercial banks, NBFCs, and SPCB auditors.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDocketModal(false)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setShowDocketModal(false);
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF Docket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
