<?php

header('Content-type:text/html;charset=utf-8');
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(empty($_POST['username'])){
        echo "<script>alert('用户名不能为空!');location='login.html'</script>";
    }else{
        $username = trim($_POST['username']);
    }
    if(empty($_POST['password'])){
        echo "<script>alert('密码不能为空!');location='login.html'</script>";
    }else{
        $password = trim($_POST['password']);
    }
    if(empty($_POST['repassword'])){
        echo "<script>alert('确认密码不能为空!');location='login.html'</script>";
    }else{
        $repassword = trim($_POST['repassword']);
    }
    if($password != $repassword){
        echo "<script>alert('两次输入密码不一致，请重新输入！');location='login.html'</script>";
    }
}

$con = new mysqli('localhost','root','325600','mynewtest');
$sql = "SELECT * from student Where username='".$username."'";
$result = $con->query($sql);
$res = $result->fetch_row();
if(!empty($res)){
    echo "<script>alert('用户已经存在！');location='login.html'</script>";
}else{
    $sql = "INSERT INTO student (username,password) VALUES ('$username','$password')";
    $res = $con->query($sql);
}
if (!$res) {
    echo "<script>alert('注册失败！');location.href='login.html';</script>";
} else {
    echo "<script>alert('注册成功！返回登录页面');location.href='login.html';</script>";
}

?>