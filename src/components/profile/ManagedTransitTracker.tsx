import React, { useState, useMemo } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
  PackageOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Navigation,
  Phone,
  QrCode,
  Sparkles,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  Fuel,
  DollarSign,
  FileCheck2,
  TrendingUp,
  SlidersHorizontal,
  Flame,
  Check,
  Copy,
  Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type TransitStageKey = 'AWAITING_PICKUP' | 'IN_TRANSIT' | 'PROCESSED';

export interface TransitMilestone {
  stage: 'REGISTERED' | 'AWAITING_PICKUP' | 'IN_TRANSIT' | 'PROCESSED';
  label: string;
  timestamp?: string;
  location?: string;
  notes?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface ManagedTransitLot {
  id: string;
  lotId: string;
  drpId: string;
  resourceName: string;
  category: string;
  grade: string;
  batchWeight: string;
  financialValue: string;
  originHub: string;
  originAddress: string;
  destinationHub: string;
  destinationAddress: string;
  currentStage: TransitStageKey;
  progressPercent: number; // 0 to 100
  // Logistics Carrier Telemetry
  carrierName: string;
  vehicleType: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  currentMilestone: string;
  gpsCoordinates: string;
  speed: string;
  eta: string;
  freightCost: string;
  digitalGatePassId: string;
  weighbridgeStatus: string;
  co2Saved: string;
  milestones: TransitMilestone[];
}

export const INITIAL_MANAGED_TRANSIT_LOTS: ManagedTransitLot[] = [
  {
    id: 'tr-01',
    lotId: 'LG-AL-402',
    drpId: 'DRP-2026-AL-8921',
    resourceName: 'CNC Aluminum 6061-T6 Swarf',
    category: 'Metals & Alloys',
    grade: 'Aerospace Spec 6061-T6 (Si 0.6%, Mg 1.0%)',
    batchWeight: '500 kg',
    financialValue: '₹42,500',
    originHub: 'Peenya Industrial Estate, Bengaluru',
    originAddress: 'Apex Precision Works, Plot 124, Peenya 1st Stage',
    destinationHub: 'Doddaballapur Metallurgical Park',
    destinationAddress: 'Hindalco Ancillary Smelters, Doddaballapur Foundry Hub',
    currentStage: 'IN_TRANSIT',
    progressPercent: 72,
    carrierName: 'VRL Industrial Cargo Fleet',
    vehicleType: 'Heavy Hauler 28-Ton',
    vehicleNumber: 'KA-04-E-2201',
    driverName: 'Ramesh Gowda',
    driverPhone: '+91 94481 22910',
    currentMilestone: 'Passing NH-48 Express Highway (KM 34 Milestone)',
    gpsCoordinates: '13.1287° N, 77.5833° E',
    speed: '52 km/h',
    eta: '42 mins remaining',
    freightCost: '₹2,550 (6.0%)',
    digitalGatePassId: 'GP-BLR-2026-9921',
    weighbridgeStatus: 'Gross 500 kg Calibrated (Tare Slip #1049)',
    co2Saved: '925 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Oct 16, 09:15 AM',
        location: 'Peenya Machine Bay',
        notes: 'Spectrochemical assay 99.4% purity certified.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Oct 16, 10:30 AM',
        location: 'Apex Loading Dock 2',
        notes: 'Truck KA-04-E-2201 assigned. Digital manifest issued.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Express Corridor',
        timestamp: 'Oct 16, 11:15 AM',
        location: 'NH-48 Corridor (KM 34)',
        notes: 'En route to smelter bay. Telemetry broadcast every 60s.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        stage: 'PROCESSED',
        label: 'Smelter Ingestion & Payout',
        timestamp: 'Est. Today 14:30',
        location: 'Doddaballapur Foundry',
        notes: 'Secondary ingot induction furnace scheduled.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'tr-02',
    lotId: 'LG-PL-311',
    drpId: 'DRP-2026-PL-7729',
    resourceName: 'High-Density Polyethylene Injection Sprues',
    category: 'Polymers & Plastics',
    grade: 'MFI 0.35 g/10min Blow-Molding Grade',
    batchWeight: '850 kg',
    financialValue: '₹34,000',
    originHub: 'Chakan Precision Molding Cluster, Pune',
    originAddress: 'Chakan Precision Molding Unit 3, MIDC Phase 2',
    destinationHub: 'Bhosari Polymer Extrusion Estate',
    destinationAddress: 'Supreme Polymer Recyclers & Extruders, Bhosari Bay 4',
    currentStage: 'IN_TRANSIT',
    progressPercent: 68,
    carrierName: 'BLR Express Fleet Operations',
    vehicleType: 'Medium Tempo (Bolero Maxi)',
    vehicleNumber: 'MH-12-Q-4491',
    driverName: 'Santosh Patil',
    driverPhone: '+91 98220 54109',
    currentMilestone: 'Talegaon Toll Plaza, Chakan-Bhosari Corridor',
    gpsCoordinates: '18.7304° N, 73.6811° E',
    speed: '44 km/h',
    eta: '25 mins remaining',
    freightCost: '₹2,040 (6.0%)',
    digitalGatePassId: 'GP-PUN-2026-4410',
    weighbridgeStatus: 'Tare 1,850 kg • Net Granules 850 kg',
    co2Saved: '1,827 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Oct 14, 08:30 AM',
        location: 'Chakan MIDC Phase 2',
        notes: 'CIPET density 0.952 g/cm³ verified with zero PVC.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Oct 14, 11:00 AM',
        location: 'Chakan Outward Bay',
        notes: 'Screened granules bagged into 25kg HDPE woven sacks.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Express Corridor',
        timestamp: 'Oct 14, 13:45 PM',
        location: 'Talegaon Expressway',
        notes: 'Cleared toll plaza with electronic e-way bill check.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        stage: 'PROCESSED',
        label: 'Pelletizing Ingestion & Payout',
        timestamp: 'Est. Today 16:45',
        location: 'Supreme Extrusion Bay',
        notes: 'Scheduled for twin-screw compounding line.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'tr-03',
    lotId: 'LG-TX-109',
    drpId: 'DRP-2026-TX-4112',
    resourceName: 'Denim Selvedge Raw Fiber Bales',
    category: 'Textiles & Leather',
    grade: 'Pure Indigo Dyed Cellulose 400 GSM',
    batchWeight: '1.2 Tons',
    financialValue: '₹28,800',
    originHub: 'Surat Eco-Weave Mills, Sachin GIDC',
    originAddress: 'Surat Eco-Weave Mills, Plot 44, Sachin GIDC',
    destinationHub: 'Narol Non-Wovens Industrial Estate, Ahmedabad',
    destinationAddress: 'Auto Acoustic Matting Ltd, Narol GIDC Phase 1',
    currentStage: 'AWAITING_PICKUP',
    progressPercent: 28,
    carrierName: 'Gujarat Freight Alliance',
    vehicleType: 'Flatbed Trailer 40-Ton',
    vehicleNumber: 'GJ-06-TR-8812',
    driverName: 'Vikram Solanki',
    driverPhone: '+91 97241 88320',
    currentMilestone: 'Surat Ring Road Consolidation Depot (Docked at Bay 3)',
    gpsCoordinates: '21.1702° N, 72.8311° E',
    speed: '0 km/h (Staging)',
    eta: 'Scheduled Dispatch 14:00 IST',
    freightCost: '₹1,728 (6.0%)',
    digitalGatePassId: 'GP-GUJ-2026-8802',
    weighbridgeStatus: 'Electronic Tare Certified (1,200 kg Baled)',
    co2Saved: '2,880 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Oct 12, 10:00 AM',
        location: 'Sachin GIDC',
        notes: 'CIRCOT moisture and yarn tensile grade cleared.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Today, 08:30 AM',
        location: 'Surat Baling Bay 3',
        notes: 'Allotted to Gujarat Freight Alliance. Driver verified.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Golden Corridor',
        timestamp: 'Est. 14:00 IST',
        location: 'NH-48 Gujarat Trunk Corridor',
        notes: 'Scheduled for direct non-stop dispatch to Narol.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        stage: 'PROCESSED',
        label: 'Felt Matting Ingestion & Payout',
        timestamp: 'Est. Tomorrow 11:00',
        location: 'Narol Acoustic Plant',
        notes: 'Carding and thermal bonding into vehicle acoustic liners.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'tr-04',
    lotId: 'LG-BR-201',
    drpId: 'DRP-2026-BR-9032',
    resourceName: 'Free Cutting Brass Turnings C360',
    category: 'Metals & Alloys',
    grade: 'Cu 60-63%, Pb 2.5-3.7%, Zn Balance',
    batchWeight: '750 kg',
    financialValue: '₹62,250',
    originHub: 'Peenya Ancillary Cluster #2, Bengaluru',
    originAddress: 'Precision Machine Works, Peenya 2nd Stage',
    destinationHub: 'Jamnagar Brass Foundry Cluster',
    destinationAddress: 'Jamnagar Precision Parts Works, Dared GIDC',
    currentStage: 'AWAITING_PICKUP',
    progressPercent: 20,
    carrierName: 'Interstate Metallurgical Logistics',
    vehicleType: 'Medium Tempo Closed Container',
    vehicleNumber: 'KA-01-MJ-5519',
    driverName: 'Manjunath Reddy',
    driverPhone: '+91 94490 88219',
    currentMilestone: 'Consolidation Yard Staging (Pickup scheduled 15:30 IST)',
    gpsCoordinates: '13.0311° N, 77.5144° E',
    speed: '0 km/h (Docked)',
    eta: 'Loading bay allotted',
    freightCost: '₹3,735 (6.0%)',
    digitalGatePassId: 'GP-BLR-2026-1188',
    weighbridgeStatus: 'Calibration Certificate NABL #4901',
    co2Saved: '1,425 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Oct 08, 14:20 PM',
        location: 'Peenya CNC Bay',
        notes: 'Spectro assay confirms 61.2% Copper & 3.1% Lead content.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Today, 10:00 AM',
        location: 'Peenya Outbound Ramp',
        notes: 'Drummed in sealed steel barrels with barcode tags.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Express Corridor',
        timestamp: 'Pending Dispatch',
        location: 'Highway transit',
        notes: 'Transit to western brass casting belt.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        stage: 'PROCESSED',
        label: 'Ingot Smelting & Escrow Payout',
        timestamp: 'Pending Ingestion',
        location: 'Jamnagar Foundry',
        notes: 'Direct crucible melt into secondary brass rods.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'tr-05',
    lotId: 'LG-OL-088',
    drpId: 'DRP-2026-OL-0391',
    resourceName: 'Reclaimed Hydraulic Mineral Oil',
    category: 'Industrial Lubricants',
    grade: 'ISO VG 46 (Moisture <0.04%, PCB Free)',
    batchWeight: '200 L',
    financialValue: '₹18,400',
    originHub: 'Peenya Machine Ancillary Bay, Bengaluru',
    originAddress: 'Peenya CNC Turning Bay 4, Industrial Area',
    destinationHub: 'Thane MIDC Re-Refinery Hub',
    destinationAddress: 'EcoLube Refining Terminal, Thane MIDC Tank 2',
    currentStage: 'PROCESSED',
    progressPercent: 100,
    carrierName: 'Southern Tanker Logistics',
    vehicleType: 'Dedicated Tanker 16-Ton',
    vehicleNumber: 'KA-01-TK-9022',
    driverName: 'Anthony Raj',
    driverPhone: '+91 98440 33190',
    currentMilestone: 'Delivered & Unloaded into Re-Refining Reactor Silo',
    gpsCoordinates: '19.2183° N, 72.9781° E',
    speed: '0 km/h (Completed)',
    eta: 'Completed & Processed',
    freightCost: '₹1,104 (6.0%)',
    digitalGatePassId: 'GP-MUM-2026-7733',
    weighbridgeStatus: 'Flowmeter Volume 200.4 Liters Verified',
    co2Saved: '620 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Sep 28, 09:00 AM',
        location: 'Peenya CNC Bay',
        notes: 'Indian Petroleum Institute verified zero PCB contaminants.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Sep 29, 11:30 AM',
        location: 'Peenya Tanker Ramp',
        notes: 'Sealed vacuum tanker suction completed.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Express Corridor',
        timestamp: 'Sep 30, 06:00 AM',
        location: 'Pune-Thane Express Corridor',
        notes: 'Hazardous cargo digital e-manifest cleared.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'PROCESSED',
        label: 'Processed & Escrow Settled',
        timestamp: 'Oct 02, 16:45 PM',
        location: 'Thane Re-Refinery Reactor',
        notes: 'Vacuum distilled into base oil. Payout ₹16,560 disbursed via RTGS.',
        isCompleted: true,
        isCurrent: true,
      },
    ],
  },
  {
    id: 'tr-06',
    lotId: 'LG-CU-512',
    drpId: 'DRP-2026-CU-1104',
    resourceName: 'Heavy Copper Millberry Wire Scrap',
    category: 'Metals & Alloys',
    grade: 'IS 191 Grade-A (Purity 99.8%)',
    batchWeight: '1.8 MT',
    financialValue: '₹1,53,000',
    originHub: 'Peenya Industrial Area, Bengaluru',
    originAddress: 'Apex Precision Works, Peenya 1st Stage',
    destinationHub: 'Doddaballapur Metallurgical Park',
    destinationAddress: 'Vedanta Ancillary Ingot Foundry, Bay 2',
    currentStage: 'PROCESSED',
    progressPercent: 100,
    carrierName: 'VRL Industrial Cargo Fleet',
    vehicleType: 'Heavy Truck 28-Ton',
    vehicleNumber: 'KA-04-E-1980',
    driverName: 'Girish Kumar',
    driverPhone: '+91 94480 11922',
    currentMilestone: 'Melted into 8mm Continuous Cast Copper Rods',
    gpsCoordinates: '13.2921° N, 77.5342° E',
    speed: '0 km/h (Completed)',
    eta: 'Completed & Processed',
    freightCost: '₹4,590 (3.0%)',
    digitalGatePassId: 'GP-BLR-2026-0811',
    weighbridgeStatus: 'Weighbridge Net 1,812 kg (Assay 99.82%)',
    co2Saved: '4,140 kg CO₂e abated',
    milestones: [
      {
        stage: 'REGISTERED',
        label: 'Lot Registered & DRP Minted',
        timestamp: 'Oct 06, 11:00 AM',
        location: 'Peenya Electrical Scrap Bay',
        notes: 'Pure electrolytic copper wire stripped of insulation.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'AWAITING_PICKUP',
        label: 'Awaiting Pickup & Gate Clearance',
        timestamp: 'Oct 08, 09:30 AM',
        location: 'Apex Loading Dock',
        notes: 'Hydraulically briquetted for high-density transport.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'IN_TRANSIT',
        label: 'In Transit on Express Corridor',
        timestamp: 'Oct 09, 12:00 PM',
        location: 'Yelahanka Bypass Corridor',
        notes: 'GPS geo-fence monitored with tamper-evident seals.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: 'PROCESSED',
        label: 'Processed & Escrow Settled',
        timestamp: 'Oct 10, 10:20 AM',
        location: 'Vedanta Ingot Smelter',
        notes: 'Ingested into gas reverberatory furnace. T+1 payout credited.',
        isCompleted: true,
        isCurrent: true,
      },
    ],
  },
];

