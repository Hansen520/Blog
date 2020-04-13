<?php
 header("Content-type:text/html;charset=utf-8");    //设置编码
 // rss 文件
 $xml="rss_demo.xml";
 $xmlDoc = new DOMDocument();
 $xmlDoc->load($xml);
 
 // 从 "<channel>" 中读取元素
 $channel=$xmlDoc->getElementsByTagName('channel')->item(0);
 $channel_title = $channel->getElementsByTagName('title')
     ->item(0)->childNodes->item(0)->nodeValue;
 $channel_link = $channel->getElementsByTagName('link')
     ->item(0)->childNodes->item(0)->nodeValue;
 $channel_desc = $channel->getElementsByTagName('description')
     ->item(0)->childNodes->item(0)->nodeValue;
 
 // 输出 "<channel>" 中的元素
 echo("<p><a href='" . $channel_link
     . "'>" . $channel_title . "</a>");
 echo("<br>");
 echo($channel_desc . "</p>");
 
 // 输出 "<item>" 中的元素
 $x=$xmlDoc->getElementsByTagName('item');
 for ($i=0; $i<=1; $i++) {
     $item_title=$x->item($i)->getElementsByTagName('title')
         ->item(0)->childNodes->item(0)->nodeValue;
     $item_link=$x->item($i)->getElementsByTagName('link')
         ->item(0)->childNodes->item(0)->nodeValue;
     $item_desc=$x->item($i)->getElementsByTagName('description')
         ->item(0)->childNodes->item(0)->nodeValue;
     echo ("<p><a href='" . $item_link
         . "'>" . $item_title . "</a>");
     echo ("<br>");
     echo ($item_desc . "</p>");
 }
 ?>