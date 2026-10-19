import React from 'react';
import {
  Boxes,
  Cpu,
  ArrowLeftRight,
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: 'Businesses List Leftover Resources',
      subtitle: 'Fast shop-floor registration via mobile, scan, or ERP',
      description:
        'Manufacturers log surplus materials—such as CNC aluminum swarf, polymer sprues, or cotton offcuts. In under 2 minutes, weight, grade, and photos are uploaded to generate an initial digital manifest.',
      icon: Boxes,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      accentColor: 'text-[#00875A]',
      keyMetric: 'Instant Lot Logging',
    },
    {
      step: '02',
      title: 'AI Analyzes & Live Prices (₹/kg)',
      subtitle: 'Real-time commodity spot rates & proximity pooling',
      description:
        'LoopGrid’s algorithmic engine verifies alloy purity assays and tracks Live Prices per kilogram (₹/kg) based on real market changes, LME parity, and regional smelter demand, pooling lots within short radii.',
      icon: Cpu,
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      accentColor: 'text-sky-600',
      keyMetric: 'Real-Time ₹/kg Exchange',
    },
    {
      step: '03',
      title: 'Marketplace Trading & Credit Facility',
      subtitle: 'Verified inventory procurement & working capital',
      description:
        'Processing enterprises browse active lots in the Marketplace. Liquidity-constrained buyers can tap pre-approved credit facilities (SIDBI/CGTMSE/NBFCs) with 30–90 day terms. Purchased lots automatically update and exit the public marketplace.',
      icon: ArrowLeftRight,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      accentColor: 'text-amber-600',
      keyMetric: 'Integrated Credit & Escrow',
    },
    {
      step: '04',
      title: 'Environmental Impact & Compliance',
      subtitle: '100-point compliance index & ZED subsidies',
      description:
        'Secondary feedstocks bypass municipal landfills, abating virgin ore emissions. Every transaction issues CPCB Form-10 manifests and feeds the enterprise Compliance Score to claim up to 80% ZED green subsidies.',
      icon: Recycle,
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      accentColor: 'text-purple-600',
      keyMetric: 'ZED & CPCB Form-10 Audit',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-white border-b border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Google Material Design & Minimalist Aesthetic) */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border border-[#C8E6C9]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Circular Ecosystem Operating Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191C1E]">
            How LoopGrid Works
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            A frictionless, 4-step circular loop transforming factory byproduct streams into certified secondary manufacturing inputs with transparent spot pricing and sovereign escrow.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#FAFBFB] rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:border-[#00875A]/60 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-4 text-4xl font-black text-neutral-200/60 font-mono select-none group-hover:text-emerald-100 transition-colors">
                  {item.step}
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Step Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs group-hover:bg-[#E8F5E9] transition-colors">
                    <IconComponent className={`w-6 h-6 stroke-[2] ${item.accentColor}`} />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block mb-1">
                      Phase {item.step}
                    </span>
                    <h3 className="text-lg font-bold text-[#191C1E] group-hover:text-[#00875A] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500 relative z-10">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00875A]" />
                    {item.keyMetric}
                  </span>
                  <span className="text-[11px] font-bold text-[#00875A] group-hover:translate-x-0.5 transition-transform flex items-center">
                    Step {item.step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
