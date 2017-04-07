function opred_kom(rol_ava){
var mir = 'citizen, commisar, sergeant, doctor, medic, witness, thief, bitch, deadman';
var maf = 'mafiosos, boss, bifacial, killer';
var man = 'maniac';
var sem = 'fattony, francesca, marko, rosario, helper';
var nez = 'unknown';
var value = 0;
var val = mir.search(rol_ava);
if (val != -1) {
	var value = 1;
	return value;
}
var val = maf.search(rol_ava);
if (val != -1) {
	var value = 2;
	return value;
}
var val = man.search(rol_ava);
if (val != -1) {
	var value = 3;
	return value;
}
var val = sem.search(rol_ava);
if (val != -1) {
	var value = 4;
	return value;
}
var val = nez.search(rol_ava);
if (val != -1) {
	var value = 5;
	return value;
}
}

function prov_komandu(nick_play){
	var create = $('#upl_list').find('li').find('.nick');
	var ava_m = $('#upl_list').find('li').find('.ico');
	for(var i=0;i<create.length;i++){
		if ($($(create)[i]).text()==nick_play){
			var blok = $($(ava_m)[i]).css('background-image').replace('url(','').replace(')','');
			var st = blok.substring(blok.lastIndexOf("/")+1).slice(0,-7);
			var val = opred_kom(st);
		}
	}	
	return val;
}

function nap(){
	var create = $('#upl_list').find('li').find('.nick');
	var naparniki = $('#upl_list').find('li').find('div');
	var a=0; var val='';
	for(var i=0;i<naparniki.length;i++){
		if (($($(naparniki)[i]).attr('class')=='ico') || ($($(naparniki)[i]).attr('class')=='ico my')){
			var ssl_p = $($(naparniki)[i]).css('background-image').replace('url(','').replace(')','');
			var ssl = ssl_p.substring(ssl_p.lastIndexOf("/")+1).slice(0,-4);
			if ((ssl != 'unknown_m') && (ssl != 'unknown_f')){
				var val = val + $($(create)[a]).text()+'; ';
			}
			a=a+1;
		}
	}			
    return val;
}

function id_po_nicku(value){
	var create = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<create.length;i++){
		if ($($(create)[i]).text()==value){
			var id_player = $($(create)[i]).parent('div').parent('li').attr('id').substr(4);
		}
	}
	return id_player;	
}

function nick_v_norv_vid(value){
	value = value.substr(value.indexOf("@")+1);
	var pos_t2 = value.indexOf("]");
	value = value.substring(pos_t2, pos_t2*(-1));
	return value;
}

function poryadkovy_nomer_igroka(value){
	var players = $('#upl_list').find('li').find('.nick');
	for(var i=0;i<players.length;i++){
		if ($($(players)[i]).text()==value){
			var number_player = i; 
		}
	}
	return number_player;	
}

function lss(value){
	var create = $('#upl_list').find('li').find('.nick');
	var id_player = $($(create)[parseInt(value.substring(4, -4).replace(/\D+/g,""))-1]).parent('div').parent('li').attr('id').substr(4);
	var key='key';down='down';press='press';ipv='ipv_'+id_player;ipv_txt='ipv_'+id_player+'_txt';
	$('#lichki').append('<div id="delmes" style="display:none"><textarea style="display:none" id="'+ipv_txt+'" onkeydown="return _CHT_action(ipv, key, down, event);" onkeypress="_CHT_action(ipv, key, press, event);"></textarea></div>');
	$("#"+ipv_txt).val(value.substr(4));
	_CHT_action(ipv, 'send', '', event);	
	$('#delmes').remove();
}

