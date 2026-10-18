import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  Briefcase,
  Boxes,
  MapPin,
  ShieldCheck,
  PlusCircle,
  LogOut,
  Bell,
  Edit3,
  Recycle,
  Cloud,
  Search,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ChevronRight,
  Download,
  QrCode,
  Eye,
  Check,
  Plus,
  Home,
  RefreshCw,
  User,
  TrendingUp,
  TrendingDown,
  Wallet,
  ExternalLink,
  Lock,
  Camera,
  Package,
  Layers,
  Shirt,
  Droplets,
  Box,
  SlidersHorizontal,
  FileCheck2,
  AlertCircle,
  Landmark,
  Flame,
  Fuel,
  CreditCard,
  Navigation,
  Scale,
  Settings,
  ShoppingCart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DRPRecord, INITIAL_DRP_DATABASE } from './profile/drpData';
import { DrpDetailModal } from './profile/DrpDetailModal';
import { TransitDashboardView } from './profile/TransitDashboardView';
import { ProcessingDashboardView } from './profile/ProcessingDashboardView';
import { FinancingDashboardView } from './profile/FinancingDashboardView';
import { ComplianceScorePage } from './profile/ComplianceScorePage';
import { ActivityLogSection } from './profile/ActivityLogSection';
import { ManagedTransitTracker } from './profile/ManagedTransitTracker';
import { SettingsPage } from './profile/SettingsPage';
import { WasteDiversionChart } from './profile/WasteDiversionChart';
import { LivePricesExchange } from './profile/LivePricesExchange';
import { PriceCalculationExplainer } from './profile/PriceCalculationExplainer';
import { MarketplaceView } from './profile/MarketplaceView';
import { HowMarketplaceWorks } from './profile/HowMarketplaceWorks';
import { LivePriceDashboardWidget } from './profile/LivePriceDashboardWidget';

export interface EnterpriseProfile {
  name: string;
  phone: string;
  email: string;
  businessDealsIn: string;
  majorResources: string;
  role: 'MSME Enterprise' | 'Processing Enterprise' | 'Transit Partner' | 'Banking Partner';
  address: string;
  isRegistered: boolean;
  password?: string;
}

interface ProfilePageProps {
  profile: EnterpriseProfile;
  onReturnToHome: () => void;
  onOpenResourceRegistration: () => void;
  onSignOut: () => void;
  onNavigateToSupport?: () => void;
}

