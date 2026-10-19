import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, ShoppingCart, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenJoinModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-white via-[#FAFBFB] to-[#F3F7F4]">
      {/* Subtle background ambient circles (Google/Apple soft lighting) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl">
        <div className="absolute top-12 left-1/4 w-72 h-72 rounded-full bg-[#D1F2D9]" />
        <div className="absolute top-24 right-1/4 w-80 h-80 rounded-full bg-[#E0F2FE]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-xs font-semibold text-[#1B5E20] mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#191C1E] leading-[1.15]">
          {t.hero.headlineStart}{' '}
          <span className="text-[#1B5E20] relative inline-block">
            {t.hero.headlineHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto font-normal leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
          >
            {t.hero.startBtn}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <a
            href="#ai-matching"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 transition-all hover:border-neutral-300"
          >
            {t.hero.howItWorksBtn}
          </a>
        </div>

        {/* Key Feature Pillars (Minimalist Cards, NO dashboards or data matrix) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {/* Card 1: Categorized Lots & DRPs */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#81C784]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20] mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#191C1E]">
                {t.hero.card1Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-normal">
                {t.hero.card1Desc}
              </p>
            </div>
          </div>

          {/* Card 2: Live Prices Exchange */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#81C784]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#191C1E]">
                {t.hero.card2Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-normal">
                {t.hero.card2Desc}
              </p>
            </div>
          </div>

          {/* Card 3: Marketplace & Credit Facility */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#81C784]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#B45309] mb-4">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#191C1E]">
                {t.hero.card3Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-normal">
                {t.hero.card3Desc}
              </p>
            </div>
          </div>

          {/* Card 4: Compliance & Green MSME Center */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#81C784]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#7E22CE] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#191C1E]">
                {t.hero.card4Title || 'Compliance & Green MSME Center'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-normal">
                {t.hero.card4Desc || '100-point statutory compliance scoring, CPCB Form-10 manifests, and official ZED certification subsidies up to 80%.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
