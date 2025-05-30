<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer/PHPMailer.php';
require 'PHPMailer/PHPMailer/SMTP.php';
require 'PHPMailer/PHPMailer/Exception.php';

function sendMail($to, $name, $qrPath){
    $mail= new PHPMailer(true);
    // Set up the mailer
    try{
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'okoriestanleychiedozie@gmail.com';
        $mail->Password = 'uyke orfa hsad ogxc';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        $mail->setFrom('nwodojeni88@gmail.com', 'wedding Team');
        $mail->addAddress($to, $name); // Add a recipient
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject ='YOU ARE INVITED';
        $mail->Body = "Hello $name, <br>Here is your QR code. Show this at the event for check-in.";
        $mail->addAttachment($qrPath); // Attach the QR code image
        return $mail-send();// Send the email
    }catch (Exception $e){
        return "Mailer Error". $mail->ErrorInfo; // Return false if sending fails
    }
}
?>