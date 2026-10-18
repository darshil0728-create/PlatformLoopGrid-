import React from 'react';
import {
  ArrowLeft,
  Building2,
  Factory,
  Truck,
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  TrendingUp,
  MapPin,
  Clock,
  Boxes
} from 'lucide-react';
import { EnterpriseProfile } from './ProfilePage';
import { useLanguage } from '../context/LanguageContext';

interface DemoRoleSelectPageProps {
  onReturnToAuth: () => void;
  onReturnToHome: () => void;
  onSelectRole: (profile: EnterpriseProfile) => void;
}

export const DemoRoleSelectPage: React.FC<DemoRoleSelectPageProps> = ({
  onReturnToAuth,
  onReturnToHome,
  onSelectRole,
}) => {
  const { t } = useLanguage();

  const demoRoles: Array<{
    role: 'MSME Enterprise' | 'Processing Enterprise' | 'Transit Partner' | 'Banking Partner';
    tag: string;
    tagColor: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    companyName: string;
    location: string;
    businessDealsIn: string;
    majorResources: string;
    phone: string;
    email: string;
    keyHighlights: string[];
    metricsPreview: { label: string; value: string };
  }> = [
    {
      role: 'MSME Enterprise',
      tag: 'Resource Provider / Generator',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: Factory,
      accentColor: 'from-[#10B981] to-[#047857]',
      badgeBg: 'bg-[#E8F5E9] text-[#1B5E20]',
      companyName: 'Apex Precision Works Pvt Ltd',
      location: 'Peenya 1st Stage, Bengaluru, Karnataka',
      businessDealsIn: 'Automotive CNC Turning & Metal Machining',
      majorResources: 'Alloy 6061 Turnings, Solid Bar Ends, Brass Swarf',
      phone: '+91 98450 12345',
      email: 'operations@apexprecision.in',
      keyHighlights: [
        'Register unwanted scrap & production offcuts',
        'Automated AI pool aggregation with nearby shops',
        'Live DRP tracking, market rates & direct bank payout',
      ],
      metricsPreview: {
        label: 'Recycled to Date',
        value: '1,240 Tons • ₹1.12L Cleared',
      },
    },
    {
      role: 'Processing Enterprise',
      tag: 'Resource Buyer & Recycler',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Building2,
      accentColor: 'from-[#0284C7] to-[#0369A1]',
      badgeBg: 'bg-[#EFF6FF] text-[#0369A1]',
      companyName: 'Hindalco Ancillary Smelters & Refining Corp',
      location: 'Doddaballapur Metallurgical Park, Bengaluru',
      businessDealsIn: 'Secondary Ingot Casting & Continuous Billet Smelting',
      majorResources: 'Standardized Aluminum 6061 Lots, Copper Scrap, Recycled Billets',
      phone: '+91 94480 88210',
      email: 'procurement@hindalcosmelters.in',
      keyHighlights: [
        'Browse and buy standardized, NABL-certified pooled scrap lots',
        'Ingestion queue with spectrometer chemical assay & purity scores',
        'Incoming shipment live telemetry & escrow payment release',
      ],
      metricsPreview: {
        label: 'Procured Feedstock',
        value: '3,850 Tons • -28.4% Cost vs Ore',
      },
    },
    {
      role: 'Transit Partner',
      tag: 'Fleet & Industrial Logistics',
      tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
      icon: Truck,
      accentColor: 'from-[#D97706] to-[#B45309]',
      badgeBg: 'bg-[#FEF3C7] text-[#92400E]',
      companyName: 'VRL Industrial Logistics & Fleet Network',
      location: 'Nelamangala Freight Corridor, Bengaluru',
      businessDealsIn: 'GPS-Tracked Industrial Cargo & Multi-Axle Freight Transport',
      majorResources: 'Containerized Scrap Lots, Heavy Bales, Liquid Tankers',
      phone: '+91 98860 44520',
      email: 'dispatch@vrlcargofleet.in',
      keyHighlights: [
        'Live tracking of Trucks, Tempos & Tankers across industrial regions',
        'Exact resources transported with GPS telemetry & driver dispatch',
        'Receivables (freight payouts to receive) & Payables (fuel, toll, bata)',
      ],
      metricsPreview: {
        label: 'Active Fleet on Road',
        value: '18 Vehicles • ₹1.24L Receivables',
      },
    },
    {
      role: 'Banking Partner',
      tag: 'Financing & Working Capital Syndicate',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
      icon: Landmark,
      accentColor: 'from-[#7C3AED] to-[#5B21B6]',
      badgeBg: 'bg-[#F3E8FF] text-[#6B21A8]',
      companyName: 'SIDBI & Canara MSME Factoring Syndicate',
      location: 'Financial District, MG Road, Bengaluru',
      businessDealsIn: 'MSME Working Capital Underwriting & DRP Invoice Discounting',
      majorResources: 'Collateralized DRP Digital Passports, T+24h Advances, Escrow',
      phone: '+91 80 2558 7700',
      email: 'clearinghouse@sidbifactoring.in',
      keyHighlights: [
        'Instant T+24h invoice discounting for MSME resource suppliers',
        'Underwrite working capital backed by verified physical DRP collateral',
        'Live escrow balances, 0.02% default risk monitoring & margin yield payouts',
      ],
      metricsPreview: {
        label: 'Credit Disbursed',
        value: '₹4.85 Cr • 99.9% Repayment',
      },
    },
  ];

  const handleLaunch = (roleData: typeof demoRoles[0]) => {
    const profile: EnterpriseProfile = {
      name: roleData.companyName,
      phone: roleData.phone,
      email: roleData.email,
      businessDealsIn: roleData.businessDealsIn,
      majorResources: roleData.majorResources,
      role: roleData.role,
      address: roleData.location,
      password: 'demoPassword123',
      isRegistered: true,
    };
    onSelectRole(profile);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col font-sans selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToAuth}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.demoSelect.backToSignIn}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-[#191C1E]">
              LoopGrid
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
              {t.demoSelect.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={onReturnToHome}
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-[#1B5E20] transition-colors"
          >
            {t.demoSelect.landingPageLink}
          </button>
        </div>
      </header>

      {/* Main Hero & Role Grid */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200/80">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.demoSelect.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
            {t.demoSelect.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t.demoSelect.subtitle}
          </p>
        </div>

        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {demoRoles.map((roleData, idx) => {
            const Icon = roleData.icon;
            return (
              <div
                key={roleData.role}
                className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top color gradient bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${roleData.accentColor}`}
                />

                <div>
                  {/* Top Header inside Card */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs flex-shrink-0 ${roleData.badgeBg}`}
                      >
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Option {String.fromCharCode(65 + idx)}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#191C1E] group-hover:text-[#1B5E20] transition-colors">
                          {roleData.role}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${roleData.tagColor} text-right`}
                    >
                      {roleData.tag}
                    </span>
                  </div>

                  {/* Company Profile Snapshot */}
                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 mb-4 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 text-sm">
                        {roleData.companyName}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                      <span className="truncate">{roleData.location}</span>
                    </div>
                    <p className="text-neutral-600 pt-1 border-t border-neutral-200/60">
                      <strong className="text-neutral-700">Deals in:</strong> {roleData.businessDealsIn}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Role Dashboard Capabilities
                    </span>
                    {roleData.keyHighlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      {roleData.metricsPreview.label}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {roleData.metricsPreview.value}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunch(roleData)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#191C1E] hover:bg-[#1B5E20] group-hover:bg-[#1B5E20] transition-colors shadow-xs active:scale-[0.98] cursor-pointer"
                  >
                    <span>Launch {roleData.role.split(' ')[0]} Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Footer Box */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">
                Want to register your actual enterprise instead?
              </p>
              <p className="text-xs text-neutral-500">
                Fill the 7-field enterprise account form to generate your sovereign identity and DRP vault.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReturnToAuth}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            <span>Create New Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
};
