<?php
header("Content-type:text/html;charset=utf-8");    //设置编码
$servername = "localhost";
$username = "root";
$password = "325600";
$dbname = "t1";
$con=new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($con->connect_error) {
    die("连接失败: " . $con->connect_error);
}else{
    echo "链接成功";
}

$sql = "select * from tb5 where age <= 20";
// 这是面向对象的写法，如果是面向过程，则采用
// $result = mysqli_query($con,"SELECT * FROM MyGuests
// WHERE FirstName='Mary'");
$result = $con->query($sql);
while($row = $result->fetch_assoc()){
    echo "<br>";
    echo $row['id'].'--'.$row['username'].'--'.$row['age'];
    
}
?>