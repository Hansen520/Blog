<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>分页</title>
    <style>
    div.page{
    text-align: center;
    }
    div.page a{
    border: #ccc solid 1px;
    text-decoration: none;
    padding: 2px 5px 2px 5px;
    margin: 2px;
    color:#000;
    }
    div.page span.current{
    border: #000099 1px solid;background-color: #992b6c;padding: 4px 6px 4px 6px;margin: 2px;color: #fff;
    font-weight: bold;
    }
    div.page form{
    display: inline;
    }
    div.content{
    height: 200px;
    }
</style>
</head>
<body>
<?php
// echo "<style>
// a{
//     text-decoration:none;
//     color:#000;
//     display:inline-block;
// }
// </style>";
 /**1,传入页码,这样子弄是想第一次进来就有东西，不用在浏览器上输入，默认p=1**/
$page = isset($_GET['p'])?trim($_GET['p']):1;//这个1就代表第一页
// var_dump(isset($_GET['p']));//false
 /**2,根据页码取出数据：php->mysql的处理**/
 $host = "localhost";
 $username = "root";
 $password = "325600";
 $db = "mynewtest";
 $PageSize=5;//页面显示数据的行数
 $ShowPage=5;//分页页面显示的页码数量，就是下面只有5个页码

 $conn = new mysqli($host,$username,$password,$db);
//连接数据库
 if (!$conn) {
 //echo "数据库连接失败";
 exit;
 }
 //选择要操作的数据库
//  mysql_select_db($db);
 //设置数据库编码格式
 $conn->query("SET NAMES UTF8");
 //编写sql获取分页数据SELECT * FROM 表名 LIMIT 起始位置,显示条数
 $sql = "SELECT * FROM paging limit ".($page-1) * $PageSize .",$PageSize ";//从0开始取5条数据
//  select * from table limit m,n 
//意思是说，从m开始取n条数据
//  echo $sql;
 //把sql语句传送到数据中
 $result = $conn->query($sql);
 //处理数据
 echo "<table border=1 cellspacing='0' width=25% align='center'>";
 echo "<tr><td>ID</td><td>省会</td><td>城市</td></tr>";
 while($row = $result->fetch_assoc()){

 echo "<tr>";
 echo "<td>{$row['id']}</td>";
 echo "<td>{$row['province']}</td>";
 echo "<td>{$row['city']}</td>";
 echo "<tr>";
 }
 echo "</table>";
 //释放结果
 $result->free_result();
// 获取列表中的行数
$to_sql = "SELECT COUNT(*)FROM paging";
$to_result = $conn->query($to_sql)->fetch_array();
//获取数据总数
$to = $to_result[0];//35条数据
//计算页数，ceil向上去整数，这样余下的数也能显示出来1.1=1
$to_pages = ceil($to/$PageSize);//7页
// 关闭数据库
// $conn->close();
//3.显示数据+分页条(注意理解)
$page_banner="<div class='page'>";
// ？？？
$pageoffset = ($ShowPage-1)/2;//2
 if($page > 1){
    //当出现2时执行下面这个
    $page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=1'>首页</a> ";
    $page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($page-1)."'>上一页</a> ";
 }
//初始化数据
$start = 1;
$end = $to_pages;//7页
// $to_pages为总页数，$ShowPage分页显示的条数
if($to_pages > $ShowPage){// 7>5
    //头部省略号
    // print_r('页数'.$page."--");
    // print_r($pageoffset + 1);
    // $page 为当前页
    if($page > $pageoffset + 1){//5,4,3 > 2
        // 当出现3的时候出现这个
        $page_banner .= "...";
    }
    // 页码数从几到几，显示3个
    if($page > $pageoffset){// 5,4,3,2> 1
        $start = $page-$pageoffset;//2-1=1=>$start=1
        // 总页数 > 当前页 + 1，当前页从2开始
        // 7 > 2 + 1,$end = 3
        $end = $to_pages > $page + $pageoffset ? $page+$pageoffset:$to_pages;
    }else{
        $start = 1;
        // 总页数 > 下排页码数
        // 比如总页数4，则页码数量为3
        $end=$to_pages>$ShowPage?$ShowPage:$to_pages;//7>3=>3
    }
    // 8 > 7
    if ($page+$pageoffset>$to_pages){
        // 6 - (8 + 1 - 8) = 5
        $start=$start-($page+$pageoffset-$end);
    }

}
for($i=$start;$i<=$end;$i++){
    $page_banner.="<a style='width:20px;height:20px;font-size:14px;text-align:center;border:1px solid #ccc;' href='".$_SERVER['PHP_SELF']."?p=".($i)."'>{$i}</a>";
}
 //尾部省略
if ($to_pages>$ShowPage&&$to_pages>$page+$pageoffset){
    $page_banner.="...";
}


if($page < $to_pages){
    $page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($page+1)."'>下一页</a> ";
    $page_banner.="<a href='".$_SERVER['PHP_SELF']."?p=".($to_pages)."'>尾页</a> ";
 }
 $page_banner .= "共{$to_pages}页";
 $page_banner .= "<form action='page完善版.php' method='get'>";
 $page_banner .= "到第<input type='text'size='2'name='p'>页";
 $page_banner .= "<input type='submit'value='确定'>";
 $page_banner .= "</form></div>";
 echo "<p>{$page_banner}</p>";
 ?> 
</body>
</html>