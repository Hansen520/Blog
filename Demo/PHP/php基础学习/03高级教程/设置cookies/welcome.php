<html>
<head>
<meta charset="utf-8">
<title>php中文网(php.cn)</title>
</head>
<body>
欢迎 <?php echo $_POST["name"]; ?>.<br>
你 <?php echo $_POST["age"]; ?> 岁了。
<?php
if (isset($_COOKIE["user"]))
         echo "欢迎 " . $_COOKIE["user"] . "!<br>";
else
         echo "普通访客!<br>";
?>
</body>
</html>