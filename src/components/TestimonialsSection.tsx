import React from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  Building2,
  TrendingUp,
  Recycle,
  Sparkles,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 'test-1',
      author: 'Anand Kulkarni',
      role: 'Managing Director',
      company: 'Apex Precision Turning Ancillary',
      cluster: 'Peenya Industrial Area, Bengaluru',
      industry: 'Precision Aerospace & Automotive CNC',
      avatar: 'AK',
      avatarBg: 'bg-emerald-600',
      quote:
        'Listing our aluminum 6061 swarf took literally 90 seconds from our shop-floor tablet. Within 48 hours, VRL cargo collected our 1.5-ton lot for Doddaballapur smelters, and escrow credited ₹1.28 Lakhs directly to our bank account. It turned a hazardous storage bottleneck into reliable monthly working capital.',
      highlight: 'Ease of Use & Financial Recovery',
      metric: '₹1.28 Lakhs Credited',
      metricSub: '48h Weighbridge Settlement',
    },
    {
      id: 'test-2',
      author: 'Meera V. Ramanathan',
      role: 'Head of Quality & Sustainability',
      company: 'Coimbatore Eco-Tex Spinners',
      cluster: 'Coimbatore Textile Hub, Tamil Nadu',
      industry: 'Cotton Spinning & Mill Yarn Drops',
      avatar: 'MR',
      avatarBg: 'bg-sky-600',
      quote:
        'LoopGrid completely solved our fabric waste disposal headaches. Our combed cotton mill drops now bypass the municipal landfill entirely to supply acoustic matting for auto manufacturers. The automated CPCB Form-10 audit trail gives us bulletproof ESG compliance with zero paperwork.',
      highlight: 'Zero-Landfill ESG Compliance',
      metric: '42 MT CO₂e Abated',
      metricSub: '100% Landfill Diversion Rate',
    },
    {
      id: 'test-3',
      author: 'Rajeshwar Patel',
      role: 'Operations Partner',
      company: 'Gujarat Brass Ancillary Works',
      cluster: 'Jamnagar GIDC Brass Belt, Gujarat',
      industry: 'Non-Ferrous Casting & Valve Turning',
      avatar: 'RP',
      avatarBg: 'bg-amber-600',
      quote:
        'The live per-kg exchange prices reflect true MCX and Jamnagar spot demand without middleman markups. As a brass machining unit, getting transparent ₹488/kg rates and automated weighbridge escrow has fundamentally transformed our circular balance sheet.',
      highlight: 'Transparent Spot Pricing',
      metric: 'Zero Middleman Deductions',
      metricSub: 'Guaranteed Parity @ ₹488/kg',
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-[#FAFBFB] border-b border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border border-[#C8E6C9]">
            <Award className="w-3.5 h-3.5" />
            <span>Verified MSME Enterprise Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
            Trusted by India&apos;s Manufacturing Pioneers
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Discover how shop-floor managers, foundry operators, and circular textile leaders recover revenue from scrap while fulfilling sovereign zero-landfill mandates.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-[#00875A]/60 transition-all flex flex-col justify-between space-y-6"
            >
              {/* Quote & Stars */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-300 stroke-[1.5]" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Value Metric Footer */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                {/* Metric Capsule */}
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      {item.highlight}
                    </span>
                    <span className="font-black text-[#00875A] text-sm">
                      {item.metric}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 text-right">
                    {item.metricSub}
                  </span>
                </div>

                {/* Profile Identity */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0`}
                  >
                    {item.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-neutral-900 truncate">
                        {item.author}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-[#00875A] text-white flex-shrink-0" />
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {item.role}, {item.company}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {item.cluster}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
