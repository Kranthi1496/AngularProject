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
$uemail=$data->email;
$ucompany=$data->company;
$upwd=$data->password;
$epwd=md5($upwd);

//checking username exists or not
$sql = "SELECT name FROM employees where name='$uname'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

	echo "Username already exists Try another";
}
///
else{
$sql = "INSERT INTO employees (name, email, company,password)
VALUES ('$uname',  '$uemail','$ucompany','$epwd')";

if ($conn->query($sql) === TRUE) {
    //echo $uname. " record created successfully";
     $resdata= array();
            $tsql = "SELECT id,name,email,company FROM employees where name='$uname'";
            $result1 = $conn->query($tsql);
            while($row = mysqli_fetch_object($result1))
             {

             array_push($resdata, $row);

                }
             echo'{"status": "0k","data":'.json_encode($resdata).'}';
  
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
}
$conn->close();
?>