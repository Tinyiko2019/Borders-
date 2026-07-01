<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$DATA_DIR = dirname(__DIR__) . '/data';

if (!file_exists($DATA_DIR)) {
    mkdir($DATA_DIR, 0755, true);
}

function readData($file) {
    global $DATA_DIR;
    $filePath = $DATA_DIR . '/' . $file;
    if (!file_exists($filePath)) {
        file_put_contents($filePath, json_encode([]));
        return [];
    }
    $content = file_get_contents($filePath);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

function writeData($file, $data) {
    global $DATA_DIR;
    $filePath = $DATA_DIR . '/' . $file;
    file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
}

function send_email($to, $subject, $body) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/plain;charset=UTF-8" . "\r\n";
    $headers .= "From: Care Beyond Borders <noreply@carebeyondborders.co.za>" . "\r\n";
    
    // Attempt to send email using PHP's native mail function
    @mail($to, $subject, $body, $headers);
}
