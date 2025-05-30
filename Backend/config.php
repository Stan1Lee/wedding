<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbnmae = "event_app";

$conn = new mysqli($host, $user, $pass, $dbnmae);
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}
?>