interface ManagedTransitTrackerProps {
  onInspectDrp: (drpId: string) => void;
  onDispatchNewLot?: () => void;
  isCompact?: boolean;
  maxCompactItems?: number;
}

export const ManagedTransitTracker: React.FC<ManagedTransitTrackerProps> = ({
  onInspectDrp,
  onDispatchNewLot,
  isCompact = false,
  maxCompactItems = 3,
}) => {
  const { t } = useLanguage();
  const [lots, setLots] = useState<ManagedTransitLot[]>(INITIAL_MANAGED_TRANSIT_LOTS);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | TransitStageKey>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLotForModal, setSelectedLotForModal] = useState<ManagedTransitLot | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Simulate advancing the stage for interactive demonstration
  const handleAdvanceStage = (lotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLots((prevLots) =>
      prevLots.map((lot) => {
        if (lot.lotId !== lotId) return lot;

        if (lot.currentStage === 'AWAITING_PICKUP') {
          showNotification(`Lot ${lot.lotId} dispatched! Status changed to 'In Transit' with live GPS telemetry.`);
          return {
            ...lot,
            currentStage: 'IN_TRANSIT',
            progressPercent: 65,
            speed: '48 km/h',
            eta: '55 mins remaining',
            currentMilestone: 'Entering Highway Corridor (Passing Toll Plaza)',
            milestones: lot.milestones.map((m) => {
              if (m.stage === 'AWAITING_PICKUP') return { ...m, isCompleted: true, isCurrent: false };
              if (m.stage === 'IN_TRANSIT') return { ...m, isCompleted: false, isCurrent: true, timestamp: 'Just now' };
              return m;
            }),
          };
        } else if (lot.currentStage === 'IN_TRANSIT') {
          showNotification(`Lot ${lot.lotId} arrived at smelter dock! Chemical assay verified & marked 'Processed'.`);
          return {
            ...lot,
            currentStage: 'PROCESSED',
            progressPercent: 100,
            speed: '0 km/h (Docked)',
            eta: 'Completed & Processed',
            currentMilestone: 'Secondary Ingestion Complete (Payout Settled)',
            milestones: lot.milestones.map((m) => {
              if (m.stage === 'IN_TRANSIT') return { ...m, isCompleted: true, isCurrent: false };
              if (m.stage === 'PROCESSED') return { ...m, isCompleted: true, isCurrent: true, timestamp: 'Just now' };
              return m;
            }),
          };
        } else {
          showNotification(`Lot ${lot.lotId} is already 100% processed into secondary raw materials.`);
          return lot;
        }
      })
    );
  };

  // Filter & Search
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      if (selectedFilter !== 'ALL' && lot.currentStage !== selectedFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesLot = lot.lotId.toLowerCase().includes(query);
        const matchesDrp = lot.drpId.toLowerCase().includes(query);
        const matchesName = lot.resourceName.toLowerCase().includes(query);
        const matchesCarrier = lot.carrierName.toLowerCase().includes(query);
        const matchesVehicle = lot.vehicleNumber.toLowerCase().includes(query);
        const matchesDriver = lot.driverName.toLowerCase().includes(query);
        return matchesLot || matchesDrp || matchesName || matchesCarrier || matchesVehicle || matchesDriver;
      }
      return true;
    });
  }, [lots, selectedFilter, searchQuery]);

  const displayList = isCompact ? filteredLots.slice(0, maxCompactItems) : filteredLots;

  // Counters
  const countAwaiting = lots.filter((l) => l.currentStage === 'AWAITING_PICKUP').length;
  const countInTransit = lots.filter((l) => l.currentStage === 'IN_TRANSIT').length;
  const countProcessed = lots.filter((l) => l.currentStage === 'PROCESSED').length;

  const getStageBadge = (stage: TransitStageKey) => {
    switch (stage) {
      case 'AWAITING_PICKUP':
        return {
          label: t.profile.awaitingPickup || 'Awaiting Pickup',
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          dot: 'bg-amber-500',
          icon: <Clock className="w-3.5 h-3.5 text-amber-700" />,
        };
      case 'IN_TRANSIT':
        return {
          label: t.profile.inTransitStage || 'In Transit',
          bg: 'bg-sky-50 text-sky-900 border-sky-200',
          dot: 'bg-sky-500 animate-pulse',
          icon: <Truck className="w-3.5 h-3.5 text-sky-700 animate-bounce" />,
        };
      case 'PROCESSED':
        return {
          label: t.profile.processedStage || 'Processed',
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />,
        };
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-4 sm:right-8 bg-neutral-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-neutral-700">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Top Header & Statistics Card */}
      {!isCompact && (
        <div className="bg-gradient-to-r from-slate-950 via-[#0B253A] to-[#064E3B] rounded-3xl p-6 text-white shadow-md border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-300 flex-shrink-0 shadow-xs border border-white/15">
                <Truck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/15 text-sky-200">
                    Managed Transit Network
                  </span>
                  <span className="text-xs text-emerald-300 font-semibold">• Live GPS Telemetry</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {t.profile.managedTransitTitle || 'Managed Transit & Consignment Tracker'}
                </h3>
                <p className="text-xs text-sky-100 max-w-xl mt-0.5 leading-relaxed">
                  {t.profile.managedTransitSubtitle ||
                    'Real-time progress bars, multi-stage logistics pipelines, and tamper-evident GPS tracking for all registered industrial lots.'}
                </p>
              </div>
            </div>

            {onDispatchNewLot && (
              <button
                type="button"
                onClick={onDispatchNewLot}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-sky-50 transition-all shadow-xs cursor-pointer flex-shrink-0 self-start sm:self-auto"
              >
                <Truck className="w-4 h-4 text-sky-700" />
                <span>Dispatch Consignment</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Bar with Stage Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs">
            <div
              onClick={() => setSelectedFilter('ALL')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                selectedFilter === 'ALL'
                  ? 'bg-white/20 border-white/40 shadow-xs'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-neutral-300 text-[11px]">
                <span>Total Monitored Lots</span>
                <PackageCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl font-black text-white mt-1 block">{lots.length} Lots</span>
              <span className="text-[10px] text-emerald-300 font-medium">100% Digital Manifests</span>
            </div>

            <div
              onClick={() => setSelectedFilter('AWAITING_PICKUP')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                selectedFilter === 'AWAITING_PICKUP'
                  ? 'bg-amber-500/25 border-amber-400 shadow-xs'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-amber-200 text-[11px]">
                <span>Awaiting Pickup</span>
                <Clock className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="text-xl font-black text-amber-300 mt-1 block">{countAwaiting} Lots</span>
              <span className="text-[10px] text-amber-200 font-medium">Gate Pass & Carrier Ready</span>
            </div>

            <div
              onClick={() => setSelectedFilter('IN_TRANSIT')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                selectedFilter === 'IN_TRANSIT'
                  ? 'bg-sky-500/25 border-sky-400 shadow-xs'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-sky-200 text-[11px]">
                <span>In Transit (Live Road)</span>
                <Truck className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
              </div>
              <span className="text-xl font-black text-sky-300 mt-1 block">{countInTransit} Lots</span>
              <span className="text-[10px] text-sky-200 font-medium">Live Highway Corridors</span>
            </div>

            <div
              onClick={() => setSelectedFilter('PROCESSED')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                selectedFilter === 'PROCESSED'
                  ? 'bg-emerald-500/25 border-emerald-400 shadow-xs'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-emerald-200 text-[11px]">
                <span>Processed & Settled</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <span className="text-xl font-black text-emerald-300 mt-1 block">{countProcessed} Lots</span>
              <span className="text-[10px] text-emerald-300 font-medium">Secondary Smelting Done</span>
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
              placeholder="Search by Lot ID, DRP, material, carrier, or vehicle plate..."
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

          {/* Stage Filter Pills */}
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
              All Stages ({lots.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('AWAITING_PICKUP')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'AWAITING_PICKUP'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting Pickup ({countAwaiting})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('IN_TRANSIT')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'IN_TRANSIT'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>In Transit ({countInTransit})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('PROCESSED')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'PROCESSED'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Processed ({countProcessed})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lot List with Visual Stage Progress Bars */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h4 className="text-base font-bold text-neutral-800">No matching transit lots found</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search query or stage filter pill to view lots in different logistics phases.
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
          displayList.map((lot) => {
            const badge = getStageBadge(lot.currentStage);
            const isCompletedLot = lot.currentStage === 'PROCESSED';
            const isInTransitLot = lot.currentStage === 'IN_TRANSIT';

            return (
              <div
                key={lot.id}
                className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs hover:border-[#10B981]/50 hover:shadow-md transition-all space-y-4 group"
              >
                {/* Top Row: Lot ID, Title, Value & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8F5E9] transition-colors">
                      <Truck className="w-5 h-5 text-neutral-700 group-hover:text-[#1B5E20] transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-mono text-xs font-black text-neutral-800 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                          {lot.lotId}
                        </span>
                        <span className="font-mono text-xs text-neutral-400">
                          {lot.drpId}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                          {lot.category}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#191C1E] mt-0.5">
                        {lot.resourceName}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                    <div className="text-left sm:text-right">
                      <div className="text-base font-black text-neutral-900">{lot.financialValue}</div>
                      <div className="text-xs font-bold text-neutral-500">{lot.batchWeight}</div>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${badge.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      <span>{badge.label}</span>
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* VISUAL PROGRESS BAR & MULTI-STAGE LOGISTICS PIPELINE     */}
                {/* ======================================================== */}
                <div className="bg-neutral-50/70 rounded-2xl p-4 border border-neutral-200/70 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-700 flex items-center gap-2">
                      <span>Logistics Stage Progress</span>
                      <span className="text-[11px] font-mono text-neutral-400">({lot.progressPercent}% Completed)</span>
                    </span>
                    <span className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{lot.eta}</span>
                    </span>
                  </div>

                  {/* High-level Continuous Progress Bar */}
                  <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden relative shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-700 relative ${
                        isCompletedLot
                          ? 'bg-gradient-to-r from-emerald-600 to-green-500'
                          : isInTransitLot
                          ? 'bg-gradient-to-r from-sky-600 via-emerald-500 to-emerald-400'
                          : 'bg-gradient-to-r from-amber-500 to-amber-400'
                      }`}
                      style={{ width: `${lot.progressPercent}%` }}
                    >
                      {/* Animated shimmer on active travel */}
                      {isInTransitLot && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* 4-Stage Connected Logistics Stepper Nodes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                    {/* Stage 1: Registered */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>1. Registered</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">
                        DRP Minted & Assayed
                      </p>
                      <div className="w-full bg-emerald-500 h-1 rounded-full mt-2" />
                    </div>

                    {/* Stage 2: Awaiting Pickup */}
                    <div
                      className={`p-2.5 rounded-xl border shadow-2xs ${
                        lot.currentStage === 'AWAITING_PICKUP'
                          ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-300'
                          : lot.progressPercent > 30
                          ? 'bg-white border-neutral-200/80'
                          : 'bg-neutral-100/60 border-neutral-200 text-neutral-400'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 font-bold text-[11px] ${
                          lot.currentStage === 'AWAITING_PICKUP'
                            ? 'text-amber-800'
                            : lot.progressPercent > 30
                            ? 'text-emerald-700'
                            : 'text-neutral-500'
                        }`}
                      >
                        {lot.progressPercent > 30 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        )}
                        <span>2. Awaiting Pickup</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">
                        {lot.currentStage === 'AWAITING_PICKUP' ? 'Gate Pass Issued' : 'Cleared Dock'}
                      </p>
                      <div
                        className={`w-full h-1 rounded-full mt-2 ${
                          lot.progressPercent > 30 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                        }`}
                      />
                    </div>

                    {/* Stage 3: In Transit */}
                    <div
                      className={`p-2.5 rounded-xl border shadow-2xs ${
                        lot.currentStage === 'IN_TRANSIT'
                          ? 'bg-sky-50/80 border-sky-300 ring-1 ring-sky-300'
                          : lot.progressPercent > 80
                          ? 'bg-white border-neutral-200/80'
                          : 'bg-neutral-100/60 border-neutral-200 text-neutral-400'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 font-bold text-[11px] ${
                          lot.currentStage === 'IN_TRANSIT'
                            ? 'text-sky-800'
                            : lot.progressPercent > 80
                            ? 'text-emerald-700'
                            : 'text-neutral-500'
                        }`}
                      >
                        {lot.progressPercent > 80 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : lot.currentStage === 'IN_TRANSIT' ? (
                          <Truck className="w-3.5 h-3.5 text-sky-600 animate-bounce" />
                        ) : (
                          <Navigation className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                        <span>3. In Transit</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">
                        {lot.currentStage === 'IN_TRANSIT' ? `${lot.speed} • Live GPS` : lot.progressPercent > 80 ? 'Arrived at Hub' : 'Pending Dispatch'}
                      </p>
                      <div
                        className={`w-full h-1 rounded-full mt-2 ${
                          lot.progressPercent > 80 ? 'bg-emerald-500' : lot.currentStage === 'IN_TRANSIT' ? 'bg-sky-500' : 'bg-neutral-200'
                        }`}
                      />
                    </div>

                    {/* Stage 4: Processed */}
                    <div
                      className={`p-2.5 rounded-xl border shadow-2xs ${
                        isCompletedLot
                          ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-300'
                          : 'bg-neutral-100/60 border-neutral-200 text-neutral-400'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 font-bold text-[11px] ${
                          isCompletedLot ? 'text-emerald-800' : 'text-neutral-500'
                        }`}
                      >
                        {isCompletedLot ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Flame className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                        <span>4. Processed</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">
                        {isCompletedLot ? 'Smelted & Settled' : 'Awaiting Ingestion'}
                      </p>
                      <div
                        className={`w-full h-1 rounded-full mt-2 ${
                          isCompletedLot ? 'bg-emerald-500' : 'bg-neutral-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Corridor & Route Tracking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Origin to Destination Route */}
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                      Origin to Destination Highway Corridor
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-neutral-900">{lot.originHub}</p>
                          <p className="text-[11px] text-neutral-500 leading-tight">{lot.originAddress}</p>
                        </div>
                      </div>
                      <div className="pl-1 text-neutral-300">↓</div>
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-neutral-900">{lot.destinationHub}</p>
                          <p className="text-[11px] text-neutral-500 leading-tight">{lot.destinationAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Carrier & Vehicle Telemetry */}
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                      Allotted Carrier & GPS Telemetry
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900">{lot.carrierName}</span>
                        <span className="font-mono text-[11px] font-bold bg-neutral-200/70 text-neutral-800 px-2 py-0.5 rounded">
                          {lot.vehicleNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600">
                        {lot.vehicleType} • Driver: <strong className="text-neutral-800">{lot.driverName}</strong>
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-medium text-neutral-700">{lot.currentMilestone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-3 text-neutral-500 text-[11px]">
                    <span>Gate Pass: <strong className="text-neutral-800 font-mono">{lot.digitalGatePassId}</strong></span>
                    <span>•</span>
                    <span>CO₂ Abated: <strong className="text-emerald-700">{lot.co2Saved}</strong></span>
                  </div>

                  <div className="flex items-center flex-wrap gap-2">
                    {/* Advance Stage Simulation Button */}
                    {!isCompletedLot && (
                      <button
                        type="button"
                        onClick={(e) => handleAdvanceStage(lot.lotId, e)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer"
                        title="Simulate next logistics milestone transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Simulate Next Stage</span>
                      </button>
                    )}

                    {/* View Digital Waybill Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedLotForModal(lot)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-sky-700" />
                      <span>Digital Waybill</span>
                    </button>

                    {/* Inspect Full DRP Passport Button */}
                    <button
                      type="button"
                      onClick={() => onInspectDrp(lot.drpId)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] transition-all cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Inspect DRP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: DIGITAL WAYBILL & TELEMETRY MANIFEST               */}
      {/* ======================================================== */}
      {selectedLotForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedLotForModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Electronic Consignment Waybill & Manifest
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {selectedLotForModal.lotId} • {selectedLotForModal.digitalGatePassId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLotForModal(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stage Progress in Modal */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">Status: {selectedLotForModal.currentStage}</span>
                <span className="font-mono text-emerald-700 font-bold">{selectedLotForModal.progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${selectedLotForModal.progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-500">{selectedLotForModal.currentMilestone}</p>
            </div>

            {/* Milestones Audit Trail */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Logistics Milestones Audit Trail
              </h4>
              <div className="space-y-2">
                {selectedLotForModal.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-neutral-100 flex items-start gap-3 text-xs"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        m.isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.isCurrent
                          ? 'bg-sky-100 text-sky-800 animate-pulse'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {m.isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900">{m.label}</span>
                        <span className="text-[10px] text-neutral-400">{m.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-0.5">{m.notes}</p>
                      {m.location && (
                        <p className="text-[10px] text-neutral-400 mt-0.5">Location: {m.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver & Telemetry Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Driver Contact</span>
                <span className="font-bold text-neutral-900 mt-0.5 block">{selectedLotForModal.driverName}</span>
                <span className="text-[11px] text-emerald-700 font-mono mt-0.5 block">{selectedLotForModal.driverPhone}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Weighbridge Data</span>
                <span className="font-bold text-neutral-900 mt-0.5 block">{selectedLotForModal.batchWeight}</span>
                <span className="text-[11px] text-neutral-500 mt-0.5 block">{selectedLotForModal.weighbridgeStatus}</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedLotForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const drp = selectedLotForModal.drpId;
                  setSelectedLotForModal(null);
                  onInspectDrp(drp);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] transition-all cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Open DRP Passport</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
