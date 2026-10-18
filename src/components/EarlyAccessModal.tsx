import React, { useState } from 'react';
import { X, Check, Building2, ArrowRight } from 'lucide-react';
import { EnterpriseProfile } from './ProfilePage';
import { useLanguage } from '../context/LanguageContext';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'msme_supplier' | 'processing_buyer' | 'transit_partner';
  enterpriseProfile?: EnterpriseProfile | null;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'msme_supplier',
  enterpriseProfile,
}) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: enterpriseProfile?.name || '',
    role: initialRole,
    industry: enterpriseProfile?.businessDealsIn || 'CNC & Precision Machining',
    materialType: enterpriseProfile?.majorResources || 'Metals & Alloys',
    monthlyScrapTonnage: '2 to 10 Tons / Month',
    email: enterpriseProfile?.email || '',
    phone: enterpriseProfile?.phone || '',
    location: enterpriseProfile?.address || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B5E20] mb-2">
              <Building2 className="w-4 h-4" />
              {t.modal.badge}
            </div>
            <h3 className="text-2xl font-bold text-[#191C1E]">
              {t.modal.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {t.modal.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Participant Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {t.modal.roleLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'msme_supplier' })}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                      formData.role === 'msme_supplier'
                        ? 'border-[#1B5E20] bg-[#E8F5E9] text-[#1B5E20] font-semibold shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {t.modal.roleMsme}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'processing_buyer' })}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                      formData.role === 'processing_buyer'
                        ? 'border-[#0284C7] bg-[#E0F2FE] text-[#0284C7] font-semibold shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {t.modal.roleProcessing}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'transit_partner' })}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                      formData.role === 'transit_partner'
                        ? 'border-[#B45309] bg-[#FEF3C7] text-[#B45309] font-semibold shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {t.modal.roleTransit}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.modal.businessNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.businessNamePlaceholder}
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.modal.industryLabel}
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  >
                    <option>CNC & Precision Machining</option>
                    <option>Automotive Ancillary & Stamping</option>
                    <option>Textiles & Garment Lofts</option>
                    <option>Plastics & Injection Molding</option>
                    <option>Foundry & Casting</option>
                    <option>Chemical & Agro Processing</option>
                    <option>Woodworking & Joinery</option>
                    <option>Commercial Transport Fleet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.modal.materialTypeLabel}
                  </label>
                  <select
                    value={formData.materialType}
                    onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  >
                    <option>Metals & Alloys (Swarf, Bar Ends, Sheets)</option>
                    <option>Polymers & Engineered Plastics (Sprues, Trimmings)</option>
                    <option>Textile Selvedges & Fabric Waste</option>
                    <option>Wood Offcuts & Sawdust</option>
                    <option>Agro & Organic Processing Residues</option>
                    <option>Packaging & Corrugated Waste</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.modal.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@factory.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.modal.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.modal.locationLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.locationPlaceholder}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154c19] active:scale-[0.99] transition-all shadow-xs"
                >
                  {t.modal.submitBtn}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-[#191C1E]">
              {t.modal.successTitle}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 max-w-sm mx-auto">
              {t.modal.successDesc}
            </p>
            <button
              onClick={handleReset}
              className="mt-8 px-6 py-2.5 rounded-full text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              {t.modal.closeBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
