/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { MembershipApplication, ContactMessage, EmailLog } from './src/types';

const app = express();
const PORT = 3000;

// Logging middleware to inspect image requests
const LOG_FILE = path.join(process.cwd(), 'data', 'requests.log');
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip} - User-Agent: ${req.get('user-agent')}\n`;
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (e) {
    console.error('Failed to write to requests.log:', e);
  }
  next();
});

// Set up JSON parsing with a high limit to accommodate Base64 file uploads & signatures
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Always serve public assets directly
app.use(express.static(path.join(process.cwd(), 'public')));

// Data file paths for persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const EMAIL_LOGS_FILE = path.join(DATA_DIR, 'email_logs.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initializeFile = (filePath: string, defaultData: any) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initializeFile(APPLICATIONS_FILE, []);
initializeFile(MESSAGES_FILE, []);
initializeFile(EMAIL_LOGS_FILE, []);

// Helper to read data from file
const readData = <T>(filePath: string): T[] => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

// Helper to write data to file
const writeData = <T>(filePath: string, data: T[]): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
  }
};

// API: Save new membership application
app.post('/api/apply', (req, res) => {
  try {
    const rawApp = req.body as MembershipApplication;
    const applications = readData<MembershipApplication>(APPLICATIONS_FILE);
    const emailLogs = readData<EmailLog>(EMAIL_LOGS_FILE);

    // Generate highly structured Application Number
    const count = applications.length + 1;
    const padding = count.toString().padStart(5, '0');
    const year = new Date().getFullYear();
    const applicationNumber = `CBB-${year}-${padding}`;

    const newApplication: MembershipApplication = {
      ...rawApp,
      id: Math.random().toString(36).substring(2, 11),
      applicationNumber,
      dateSubmitted: new Date().toISOString(),
      status: 'Pending'
    };

    applications.unshift(newApplication); // Add to the beginning
    writeData(APPLICATIONS_FILE, applications);

    // Simulate sending automated emails to admins
    const adminEmails = [
      'carebeyo@carebeyondborders.co.za',
      'Egmonmondlane@gmail.com',
      'Jzeekhali@gmail.com'
    ];

    const planLabel = newApplication.planId === 'family' ? 'Family Membership (R600/mo)' : 
                      newApplication.planId === 'senior' ? 'Senior Membership (R500/mo)' : 
                      'Individual Membership (R300/mo)';

    // 1. Admin Notification Email
    adminEmails.forEach(adminEmail => {
      const adminEmailBody = `
Dear Care Beyond Borders Team,

A new Membership Application has been submitted online.

APPLICATION SUMMARY:
------------------------------------------
Application Number: ${applicationNumber}
Selected Plan:      ${planLabel}
Date Submitted:     ${new Date(newApplication.dateSubmitted).toLocaleString()}
Payment Method:     ${newApplication.paymentMethod}

APPLICANT PERSONAL DETAILS:
------------------------------------------
Full Name:          ${newApplication.fullName}
ID/Passport Num:    ${newApplication.idNumber}
Date of Birth:      ${newApplication.dateOfBirth}
Gender:             ${newApplication.gender}
Nationality:        ${newApplication.nationality}
Marital Status:     ${newApplication.maritalStatus}

CONTACT & ADDRESS:
------------------------------------------
Mobile Phone:       ${newApplication.mobileNumber}
Alternative Phone:  ${newApplication.alternativeNumber}
Email Address:      ${newApplication.emailAddress}
Residential:        ${newApplication.streetAddress}, ${newApplication.city}, ${newApplication.province}, ${newApplication.postalCode}, ${newApplication.country}

BENEFICIARY:
------------------------------------------
Name:               ${newApplication.beneficiaryName}
Relationship:       ${newApplication.beneficiaryRelationship}
Phone Number:       ${newApplication.beneficiaryPhone}

NEXT OF KIN:
------------------------------------------
Name:               ${newApplication.nextOfKinName}
Relationship:       ${newApplication.nextOfKinRelationship}
Phone Number:       ${newApplication.nextOfKinPhone}

FAMILY MEMBERS COVERED (${newApplication.familyMembers.length}):
------------------------------------------
${newApplication.familyMembers.map((m, i) => `${i+1}. Name: ${m.fullName} | DOB: ${m.dateOfBirth} | Rel: ${m.relationship} | ID: ${m.idNumber}`).join('\n')}