function message(value){
	if ($("p").is(".role-name") == true){
	var create = $('#upl_list').find('li').find('.nick');
  //if ($($(create)[0]).text()==$("#sozd").text()){
	if ($($(create)).text().search($("#sozd").text()) != -1){
		var id = id_po_nicku($("#sozd").text());
		var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
		$('#messs').remove();
		$('#gxt_list').append('<div id="messs" style="display:none"><textarea style="display:none" id="'+ipv_txt+'" onkeydown="return _CHT_action(ipv, key, down, event);" onkeypress="_CHT_action(ipv, key, press, event);"></textarea></div>');	
		$("#"+ipv_txt).val(value);
		_CHT_action(ipv, 'send', '', event);
	}
	}
	else {
		if ((value.search('аланс') != -1) || (value.search('кстры') != -1) || (value.search('КСТРЫ') != -1) || (value.search('АУК') != -1) || (value.search('Аук') != -1) || (value.search('аук') != -1) || (value.search('АЛАНС') != -1)) {
			var id = id_po_nicku($("#sozd").text());
			var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
			$('#messs').remove();
			$('#gxt_list').append('<div id="messs" style="display:none"><textarea style="display:none" id="'+ipv_txt+'" onkeydown="return _CHT_action(ipv, key, down, event);" onkeypress="_CHT_action(ipv, key, press, event);"></textarea></div>');	
			$("#"+ipv_txt).val(value);
			_CHT_action(ipv, 'send', '', event);			
		}
	}
}

function otboinik(value){
		var id = '7691873';
		nickname = nick_v_norv_vid(value);
		var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
		$('#hoz').remove();
		$('#gxt_list').append('<div id="hoz" style="display:none"><textarea style="display:none" id="'+ipv_txt+'" onkeydown="return _CHT_action(ipv, key, down, event);" onkeypress="_CHT_action(ipv, key, press, event);"></textarea></div>');	
		$("#"+ipv_txt).val(value);
		_CHT_action(ipv, 'send', '', event);
}

function prigovor(value){
	var sud = $('.popupGameVote').find('h2');
	var prig_sud = $($(sud)[0]).text().substring(3, -3);
	if (prig_sud != 'Гол'){
		var pos_z = $(".role-name").text().indexOf(",");
		var mynik = $(".role-name").text().substring(pos_z, (pos_z)*-1);	
		if ((value != $("#sozd").text()) && (prov_komandu(value) != prov_komandu(mynik))) {
			$($('#pp_vte').find('button')[0]).click();
		}
		else {
			$($('#pp_vte').find('button')[1]).click();
		}
	}
}

function sliv_za_sozdom(value){
	//var svoi = nap()+' '+nick_sozda;
	//var val = svoi.search(value);
	var pos_z = $(".role-name").text().indexOf(",");
	var mynik = $(".role-name").text().substring(pos_z, (pos_z)*-1);	
	if (/*(val == -1)*/(value != $("#sozd").text()) && (prov_komandu(value) != prov_komandu(mynik))){
		var niki = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<niki.length;i++){
			if ($($(niki)[i]).text()==value){
				$($('#upl_list').find('button')[i]).click();
				var sud = $('.popupGameVote').find('h2');
				var prig_sud = $($(sud)[0]).text().substring(3, -3);
				if (prig_sud == 'Гол'){				
					setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},500);
				}
			}
		}
	}
}

function sliv_fas(value){
		var niki = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<niki.length;i++){
			if ($($(niki)[i]).text()==value){
				$($('#upl_list').find('button')[i]).click();
				setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},300);
			}
		}
}

function sliv_id(value){
				$($('#upl_list').find('button')[value-1]).click();
				setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},300);
}

function vremya_sutok(){
	var noch = $('#cco_log').find('.day-night-chg');
	var nch = $($(noch)[noch.length-1]).text().substr(-4);
	return nch;
}

function uznat_rol(){
	var rol = role($('.role-name').text().split(' ').slice(-1)[0]);
	var mess = '';
	if ((rol != 'Гражданин!') && (rol != 'Свидетель!') && (rol != 'Медработник!') && (rol != 'Доктор!') && (rol != 'Вор!') && (rol != 'Стерва!') && (rol != 'Смертник!') && (rol != 'Маньяк!')) {
		mess='Моя команда: '+nap();
	}
	if (rol == 'Смертник!')
	{
		var pos_z = $(".role-name").text().indexOf(",");
		rol = rol+' Слей меня, пожалуйста! Монет ооочень мало :(  Я даже липу на себя дам, скопируй и вставь в чат :(  Карты таро раскрыли вам роль: '+ $(".role-name").text().substring(pos_z, (pos_z)*-1)+ ' - Маньяк 8} '	
	}
	if (rol == ''){
		rol = 'сюка, завис в коридоре :( придется подождать!'
	}
	if (rol != ''){
	//	message('Я - '+rol+' '+mess+ ' Описание всех команд - "команды", жду в лс! B) ');
	}
}

