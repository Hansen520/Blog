<?php
$hostname = "localhost";
$username = "root";
$password = "325600";
$dbname = "t1";

$con = new mysqli($hostname,$username,$password,$dbname);
if($con->connect_error){
    echo "链接错误".$con->connect_error;
}else{
    echo "链接成功";
}
// $sql = "select * from tb5 order by age desc";
//默认是升序(从小到大)，而写了desc是降序(从大到小)
$sql = "select * from tb5 order by age desc limit 5"; 
//让数据降序并只显示5条
$result = $con->query($sql);
while($row = $result->fetch_assoc()){
    echo "<br>";
    echo $row['id'].'--'.$row['username'].'--'.$row['age'];
}
?>