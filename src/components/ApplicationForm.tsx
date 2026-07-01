/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, User, MapPin, CreditCard, Send, CheckCircle2, Info, HeartHandshake 
} from 'lucide-react';
import { Language, translations } from '../translations';
import { useForm, ValidationError } from '@formspree/react';

interface ApplicationFormProps {
  lang: Language;
  selectedPlanId: 'individual' | 'family' | 'senior';
  onResetPlan: () => void;
  onNavigateToAdmin: () => void;
}

export default function ApplicationForm({ lang, selectedPlanId, onResetPlan, onNavigateToAdmin }: ApplicationFormProps) {
  const t = translations[lang];
  
  // Fields state
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternativeNumber, setAlternativeNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('South Africa');
  
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState('');
  
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('');
  
  const [planId, setPlanId] = useState<'individual' | 'family' | 'senior'>(selectedPlanId);
  const [paymentMethod, setPaymentMethod] = useState<'EFT' | 'Bank Transfer' | 'Debit Order' | 'Cash'>('EFT');
  const [declared, setDeclared] = useState(false);
  const [message, setMessage] = useState('');

  // Stable Application Number
  const [applicationNumber] = useState(() => `CBB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  // Use Formspree Hook with Form ID xnjkzlrw
  const [formspreeState, handleFormspreeSubmit] = useForm('xnjkzlrw');

  // Sync selectedPlanId prop with local select plan state
  React.useEffect(() => {
    setPlanId(selectedPlanId);
  }, [selectedPlanId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: Math.random().toString(36).substring(2, 11),
      applicationNumber,
      planId,
      fullName,
      idNumber,
      dateOfBirth,
      gender,
      nationality,
      maritalStatus,
      mobileNumber,
      alternativeNumber,
      emailAddress,
      streetAddress,
      city,
      province,
      postalCode,
      country,
      beneficiaryName,
      beneficiaryRelationship,
      beneficiaryPhone,
      nextOfKinName,
      nextOfKinRelationship,
      nextOfKinPhone,
      paymentMethod,
      declared,
      message,
      dateSubmitted: new Date().toISOString(),
      status: 'Pending',
      familyMembers: [],
      signatureData: ''
    };

    // Save to localStorage so that the Admin view works on a completely static hosting!
    try {
      const storedApps = localStorage.getItem('cbb_applications');
      const appsList = storedApps ? JSON.parse(storedApps) : [];
      appsList.unshift(payload);
      localStorage.setItem('cbb_applications', JSON.stringify(appsList));
    } catch (err) {
      console.warn('Error saving application to localStorage:', err);
    }

    try {
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('run.app')) {
        fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => {
          console.warn('Local apply API not active, falling back to static mode.', err);
        });
      }
    } catch (err) {}

    // Submit to Formspree
    await handleFormspreeSubmit(e);
  };

  return (
    <section id="apply" className="py-20 bg-slate-50 relative">
      <div className="absolute top-1/2 right-0 w-[30%] h-[30%] rounded-full bg-gold-100/50 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 flex items-center justify-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.navApply}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.formTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500">
            {t.formSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {formspreeState.succeeded ? (
            <div className="py-16 px-6 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-navy-900">{t.submitSuccessTitle}</h3>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                {t.submitSuccessP1}
              </p>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 max-w-md mx-auto text-left space-y-3 text-xs text-slate-600">
                <div className="font-bold text-navy-900 text-sm border-b border-slate-200 pb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-gold-600" />
                  <span>Premium Payment Details</span>
                </div>
                <div className="grid grid-cols-2 gap-y-1">
                  <div>Bank:</div>
                  <div className="font-semibold text-navy-900">First National Bank (FNB)</div>
                  <div>Account Holder:</div>
                  <div className="font-semibold text-navy-900">Care Beyond Borders</div>
                  <div>Account Number:</div>
                  <div className="font-semibold text-navy-900">62910485302</div>
                  <div>Branch Code:</div>
                  <div className="font-semibold text-navy-900">250655</div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFullName('');
                    setIdNumber('');
                    setDateOfBirth('');
                    setNationality('');
                    setMobileNumber('');
                    setAlternativeNumber('');
                    setEmailAddress('');
                    setStreetAddress('');
                    setCity('');
                    setProvince('');
                    setPostalCode('');
                    setBeneficiaryName('');
                    setBeneficiaryRelationship('');
                    setBeneficiaryPhone('');
                    setNextOfKinName('');
                    setNextOfKinRelationship('');
                    setNextOfKinPhone('');
                    setMessage('');
                    setDeclared(false);
                    onResetPlan();
                    window.location.reload();
                  }}
                  className="w-full sm:w-auto bg-navy-500 hover:bg-navy-600 text-white font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
                >
                  {t.submitSuccessBtn}
                </button>
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
                >
                  {t.submitAdminView}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
              {/* Formspree hidden inputs to capture Form Type and other details */}
              <input type="hidden" name="Form Type" value="Apply" />
              <input type="hidden" name="Application Number" value={applicationNumber} />
              <input type="hidden" name="Payment Method" value={paymentMethod} />
              <input type="hidden" name="Marital Status" value={maritalStatus} />
              <input type="hidden" name="Postal Code" value={postalCode} />
              <input type="hidden" name="Country" value={country} />
              <input type="hidden" name="Declaration Accepted" value={declared ? "Yes" : "No"} />

              {/* SECTION 1: COVER PLAN SELECTION */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">1</span>
                  <span>Select Membership Plan</span>
                </h3>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldPlanSelected} *</label>
                  <select
                    name="Selected Plan"
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value as 'individual' | 'family' | 'senior')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                  >
                    <option value="individual">{t.planIndividualName} - R300 / mo</option>
                    <option value="family">{t.planFamilyName} - R600 / mo</option>
                    <option value="senior">{t.planSeniorName} - R500 / mo</option>
                  </select>
                </div>
              </div>

              {/* SECTION 2: PERSONAL DETAILS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">2</span>
                  <span>{t.formStep1}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldFullName} *</label>
                    <input
                      type="text"
                      name="Full Name"
                      required
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  {/* ID / Passport */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldIdPassport} *</label>
                    <input
                      type="text"
                      name="ID/Passport Number"
                      required
                      placeholder="e.g. BI8392102"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* DOB */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldDob} *</label>
                    <input
                      type="date"
                      name="Date of Birth"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldGender} *</label>
                    <select
                      name="Gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    >
                      <option value="Male">{t.fieldGenderMale}</option>
                      <option value="Female">{t.fieldGenderFemale}</option>
                      <option value="Other">{t.fieldGenderOther}</option>
                    </select>
                  </div>

                  {/* Nationality */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldNationality} *</label>
                    <input
                      type="text"
                      name="Nationality"
                      required
                      placeholder="e.g. Mozambican"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: CONTACT & RESIDENTIAL ADDRESS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">3</span>
                  <span>{t.formStep2}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Mobile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldMobile} *</label>
                    <input
                      type="tel"
                      name="Mobile Number"
                      required
                      placeholder="071 534 6002"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* Alternative Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldAltPhone}</label>
                    <input
                      type="tel"
                      name="Alternative Number"
                      placeholder="067 086 3832"
                      value={alternativeNumber}
                      onChange={(e) => setAlternativeNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldEmail} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="yourname@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                    <ValidationError prefix="Email" field="email" errors={formspreeState.errors} className="text-xs text-red-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Street Address */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldStreet} *</label>
                    <input
                      type="text"
                      name="Street Address"
                      required
                      placeholder="e.g. 13 Oorbietjie Street"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldCity} *</label>
                    <input
                      type="text"
                      name="City"
                      required
                      placeholder="Kempton Park"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* Province */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldProvince} *</label>
                    <input
                      type="text"
                      name="Province"
                      required
                      placeholder="Gauteng"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: BENEFICIARY DETAILS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">4</span>
                  <span>{t.fieldBeneficiaryTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-500">{t.fieldBeneficiarySub}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Beneficiary Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldFullName} *</label>
                    <input
                      type="text"
                      name="Beneficiary Name"
                      required
                      placeholder="Beneficiary Full Name"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Beneficiary Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldRelationship} *</label>
                    <input
                      type="text"
                      name="Beneficiary Relationship"
                      required
                      placeholder="e.g. Spouse, Brother, Son"
                      value={beneficiaryRelationship}
                      onChange={(e) => setBeneficiaryRelationship(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Beneficiary Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldPhone} *</label>
                    <input
                      type="tel"
                      name="Beneficiary Phone"
                      required
                      placeholder="e.g. +258 84 123 4567"
                      value={beneficiaryPhone}
                      onChange={(e) => setBeneficiaryPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: NEXT OF KIN DETAILS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">5</span>
                  <span>{t.fieldNextOfKinTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-500">{t.fieldNextOfKinSub}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Next of Kin Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldFullName} *</label>
                    <input
                      type="text"
                      name="Next of Kin Name"
                      required
                      placeholder="Next of Kin Full Name"
                      value={nextOfKinName}
                      onChange={(e) => setNextOfKinName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Next of Kin Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldRelationship} *</label>
                    <input
                      type="text"
                      name="Next of Kin Relationship"
                      required
                      placeholder="e.g. Sister, Uncle, Cousin"
                      value={nextOfKinRelationship}
                      onChange={(e) => setNextOfKinRelationship(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Next of Kin Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldPhone} *</label>
                    <input
                      type="tel"
                      name="Next of Kin Phone"
                      required
                      placeholder="e.g. +27 71 534 6002"
                      value={nextOfKinPhone}
                      onChange={(e) => setNextOfKinPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: ADDITIONAL MESSAGE AND DECLARATION */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center text-xs">6</span>
                  <span>Additional Details & Legal Declaration</span>
                </h3>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">Additional Notes / Covered Family Members Info</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Provide any additional family details, ID numbers, or special coverage notes here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded py-2.5 px-3 text-sm focus:outline-none resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={formspreeState.errors} className="text-xs text-red-500" />
                </div>

                {/* Payment Selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider block">{t.fieldPaymentTitle} *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['EFT', 'Bank Transfer', 'Debit Order', 'Cash'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method as any)}
                        className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                          paymentMethod === method
                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-navy-500 border-slate-200'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Declaration Checkbox */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-4">
                  <label className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={declared}
                      onChange={(e) => setDeclared(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-navy-500 border-slate-300 focus:ring-navy-500 flex-shrink-0 cursor-pointer"
                    />
                    <span className="font-medium text-navy-900">
                      {t.fieldDeclarationCheck}
                    </span>
                  </label>
                </div>
              </div>

              {/* Formspree submission error banner */}
              {formspreeState.errors && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold animate-fade-in space-y-1">
                  <p className="font-bold">❌ Submission failed</p>
                  <p>Please check that all fields are filled out correctly and try again, or contact us directly at <a href="mailto:carebeyo@carebeyondborders.co.za" className="underline">carebeyo@carebeyondborders.co.za</a>.</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formspreeState.submitting || !declared}
                className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-extrabold py-4 rounded-xl transition-all shadow hover:shadow-md text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {formspreeState.submitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>{t.btnSubmit}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
