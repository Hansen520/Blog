<?php
$fp = fopen('file.txt','r');
$contents = fread($fp,1024);
fclose($fp);
echo $contents;

?>