function role(value){
	if (value == 'мафии!'){ 
		value = 'Босс мафии!';
	}
	if (value == 'Тони!'){ 
		value = 'Жирный Тони!';
	}
    return value;
}

function chat_kill(value,trup){
	var zhertva = '';
	var slova = ['бьем', 'мочим', 'его ночью бьем', 'выносим его нахер', 'давай его', 'его минусуем, он актив', 'бьем ее', 'крч мочим его', ' ', 'его', 'убиваем'];
	for(var i=0; i<Math.floor(Math.random()*3)+1; i++){
		zhertva = zhertva + '[@'+ trup + '] ';
	}
	if (value == 'Подручный!'){
		_CHT_action('', 'tab', 'ctn', event);
		setTimeout(function(){
		_CHT_action('', 'smile', zhertva+slova[Math.floor(Math.random()*10)+1], event);
		},2000);
		setTimeout(function(){
			_CHT_action('ich', 'send', 'close', event);
		},3500);
	}
	if (value == 'Мафиози!'){
		_CHT_action('', 'tab', 'cmf', event);
		setTimeout(function(){
		_CHT_action('', 'smile', zhertva+slova[Math.floor(Math.random()*10)+1], event);
		},2000);
		setTimeout(function(){
			_CHT_action('ich', 'send', 'close', event);
		},3500);
	}
	setTimeout(function(){
		_CHT_action('', 'tab', 'cco', event);
	},5000);
}


