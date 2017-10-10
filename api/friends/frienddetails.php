<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$sql = "SELECT * FROM users where id='$uid'";

$result = $conn->query($sql);

$resdata= array();
         
while($row = mysqli_fetch_object($result)) {
             
      array_push($resdata, $row);

      }

echo'{"status": "0k","data":'.json_encode($resdata).'}';
  
$conn->close();
?>