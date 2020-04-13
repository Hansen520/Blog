<?php
    $myFile = $_FILES["file"];
    $myName = $myFile["name"];
    $myPath = "upload/".$myName;
    move_uploaded_file($myFile["tmp_name"],$myPath);
?>