<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$pid=$data->pid;

$type=$data->type;

$test="select * from likes where uid='$uid' and pid='$pid'";
$result = $conn->query($test);
if($result->num_rows > 0) {

$removerecord="delete from likes where uid='$uid' and pid='$pid'";	
$deleteresult = $conn->query($removerecord);
echo "failed";
}
else{
$sql = "INSERT INTO likes (uid,pid,type) VALUES ('$uid',  '$pid', '$type')";
	$result1 = $conn->query($sql);
echo "success";
}


$conn->close();
?>