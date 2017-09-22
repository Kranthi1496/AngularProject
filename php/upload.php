 <?php  
 $connect = mysqli_connect("localhost", "root", "password", "fbangular");  
// $data=json_decode(file_get_contents("php://input"));
$id = $_POST['unique'];
 if(!empty($_FILES))  
 {  // $uid=$data->uid;
      $path = '../images/' . $_FILES['file']['name'];  
     
      if(move_uploaded_file($_FILES['file']['tmp_name'], $path))  
      {  
           $insertQuery = "INSERT INTO images(uid,name) VALUES ('$id','".$_FILES['file']['name']."')";  
           if(mysqli_query($connect, $insertQuery))  
           {  
                echo 'Image Uploaded';  
           }  
           else  
           {  
                echo 'Image Uploaded But not Saved';  
           }  
      }  
 }  
 else  
 {  
      echo 'Some Error';  
 }  
 ?> 