<?php
$hostname = "localhost";
$username = "root";
$password = "325600";
$dbname = "mynewtest";

$con = new mysqli($hostname,$username,$password,$dbname);
if($con->connect_error){
    echo "链接错误".$con->connect_error;
}else{
    echo "链接成功";
}
$sql = "delete from myguests where firstname='雷欧'";
$result = $con->query($sql);
$con->close();