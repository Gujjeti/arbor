

<?php
// DB config — replace these with your values
$host = "localhost";
$dbname = "arbordecor";
$username = "arbordecorUser";
$password = "]L6gvnNBGK1X";

// Get and sanitize input
$name = trim($_POST['name'] ?? '');
$name = trim($_POST['mobile'] ?? '');
$email = trim($_POST['email'] ?? '');
$enquiry = trim($_POST['enquiry'] ?? '');
$name = trim($_POST['message'] ?? '');

// Validate input
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($mobile)) {
    $errors[] = "Mobile is required.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid.";
}

if (empty($enquiry)) {
    $errors[] = "Please select an enquiry type.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
}

// Show errors if any
if (!empty($errors)) {
    foreach ($errors as $error) {
        echo "<p style='color:red;'>$error</p>";
    }
    echo "<p><a href='javascript:history.back()'>Go Back</a></p>";
    exit;
}

// Save to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO contact_form (name, mobile, email, enquiry, message) VALUES (?, ?, ?)");
    $stmt->execute([$name, $mobile, $email, $enquiry, $message]);

} catch (PDOException $e) {
    die("<p style='color:red;'>Database error: " . htmlspecialchars($e->getMessage()) . "</p>");
}

// Send email
$to = "gujjeti97@gmail.com";
$subject = "New Enquiry Form Submission";
$body = "Name: " . htmlspecialchars($name) . 
        "\nEmail: " . htmlspecialchars($email) . 
        "\nMobile: " . htmlspecialchars($mobile) . 
        "\nEnquiry Type: " . htmlspecialchars($enquiry) . 
        "\nMessage: " . htmlspecialchars($message);

$headers = "From: noreply@YOURDOMAIN.COM\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "<p style='color:green;'>Thank you! Your enquiry has been sent.</p>";
} else {
    echo "<p style='color:orange;'>Your enquiry was saved, but email failed to send.</p>";
}
?>

