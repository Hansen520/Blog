<?php
    // $data = array(
    //     array('code' => 1, 'message' => '用户已存在,请重新注册'),
    //     //这个是关联数组的用法
    // );
    // // echo $data[0]['code'];
    // echo json_encode($data); //数组转json格式


        // $mysqli = new mysqli('localhost', 'root', '325600', 'mynewtest');
        // $sql = "SELECT password FROM student WHERE username";
        // $result = $mysqli->query($sql);
        // $rs=$result->fetch_row();
        // echo $rs[0];
        header('Content-type:text/html;charset=utf-8');
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            $username = trim($_GET['username']);//从前端获得usename
            $password = $_GET['password'];//从前端获得密码
        }
        $con = new mysqli('localhost', 'root', '325600', 'mynewtest');
        $sql = "SELECT password FROM student WHERE username = "."'$username'";
        $result = $con->query($sql);
        print_r($result);
?>