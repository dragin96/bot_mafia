<?php
header('Access-Control-Allow-Origin: *');
$db = mysql_connect ("localhost", "vh17197_1", "*%AZ,G6%AJC-");
mysql_select_db("vh17197_1",$db);
mysql_query("set names utf8");  
$result = mysql_query("SELECT `nick` FROM `players`",$db);
$str_sokl = '';
while($myrow = mysql_fetch_assoc($result)) {
	if ($myrow['nick'] <> $_POST['mynick']){
		$str_sokl = $str_sokl.$myrow['nick'].' ';
	}
}
if ($_POST['list']  == 1){
	echo $str_sokl;
}
?>