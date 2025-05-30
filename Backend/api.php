<?php

file_put_contents("debug_input.txt", file_get_contents("php://input"));

header("Content-Type: application/json");

// Allow requests from frontend (React app)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'config.php';
require 'send_mail.php';

// Accept JSON POST data
$input = json_decode(file_get_contents("php://input"), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name and email are required"]);
    exit;
}

// Generate QR code text
$qrText = $email . "|" . time();

// Generate QR code using phpqrcode
require_once 'phpqrcode/qrlib.php';

$qrDir = 'qrcodes/';
if (!is_dir($qrDir)) {
    mkdir($qrDir, 0755, true);
}

$fileName = $qrDir . uniqid('qr_') . '.png';
QRcode::png($qrText, $fileName, QR_ECLEVEL_L, 5);

// Insert into DB
$stmt = $conn->prepare("INSERT INTO users (name, email, qr_code) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $fileName);

if ($stmt->execute()) {
    $mailStatus = sendInvitationEmail($email, $name, $fileName);

    if ($mailStatus === true) {
        echo json_encode(["success" => true, "qr_code" => $fileName]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Email failed: $mailStatus"]);
    }
} else {
    if ($conn->errno == 1062) {
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "Email already registered"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }
}

// header("Access-Control-Allow-Origin: *");   
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json");   

// require "config.php";
// require 'send_mail.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name = $_POST["name"];
//     $email = $_POST["email"];
//     $qrContent = uniqid("guest_", true);
//     $qrFile = "qr/" . $qrContent . ".png";


//     require_once "phpqrcode/qrlib.php";
//     QRcode::png($qrContent, $qrFile, QR_ECLEVEL_H, 10); // Generate QR code

//     $stmt = $conn->prepare("INSERT INTO users(namr.email, qr) VALUES (?, ?, ?)"); 
//     $stmt->bind_param("sss", $name, $email, $qrContent);
//     $stmt->execute();


//     $emailStatus = sendMail($email, $name, $qrFile);

//     if($emailStatus){
//         echo json_encode($email, $name, $qrFile);
//     } else {
//         echo json_encode(["status" => "error", "mesaage" => "Email Failed"]);

//     }

//     $stmt->close();
//     $conn->close();
// } elseif($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["qr"])) {
//     $qr = $_GET["qr"];
//     $stmt =$conn->prepare("SELECT name FROM users WHERE qr = ?");
//     $stmt->bind_param("s", $qr);
//     $stmt->execute();
//     $stmt->store_result();

//     if($stmt->num_rows >0){
//         $stmt->bind_result($name);
//         $stmt->fetch();
//         echo json_encode(["status" => "success", "message" => "Welcome $name"]);
//     } else {
//         echo json_encode(["status" => "error", "message" => "Invalid QR code"]);

//     }

//     $stmt->close();
//     $conn->close();

// }


?>