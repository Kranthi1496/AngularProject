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
//$upwd=$data->password;
//$epwd=md5($upwd);
$sql = "SELECT name FROM profiletable where name='$uname'";
/*
if ($conn->query($sql) === TRUE) {
    echo $uname. "is present";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}*/


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
   echo "username exists";
}
else{
    echo "username is incorrect";
} 

// echo'{"status": "0k","data":'.json_encode($resdata).'}';

$conn->close();
?>