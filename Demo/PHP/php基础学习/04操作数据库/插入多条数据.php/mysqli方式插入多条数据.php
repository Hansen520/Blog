<?php
 $servername = "localhost";
 $username = "root";
 $password = "325600";
 $dbname = "mynewtest";
 
 // 创建链接
 $conn = new mysqli($servername, $username, $password, $dbname);
 // 检查链接
 if ($conn->connect_error) {
     die("连接失败: " . $conn->connect_error);
 } 
 
 $sql = "INSERT INTO MyGuests (firstname, lastname, email)
 VALUES ('John', 'Doe', 'john@example.com');";
 $sql .= "INSERT INTO MyGuests (firstname, lastname, email)
 VALUES ('Mary', 'Moe', 'mary@example.com');";
 $sql .= "INSERT INTO MyGuests (firstname, lastname, email)
 VALUES ('Julie', 'Dooley', 'julie@example.com')";
 
 if($conn->multi_query($sql) === TRUE){
     echo "success";

 }else{
     echo $conn->error;
 }

 
 $conn->close();
 ?>