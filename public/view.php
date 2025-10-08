<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php");
    exit();
}
?>

<?php
// DB config — replace with your DB details
$host = "localhost";
$dbname = "arbordecor";
$username = "arbordecorUser";
$password = "]L6gvnNBGK1X";

// Enable error reporting for debug (optional in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM contact_form ORDER BY created_at DESC");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("<p style='color:red;'>Database error: " . htmlspecialchars($e->getMessage()) . "</p>");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Enquiry Submissions</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f4f4f4;
      padding: 20px;
    }
    table {
      width: 90%;
      margin: auto;
      border-collapse: collapse;
      background: #fff;
    }
    th, td {
      padding: 10px 15px;
      border: 1px solid #ccc;
    }
    th {
      background: #eee;
    }
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    h2 {
      text-align: center;
    }
  </style>
</head>
<body>

<h2>All Enquiry Submissions</h2> 
<a href="logout.php">Logout</a>


<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
       <th>Mobile</th>
      <th>Email</th>
      <th>Enquiry</th>
       <th>Message</th>
      <th>Submitted At</th>
    </tr>
  </thead>
  <tbody>
    <?php if (count($rows) > 0): ?>
      <?php foreach ($rows as $row): ?>
      <tr>
        <td><?= htmlspecialchars($row['id']) ?></td>
        <td><?= htmlspecialchars($row['name']) ?></td>
        <td><?= htmlspecialchars($row['mobile']) ?></td>
        <td><?= htmlspecialchars($row['email']) ?></td>
        <td><?= htmlspecialchars($row['enquiry']) ?></td>
        <td><?= htmlspecialchars($row['message']) ?></td>
        <td><?= htmlspecialchars($row['created_at']) ?></td>
      </tr>
      <?php endforeach; ?>
    <?php else: ?>
      <tr>
        <td colspan="5" style="text-align:center;">No records found.</td>
      </tr>
    <?php endif; ?>
  </tbody>
</table>

</body>
</html>

