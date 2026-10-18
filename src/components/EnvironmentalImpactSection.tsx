import React, { useState } from 'react';
import { Leaf, Globe, Wind, Droplets, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EnvironmentalImpactSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'textiles' | 'metals' | 'polymers' | 'timber' | 'organics'>('metals');

  const categories = [
    { id: 'metals', label: t.impact.catMetals },
    { id: 'textiles', label: t.impact.catTextiles },
    { id: 'polymers', label: t.impact.catPolymers },
    { id: 'timber', label: t.impact.catTimber },
    { id: 'organics', label: t.impact.catOrganics },
  ] as const;

  const categoryDetails = {
    metals: {
      title: t.impact.metalsTitle,
      statLabel: t.impact.metalsStatLabel,
      statValue: t.impact.metalsStatVal,
      desc: t.impact.metalsDesc,
      benefits: [
        t.impact.metalsB1,
        t.impact.metalsB2,
        t.impact.metalsB3,
      ],
    },
    textiles: {
      title: t.impact.textilesTitle,
      statLabel: t.impact.textilesStatLabel,
      statValue: t.impact.textilesStatVal,
      desc: t.impact.textilesDesc,
      benefits: [
        t.impact.textilesB1,
        t.impact.textilesB2,
        t.impact.textilesB3,
      ],
    },
    polymers: {
      title: t.impact.polymersTitle,
      statLabel: t.impact.polymersStatLabel,
      statValue: t.impact.polymersStatVal,
      desc: t.impact.polymersDesc,
      benefits: [
        t.impact.polymersB1,
        t.impact.polymersB2,
        t.impact.polymersB3,
      ],
    },
    timber: {
      title: t.impact.timberTitle,
      statLabel: t.impact.timberStatLabel,
      statValue: t.impact.timberStatVal,
      desc: t.impact.timberDesc,
      benefits: [
        t.impact.timberB1,
        t.impact.timberB2,
        t.impact.timberB3,
      ],
    },
    organics: {
      title: t.impact.organicsTitle,
      statLabel: t.impact.organicsStatLabel,
      statValue: t.impact.organicsStatVal,
      desc: t.impact.organicsDesc,
      benefits: [
        t.impact.organicsB1,
        t.impact.organicsB2,
        t.impact.organicsB3,
      ],
    },
  };

  const current = categoryDetails[activeCategory];

  return (
    <section id="environmental-impact" className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold mb-3">
            <Leaf className="w-3.5 h-3.5" />
            {t.impact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.impact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.impact.subtitle}
          </p>
        </div>

        {/* 3 Pillars of Environmental Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-7 rounded-2xl bg-[#FAFCFA] border border-[#DCFCE7] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mb-5">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#191C1E]">
              {t.impact.p1Title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {t.impact.p1Desc}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center mb-5">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#191C1E]">
              {t.impact.p2Title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {t.impact.p2Desc}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#FAFCFA] border border-[#DCFCE7] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mb-5">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#191C1E]">
              {t.impact.p3Title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {t.impact.p3Desc}
            </p>
          </div>
        </div>

        {/* Interactive Material Impact Explorer */}
        <div className="rounded-3xl bg-[#F7FAF8] border border-neutral-200/80 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-200/70 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
                {t.impact.deepDiveBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#191C1E]">
                {t.impact.deepDiveTitle}
              </h3>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-6 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1B5E20] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Current Category Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/70">
            <div className="lg:col-span-8">
              <h4 className="text-xl font-bold text-[#191C1E]">
                {current.title}
              </h4>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {current.desc}
              </p>

              <div className="mt-6 space-y-2.5">
                {current.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#F2F7F3] p-6 rounded-2xl text-center border border-[#DCFCE7]">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                {current.statLabel}
              </span>
              <span className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1B5E20] block">
                {current.statValue}
              </span>
              <p className="mt-3 text-xs text-neutral-600">
                {t.impact.verifiedNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
