<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uname=$data->user;

$uemail=$data->email;

$ueducation=$data->education;

$upwd=$data->password;

$epwd=md5($upwd);

//checking username exists or not
$usql = "SELECT name FROM users where name='$uname'";

$uresult = $conn->query($usql);

$esql = "SELECT email FROM users where email='$uemail'";

$eresult = $conn->query($esql);

if($uresult->num_rows > 0) {

	//echo "Name already exists Try another";
  echo'{"status": "FAILN","data":'.json_encode('Name already exists Try another').'}';
}

else if($eresult->num_rows > 0){
    
    //echo "Email already exists Try another";
    echo'{"status": "FAILE","data":'.json_encode('Email already exists Try another').'}';
}

else{

$sql = "INSERT INTO users (name, email, education,password)
VALUES ('$uname',  '$uemail','$ueducation','$epwd')";

         if($conn->query($sql) === TRUE) {

            $resdata= array();
            
            $tsql = "SELECT id,name,email,education FROM users where email='$uemail'";
            
            $result1 = $conn->query($tsql);
            
              while($row = mysqli_fetch_object($result1)) {
                   
                   array_push($resdata, $row);

                  }
             
             echo'{"status": "OK","data":'.json_encode($resdata).'}';
  
            }
          
         else {
     
           echo "Error: " . $sql . "<br>" . $conn->error;
          }
}

$conn->close();
?>