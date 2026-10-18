import React, { useState } from 'react';
import { ArrowLeft, Building2, ShieldCheck, ArrowRight, UserCheck, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { EnterpriseProfile } from './ProfilePage';
import { useLanguage } from '../context/LanguageContext';
import { DemoRoleSelectPage } from './DemoRoleSelectPage';

interface AuthPageProps {
  onReturnToHome: () => void;
  onNavigateToFaq: () => void;
  onAccountCreated: (profile: EnterpriseProfile) => void;
  initialMode?: 'signup' | 'login';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onReturnToHome,
  onNavigateToFaq,
  onAccountCreated,
  initialMode = 'signup',
}) => {
  const { t } = useLanguage();
  const [authMode, setAuthMode] = useState<'signup' | 'login'>(initialMode);
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  // CREATE AN ACCOUNT FORM fields:
  const [enterpriseName, setEnterpriseName] = useState('');
  const [enterprisePhone, setEnterprisePhone] = useState('');
  const [enterpriseEmail, setEnterpriseEmail] = useState('');
  const [businessDealsIn, setBusinessDealsIn] = useState('');
  const [majorResources, setMajorResources] = useState('');
  const [enterpriseRole, setEnterpriseRole] = useState<
    'MSME Enterprise' | 'Processing Enterprise' | 'Transit Partner' | 'Banking Partner'
  >('MSME Enterprise');
  const [businessAddress, setBusinessAddress] = useState('');
  
  // Password fields for Sign Up
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form fields: NAME OF THE ENTERPRISE and PASSWORD
  const [loginEnterpriseName, setLoginEnterpriseName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Error handling
  const [formError, setFormError] = useState<string | null>(null);

  // Handle Create Account submit
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate password confirmation
    if (!createPassword) {
      setFormError(t.auth.fillAllFields);
      return;
    }

    if (createPassword.length < 6) {
      setFormError(t.auth.passwordLength);
      return;
    }

    if (createPassword !== confirmPassword) {
      setFormError(t.auth.passwordMismatch);
      return;
    }

    const newProfile: EnterpriseProfile = {
      name: enterpriseName.trim(),
      phone: enterprisePhone.trim(),
      email: enterpriseEmail.trim(),
      businessDealsIn: businessDealsIn.trim(),
      majorResources: majorResources.trim(),
      role: enterpriseRole,
      address: businessAddress.trim(),
      password: createPassword,
      isRegistered: true,
    };

    // Store in localStorage for subsequent logins
    try {
      const stored = localStorage.getItem('loopgrid_enterprises');
      const accounts: EnterpriseProfile[] = stored ? JSON.parse(stored) : [];
      const filtered = accounts.filter(
        (acc) => acc.name.toLowerCase() !== newProfile.name.toLowerCase()
      );
      filtered.push(newProfile);
      localStorage.setItem('loopgrid_enterprises', JSON.stringify(filtered));
    } catch {
      // localStorage fallback
    }

    onAccountCreated(newProfile);
  };

  // Handle Login submit with NAME OF THE ENTERPRISE and PASSWORD
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = loginEnterpriseName.trim().toLowerCase();

    if (!trimmedName || !loginPassword) {
      setFormError(t.auth.fillAllFields);
      return;
    }

    // Check localStorage accounts first
    try {
      const stored = localStorage.getItem('loopgrid_enterprises');
      const accounts: EnterpriseProfile[] = stored ? JSON.parse(stored) : [];
      const match = accounts.find(
        (acc) => acc.name.toLowerCase() === trimmedName
      );

      if (match) {
        if (match.password && match.password !== loginPassword) {
          setFormError(t.auth.loginWrongPassword);
          return;
        }
        onAccountCreated(match);
        return;
      }
    } catch {
      // localStorage fallback
    }

    // If matches demo enterprise name
    if (
      trimmedName === 'apex precision works' ||
      trimmedName === 'apex precision works pvt ltd' ||
      trimmedName === 'apex'
    ) {
      handleDemoLogin('MSME Enterprise');
      return;
    }

    // If not found in storage, create active profile with entered name and password
    const directLoginProfile: EnterpriseProfile = {
      name: loginEnterpriseName.trim(),
      phone: '+91 98450 12345',
      email: `contact@${loginEnterpriseName.trim().toLowerCase().replace(/\s+/g, '')}.in`,
      businessDealsIn: 'Industrial Manufacturing & Operations',
      majorResources: 'Recyclable Production Scrap & Leftover Lots',
      role: 'MSME Enterprise',
      address: 'Industrial Estate, India',
      password: loginPassword,
      isRegistered: true,
    };
    onAccountCreated(directLoginProfile);
  };

  // Demo Enterprise Login for instant evaluation
  const handleDemoLogin = (
    role: 'MSME Enterprise' | 'Processing Enterprise' | 'Transit Partner' | 'Banking Partner' = 'MSME Enterprise'
  ) => {
    const demoProfile: EnterpriseProfile = {
      name: 'Apex Precision Works Pvt Ltd',
      phone: '+91 98450 12345',
      email: 'operations@apexprecision.in',
      businessDealsIn: 'Automotive Component Turning & CNC Milling',
      majorResources: 'Alloy 6061 Turnings, Solid Bar Ends, Steel Offcuts',
      role: role,
      address: 'Plot 124, 4th Cross, Peenya 1st Stage, Bengaluru - 560058',
      password: 'demoPassword123',
      isRegistered: true,
    };
    onAccountCreated(demoProfile);
  };

  const roles = [
    { id: 'MSME Enterprise' as const, label: t.auth.roleMsme },
    { id: 'Processing Enterprise' as const, label: t.auth.roleProcessing },
    { id: 'Transit Partner' as const, label: t.auth.roleTransit },
    { id: 'Banking Partner' as const, label: t.auth.roleBanking },
  ];

  // If user clicks demo option, open the dedicated 4-role demo selection page (called after all hooks)
  if (showDemoSelector) {
    return (
      <DemoRoleSelectPage
        onReturnToAuth={() => setShowDemoSelector(false)}
        onReturnToHome={onReturnToHome}
        onSelectRole={onAccountCreated}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFB] text-[#191C1E] flex flex-col selection:bg-[#E8F5E9] selection:text-[#1B5E20]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#1B5E20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.auth.returnLanding}
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-[#191C1E]">
              LoopGrid
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
              Enterprise Access
            </span>
          </div>

          <button
            type="button"
            onClick={onNavigateToFaq}
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-[#1B5E20] transition-colors"
          >
            {t.nav.faq}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl shadow-neutral-200/30 p-8 sm:p-10 relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B5E20] via-[#10B981] to-[#38BDF8]" />

            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center mb-8">
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-neutral-100 w-full max-w-xs text-xs sm:text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setFormError(null);
                  }}
                  className={`py-2 rounded-xl transition-all ${
                    authMode === 'signup'
                      ? 'bg-white text-[#191C1E] shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t.auth.tabCreateAccount}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setFormError(null);
                  }}
                  className={`py-2 rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-[#191C1E] shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t.auth.tabSignIn}
                </button>
              </div>
            </div>

            {/* Validation / Error banner */}
            {formError && (
              <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {authMode === 'signup' ? (
              /* CREATE AN ACCOUNT FORM */
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#191C1E]">
                    {t.auth.createAccountTitle}
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    {t.auth.createAccountSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  {/* 1. NAME OF THE ENTERPRISE */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={enterpriseName}
                      onChange={(e) => setEnterpriseName(e.target.value)}
                      placeholder={t.auth.namePlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>

                  {/* 2 & 3. PHONE NUMBER & EMAIL ID OF THE ENTERPRISE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.auth.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={enterprisePhone}
                        onChange={(e) => setEnterprisePhone(e.target.value)}
                        placeholder={t.auth.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.auth.emailLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        value={enterpriseEmail}
                        onChange={(e) => setEnterpriseEmail(e.target.value)}
                        placeholder={t.auth.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                      />
                    </div>
                  </div>

                  {/* 4. WHAT DOES THEIR BUSINESS DEALS IN */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.dealsInLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessDealsIn}
                      onChange={(e) => setBusinessDealsIn(e.target.value)}
                      placeholder={t.auth.dealsInPlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>

                  {/* 5. WHAT ARE THE MAJOR RESOURCES THEY WILL DEAL WITH */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.resourcesLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={majorResources}
                      onChange={(e) => setMajorResources(e.target.value)}
                      placeholder={t.auth.resourcesPlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>

                  {/* 6. THEIR ROLE */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      {t.auth.roleLabel} *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setEnterpriseRole(r.id)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                            enterpriseRole === r.id
                              ? 'border-[#1B5E20] bg-[#E8F5E9] text-[#1B5E20] shadow-xs ring-1 ring-[#1B5E20]'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 7. ADDRESS OF THEIR BUSINESS */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.addressLabel} *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder={t.auth.addressPlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                    />
                  </div>

                  {/* 8 & 9. CREATE PASSWORD & CONFIRM PASSWORD */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.auth.createPasswordLabel} *
                      </label>
                      <div className="relative">
                        <input
                          type={showCreatePassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={createPassword}
                          onChange={(e) => setCreatePassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCreatePassword(!showCreatePassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                          tabIndex={-1}
                          aria-label="Toggle password visibility"
                        >
                          {showCreatePassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.auth.confirmPasswordLabel} *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 ${
                            confirmPassword && confirmPassword !== createPassword
                              ? 'border-red-300 focus:ring-red-400 focus:border-red-500'
                              : 'border-neutral-300 focus:ring-[#10B981]/50 focus:border-[#10B981]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                          tabIndex={-1}
                          aria-label="Toggle confirm password visibility"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {confirmPassword && confirmPassword !== createPassword && (
                    <p className="text-[11px] text-red-600 font-medium">
                      {t.auth.passwordMismatch}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.99] transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{t.auth.submitCreateAccount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Instant Demo Option */}
                <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
                  <p className="text-xs text-neutral-500 mb-2.5">
                    For quick evaluation & test drives:
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDemoSelector(true)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>⚡ Demo Account (Choose from 4 Roles)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* SIGN IN / LOGIN FORM: NAME OF THE ENTERPRISE AND PASSWORD */
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mx-auto mb-3">
                    <UserCheck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#191C1E]">
                    {t.auth.signInTitle}
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                    {t.auth.signInSubtitle}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* NAME OF THE ENTERPRISE */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.loginEnterpriseNameLabel} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={loginEnterpriseName}
                        onChange={(e) => setLoginEnterpriseName(e.target.value)}
                        placeholder={t.auth.loginEnterpriseNamePlaceholder}
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                      />
                      <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.auth.loginPasswordLabel} *
                    </label>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder={t.auth.loginPasswordPlaceholder}
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                      />
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.99] transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{t.auth.submitLogin}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-5 border-t border-neutral-100 text-center space-y-2">
                  <p className="text-xs text-neutral-500">
                    {t.auth.needAccount}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setFormError(null);
                    }}
                    className="text-xs sm:text-sm font-semibold text-[#1B5E20] hover:underline"
                  >
                    {t.auth.tabCreateAccount} →
                  </button>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDemoSelector(true)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>⚡ Demo Account (Choose from 4 Roles)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy & Protocol Note */}
          <div className="mt-6 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>Encrypted Enterprise Profile & Clearinghouse Protocol</span>
          </div>
        </div>
      </main>
    </div>
  );
};
