 <?php require '../config.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM profilepicture";

$result = $conn->query($sql);

$resdata= array();
         
while($row = mysqli_fetch_object($result)) {
             
     array_push($resdata, $row);

      }

echo'{"status": "0k","data":'.json_encode($resdata).'}';

$conn->close();
 ?> 