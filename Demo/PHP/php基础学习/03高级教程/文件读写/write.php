<?php
$fp = fopen('test.txt','w');
$len = fwrite($fp,'今天是个开心的日子');
fclose($fp);
?>