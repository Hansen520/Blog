<?php
header('Content-type:text/html;charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 if (empty($_POST['username'])){
 echo "<script>alert('用户名不能为空！');location.href='login.html';</script>";
 }else {
 $username=trim($_POST['username']);
 }
 if (empty($_POST['password'])){
 echo "<script>alert('密码不能为空！');location.href='login.html';</script>";
 }else{
 $password=$_POST['password'];
 }
}
$mysqli = new mysqli('localhost', 'root', '325600', 'mynewtest');
$sql = "SELECT password FROM student WHERE username = "."'$username'";
//定位到你想要的username，但是只看得见密码这一列
$result = $mysqli->query($sql);
$rs=$result->fetch_row();
// echo $rs[0];
//这是数据库获得的数组，如果$sql里面password则是$rs[0],如果是*，则密码在第三列，即$rs[2],一切和$sql有关
if(!empty($rs)){
    
    if($password != $rs[0]){
        echo "<script>alert('密码错误，请重新输入！');location.href='login.html';</script>";
    }else{
        $expire = 3600;//3600秒
        ini_set('session.gc_maxlifetime',$expire);//保存一个小时
    
    if(empty($_COOKIE['PHPSESSID'])){
        session_set_cookie_params($expire);
        session_start();
    }else{
        session_start();
        setcookie('PHPSESSID',session_id(),time()+$expire);
    }
    if(isset($_SESSION['username'])){
        exit("您已经登入了，请不要重新登入！用户名：{$_SESSION['username']}---<a href='logout.php'>注销</a>");
    }else{
        $_SESSION['username'] = $_POST['username'];
    }
    echo "<script>alert('登录成功！');</script><br>";
    echo "您好！{$_SESSION['username']},欢迎回来！";
    echo "<a href='logout.php'>注销</a>"; 
    }
    }else{
        echo "<script>alert('没有此用户！');location.href='login.html';</script>";
    }

?>