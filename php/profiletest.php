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
$uname=$data->user;

$sql = "SELECT name FROM profiletable where name='$uname'";



$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
   echo "username exists";
}
else{
    echo "username is incorrect";
} 



$conn->close();
?>