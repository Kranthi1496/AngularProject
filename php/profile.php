<?php
$database = include('config.php');
$conn = new mysqli($database['servername'], $database['username'], $database['password'], $database['dbname']);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));

$sname=$data->school;
$cname=$data->college;
$address=$data->address;
$we=$data->workexperience;
$uname=$data->user;
//$epwd=md5($upwd);

//checking username exists or not
$sql = "SELECT name FROM profiletable where name='$uname'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

	echo "Username already exists Try another";
}
///
else{
$sql = "INSERT INTO profiletable (school,college,address,workexperience,name)
VALUES ('$sname',  '$cname','$address','$we','$uname')";

if ($conn->query($sql) === TRUE) {
    echo $uname. " record created successfully";
  
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
}
$conn->close();
?>