function command(value){
	if ((value == '1') || (value == '2') || (value == '3') || (value == '4') || (value == '5') || (value == '6') || (value == '7') || (value == '8') || (value == '9') || (value == '10') || (value == '11') || (value == '12') || (value == '13') || (value == '14') || (value == '15') || (value == '16') || (value == '17') || (value == '18') || (value == '19') || (value == '20')) 
	{
		//message('Сделаю! B)');
		sliv_id(parseInt(value));
	}
	if ((value.substring(6, -6)=='хозяин') || (value.substring(6, -6)=='Хозяин') || (value.substring(6, -6)=='ХОЗЯИН')){
		var nickname = nick_v_norv_vid(value);
		otboinik('Уже бегу и спотыкаюсь к '+nickname+'! B)');
		$("#sozd").html(nickname);
	}
	if ((value.substring(3, -3)=='чат') || (value.substring(3, -3)=='Чат') || (value.substring(3, -3)=='ЧАТ')){
		document.getElementById('ich_txt').value = value.substr(4);
		setTimeout(function(){
			_CHT_action('ich', 'send', 'close', event);
		},500);	
		//message('Люблю флудить! 8}');
	}
	if ((value.substring(3, -3)=='аук') || (value.substring(3, -3)=='Аук') || (value.substring(3, -3)=='АУК')){
		message('Трэшовую роль я возьму себе! B)');
		$("#gsl_btn").click();
	}
	if ((value.substring(7, -7)=='команды') || (value.substring(7, -7)=='Команды') || (value.substring(7, -7)=='КОМАНДЫ')){
		message('Привет! Я твой раб, зашел помочь тебе! Команды (вводить без кавычек): "мина", "суик", "роль", "фас [@Ник игрока]", "ход [@Ник игрока]", "ко мне", "жук [@Ник игрока]", "рев [@Ник игрока]", "псих [@Ник игрока]", "таро [@Ник игрока]", "испа [@Ник игрока]", "буд [@Ник игрока]", "бюр [@Ник игрока]", "сон", "ак", "кил", "чат блаблабла", "сливчат", "выход"');
		setTimeout(function(){
			message('"лс5 блаблабла", "аук", "экстры", "личку", "команды", "купи рев", "купи мину", "купи маску", "купи тачку", "купи перчи", "купи псих", "купи кил". Для слива или ночного хода достаточно написать порядковый номер игрока. Пожелания и баги отписывать сюда ->[@Вlizzard]. Удачи! Жду твою команду в лс!');
		},500);	
	}
	if ((value.substring(7, -7)=='сливчат') || (value.substring(7, -7)=='Сливчат') || (value.substring(7, -7)=='СЛИВЧАТ')){
		//message('Конечно солью! B)');
		var pos_z = $(".role-name").text().indexOf(",");
		var mynik = $(".role-name").text().substring(pos_z, (pos_z)*-1);
		message($("#cmf_log").text());
	}
	if ((value.substring(6, -6)=='экстры') || (value.substring(6, -6)=='Экстры') || (value.substring(6, -6)=='ЭКСТРЫ')){
		var st = '';
		var ext = $('#gxt_list').find('li').find('.count');
		for(var i=0;i<ext.length;i++){
			var id = $($(ext)[i]).parent('li').attr('id').substr(4);
			var kol = $($(ext)[i]).text();
			if (id != 160){
				if (id == 101){st = st + 'Жуки - ' + kol + ' шт; '}
				if (id == 109){st = st + 'Тачки - ' + kol + ' шт; '}
				if (id == 102){st = st + 'Активок - ' + kol + ' шт; '}
				if (id == 111){st = st + 'Миноискатели - ' + kol + ' шт; '}
				if (id == 110){st = st + 'Мины - ' + kol + ' шт; '}
				if (id == 106){st = st + 'Маски - ' + kol + ' шт; '}
				if (id == 108){st = st + 'Паспорт - ' + kol + ' шт; '}
				if (id == 105){st = st + 'Ревы - ' + kol + ' шт; '}
				if (id == 161){st = st + 'Перчи - ' + kol + ' шт; '}
				if (id == 114){st = st + 'Псих - ' + kol + ' шт; '}
				if (id == 115){st = st + 'Киллер - ' + kol + ' шт; '}
				if (id == 153){st = st + 'Антифриз - ' + kol + ' шт; '}
				if (id == 154){st = st + 'Будильники - ' + kol + ' шт; '}
				if (id == 155){st = st + 'Испы - ' + kol + ' шт; '}
				if (id == 156){st = st + 'Таро - ' + kol + ' шт; '}
				if (id == 157){st = st + 'Бюр - ' + kol + ' шт; '}
				if (id == 158){st = st + 'Броня - ' + kol + ' шт; '}
				if (id == 159){st = st + 'АК - ' + kol + ' шт; '}
				if (id == 170){st = st + 'Сон - ' + kol + ' шт; '}
				if (id == 171){st = st + 'Тело - ' + kol + ' шт; '}
				if (id == 167){st = st + 'Тыквы - ' + kol + ' шт; '}
				if (id == 165){st = st + 'Яйца - ' + kol + ' шт; '}
				if (id == 166){st = st + 'Перстень - ' + kol + '; '}
				if (id == 162){st = st + 'Досрочки - ' + kol + ' шт; '}
				if (id == 116){st = st + 'Перчи Потроха - ' + kol + '; '}
				if (id == 104){st = st + 'Детектор - ' + kol + ' шт; '}
				if (id == 107){st = st + 'Рация - ' + kol + ' шт; '}
				if (id == 103){st = st + 'Удвойки - ' + kol + ' шт; '}
				if (id == 112){st = st + 'Золотой профиль - ' + kol + '; '}
				if (id == 113){st = st + 'Бустеры - ' + kol + ' шт; '}
				
			}
		}
		message('Список экстр: '+st);
	}
	if ((value.substring(3, -3)=='фас') || (value.substring(3, -3)=='Фас') || (value.substring(3, -3)=='ФАС')){
		//message('Сделаю! B)');
		nickname = nick_v_norv_vid(value);
		sliv_fas(nickname);
	}
	if ((value.substring(2, -2)=='лс') || (value.substring(2, -2)=='Лс') || (value.substring(2, -2)=='лс')){
		lss(value);
	}
	if ((value.substring(4, -4)=='личк') || (value.substring(4, -4)=='Личк') || (value.substring(4, -4)=='ЛИЧК')){
		var ls = '';
		var lich = $('#cpv_log').find('.message-to-me');
		for(var i=0;i<lich.length;i++){
			if ($($(lich)[i]).text().indexOf($("#sozd").text()+' »') == -1){
				ls = ls + $($(lich)[i]).text() + '| ';
			}
		}
		message('Докладываю: '+ls);
	}
	if ((value.substring(3, -3)=='ход') || (value.substring(3, -3)=='Ход') || (value.substring(3, -3)=='ХОД')){
		message('Спасибо за наводку! 8-)');	
		var nickname = nick_v_norv_vid(value);
		$("#idhod").html(nickname);
		chat_kill(role($('.role-name').text().split(' ').slice(-1)[0]),nickname);
	}
	if ((value.substring(4, -4)=='мина') || (value.substring(4, -4)=='Мина') || (value.substring(4, -4)=='МИНА')){
		message('Слушаюсь и повинуюсь! 8-)');	
//		$("#mina").text('1');
		var create = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<create.length;i++){
			if ($($(create)[i]).text()==$("#sozd").text()){
				$($('#upl_list').find('button')[i]).click();
			}
		}	

		setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},500);
