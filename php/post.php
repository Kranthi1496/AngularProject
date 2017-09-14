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
$upost=$data->post;


$sql = "INSERT INTO posts (name,post)
VALUES ('$uname',  '$upost')";

if ($conn->query($sql) === TRUE) {
    //echo $uname. " record created successfully";
     $resdata= array();
            $tsql = "SELECT name,post FROM posts where name='$uname'";
            $result1 = $conn->query($tsql);
            while($row = mysqli_fetch_object($result1))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
  
}
 else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}




// echo'{"status": "0k","data":'.json_encode($resdata).'}';

$conn->close();
?>