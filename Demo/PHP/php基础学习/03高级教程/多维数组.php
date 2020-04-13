<?php
header("Content-type:text/html;charset=utf-8");
$arr = array(
    array("小小","100","80","88"),
    array("妙妙","78","98","85"),
);
echo $arr[0][0].":Chinese-".$arr[0][1].",English-".$arr[0][1].",Math-".$arr[0][2]."<br>";
echo $arr[1][0].":Chinese-".$arr[1][1].",English-".$arr[1][1].",Math-".$arr[1][2];
?>