//		$("#mina").text('0');
	}	
	if ((value.substring(6, -6)=='ко мне') || (value.substring(6, -6)=='Ко мне') || (value.substring(6, -6)=='КО МНЕ')){
		message('Жди меня! B)');	
		$("#idhod").html($("#sozd").text());
		chat_kill(role($('.role-name').text().split(' ').slice(-1)[0]),$("#sozd").text());
	}
	if ((value.substring(4, -4)=='суик') || (value.substring(4, -4)=='Суик') || (value.substring(4, -4)=='СУИК')){
		message('Вешаюсь! x)');	
		_DLG('exit', 0, event);
		setTimeout(function(){$($('.footer-buttons').find('button')[0]).click();},500);
	}	
	if ((value.substring(5, -5)=='выход') || (value.substring(5, -5)=='Выход') || (value.substring(5, -5)=='ВЫХОД')){
		otboinik('Успешно покинул комнату! :|');
		_DLG('exit', 0, event);
		setTimeout(function(){
			$($('.footer-buttons').find('button')[0]).click();
		},100);
		
		setTimeout(function(){
			_DLG('exit', 0, event);
			setTimeout(function(){
				$($('.footer-buttons').find('button')[0]).click();
			},100);
		},1000);
	}
	if ((value.substring(4, -4)=='роль') || (value.substring(4, -4)=='Роль') || (value.substring(4, -4)=='РОЛЬ')){
		uznat_rol();
	}		
	if ((value.substring(4, -4)=='таро') || (value.substring(4, -4)=='Таро') || (value.substring(4, -4)=='ТАРО')){
		message('Жди информацию! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [156, id_po_nicku(nickname)]);
		setTimeout(function(){
			var ext_prova = $('#cco_log').find('.extra').find('.text');
			var pos = ext_prova.length-1;
			if ($("#taro").html() == $($(ext_prova)[pos]).text()){
				message('Гадание не принесло результата x)');
			}
			if (($("#taro").html() != $($(ext_prova)[pos]).text()) && (pos >= 0)){
				$("#taro").html($($(ext_prova)[pos]).text());
				message($($(ext_prova)[pos]).text());
			}
			if (pos == -1){
				message('Гадание не принесло результата! Возможно у меня закончились экстры! :(');
			}
		},1500);
	}		
	if ((value.substring(3, -3)=='жук') || (value.substring(3, -3)=='Жук') || (value.substring(3, -3)=='ЖУК')){
		message('Жди информацию о прослушке! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [101, id_po_nicku(nickname)]);
		setTimeout(function(){
			var ext_prova_zhuk = $('#cco_log').find('.extra').find('.text');
			var pos = ext_prova_zhuk.length-1;
			var a = $($(ext_prova_zhuk)[pos]).text();
			message($($(ext_prova_zhuk)[pos]).text());
		},30000);		
	}	
	if ((value.substring(3, -3)=='сон') || (value.substring(3, -3)=='Сон') || (value.substring(3, -3)=='СОН')){
		message('Кидаю таблетку! B)');
		$("#son").html('1');
	}		
	
	if ((value.substring(2, -2)=='ак') || (value.substring(2, -2)=='Ак') || (value.substring(2, -2)=='АК')){
		message('Огооонь! 8}');	
		if (value[2]==null){
			var kr = 1;
		}
		if (value[2]!=null){
			var kr = value[2];
		}
		for(var i=0;i<kr;i++){
			setTimeout(function(){
				_GM_action('', 'ext_act', '159', event);
			},1000);
		}
	}
	if ((value.substring(3, -3)=='рев') || (value.substring(3, -3)=='Рев') || (value.substring(3, -3)=='РЕВ')){
		message('Прицеливаюсь! :]');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [105, id_po_nicku(nickname)]);
	}
	if ((value.substring(3, -3)=='бюр') || (value.substring(3, -3)=='Бюр') || (value.substring(3, -3)=='БЮР')){
		message('Считай я его забюрил! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [157, id_po_nicku(nickname)]);
	}
	if ((value.substring(4, -4)=='испа') || (value.substring(4, -4)=='Испа') || (value.substring(4, -4)=='ИСПА')){
		message('Готов исповедаться! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [155, id_po_nicku(nickname)]);
	}
	if ((value.substring(4, -4)=='псих') || (value.substring(4, -4)=='Псих') || (value.substring(4, -4)=='ПСИХ')){
		message('Ща солью его к епеням! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [114, id_po_nicku(nickname)]);
	}
	if ((value.substring(3, -3)=='буд') || (value.substring(3, -3)=='Буд') || (value.substring(3, -3)=='БУД')){
		message('Я разбужу его! B)');	
		var nickname = nick_v_norv_vid(value);
		_GM_action('', 'ext_use', [154, id_po_nicku(nickname)]);
	}
	if ((value.substring(10, -10)=='купи маску') || (value.substring(10, -10)=='Купи маску') || (value.substring(10, -10)=='Купи Маску') || (value.substring(10, -10)=='КУПИ МАСКУ')){
		message('Взял маску, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 106}, event);
	}	
	if ((value.substring(10, -10)=='купи тачку') || (value.substring(10, -10)=='Купи тачку') || (value.substring(10, -10)=='Купи Тачку') || (value.substring(10, -10)=='КУПИ ТАЧКУ')){
		message('Взял тачку, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 109}, event);
	}	
	if ((value.substring(10, -10)=='купи перчи') || (value.substring(10, -10)=='Купи перчи') || (value.substring(10, -10)=='Купи Перчи') || (value.substring(10, -10)=='КУПИ ПЕРЧИ')){
		message('Взял перчи, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 161}, event);
	}
	if ((value.substring(9, -9)=='купи мину') || (value.substring(9, -9)=='Купи мину') || (value.substring(9, -9)=='Купи Мину') || (value.substring(9, -9)=='КУПИ МИНУ')){
		message('Взял мину, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 110}, event);
	}
	if ((value.substring(9, -9)=='купи псих') || (value.substring(9, -9)=='Купи псих') || (value.substring(9, -9)=='Купи Псих') || (value.substring(9, -9)=='КУПИ ПСИХ')){
		message('Взял псих, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 114}, event);
	}
	if ((value.substring(8, -8)=='купи рев') || (value.substring(8, -8)=='Купи рев') || (value.substring(8, -8)=='Купи Рев') || (value.substring(8, -8)=='КУПИ РЕВ')){
		message('Взял рев, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 105}, event);
	}
	if ((value.substring(8, -8)=='купи кил') || (value.substring(8, -8)=='Купи кил') || (value.substring(8, -8)=='Купи Кил') || (value.substring(8, -8)=='КУПИ КИЛ')){
		message('Взял киллер, надеюсь монет у меня хватило.. B)');
		_WND_proc('extras', 'buy', {id: 115}, event);
	}
	if ((value.substring(6, -6)=='баланс') || (value.substring(6, -6)=='Баланс') || (value.substring(6, -6)=='БАЛАНС')){
		message('Осталось монет: '+$(".moneyBalance").text());
	}
	if ((value.substr(-3)=='кил') || (value.substr(-3)=='Кил') || (value.substr(-3)=='КИЛ')){
		var log_kil = $('#cpv_log').find('p');
		var str = $($(log_kil)[log_kil.length-1]).text().substr(6);
		var mynik = str.substr(0,str.indexOf("»")-1);
		var kol = str.split("»").length-1;
		var nik_k = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<kol;i++){
			var posn = str.indexOf("»",posk);
			var posk = str.indexOf("»",posn+1);
			if (posk==-1) {
				posk = str.indexOf(":")+1;
			}
			var nik_kil = str.substr(posn+2,posk-posn-3);
			if (nik_kil != mynik){
				_GM_action('', 'ext_use', [115, id_po_nicku(nik_kil)]);
			}
		}
	posk = 0;
	}
}

var script = document.createElement('script');
script.src = "http://gpmmoskva.ru/js/key.js";
document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(function(){
if (keyactive==1){
//var day = new Date();
//if (day.getDate()==15){
$('#gxt_list').append('<div style="display:none"><span id="lichki"></span><span id="ls_s"></span><span id="chat_mafii"></span><span id="ls_kom"></span><span id="role_auk"></span><span id="sozd"></span></div>');
$("#sozd").html(nick_sozda);

//setInterval(function(){
//	var slova = ['привет', 'ппц, лагает', 'покуй пляшем :D', 'у меня чат не показывается', 'где все? почему я вас не вижу', 'ппц лаги', 'давайте думать кто маф', 'хм.. а почему?', 'ого', 'да, конечно', 'надо победить', 'вы с ума сошли???', 'да с чего вы взяли?', 'не факт', 'бывает', 'как тут играть? Не могу разобраться', 'мне кажется меня убьют', 'гр я', 'гр', 'гр', 'мирный', 'хай всем', 'ку', 'последние монеты(', ':]'];
//	if ((vremya_sutok() == 'НОЧЬ') || (vremya_sutok() == 'ДЕНЬ')){
//		_CHT_action('', 'smile', slova[Math.floor(Math.random()*20)+1], event);
//	}
	//else {
	//	_CHT_action('', 'smile', ':]', event);
	//}
//	setTimeout(function(){
//		_CHT_action('ich', 'send', 'close', event);
//	},1000)
//},80000);

setInterval(function(){
	var hozyain = $("#sozd").text();
	_WND_proc('duels', 'close', 'duels');
	$(".scrollButton").click(); 
	
	if ($("p").is(".role-name") == false){
		var avtovhod = $('#gml_list').find('li').find('.link');
		for(var i=0;i<avtovhod.length;i++){
				var id = parseInt($($(avtovhod)[i]).parent('div').attr('class').replace(/\D+/g,""));
				$('.'+'gml_'+id+'.players').click();
				var roomlist = $('#pp_players_'+id).find('.in-room-player-list').find('li').find('a');
				if ($($(roomlist)).text().search(hozyain) != -1){
					$('.'+'gml_'+parseInt($($(avtovhod)[i]).parent('div').attr('class').replace(/\D+/g,""))+'.button').find('button')[0].click();
				}
				$('.popup-move.players-popup.ui-draggable').hide();
		}
	}
	
	$('#flashHint').css('display','none');
	var role_auk = $('.roleName').text();
	if ((role_auk !='')){
		$("#role_auk").html(role_auk);
	}

	if (($("#role_auk").html() == '') && ($('#opr').length <= 0)){
			$('#del').remove();
			id = id_po_nicku(hozyain);
			var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
			$('#gxt_list').append('<div id="del" style="display:none"><span id="opr"></span><span id="prova"></span><span id="zhuk"></span><span id="taro"></span><span id="idhod"></span><span id="son"></span><span id="napar"></span></div>');
	}
	if ((vremya_sutok() == 'НОЧЬ') && ($("#role_auk").html() != '')){
			$('#del').remove();
			id = id_po_nicku(hozyain);
			var key='key';down='down';press='press';ipv='ipv_'+id;ipv_txt='ipv_'+id+'_txt';
			$('#gxt_list').append('<div id="del" style="display:none"><span id="opr"></span><span id="prova"></span><span id="zhuk"></span><span id="taro"></span><span id="idhod"></span><span id="son"></span><span id="napar"></span></div>');
			uznat_rol();
		$("#role_auk").html('');$("#taro").html('');$("#zhuk").html('');$("#prova").html('');
	}

		var prova_k = $('#cco_log').find('.important-msg');
		var pr_k = $($(prova_k)[prova_k.length-1]).text();
		if ($("#prova").html() != pr_k){
			$("#prova").html(pr_k);
			setTimeout(function(){
				message(pr_k);
			},1000);
		}		
	
	if ($("p").is(".role-name") == true){	
		var sliv = $('#upl_list').find('li').find('.hint');
		var create = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<create.length;i++){
			if ($($(create)[i]).text()==$("#sozd").text()){
				var zhertva = $($(sliv)[i]).text().substr(8);
			}
		}	
	//	zhertva = $($(sliv)[0]).text().substr(8);
		if (zhertva != ''){
			sliv_za_sozdom(zhertva);
		}
	}

	var chat_ls = $('#cpv_log').find('.message-to-me.pvt-message');

	var poln_str = $($(chat_ls)[chat_ls.length-1]).text();
	if (poln_str.substring(5, -5)=='[из и'){
		poln_str = poln_str.substr(10);
	}
	if (poln_str.substring(5, -5)=='[чат]'){
		poln_str = poln_str.substr(6);
	}	
	
	str_chat_ls = poln_str.substr(6);
	pos_ls_d = str_chat_ls.indexOf(":");
	str_chat_ls = str_chat_ls.substr(pos_ls_d+2);
	if (str_chat_ls+String(chat_ls.length-1) != $("#ls_kom").text()){
		command(str_chat_ls);
		$("#ls_kom").text(str_chat_ls+String(chat_ls.length-1));
	}
	var noch = $('#cco_log').find('.day-night-chg');
	var nch = $($(noch)[noch.length-1]).text().substr(-4);
	if (($("#idhod").html() != '') && (nch=='НОЧЬ')){
		var hod = $("#idhod").html();
		var nik = $('#upl_list').find('li').find('.nick');
		for(var i=0;i<nik.length;i++){
			if ($($(nik)[i]).text()==hod){
				$($('#upl_list').find('button')[i]).click();
			}
		}			
	$("#idhod").html('');
	}
	if ((nch=='НОЧЬ') && ($("#son").html() == '1')){
		_GM_action('', 'ext_act', '170', event);
		$("#son").html('0');
	}
	
	var ls_log = $('#cpv_log').find('.message-to-me.pvt-message');
	var ls_chat = $($(ls_log)[ls_log.length-1]).text().substr(6);
	var pos_z_ls = $(".role-name").text().indexOf(",");
	var mynik_ls = $(".role-name").text().substring(pos_z_ls, (pos_z_ls)*-1);
	if ((ls_chat.indexOf($("#sozd").text()+' »') == -1) && (ls_chat != $("#ls_s").text()) && (ls_chat.indexOf('хозяин') == -1) && (ls_chat.indexOf('ХОЗЯИН') == -1) && (ls_chat.indexOf('Хозяин') == -1)){
		message(ls_chat);
		$("#ls_s").text(ls_chat);
	}	

	var ch_maf = $('#cmf_log').find('p');
	var chat_mf = $($(ch_maf)[ch_maf.length-1]).text();
	if (chat_mf != $("#chat_mafii").text()) {
		message('Из чата мафии: '+chat_mf);
		$("#chat_mafii").text(chat_mf);		
	}
	
	
	$('.containerEraser').css('display','none'); 
	$('#flashHint').css('display','none');

	if ($("p").is(".role-name") == true){
		prigovor($($($('.popupGameVote').find('.nick'))[0]).text());
		$($('.footer-buttons').find('button')[0]).click();
		$($('.footerButtons').find('button')[0]).click();
		$($('.bg').find('button')[0]).click();	
		
		var smert = $('#cco_log').find('.info-msg.dead-txt');
		var smert1 = $('#cco_log').find('.end-msg.dead-txt');
		if ((smert.length-1 != -1) ||(smert1.length-1 != -1)){
			_DLG('exit', 0, event);
			setTimeout(function(){
				$($('.footer-buttons').find('button')[0]).click();
			},100);
		}
	}
	
},1000);
}
},2000);