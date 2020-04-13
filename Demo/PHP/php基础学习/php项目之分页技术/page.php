<?php
echo "<style>
a{
    text-decoration:none;
    color:#000;
    display:inline-block;
}
</style>";
 /**1,传入页码**/
$page = $_GET["p"];
 /**2,根据页码取出数据：php->mysql的处理**/
 $host = "localhost";
 $username = "root";
 $password = "325600";
 $db = "mynewtest";
 $PageSize=5;//页面显示数据的行数
 $ShowPage=3;//分页页面显示的页数

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
 echo "<table border=1 cellspacing='0' width=25%>";
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
$to = $to_result[0];
//计算页数，ceil向上去整数，这样余下的数也能显示出来1.1=1
$to_pages = ceil($to/$PageSize);
// 关闭数据库
// $conn->close();
//3.显示数据+分页条
 $page_banner = "";
 $pageoffset = ($ShowPage-1)/2;//1
 if($page > 1){
    $page_banner.="<a href='".$_SERVER['PHP_SELF']."?p=1'>首页</a> ";
    $page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($page-1)."'>上一页</a> ";
 }
//初始化数据
$start = 1;
$end = $to_pages;//7
if($to_pages > $ShowPage){// 7>3
    //头部省略号
    if($page > $pageoffset + 1){//5,4,3>2
        $page_banner .= "...";
    }
    if($page > $pageoffset){//2>1
        $start = $page-$pageoffset;
        $end = $to_pages > $page + $pageoffset ? $page+$pageoffset:$to_pages;
    }else{
        $start = 1;
        $end=$to_pages>$ShowPage?$ShowPage:$to_pages;
    }
    if ($page+$pageoffset>$to_pages){
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
 echo "<p>{$page_banner}</p>";
 ?> 
