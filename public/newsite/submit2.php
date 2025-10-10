<?php
// Database configuration
$host = "localhost";
$dbname = "arbordecor";
$username = "arbordecorUser";
$password = "]L6gvnNBGK1X";

header("Content-Type: text/html; charset=utf-8");

// Sanitize input
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$enquiry = trim($_POST['enquiry'] ?? '');

// Validate input
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid.";
}

if (empty($enquiry) || $enquiry === 'Select Enquiry') {
    $errors[] = "Please select an enquiry type.";
}

// Show errors if any
if (!empty($errors)) {
    echo "<div style='color:red;'>";
    foreach ($errors as $error) {
        echo "<p>$error</p>";
    }
    echo "</div>";
    exit;
}

// Save to database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO contact_form (name, email, enquiry, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $enquiry]);
} catch (PDOException $e) {
    echo "<p style='color:red;'>Database error: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}

// Email details
$to = "arbordecormumbai@gmail.com, info@arbordecor.in, gujjeti97@gmail.com";
$subject = "New Enquiry Form Submission - Arbordecor.in";

// HTML table email body
$body = "
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    table { border-collapse: collapse; width: 100%; max-width: 500px; margin-top: 10px; }
    td, th { border: 1px solid #ddd; padding: 10px; }
    th { background-color: #f4f4f4; text-align: left; }
  </style>
</head>
<body>
  <h2>New Enquiry Received</h2>
  <p>You have received a new enquiry from your website.</p>
  <table>
    <tr>
      <th>Name</th>
      <td>" . htmlspecialchars($name) . "</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>" . htmlspecialchars($email) . "</td>
    </tr>
    <tr>
      <th>Enquiry Type</th>
      <td>" . htmlspecialchars($enquiry) . "</td>
    </tr>
  </table>
  <br>
  <p style='font-size: 12px; color: #888;'>This message was automatically sent from the Arbordecor website form.</p>
</body>
</html>
";

// Email headers (HTML)
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@arbordecor.in\r\n";
$headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "<p style='color:green;'>✅ Thank you! Your enquiry has been sent successfully.</p>";
} else {
    echo "<p style='color:orange;'>Your enquiry was saved, but the email could not be sent.</p>";
}
?>
