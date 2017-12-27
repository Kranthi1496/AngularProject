<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$data=json_decode(file_get_contents("php://input"));
$valueToSearch=$data->search;

if($valueToSearch!=''){
  //posts search
$psql="SELECT * from posts WHERE CONCAT(`pid`, `uid`, `name`, `post`) LIKE '%".$valueToSearch."%'";


$result = $conn->query($psql);
$resdata= array();

    
     
      while($row = mysqli_fetch_object($result))  {
          
        array_push($resdata, $row);

      }
      

  //users search
   $usql="SELECT * from users WHERE CONCAT(`id`,`name`,`email`,`education`) LIKE '%".$valueToSearch."%'";

   $result1=$conn->query($usql);
      $resdata1= array();

       while($row = mysqli_fetch_object($result1))  {
          
        array_push($resdata1, $row);

      }

  //profilepicture search
      $profilesql="SELECT * from profilepicture WHERE CONCAT(`picid`, `uid`, `name`, `pic_type`) LIKE '%".$valueToSearch."%'";
      $result2=$conn->query($profilesql);
      $resdata2= array();

       while($row = mysqli_fetch_object($result2))  {
          
        array_push($resdata2, $row);

      }

       echo'{"status": "ok","data1":'.json_encode($resdata).',"data2":'.json_encode($resdata1).',"data3":'.json_encode($resdata2).'}';
     }
  //}
$conn->close();
?>