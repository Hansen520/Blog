<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/27 0027
 * Time: 上午 11:44
 */
header('Content-type:text/html;charset=utf-8');
session_start();
if(isset($_SESSION['username'])){
//     var_dump(session_name());die();
    session_unset($_SESSION['username']);
    session_destroy();//销毁一个会话中的全部数据
    setcookie(session_name(),'');//销毁与客户端的联系
    echo "<script>alert('注销成功！');location.href='login.html';</script>";
}else{
    echo "<script>alert('注销失败！');</script>";
}