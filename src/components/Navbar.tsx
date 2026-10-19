import React, { useState } from 'react';
import { RefreshCw, Menu, X, ArrowUpRight, LogIn, HelpCircle, Home, UserCheck, Building2, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { EnterpriseProfile } from './ProfilePage';

interface NavbarProps {
  onOpenJoinModal: () => void;
  onNavigateToFaq: () => void;
  onNavigateToSupport?: () => void;
  onNavigateToAuth: () => void;
  onNavigateToHome: () => void;
  onNavigateToProfile?: () => void;
  userProfile?: EnterpriseProfile | null;
  currentPage: 'landing' | 'faq' | 'support' | 'auth' | 'profile' | 'compliance';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJoinModal,
  onNavigateToFaq,
  onNavigateToSupport,
  onNavigateToAuth,
  onNavigateToHome,
  onNavigateToProfile,
  userProfile,
  currentPage,
}) => {
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Left: Brand Logo without any MSME badge */}
            <button
              type="button"
              onClick={onNavigateToHome}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white transition-colors duration-200">
                <RefreshCw className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#191C1E]">
                  LoopGrid
                </span>
              </div>
            </button>

            {/* Middle: Desktop Nav Links (Clean, no 'landing page core sections') */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7">
              <button
                type="button"
                onClick={onNavigateToFaq}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === 'faq'
                    ? 'text-[#1B5E20] font-semibold'
                    : 'text-neutral-600 hover:text-[#191C1E]'
                }`}
              >
                {t.nav.faq}
              </button>
              <button
                type="button"
                onClick={onNavigateToSupport}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === 'support'
                    ? 'text-[#1B5E20] font-semibold'
                    : 'text-neutral-600 hover:text-[#191C1E]'
                }`}
              >
                {t.nav.support || 'Support'}
              </button>
              <a
                href="#how-it-works"
                onClick={() => {
                  if (currentPage !== 'landing') onNavigateToHome();
                }}
                className="text-sm font-medium text-neutral-600 hover:text-[#191C1E] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#environmental-impact"
                onClick={() => {
                  if (currentPage !== 'landing') onNavigateToHome();
                }}
                className="text-sm font-medium text-neutral-600 hover:text-[#191C1E] transition-colors"
              >
                {t.nav.impact}
              </a>
              <a
                href="#ease-of-integration"
                onClick={() => {
                  if (currentPage !== 'landing') onNavigateToHome();
                }}
                className="text-sm font-medium text-neutral-600 hover:text-[#191C1E] transition-colors"
              >
                {t.nav.integration}
              </a>
              <a
                href="#testimonials"
                onClick={() => {
                  if (currentPage !== 'landing') onNavigateToHome();
                }}
                className="text-sm font-medium text-neutral-600 hover:text-[#191C1E] transition-colors"
              >
                Testimonials
              </a>
            </nav>

            {/* Right: Actions, Language Toggle & Three-lines Menu Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Language Toggle Button: ONLY on Landing Page Header */}
              {currentPage === 'landing' && <LanguageToggle variant="navbar" />}

              {/* Sign In / Login or Profile button */}
              {userProfile ? (
                <button
                  type="button"
                  onClick={onNavigateToProfile}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#1B5E20] bg-[#E8F5E9] hover:bg-[#DCFCE7] border border-[#C8E6C9] rounded-full active:scale-[0.98] transition-all"
                  title="View Enterprise Profile"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#1B5E20]" />
                  <span className="max-w-[120px] truncate sm:max-w-none">
                    {userProfile.name ? userProfile.name.split(' ')[0] : 'Profile'}
                  </span>
                  <span className="text-[10px] bg-white px-1.5 py-0.2 rounded-full border border-[#C8E6C9]">
                    Profile
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNavigateToAuth}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 rounded-full hover:bg-neutral-50 active:scale-[0.98] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{t.nav.signIn}</span>
                </button>
              )}

              {/* Register Stream CTA */}
              <button
                type="button"
                onClick={onOpenJoinModal}
                className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.98] rounded-full transition-all shadow-xs"
              >
                {t.nav.registerScrap}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>

              {/* Three-lines Navigation Button */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none"
                aria-label="Open platform pages menu"
                title="Platform Pages Menu"
              >
                <Menu className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Bar Drawer for Platform Pages (WITHOUT Language option as instructed) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20]">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg text-[#191C1E]">{t.nav.platformPages}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Platform Pages Navigation */}
              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    onNavigateToHome();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    currentPage === 'landing'
                      ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>{t.nav.home}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    onNavigateToFaq();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    currentPage === 'faq'
                      ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t.nav.faqKnowledge}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    if (onNavigateToSupport) onNavigateToSupport();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    currentPage === 'support'
                      ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>{t.nav.support || 'Support & Help Desk'}</span>
                </button>

                {userProfile ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onNavigateToProfile) onNavigateToProfile();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      currentPage === 'profile'
                        ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-[#1B5E20]" />
                    <span>Enterprise Profile ({userProfile.name ? userProfile.name.slice(0, 16) + '...' : 'Active'})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      onNavigateToAuth();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      currentPage === 'auth'
                        ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t.nav.signInPage}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Bottom CTA */}
            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>{t.nav.registerScrap}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-neutral-400">
                {t.nav.tagline}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
