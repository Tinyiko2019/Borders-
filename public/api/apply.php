<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

$input = file_get_contents("php://input");
$rawApp = json_decode($input, true);

if (!$rawApp) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

$applications = readData('applications.json');
$emailLogs = readData('email_logs.json');

$count = count($applications) + 1;
$padding = str_pad($count, 5, '0', STR_PAD_LEFT);
$year = date('Y');
$applicationNumber = "CBB-{$year}-{$padding}";

$newApplication = $rawApp;
$newApplication['id'] = substr(md5(uniqid(rand(), true)), 0, 9);
$newApplication['applicationNumber'] = $applicationNumber;
$newApplication['dateSubmitted'] = date('c');
$newApplication['status'] = 'Pending';

array_unshift($applications, $newApplication);
writeData('applications.json', $applications);

$planLabel = ($newApplication['planId'] ?? '') === 'family' ? 'Family Membership (R600/mo)' : 
             (($newApplication['planId'] ?? '') === 'senior' ? 'Senior Membership (R500/mo)' : 
             'Individual Membership (R300/mo)');

$premium = ($newApplication['planId'] ?? '') === 'family' ? 'R600' : 
           (($newApplication['planId'] ?? '') === 'senior' ? 'R500' : 'R300');

// 1. Admin Email Body
$adminEmailBody = "Dear Care Beyond Borders Team,\n\n";
$adminEmailBody .= "A new Membership Application has been submitted online.\n\n";
$adminEmailBody .= "APPLICATION SUMMARY:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "Application Number: " . $applicationNumber . "\n";
$adminEmailBody .= "Selected Plan:      " . $planLabel . "\n";
$adminEmailBody .= "Date Submitted:     " . date('Y-m-d H:i:s') . "\n";
$adminEmailBody .= "Payment Method:     " . ($newApplication['paymentMethod'] ?? 'N/A') . "\n\n";

$adminEmailBody .= "APPLICANT PERSONAL DETAILS:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "Full Name:          " . ($newApplication['fullName'] ?? 'N/A') . "\n";
$adminEmailBody .= "ID/Passport Num:    " . ($newApplication['idNumber'] ?? 'N/A') . "\n";
$adminEmailBody .= "Date of Birth:      " . ($newApplication['dateOfBirth'] ?? 'N/A') . "\n";
$adminEmailBody .= "Gender:             " . ($newApplication['gender'] ?? 'N/A') . "\n";
$adminEmailBody .= "Nationality:        " . ($newApplication['nationality'] ?? 'N/A') . "\n";
$adminEmailBody .= "Marital Status:     " . ($newApplication['maritalStatus'] ?? 'N/A') . "\n\n";

$adminEmailBody .= "CONTACT & ADDRESS:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "Mobile Phone:       " . ($newApplication['mobileNumber'] ?? 'N/A') . "\n";
$adminEmailBody .= "Alternative Phone:  " . ($newApplication['alternativeNumber'] ?? 'N/A') . "\n";
$adminEmailBody .= "Email Address:      " . ($newApplication['emailAddress'] ?? 'N/A') . "\n";
$adminEmailBody .= "Residential:        " . ($newApplication['streetAddress'] ?? '') . ", " . ($newApplication['city'] ?? '') . ", " . ($newApplication['province'] ?? '') . ", " . ($newApplication['postalCode'] ?? '') . ", " . ($newApplication['country'] ?? '') . "\n\n";

$adminEmailBody .= "BENEFICIARY:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "Name:               " . ($newApplication['beneficiaryName'] ?? 'N/A') . "\n";
$adminEmailBody .= "Relationship:       " . ($newApplication['beneficiaryRelationship'] ?? 'N/A') . "\n";
$adminEmailBody .= "Phone Number:       " . ($newApplication['beneficiaryPhone'] ?? 'N/A') . "\n\n";

$adminEmailBody .= "NEXT OF KIN:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "Name:               " . ($newApplication['nextOfKinName'] ?? 'N/A') . "\n";
$adminEmailBody .= "Relationship:       " . ($newApplication['nextOfKinRelationship'] ?? 'N/A') . "\n";
$adminEmailBody .= "Phone Number:       " . ($newApplication['nextOfKinPhone'] ?? 'N/A') . "\n\n";

$familyCount = is_array($newApplication['familyMembers'] ?? null) ? count($newApplication['familyMembers']) : 0;
$adminEmailBody .= "FAMILY MEMBERS COVERED ({$familyCount}):\n";
$adminEmailBody .= "------------------------------------------\n";
if ($familyCount > 0) {
    foreach ($newApplication['familyMembers'] as $i => $m) {
        $adminEmailBody .= ($i + 1) . ". Name: " . ($m['fullName'] ?? 'N/A') . " | DOB: " . ($m['dateOfBirth'] ?? 'N/A') . " | Rel: " . ($m['relationship'] ?? 'N/A') . " | ID: " . ($m['idNumber'] ?? 'N/A') . "\n";
    }
} else {
    $adminEmailBody .= "None\n";
}
$adminEmailBody .= "\n";

