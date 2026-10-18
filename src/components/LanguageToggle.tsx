import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageToggleProps {
  variant?: 'navbar' | 'drawer' | 'profile-dropdown';
  buttonLabel?: string;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'navbar',
  buttonLabel,
  className = '',
}) => {
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider px-1">
          <Globe className="w-3.5 h-3.5 text-[#1B5E20]" />
          <span>Industrial Region & Language</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                language === lang.code
                  ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold border border-[#C8E6C9]'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-transparent'
              }`}
            >
              <span>{lang.nativeName}</span>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Profile-specific Dropdown Button (Specifically displays "Change Language")
  if (variant === 'profile-dropdown') {
    return (
      <div
        className={`relative inline-block text-left ${isOpen ? 'z-50' : 'z-20'} ${className}`}
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#10B981] transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
          aria-expanded={isOpen}
          aria-haspopup="true"
          title="Change Language / भाषा बदलें"
        >
          <div className="w-6 h-6 rounded-lg bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#191C1E]">{buttonLabel || 'Change Language'}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#166534] text-xs font-bold border border-[#C8E6C9]">
            {currentLanguageOption.nativeName}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#1B5E20]' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/10 py-2 z-[9999] animate-fade-in divide-y divide-neutral-100 max-w-[calc(100vw-2rem)]">
            <div className="px-4 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-neutral-900">
                  Select Regional Language
                </p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Indian Industrial Hubs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                title="Close language dropdown"
                aria-label="Close language dropdown"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-1 max-h-72 overflow-y-auto divide-y divide-neutral-50">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#F4FBF5] text-[#1B5E20] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900">{lang.nativeName}</span>
                        <span className="text-[11px] text-neutral-400">({lang.name})</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">
                        {lang.region}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2.5 bg-neutral-50/80 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Applies across all roles</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-bold text-neutral-700 hover:text-[#1B5E20] cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard navbar variant
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language / भाषा चुनें"
      >
        <Globe className="w-3.5 h-3.5 text-[#1B5E20]" />
        <span className="hidden sm:inline font-medium">{currentLanguageOption.nativeName}</span>
        <span className="sm:hidden font-mono text-[11px] uppercase">{currentLanguageOption.code}</span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-neutral-200 shadow-xl py-2 z-50 animate-fade-in divide-y divide-neutral-100">
          <div className="px-3.5 py-2 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Indian Manufacturing Hubs
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4FBF5] text-[#1B5E20] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{lang.nativeName}</span>
                      <span className="text-[11px] text-neutral-400">({lang.name})</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {lang.region}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
