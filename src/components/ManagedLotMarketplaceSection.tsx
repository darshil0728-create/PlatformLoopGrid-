import React from 'react';
import { Package, Truck, DollarSign, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Factory, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ManagedLotMarketplaceSectionProps {
  onOpenRegisterModal: () => void;
}

export const ManagedLotMarketplaceSection: React.FC<ManagedLotMarketplaceSectionProps> = ({ onOpenRegisterModal }) => {
  const { t } = useLanguage();

  return (
    <section id="managed-process" className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#1B5E20] uppercase">
            {t.process.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.process.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 5-Step Operational Flow Diagram (Minimalist Google Material Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-[#191C1E] mb-1.5">
                {t.process.step1Title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.process.step1Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-semibold text-[#166534]">
              {t.process.step1Tag}
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-[#191C1E] mb-1.5">
                {t.process.step2Title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.process.step2Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-semibold text-[#0284C7]">
              {t.process.step2Tag}
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-[#191C1E] mb-1.5">
                {t.process.step3Title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.process.step3Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-semibold text-[#7E22CE]">
              {t.process.step3Tag}
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h3 className="text-sm font-bold text-[#191C1E] mb-1.5">
                {t.process.step4Title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.process.step4Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-semibold text-[#B45309]">
              {t.process.step4Tag}
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold text-sm mb-3">
                5
              </div>
              <h3 className="text-sm font-bold text-[#166534] mb-1.5">
                {t.process.step5Title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.process.step5Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#DCFCE7] text-[11px] font-semibold text-[#166534]">
              {t.process.step5Tag}
            </div>
          </div>
        </div>

        {/* Detailed Economic Model Breakdown */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAFBFB] border border-neutral-200/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold mb-4">
                <DollarSign className="w-3.5 h-3.5" />
                {t.process.flowBadge}
              </div>
              <h3 className="text-2xl font-bold text-[#191C1E]">
                {t.process.flowTitle}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {t.process.flowDesc}
              </p>

              <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-neutral-900">{t.process.p1Title}</strong> {t.process.p1Desc}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-neutral-900">{t.process.p2Title}</strong> {t.process.p2Desc}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-neutral-900">{t.process.p3Title}</strong> {t.process.p3Desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Payment Waterfall Visual */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/80 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                {t.process.waterfallHeader}
              </h4>

              <div className="space-y-3 text-xs">
                {/* Processing Partner Inflow */}
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block">
                    {t.process.wf1Tag}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-semibold text-neutral-900">{t.process.wf1Buyer}</span>
                    <span className="font-bold text-[#166534]">{t.process.wf1Val}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-600">
                    {t.process.wf1Desc}
                  </p>
                </div>

                {/* Downward Arrow */}
                <div className="flex justify-center -my-1 text-neutral-400">
                  ↓
                </div>

                {/* LoopGrid Commission Split */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    {t.process.wf2Tag}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-semibold text-neutral-900">{t.process.wf2Name}</span>
                    <span className="font-semibold text-neutral-700">{t.process.wf2Share}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {t.process.wf2Desc}
                  </p>
                </div>

                {/* Downward Arrow */}
                <div className="flex justify-center -my-1 text-neutral-400">
                  ↓
                </div>

                {/* Transit Partner Payout */}
                <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7]">
                  <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider block">
                    {t.process.wf3Tag}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-semibold text-neutral-900">{t.process.wf3Partner}</span>
                    <span className="font-semibold text-[#B45309]">{t.process.wf3Rate}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-600">
                    {t.process.wf3Desc}
                  </p>
                </div>

                {/* Downward Arrow */}
                <div className="flex justify-center -my-1 text-neutral-400">
                  ↓
                </div>

                {/* MSME Supplier Net Earnings */}
                <div className="p-3.5 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
                  <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-wider block">
                    {t.process.wf4Tag}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-neutral-900">{t.process.wf4Recipient}</span>
                    <span className="font-bold text-[#1B5E20]">{t.process.wf4Method}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-700 font-medium">
                    {t.process.wf4Desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] transition-all shadow-xs"
                >
                  {t.process.registerBtn}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
