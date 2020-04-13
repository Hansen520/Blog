<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>表单验证</title>
</head>
<body>
    <?php
    //定义变量为空值
    $name = $email = $gender = $comment = $website = "";
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $name = test_input($_POST['name']);
        $email = test_input($_POST['email']);
        $website = test_input($_POST['website']);
        $comment = test_input($_POST['comment']);
        $gender = test_input($_POST['gender']);
    }
    //1.   （通过 PHP trim() 函数）去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
    //2.   （通过 PHP stripslashes() 函数）删除用户输入数据中的反斜杠（\）
    function test_input($data){
        $data = trim($data);
        $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }
    ?>

    <h2>表单验证</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
            <!-- 因此，$_SERVER["PHP_SELF"] 将表单数据发送到页面本身，
            而不是跳转到另一张页面。这样，用户就能够在表单页面获得错误提示信息。 -->
            <!-- htmlspecialchars() 函数把特殊字符转换为 HTML 实体。这意味着 < 和 > 之类的 HTML 字符会被替换为 &lt; 和 &gt; 。
            这样可防止攻击者通过在表单中注入 HTML 或 JavaScript 代码（跨站点脚本攻击）对代码进行利用。 -->
        名字:<input type="text" name='name' value=""><br>
        E-mail:<input type="text" name='email' value=""><br>
        网址:<input type="text" name ='website' value=""><br>
        备注:<textarea name="comment" id="" cols="40" rows="10"></textarea><br>
        性别: 
        <input type="radio" name='gender' value="femail">女
        <input type="radio" name='gender' value="male">男
        <br>
        <input type="submit" name='submit' value="提交">    

    </form>
    <!-- <Directory />
    AllowOverride none
    Require all denied
</Directory> -->
<?php echo "<h2>您输入的内容是:</h2>";
        echo $name;
        echo "<br>";
        echo $email;
        echo "<br>";
        echo $website;
        echo "<br>";
        echo $comment;
        echo "<br>";
        echo $gender;
    ?>    

</body>
</html>