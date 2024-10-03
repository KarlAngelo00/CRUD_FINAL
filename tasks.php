<?php
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = "AnoKaSiniswerte0107"; // replace with your MySQL password
$dbname = "tasks_storage"; // replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle different CRUD operations
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'create':
        $title = $_POST['title'];
        $description = $_POST['description'];
        $sql = "INSERT INTO tasks (title, description) VALUES ('$title', '$description')";
        $conn->query($sql);
        break;

    case 'read':
        $sql = "SELECT * FROM tasks";
        $result = $conn->query($sql);
        $tasks = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($tasks);
        break;

    case 'update':
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $status = $_POST['status'];
        $sql = "UPDATE tasks SET title='$title', description='$description', status='$status' WHERE id=$id";
        $conn->query($sql);
        break;

    case 'delete':
        $id = $_POST['id'];
        $sql = "DELETE FROM tasks WHERE id=$id";
        $conn->query($sql);
        break;

    default:
        // Invalid action
        break;
}

$conn->close();
?>
