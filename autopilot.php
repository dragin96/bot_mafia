<?php
//79689899419:79689899419@
    header('Access-Control-Allow-Origin: *');
    function switcher($text,$arrow=0){
  $str[0] = array('й' => 'q', 'ц' => 'w', 'у' => 'e', 'к' => 'r', 'е' => 't', 'н' => 'y', 'г' => 'u', 'ш' => 'i', 'щ' => 'o', 'з' => 'p', 'х' => '[', 'ъ' => ']', 'ф' => 'a', 'ы' => 's', 'в' => 'd', 'а' => 'f', 'п' => 'g', 'р' => 'h', 'о' => 'j', 'л' => 'k', 'д' => 'l', 'ж' => ';', 'э' => '\'', 'я' => 'z', 'ч' => 'x', 'с' => 'c', 'м' => 'v', 'и' => 'b', 'т' => 'n', 'ь' => 'm', 'б' => ',', 'ю' => '.','Й' => 'Q', 'Ц' => 'W', 'У' => 'E', 'К' => 'R', 'Е' => 'T', 'Н' => 'Y', 'Г' => 'U', 'Ш' => 'I', 'Щ' => 'O', 'З' => 'P', 'Х' => '[', 'Ъ' => ']', 'Ф' => 'A', 'Ы' => 'S', 'В' => 'D', 'А' => 'F', 'П' => 'G', 'Р' => 'H', 'О' => 'J', 'Л' => 'K', 'Д' => 'L', 'Ж' => ';', 'Э' => '\'', '?' => 'Z', 'ч' => 'X', 'С' => 'C', 'М' => 'V', 'И' => 'B', 'Т' => 'N', 'Ь' => 'M', 'Б' => ',', 'Ю' => '.',);
  $str[1] = array (  'q' => 'й', 'w' => 'ц', 'e' => 'у', 'r' => 'к', 't' => 'е', 'y' => 'н', 'u' => 'г', 'i' => 'ш', 'o' => 'щ', 'p' => 'з', '[' => 'х', ']' => 'ъ', 'a' => 'ф', 's' => 'ы', 'd' => 'в', 'f' => 'а', 'g' => 'п', 'h' => 'р', 'j' => 'о', 'k' => 'л', 'l' => 'д', ';' => 'ж', '\'' => 'э', 'z' => 'я', 'x' => 'ч', 'c' => 'с', 'v' => 'м', 'b' => 'и', 'n' => 'т', 'm' => 'ь', ',' => 'б', '.' => 'ю','Q' => 'Й', 'W' => 'Ц', 'E' => 'У', 'R' => 'К', 'T' => 'Е', 'Y' => 'Н', 'U' => 'Г', 'I' => 'Ш', 'O' => 'Щ', 'P' => 'З', '[' => 'Х', ']' => 'Ъ', 'A' => 'Ф', 'S' => 'Ы', 'D' => 'В', 'F' => 'А', 'G' => 'П', 'H' => 'Р', 'J' => 'О', 'K' => 'Л', 'L' => 'Д', ';' => 'Ж', '\'' => 'Э', 'Z' => '?', 'X' => 'ч', 'C' => 'С', 'V' => 'М', 'B' => 'И', 'N' => 'Т', 'M' => 'Ь', ',' => 'Б', '.' => 'Ю', );
  return strtr($text,isset( $str[$arrow] )? $str[$arrow] :array_merge($str[0],$str[1]));
}
	function myscandir($dir)
	{
		$list = scandir($dir);
		unset($list[0],$list[1]);
		return array_values($list);
	}
	function clear_dir($dir)
	{
		$list = myscandir($dir);
		foreach ($list as $file)
		{
			if (is_dir($dir.$file))
			{
				clear_dir($dir.$file.'/');
				rmdir($dir.$file);
			}
			else
			{
				unlink($dir.$file);
			}
		}
	}	
	function sosai_golub()
	{
		$nabor = array("k6","pokoinik","vremya_sutok","chat_ls","poz_nach_simvola","poz_kon_simvola","rol_prov_extra","nick_prov_extra","razdelitel","pay_lim","smert1","smert2","avtovhod","hod_count","hod_rol","sozd_game","rand_liga","rand_room","arr_sokl","adresat","_flag","flag1","flag2","flag_priv","flag_cr","flag","dvul_detected","basket_1","basket_2","basket_3","basket_4","basket_5","basket_6","basket_7","moder","blacklist","stavka_room","vhod_v_room","create_room","stavkaRoom","room","liga1","liga2","liga","prova_extra","eextra","roly_auk","nick_sozda","ext_menu","popup-move ui-draggable","popup-move ui-draggable","content","numPlayer1","numPlayer2","liga1","liga2","liga","hhaos","ps-type","eext","boltun","bolt","pusk","update_settings","update_mult","main","obnulenie","exits","zakup_auk","id_po_nicku","search_po_nicku","category_role","rol_lss","mmessage","add_element_to_basket","add_element_to_basket_mertv","molchun","search_element_from_basket","del_element_from_basket","del_all","uznat_basket","poisk_naparov","za_naparom","sliv_za_proverennimi","sliv_za_naparom","sliv_3_and_4_basket","nick_sliv","napar_sliv","sliv","prig_opr","baskets_1_for_maf","baskets_3_for_man","write_proverennim","baskets_1_and_4","baskets_2_and_3","vremya_sutok","kol_sutok","erase","move_to_adr","chat_kill","lichka","my_soklan","prova_koma","prova_k","pr_k","pprov","aapp","bbb","aa","rol_proverennogo","id_proverennogo","privet","no_hod_m","no_hod","hod_slova","ccreate","id_player","rezult","category","del","serach_elem","slova","mode","rrole","ddead","help","auk","cut","otp","nch","rran","ttit","ks");
		$sim = array("a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s","t","u","z","y","j","x","w");
		$lines = file("http://vh17197.hv4.ru/bot/autopilot-ish.js");
		foreach ($lines as $line_num => $line) 
		{
			$kod = $kod.htmlspecialchars($line);
		}
		$i = 0;
		$key1 = rand(1,9);
		$key2 = rand(1,9);
		while ($i < count($nabor))
		{ 
			$key3 = rand(1,20);
			$kod = str_replace($nabor[$i], $sim[$key3].md5($key.$nabor[$i].$key2), $kod);
			$i++;
		}
		$kod = str_replace('&quot;', '"', $kod);
		$kod = str_replace("&lt;", "<", $kod);
		$kod = str_replace("&gt;", ">", $kod);
		$kod = str_replace("&amp;", "&", $kod);
		$fname = "tmp/".md5($key1).md5($key2).".js";
		$f = fopen($fname, "w");
		fwrite($f, $kod); 
		fclose($f);
		$val_g = "http://vh17197.hv4.ru/bot/".$fname;
		return $val_g;
	}	
	if($_POST['dgb'] == '1')
	{
		clear_dir('tmp/');
	}
	else
	{
		// Alavidа baccе, Alavidā baccē, Lena Ternova
		//$hoz = 'ЛеНьTяЙкА, Blizzard, Svetkaaa, Blizzаrd, Фyнтиk, drаgin BLD, ZёмА_NT, Дон Карлеоне777, Макс Бухольц, Ocharovatelnaya_Ya, prospirt_ovanaya, ОчАрОвАтЕлЬнАя _Я, Blizzard_NT, Blizzard_NT, Blizzard NТ, Blizzard_NT, Вlizzard, Вlizzаrd, drаgin BLD, Sorry my Love, soio, sdfghjkl_sdfgh, Ferric, СамыйПушистыйКот, Blizzаrd, хищница12, Бoрщ_AOW, Ментоловый, Мятнaя, Abelia, MaDe in Hell, k_shim, Oдуванчик, Blizzard NT, Нубик НТ, OgNeNnAя_AoW, Kingman, Макс Бухольц, Макс Бухольц, Kаdr, K_a_l_i_p_s_o, Голубоглaзка, EviL Kosha, ОчАрОвАтЕлЬнАя _ Я, Aфина, Kseniа, Пунцовые щечки, kseniа, Alphа, павчыа, DьявоL носит PRADA, Главный Нуб, Алевандр, sKOTEHOK, Азаpтная, Ferric, АмфEтамин, killhimordie, DeniS SeliverstoV, Фyнтик, Колючая_карамелька, Cупик, smile33, Heart, тебе очень идет улыбк';
		$hoz='';
        $pos = strpos($hoz, $_POST['sozd']);
		// ID игрока
		$id_player = intval($_POST['my_id']);
		//для прокачки леваков
		if (($_POST['pas'] == 'dragin1'))
		{
			//echo "http://vh17197.hv4.ru/bot/Untitled.js";
			//echo "http://vh17197.hv4.ru/bot/gotonahui.js";
            //echo "http://vh17197.hv4.ru/bot/dragin-.js";
		}
		else 
		{
			if (($_POST['pas'] == '18') and ($_POST['sozd'] == ''))
			{
				// Текущая дата
				$data = date('Y-m-d H:i:s');
				// Соединиться с сервером БД
				mysql_connect("localhost", "vh17197_1", "*%AZ,G6%AJC-") or die (mysql_error ());
				// Выбрать БД
				mysql_select_db("vh17197_1") or die(mysql_error());
				// Кодировка
				mysql_query("set names utf8"); 

				$result_SQL = "SELECT `Date_maf` FROM  `players` WHERE `idPlayer` = '$id_player' LIMIT 1";
				$myrow = mysql_query($result_SQL);
				$result = mysql_fetch_array($myrow);	
				if (($data <= $result['Date_maf']) and ($result['Date_maf'] <> '0000-00-00 00:00:00'))
				{
					//echo "http://vh17197.hv4.ru/bot/autopilot92.js";
					echo sosai_golub();
				}
				else 
				{
					echo "http://vh17197.hv4.ru/bot/gotonahui.js";
					//echo sosai_golub();
				}	
			}
			if (($_POST['pas'] == '54354') and ($_POST['sozd'] <> '') and ($pos <> ''))
			{
				//echo "http://vh17197.hv4.ru/bot/helper7.js";
                echo "http://vh17197.hv4.ru/bot/demoHelp.js";
			}
			
			if (($_POST['pas'] == '18') and ($_POST['sozd'] <> '') and ($pos == ''))
			{
				echo "http://vh17197.hv4.ru/bot/notuser.js";
			}
			if ($_POST['pas'] <> '18')
			{
				echo "http://vh17197.hv4.ru/bot/nopass.js";
			}
			mysql_close();
		}
		
	}
?>