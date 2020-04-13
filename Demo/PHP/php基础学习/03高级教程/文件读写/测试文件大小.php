<?php
header("Content-type:text/html;charset=utf-8");    //设置编码
$filename = 'file.txt';
echo $filename . '文件大小为: ' . filesize($filename) . ' bytes';
?>