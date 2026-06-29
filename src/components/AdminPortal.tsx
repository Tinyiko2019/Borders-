/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Mail, ShieldAlert, CheckCircle, Clock, Eye, Sparkles, RefreshCw, 
  Trash2, Search, FileText, ChevronRight, X, AlertTriangle, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { Language, translations } from '../translations';
import { MembershipApplication, ContactMessage, EmailLog } from '../types';

interface AdminPortalProps {
  lang: Language;
  onBackToSite: () => void;
}

export default function AdminPortal({ lang, onBackToSite }: AdminPortalProps) {
  const t = translations[lang];

  // Data State
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  
  // Loading & Filter State
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'emails'>('applications');
  const [appSearch, setAppSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      let apps = [];
      let msgs = [];
      let emails = [];

      try {
        const [appRes, msgRes, emailRes] = await Promise.all([
          fetch('/api/applications').catch(() => null),
          fetch('/api/messages').catch(() => null),
          fetch('/api/email-logs').catch(() => null)
        ]);

        if (appRes && appRes.ok) apps = await appRes.json();
        if (msgRes && msgRes.ok) msgs = await msgRes.json();
        if (emailRes && emailRes.ok) emails = await emailRes.json();
      } catch (apiErr) {
        console.warn('API fetch failed, falling back to localStorage only:', apiErr);
      }

      // Load static/local storage backups
      const localApps = JSON.parse(localStorage.getItem('cbb_applications') || '[]');
      const localMsgs = JSON.parse(localStorage.getItem('cbb_messages') || '[]');
      const localEmails = JSON.parse(localStorage.getItem('cbb_emails') || '[]');

      // Merge and remove duplicates by ID
      const mergedApps = [...localApps, ...apps].filter(
        (val, idx, self) => self.findIndex(t => t.id === val.id) === idx
      );
      const mergedMsgs = [...localMsgs, ...msgs].filter(
        (val, idx, self) => self.findIndex(t => t.id === val.id) === idx
      );
      const mergedEmails = [...localEmails, ...emails].filter(
        (val, idx, self) => self.findIndex(t => t.id === val.id) === idx
      );

      setApplications(mergedApps);
      setMessages(mergedMsgs);
      setEmailLogs(mergedEmails);
    } catch (err) {
      console.error('Error fetching admin dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStatus = async (appId: string, newStatus: 'Pending' | 'Approved' | 'Declined') => {
    setStatusUpdateLoading(true);
    try {
      // Try to update on server if possible
      try {
        await fetch(`/api/applications/${appId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (apiErr) {
        console.warn('API PATCH failed, updating in localStorage only.', apiErr);
      }

      // Always update in localStorage too
      const localApps = JSON.parse(localStorage.getItem('cbb_applications') || '[]');
      const updatedLocalApps = localApps.map((a: any) => a.id === appId ? { ...a, status: newStatus } : a);
      localStorage.setItem('cbb_applications', JSON.stringify(updatedLocalApps));

      // Update local React state
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error('Error patching status:', err);
      alert('Error updating status.');
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Filter apps by search
  const filteredApps = applications.filter(app => {
    const term = appSearch.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(term) ||
      app.applicationNumber.toLowerCase().includes(term) ||
      app.idNumber.toLowerCase().includes(term) ||
      app.emailAddress.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 pt-24 pb-16 relative">
      {/* Golden accent bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gold-500"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 relative z-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-gold-500" />
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
                Care Beyond Borders Staff Console
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Review enrollment submissions, audit dispatch servers, and check client messages.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAdminData}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 p-2.5 rounded transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToSite}
              className="bg-gold-500 hover:bg-gold-600 text-navy-500 font-bold px-4 py-2.5 rounded text-xs uppercase tracking-widest flex items-center space-x-1.5 transition-all shadow cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Website Home</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Applications</span>
              <span className="block text-3xl font-extrabold text-white font-mono">{applications.length}</span>
            </div>
            <div className="p-3 bg-navy-500/20 text-navy-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pending Review</span>
              <span className="block text-3xl font-extrabold text-gold-400 font-mono">
                {applications.filter(a => a.status === 'Pending').length}
              </span>
            </div>
            <div className="p-3 bg-gold-500/10 text-gold-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Inquiries Received</span>
              <span className="block text-3xl font-extrabold text-sky-400 font-mono">{messages.length}</span>
            </div>
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email logs</span>
              <span className="block text-3xl font-extrabold text-emerald-400 font-mono">{emailLogs.length}</span>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Selection Headers */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'applications' 
                ? 'border-gold-500 text-gold-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Membership Applications
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'messages' 
                ? 'border-gold-500 text-gold-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Inquiries Inbox
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'emails' 
                ? 'border-gold-500 text-gold-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Email logs (Audit)
          </button>
        </div>

        {/* Tab Content Panels */}
        {loading ? (
          <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-3" />
            <p className="text-sm text-slate-400 font-semibold">Fetching logs from system database...</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            
            {/* 1. APPLICATIONS PANEL */}
            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Apps list column */}
                <div className={`space-y-4 ${selectedApp ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search by name, passport, or application code..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-gold-500 shadow-inner"
                    />
                  </div>

                  {filteredApps.length === 0 ? (
                    <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800">
                      <p className="text-slate-400 text-xs">No matching applications logged on server.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                      {filteredApps.map((app) => {
                        const isSelected = selectedApp && selectedApp.id === app.id;
                        
                        return (
                          <div
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? 'bg-slate-700/80 border-gold-500/50 shadow' 
                                : 'bg-slate-800 hover:bg-slate-700/40 border-slate-700/50'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-mono text-xs text-gold-400 font-bold block">{app.applicationNumber}</span>
                              <span className="text-sm font-bold text-white block">{app.fullName}</span>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                Plan: {app.planId} | {new Date(app.dateSubmitted).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center space-x-3">
                              {/* Status badge */}
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                                app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                app.status === 'Declined' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                              }`}>
                                {app.status}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected App Full Details panel (Opens on click) */}
                {selectedApp && (
                  <div className="lg:col-span-7 bg-slate-800 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-xl relative animate-fade-in">
                    
                    {/* Close detail button */}
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* App Header info */}
                    <div className="border-b border-slate-700/50 pb-4 space-y-2">
                      <span className="text-xs font-mono font-bold text-gold-400">{selectedApp.applicationNumber}</span>
                      <h2 className="text-xl font-extrabold text-white">{selectedApp.fullName}</h2>
                      <p className="text-xs text-slate-400">Submitted: {new Date(selectedApp.dateSubmitted).toLocaleString()}</p>
                    </div>

                    {/* Change Status Control Button bar */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/40 flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-slate-300">Application Review Status:</span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateStatus(selectedApp.id!, 'Approved')}
                          disabled={statusUpdateLoading}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                            selectedApp.status === 'Approved' 
                              ? 'bg-emerald-500 text-slate-900 font-extrabold shadow' 
                              : 'bg-slate-800 hover:bg-emerald-500/10 text-emerald-400'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedApp.id!, 'Declined')}
                          disabled={statusUpdateLoading}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                            selectedApp.status === 'Declined' 
                              ? 'bg-red-500 text-white font-extrabold shadow' 
                              : 'bg-slate-800 hover:bg-red-500/10 text-red-400'
                          }`}
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedApp.id!, 'Pending')}
                          disabled={statusUpdateLoading}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                            selectedApp.status === 'Pending' 
                              ? 'bg-gold-500 text-slate-900 font-extrabold shadow' 
                              : 'bg-slate-800 hover:bg-gold-500/10 text-gold-400'
                          }`}
                        >
                          Pending
                        </button>
                      </div>
                    </div>

                    {/* Comprehensive Details breakdown */}
                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 text-xs leading-relaxed">
                      
                      {/* Personal & Contact */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/30">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">ID / Passport Number:</span>
                          <span className="text-white font-mono font-semibold">{selectedApp.idNumber}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth:</span>
                          <span className="text-white">{selectedApp.dateOfBirth}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Gender / Marital:</span>
                          <span className="text-white">{selectedApp.gender} / {selectedApp.maritalStatus}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Nationality:</span>
                          <span className="text-white">{selectedApp.nationality}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Contact Phones:</span>
                          <span className="text-white font-mono">{selectedApp.mobileNumber} {selectedApp.alternativeNumber && `| ${selectedApp.alternativeNumber}`}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address:</span>
                          <span className="text-white underline">{selectedApp.emailAddress}</span>
                        </div>
                        <div className="space-y-1 col-span-1 md:col-span-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Residential Address:</span>
                          <span className="text-white leading-normal">{selectedApp.streetAddress}, {selectedApp.city}, {selectedApp.province}, {selectedApp.postalCode}, {selectedApp.country}</span>
                        </div>
                      </div>

                      {/* Beneficiary & Next of Kin */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-700/30 space-y-2">
                          <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[10px]">Primary Beneficiary</h4>
                          <div className="space-y-1 text-slate-300">
                            <p>Name: <span className="font-semibold text-white">{selectedApp.beneficiaryName}</span></p>
                            <p>Rel: <span className="text-white">{selectedApp.beneficiaryRelationship}</span></p>
                            <p>Phone: <span className="font-mono text-white">{selectedApp.beneficiaryPhone}</span></p>
                          </div>
                        </div>

                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-700/30 space-y-2">
                          <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[10px]">Next of Kin</h4>
                          <div className="space-y-1 text-slate-300">
                            <p>Name: <span className="font-semibold text-white">{selectedApp.nextOfKinName}</span></p>
                            <p>Rel: <span className="text-white">{selectedApp.nextOfKinRelationship}</span></p>
                            <p>Phone: <span className="font-mono text-white">{selectedApp.nextOfKinPhone}</span></p>
                          </div>
                        </div>
                      </div>

                      {/* Family Members if any */}
                      {selectedApp.planId === 'family' && (
                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-700/30 space-y-3">
                          <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[10px]">Covered Family Members ({selectedApp.familyMembers.length})</h4>
                          {selectedApp.familyMembers.length === 0 ? (
                            <p className="text-slate-400 italic">No family members registered.</p>
                          ) : (
                            <div className="space-y-2">
                              {selectedApp.familyMembers.map((m, idx) => (
                                <div key={m.id} className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/40 text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                                  <p className="col-span-1 sm:col-span-2">Name: <span className="font-bold text-white">{m.fullName}</span></p>
                                  <p>DOB: <span className="text-white">{m.dateOfBirth}</span></p>
                                  <p>Rel: <span className="text-white">{m.relationship}</span></p>
                                  <p className="col-span-1 sm:col-span-2">ID/BI/Passport: <span className="font-mono text-white">{m.idNumber}</span></p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Document Attachments Logs */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-gold-400 uppercase tracking-wider text-[10px]">Uploaded Files Checklog</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700 text-center space-y-1">
                            <span className="block font-semibold text-white">ID Copy</span>
                            <span className="text-[10px] text-emerald-400">{selectedApp.idDocumentName ? '✓ Active' : '✗ Missing'}</span>
                          </div>
                          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700 text-center space-y-1">
                            <span className="block font-semibold text-white">Photo</span>
                            <span className="text-[10px] text-emerald-400">{selectedApp.photoDocumentName ? '✓ Active' : '✗ Missing'}</span>
                          </div>
                          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700 text-center space-y-1">
                            <span className="block font-semibold text-white">Residence Address</span>
                            <span className="text-[10px] text-emerald-400">{selectedApp.residenceDocumentName ? '✓ Active' : '✗ Missing'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Digital Signature Display */}
                      <div className="bg-white p-4 rounded-xl border border-slate-700 shadow-inner space-y-2">
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Captured Digital Signature</h4>
                        <div className="border border-slate-200 rounded p-2 bg-slate-50 flex items-center justify-center">
                          <img 
                            src={selectedApp.signatureData} 
                            alt="Applicant Signature" 
                            className="max-h-[80px] object-contain max-w-[200px]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono block text-center">Base64 SHA-256 Secured Encrypted Document</span>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 2. INQUIRIES BOX */}
            {activeTab === 'messages' && (
              <div className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl max-w-4xl mx-auto">
                <div className="bg-slate-900 py-4 px-6 border-b border-slate-800 flex justify-between items-center text-white">
                  <h3 className="text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gold-400" />
                    <span>Client Contact Messages Box ({messages.length})</span>
                  </h3>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-20">
                    <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-xs italic">No messages received via Contact Form yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/50 max-h-[600px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-6 space-y-3 hover:bg-slate-700/25 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-extrabold text-white">{msg.fullName}</h4>
                            <p className="text-[11px] text-slate-400">
                              Email: <span className="text-slate-300 underline">{msg.email}</span> | Phone: <span className="font-mono text-slate-300">{msg.phone}</span>
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(msg.dateSubmitted).toLocaleString()}
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 space-y-1 text-xs">
                          <p className="font-bold text-gold-400">Subject: {msg.subject}</p>
                          <p className="text-slate-300 leading-relaxed pt-1 whitespace-pre-line">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. EMAIL LOGS (AUDIT) PANEL */}
            {activeTab === 'emails' && (
              <div className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl max-w-4xl mx-auto">
                <div className="bg-slate-900 py-4 px-6 border-b border-slate-800 flex justify-between items-center text-white">
                  <h3 className="text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <span>Automated Email Dispatch Audit logs ({emailLogs.length})</span>
                  </h3>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                    Post-Submit Mailer Active
                  </span>
                </div>

                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <strong>Audit Notice:</strong> These are real email packets built and dispatched by the Care Beyond Borders server. Because the local container runs in sandbox isolation, actual delivery relies on client secrets, but the system logs full payloads below for verification.
                  </p>
                </div>

                {emailLogs.length === 0 ? (
                  <div className="text-center py-20">
                    <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-xs italic">No email dispatches recorded yet. Complete an online membership form to trigger logs!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/50 max-h-[600px] overflow-y-auto">
                    {emailLogs.map((log) => (
                      <div key={log.id} className="p-6 space-y-3 hover:bg-slate-700/25 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="space-y-0.5 text-xs">
                            <p className="text-slate-400">
                              To: <span className="font-bold text-white underline">{log.to}</span>
                            </p>
                            <p className="font-bold text-gold-400 pt-1">
                              Subject: {log.subject}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <span className="text-[10px] text-slate-500 font-mono block">
                              {new Date(log.sentAt).toLocaleString()}
                            </span>
                            <span className="bg-emerald-500 text-slate-900 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                              {log.status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300 leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-[250px]">
                          {log.body}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
