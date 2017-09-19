<?php
$database = include('config.php');
$conn = new mysqli($database['servername'], $database['username'], $database['password'], $database['dbname']);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql="select *
from users
ORDER BY rand() LIMIT 5";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
   
  
            $resdata= array();
     
            while($row = mysqli_fetch_object($result))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
          
   

    
}




$conn->close();
?>