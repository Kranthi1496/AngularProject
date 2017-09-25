<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uname=$data->user;

$resdata= array();
            
$tsql = "SELECT * FROM posts where name='$uname'";
            
$result1 = $conn->query($tsql);
            
while($row = mysqli_fetch_object($result1)) {
             
     array_push($resdata, $row);

     }

echo'{"status": "0k","data":'.json_encode($resdata).'}';

$conn->close();
?>