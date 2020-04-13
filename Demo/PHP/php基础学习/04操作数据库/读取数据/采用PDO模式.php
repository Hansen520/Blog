<?php
 echo "<table border='1px' style='border: solid 1px black;' cellspacing='0'>";
 echo "<tr><th>Id</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Reg date</th></tr>";
 
 class TableRows extends RecursiveIteratorIterator { 
     function __construct($it) { 
         parent::__construct($it, self::LEAVES_ONLY); 
     }
 
     function current() {
         return "<td style='width: 150px; border: 1px solid black;'>" . parent::current(). "</td>";
     }
 
     function beginChildren() { 
         echo "<tr>"; 
     } 
 
     function endChildren() { 
         echo "</tr>" . "\n";
     } 
 } 
 
 $servername = "localhost";
 $username = "root";
 $password = "325600";
 $dbname = "mynewtest";
 
 try {
     $conn = new PDO("mysql:host=$servername;dbname=$dbname;port=3308", $username, $password);
     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $stmt = $conn->prepare("SELECT * FROM MyGuests"); 
     $stmt->execute();
 
     // 设置结果集为关联数组
     $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    
     foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
         echo $v;
     }
     $dsn = null;
 }
 catch(PDOException $e)
 {
     echo "Error: " . $e->getMessage();
 }
 $conn = null;
 echo "</table>";
 ?>