<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $username = trim($_GET['username']);//处理下空格操作
        $password = $_GET['password'];
}
$mysqli = new mysqli('localhost', 'root', '325600', 'mynewtest');
$sql = "SELECT password FROM student WHERE username = "."'$username'";
//从$username这里定位只显示密码这一个东西
$result = $mysqli->query($sql);
$rs=$result->fetch_row();
// echo $rs[0];
if(!empty($rs)){
    //虽然只有$rs,但是足可以判断这一整条数据
    $data = array(
        array('code' => 1, 'message' => '用户已存在,请重新注册'),
    );
    echo json_encode($data); //数组转json格式
}else {
    $sql = "INSERT INTO student (username,password) VALUES ('$_GET[username]', '$_GET[password]')";
    $rs = $mysqli->query($sql);
    if (!$rs) {
        $data = array(
            array('code' => 2, 'message' => '注册失败,请重新注册'),
        );
        echo json_encode($data);
    } else {
        $data = array(
            array('code' => 3, 'message' => '注册成功！跳转到登录页面。。。'),
        );
        echo json_encode($data);
    }
}