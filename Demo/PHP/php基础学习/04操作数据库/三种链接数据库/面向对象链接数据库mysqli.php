<?php
 $servername = "localhost";
// 数据库服务器
 $username = "root";
//数据库名称，一般为root
 $password = "325600";
//数据库密码
 // 创建连接
 $conn = new mysqli($servername, $username, $password);
 
 // 检测连接
 if ($conn->connect_error) {
     die("连接失败: " . $conn->connect_error);
 } 
 echo "连接成功";
 ?>