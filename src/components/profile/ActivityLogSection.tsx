import React, { useState, useMemo } from 'react';
import {
  FileText,
  PlusCircle,
  ArrowLeftRight,
  Truck,
  CheckCircle2,
  Award,
  Search,
  Download,
  ExternalLink,
  Copy,
  Check,
  Filter,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ActivityLogRecord {
  id: string;
  timestamp: string;
  relativeTime: string;
  action: 'REGISTERED' | 'TRADED' | 'DISPATCHED' | 'ASSAY_VERIFIED' | 'SETTLED' | 'INSPECTED';
  actionLabel: string;
  lotId: string;
  drpId: string;
  resourceName: string;
  category: string;
  grade: string;
  quantity: string;
  financialValue: string;
  counterparty: string;
  counterpartyRole: string;
  facilityLocation: string;
  txHash: string;
  status: 'COMPLETED' | 'IN_TRANSIT' | 'PROCESSING' | 'PENDING';
  notes: string;
}

export const INITIAL_ACTIVITY_LOGS: ActivityLogRecord[] = [
  {
    id: 'act-001',
    timestamp: 'Oct 16, 2026 • 11:42 AM',
    relativeTime: '15m ago',
    action: 'DISPATCHED',
    actionLabel: 'Transit Partner Assigned & Dispatched',
    lotId: 'LG-AL-402',
    drpId: 'DRP-2026-AL-8921',
    resourceName: 'CNC Aluminum 6061-T6 Swarf',
    category: 'Metals & Alloys',
    grade: 'Aerospace Spec 6061-T6 (Si 0.6%, Mg 1.0%)',
    quantity: '500 kg',
    financialValue: '₹42,500',
    counterparty: 'Hindalco Ancillary Smelters Corp',
    counterpartyRole: 'Secondary Smelter',
    facilityLocation: 'En Route on NH-48 Express (KM 34 Milestone)',
    txHash: '0x8f2a99182c941e7bf209a88fa1',
    status: 'IN_TRANSIT',
    notes: 'Dispatched via VRL Industrial Cargo Fleet (Truck KA-04-E-2201). Driver: Ramesh Gowda.',
  },
  {
    id: 'act-002',
    timestamp: 'Oct 16, 2026 • 09:15 AM',
    relativeTime: '2h ago',
    action: 'REGISTERED',
    actionLabel: 'Residual Scrap Registered & DRP Generated',
    lotId: 'LG-AL-402',
    drpId: 'DRP-2026-AL-8921',
    resourceName: 'CNC Aluminum 6061-T6 Swarf',
    category: 'Metals & Alloys',
    grade: 'Aerospace Spec 6061-T6 Purity 99.4%',
    quantity: '500 kg',
    financialValue: '₹42,500',
    counterparty: 'Apex Precision Works (Self)',
    counterpartyRole: 'MSME Generator Node',
    facilityLocation: 'Peenya Industrial Area, Bengaluru',
    txHash: '0x3c81e9f42b1098aa76c5412891',
    status: 'COMPLETED',
    notes: 'Cryptographic digital resource passport minted with Spectro Metallurgical batch verification.',
  },
  {
    id: 'act-003',
    timestamp: 'Oct 15, 2026 • 04:30 PM',
    relativeTime: 'Yesterday',
    action: 'TRADED',
    actionLabel: 'Bidded & Procured in Spot Marketplace',
    lotId: 'LG-TX-109',
    drpId: 'DRP-2026-TX-4112',
    resourceName: 'Denim Selvedge Raw Fiber Bales',
    category: 'Textiles & Leather',
    grade: 'Pure Indigo Dyed Cellulose 400 GSM',
    quantity: '1.2 MT',
    financialValue: '₹28,800',
    counterparty: 'Auto Acoustic Matting Ltd',
    counterpartyRole: 'Recycling Processing Buyer',
    facilityLocation: 'Surat Textile Zone Baling Depot #4',
    txHash: '0x4e1b8201d883f2a10599c43b',
    status: 'PROCESSING',
    notes: 'Buyer matched via algorithm. Escrow funding locked for Golden Corridor shipment.',
  },
  {
    id: 'act-004',
    timestamp: 'Oct 14, 2026 • 02:10 PM',
    relativeTime: '2 days ago',
    action: 'ASSAY_VERIFIED',
    actionLabel: 'NABL Certified Chemical Assay Verified',
    lotId: 'LG-PL-311',
    drpId: 'DRP-2026-PL-7729',
    resourceName: 'High-Density Polyethylene Sprues',
    category: 'Polymers & Plastics',
    grade: 'MFI 0.35 g/10min Blow-Molding Grade',
    quantity: '850 kg',
    financialValue: '₹34,000',
    counterparty: 'Supreme Polymer Recyclers & Extruders',
    counterpartyRole: 'Secondary Smelter',
    facilityLocation: 'CIPET Testing Lab, Guindy MIDC',
    txHash: '0x992b4510e41108c3584120ca',
    status: 'COMPLETED',
    notes: 'CIPET density 0.952 g/cm³ and tensile yield 28 MPa certified with zero halogen contaminants.',
  },
  {
    id: 'act-005',
    timestamp: 'Oct 12, 2026 • 05:45 PM',
    relativeTime: '4 days ago',
    action: 'SETTLED',
    actionLabel: 'T+1 Escrow Payout Successfully Disbursed',
    lotId: 'LG-OL-088',
    drpId: 'DRP-2026-OL-0391',
    resourceName: 'Reclaimed Hydraulic Mineral Oil',
    category: 'Industrial Lubricants',
    grade: 'ISO VG 46 (Moisture <0.04%, PCB Free)',
    quantity: '200 L',
    financialValue: '₹18,400',
    counterparty: 'EcoLube Re-Refinery Hub',
    counterpartyRole: 'Re-Refining Buyer',
    facilityLocation: 'Thane MIDC Terminal',
    txHash: '0x17dce091a320b9e847701ac3',
    status: 'COMPLETED',
    notes: 'Direct RTGS credit credited to Current Account (UTR: CMS-HDFC-2026-44910283). Platform fee 4.0% settled.',
  },
  {
    id: 'act-006',
    timestamp: 'Oct 10, 2026 • 10:20 AM',
    relativeTime: '6 days ago',
    action: 'TRADED',
    actionLabel: 'High-Purity Copper Lot Contract Executed',
    lotId: 'LG-CU-512',
    drpId: 'DRP-2026-CU-1104',
    resourceName: 'Heavy Copper Millberry Wire Scrap',
    category: 'Metals & Alloys',
    grade: 'IS 191 Grade-A (Purity 99.8%)',
    quantity: '1.8 MT',
    financialValue: '₹1,53,000',
    counterparty: 'Vedanta Ancillary Ingot Foundry',
    counterpartyRole: 'Secondary Smelter',
    facilityLocation: 'Doddaballapur Metallurgical Park',
    txHash: '0x6a10de44719bb3298a0021ce',
    status: 'COMPLETED',
    notes: 'Furnace ingestion yield verified at 99.2%. Savings vs virgin cathode calculated at 24.5%.',
  },
  {
    id: 'act-007',
    timestamp: 'Oct 08, 2026 • 03:00 PM',
    relativeTime: '8 days ago',
    action: 'REGISTERED',
    actionLabel: 'Brass Turnings Registered for Circular Match',
    lotId: 'LG-BR-201',
    drpId: 'DRP-2026-BR-9032',
    resourceName: 'Free Cutting Brass Turnings C360',
    category: 'Metals & Alloys',
    grade: 'Cu 60-63%, Pb 2.5-3.7%, Zn Balance',
    quantity: '750 kg',
    financialValue: '₹62,250',
    counterparty: 'Jamnagar Precision Parts Works',
    counterpartyRole: 'Secondary Smelter',
    facilityLocation: 'Peenya Ancillary Cluster #2',
    txHash: '0x7c4912ab089ff532109867ea',
    status: 'COMPLETED',
    notes: 'Lot registered with spectrochemical analysis report and weight calibration slip.',
  },
];

interface ActivityLogSectionProps {
  onInspectDrp: (drpId: string) => void;
  onRegisterNewAsset?: () => void;
  isCompact?: boolean;
  maxCompactItems?: number;
}

export const ActivityLogSection: React.FC<ActivityLogSectionProps> = ({
  onInspectDrp,
  onRegisterNewAsset,
  isCompact = false,
  maxCompactItems = 4,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'REGISTERED' | 'TRADED' | 'DISPATCHED' | 'SETTLED'>('ALL');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Filtered Activity Records
  const filteredActivities = useMemo(() => {
    return INITIAL_ACTIVITY_LOGS.filter((item) => {
      // Action filter
      if (selectedFilter !== 'ALL') {
        if (selectedFilter === 'REGISTERED' && item.action !== 'REGISTERED') return false;
        if (selectedFilter === 'TRADED' && item.action !== 'TRADED') return false;
        if (selectedFilter === 'DISPATCHED' && item.action !== 'DISPATCHED') return false;
        if (selectedFilter === 'SETTLED' && item.action !== 'SETTLED') return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.resourceName.toLowerCase().includes(query);
        const matchesLot = item.lotId.toLowerCase().includes(query);
        const matchesDrp = item.drpId.toLowerCase().includes(query);
        const matchesCounterparty = item.counterparty.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesLot || matchesDrp || matchesCounterparty || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedFilter]);

  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Export PDF with full statutory audit report layout
  const handleExportPDF = () => {
    try {
      setIsExportingPdf(true);
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const todayStr = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timeStr = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const generatedTimestamp = `${todayStr} • ${timeStr}`;
      const docAuditId = `LG-AUDIT-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Brand Top Banner
      doc.setFillColor(0, 135, 90); // LoopGrid Emerald #00875A
      doc.rect(0, 0, 297, 18, 'F');

      // Top Banner Text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('LOOPGRID INDUSTRIAL RESOURCE NETWORK', 14, 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(230, 245, 235);
      doc.text('SOVEREIGN AUDIT TRAIL & RESOURCE TRACEABILITY LEDGER', 283, 11, { align: 'right' });

      // Document Meta Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 23, 269, 22, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(25, 28, 30);
      doc.text('Official Statutory Audit Report: Industrial Resource Lifecycle Activity', 18, 30);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Audit Reference: ${docAuditId}`, 18, 36);
      doc.text(`Generated: ${generatedTimestamp}`, 18, 41);

      doc.text(`Scope / Filter: ${selectedFilter === 'ALL' ? 'Complete Ledger (All Events)' : selectedFilter}`, 105, 36);
      doc.text(`Total Records: ${filteredActivities.length} Ledger Entries`, 105, 41);

      doc.text('Verification Standard: SHA-256 Cryptographic Hash', 195, 36);
      doc.text('Statutory Mandate: CPCB 2026 / NABL 17025 Compliant', 195, 41);

      // Prepare Table Data
      const tableHeaders = [
        '#',
        'Date & Time',
        'Lifecycle Event',
        'Lot & DRP ID',
        'Resource & Spec',
        'Quantity',
        'Valuation (INR)',
        'Counterparty / Location',
        'Status',
        'Ledger Tx Hash',
      ];

      const tableRows = filteredActivities.map((item, index) => [
        (index + 1).toString(),
        item.timestamp,
        item.actionLabel,
        `${item.lotId}\n(${item.drpId})`,
        `${item.resourceName}\n[${item.grade}]`,
        item.quantity,
        item.financialValue.replace('₹', 'INR '),
        `${item.counterparty}\n(${item.counterpartyRole})`,
        item.status,
        item.txHash,
      ]);

      autoTable(doc, {
        startY: 49,
        head: [tableHeaders],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [0, 135, 90],
          textColor: [255, 255, 255],
          fontSize: 7.5,
          fontStyle: 'bold',
          halign: 'left',
          valign: 'middle',
          cellPadding: 2.5,
        },
        bodyStyles: {
          fontSize: 7,
          textColor: [30, 41, 59],
          valign: 'top',
          cellPadding: 2,
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 8, halign: 'center' }, // #
          1: { cellWidth: 26 }, // Date & Time
          2: { cellWidth: 38, fontStyle: 'bold' }, // Action
          3: { cellWidth: 30 }, // Lot & DRP
          4: { cellWidth: 42 }, // Resource
          5: { cellWidth: 16, halign: 'right' }, // Qty
          6: { cellWidth: 22, halign: 'right', fontStyle: 'bold' }, // Valuation
          7: { cellWidth: 42 }, // Counterparty
          8: { cellWidth: 20, halign: 'center' }, // Status
          9: { cellWidth: 25, fontSize: 6.5, font: 'courier' }, // Tx Hash
        },
        margin: { left: 14, right: 14, bottom: 18 },
        didDrawPage: (data) => {
          // Footer
          const pageCount = doc.getNumberOfPages();
          const currentPage = data.pageNumber;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(148, 163, 184);

          // Divider line
          doc.setDrawColor(226, 232, 240);
          doc.line(14, 198, 283, 198);

          doc.text(
            'CONFIDENTIAL STATUTORY AUDIT LEDGER • GENERATED BY LOOPGRID DISPATCH & MATERIAL REPOSITORY',
            14,
            203
          );
          doc.text(`Page ${currentPage} of ${pageCount}`, 283, 203, { align: 'right' });
        },
      });

      doc.save(`loopgrid-resource-audit-log-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF audit log:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const getActionBadge = (action: ActivityLogRecord['action']) => {
    switch (action) {
      case 'REGISTERED':
        return {
          icon: <PlusCircle className="w-4 h-4 text-emerald-600" />,
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'REGISTERED',
        };
      case 'TRADED':
        return {
          icon: <ArrowLeftRight className="w-4 h-4 text-sky-600" />,
          bg: 'bg-sky-50 text-sky-800 border-sky-200',
          label: 'TRADED',
        };
      case 'DISPATCHED':
        return {
          icon: <Truck className="w-4 h-4 text-amber-600" />,
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          label: 'IN TRANSIT',
        };
      case 'ASSAY_VERIFIED':
        return {
          icon: <Award className="w-4 h-4 text-purple-600" />,
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          label: 'ASSAY NABL',
        };
      case 'SETTLED':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
          bg: 'bg-green-50 text-green-800 border-green-200',
          label: 'SETTLED',
        };
      default:
        return {
          icon: <FileText className="w-4 h-4 text-neutral-600" />,
          bg: 'bg-neutral-50 text-neutral-800 border-neutral-200',
          label: 'LOGGED',
        };
    }
  };

  const displayList = isCompact ? filteredActivities.slice(0, maxCompactItems) : filteredActivities;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Header Card */}
      {!isCompact && (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 text-white shadow-md border border-neutral-800 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 flex-shrink-0 shadow-xs border border-white/15">
                <FileText className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/15 text-emerald-200">
                    Sovereign Audit Ledger
                  </span>
                  <span className="text-xs text-emerald-300 font-semibold">• Live Traceability</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {t.profile.activityLogTitle || 'Industrial Resource Activity Log'}
                </h3>
                <p className="text-xs text-neutral-300 max-w-xl mt-0.5 leading-relaxed">
                  {t.profile.activityLogSubtitle ||
                    'Verifiable history of industrial resource lots registered, traded, dispatched, assayed, and settled by the enterprise.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleExportPDF}
                disabled={isExportingPdf}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-neutral-900 bg-white hover:bg-neutral-100 transition-all shadow-xs cursor-pointer disabled:opacity-75"
                title="Download official PDF Audit Log for accounting & statutory compliance"
              >
                <Download className={`w-3.5 h-3.5 ${isExportingPdf ? 'animate-bounce' : ''}`} />
                <span>
                  {isExportingPdf
                    ? 'Generating PDF...'
                    : t.profile.exportAuditTrail || 'Export Audit Log (PDF)'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-neutral-400 block font-medium">Total Events Recorded</span>
              <span className="text-lg font-black text-white mt-0.5 block">{INITIAL_ACTIVITY_LOGS.length} Logs</span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">100% Cryptographic Match</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-neutral-400 block font-medium">Total Volume Transacted</span>
              <span className="text-lg font-black text-white mt-0.5 block">42.6 MT</span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">Zero Landfill Ingestion</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-neutral-400 block font-medium">Cumulative Gross Value</span>
              <span className="text-lg font-black text-emerald-300 mt-0.5 block">₹3,38,950</span>
              <span className="text-[10px] text-neutral-300 font-semibold mt-0.5 block">T+1 Escrow Guaranteed</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-neutral-400 block font-medium">Verified Compliance</span>
              <span className="text-lg font-black text-white mt-0.5 block">NABL 17025</span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">CPCB Form-II Compliant</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.profile.searchActivityPlaceholder || 'Search by Lot ID, DRP, resource, or counterparty...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'ALL'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t.profile.allActivityFilter || 'All Activities'} ({INITIAL_ACTIVITY_LOGS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('REGISTERED')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'REGISTERED'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {t.profile.registeredFilter || 'Lots Registered'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('TRADED')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'TRADED'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              {t.profile.tradedFilter || 'Traded & Procured'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('DISPATCHED')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'DISPATCHED'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {t.profile.transitFilter || 'In Transit'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('SETTLED')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'SETTLED'
                  ? 'bg-green-700 text-white shadow-xs'
                  : 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'
              }`}
            >
              {t.profile.settledFilter || 'Settled Payouts'}
            </button>
          </div>
        </div>
      </div>

      {/* Activity List Container */}
      <div className="space-y-3">
        {displayList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h4 className="text-base font-bold text-neutral-800">No matching activities found</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search keywords or filter pill to see other registered lots and marketplace trades.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('ALL');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#1B5E20] bg-[#E8F5E9] hover:bg-[#C8E6C9] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayList.map((item) => {
            const badge = getActionBadge(item.action);
            return (
              <div
                key={item.id}
                onClick={() => onInspectDrp(item.drpId)}
                className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-xs hover:border-[#10B981]/60 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Left: Action Icon + Details */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8F5E9] transition-colors">
                      {badge.icon}
                    </div>

                    <div className="min-w-0 space-y-1">
                      {/* Top Badges */}
                      <div className="flex items-center flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                          {item.lotId}
                        </span>
                        <span className="text-xs font-medium text-neutral-400">
                          {item.relativeTime} • {item.timestamp}
                        </span>
                      </div>

                      {/* Title & Grade */}
                      <h4 className="text-sm sm:text-base font-bold text-[#191C1E] group-hover:text-[#00875A] transition-colors">
                        {item.resourceName}
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium">
                        {item.grade} • <span className="text-neutral-700 font-semibold">{item.category}</span>
                      </p>

                      {/* Counterparty & Notes */}
                      <div className="text-xs text-neutral-600 pt-1 space-y-0.5">
                        <p className="flex items-center gap-1.5">
                          <span className="font-semibold text-neutral-700">Counterparty:</span>
                          <span className="font-bold text-neutral-900">{item.counterparty}</span>
                          <span className="text-[11px] px-2 py-0.2 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                            {item.counterpartyRole}
                          </span>
                        </p>
                        <p className="text-[11px] text-neutral-500">{item.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity & Valuation */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 flex-shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-sm sm:text-base font-black text-emerald-800">
                        {item.financialValue}
                      </div>
                      <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {item.quantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectDrp(item.drpId);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
                      <span>{t.profile.inspectPassportBtn || 'Inspect Passport'}</span>
                      <ArrowRight className="w-3 h-3 text-[#166534]" />
                    </button>
                  </div>
                </div>

                {/* Bottom Metadata bar: Location & Hash */}
                <div className="mt-3.5 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-500 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-neutral-700">{item.facilityLocation}</span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px]">
                    <span className="text-neutral-400">DRP Hash:</span>
                    <span className="text-neutral-700 font-semibold bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">
                      {item.txHash.slice(0, 10)}...{item.txHash.slice(-6)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => copyToClipboard(item.txHash, e)}
                      className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                      title="Copy full cryptographic hash"
                    >
                      {copiedHash === item.txHash ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
