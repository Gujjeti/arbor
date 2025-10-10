<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Replace with your actual admin credentials
    $valid_username = "admin";
    $valid_password = "secret123";

    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['logged_in'] = true;
        header("Location: view.php");
        exit();
    } else {
        $error = "Invalid credentials";
    }
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
  <body>
      
      
    <section class="d-flex justify-content-center align-items-center" style="height:100vh">
         <div class="container">
         <div class="row justify-content-center align-items-center ">
             <div class="col-md-6">
                 
                 <!-- Logo -->
                    <div class="text-center">
                          <img src="images/logo.svg" alt="Logo" style="max-width:100px; margin-bottom:20px;">
                    </div>
        
                  <form class="max-w-sm mx-auto" method="post">
  <div class="mb-3">
    <label for="username" class="form-label">User Name</label>
    <input type="text" name="username" placeholder="Username" required class="form-control">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name="password" placeholder="Password" required class="form-control">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>



             </div>
         </div>
     </div>
    </section>
      




  </body>
</html>










