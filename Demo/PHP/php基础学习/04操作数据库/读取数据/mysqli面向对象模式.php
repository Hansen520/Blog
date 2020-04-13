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
 
 $sql = "SELECT id, firstname, lastname , email FROM MyGuests";
 $result = $conn->query($sql);
 if($result->num_rows > 0){
     //输出每行数据
     echo "<table width='500px' border='1px' cellspacing='0'>";
     while($row = $result->fetch_assoc()){
        echo "<tr>";
        echo "<td>".$row["id"]."</td>";
        echo "<td>".$row["firstname"]."</td>";
        echo "<td>".$row["lastname"]."</td>";
        echo "<td>".$row["email"]."</td>";
        echo "</tr>";
     }
     echo "</table>";
 }
 
 $conn->close();
 ?>