import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight, DollarSign, Package, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FaqTeaserSectionProps {
  onNavigateToFaqPage: () => void;
}

export const FaqTeaserSection: React.FC<FaqTeaserSectionProps> = ({ onNavigateToFaqPage }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t.faqTeaser.q1,
      answer: t.faqTeaser.a1,
      tag: t.faqTeaser.tag1,
      icon: DollarSign,
    },
    {
      question: t.faqTeaser.q2,
      answer: t.faqTeaser.a2,
      tag: t.faqTeaser.tag2,
      icon: Package,
    },
    {
      question: t.faqTeaser.q3,
      answer: t.faqTeaser.a3,
      tag: t.faqTeaser.tag3,
      icon: ShieldCheck,
    },
    {
      question: t.faqTeaser.q4,
      answer: t.faqTeaser.a4,
      tag: t.faqTeaser.tag4,
      icon: Truck,
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAFBFB] border-t border-neutral-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            {t.faqTeaser.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
            {t.faqTeaser.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.faqTeaser.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-neutral-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F4FBF5] text-[#1B5E20] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#166534] mr-2">
                        {faq.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-[#191C1E] inline">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FCFDFC]">
                    <p className="pl-11">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Redirection banner to full FAQ page as requested */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#C8E6C9] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#191C1E]">
              {t.faqTeaser.bannerTitle}
            </h4>
            <p className="text-sm text-neutral-600 mt-1">
              {t.faqTeaser.bannerDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToFaqPage}
            className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.99] transition-all shadow-xs"
          >
            {t.faqTeaser.viewAllBtn}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