export interface ResourceAsset {
  id: string;
  title: string;
  weight: string;
  date: string;
  status: 'LISTED' | 'PENDING' | 'SOLD' | 'IN_TRANSIT';
  category: string;
  grade: string;
  estValue: string;
  lotId: string;
  proximity: string;
  buyerName?: string;
  transitPartner?: string;
  transitCost?: string;
  netPayout?: string;
  drpId: string;
  iconType: 'box' | 'textile' | 'droplet' | 'layers';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onReturnToHome,
  onOpenResourceRegistration,
  onSignOut,
  onNavigateToSupport,
}) => {
  const { t } = useLanguage();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'live-prices'
    | 'price-explainer'
    | 'marketplace'
    | 'how-marketplace-works'
    | 'waste-diversion'
    | 'search-drp'
    | 'your-drps'
    | 'managed-transit'
    | 'activity-log'
    | 'register-resources'
    | 'payout'
    | 'profile-section'
    | 'compliance-score'
    | 'settings'
  >('dashboard');

  // Pre-filter category when jumping from Live Prices to Marketplace
  const [selectedMarketplaceCat, setSelectedMarketplaceCat] = useState<string | undefined>(undefined);

  // Filter for asset status list
  const [assetFilter, setAssetFilter] = useState<'ALL' | 'LISTED' | 'PENDING' | 'SOLD' | 'IN_TRANSIT'>('ALL');

  // Notification drawer toggle
  const [showNotifications, setShowNotifications] = useState(false);

  // Selected DRP for comprehensive passport preview modal (shows all 6 required fields)
  const [selectedDRP, setSelectedDRP] = useState<DRPRecord | null>(null);

  // Profile edit modal state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<EnterpriseProfile>(profile);

  // Quick stats metrics
  const [recycledTons, setRecycledTons] = useState(1240);
  const [co2SavedTons, setCo2SavedTons] = useState(450);

  // Live assets list for MSME view
  const [assets, setAssets] = useState<ResourceAsset[]>([
    {
      id: 'ast-01',
      title: 'Leftover Aluminum Scrap',
      weight: '500 kg',
      date: 'Oct 16',
      status: 'IN_TRANSIT',
      category: 'Metals & Alloys',
      grade: '6061-T6 High Purity CNC Swarf',
      estValue: '₹42,500',
      lotId: 'LG-AL-402',
      proximity: 'En Route to Doddaballapur Foundry (KM 34)',
      buyerName: 'Hindalco Ancillary Smelters Corp',
      transitPartner: 'VRL Industrial Cargo (KA-04-E-2201)',
      transitCost: '₹2,550',
      netPayout: '₹38,250',
      drpId: 'DRP-2026-AL-8921',
      iconType: 'box',
    },
    {
      id: 'ast-02',
      title: 'Mixed Textile Offcuts',
      weight: '1.2 Tons',
      date: 'Oct 12',
      status: 'PENDING',
      category: 'Textiles & Leather',
      grade: '100% Cotton Denim Selvedge & Yarn Waste',
      estValue: '₹28,800',
      lotId: 'LG-TX-109',
      proximity: 'Pooling in Surat Baling Depot (72% full)',
      buyerName: 'Auto Acoustic Matting Ltd',
      transitPartner: 'Allotted on Lot Fill (GJ-06-TR-8812)',
      transitCost: '₹1,728',
      netPayout: '₹25,920',
      drpId: 'DRP-2026-TX-4112',
      iconType: 'textile',
    },
    {
      id: 'ast-03',
      title: 'Used Industrial Lubricant / Oil',
      weight: '200 L',
      date: 'Sep 28',
      status: 'SOLD',
      category: 'Industrial Lubricants',
      grade: 'Grade-B Mineral Hydraulic Oil (Moisture <0.04%)',
      estValue: '₹18,400',
      lotId: 'LG-OL-088',
      proximity: 'Delivered to EcoLube Re-Refinery Hub',
      buyerName: 'EcoLube Re-Refinery Hub',
      transitPartner: 'Southern Tanker Logistics (KA-01-TK-9022)',
      transitCost: '₹1,104',
      netPayout: '₹16,560',
      drpId: 'DRP-2026-OL-0391',
      iconType: 'droplet',
    },
    {
      id: 'ast-04',
      title: 'Polymer Injection Sprues (HDPE)',
      weight: '850 kg',
      date: 'Oct 14',
      status: 'IN_TRANSIT',
      category: 'Polymers & Plastics',
      grade: 'Virgin Unfilled Blow-Molding Grade',
      estValue: '₹34,000',
      lotId: 'LG-PL-318',
      proximity: 'Talegaon Toll Plaza En Route to Bhosari',
      buyerName: 'Supreme Polymer Recyclers & Extruders',
      transitPartner: 'BLR Express Fleet (MH-12-Q-4491)',
      transitCost: '₹2,040',
      netPayout: '₹30,600',
      drpId: 'DRP-2026-PL-7729',
      iconType: 'layers',
    },
  ]);

  // Master DRP database
  const [drpDatabase, setDrpDatabase] = useState<DRPRecord[]>(INITIAL_DRP_DATABASE);

  // Form State for Register Resources Tab
  const [newAssetForm, setNewAssetForm] = useState({
    title: '',
    category: 'Metals & Alloys',
    grade: '',
    weightNum: '',
    weightUnit: 'kg',
    condition: 'Dry & Clean',
    notes: '',
    dockAddress: currentProfile.address || 'Peenya Industrial Area Phase II, Bengaluru',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Search query in Search DRP tab
  const [drpSearchQuery, setDrpSearchQuery] = useState('');
  const [drpCategoryFilter, setDrpCategoryFilter] = useState('ALL');

  // Filtered Assets for MSME view
  const filteredAssets = assets.filter((item) => {
    if (assetFilter === 'ALL') return true;
    return item.status === assetFilter;
  });

  // Filtered DRPs for Search DRP
  const filteredDRPs = drpDatabase.filter((drp) => {
    const matchesCat = drpCategoryFilter === 'ALL' || drp.category.toLowerCase().includes(drpCategoryFilter.toLowerCase());
    const matchesQuery =
      drpSearchQuery.trim() === '' ||
      drp.drpId.toLowerCase().includes(drpSearchQuery.toLowerCase()) ||
      drp.resourceName.toLowerCase().includes(drpSearchQuery.toLowerCase()) ||
      drp.grade.toLowerCase().includes(drpSearchQuery.toLowerCase()) ||
      drp.originCluster.toLowerCase().includes(drpSearchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Helper to open DRP modal by DRP ID
  const handleInspectDrpById = (drpId: string) => {
    const found = drpDatabase.find((d) => d.drpId === drpId);
    if (found) {
      setSelectedDRP(found);
    } else {
      // Fallback: create dynamic record
      setSelectedDRP(drpDatabase[0]);
    }
  };

  // Handle Purchasing Lot from Marketplace with Credit Facility or Escrow
  const handlePurchaseMarketplaceLot = (
    drpId: string,
    paymentMethod: 'ESCROW_WALLET' | 'CREDIT_FACILITY',
    creditTerm?: '30_DAYS' | '60_DAYS' | '90_DAYS'
  ) => {
    setDrpDatabase((prev) =>
      prev.map((drp) => {
        if (drp.drpId === drpId) {
          const poId = `PO-PROC-${Math.floor(1000 + Math.random() * 9000)}`;
          return {
            ...drp,
            commercialStatus: 'IN_TRANSIT',
            buyerName: currentProfile.name || 'Processing Smelter Bay',
            purchaseOrderId: poId,
            currentLocation: `Dispatched from ${drp.originCluster} to ${currentProfile.name || 'Smelter Terminal'}`,
            transitDetails: {
              isInTransit: true,
              vehicleType: 'Heavy Truck',
              vehicleNumber: `Truck KA-${Math.floor(10 + Math.random() * 89)}-TR-${Math.floor(1000 + Math.random() * 9000)}`,
              carrierName: 'VRL Industrial Cargo Fleet (LoopGrid Dedicated)',
              driverName: 'Ramesh Gowda',
              driverPhone: '+91 94481 22910',
              currentGPS: '13.1287° N, 77.5833° E (Dispatched to Smelter)',
              currentMilestone: 'Consignment booked & dispatched from seller depot',
              speed: '45 km/h',
              routeProgressPercent: 12,
              eta: 'Estimated Delivery in 4 hours',
              originAddress: drp.originCluster,
              destinationAddress: currentProfile.address || 'Peenya Industrial Area Phase II, Bengaluru',
            },
            payoutBreakdown: {
              ...drp.payoutBreakdown,
              settlementStatus: paymentMethod === 'CREDIT_FACILITY' ? 'PROCESSING' : 'IN_ESCROW',
              utrNumber: `FIN-TC-${Math.floor(100000 + Math.random() * 900000)}`,
              settlementDate:
                paymentMethod === 'CREDIT_FACILITY'
                  ? `Financed via Trade Credit Advance (${creditTerm?.replace('_', ' ') || '60 Days'})`
                  : 'Settled in Escrow; auto-releases on gate weighment',
            },
          };
        }
        return drp;
      })
    );
  };

  // Handle Register Asset Submission
  const handleRegisterAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetForm.title || !newAssetForm.weightNum) return;

    const formattedWeight = `${newAssetForm.weightNum} ${newAssetForm.weightUnit}`;
    const newId = `ast-${Date.now().toString().slice(-4)}`;
    const randomLot = `LG-${newAssetForm.category.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const randomDrp = `DRP-2026-${newAssetForm.category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let icon: 'box' | 'textile' | 'droplet' | 'layers' = 'box';
    if (newAssetForm.category.includes('Textile')) icon = 'textile';
    else if (newAssetForm.category.includes('Oil') || newAssetForm.category.includes('Lubricant')) icon = 'droplet';
    else if (newAssetForm.category.includes('Polymer')) icon = 'layers';

    const weightKg = newAssetForm.weightUnit === 'Tons' ? parseFloat(newAssetForm.weightNum) * 1000 : parseFloat(newAssetForm.weightNum);
    const estValNum = Math.round(weightKg * 85);

    const addedAsset: ResourceAsset = {
      id: newId,
      title: newAssetForm.title,
      weight: formattedWeight,
      date: 'Today',
      status: 'LISTED',
      category: newAssetForm.category,
      grade: newAssetForm.grade || 'Standard Secondary Industrial Material',
      estValue: `₹${estValNum.toLocaleString('en-IN')}`,
      lotId: randomLot,
      proximity: 'AI Matching Nearest Regional Buyer (~15 km)',
      drpId: randomDrp,
      iconType: icon,
    };

    // Also register into DRP database with all 6 fields
    const newDrpRecord: DRPRecord = {
      drpId: randomDrp,
      resourceName: newAssetForm.title,
      grade: newAssetForm.grade || 'Standard Secondary Industrial Material',
      category: newAssetForm.category,
      batchWeight: formattedWeight,
      purityScore: '99.1% Verified',
      co2Saved: '1.92 kg CO₂e / kg',
      nablLab: 'NABL Certified Testing Facility #4189',
      originCluster: currentProfile.address || 'Peenya Industrial Area, Bengaluru',
      buyerCluster: 'Regional Smelting & Recycling Hub',
      verificationHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 8)}`,
      issuedDate: 'Today',
      currentLocation: currentProfile.address || 'MSME Shop Floor Scrap Yard',
      commercialStatus: 'LISTED',
      marketRate: {
        spotPrice: '₹85.00',
        priceUnit: 'per kg',
        benchmarkTrend: '+2.8% (Steady Demand)',
        dailyHigh: '₹86.50',
        dailyLow: '₹83.20',
        indexName: 'LoopGrid Spot Exchange',
      },
      payoutBreakdown: {
        grossLotValue: `₹${estValNum.toLocaleString('en-IN')}`,
        transitFreightDeduction: `-₹${Math.round(estValNum * 0.06).toLocaleString('en-IN')} (6.0%)`,
        platformClearingFee: `-₹${Math.round(estValNum * 0.04).toLocaleString('en-IN')} (4.0%)`,
        netUnitPayout: `₹${Math.round(estValNum * 0.9).toLocaleString('en-IN')}`,
        settlementStatus: 'PROCESSING',
        settlementDate: 'T+24h on Digital Gate Weighment',
      },
    };

    setAssets([addedAsset, ...assets]);
    setDrpDatabase([newDrpRecord, ...drpDatabase]);
    setRecycledTons((prev) => prev + (newAssetForm.weightUnit === 'Tons' ? parseFloat(newAssetForm.weightNum) : parseFloat(newAssetForm.weightNum) / 1000));
    setCo2SavedTons((prev) => prev + Math.round(parseFloat(newAssetForm.weightNum) * 0.4));
    setRegistrationSuccess(true);
  };

  // Reset form after registering
  const handleResetForm = () => {
    setNewAssetForm({
      title: '',
      category: 'Metals & Alloys',
      grade: '',
      weightNum: '',
      weightUnit: 'kg',
      condition: 'Dry & Clean',
      notes: '',
      dockAddress: currentProfile.address,
    });
    setRegistrationSuccess(false);
    setActiveTab('dashboard');
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return 'AM';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Tab 3 & 4 Dynamic Labels based on Role
  const getTab3Label = () => {
    switch (currentProfile.role) {
      case 'Processing Enterprise':
        return t.profile.procuredLots;
      case 'Transit Partner':
        return t.profile.activeShipments;
      case 'Banking Partner':
        return t.profile.financedDrps;
      default:
        return t.profile.yourDrps;
    }
  };

  const getTab4Label = () => {
    switch (currentProfile.role) {
      case 'Processing Enterprise':
        return t.profile.acquireLots;
      case 'Transit Partner':
        return t.profile.tripDispatch;
      case 'Banking Partner':
        return t.profile.underwriteAdvance;
      default:
        return t.profile.registerResources;
    }
  };

  // Dedicated Compliance Score Page view
  if (activeTab === 'compliance-score') {
    return (
      <ComplianceScorePage
        profile={currentProfile}
        onReturnToDashboard={() => setActiveTab('dashboard')}
      />
    );
  }

  // Dedicated Settings Page view (Opens when user clicks SETTINGS)
  if (activeTab === 'settings') {
    return (
      <SettingsPage
        profile={currentProfile}
        onBack={() => setActiveTab('dashboard')}
        onNavigateToSupport={onNavigateToSupport}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col font-sans selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Application Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
        <div className="max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Home button (Leads strictly to Profile Interface Homepage) */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`p-2 -ml-2 rounded-full transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#00875A] bg-emerald-50'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            title="Profile Dashboard Home"
            aria-label="Profile Dashboard Home"
          >
            <Home className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Center: Brand Name & Icon (Clicking leads to Profile Dashboard Home) */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-[#00875A] flex items-center justify-center text-white shadow-xs">
              <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#191C1E]">
              LoopGrid
            </span>
          </button>

          {/* Right: Notifications, Avatar & Explicit Sign Out button */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors relative cursor-pointer"
                title={t.profile.notificationsTitle}
                aria-label={t.profile.notificationsTitle}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-white" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-neutral-200 shadow-xl p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      {t.profile.notificationsTitle}
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-[#166534] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-900">Transit Partner Assigned</p>
                        <p className="text-neutral-600 text-[11px] mt-0.5">
                          Truck KA-04-E-2201 dispatched for Aluminum Lot #LG-AL-402 (KM 34 Milestone).
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">15m ago</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0369A1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-900">Bank Payout Disbursed</p>
                        <p className="text-neutral-600 text-[11px] mt-0.5">
                          ₹18,400 successfully credited to bank account for Lot #LG-OL-088.
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Circle with Initials (Clicking opens Profile Section) */}
            <button
              type="button"
              onClick={() => setActiveTab('profile-section')}
              className="w-8 h-8 rounded-full bg-[#00875A] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:ring-2 hover:ring-[#10B981]/50 transition-all cursor-pointer"
              title={t.profile.openProfileTooltip}
            >
              {getInitials(currentProfile.name)}
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
              title="Open Platform Settings"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.profile.settings || 'Settings'}</span>
            </button>

            {/* Explicit Sign Out Button (Leads to Landing Page) */}
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-red-700 hover:bg-red-50 border border-neutral-200 hover:border-red-200 transition-colors cursor-pointer"
              title="Sign Out and return to Landing Page"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.profile.signOut}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-5 pb-24 w-full">
        {/* Enterprise Profile Card (Clicking opens Profile Section) */}
        <div
          onClick={() => setActiveTab('profile-section')}
          className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {/* Factory/Industry Icon */}
              <div className="w-13 h-13 rounded-2xl bg-[#F1F3F5] text-neutral-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8F5E9] group-hover:text-[#1B5E20] transition-colors">
                {currentProfile.role === 'Transit Partner' && <Truck className="w-7 h-7 stroke-[1.8]" />}
                {currentProfile.role === 'Processing Enterprise' && <Building2 className="w-7 h-7 stroke-[1.8]" />}
                {currentProfile.role === 'Banking Partner' && <Landmark className="w-7 h-7 stroke-[1.8]" />}
                {currentProfile.role === 'MSME Enterprise' && <Boxes className="w-7 h-7 stroke-[1.8]" />}
              </div>

              {/* Enterprise Name, Role Badge & Admin Subtitle */}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#191C1E]">
                    {currentProfile.name || 'Enterprise'}
                  </h1>
                  <span className="text-[#00875A]" title="Verified Enterprise Node">
                    <CheckCircle2 className="w-4 h-4 fill-[#00875A] text-white stroke-[2.5]" />
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#166534] border border-[#C8E6C9]">
                    {currentProfile.role}
                  </span>
                  <span className="text-xs text-neutral-500">• Industrial Clearinghouse</span>
                </div>
              </div>
            </div>

            {/* Edit Icon Button */}
            <div
              className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:border-[#10B981] group-hover:text-[#1B5E20] transition-colors shadow-xs"
              title="Edit Profile Details"
            >
              <Edit3 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Quick Stats Highlights (Dynamic according to role) */}
        <div className="grid grid-cols-2 gap-3.5 mb-5">
          {/* Card 1 */}
          {currentProfile.role === 'MSME Enterprise' && (
            <div className="p-4 rounded-2xl bg-[#EAF8EE] border border-[#C8E6C9]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#166534] shadow-xs flex-shrink-0">
                <Recycle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534] block">
                  {t.profile.recycled}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    {recycledTons.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">Tons</span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Processing Enterprise' && (
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284C7] shadow-xs flex-shrink-0">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] block">
                  {t.profile.ingestedLots}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    3,850
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">Tons</span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Transit Partner' && (
            <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#B45309] shadow-xs flex-shrink-0">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] block">
                  {t.profile.activeFleet}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    18
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">Vehicles</span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Banking Partner' && (
            <div className="p-4 rounded-2xl bg-[#F3E8FF] border border-[#E9D5FF]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7C3AED] shadow-xs flex-shrink-0">
                <Landmark className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] block">
                  {t.profile.creditAdvanced}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    ₹4.85
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">Crore</span>
                </div>
              </div>
            </div>
          )}

          {/* Card 2 */}
          {currentProfile.role === 'MSME Enterprise' && (
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284C7] shadow-xs flex-shrink-0">
                <Cloud className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] block">
                  {t.profile.co2Saved}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    {co2SavedTons.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">Tons</span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Processing Enterprise' && (
            <div className="p-4 rounded-2xl bg-[#EAF8EE] border border-[#C8E6C9]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#166534] shadow-xs flex-shrink-0">
                <TrendingDown className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534] block">
                  {t.profile.feedstockSavings}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    -28.4%
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">vs Ore</span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Transit Partner' && (
            <div className="p-4 rounded-2xl bg-[#EAF8EE] border border-[#C8E6C9]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#166534] shadow-xs flex-shrink-0">
                <DollarSign className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534] block">
                  {t.profile.receivables}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    ₹1,42,800
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentProfile.role === 'Banking Partner' && (
            <div className="p-4 rounded-2xl bg-[#EAF8EE] border border-[#C8E6C9]/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#166534] shadow-xs flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534] block">
                  {t.profile.escrowRepayment}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#191C1E]">
                    99.9%
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">On-Time</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Navigation Bar / Horizontal Pill Tabs */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {t.profile.dashboard}
            </button>

            {/* LIVE PRICES (Scrap Commodity Stock Exchange quoted in ₹/kg) */}
            <button
              type="button"
              onClick={() => setActiveTab('live-prices')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'live-prices'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Prices</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ₹/kg
              </span>
            </button>

            {/* MARKETPLACE (Available Inventories with Credit Facility) */}
            <button
              type="button"
              onClick={() => setActiveTab('marketplace')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-sky-600" />
              <span>Marketplace</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                Credit Line
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('waste-diversion')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'waste-diversion'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.profile.wasteDiversion || 'Waste Diversion Chart'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('search-drp')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'search-drp'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {t.profile.searchDrp}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('your-drps')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'your-drps'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {getTab3Label()}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('managed-transit')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'managed-transit'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.profile.managedTransit || 'Managed Transit'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('activity-log')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'activity-log'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.profile.activityLog || 'Activity Log'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('register-resources')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'register-resources'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {getTab4Label()}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('payout')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'payout'
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {t.profile.payout}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: ROLE-SPECIFIC DASHBOARD                         */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <>
            {/* 1. TRANSIT PARTNER DASHBOARD */}
            {currentProfile.role === 'Transit Partner' && (
              <TransitDashboardView
                onInspectDrp={handleInspectDrpById}
                onDispatchTrip={() => setActiveTab('register-resources')}
              />
            )}

            {/* 2. PROCESSING ENTERPRISE DASHBOARD */}
            {currentProfile.role === 'Processing Enterprise' && (
              <ProcessingDashboardView
                drpDatabase={drpDatabase}
                enterpriseName={currentProfile.name}
                onInspectDrp={handleInspectDrpById}
                onAcquireLots={() => setActiveTab('marketplace')}
                onCheckComplianceScore={() => setActiveTab('compliance-score')}
                onViewActivityLog={() => setActiveTab('activity-log')}
                onViewTransitTracker={() => setActiveTab('managed-transit')}
                onNavigateToLivePrices={() => setActiveTab('live-prices')}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
                onNavigateToPriceExplainer={() => setActiveTab('price-explainer')}
              />
            )}

            {/* 3. FINANCING / BANKING PARTNER DASHBOARD */}
            {currentProfile.role === 'Banking Partner' && (
              <FinancingDashboardView
                onInspectDrp={handleInspectDrpById}
                onUnderwriteAdvance={() => setActiveTab('register-resources')}
              />
            )}

            {/* 4. MSME ENTERPRISE DASHBOARD (Original Resource Provider) */}
            {currentProfile.role === 'MSME Enterprise' && (
              <div className="space-y-6 animate-fade-in">
                {/* Executive Compliance Score Banner */}
                <div className="bg-gradient-to-r from-emerald-950 via-[#064E3B] to-[#047857] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-800/60">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 flex-shrink-0 shadow-xs border border-white/15">
                      <Scale className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/15 text-emerald-200">
                          CPCB & SPCB Regulatory Index
                        </span>
                        <span className="text-xs text-emerald-300 font-semibold">• Real-Time Updates</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {t.profile.complianceScoreBannerTitle}
                      </h3>
                      <p className="text-xs text-emerald-100 max-w-lg mt-0.5 leading-relaxed">
                        {t.profile.complianceScoreBannerSubtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('compliance-score')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-extrabold text-[#064E3B] bg-white hover:bg-emerald-50 active:scale-[0.98] transition-all shadow-md flex-shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.profile.checkComplianceScore}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Green Gradient Hero Action Card ("Register an Asset") */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-6 sm:p-8 text-white shadow-lg shadow-emerald-900/10">
                  <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute top-8 -right-6 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute -bottom-16 right-20 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-2xl" />

                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-5 shadow-xs">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {t.profile.registerAssetTitle}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-emerald-50 max-w-md font-normal leading-relaxed">
                    {t.profile.registerAssetSubtitle}
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab('register-resources')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#065F46] bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-md cursor-pointer"
                    >
                      <span>{t.profile.registerAssetBtn}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* LIVE COMMODITY STOCK EXCHANGE PRICES (Quoted in ₹/kg with real-time fluctuations) */}
                <LivePriceDashboardWidget
                  onNavigateToLivePrices={() => setActiveTab('live-prices')}
                  onNavigateToPriceExplainer={() => setActiveTab('price-explainer')}
                  onActionClick={() => setActiveTab('register-resources')}
                  actionType="MSME_LIST"
                />

                {/* Waste Diversion Over Time Visualization (Recharts Minimalist Chart) */}
                <WasteDiversionChart />

                {/* Asset Status Section */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-lg font-bold text-[#191C1E]">
                      {t.profile.liveScrapStreams}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setAssetFilter(assetFilter === 'ALL' ? 'LISTED' : 'ALL')}
                      className="text-xs sm:text-sm font-semibold text-[#00875A] hover:text-[#065F46] hover:underline cursor-pointer"
                    >
                      {assetFilter === 'ALL' ? 'View All' : 'Show All'}
                    </button>
                  </div>

                  {/* Asset Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-3 pb-1">
                    {(['ALL', 'LISTED', 'PENDING', 'SOLD', 'IN_TRANSIT'] as const).map((filter) => {
                      const getFilterLabel = () => {
                        switch (filter) {
                          case 'ALL':
                            return t.profile.allAssets;
                          case 'IN_TRANSIT':
                            return t.profile.inTransit;
                          case 'PENDING':
                            return t.profile.pending;
                          case 'SOLD':
                            return t.profile.sold;
                          case 'LISTED':
                            return t.profile.listed;
                        }
                      };
                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setAssetFilter(filter)}
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            assetFilter === filter
                              ? 'bg-neutral-800 text-white'
                              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          {getFilterLabel()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Asset List Items */}
                  <div className="space-y-3">
                    {filteredAssets.map((asset) => {
                      return (
                        <div
                          key={asset.id}
                          onClick={() => handleInspectDrpById(asset.drpId)}
                          className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs hover:border-[#10B981]/50 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-neutral-100 flex items-center justify-center text-neutral-600 flex-shrink-0 group-hover:bg-[#E8F5E9] group-hover:text-[#1B5E20] transition-colors">
                              {asset.iconType === 'box' && <Box className="w-5 h-5 stroke-[1.8]" />}
                              {asset.iconType === 'textile' && <Shirt className="w-5 h-5 stroke-[1.8]" />}
                              {asset.iconType === 'droplet' && <Droplets className="w-5 h-5 stroke-[1.8]" />}
                              {asset.iconType === 'layers' && <Layers className="w-5 h-5 stroke-[1.8]" />}
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-sm sm:text-base font-semibold text-[#191C1E] truncate group-hover:text-[#00875A] transition-colors">
                                {asset.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                                  {asset.weight}
                                </span>
                                <span className="text-xs text-neutral-400">
                                  {asset.date}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {asset.status === 'LISTED' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF8EE] text-[#166534] border border-[#C8E6C9]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                                LISTED
                              </span>
                            )}

                            {asset.status === 'PENDING' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                                <Clock className="w-3.5 h-3.5" />
                                PENDING
                              </span>
                            )}

                            {asset.status === 'SOLD' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F3F4F6] text-[#4B5563] border border-neutral-300">
                                <Check className="w-3.5 h-3.5" />
                                SOLD
                              </span>
                            )}

                            {asset.status === 'IN_TRANSIT' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                                <Truck className="w-3.5 h-3.5" />
                                IN TRANSIT
                              </span>
                            )}

                            <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 transition-colors hidden sm:block" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Spot Market Rate Ticker */}
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Live Resource Spot Market Rates
                    </span>
                    <span className="text-[11px] text-[#00875A] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00875A] animate-pulse" />
                      Live Feed
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-neutral-50">
                      <span className="text-neutral-400 block text-[10px]">Alloy 6061 Swarf</span>
                      <span className="font-bold text-neutral-900">₹85.00/kg</span>
                      <span className="text-emerald-700 font-semibold block text-[10px]">+3.4%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50">
                      <span className="text-neutral-400 block text-[10px]">Cotton Denim Bales</span>
                      <span className="font-bold text-neutral-900">₹24.00/kg</span>
                      <span className="text-emerald-700 font-semibold block text-[10px]">+1.8%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50">
                      <span className="text-neutral-400 block text-[10px]">HDPE Polymer Regrind</span>
                      <span className="font-bold text-neutral-900">₹40.00/kg</span>
                      <span className="text-neutral-500 font-semibold block text-[10px]">-0.5%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50">
                      <span className="text-neutral-400 block text-[10px]">Hydraulic Base Oil</span>
                      <span className="font-bold text-neutral-900">₹92.00/L</span>
                      <span className="text-emerald-700 font-semibold block text-[10px]">+4.1%</span>
                    </div>
                  </div>
                </div>

                {/* Managed Transit Status Visual Section for MSME Enterprise */}
                <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0369A1] flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#191C1E]">
                          {t.profile.managedTransit || 'Managed Transit'} Tracking
                        </h3>
                        <p className="text-[11px] text-neutral-500">
                          Live logistics stages & progress bars for registered scrap consignments
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('managed-transit')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1] hover:text-[#0C4A6E] hover:underline cursor-pointer"
                    >
                      <span>View Full Transit Tracker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ManagedTransitTracker
                    onInspectDrp={handleInspectDrpById}
                    onDispatchNewLot={() => setActiveTab('register-resources')}
                    isCompact={true}
                    maxCompactItems={2}
                  />
                </div>

                {/* Recent History / Activity Log Section for MSME Enterprise */}
                <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#191C1E]">
                          {t.profile.recentActivity || 'Recent Activity Log'}
                        </h3>
                        <p className="text-[11px] text-neutral-500">
                          Recent history of industrial resource lots registered or traded by your enterprise
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('activity-log')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] hover:text-[#1B5E20] hover:underline cursor-pointer"
                    >
                      <span>{t.profile.viewAllActivity || 'View Full Activity Log'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ActivityLogSection
                    onInspectDrp={handleInspectDrpById}
                    onRegisterNewAsset={() => setActiveTab('register-resources')}
                    isCompact={true}
                    maxCompactItems={3}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* VIEW: LIVE COMMODITY SCRAP PRICES (Stock Exchange)       */}
        {/* ======================================================== */}
        {activeTab === 'live-prices' && (
          <LivePricesExchange
            onNavigateToCalculationExplainer={() => setActiveTab('price-explainer')}
            onNavigateToMarketplace={(cat) => {
              setSelectedMarketplaceCat(cat);
              setActiveTab('marketplace');
            }}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW: PRICE CALCULATION EXPLAINER (Visual Guide)         */}
        {/* ======================================================== */}
        {activeTab === 'price-explainer' && (
          <PriceCalculationExplainer
            onBackToExchange={() => setActiveTab('live-prices')}
            onNavigateToMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW: MARKETPLACE (Processing Enterprise Procurement)    */}
        {/* ======================================================== */}
        {activeTab === 'marketplace' && (
          <MarketplaceView
            drpDatabase={drpDatabase}
            enterpriseName={currentProfile.name}
            onPurchaseLot={handlePurchaseMarketplaceLot}
            onInspectDrp={handleInspectDrpById}
            onNavigateToHowMarketplaceWorks={() => setActiveTab('how-marketplace-works')}
            preFilterCategory={selectedMarketplaceCat}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW: HOW MARKETPLACE WORKS (Visual Guide)               */}
        {/* ======================================================== */}
        {activeTab === 'how-marketplace-works' && (
          <HowMarketplaceWorks
            onBackToMarketplace={() => setActiveTab('marketplace')}
            onNavigateToLivePrices={() => setActiveTab('live-prices')}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW: WASTE DIVERSION OVER TIME (Recharts Analytics)     */}
        {/* ======================================================== */}
        {activeTab === 'waste-diversion' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  CPCB Schedule-II Validated
                </span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  Node #LG-DIV-2026
                </span>
              </div>
            </div>

            {/* Waste Diversion Chart with Minimalist Aesthetic */}
            <WasteDiversionChart />
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: SEARCH DRP (Digital Resource Passports Search)   */}
        {/* ======================================================== */}
        {activeTab === 'search-drp' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#191C1E]">
                    Search Digital Resource Passports (DRP)
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Query full identities: current location, sales status, live GPS tracking, spot market price, and final payout.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-3.5">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={drpSearchQuery}
                  onChange={(e) => setDrpSearchQuery(e.target.value)}
                  placeholder="Search by DRP ID, Alloy Grade, Origin Cluster, or Mill..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {(['ALL', 'Metals', 'Textiles', 'Polymers', 'Lubricants'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDrpCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      drpCategoryFilter === cat
                        ? 'bg-[#166534] text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Passports' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* DRP Search Results */}
            <div className="space-y-3">
              {filteredDRPs.map((drp) => (
                <div
                  key={drp.drpId}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-[#10B981] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#166534] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                          {drp.drpId}
                        </span>
                        <span className="text-xs text-neutral-400">
                          Issued {drp.issuedDate}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#191C1E] mt-1.5">
                        {drp.resourceName}
                      </h4>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {drp.grade}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                          Spot Market Rate
                        </span>
                        <span className="text-sm font-black text-[#166534]">
                          {drp.marketRate.spotPrice}
                        </span>
                      </div>
                      <div className="text-right pl-3 border-l border-neutral-200">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                          Net Payout
                        </span>
                        <span className="text-sm font-black text-[#0284C7]">
                          {drp.payoutBreakdown.netUnitPayout}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Status preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">Current: {drp.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 sm:justify-end">
                      <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>Status: {drp.commercialStatus.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
                    <span className="text-xs text-neutral-400 font-mono">
                      {drp.verificationHash}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDRP(drp)}
                      className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] transition-colors cursor-pointer"
                    >
                      Inspect Full DRP Passport →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: YOUR DRPs / PRODUCED / ASSIGNED DRPs            */}
        {/* ======================================================== */}
        {activeTab === 'your-drps' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#191C1E]">
                    {getTab3Label()} ({drpDatabase.length})
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Whole and sole identity records for all resources uploaded and tracked across the network.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('register-resources')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#166534] hover:bg-[#0f4423] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Resource</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {drpDatabase.map((drp) => (
                <div
                  key={drp.drpId}
                  className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:border-[#10B981] transition-all space-y-3.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                        <QrCode className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#166534] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                            {drp.drpId}
                          </span>
                          <span className="text-[11px] font-semibold text-neutral-500">
                            {drp.batchWeight}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-neutral-900 mt-1">
                          {drp.resourceName}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        drp.commercialStatus === 'IN_TRANSIT'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : drp.commercialStatus === 'BEING_SOLD'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {drp.commercialStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* 6 Required Fields Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        1. Current Location
                      </span>
                      <span className="font-semibold text-neutral-800 truncate block mt-0.5">
                        {drp.currentLocation}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                        5. Spot Market Rate
                      </span>
                      <span className="font-extrabold text-[#1B5E20] block mt-0.5">
                        {drp.marketRate.spotPrice} {drp.marketRate.priceUnit}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                      <span className="text-[10px] uppercase font-bold text-sky-800 block">
                        6. Final Unit Payout
                      </span>
                      <span className="font-extrabold text-[#0369A1] block mt-0.5">
                        {drp.payoutBreakdown.netUnitPayout}
                      </span>
                    </div>
                  </div>

                  {/* Live Tracking snippet if in transit */}
                  {drp.transitDetails && drp.commercialStatus === 'IN_TRANSIT' && (
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-700" />
                        <span className="font-semibold text-blue-950">
                          {drp.transitDetails.vehicleNumber} ({drp.transitDetails.speed})
                        </span>
                      </div>
                      <span className="text-blue-700 font-bold">
                        ETA: {drp.transitDetails.eta}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      NABL Purity: <strong className="text-emerald-700">{drp.purityScore}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDRP(drp)}
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#191C1E] hover:bg-[#1B5E20] transition-colors cursor-pointer"
                    >
                      View Full DRP Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW: MANAGED TRANSIT (Consignment Progress Bars Tracker)*/}
        {/* ======================================================== */}
        {activeTab === 'managed-transit' && (
          <ManagedTransitTracker
            onInspectDrp={handleInspectDrpById}
            onDispatchNewLot={() => setActiveTab('register-resources')}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW: ACTIVITY LOG (History of registered/traded lots)   */}
        {/* ======================================================== */}
        {activeTab === 'activity-log' && (
          <ActivityLogSection
            onInspectDrp={handleInspectDrpById}
            onRegisterNewAsset={() => setActiveTab('register-resources')}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW 4: REGISTER RESOURCES TAB                          */}
        {/* ======================================================== */}
        {activeTab === 'register-resources' && (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs animate-fade-in">
            <div className="mb-6 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                  Circular Inventory Gateway
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#191C1E]">
                {currentProfile.role === 'Processing Enterprise'
                  ? 'Request Specific Resource Lot'
                  : currentProfile.role === 'Transit Partner'
                  ? 'Register Vehicle for Consignment Dispatch'
                  : currentProfile.role === 'Banking Partner'
                  ? 'Create MSME Advance Mandate'
                  : 'Register Unwanted Industrial Resources'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Generate a verifiable Digital Resource Passport (DRP) to unlock automated lot pooling, proximity transit matching, and instant payments.
              </p>
            </div>

            {registrationSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#191C1E]">
                    Resource Registered & DRP Generated!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-md mx-auto">
                    Your scrap lot has been accredited into the LoopGrid clearinghouse. AI proximity matching is actively pooling with regional suppliers.
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00875A] hover:bg-[#065F46] cursor-pointer"
                  >
                    View in Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterAssetSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Resource Stream Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAssetForm.title}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, title: e.target.value })}
                    placeholder="e.g., CNC Aluminum 6061 Swarf, Denim Selvedge Offcuts..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Resource Category *
                    </label>
                    <select
                      value={newAssetForm.category}
                      onChange={(e) => setNewAssetForm({ ...newAssetForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] bg-white"
                    >
                      <option>Metals & Alloys</option>
                      <option>Textiles & Leather</option>
                      <option>Polymers & Plastics</option>
                      <option>Industrial Lubricants</option>
                      <option>Foundry Slag & Sand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Material Grade / Chemical Spec
                    </label>
                    <input
                      type="text"
                      value={newAssetForm.grade}
                      onChange={(e) => setNewAssetForm({ ...newAssetForm, grade: e.target.value })}
                      placeholder="e.g., 6061-T6, Pure Indigo 400 GSM..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Batch Quantity / Weight *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newAssetForm.weightNum}
                      onChange={(e) => setNewAssetForm({ ...newAssetForm, weightNum: e.target.value })}
                      placeholder="e.g., 500"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Unit of Measure
                    </label>
                    <select
                      value={newAssetForm.weightUnit}
                      onChange={(e) => setNewAssetForm({ ...newAssetForm, weightUnit: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] bg-white"
                    >
                      <option value="kg">kg (Kilograms)</option>
                      <option value="Tons">Tons (Metric Tons)</option>
                      <option value="L">L (Liters)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Pickup Dock Address
                  </label>
                  <input
                    type="text"
                    value={newAssetForm.dockAddress}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, dockAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Generate Sovereign DRP & Publish Lot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: PAYOUT & CLEARINGHOUSE LEDGER                    */}
        {/* ======================================================== */}
        {activeTab === 'payout' && (
          <div className="space-y-5 animate-fade-in">
            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                    Clearinghouse Settlement
                  </span>
                  <h3 className="text-xl font-bold text-[#191C1E] mt-1">
                    Real-Time Financial Waterfall & Bank Payouts
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              {/* Economic Waterfall Summary */}
              <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Gross Resource Value (Cleared Trades):</span>
                  <span className="font-bold text-white text-sm">₹1,23,700</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Transit Logistics Deduction (Direct Carrier Settlement):</span>
                  <span className="font-semibold text-amber-400">-₹7,060</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>LoopGrid Clearinghouse Protocol Fee (4.0%):</span>
                  <span className="font-semibold text-neutral-400">-₹4,948</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm sm:text-base font-bold">
                  <span className="text-white">Net Credited Payout (To Enterprise Account):</span>
                  <span className="text-emerald-400 font-extrabold text-lg">₹1,11,692</span>
                </div>
              </div>
            </div>

            {/* Bank Transfer History */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider">
                Direct Bank Transfer History (NEFT / RTGS)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-900 block">₹18,400 Credited</span>
                    <span className="text-neutral-500 text-[11px]">Hydraulic Oil Lot #LG-OL-088 • UTR #CITI2610168892</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    SETTLED
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-900 block">₹38,250 Locked in Escrow</span>
                    <span className="text-neutral-500 text-[11px]">Aluminum Lot #LG-AL-402 • Releases on Smelter Gate Weighment</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                    IN TRANSIT ESCROW
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 6: PROFILE SECTION & ENTERPRISE DETAILS             */}
        {/* ======================================================== */}
        {activeTab === 'profile-section' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold text-lg">
                    {getInitials(currentProfile.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#191C1E]">
                      {currentProfile.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Enterprise Profile & Sovereign ID
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t.profile.editProfileBtn}</span>
                </button>
              </div>

              {/* 7 Enterprise Fields */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.name}</span>
                    <span className="font-bold text-neutral-900">{currentProfile.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                    <Phone className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.phone}</span>
                      <span className="font-semibold text-neutral-800">{currentProfile.phone}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                    <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.email}</span>
                      <span className="font-semibold text-neutral-800">{currentProfile.email}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.dealsIn}</span>
                    <span className="font-semibold text-neutral-800">{currentProfile.businessDealsIn}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                  <Boxes className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.resources}</span>
                    <span className="font-semibold text-neutral-800">{currentProfile.majorResources}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.role}</span>
                      <span className="font-bold text-[#166534]">{currentProfile.role}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase font-bold text-neutral-400 block">{t.profile.address}</span>
                      <span className="font-semibold text-neutral-800">{currentProfile.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SETTINGS Option (Above the Sign Out button as requested) */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 rounded-3xl p-5 sm:p-6 text-white border border-neutral-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#2997FF] flex-shrink-0 shadow-xs border border-white/10">
                      <Settings className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">Platform Settings</h4>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#2997FF]/20 text-[#38BDF8] border border-[#2997FF]/30">
                          Separate Page
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 max-w-md leading-relaxed">
                        Change language, configure real-time transit telemetry, compliance filters, view statutory about documents, licences, and customer support.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-neutral-900 bg-white hover:bg-neutral-100 active:scale-[0.98] transition-all cursor-pointer shadow-sm flex-shrink-0"
                  >
                    <Settings className="w-4 h-4 text-neutral-700" />
                    <span>Open Settings</span>
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Sign Out Button to return to landing page */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-neutral-400">
                  To return to the platform landing page, click Sign Out.
                </p>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.profile.signOut}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DRP Certificate Modal with ALL 6 Required Data Points */}
      {selectedDRP && (
        <DrpDetailModal
          drp={selectedDRP}
          onClose={() => setSelectedDRP(null)}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="text-lg font-bold text-neutral-900">
                Edit Enterprise Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Enterprise Name</label>
                <input
                  type="text"
                  value={currentProfile.name}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={currentProfile.phone}
                    onChange={(e) => setCurrentProfile({ ...currentProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentProfile.email}
                    onChange={(e) => setCurrentProfile({ ...currentProfile, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Business Deals In</label>
                <input
                  type="text"
                  value={currentProfile.businessDealsIn}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, businessDealsIn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Address</label>
                <input
                  type="text"
                  value={currentProfile.address}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#00875A] hover:bg-[#065F46] cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Navigation Bar (Home strictly leads to Profile Homepage) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 shadow-lg">
        <div className="max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-6 h-15 flex items-center justify-around">
          {/* Home (Goes to Dashboard within Profile Interface) */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors py-1 px-4 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#00875A] font-bold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2]" />
            <span className="text-[11px] font-medium">Home</span>
            {activeTab === 'dashboard' && (
              <span className="w-1 h-1 rounded-full bg-[#00875A] mt-0.2" />
            )}
          </button>

          {/* Trade / Process */}
          <button
            type="button"
            onClick={() => setActiveTab('search-drp')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors py-1 px-4 cursor-pointer ${
              activeTab === 'search-drp' || activeTab === 'register-resources'
                ? 'text-[#00875A] font-bold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <RefreshCw className="w-5 h-5 stroke-[2]" />
            <span className="text-[11px] font-medium">Trade</span>
            {(activeTab === 'search-drp' || activeTab === 'register-resources') && (
              <span className="w-1 h-1 rounded-full bg-[#00875A] mt-0.2" />
            )}
          </button>

          {/* Profile Section */}
          <button
            type="button"
            onClick={() => setActiveTab('profile-section')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors py-1 px-4 cursor-pointer ${
              activeTab === 'profile-section'
                ? 'text-[#00875A] font-bold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <User className="w-5 h-5 stroke-[2]" />
            <span className="text-[11px] font-medium">Profile</span>
            {activeTab === 'profile-section' && (
              <span className="w-1 h-1 rounded-full bg-[#00875A] mt-0.2" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
