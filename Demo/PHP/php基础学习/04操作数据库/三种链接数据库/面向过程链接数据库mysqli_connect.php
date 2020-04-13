<?php
 $servername = "localhost";
 $username = "root";
 $password = "325600";
 
 // 创建连接
 $conn = mysqli_connect($servername, $username, $password);
 
 // 检测连接
 if (!$conn) {
     die("Connection failed: " . mysqli_connect_error());
 }
 echo "连接成功";
 ?>