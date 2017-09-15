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

// $sql = "SELECT name FROM employees ORDER BY RANDOM()
// LIMIT 1";
$sql="select name,company
from employees
ORDER BY rand() LIMIT 5";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
  
            $resdata= array();
     
            while($row = mysqli_fetch_object($result))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
            //echo ;
   

    }
}
else{
    echo "username is incorrect";
} 



$conn->close();
?>