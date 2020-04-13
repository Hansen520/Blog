<?php
 $xmlDoc=new DOMDocument();
 $xmlDoc->load("links.xml");
 
 $x=$xmlDoc->getElementsByTagName('link');
 
 // 从 URL 中获取参数 q 的值
 $q=$_GET["q"];
 
 // 如果 q 参数存在则从 xml 文件中查找数据
 if (strlen($q)>0)
 {
     $hint="";
     for($i=0; $i<($x->length); $i++)
     {
         $y=$x->item($i)->getElementsByTagName('title');
         $z=$x->item($i)->getElementsByTagName('url');
         if ($y->item(0)->nodeType==1)
         {
             // 找到匹配搜索的链接
             if (stristr($y->item(0)->childNodes->item(0)->nodeValue,$q))
            //  stristr() 函数搜索字符串在另一字符串中的第一次出现。
            // echo stristr("Hello world!","WORLD",true);
            // 返回 "world" 第一次出现之前的字符串部分：
             {
                 if ($hint=="")
                 {
                     $hint="<a href='" .
                         $z->item(0)->childNodes->item(0)->nodeValue .
                         "' target='_blank'>" .
                         $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
                 }
                 else
                 {
                     $hint=$hint . "<br /><a href='" .
                         $z->item(0)->childNodes->item(0)->nodeValue .
                         "' target='_blank'>" .
                         $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
                 }
             }
         }
     }
 }
 
 // 如果没找到则返回 "no suggestion"
 if ($hint=="")
 {
     $response="no suggestion";
 }
 else
 {
     $response=$hint;
 }
 
 // 输出结果
 echo $response;
 ?>