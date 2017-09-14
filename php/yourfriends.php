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
$user1=$data->user1;
//$user1='Kranthi';
$sql = "SELECT * FROM friends where user1='$user1'";



$result = $conn->query($sql);


            $resdata= array();
         
            while($row = mysqli_fetch_object($result))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
  

$conn->close();
?>