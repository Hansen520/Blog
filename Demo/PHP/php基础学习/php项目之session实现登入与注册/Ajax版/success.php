<?php
header('Content-type:text/html;charset=utf-8');
if($_SERVER["REQUEST_METHOD"] == "GET"){
    $username = trim($_GET['username']);//从前端获得usename
    $password = $_GET['password'];//从前端获得密码
}

$con = new mysqli('localhost', 'root', '325600', 'mynewtest');
$sql = "SELECT password FROM student WHERE username = '".$username."'";
$result = $con->query($sql);
// print_r($result);
$res=$result->fetch_row();
if(!empty($res)){
    if($password != $res[0]){
        $data = array(
            array('code' => 1, 'message' => '密码错误，请重新输入！' ),
        );
            echo json_encode($data);
    }else{
        $expire = 3600;
        ini_set('session.gc_maxlifetime',$expire);//保存1小时
        if(empty($_COOKIE['PHPSESSID'])){
            session_set_cookie_params($expire);
            session_start();
            //上面意思是说，有cookie直接用带着cookie登入即可
        }else{
            session_start();
            setcookie('PHPSESSID',session_id(),time()+$expire);
        }
        if(isset($_SESSION['username'])){
            //isset判断是否被设置
            $data = array(
                array('code'=>2,'message'=>'你已经登入了，请不要重新登入','session'=>$_SESSION['username']),
            );
            echo json_encode($data);
        }else{
            $_SESSION['username']=$_GET['username'];
            $data = array(
                array('code' => 3, 'message' => '登录成功','session'=>$_SESSION['username']),
            );
            echo json_encode($data);
        }

    }
}else{
    $data = array(
        array('code'=>4,'message'=>'没有此用户，请重新登入'),
    
    );
    echo json_encode($data);
}

?>