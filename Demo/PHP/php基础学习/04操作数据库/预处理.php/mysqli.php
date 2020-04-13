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
 
 //预处理及绑定
 $stmt = $conn->prepare("INSERT INTO MyGuests (firstname, lastname, email) VALUES(?, ?, ?)");
 //？？？代表留了位置，以便后期灵活处理
 $stmt->bind_param("sss",$firstname,$lastname,$email);
 //sss,代表三个都是字符串类型，i代表整型，d代表浮点型，b代表二进制大对象
 
 $firstname = "爱迪";
 $lastname = "奥特曼";
 $email = "aidi@qq.com";
 $stmt->execute();

 $firstname = "泰罗";
 $lastname = "奥特曼";
 $email = "tailuo@qq.com";
 $stmt->execute();

 echo "插入成功";
 $stmt->close();
 $conn->close();
 ?>