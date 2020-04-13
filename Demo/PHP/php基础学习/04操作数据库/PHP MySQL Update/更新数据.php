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

$sql = "update myguests set lastname='奥特曼' where firstname='John'";
$result = $con->query($sql);
$con->close();