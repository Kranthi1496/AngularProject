<?php
$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$fid=$data->fid;

$status=$data->status;
$notification=$data->notification;
$to = "kranthik@apostek.com";
$subject = "test";
$message = '<html><head>';


$message .='<title>HTML email</title>';
$message .='</head><body>';
$message .='<a href="http://localhost:8080/fbangular/api/friends/confirmfriend.php?uid='.$uid.'&fid='.$fid.'&status='.$status.'&notification='.$notification.'" >confirm friend</a>';

$message .='</body></html>';


// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
//$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers .= 'From: <kranthikumarapostek@gmail.com>' . "\r\n";
mail($to,$subject,$message,$headers);
?>