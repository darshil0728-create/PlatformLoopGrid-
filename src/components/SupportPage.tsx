import React, { useState } from 'react';
import {
  ArrowLeft,
  LifeBuoy,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Building2,
  Truck,
  Scale,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  HelpCircle,
  FileText,
  User,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SupportPageProps {
  onReturnToHome: () => void;
  onNavigateToFaq?: () => void;
  onNavigateToAuth?: () => void;
}

interface SubmittedTicket {
  id: string;
  category: string;
  priority: string;
  lotId?: string;
  createdAt: string;
}

export const SupportPage: React.FC<SupportPageProps> = ({
  onReturnToHome,
  onNavigateToFaq,
  onNavigateToAuth,
}) => {
  const { t } = useLanguage();

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'msme' | 'processing' | 'transit' | 'banking'>('msme');
  const [priority, setPriority] = useState<'URGENT' | 'HIGH' | 'NORMAL'>('NORMAL');
  const [category, setCategory] = useState('Weighment Dispute & Escrow Hold');
  const [lotId, setLotId] = useState('');
  const [description, setDescription] = useState('');

  // Ticket submission state
  const [submittedTicket, setSubmittedTicket] = useState<SubmittedTicket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `TKT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        category,
        priority,
        lotId: lotId.trim() || undefined,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setIsSubmitting(false);
    }, 700);
  };

  const supportFaqs = [
    {
      q: 'How do I resolve a weighment discrepancy at the secondary smelter gate?',
      a: 'If the smelter weighbridge reading differs by more than ±0.5% from the generator node dispatch slip, report it immediately using the form above or call our emergency hotline. LoopGrid automatically locks the escrow payout and dispatches a certified regional third-party inspector within 4 hours.',
    },
    {
      q: 'My transit carrier truck KA-04-E-2201 is delayed. How do I track it?',
      a: 'All LoopGrid transit partners are equipped with real-time GPS telemetry. You can view the live odometer and milestone progress in the "Managed Transit" section of your Profile dashboard. For roadside assistance or mechanical delays, dial our 24x7 Logistics Dispatch Hotline.',
    },
    {
      q: 'When is the bank escrow payout credited to the generator account?',
      a: 'Bank payouts are automatically initiated via RBI-approved NEFT/RTGS gateways upon electronic proof-of-delivery (e-POD) and gate assay confirmation. Funds typically hit your account within 2 to 4 bank working hours (T+1 guaranteed).',
    },
    {
      q: 'How do I generate or download pre-filled CPCB Form 10 manifests?',
      a: 'Once a lot is registered and matched with a certified carrier, navigate to your Profile -> Activity Log -> Export Audit Log (PDF), or inspect the lot DRP Passport to print official QR-coded movement manifests.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col font-sans selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Return to Landing Page</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00875A] flex items-center justify-center text-white shadow-xs">
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#191C1E]">
              LoopGrid
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] hidden sm:inline">
              Enterprise Support Desk
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToFaq && (
              <button
                type="button"
                onClick={onNavigateToFaq}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 hidden sm:inline"
              >
                FAQ Knowledge Base
              </button>
            )}
            {onNavigateToAuth && (
              <button
                type="button"
                onClick={onNavigateToAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1B5E20] bg-[#E8F5E9] hover:bg-[#DCFCE7] border border-[#C8E6C9] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-md border border-neutral-800 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-4 border border-white/10">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>24/7 Dedicated Industrial Help & Dispute Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Enterprise Customer & Logistics Support
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Real-time resolution for MSME scrap generators, secondary recycling smelters, and fleet carriers. Submit priority tickets, report transit delays, or reach emergency dispatchers immediately.
            </p>
          </div>

          {/* Quick Contact Chips */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Toll-Free Dispatch</span>
                <span className="font-bold text-white text-sm">1800-LOOP-GRID</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">24x7 Transit Line</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Official Inquiries</span>
                <span className="font-bold text-white text-sm">support@loopgrid.in</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">&lt; 2hr SLA response</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Escrow Desk Hours</span>
                <span className="font-bold text-white text-sm">08:00 AM - 10:00 PM IST</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Mon - Sat (NEFT/RTGS)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: TICKET FORM (LEFT) & CHANNELS/ATTRIBUTION (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: TICKET SUBMISSION FORM (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-5 border-b border-neutral-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191C1E]">
                  Submit Support Ticket or Grievance
                </h2>
                <p className="text-xs text-neutral-500">
                  Tracked under LoopGrid Enterprise Service Level Agreement (SLA).
                </p>
              </div>
            </div>

            {submittedTicket ? (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">
                    Ticket Logged Successfully
                  </span>
                  <h3 className="text-xl font-extrabold text-neutral-900 mt-1">
                    {submittedTicket.id}
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Our specialized industrial grievance officer has been notified. For priority issue category <strong>{submittedTicket.category}</strong>, resolution is guaranteed within 2 hours.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200/60 max-w-sm mx-auto text-xs text-neutral-700 flex justify-between">
                  <span>Priority: <strong className="text-red-700">{submittedTicket.priority}</strong></span>
                  {submittedTicket.lotId && <span>Lot: <strong>{submittedTicket.lotId}</strong></span>}
                  <span>Logged: <strong>{submittedTicket.createdAt}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedTicket(null);
                    setDescription('');
                    setLotId('');
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#1B5E20] text-white hover:bg-[#154c19] transition-all cursor-pointer shadow-xs"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
                {/* Enterprise Name & Person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Enterprise / Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Precision Works"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@apexworks.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Enterprise Role Select */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Your Operational Role in Circular Chain *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'msme', label: 'MSME Generator' },
                      { key: 'processing', label: 'Smelter / Buyer' },
                      { key: 'transit', label: 'Fleet Carrier' },
                      { key: 'banking', label: 'Financier / Bank' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setRole(item.key as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          role === item.key
                            ? 'bg-[#E8F5E9] text-[#1B5E20] border-[#A5D6A7]'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Issue Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50"
                    >
                      <option value="Weighment Dispute & Escrow Hold">Weighment Dispute & Escrow Hold</option>
                      <option value="Transit Delay & Carrier Tracking">Transit Delay & Carrier Tracking</option>
                      <option value="DRP Passport & Assay Verification">DRP Passport & Assay Verification</option>
                      <option value="Bank Payout & NEFT/RTGS Delay">Bank Payout & NEFT/RTGS Delay</option>
                      <option value="CPCB Form 10 Statutory Notice">CPCB Form 10 Statutory Notice</option>
                      <option value="General Platform & Account Access">General Platform & Account Access</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Severity / Urgency *
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50 font-bold"
                    >
                      <option value="URGENT">URGENT (Consignment En Route on Highway)</option>
                      <option value="HIGH">HIGH (Weighment Dispute / Escrow Hold)</option>
                      <option value="NORMAL">NORMAL (General Platform Inquiries)</option>
                    </select>
                  </div>
                </div>

                {/* Lot ID (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Related Lot ID / DRP Passport ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={lotId}
                    onChange={(e) => setLotId(e.target.value)}
                    placeholder="e.g. LG-AL-402 or DRP-2026-AL-8921"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50 font-mono text-xs"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Detailed Description of Issue *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide specific details, truck registration KA-04-E-2201, weighbridge slip delta, or assay lot number..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-neutral-50/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                  <span>{isSubmitting ? 'Logging Ticket to Service Desk...' : 'Submit Priority Ticket'}</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: CHANNELS & DARSHIL JAIN DEVELOPER ATTRIBUTION (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Developer Card: Designed & Developed by Darshil Jain */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 text-white border border-neutral-700 shadow-md">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-700">
                <div className="w-12 h-12 rounded-2xl bg-[#00875A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  DJ
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                    Lead Architect & Engineer
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Darshil Jain
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Designed and Developed LoopGrid Platform
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 mt-4 leading-relaxed">
                Direct access for strategic enterprise pilots, industrial state pollution board tie-ups, and technology architecture inquiries.
              </p>

              {/* Two buttons as specified: LinkedIn with attached profile & GitHub */}
              <div className="mt-5 space-y-2.5">
                <a
                  href="https://www.linkedin.com/in/darshil-jain-593754427?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>Connect on LinkedIn (Darshil Jain)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/darshil0728-create/PlatformLoopGrid-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-bold transition-all border border-neutral-700 cursor-pointer"
                  title="View PlatformLoopGrid Repository on GitHub"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View GitHub Project</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Live Operational Status */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Infrastructure Health
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  All Services 100% Up
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                  <span className="text-neutral-700 font-medium">DRP Minting Engine</span>
                  <span className="text-emerald-700 font-bold">Operational (12ms)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                  <span className="text-neutral-700 font-medium">GPS Highway Telemetry</span>
                  <span className="text-emerald-700 font-bold">Operational (Live Relays)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                  <span className="text-neutral-700 font-medium">RBI Escrow Bank Settlement</span>
                  <span className="text-emerald-700 font-bold">Operational (RTGS)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                  <span className="text-neutral-700 font-medium">NABL Laboratory Calibration</span>
                  <span className="text-emerald-700 font-bold">Verified ISO 17025</span>
                </div>
              </div>
            </div>

            {/* Regional Hubs */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Regional Industrial Dispatch Hubs
              </h4>
              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Bengaluru:</strong> Peenya 4th Phase Industrial Cluster Hub</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Surat:</strong> Pandesara GIDC Textile & Scrap Depot</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Pune:</strong> Bhosari MIDC Auto Ancillary Corridor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: EXPANDABLE ACCORDION FOR FREQUENT SUPPORT TOPICS */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-lg font-bold text-[#191C1E]">
                Common Support & Dispute Solutions
              </h3>
              <p className="text-xs text-neutral-500">
                Self-service guidance for standard operations and dispute mediation.
              </p>
            </div>
            {onNavigateToFaq && (
              <button
                type="button"
                onClick={onNavigateToFaq}
                className="text-xs font-bold text-[#1B5E20] hover:underline cursor-pointer"
              >
                View Full FAQ Database →
              </button>
            )}
          </div>

          <div className="space-y-3">
            {supportFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-neutral-900 bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
