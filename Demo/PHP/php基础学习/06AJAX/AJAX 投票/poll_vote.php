<?php

//这是一种安全的写法
 $vote = htmlspecialchars($_REQUEST['vote']);

 
 // 获取文件中存储的数据
 $filename = "poll_result.txt";
 $content = file($filename);
echo $content[0];//这个就是文本中的字符串，如11||10
 
 // 将数据分割到数组中
 $array = explode("||", $content[0]);//将上面以||分割
 $yes = $array[0];
 $no = $array[1];
 
 if ($vote == 0)
 {
     $yes = $yes + 1;
 }
 
 if ($vote == 1)
 {
     $no = $no + 1;
 }
 
 // 插入投票数据
 $insertvote = $yes."||".$no;
 $fp = fopen($filename,"w");
 fputs($fp,$insertvote);
 fclose($fp);
 ?>
 
 <h2>结果:</h2>
 <table>
     <tr>
         <td>是:</td>
         <td>
   <span style="display: inline-block; background-color:green;
       width:<?php echo(100*round($yes/($no+$yes),2)); ?>px;
       height:20px;" ></span>
             <?php echo(100*round($yes/($no+$yes),2)); ?>%
         </td>
     </tr>
     <tr>
         <td>否:</td>
         <td>
   <span style="display: inline-block; background-color:red;
       width:<?php echo(100*round($no/($no+$yes),2)); ?>px;
       height:20px;"></span>
             <?php echo(100*round($no/($no+$yes),2)); ?>%
         </td>
     </tr>
 </table