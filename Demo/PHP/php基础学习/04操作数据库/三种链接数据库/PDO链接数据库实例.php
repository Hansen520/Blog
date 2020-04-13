<!-- 说明：要在php.ini安装好才可以使用 -->
<?php
 $servername = "localhost";
//  数据库服务器
 $username = "root";
//  数据库用户名
 $password = "325600";
//  数据库密码
$dbname = "test";
// 数据库建立的数据库表
$port = 3308;
// 端口号

 try {
     $conn = new PDO("mysql:host=$servername;dename=$dbname;port=$port", $username, $password);
     echo "连接成功"; 
 }
 catch(PDOException $e)
 {
     echo $e->getMessage();
 }
 ?>