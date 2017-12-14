<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$fid=$data->uid;

$uid=$data->fid;

$status=$data->status;
$notification=$data->notification;
$sql = "UPDATE friends SET status = '$status', notification='$notification' WHERE uid='$uid' && fid='$fid'";

$result = $conn->query($sql);

echo "success";

$conn->close();
?>