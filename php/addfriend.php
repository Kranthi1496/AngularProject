<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "apostek";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));
$uname1=$data->user1;
$uname2=$data->user2;


$sql = "INSERT INTO friends (user1,user2)
VALUES ('$uname1',  '$uname2')";

$result = $conn->query($sql);

$tsql = "INSERT INTO friends (user1,user2)
VALUES (  '$uname2','$uname1')";

$result1 = $conn->query($tsql);

echo "success";



$conn->close();
?>