<?php
$database = include('config.php');
$conn = new mysqli($database['servername'], $database['username'], $database['password'], $database['dbname']);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));
$uemail=$data->email;

$sql = "SELECT name FROM users where email='$uemail'";


$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
 
            $resdata= array();
            $tsql = "SELECT * FROM users where email='$uemail'";
            $result1 = $conn->query($tsql);
            while($row = mysqli_fetch_object($result1))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
           
   
       }

    
}
else{
    echo "email is incorrect";
} 



$conn->close();
?>