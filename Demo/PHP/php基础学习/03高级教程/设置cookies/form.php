<?php
setcookie("user", "萨达飒飒", time()+3600);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="welcome.php" method="post">
        名字: <input type="text" name="name">
        年龄: <input type="text" name="age">
        <input type="submit">
    </form>

</body>
</html>