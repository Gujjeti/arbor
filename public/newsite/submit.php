<?php
// DB config — replace these with your values
$host = "localhost";
$dbname = "arbordecor";
$username = "arbordecorUser";
$password = "]L6gvnNBGK1X";

header("Content-Type: text/html; charset=utf-8");

// Get and sanitize input
$name = trim($_POST['name'] ?? '');
$mobile = trim($_POST['mobile'] ?? '');
$email = trim($_POST['email'] ?? '');
$enquiry = trim($_POST['enquiry'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate input
$errors = [];

if (empty($name)) $errors[] = "Name is required.";
if (empty($mobile)) $errors[] = "Mobile is required.";
if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid.";
}
if (empty($enquiry)) $errors[] = "Please select an enquiry type.";
if (empty($message)) $errors[] = "Message is required.";

// Show errors if any
if (!empty($errors)) {
    echo "<div style='color:red;'>";
    foreach ($errors as $error) {
        echo "<p>$error</p>";
    }
    echo "</div>";
    exit;
}

// Save to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        INSERT INTO contact_form (name, mobile, email, enquiry, message, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$name, $mobile, $email, $enquiry, $message]);
} catch (PDOException $e) {
    die("<p style='color:red;'>Database error: " . htmlspecialchars($e->getMessage()) . "</p>");
}

// Send email
$to = "arbordecormumbai@gmail.com, info@arbordecor.in, gujjeti97@gmail.com";
$subject = "New Enquiry Form Submission - Arbordecor.in";

// HTML formatted email body
$body = "
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    table { border-collapse: collapse; width: 100%; max-width: 600px; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background-color: #f4f4f4; width: 30%; }
    p { margin: 0; }
  </style>
</head>
<body>
  <h2>New Enquiry Received</h2>
  <p>You have received a new enquiry from your website form:</p>

  <table>
    <tr>
      <th>Name</th>
      <td>" . nl2br(htmlspecialchars($name)) . "</td>
    </tr>
    <tr>
      <th>Mobile</th>
      <td>" . nl2br(htmlspecialchars($mobile)) . "</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>" . nl2br(htmlspecialchars($email)) . "</td>
    </tr>
    <tr>
      <th>Enquiry Type</th>
      <td>" . nl2br(htmlspecialchars($enquiry)) . "</td>
    </tr>
    <tr>
      <th>Message</th>
      <td>" . nl2br(htmlspecialchars($message)) . "</td>
    </tr>
  </table>

  <br>
  <p style='font-size: 12px; color: #888;'>This message was automatically sent from the Arbordecor website form.</p>
</body>
</html>
";

// Email headers (for HTML)
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@arbordecor.in\r\n";
$headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "<p style='color:green;'>✅ Thank you! Your enquiry has been sent successfully.</p>";
} else {
    echo "<p style='color:orange;'>Your enquiry was saved, but email failed to send.</p>";
}
?>
