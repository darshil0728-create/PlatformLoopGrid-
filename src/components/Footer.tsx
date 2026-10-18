import React from 'react';
import { RefreshCw, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigateToFaq?: () => void;
  onNavigateToAuth?: () => void;
  onNavigateToSupport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToFaq, onNavigateToAuth, onNavigateToSupport }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-neutral-200/80 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-100">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20]">
                <RefreshCw className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#191C1E]">
                LoopGrid
              </span>
            </div>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#166534] font-medium bg-[#F0FDF4] px-3 py-1.5 rounded-full w-fit border border-[#DCFCE7]">
              <Leaf className="w-3.5 h-3.5" />
              <span>{t.footer.badge}</span>
            </div>
          </div>

          {/* Platform Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              {t.footer.pagesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={onNavigateToFaq}
                  className="hover:text-[#1B5E20] transition-colors text-left"
                >
                  {t.footer.faqLink}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToAuth}
                  className="hover:text-[#1B5E20] transition-colors text-left cursor-pointer"
                >
                  {t.footer.signInLink}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToSupport}
                  className="hover:text-[#1B5E20] transition-colors text-left cursor-pointer text-[#1B5E20] font-semibold"
                >
                  {t.nav.support || 'Support Help Desk'}
                </button>
              </li>
              <li>
                <a href="#environmental-impact" className="hover:text-[#1B5E20] transition-colors">
                  {t.nav.impact}
                </a>
              </li>
              <li>
                <a href="#ease-of-integration" className="hover:text-[#1B5E20] transition-colors">
                  {t.nav.integration}
                </a>
              </li>
              <li>
                <a href="#managed-process" className="hover:text-[#1B5E20] transition-colors">
                  {t.nav.process}
                </a>
              </li>
            </ul>
          </div>

          {/* Core Values */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              {t.footer.principlesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
                {t.footer.p1}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
                {t.footer.p2}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
                {t.footer.p3}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
                {t.footer.p4}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Developer Attribution */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>{t.footer.pledge}</span>
          </div>
        </div>

        {/* Developer Attribution & Social Links (At the absolute bottom of the landing page) */}
        <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-neutral-600 tracking-wide text-center sm:text-left">
            Designed and developed by <span className="font-bold text-neutral-900">Darshil Jain</span>
          </p>

          <div className="flex items-center gap-2.5">
            {/* LinkedIn Profile Button */}
            <a
              href="https://www.linkedin.com/in/darshil-jain-593754427?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0A66C2] bg-[#0A66C2]/10 hover:bg-[#0A66C2] hover:text-white transition-all shadow-xs border border-[#0A66C2]/20 cursor-pointer"
              title="Connect with Darshil Jain on LinkedIn"
              aria-label="Darshil Jain on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* GitHub Button (Interactive button without action as requested) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-all shadow-xs border border-neutral-300/80 cursor-default"
              title="GitHub Profile (Coming Soon)"
              aria-label="GitHub Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
