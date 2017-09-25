<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uname=$data->user;

$sql = "SELECT name FROM profiletable where name='$uname'";

$result = $conn->query($sql);

if($result->num_rows > 0) {

   echo "username exists";
}
else {
    
   echo "username is incorrect";
} 

$conn->close();
?>