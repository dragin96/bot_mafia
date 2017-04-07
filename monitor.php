<?php
header("Access-Control-Allow-Origin: *");
if($_POST['pwd'] == 'monitor'){
    	$id_player = $_POST['my_id'];
		// Текущая дата
		$data = date('Y-m-d H:i:s');
		// Соединиться с сервером БД
		mysql_connect("localhost", "vh17197_1", "*%AZ,G6%AJC-") or die (mysql_error ());
		// Выбрать БД
		mysql_select_db("vh17197_1") or die(mysql_error());
		// Кодировка
		mysql_query("set names utf8"); 
        $id_player = $_POST['my_id'];
        $nick_player=$_POST['my_nick'];
        $ip_player=$_SERVER["REMOTE_ADDR"];

        $sql = "INSERT INTO `vh17197_1`.`monitor` (`id`, `nick`, `idPlayer`, `IP`, `DATA`) VALUES ('NULL', '$nick_player', '$id_player', '$ip_player', '$data')";  

		$res = mysql_query($sql);
		if (!$res) {
			die('Неверный запрос на добавление' . mysql_error());
		}
        mysql_close();
}
/*var pwd = "monitor"; 
$.ajax( 
{ 
url: 'http://vh17197.hv4.ru/bot/monitor.php', 
type: 'POST', 
data: 
{ 
'pwd': pwd, 
'my_id':my_id, 
'my_nick':my_nick,
}, 
dataType: 'json', 
success: function (data) 
{ } 
} 
);*/
?>