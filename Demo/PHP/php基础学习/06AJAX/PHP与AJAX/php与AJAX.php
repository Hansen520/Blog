<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>初体验</title>
 <script>
 function showHint(str)
 {
 if (str.length==0)
 {
 document.getElementById("txtHint").innerHTML="";
 return;
 }
 if (window.XMLHttpRequest)
 {
 // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
 xmlhttp=new XMLHttpRequest();
 }
 else
 {
 //IE6, IE5 浏览器执行的代码
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
 xmlhttp.onreadystatechange=function()
 {
 if (xmlhttp.readyState==4 && xmlhttp.status==200)
 {
 document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
 }
 }
 xmlhttp.open("GET","ajax_php.php?q="+str,true);
 xmlhttp.send();
 }
 </script>
</head>
<body>


<p><b>在输入框中输入一个姓名:</b></p>
<form>
 姓名: <input type="text" onkeyup="showHint(this.value)">
</form>
<p>返回值: <span id="txtHint"></span></p>

</body>
</html>