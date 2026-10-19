import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { useLanguage } from '../context/LanguageContext';

interface FaqPageProps {
  onReturnToHome: () => void;
  onOpenJoinModal: (mode?: 'msme_supplier' | 'processing_buyer' | 'transit_partner') => void;
  onNavigateToAuth: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onReturnToHome,
  onOpenJoinModal,
  onNavigateToAuth,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<number[]>([0, 1, 2, 3]);

  const categories = [
    { id: 'all', label: t.faqPage.catAll },
    { id: 'registration', label: t.faqPage.catReg },
    { id: 'inventory', label: t.faqPage.catInv },
    { id: 'prices', label: t.faqPage.catPrices || 'Live Prices (₹/kg)' },
    { id: 'marketplace', label: t.faqPage.catMarketplace || 'Marketplace & Credit' },
    { id: 'compliance', label: t.faqPage.catCompliance || 'Compliance & Govt Schemes' },
    { id: 'transit', label: t.faqPage.catTransit },
    { id: 'settlement', label: t.faqPage.catSettlement },
    { id: 'processing', label: t.faqPage.catProcessing },
  ];

  const allFaqs = t.faqPage.faqs;

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFBFB] text-[#191C1E] flex flex-col">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.faqPage.returnBtn}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToAuth}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
            >
              {t.faqPage.signInBtn}
            </button>
            <button
              onClick={() => onOpenJoinModal('msme_supplier')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] rounded-full transition-all shadow-xs"
            >
              {t.faqPage.joinBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            {t.faqPage.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            {t.faqPage.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            {t.faqPage.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faqPage.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm sm:text-base text-[#191C1E] focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                {t.faqPage.clear}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1B5E20] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-neutral-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="text-[11px] font-bold tracking-wider uppercase text-[#1B5E20] mb-1">
                        {faq.categoryLabel}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#191C1E] block">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FCFDFC]">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
              <p className="text-neutral-500 text-sm">
                {t.faqPage.noResults}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-semibold text-[#1B5E20] hover:underline"
              >
                {t.faqPage.reset}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Contact / Join Box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F0FDF4] border border-[#DCFCE7] text-center">
          <h3 className="text-xl font-bold text-[#166534]">
            {t.faqPage.bottomTitle}
          </h3>
          <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto">
            {t.faqPage.bottomSubtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenJoinModal('msme_supplier')}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] transition-all shadow-xs"
            >
              {t.faqPage.registerBtn}
            </button>
            <button
              onClick={onReturnToHome}
              className="px-6 py-3 rounded-full text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 transition-colors"
            >
              {t.faqPage.backOverviewBtn}
            </button>
          </div>
        </div>
      </main>

      {/* Floating circular scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};
