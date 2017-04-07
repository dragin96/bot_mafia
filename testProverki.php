<?php
 header("Access-Control-Allow-Origin: *");
if($_POST['pwd'] == 'develop'){
    $db = mysql_connect("localhost","vh17197_1","*%AZ,G6%AJC-"); 
    mysql_select_db("vh17197_1",$db); 
    $result = mysql_query("SELECT * FROM `players`",$db);
    $myrow = mysql_fetch_array($result);
    do{ 
    if($myrow['idPlayer']==$_POST['id']){
        echo ('1');
    }
    else{
        echo ('0');
    }
	}
    while ($myrow = mysql_fetch_array($result));   
}
?>
