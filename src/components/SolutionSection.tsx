import React from 'react';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SolutionSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: t.solution.step1Num,
      title: t.solution.step1Title,
      desc: t.solution.step1Desc,
    },
    {
      step: t.solution.step2Num,
      title: t.solution.step2Title,
      desc: t.solution.step2Desc,
    },
    {
      step: t.solution.step3Num,
      title: t.solution.step3Title,
      desc: t.solution.step3Desc,
    },
  ];

  return (
    <section id="ai-matching" className="py-20 md:py-28 bg-[#FAFBFB] border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#1B5E20] uppercase">
            {t.solution.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.solution.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.solution.subtitle}
          </p>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#10B981]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-2xl font-bold text-[#1B5E20] mb-3">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold text-[#191C1E] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* High Complexity Index Explained */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold mb-4">
                <Cpu className="w-3.5 h-3.5" />
                {t.solution.algoBadge}
              </div>
              <h3 className="text-2xl font-bold text-[#191C1E]">
                {t.solution.complexityTitle}
              </h3>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                {t.solution.complexityP1}
              </p>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                {t.solution.complexityP2}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-neutral-700">
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-100">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  {t.solution.tag1}
                </span>
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-100">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  {t.solution.tag2}
                </span>
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-100">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  {t.solution.tag3}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8FAF9] p-6 rounded-2xl border border-neutral-200/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                {t.solution.examplesTitle}
              </h4>
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/60 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#191C1E]">
                    <span>{t.solution.ex1From}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-[#166534]">{t.solution.ex1To}</span>
                  </div>
                  <p className="mt-1 text-neutral-500">{t.solution.ex1Val}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/60 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#191C1E]">
                    <span>{t.solution.ex2From}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-[#166534]">{t.solution.ex2To}</span>
                  </div>
                  <p className="mt-1 text-neutral-500">{t.solution.ex2Val}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/60 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#191C1E]">
                    <span>{t.solution.ex3From}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-[#166534]">{t.solution.ex3To}</span>
                  </div>
                  <p className="mt-1 text-neutral-500">{t.solution.ex3Val}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
