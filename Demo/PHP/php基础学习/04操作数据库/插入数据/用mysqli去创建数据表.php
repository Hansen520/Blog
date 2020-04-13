<?php
 $servername = "localhost";
 $username = "root";
 $password = "325600";
 $dbname = "mynewtest";
 
 // 创建连接
 $conn = new mysqli($servername, $username, $password, $dbname);
 // 检测连接
 if ($conn->connect_error) {
     die("连接失败: " . $conn->connect_error);
 }
	// myguests为表名 
    $sql = "insert into myguests(firstname,lastname,email) values ('雷欧','奥特曼','787@qq.com')";
    if($conn->query($sql)){
        echo "success";
    }else{
        echo "Error:".$conn->error;
    }
 
 $conn->close();
 ?>