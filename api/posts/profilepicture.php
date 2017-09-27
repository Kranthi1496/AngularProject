 <?php require '../config.php';

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$id = $_POST['unique'];

if(!empty($_FILES)) {  
 
      $path = '../../images/' . $_FILES['file']['name'];  
     /*The move_uploaded_file() function moves an uploaded file to a new location.
       $_FILES['file']['tmp_name'] − the uploaded file in the temporary directory on the web server.
       $_FILES['file']['name'] − the actual name of the uploaded file.
     */
      if(move_uploaded_file($_FILES['file']['tmp_name'], $path))  
      {  
           $insertQuery = "INSERT INTO profilepicture(uid,name) VALUES ('$id','".$_FILES['file']['name']."')";  
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