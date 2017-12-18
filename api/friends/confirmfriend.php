<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$fid=$data->fid;

$status=$data->status;
$notification=$data->notification;
 // $uid=$_GET['uid'];
 // $fid= $_GET['fid'];
 //  $status= $_GET['status'];
 //   $notification= $_GET['notification'];
$sql = "UPDATE friends SET status = '$status', notification='$notification' WHERE uid='$uid' && fid='$fid'";

$result = $conn->query($sql);

 echo '{"status": "OK"}';

$conn->close();
?>