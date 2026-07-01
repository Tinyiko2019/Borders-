<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'PATCH' && $method !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing application ID"]);
    exit();
}

$input = file_get_contents("php://input");
$body = json_decode($input, true);
$status = $body['status'] ?? null;

if (!$status || !in_array($status, ['Pending', 'Approved', 'Declined'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid or missing status"]);
    exit();
}

$applications = readData('applications.json');
$index = -1;
foreach ($applications as $i => $app) {
    if ($app['id'] === $id) {
        $index = $i;
        break;
    }
}

if ($index === -1) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Application not found"]);
    exit();
}

$applications[$index]['status'] = $status;
writeData('applications.json', $applications);

echo json_encode(["success" => true, "application" => $applications[$index]]);