$adminEmailBody .= "SUPPORTING DOCUMENTS UPLOADED:\n";
$adminEmailBody .= "------------------------------------------\n";
$adminEmailBody .= "- ID Document:      " . ($newApplication['idDocumentName'] ?? 'Not uploaded') . "\n";
$adminEmailBody .= "- Passport Photo:   " . ($newApplication['photoDocumentName'] ?? 'Not uploaded') . "\n";
$adminEmailBody .= "- Proof of Res:     " . ($newApplication['residenceDocumentName'] ?? 'Not uploaded') . "\n\n";

$adminEmailBody .= "Digital signature has been securely stored on server.\n\n";
$adminEmailBody .= "Please log in to the admin dashboard to review documents and approve this membership.\n\n";
$adminEmailBody .= "Regards,\nCare Beyond Borders Automated Web Server";

$adminEmails = [
    'carebeyo@carebeyondborders.co.za',
    'Egmonmondlane@gmail.com',
    'Jzeekhali@gmail.com'
];

foreach ($adminEmails as $adminEmail) {
    send_email($adminEmail, "[New Application] {$applicationNumber} - " . ($newApplication['fullName'] ?? ''), $adminEmailBody);
    
    $emailLogs[] = [
        'id' => substr(md5(uniqid(rand(), true)), 0, 9),
        'to' => $adminEmail,
        'subject' => "[New Application] {$applicationNumber} - " . ($newApplication['fullName'] ?? ''),
        'body' => $adminEmailBody,
        'sentAt' => date('c'),
        'status' => 'sent'
    ];
}

// 2. Applicant Confirmation Email
$applicantEmailBody = "Dear " . ($newApplication['fullName'] ?? '') . ",\n\n";
$applicantEmailBody .= "Thank you for choosing Care Beyond Borders! We have successfully received your online membership application.\n\n";
$applicantEmailBody .= "YOUR APPLICATION DETAILS:\n";
$applicantEmailBody .= "------------------------------------------------\n";
$applicantEmailBody .= "Application Number:  " . $applicationNumber . "\n";
$applicantEmailBody .= "Selected Plan:       " . $planLabel . "\n";
$applicantEmailBody .= "Monthly Premium:     " . $premium . " per month\n";
$applicantEmailBody .= "Payment Method:      " . ($newApplication['paymentMethod'] ?? 'N/A') . "\n\n";

$applicantEmailBody .= "NEXT STEPS:\n";
$applicantEmailBody .= "------------------------------------------------\n";
$applicantEmailBody .= "1. Our administration team is currently reviewing your uploaded documents (ID/Passport, Passport Photo, Proof of Residence).\n";
$applicantEmailBody .= "2. Once verified, your policy active date will be confirmed, and your welcome packet will be sent to your email.\n";
$applicantEmailBody .= "3. If you selected EFT or Bank Transfer, please use your application number ({$applicationNumber}) as the reference for payments.\n\n";

$applicantEmailBody .= "BANKING DETAILS FOR PREMIUM PAYMENTS:\n";
$applicantEmailBody .= "------------------------------------------------\n";
$applicantEmailBody .= "Bank:                First National Bank (FNB)\n";
$applicantEmailBody .= "Account Holder:      Care Beyond Borders\n";
$applicantEmailBody .= "Account Number:      62910485302 (Demo)\n";
$applicantEmailBody .= "Branch Code:         250655\n";
$applicantEmailBody .= "Reference:           " . $applicationNumber . "\n\n";

$applicantEmailBody .= "For any immediate support or inquiry, please reach out to our team at carebeyo@carebeyondborders.co.za or call us at 071 534 6002 / 067 086 3832.\n\n";
$applicantEmailBody .= "We Care. We Transport. We Respect.\n\n";
$applicantEmailBody .= "Best regards,\n";
$applicantEmailBody .= "Care Beyond Borders Administration\n";
$applicantEmailBody .= "13 Oorbietjie Street, Nimrod Park, Glen Marais, Kempton Park, 1619";

if (!empty($newApplication['emailAddress'])) {
    send_email($newApplication['emailAddress'], "Application Received - Care Beyond Borders ({$applicationNumber})", $applicantEmailBody);
    
    $emailLogs[] = [
        'id' => substr(md5(uniqid(rand(), true)), 0, 9),
        'to' => $newApplication['emailAddress'],
        'subject' => "Application Received - Care Beyond Borders ({$applicationNumber})",
        'body' => $applicantEmailBody,
        'sentAt' => date('c'),
        'status' => 'sent'
    ];
}

writeData('email_logs.json', $emailLogs);

echo json_encode([
    "success" => true,
    "applicationNumber" => $applicationNumber,
    "application" => $newApplication
]);
