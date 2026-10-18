import React from 'react';
import { Sparkles, Zap, Laptop, FileCheck2, Truck, SlidersHorizontal, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EaseOfIntegrationSection: React.FC = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Laptop,
      title: t.integration.f1Title,
      desc: t.integration.f1Desc,
    },
    {
      icon: Zap,
      title: t.integration.f2Title,
      desc: t.integration.f2Desc,
    },
    {
      icon: SlidersHorizontal,
      title: t.integration.f3Title,
      desc: t.integration.f3Desc,
    },
    {
      icon: Truck,
      title: t.integration.f4Title,
      desc: t.integration.f4Desc,
    },
    {
      icon: FileCheck2,
      title: t.integration.f5Title,
      desc: t.integration.f5Desc,
    },
    {
      icon: Sparkles,
      title: t.integration.f6Title,
      desc: t.integration.f6Desc,
    },
  ];

  return (
    <section id="ease-of-integration" className="py-20 md:py-28 bg-[#FAFBFB] border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            {t.integration.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.integration.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.integration.subtitle}
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#10B981]/50 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[#191C1E]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Integration Comparison Banner */}
        <div className="mt-16 bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
                {t.integration.bannerBadge}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#191C1E]">
                {t.integration.bannerTitle}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {t.integration.bannerDesc}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#191C1E]">{t.integration.b1Title}</h4>
                  <p className="text-xs text-neutral-500">{t.integration.b1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#191C1E]">{t.integration.b2Title}</h4>
                  <p className="text-xs text-neutral-500">{t.integration.b2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#191C1E]">{t.integration.b3Title}</h4>
                  <p className="text-xs text-neutral-500">{t.integration.b3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
