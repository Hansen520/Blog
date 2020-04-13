<?php
 $q=$_GET["q"];
 
 $con = new mysqli('localhost','root','325600','mynewtest');
 if (!$con)
 {
     die('Could not connect: ' . mysqli_error($con));
 }
 
 //mysqli_select_db($con,"ajax_demo");
 $sql="select * from Myguests WHERE id = '".$q."'";
 
 $result = $con->query($sql);
 
 echo "<table border='1'>
 <tr>
 <th>firstname</th>
 <th>lastname</th>
 <th>email</th>
 </tr>";
 
 while($row = $result->fetch_assoc())
 {
     echo "<tr>";
     echo "<td>" . $row['firstname'] . "</td>";
     echo "<td>" . $row['lastname'] . "</td>";
     echo "<td>" . $row['email'] . "</td>";
     echo "</tr>";
 }
 echo "</table>";
 
$con->close();
 ?>