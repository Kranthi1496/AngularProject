 <?php  
 $connect = mysqli_connect("localhost", "root", "password", "fbangular");  
 //$output = '';  
// $query = "SELECT * FROM tbl_images ORDER BY id DESC";  
// $result = mysqli_query($connect, $query);  
//  while($row = mysqli_fetch_array($result))  
//  {  
//       $output[] = $row;  
//  }  
//  echo json_encode($output);  
 //
 $sql = "SELECT * FROM images";



$result = $connect->query($sql);


            $resdata= array();
         
            while($row = mysqli_fetch_object($result))
             {

             array_push($resdata, $row);

                }


     
                echo'{"status": "0k","data":'.json_encode($resdata).'}';
 //
 ?> 