 <?php require '../config.php';

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$id = $_POST['unique'];
$pictype = $_POST['type'];

if(!empty($_FILES)) {  
 
      $path = '../../uploads/' . $_FILES['file']['name'];  
     /*The move_uploaded_file() function moves an uploaded file to a new location.
       $_FILES['file']['tmp_name'] − the uploaded file in the temporary directory on the web server.
       $_FILES['file']['name'] − the actual name of the uploaded file.
     */
       if($pictype=='COVER'){
       $updatequeryc="UPDATE profilepicture SET pic_type='PROFILE' WHERE pic_type='COVER' AND uid='$id'";
       $resultc = $conn->query($updatequeryc);
     }
     if($pictype=='PRIMARY'){
      $updatequeryp="UPDATE profilepicture SET pic_type='PROFILE' WHERE pic_type='PRIMARY' AND uid='$id'";
      $resultp = $conn->query($updatequeryp);
    }
      


      if(move_uploaded_file($_FILES['file']['tmp_name'], $path))  
      {  
           $insertQuery = "INSERT INTO profilepicture(uid,name,pic_type) VALUES ('$id','".$_FILES['file']['name']."','$pictype')";  
           if(mysqli_query($conn, $insertQuery))  
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
 
$conn->close();
 ?> 