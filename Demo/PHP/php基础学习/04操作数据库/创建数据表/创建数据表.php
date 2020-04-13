<?php
 $servername = "localhost";
 $username = "root";
 $password = "325600";
 $dbname = "mynewtest";
 
 // 创建连接
 $conn = mysqli_connect($servername, $username, $password, $dbname);
 // 检测连接
 if (!$conn) {
 die("连接失败: " . mysqli_connect_error());
 }
 
 // 使用 sql 创建数据表
 $sql = "CREATE TABLE MyGuests (
 id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
 firstname VARCHAR(30) NOT NULL,
 lastname VARCHAR(30) NOT NULL,
 email VARCHAR(50),
 reg_date TIMESTAMP
 )";
 
 if (mysqli_query($conn, $sql)) {
 echo "数据表 MyGuests 创建成功";
 } else {
 echo "创建数据表错误: " . mysqli_error($conn);
 }
 
 mysqli_close($conn);
 ?>