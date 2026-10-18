import React from 'react';
import { Trash2, AlertCircle, TrendingDown, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  const problems = [
    {
      icon: Trash2,
      title: t.problem.p1Title,
      description: t.problem.p1Desc,
    },
    {
      icon: TrendingDown,
      title: t.problem.p2Title,
      description: t.problem.p2Desc,
    },
    {
      icon: AlertCircle,
      title: t.problem.p3Title,
      description: t.problem.p3Desc,
    },
    {
      icon: Layers,
      title: t.problem.p4Title,
      description: t.problem.p4Desc,
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#B3261E] uppercase">
            {t.problem.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.problem.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.problem.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200/70 hover:border-neutral-300 transition-all"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FEE2E2] text-[#B3261E] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#191C1E]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist quote/callout block */}
        <div className="mt-12 p-8 rounded-3xl bg-[#F0FDF4] border border-[#DCFCE7] text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg text-[#166534] font-medium leading-relaxed">
            {t.problem.quote}
          </p>
        </div>
      </div>
    </section>
  );
};
