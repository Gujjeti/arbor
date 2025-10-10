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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Enquiry Submissions</title>

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- DataTables CSS -->
  <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/buttons/3.0.2/css/buttons.bootstrap5.min.css">

  <style>
    body {
      background-color: #f8f9fa;
      font-family: 'Inter', sans-serif;
    }

    .card {
      border: none;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .btn-export {
      background-color: #198754;
      color: white;
    }

    .btn-export:hover {
      background-color: #157347;
      color: #fff;
    }

    table.dataTable thead th {
      background-color: #0d6efd;
      color: white;
    }
    
    th, .dt-column-title{
        color:#000;
    }
  </style>
</head>
<body>





  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-semibold">All Enquiry Submissions</h2>
      <a href="logout.php" class="btn btn-danger">Logout</a>
    </div>

    <div class="card p-4">
      <div class="table-responsive">
        <table id="enquiryTable" class="table table-striped table-bordered align-middle" style="width:100%">
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
  </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <!-- DataTables JS -->
  <script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>

  <!-- DataTables Buttons -->
  <script src="https://cdn.datatables.net/buttons/3.0.2/js/dataTables.buttons.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.bootstrap5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
  <script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.html5.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.print.min.js"></script>

  <script>
    $(document).ready(function() {
      $('#enquiryTable').DataTable({
        dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
        buttons: [
          { extend: 'excel', className: 'btn btn-success btn-sm me-2', text: 'Export Excel' },
          { extend: 'csv', className: 'btn btn-success btn-sm me-2', text: 'Export CSV' },
          { extend: 'pdf', className: 'btn btn-success btn-sm me-2', text: 'Export PDF' },
          { extend: 'print', className: 'btn btn-success btn-sm', text: 'Print' }
        ],
        pageLength: 10,
        order: [[0, 'desc']]
      });
    });
  </script>
</body>
</html>

