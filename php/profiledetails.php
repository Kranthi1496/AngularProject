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

$sql = "SELECT name FROM employees where name='$uname'";
/*
if ($conn->query($sql) === TRUE) {
    echo $uname. "is present";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}*/


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
       // echo " Name: " . $row["name"].   "<br>";

        
        	//echo "username and password matched";
            $resdata= array();
            $tsql = "SELECT id,name,email,company FROM employees where name='$uname'";
            $result1 = $conn->query($tsql);
            while($row = mysqli_fetch_object($result1))
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

// echo'{"status": "0k","data":'.json_encode($resdata).'}';

$conn->close();
?>