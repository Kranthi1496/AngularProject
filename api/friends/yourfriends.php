<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$sql = "SELECT * FROM friends where (uid='$uid'  or fid='$uid') && status='YES'";

$result = $conn->query($sql);

$resdata= array();
         
while($row = mysqli_fetch_object($result)) {
             
      array_push($resdata, $row);

      }


$nsql = "SELECT * FROM friends where (uid='$uid'  or fid='$uid') && status='NO'";

$nresult = $conn->query($nsql);

$resdata1= array();
         
while($row = mysqli_fetch_object($nresult)) {
             
      array_push($resdata1, $row);

      }        

echo'{"status": "0k","data":'.json_encode($resdata).',"pending":'.json_encode($resdata1).'}';
  
$conn->close();
?>