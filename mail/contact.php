<?php
// Check if all required fields are filled and email is valid
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    // Set HTTP response code to indicate a bad request
    http_response_code(400);

    // Output the error message
    echo "All fields are required and email address must be valid.";
    exit();
}

// Sanitize input data to prevent XSS attacks
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$m_subject = htmlspecialchars($_POST['subject']);
$message = htmlspecialchars($_POST['message']);

// Set recipient email address (change this to your own email)
$to = "cyberkeysolutions082@gmail.com"; // Change this email to your own

// Email subject
$subject = "$m_subject: $name";

// Email body
$body = "You have received a new message from your website contact form.\n\n"
      . "Here are the details:\n\n"
      . "Name: $name\n\n"
      . "Email: $email\n\n"
      . "Subject: $m_subject\n\n"
      . "Message:\n$message";

// Additional headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send email
if(mail($to, $subject, $body, $headers)) {
    // Set HTTP response code to indicate success
    http_response_code(200);

    // Output success message
    echo "Thank you! Your message has been sent.";
} else {
    // Set HTTP response code to indicate server error
    http_response_code(500);

    // Output error message
    echo "Oops! Something went wrong and we couldn't send your message.";
}
?>
