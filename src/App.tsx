/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { EnvironmentalImpactSection } from './components/EnvironmentalImpactSection';
import { EaseOfIntegrationSection } from './components/EaseOfIntegrationSection';
import { ManagedLotMarketplaceSection } from './components/ManagedLotMarketplaceSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqTeaserSection } from './components/FaqTeaserSection';
import { FaqPage } from './components/FaqPage';
import { SupportPage } from './components/SupportPage';
import { AuthPage } from './components/AuthPage';
import { ProfilePage, EnterpriseProfile } from './components/ProfilePage';
import { ComplianceScorePage } from './components/profile/ComplianceScorePage';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Footer } from './components/Footer';
import { ArrowRight, Sparkles } from 'lucide-react';

function MainAppContent() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<'landing' | 'faq' | 'support' | 'auth' | 'profile' | 'compliance'>('landing');
  const [userProfile, setUserProfile] = useState<EnterpriseProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'msme_supplier' | 'processing_buyer' | 'transit_partner'>('msme_supplier');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handler for resource registration:
  // "Before anyone registers their resource , they will need to signup / login by creating their account and then they can register their unwanted resources ."
  const handleRegisterResource = (role: 'msme_supplier' | 'processing_buyer' | 'transit_partner' = 'msme_supplier') => {
    if (!userProfile) {
      // Prompt user to create account or log in first
      setModalRole(role);
      setCurrentPage('auth');
    } else {
      // User is authenticated, proceed to register their scrap resource stream
      setModalRole(role);
      setModalOpen(true);
    }
  };

  const handleNavigateToHome = () => {
    setCurrentPage('landing');
  };

  const handleNavigateToFaq = () => {
    setCurrentPage('faq');
  };

  const handleNavigateToSupport = () => {
    setCurrentPage('support');
  };

  const handleNavigateToAuth = () => {
    setCurrentPage('auth');
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToCompliance = () => {
    setCurrentPage('compliance');
  };

  // Called when enterprise finishes the CREATE AN ACCOUNT FORM (or logs in)
  const handleAccountCreated = (profile: EnterpriseProfile) => {
    setUserProfile(profile);
    // "Then when they will fill this form , they will be redirected to a separate independent page which is the profile page ."
    setCurrentPage('profile');
  };

  const handleSignOut = () => {
    setUserProfile(null);
    setCurrentPage('landing');
  };

  // Render Full-Page Compliance view (Only accessible when locked in / logged in)
  if (currentPage === 'compliance') {
    if (!userProfile) {
      // Compliance requires the user to be logged in / locked in
      setCurrentPage('auth');
      return null;
    }

    return (
      <>
        <ComplianceScorePage
          profile={userProfile}
          onReturnToDashboard={handleNavigateToHome}
        />
        <EarlyAccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialRole={modalRole}
          enterpriseProfile={userProfile}
        />
      </>
    );
  }

  // Render Full-Page FAQ view
  if (currentPage === 'faq') {
    return (
      <>
        <FaqPage
          onReturnToHome={handleNavigateToHome}
          onOpenJoinModal={handleRegisterResource}
          onNavigateToAuth={handleNavigateToAuth}
        />
        <EarlyAccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialRole={modalRole}
          enterpriseProfile={userProfile}
        />
      </>
    );
  }

  // Render Full-Page Support view
  if (currentPage === 'support') {
    return (
      <>
        <SupportPage
          onReturnToHome={handleNavigateToHome}
          onNavigateToFaq={handleNavigateToFaq}
          onNavigateToAuth={handleNavigateToAuth}
        />
        <EarlyAccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialRole={modalRole}
          enterpriseProfile={userProfile}
        />
      </>
    );
  }

  // Render Full-Page Auth (Create Account / Sign In) view
  if (currentPage === 'auth') {
    return (
      <AuthPage
        onReturnToHome={handleNavigateToHome}
        onNavigateToFaq={handleNavigateToFaq}
        onAccountCreated={handleAccountCreated}
      />
    );
  }

  // Render Full-Page Profile view (strictly clean & minimalist, NO dashboard, NO matrices)
  if (currentPage === 'profile') {
    if (!userProfile) {
      // Fallback to auth if not signed in
      return (
        <AuthPage
          onReturnToHome={handleNavigateToHome}
          onNavigateToFaq={handleNavigateToFaq}
          onAccountCreated={handleAccountCreated}
        />
      );
    }

    return (
      <>
        <ProfilePage
          profile={userProfile}
          onReturnToHome={handleNavigateToHome}
          onOpenResourceRegistration={() => {
            setModalRole('msme_supplier');
            setModalOpen(true);
          }}
          onSignOut={handleSignOut}
          onNavigateToSupport={handleNavigateToSupport}
        />
        <EarlyAccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialRole={modalRole}
          enterpriseProfile={userProfile}
        />
      </>
    );
  }

  // Main Landing Page view
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB] text-[#191C1E] selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Navigation with Language Toggle ONLY on landing page header & MSME badge removed */}
      <Navbar
        currentPage={currentPage}
        userProfile={userProfile}
        onOpenJoinModal={() => handleRegisterResource('msme_supplier')}
        onNavigateToFaq={handleNavigateToFaq}
        onNavigateToSupport={handleNavigateToSupport}
        onNavigateToAuth={handleNavigateToAuth}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToProfile={handleNavigateToProfile}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenJoinModal={() => handleRegisterResource('msme_supplier')}
        />

        {/* The Problem: MSME Operational Scrap */}
        <ProblemSection />

        {/* 4-Step Operating Loop: How It Works */}
        <HowItWorksSection />

        {/* AI-Driven Proximity Matching & Categorized Lot Pooling */}
        <SolutionSection />

        {/* Highlight 1: Environmental Impact */}
        <EnvironmentalImpactSection />

        {/* Highlight 2: Ease of Integration for Shop-Floor Owners */}
        <EaseOfIntegrationSection />

        {/* Managed 5-Step Process & Economic Waterfall Model */}
        <ManagedLotMarketplaceSection onOpenRegisterModal={() => handleRegisterResource('msme_supplier')} />

        {/* Verified User Testimonials from MSMEs & Foundries */}
        <TestimonialsSection />

        {/* The Last Section of the Landing Page: FAQ Teaser with redirect to FAQ Page */}
        <FaqTeaserSection onNavigateToFaqPage={handleNavigateToFaq} />

        {/* Call to Action Banner (Minimalist Google Material Design) */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-white to-[#F2F7F4] border-t border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t.cta.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleRegisterResource('msme_supplier')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
              >
                {userProfile ? t.cta.registerBtn : t.cta.signUpBtn}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onNavigateToFaq={handleNavigateToFaq}
        onNavigateToAuth={handleNavigateToAuth}
        onNavigateToSupport={handleNavigateToSupport}
      />

      {/* Circular Button with Upward Arrow for Smooth Navigation to Top */}
      <ScrollToTopButton />

      {/* Industrial Resource Stream Registration Modal */}
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRole={modalRole}
        enterpriseProfile={userProfile}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
