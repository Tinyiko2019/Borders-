<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

$input = file_get_contents("php://input");
$message = json_decode($input, true);

if (!$message) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

$messages = readData('messages.json');

$newMessage = $message;
$newMessage['id'] = substr(md5(uniqid(rand(), true)), 0, 9);
$newMessage['dateSubmitted'] = date('c');

array_unshift($messages, $newMessage);
writeData('messages.json', $messages);

// Send Email Notifications
$adminEmails = [
    'carebeyo@carebeyondborders.co.za',
    'Egmonmondlane@gmail.com',
    'Jzeekhali@gmail.com'
];

$emailBody = "Dear Care Beyond Borders Team,\n\n";
$emailBody .= "A new message has been submitted via the Contact Form.\n\n";
$emailBody .= "Name: " . ($newMessage['name'] ?? 'N/A') . "\n";
$emailBody .= "Email: " . ($newMessage['email'] ?? 'N/A') . "\n";
$emailBody .= "Phone: " . ($newMessage['phone'] ?? 'N/A') . "\n";
$emailBody .= "Subject: " . ($newMessage['subject'] ?? 'N/A') . "\n\n";
$emailBody .= "Message:\n" . ($newMessage['message'] ?? '') . "\n\n";
$emailBody .= "Regards,\nCare Beyond Borders Automation";

foreach ($adminEmails as $adminEmail) {
    send_email($adminEmail, "New Contact Message: " . ($newMessage['subject'] ?? 'Inquiry'), $emailBody);
}

echo json_encode(["success" => true, "message" => $newMessage]);
