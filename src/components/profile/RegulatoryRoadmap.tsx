import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
  Download,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  RefreshCw,
  Building2,
  FileCheck2,
  MapPin,
  Scale,
  Award,
} from 'lucide-react';
import { UdyamAccountDetails } from './ComplianceScorePage';

interface RegulatoryRoadmapProps {
  udyam: UdyamAccountDetails;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
  className?: string;
}

export interface StateRegulatoryItem {
  id: string;
  gazetteOrderNo: string;
  stateAuthority: string;
  stateCode: 'MH' | 'GJ' | 'KA' | 'TN' | 'DL' | 'CENTRAL';
  title: string;
  aiIndustryMapping: string;
  relevanceScore: number; // e.g. 96%
  statutoryDeadline: string;
  daysRemaining: number;
  penaltyRisk: string;
  documentRequired: string;
  status: 'Draft Ready' | 'Urgent Action' | 'Scheduled' | 'Auto-Complied';
  filedArn?: string;
}

export const RegulatoryRoadmap: React.FC<RegulatoryRoadmapProps> = ({
  udyam,
  onShowToast,
  className = '',
}) => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isScanningAi, setIsScanningAi] = useState(false);
  const [activeFilingModal, setActiveFilingModal] = useState<StateRegulatoryItem | null>(null);
  const [isSubmittingFiling, setIsSubmittingFiling] = useState(false);
  const [submissionSuccessModal, setSubmissionSuccessModal] = useState<{
    item: StateRegulatoryItem;
    arn: string;
  } | null>(null);

  // Initial State-Level Notifications mapped to User's Industry (NIC 25920 / CNC Machining)
  const [regulatoryItems, setRegulatoryItems] = useState<StateRegulatoryItem[]>([
    {
      id: 'reg-mpcb-01',
      gazetteOrderNo: 'MPCB/RO-PUNE/CONSENT/2026/04',
      stateAuthority: 'Maharashtra Pollution Control Board (MPCB)',
      stateCode: 'MH',
      title: 'Mandatory Real-Time Effluent Monitoring & Coolant Neutralization',
      aiIndustryMapping:
        'AI detected 96% match with your CNC Lathe turning operations (Plot 44, MIDC Chakan). Requires Form 10 hazardous waste manifest submission and closed-loop coolant pH log.',
      relevanceScore: 96,
      statutoryDeadline: 'Due in 14 Days (Nov 2, 2026)',
      daysRemaining: 14,
      penaltyRisk: '₹50,000 statutory fine + Consent to Operate freeze',
      documentRequired: 'Coolant Treatment Log & Manifest Form 10',
      status: 'Draft Ready',
    },
    {
      id: 'reg-cpcb-epr',
      gazetteOrderNo: 'CPCB/EPR-WASTE/NOTIF-2026/91',
      stateAuthority: 'Central Pollution Control Board (CPCB / MoEFCC)',
      stateCode: 'CENTRAL',
      title: 'Extended Producer Responsibility (EPR) Annual Packaging Return',
      aiIndustryMapping:
        'Maps to your component packaging crates & wooden pallets. Auto-aggregates inward/outward weight manifests from GST invoices with zero manual data entry.',
      relevanceScore: 92,
      statutoryDeadline: 'Due in 28 Days (Nov 16, 2026)',
      daysRemaining: 28,
      penaltyRisk: '₹1,00,000 environmental compensation fine',
      documentRequired: 'EPR Plastic/Wood Quarterly Reconciliation Slip',
      status: 'Draft Ready',
    },
    {
      id: 'reg-bee-motors',
      gazetteOrderNo: 'BEE/PAT-MSME/NOTIF-18/2026',
      stateAuthority: 'Bureau of Energy Efficiency (BEE)',
      stateCode: 'CENTRAL',
      title: 'Mandatory Energy Efficiency Performance Return for Heavy Motors',
      aiIndustryMapping:
        'Applies to 45kW and above factory compressor and hydraulic pump motors. Your installed IE4 VFD retrofits auto-qualify for Star compliance.',
      relevanceScore: 89,
      statutoryDeadline: 'Due in 45 Days (Dec 3, 2026)',
      daysRemaining: 45,
      penaltyRisk: 'Power surcharge at ₹2.40/kWh peak tariff',
      documentRequired: 'Factory Connected Load Performance Form A',
      status: 'Scheduled',
    },
    {
      id: 'reg-mpcb-cto',
      gazetteOrderNo: 'MPCB/FAST-TRACK/CTO-RENEWAL/2026',
      stateAuthority: 'Maharashtra Pollution Control Board (MPCB)',
      stateCode: 'MH',
      title: '5-Year Consolidated Green Channel CTO Renewal (Orange/Green Category)',
      aiIndustryMapping:
        'Your enterprise has achieved ZED Gold pre-qualification, making you eligible for 5-Year automated Consent to Operate renewal without physical inspection.',
      relevanceScore: 98,
      statutoryDeadline: 'Due in 65 Days (Jan 10, 2027)',
      daysRemaining: 65,
      penaltyRisk: 'Suspension of factory electricity connection',
      documentRequired: 'Self-Certification Affidavit & ZED Certificate',
      status: 'Scheduled',
    },
    {
      id: 'reg-gpcb-scrap',
      gazetteOrderNo: 'GPCB/CIRCULAR-WASTE-2026/12',
      stateAuthority: 'Gujarat Pollution Control Board (GPCB)',
      stateCode: 'GJ',
      title: 'Inter-State Secondary Non-Ferrous Scrap Transit Clearance',
      aiIndustryMapping:
        'Maps to cross-border swarf & alloy dispatches between Pune MIDC and Rajkot/Surat foundries. Auto-attaches electronic transit e-way manifests.',
      relevanceScore: 84,
      statutoryDeadline: 'Due in 80 Days (Feb 2027)',
      daysRemaining: 80,
      penaltyRisk: 'Lorry detention and 200% GST penalty at border',
      documentRequired: 'Form 9 Transit Permit & Recycler Certificate',
      status: 'Scheduled',
    },
    {
      id: 'reg-haz-manifest',
      gazetteOrderNo: 'CPCB/HAZ-WASTE/FORM-10/2026-Q3',
      stateAuthority: 'Ministry of Environment, Forest & Climate Change',
      stateCode: 'CENTRAL',
      title: 'Quarterly Hazardous Swarf & Used Oil Consignment Return',
      aiIndustryMapping:
        'Auto-synced with LoopGrid verified secondary foundries. 4.8 Metric Tons of cleaned lathe turnings accounted for with zero manifest leakage.',
      relevanceScore: 99,
      statutoryDeadline: 'Complied (Q3 Cycle)',
      daysRemaining: 0,
      penaltyRisk: 'Zero (Compliant)',
      documentRequired: 'Verified Receiver Consignment Slip',
      status: 'Auto-Complied',
      filedArn: 'ARN-CPCB-FORM10-2026-99214',
    },
  ]);

  // Filtered List
  const filteredItems = regulatoryItems.filter((item) => {
    const matchesState = selectedState === 'ALL' || item.stateCode === selectedState;
    const matchesStatus =
      selectedStatus === 'ALL' ||
      (selectedStatus === 'URGENT' && item.daysRemaining > 0 && item.daysRemaining <= 30) ||
      (selectedStatus === 'SCHEDULED' && item.daysRemaining > 30) ||
      (selectedStatus === 'COMPLIED' && item.status === 'Auto-Complied');
    return matchesState && matchesStatus;
  });

  // AI Scanning Simulation
  const handleScanGazettes = () => {
    setIsScanningAi(true);
    setTimeout(() => {
      setIsScanningAi(false);
      onShowToast(
        'AI Gazette Radar Updated',
        'Scanned 48 Central & State gazette notifications. Mapped 6 active requirements to your NIC 25920 profile with zero regulatory blindspots.',
        'success'
      );
    }, 1500);
  };

  // 1-Click Submission Trigger
  const handleOpenFilingModal = (item: StateRegulatoryItem) => {
    setActiveFilingModal(item);
  };

  const handleConfirmFiling = () => {
    if (!activeFilingModal) return;
    setIsSubmittingFiling(true);

    setTimeout(() => {
      const generatedArn = `ARN-${activeFilingModal.stateCode}-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      setRegulatoryItems((prev) =>
        prev.map((item) =>
          item.id === activeFilingModal.id
            ? {
                ...item,
                status: 'Auto-Complied',
                filedArn: generatedArn,
                daysRemaining: 0,
                penaltyRisk: 'Zero (Protected)',
              }
            : item
        )
      );

      setIsSubmittingFiling(false);
      const filedItem = { ...activeFilingModal, filedArn: generatedArn, status: 'Auto-Complied' as const };
      setActiveFilingModal(null);
      setSubmissionSuccessModal({ item: filedItem, arn: generatedArn });

      onShowToast(
        'State Filing Successful!',
        `Official Acknowledgement ${generatedArn} issued by ${filedItem.stateAuthority}. Compliance fully verified.`,
        'success'
      );
    }, 1400);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* HEADER CARD WITH AI RADAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI REGULATORY RADAR ACTIVE</span>
              </span>
              <span className="text-xs text-neutral-500">
                · Mapped to NIC {udyam.nicCode} ({udyam.nicDescription})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              State-Level Regulatory Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              Every time a new gazette notification drops at the state or central level, LoopGrid instantly maps it to your specific industry classification, auto-generates the required paperwork, and enables 1-click submission before fines occur.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleScanGazettes}
              disabled={isScanningAi}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-neutral-800 transition-all cursor-pointer shadow-md inline-flex items-center gap-2 disabled:opacity-70"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isScanningAi ? 'animate-spin' : ''}`} />
              <span>{isScanningAi ? 'Scanning Gazettes...' : 'Scan State Gazettes (AI Sync)'}</span>
            </button>
          </div>
        </div>

        {/* FILTERS & STATS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
          {/* State Authority Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Authority:
            </span>
            {[
              { id: 'ALL', label: 'All Jurisdictions' },
              { id: 'MH', label: 'Maharashtra (MPCB)' },
              { id: 'GJ', label: 'Gujarat (GPCB)' },
              { id: 'CENTRAL', label: 'Central (CPCB/MoEFCC)' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedState(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedState === st.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedStatus === 'ALL'
                  ? 'bg-neutral-200 text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All (6)
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('URGENT')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'URGENT'
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-neutral-500 hover:text-rose-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Urgent (&lt;30d)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('COMPLIED')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'COMPLIED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-neutral-500 hover:text-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Complied</span>
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS ROADMAP CARDS */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs ${
              item.status === 'Auto-Complied'
                ? 'bg-white border-neutral-200/90'
                : item.daysRemaining <= 14
                ? 'bg-white border-rose-300 ring-1 ring-rose-100'
                : 'bg-white border-neutral-200/90 hover:border-emerald-500/80'
            }`}
          >
            {/* Left Content */}
            <div className="space-y-3 flex-1 min-w-0">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded">
                  {item.gazetteOrderNo}
                </span>
                <span className="font-semibold text-neutral-700">{item.stateAuthority}</span>
                <span className="text-neutral-300">·</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.relevanceScore}% AI Match
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-neutral-900 leading-snug">
                {item.title}
              </h3>

              {/* AI Mapping Explanation */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-bold block mb-0.5">
                    AI Industry Mapping for {udyam.enterpriseName}:
                  </strong>
                  <span>{item.aiIndustryMapping}</span>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>
                    Deadline: <strong className="text-neutral-900">{item.statutoryDeadline}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>
                    Penalty Risk: <strong className="text-rose-700">{item.penaltyRisk}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>
                    Required: <strong className="text-neutral-800">{item.documentRequired}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:w-60 flex-shrink-0 flex flex-col justify-between items-stretch lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
              {item.status === 'Auto-Complied' ? (
                <div className="w-full text-right space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complied & Verified</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 block truncate">
                    ARN: {item.filedArn}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onShowToast('Receipt Downloaded', `Official acknowledgement receipt ${item.filedArn} saved as PDF.`, 'success');
                      window.print();
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              ) : (
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between lg:justify-end gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.daysRemaining <= 14
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenFilingModal(item)}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-[#0F172A] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>1-Click Auto-Draft & File</span>
                  </button>
                  <span className="text-[10px] text-center text-neutral-400 block">
                    Zero manual paperwork required
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 1-CLICK AUTO-DRAFT & TRANSMIT MODAL */}
      {activeFilingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">
                    1-Click AI Gazette Filing & Gateway Transmit
                  </h3>
                  <span className="text-xs text-neutral-500">{activeFilingModal.stateAuthority}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveFilingModal(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Prepared Dossier Overview */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Gazette Order Ref:</span>
                <strong className="font-mono text-neutral-900">{activeFilingModal.gazetteOrderNo}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Target Enterprise:</span>
                <span className="font-bold text-neutral-900">{udyam.enterpriseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Master Udyam Registration:</span>
                <span className="font-mono font-bold text-neutral-900">{udyam.udyamNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Attached Manifests:</span>
                <span className="font-semibold text-emerald-700">GSTN Swarf Invoices + ZED Gold Voucher</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <strong className="font-bold block">AI Verification Certificate:</strong>
              <p>
                LoopGrid has compiled your operational parameters against {activeFilingModal.stateAuthority} single-window requirements. Upon confirmation, your filing will be cryptographically signed using your Master Udyam credentials and submitted directly to the State Pollution Control Server.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveFilingModal(null)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFiling}
                disabled={isSubmittingFiling}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5 disabled:opacity-70"
              >
                {isSubmittingFiling ? (
                  <span>Transmitting to State Gateway...</span>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Confirm & Transmit Filing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION SUCCESS MODAL */}
      {submissionSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 animate-in zoom-in-95 duration-150 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Official Gateway Success
              </span>
              <h3 className="text-lg font-black text-neutral-900 mt-2">
                Statutory Return Filed & Validated!
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Your statutory declaration has been accepted by {submissionSuccessModal.item.stateAuthority}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-sans">Acknowledgement ARN:</span>
                <strong className="text-neutral-900">{submissionSuccessModal.arn}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-sans">Timestamp:</span>
                <span className="text-neutral-700">{new Date().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-sans">Status:</span>
                <span className="text-emerald-700 font-bold">APPROVED & ARCHIVED</span>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSubmissionSuccessModal(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setSubmissionSuccessModal(null);
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Official Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
