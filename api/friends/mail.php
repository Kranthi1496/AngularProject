<?php
$data=json_decode(file_get_contents("php://input"));

$uid=$data->uid;

$fid=$data->fid;

$status=$data->status;
$notification=$data->notification;
$name=$data->uname;
$to = "kranthik@apostek.com";
$subject = "test";
$message  = '<html><body>';
$message .='<h1>'.$name.' sent friend request</h1>';
$message .='<a href="http://localhost:8080/fbangular/#/confirm/'.$name.'/'.$uid.'/'.$fid.'" >Confirm friend</a>';

$message .='</body></html>';



$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: <kranthikumarapostek@gmail.com>' . "\r\n";
mail($to,$subject,$message,$headers);
?>