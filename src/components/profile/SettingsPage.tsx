import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  SlidersHorizontal,
  ShieldCheck,
  Globe,
  Bell,
  Lock,
  FileText,
  BookOpen,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Scale,
  RefreshCw,
  X,
  Info,
  Layers,
  Cpu,
  Fingerprint,
  Award,
} from 'lucide-react';
import { LanguageToggle } from '../LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import { EnterpriseProfile } from '../ProfilePage';

interface SettingsPageProps {
  profile: EnterpriseProfile;
  onBack: () => void;
  onNavigateToSupport?: () => void;
}

type ModalType =
  | 'about'
  | 'terms'
  | 'privacy'
  | 'acknowledgements'
  | 'userGuide'
  | 'diagnostics'
  | 'legal'
  | 'licences'
  | null;

export const SettingsPage: React.FC<SettingsPageProps> = ({
  profile,
  onBack,
  onNavigateToSupport,
}) => {
  const { t, currentLanguageOption } = useLanguage();

  // Preferences Toggles
  const [showLiveRates, setShowLiveRates] = useState(true);
  const [priceVolatilityAlerts, setPriceVolatilityAlerts] = useState(true);
  const [useTransitTelemetry, setUseTransitTelemetry] = useState(true);
  const [escrowAlerts, setEscrowAlerts] = useState(true);
  const [compactView, setCompactView] = useState(false);

  // Security & Privacy Toggles
  const [shareAnalytics, setShareAnalytics] = useState(true);
  const [hazardousSegregation, setHazardousSegregation] = useState(true);
  const [nablMandate, setNablMandate] = useState(true);
  const [twoFactorAlerts, setTwoFactorAlerts] = useState(true);

  // Active modal for separate pages / about views
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] font-sans selection:bg-[#E8F5E9] selection:text-[#1B5E20] pb-24">
      {/* Top Application Bar with Back Button */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Return to Profile Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
            <div className="h-5 w-px bg-neutral-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#00875A] flex items-center justify-center text-white shadow-xs">
                <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#191C1E]">
                  Settings & Preferences
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#E8F5E9] text-[#166534] border border-[#C8E6C9]">
              {profile.role}
            </span>
            <span className="text-xs text-neutral-500 hidden md:inline font-mono">
              Node #LG-2026-{profile.phone.slice(-4)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid-Based Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-12">
        {/* Executive Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-neutral-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Operating Hub • Sovereign Ledger Configuration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Platform Architecture & Preferences
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Manage your enterprise identity, customize Indian regional languages, configure real-time scrap market telemetry, and review statutory CPCB & NABL compliance standards.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  CPCB Sovereign Status
                </span>
                <span className="font-bold text-white text-sm">Active & Certified</span>
                <span className="text-[10px] text-neutral-300 block">Form-10 Auto Manifests</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: ACCOUNT INFORMATION                           */}
        {/* ======================================================== */}
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1B5E20] border border-emerald-100 flex items-center justify-center font-bold shadow-xs">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#191C1E]">
                  Account Information
                </h3>
                <p className="text-xs text-neutral-500">
                  Verified enterprise credentials, facility location, and authorized circular operations.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 hidden sm:inline">
              4 Data Modules
            </span>
          </div>

          {/* Grid Layout: 3 Columns on Desktop, 1 on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Enterprise Profile & Identification */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Entity Verification
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-900 leading-snug">
                  {profile.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Node: #LG-IN-{profile.phone.slice(-4)}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-xs space-y-2 text-neutral-600">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Operational Role:</span>
                  <span className="font-semibold text-neutral-800">{profile.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Udyam Registration:</span>
                  <span className="font-mono text-neutral-800">UDYAM-KR-03-09214</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">CPCB Category:</span>
                  <span className="font-semibold text-emerald-700">Green & Orange Cluster</span>
                </div>
              </div>
            </div>

            {/* Card 2: Contact & Authorized Person */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Authorized Contact
                </span>
                <span className="text-xs text-neutral-400 font-mono">2FA Active</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Dispatch Phone</span>
                    <span className="font-bold text-neutral-900">{profile.phone}</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">WhatsApp Notifications Linked</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-neutral-100">
                  <Mail className="w-4 h-4 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Registered Email</span>
                    <span className="font-semibold text-neutral-800 break-all">{profile.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Facility Location & Operating Depot */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Operating Depot
                </span>
                <span className="text-xs text-neutral-400 font-mono">GPS Geofenced</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Industrial Address</span>
                    <span className="font-semibold text-neutral-800 leading-relaxed block">{profile.address}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Industrial Zone:</span>
                    <strong className="text-neutral-800">Cluster Hub IV</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Highway Transit Corridor:</span>
                    <strong className="text-neutral-800">NH-48 Golden Quad</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: PREFERENCES (INCLUDING LANGUAGE DROPDOWN)      */}
        {/* ======================================================== */}
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center font-bold shadow-xs">
                <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#191C1E]">
                  Preferences
                </h3>
                <p className="text-xs text-neutral-500">
                  Regional language selection, live market tickers, and real-time transit telemetry settings.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hidden sm:inline">
              Multi-Language & Alerts
            </span>
          </div>

          {/* Grid Layout: Top Feature Card (Language) + 2 Preference Sub-Cards */}
          <div className="space-y-5">
            {/* FEATURE CARD: LANGUAGE SELECTION (NO OVERFLOW-HIDDEN SO DROPDOWN OVERLAPS FREELY!) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs relative z-40 overflow-visible transition-all hover:border-emerald-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                      Indian Regional Manufacturing Language
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    Platform Language & Localization
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Select your preferred regional language. This instantly updates the entire user interface, lot descriptions, DRP passports, and statutory audit reports across all roles.
                  </p>

                  {/* Active Language Chip */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-700">Currently Active:</span>
                    <span className="font-bold text-[#1B5E20] bg-[#E8F5E9] px-3 py-1 rounded-full border border-[#C8E6C9]">
                      {currentLanguageOption.nativeName} ({currentLanguageOption.name})
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      • Regional Hub: {currentLanguageOption.region}
                    </span>
                  </div>
                </div>

                {/* THE LANGUAGE DROPDOWN: Housed directly in Preferences */}
                <div className="self-start lg:self-center flex-shrink-0 relative z-50">
                  <LanguageToggle
                    variant="profile-dropdown"
                    buttonLabel={t.profile.changeLanguage || 'Change Language'}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Grid for Ticker and Transit Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {/* Card A: Live Spot Scrap Rates & Volatility Ticker */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#1B5E20]" />
                    <span className="text-sm font-bold text-neutral-900">
                      Spot Market Rate Feeds
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">NCDEX / MCX</span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Toggle: Live Market Rates */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-neutral-900 block">
                        Live Spot Rate Ticker
                      </span>
                      <span className="text-neutral-500 text-[11px] mt-0.5 block">
                        Display real-time per-kg market rates for Aluminum, Brass, and Copper.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLiveRates(!showLiveRates)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        showLiveRates ? 'bg-[#00875A]' : 'bg-neutral-300'
                      }`}
                      role="switch"
                      aria-checked={showLiveRates}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                          showLiveRates ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle: Volatility Alerts */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div>
                      <span className="font-bold text-neutral-900 block">
                        Commodity Price Shift Alerts
                      </span>
                      <span className="text-neutral-500 text-[11px] mt-0.5 block">
                        SMS & WhatsApp notifications when spot scrap rates shift by &gt;3%.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPriceVolatilityAlerts(!priceVolatilityAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        priceVolatilityAlerts ? 'bg-[#00875A]' : 'bg-neutral-300'
                      }`}
                      role="switch"
                      aria-checked={priceVolatilityAlerts}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                          priceVolatilityAlerts ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card B: Transit Logistics & Telemetry Relays */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#1B5E20]" />
                    <span className="text-sm font-bold text-neutral-900">
                      Logistics Telemetry & Payouts
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">IoT Relays</span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Toggle: Transit Telemetry */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-neutral-900 block">
                        Real-Time Highway GPS Telemetry
                      </span>
                      <span className="text-neutral-500 text-[11px] mt-0.5 block">
                        Live waypoint notifications as carrier trucks cross key toll corridors.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseTransitTelemetry(!useTransitTelemetry)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        useTransitTelemetry ? 'bg-[#00875A]' : 'bg-neutral-300'
                      }`}
                      role="switch"
                      aria-checked={useTransitTelemetry}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                          useTransitTelemetry ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle: Escrow Alerts */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div>
                      <span className="font-bold text-neutral-900 block">
                        Instant Escrow Payout Releases
                      </span>
                      <span className="text-neutral-500 text-[11px] mt-0.5 block">
                        Immediate bank credit confirmation when smelter gate weighment reconciles.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEscrowAlerts(!escrowAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        escrowAlerts ? 'bg-[#00875A]' : 'bg-neutral-300'
                      }`}
                      role="switch"
                      aria-checked={escrowAlerts}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                          escrowAlerts ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: SECURITY & PRIVACY                            */}
        {/* ======================================================== */}
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#191C1E]">
                  Security & Privacy
                </h3>
                <p className="text-xs text-neutral-500">
                  Industrial data sovereignty, cryptographic assay integrity, and CPCB Schedule-II restrictions.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 hidden sm:inline">
              Data Sovereignty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Data Sovereignty Guarantee */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Industrial Privacy
                </span>
                <span className="text-xs text-emerald-700 font-bold">100% Sovereign</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 text-xs text-neutral-600 leading-relaxed">
                <strong className="text-neutral-900 block mb-1">Zero Blueprint Exposure Guarantee:</strong>
                LoopGrid records only metallurgical purity, weight, and transit proofs. Your internal CAD designs, client rosters, and proprietary alloy recipes are never exposed.
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-neutral-800">
                  Share Anonymized Material Assays
                </span>
                <button
                  type="button"
                  onClick={() => setShareAnalytics(!shareAnalytics)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                    shareAnalytics ? 'bg-[#00875A]' : 'bg-neutral-300'
                  }`}
                  role="switch"
                  aria-checked={shareAnalytics}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      shareAnalytics ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Card 2: Regulatory Restrictions & Hazardous Filter */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Statutory Filtering
                </span>
                <span className="text-xs text-neutral-400 font-mono">CPCB 2026</span>
              </div>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-900 block">
                      Hazardous Scrap Segregation
                    </span>
                    <span className="text-neutral-500 text-[11px] block mt-0.5">
                      Strict exclusion of uncertified toxic heavy metals per CPCB Schedule-II.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHazardousSegregation(!hazardousSegregation)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                      hazardousSegregation ? 'bg-[#00875A]' : 'bg-neutral-300'
                    }`}
                    role="switch"
                    aria-checked={hazardousSegregation}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                        hazardousSegregation ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div>
                    <span className="font-bold text-neutral-900 block">
                      NABL 17025 Calibration Check
                    </span>
                    <span className="text-neutral-500 text-[11px] block mt-0.5">
                      Enforce spectroscopic batch verification on all high-grade lots.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNablMandate(!nablMandate)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                      nablMandate ? 'bg-[#00875A]' : 'bg-neutral-300'
                    }`}
                    role="switch"
                    aria-checked={nablMandate}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                        nablMandate ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Cryptographic Ledger & Sovereign Hash */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Cryptographic Integrity
                </span>
                <span className="text-xs text-[#1B5E20] font-bold">SHA-256</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-50 flex justify-between">
                  <span className="text-neutral-500">Genesis Block:</span>
                  <span className="font-mono text-neutral-900 font-bold">0x8f2a...8fa1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 flex justify-between">
                  <span className="text-neutral-500">Escrow Standard:</span>
                  <span className="text-neutral-900 font-bold">RBI PA/PG Compliant</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 flex justify-between">
                  <span className="text-neutral-500">Active Terminal:</span>
                  <span className="text-emerald-700 font-bold">Authenticated Node</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('diagnostics')}
                className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Inspect Cryptographic Audit Proofs
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: ABOUT, STATUTORY FRAMEWORK & SUPPORT DESK     */}
        {/* ======================================================== */}
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-800 border border-purple-100 flex items-center justify-center font-bold shadow-xs">
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#191C1E]">
                  About, Governance & Support
                </h3>
                <p className="text-xs text-neutral-500">
                  Regulatory frameworks, enterprise service agreements, user manuals, and priority customer support.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 hidden sm:inline">
              Statutory Governance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. About LoopGrid Platform */}
            <button
              type="button"
              onClick={() => setActiveModal('about')}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-sky-300 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Platform Architecture
              </span>
              <span className="text-sm font-bold text-[#0284C7] group-hover:text-sky-600 transition-colors flex items-center justify-between">
                About LoopGrid Sovereign Ledger
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600" />
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Zero-landfill industrial diversion metrics and sovereign DRP passport system.
              </p>
            </button>

            {/* 2. Terms & Enterprise Conditions */}
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-sky-300 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Legal & SLA
              </span>
              <span className="text-sm font-bold text-[#0284C7] group-hover:text-sky-600 transition-colors flex items-center justify-between">
                Terms & Conditions (Enterprise SLA)
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600" />
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                ±0.5% weighbridge tolerance, smart contract escrow releases, and dispute rules.
              </p>
            </button>

            {/* 3. Privacy Policy */}
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-sky-300 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Data Sovereignty
              </span>
              <span className="text-sm font-bold text-[#0284C7] group-hover:text-sky-600 transition-colors flex items-center justify-between">
                Privacy Policy & Industrial Rights
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600" />
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Strict protection of proprietary factory blueprints and tooling parameters.
              </p>
            </button>

            {/* 4. Statutory Acknowledgements */}
            <button
              type="button"
              onClick={() => setActiveModal('acknowledgements')}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-sky-300 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Accreditations
              </span>
              <span className="text-sm font-bold text-[#0284C7] group-hover:text-sky-600 transition-colors flex items-center justify-between">
                Statutory Acknowledgements & NABL
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600" />
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                CPCB, Ministry of MSME, and ISO/IEC 17025 accredited laboratory partnerships.
              </p>
            </button>

            {/* 5. User Guide */}
            <button
              type="button"
              onClick={() => setActiveModal('userGuide')}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-sky-300 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Documentation
              </span>
              <span className="text-sm font-bold text-[#0284C7] group-hover:text-sky-600 transition-colors flex items-center justify-between">
                LoopGrid App User Guide
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600" />
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Operational instructions for MSME scrap providers, secondary smelters, and fleets.
              </p>
            </button>

            {/* 6. GET SUPPORT DESK (Leads to Separate Support Page!) */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateToSupport) {
                  onNavigateToSupport();
                } else {
                  window.location.hash = '#support';
                }
              }}
              className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 border border-emerald-300 hover:border-emerald-500 hover:shadow-sm text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">
                  24/7 Enterprise Help
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Separate Page
                </span>
              </div>
              <span className="text-sm font-bold text-[#00875A] group-hover:text-[#166534] transition-colors flex items-center justify-between">
                Get Enterprise Customer Support
                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <p className="text-xs text-neutral-600 mt-1">
                Submit priority tickets, dispute weighments, or reach 24/7 transit dispatch.
              </p>
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* FOOTER & ATTRIBUTION                                     */}
        {/* ======================================================== */}
        <div className="pt-8 pb-12 border-t border-neutral-200 text-center space-y-2 text-xs text-neutral-500">
          <p className="font-mono text-neutral-400">
            LoopGrid Platform Genesis • Version 3.4.2 (Build 3000061) • SHA-256 Ledger
          </p>
          <p className="font-semibold text-neutral-700 text-sm">
            Designed and developed by Darshil Jain
          </p>
          <p>
            Copyright © 2026 LoopGrid Inc. All rights reserved. Sovereign Indian Circular Economy Network.
          </p>
        </div>
      </main>

      {/* ======================================================== */}
      {/* SEPARATE MODAL VIEWS                                     */}
      {/* ======================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-neutral-900 max-h-[85vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold">
                  <Info className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {activeModal === 'about' && 'About LoopGrid Platform & Sovereign Ledger'}
                  {activeModal === 'terms' && 'Enterprise Terms & Conditions (SLA)'}
                  {activeModal === 'privacy' && 'Data Sovereignty & Industrial Privacy Policy'}
                  {activeModal === 'acknowledgements' && 'Statutory Acknowledgements & Certifications'}
                  {activeModal === 'userGuide' && 'LoopGrid Platform User Guide'}
                  {activeModal === 'diagnostics' && 'Cryptographic Ledger Verification & Diagnostics'}
                  {activeModal === 'legal' && 'Legal & Sovereign Contract Framework'}
                  {activeModal === 'licences' && 'Statutory Operating Licences'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-xs sm:text-sm text-neutral-700 space-y-4 leading-relaxed">
              {activeModal === 'about' && (
                <>
                  <p>
                    <strong className="text-neutral-900">LoopGrid</strong> is India’s sovereign circular resource infrastructure designed specifically for Micro, Small, and Medium Enterprises (MSMEs), secondary metallurgy smelters, and industrial carriers.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] space-y-2">
                    <h4 className="font-bold text-[#166534] text-xs uppercase tracking-wider">
                      Key Architectural Pillars:
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-700 text-xs">
                      <li><strong>Digital Resource Passport (DRP):</strong> Cryptographically signed lot manifest recording material purity, moisture, and origin.</li>
                      <li><strong>Automated Logistics Telemetry:</strong> Fixed-rate transit matching with GPS waypoint tracking on Indian highway corridors.</li>
                      <li><strong>T+1 Escrow Settlements:</strong> Direct NEFT/RTGS bank payouts triggered upon smelter weighment reconciliation.</li>
                      <li><strong>Statutory Proofs:</strong> Automated CPCB Form-10 generation and NABL 17025 assay matching.</li>
                    </ul>
                  </div>
                  <p>
                    Designed and engineered by <strong className="text-neutral-900">Darshil Jain</strong> to prevent millions of metric tons of recyclable metal, polymer, and textile scraps from ending up in landfills.
                  </p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p>
                    These Enterprise Terms govern the registration, custody transfer, testing, transit, and payout execution for all industrial secondary lots managed on LoopGrid.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-bold text-neutral-900">1. Weight & Assay Tolerance</h4>
                    <p className="text-neutral-600 text-xs">
                      Gross certified weighments at the generator node are cross-verified at the secondary buyer weighbridge. A statutory tolerance of ±0.5% is acceptable. Variances exceeding 0.5% hold the escrow balance and trigger independent third-party surveyor arbitration.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-neutral-900">2. Escrow Release Protocol</h4>
                    <p className="text-neutral-600 text-xs">
                      Payout balances are held in an RBI-compliant bank escrow account and automatically credited via NEFT/RTGS within 24 hours of electronic proof-of-delivery (e-POD) sign-off.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    LoopGrid adheres to strict <strong className="text-neutral-900">Industrial Data Sovereignty</strong>. We recognize that manufacturing offcut volumes and tooling recipes constitute sensitive business intelligence.
                  </p>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Zero Proprietary Exposure</span>
                    </div>
                    <p className="text-neutral-600">
                      Your factory blueprints, customer rosters, and internal job work order codes are never stored on public registries. Only anonymized metallurgical specs, lot weights, and location geofences are shared with authorized buyers.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'acknowledgements' && (
                <>
                  <p>
                    LoopGrid gratefully acknowledges the standards, regulatory guidelines, and statutory testing protocols established by:
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold">Central Pollution Control Board (CPCB)</strong>
                      <span className="text-neutral-600">Hazardous & Other Wastes (Management & Transboundary Movement) Rules 2016 / 2026 amendments.</span>
                    </li>
                    <li className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold">National Accreditation Board for Testing and Calibration Laboratories (NABL)</strong>
                      <span className="text-neutral-600">ISO/IEC 17025 metallurgical spectroscopy testing standards.</span>
                    </li>
                    <li className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold">Ministry of Micro, Small and Medium Enterprises (MSME)</strong>
                      <span className="text-neutral-600">Zero Defect Zero Effect (ZED) sustainability framework and Udyam registry synchronization.</span>
                    </li>
                  </ul>
                </>
              )}

              {activeModal === 'userGuide' && (
                <>
                  <p className="font-semibold text-neutral-800">
                    Complete operational handbook for industrial nodes:
                  </p>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold mb-1">Step 1: Register Scrap Stream</strong>
                      <p className="text-neutral-600">Specify material category (e.g. Aluminum 6061 swarf, copper wiring, textile fiber), weight, and pick-up bay location.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold mb-1">Step 2: Mint DRP Passport</strong>
                      <p className="text-neutral-600">LoopGrid issues a cryptographic QR passport with assay validation and Form 10 manifest.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold mb-1">Step 3: Track Managed Transit</strong>
                      <p className="text-neutral-600">A vetted fleet carrier picks up your consignment with pre-fixed distance pricing. Track progress in real time.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <strong className="text-neutral-900 block font-bold mb-1">Step 4: Automatic Settlement</strong>
                      <p className="text-neutral-600">Funds release directly to your corporate bank account via RTGS/NEFT.</p>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'diagnostics' && (
                <>
                  <p>
                    Diagnostic analytics allow LoopGrid to detect transit bottleneck patterns on key industrial highways (e.g., NH-48 Bengaluru-Chennai, Western Dedicated Freight Corridor) and identify high-demand metallurgical scrap grades.
                  </p>
                  <p className="text-neutral-600 text-xs">
                    All telemetry is stripped of corporate identity and aggregated into regional cluster density indices.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#1B5E20] text-white hover:bg-[#154c19] transition-colors cursor-pointer shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
