<?php
$database = include('config.php');
$conn = new mysqli($database['servername'], $database['username'], $database['password'], $database['dbname']);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));
//echo $data->uid;
$uid=$data->uid;
//$user1='Kranthi';
$sql = "SELECT * FROM friends where uid='$uid'  or fid='$uid'";



$result = $conn->query($sql);


            $resdata= array();
         
            while($row = mysqli_fetch_object($result))
             {

             array_push($resdata, $row);

                }


     
                echo'{"status": "0k","data":'.json_encode($resdata).'}';
  

$conn->close();
?>