<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uemail=$data->email;

$upwd=$data->password;

$epwd=md5($upwd);

$sql = "SELECT email,password FROM users where email='$uemail'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {


        if($row["password"]==$epwd){
  
            $resdata= array();
            
            $tsql = "SELECT * FROM users where email='$uemail'";
            
            $result1 = $conn->query($tsql);
            
            while($row = mysqli_fetch_object($result1)) {
            
                 array_push($resdata, $row);

                }
             echo'{"status": "OK","data":'.json_encode($resdata).'}';
            //echo ;
        }
        else {
          echo "email-and-password-not-matched";
        }

     }
}

else {
    echo "User-not-exists";
} 

$conn->close();
?>