SUPPORTING DOCUMENTS UPLOADED:
------------------------------------------
- ID Document:      ${newApplication.idDocumentName || 'Not uploaded'}
- Passport Photo:   ${newApplication.photoDocumentName || 'Not uploaded'}
- Proof of Res:     ${newApplication.residenceDocumentName || 'Not uploaded'}

Digital signature has been securely stored on server.

Please log in to the admin dashboard to review documents and approve this membership.

Regards,
Care Beyond Borders Automated Web Server
      `;

      emailLogs.push({
        id: Math.random().toString(36).substring(2, 11),
        to: adminEmail,
        subject: `[New Application] ${applicationNumber} - ${newApplication.fullName}`,
        body: adminEmailBody,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
    });

    // 2. Applicant Confirmation Email
    const applicantEmailBody = `
Dear ${newApplication.fullName},

Thank you for choosing Care Beyond Borders! We have successfully received your online membership application.

YOUR APPLICATION DETAILS:
------------------------------------------------
Application Number:  ${applicationNumber}
Selected Plan:       ${planLabel}
Monthly Premium:     ${newApplication.planId === 'family' ? 'R600' : newApplication.planId === 'senior' ? 'R500' : 'R300'} per month
Payment Method:      ${newApplication.paymentMethod}

NEXT STEPS:
------------------------------------------------
1. Our administration team is currently reviewing your uploaded documents (ID/Passport, Passport Photo, Proof of Residence).
2. Once verified, your policy active date will be confirmed, and your welcome packet will be sent to your email.
3. If you selected EFT or Bank Transfer, please use your application number (${applicationNumber}) as the reference for payments.

BANKING DETAILS FOR PREMIUM PAYMENTS:
------------------------------------------------
Bank:                First National Bank (FNB)
Account Holder:      Care Beyond Borders
Account Number:      62910485302 (Demo)
Branch Code:         250655
Reference:           ${applicationNumber}

For any immediate support or inquiry, please reach out to our team at carebeyo@carebeyondborders.co.za or call us at 071 534 6002 / 067 086 3832.

We Care. We Transport. We Respect.

Best regards,
Care Beyond Borders Administration
13 Oorbietjie Street, Nimrod Park, Glen Marais, Kempton Park, 1619
    `;

    emailLogs.push({
      id: Math.random().toString(36).substring(2, 11),
      to: newApplication.emailAddress,
      subject: `Application Received - Care Beyond Borders (${applicationNumber})`,
      body: applicantEmailBody,
      sentAt: new Date().toISOString(),
      status: 'sent'
    });

    writeData(EMAIL_LOGS_FILE, emailLogs);

    res.status(201).json({
      success: true,
      applicationNumber,
      application: newApplication
    });
  } catch (error) {
    console.error('Error applying online:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// API: Get all applications for Admin Portal
app.get('/api/applications', (req, res) => {
  const applications = readData<MembershipApplication>(APPLICATIONS_FILE);
  res.json(applications);
});

// API: Update application status
app.patch('/api/applications/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const applications = readData<MembershipApplication>(APPLICATIONS_FILE);
    const index = applications.findIndex(app => app.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    applications[index].status = status as 'Pending' | 'Approved' | 'Declined';
    writeData(APPLICATIONS_FILE, applications);

    res.json({ success: true, application: applications[index] });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// API: Post contact message
app.post('/api/contact', (req, res) => {
  try {
    const message = req.body as ContactMessage;
    const messages = readData<ContactMessage>(MESSAGES_FILE);

    const newMessage: ContactMessage = {
      ...message,
      id: Math.random().toString(36).substring(2, 11),
      dateSubmitted: new Date().toISOString()
    };

    messages.unshift(newMessage);
    writeData(MESSAGES_FILE, messages);

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error posting contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// API: Get contact messages
app.get('/api/messages', (req, res) => {
  const messages = readData<ContactMessage>(MESSAGES_FILE);
  res.json(messages);
});

// API: Get simulated email logs
app.get('/api/email-logs', (req, res) => {
  const emailLogs = readData<EmailLog>(EMAIL_LOGS_FILE);
  res.json(emailLogs);
});

// Serve frontend assets using Vite middleware or Static serving depending on environment
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Read index.html from root
        let template = fs.readFileSync(
          path.resolve(process.cwd(), 'index.html'),
          'utf-8'
        );
        // Apply Vite HTML transforms to inject the dev script and HMR support
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Care Beyond Borders server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
