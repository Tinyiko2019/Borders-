/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FamilyMember {
  id: string;
  fullName: string;
  dateOfBirth: string;
  relationship: string;
  idNumber: string;
}

export interface MembershipApplication {
  id?: string;
  applicationNumber: string;
  planId: 'individual' | 'family' | 'senior';
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Declined';
  
  // Personal Details
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  
  // Contact Details
  mobileNumber: string;
  alternativeNumber: string;
  emailAddress: string;
  
  // Residential Address
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  
  // Beneficiary
  beneficiaryName: string;
  beneficiaryRelationship: string;
  beneficiaryPhone: string;
  
  // Family Members (if Family Membership is selected)
  familyMembers: FamilyMember[];
  
  // Next of Kin
  nextOfKinName: string;
  nextOfKinRelationship: string;
  nextOfKinPhone: string;
  
  // Documents (Base64 string or filename)
  idDocument?: string;
  idDocumentName?: string;
  photoDocument?: string;
  photoDocumentName?: string;
  residenceDocument?: string;
  residenceDocumentName?: string;
  
  // Payment Details
  paymentMethod: 'EFT' | 'Bank Transfer' | 'Debit Order' | 'Cash';
  
  // Agreement and Digital Signature
  declared: boolean;
  signatureData: string; // Base64 data URL
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  dateSubmitted: string;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  status: 'sent' | 'failed';
}
