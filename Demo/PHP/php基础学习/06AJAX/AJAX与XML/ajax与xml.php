<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>ajax与xml</title>
     <script>
         function showCD(str)
         {
             if (str=="")
             {
                 document.getElementById("txtHint").innerHTML="";
                 return;
             }
             if (window.XMLHttpRequest)
             {
                 // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行
                 xmlhttp=new XMLHttpRequest();
             }
             else
             {
                 // IE6, IE5 浏览器执行
                 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
             }
             xmlhttp.onreadystatechange=function()
             {
                 if (xmlhttp.readyState==4 && xmlhttp.status==200)
                 {
                     document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
                 }
             }
             xmlhttp.open("GET","getcd.php?q="+str,true);
             xmlhttp.send();
         }
     </script>
 </head>
 <body>
 
 <form>
     Select a CD:
     <select name="cds" onchange="showCD(this.value)">
         <option value="">Select a CD:</option>
         <option value="Bob Dylan">Bob Dylan</option>
         <option value="Bonnie Tyler">Bonnie Tyler</option>
         <option value="Dolly Parton">Dolly Parton</option>
     </select>
 </form>
 <div id="txtHint"><b>CD info will be listed here...</b></div>
 </body>
 </html>