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

 //创建数据库
 $sql = "create database mynewtest";
 if($conn->query($sql) === TRUE){
     echo "数据库创建成功";
 }else{
     echo "error:".$conn->error;
 }
 $conn->close();
 ?>