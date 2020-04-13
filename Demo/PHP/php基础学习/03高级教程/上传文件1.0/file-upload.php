<?php
 header("Content-type:text/html;charset=utf-8");
 //print_r($_FILES["upfile"]); 
 if(is_uploaded_file($_FILES['upfile']['tmp_name'])){
    //is_uploaded_file()传入一个参数($_FILES中的缓存文件名)，判断传入的名称是不是上传文件。
     $upfile=$_FILES["upfile"];
 //获取数组里面的值 
     $name=$upfile["name"];//上传文件的文件名
     $type=$upfile["type"];//上传文件的类型
     $size=$upfile["size"];//上传文件的大小
     $tmp_name=$upfile["tmp_name"];//上传文件的临时存放路径
 //判断是否为图片 
     switch ($type){
         case 'image/pjpeg':$okType=true;
             break;
         case 'image/jpeg':$okType=true;
             break;
         case 'image/gif':$okType=true;
             break;
         case 'image/png':$okType=true;
             break;
     } 
     if($okType){
         /**
          * 0:文件上传成功<br/>
          * 1：超过了文件大小，在php.ini文件中设置<br/>
          * 2：超过了文件的大小MAX_FILE_SIZE选项指定的值<br/>
          * 3：文件只有部分被上传<br/>
          * 4：没有文件被上传<br/>
          * 5：上传文件大小为0
          */
         $error=$upfile["error"];//上传后系统返回的值
         echo "上传文件名称是：".$name."<br/>";
         echo "上传文件类型是：".$type."<br/>";
         echo "上传文件大小是：".$size."<br/>";
         echo "上传后系统返回的值是：".$error."<br/>";
         echo "上传文件的临时存放路径是：".$tmp_name."<br/>";
         echo "开始移动上传文件<br/>";
         //把上传的临时文件移动到指定目录下面
         move_uploaded_file($tmp_name,'upload/'.$name);
         echo "上传信息：<br/>";
         if($error==0){
             echo "文件上传成功啦！";
 
         }elseif ($error==1){
             echo "超过了文件大小，在php.ini文件中设置";
         }elseif ($error==2){
             echo "超过了文件的大小MAX_FILE_SIZE选项指定的值";
         }elseif ($error==3){
             echo "文件只有部分被上传";
         }elseif ($error==4){
             echo "没有文件被上传";
         }else{
             echo "上传文件大小为0";
         }
     }else{
         echo "请上传jpg,gif,png等格式的图片！";
     }
 }
 ?>