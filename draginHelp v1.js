var idSozd=1028209;
var interval=0;
var tmpZhertva;
var tmpLs;
var flag;
var nick_hoz='';
$.ajax({
		async: false,
		cache: false,
		type: "POST",
		url: "/standalone/"+PAGE_goto.toString().substr(82,32)+"/DO/" + Math.random(),
		data: {method: "prf", id: idSozd},
		dataType: "json",
		success: function(data) {nick_hoz=data.arr[0]}
  })

function my_role(){
        return t_persons[(typeof pla_data['person'] != "undefined" ? pla_data['person']:0)];
}
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
                    message("в бд закончились аккаунты",1,idSozd)
                }
            }
            })
}
function opredKomand(){
    var mir = ["Гражданин", "Комиссар", "Сержант", "Доктор", "Медработник", "Смертник", "Стерва", "Вор", "Свидетель", "Дед Мороз", "Купидон", "Франкенштейн", "Гринч", "Влюблённый", "Кондитер", "Вредный зайка", "Нефритовый заяц"];
    var maf = ["Мафиози","Босс мафии", "Двуликий"];
    var man = ["Маньяк"];
    var tony = ["Жирный Тони","Подручный","Марко", "Франческа", "Розарио"];
    if(mir.indexOf(my_role())+1){
        comanda=1;
    }
    if(maf.indexOf(my_role())+1){
        comanda=2;
    }
    if(man.indexOf(my_role())+1){
        comanda=3;
    }
    if(tony.indexOf(my_role())+1){
        comanda=4;
    }
    return comanda;
}
function aVhod(nick) {
    if (!gam_id) {
        var create = $('#gml_list').find('span');
        for (var i = 0; i < create.length; i++) {
            if (nick == $($(create)[i]).text()) {
                _GM_action('gml', 'join', parseInt($($(create)[i]).parent('div').parent('li').attr('id').replace(/\D+/g, "")), event);
                break;
            }
        }
    }
}

function start(){
    if(gam_id&&flag==1&&gam_state=="play"){
        idSozd=$($("#upl_list>li")[0]).attr("id").substr(4);
         message("Я "+my_role()+" моя команда "+napar(),1,idSozd);
         flag=0; 
    }
    if(!gam_id&&gam_state!="play"){
        flag=1;
    }
    
}


function treatmentMSG(){
    var privat= $("#cco_log >.message-to-me");
    msgLast = $(privat[privat.length-1]).text();
    var nick=msgLast.split(": ")[0];
    if($(privat[privat.length-1]).is(".pvt-message")&&nick.indexOf(nick_hoz)+1){
            var msg=msgLast.split(": ")[1];
            $("#cco_log >.message-to-me").attr("class","message-from-me pvt-message");
            return  msg;
    }
    else {
        $("#cco_log >.message-to-me").attr("class","message-from-me pvt-message");
        return 0;
    }
}

function privatik(){
  var ls_log = $('#cco_log').find('.message-from-me.pvt-message');
	var ls_chat = $($(ls_log)[ls_log.length-1]).text();
    var nick = $($(ls_log[ls_log.length-1])).find('a.nick-from').text()
	if ((ls_chat != tmpLs)&&(nick!=nick_hoz)&&(nick!=my_nick)){
	   tmpLs=ls_chat;
		 message(ls_chat,1,idSozd);
	}
}

function napar(){
    var create=$("#upl_list>li").find(".ico");
    var val="";
    for(var i=0;i<create.length;i++){
        if($(create[i]).attr("title")!=""){
            nick=$(create[i]).parent().find(".nick").text();
            val=val+nick+"; ";
        }
    }
    return val;
}

function id_po_nicku(val){
    var create=$('#upl_list li');
    var nick =create.find('.nick');
    for(i=0;i<create.length;i++){
        if($(nick[i]).text()==val){
            var id =$(create[i]).attr("id").substr(4);
        }
    }
    return id;
}
function nickNormVid(val){
    val=val.replace("[@","").replace("]","");
    return val;
}

function golos(val){
     var create=$("#upl_list>li");
    for(var i=0;i<create.length;i++){
        if(val==$(create[i]).find(".nick").text()){
            _GM_action('', 'vote',2, [id_po_nicku(val), 0]);
        }
    }
}

function slivZaSozdom(){
    var zhertva=$($("#upl_list li").find(".hint")[0]).text().split(":")[1];
    if(typeof zhertva!='undefined'){
    zhertva=zhertva.replace(/\s+/g,'');
        golos(zhertva);
    }
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

function mina(){
    //if($("li").is("#gxt_110") == false || parseInt( $("#gxt_list").find("#gxt_110").attr("label"))<3){
        _WND_proc('extras', 'buy', {id: 110});
        _WND_proc('extras', 'buy', {id: 110});
        _WND_proc('extras', 'buy', {id: 110});
    //}
}
function sud(){
    if($(".popup-move").is('#pp_vte')&&$($("p .scream")[$("p .scream").length-1]).text()=="опр"){
        $(".no").click();
    }
    else $(".yes").click();
}
function message(val,mth,id){
    if(location.href.indexOf("standalone")+1){ 
	hash= PAGE_goto.toString().substr(82,32); 
	}	
    if(location.href.indexOf("vkontakte")+1){ 
	hash= PAGE_goto.toString().substr(81,32); 
	}
    _o={};
    switch(mth){
        case 1://приват
        _o["pv"] =id;
        break;
        case 2://общий чат
        _o={};
        break;
        case 3://чат мафии
        _o["mf"] = 1;
        break;
        case 4://тони
        _o["tf"] = 1;
        break;
        case 5://крик
        _o["sm"] = 1;
        break;
    }
     $.ajax({
       async: true,
       cache: false,
       type: "POST",
       url: "/standalone/" + hash + "/DO/" + Math.random(),
       data: {method: "cht_send",sd: 1,
            val: val,
            opt: _o},
       dataType: "json",
       success: function(data) {
            if (typeof data.rpx != "undefined"){
    	       RPX_data_arr.push(data.rpx);
       		}
       }
     }) 
}

function idPoryadky(val){
    if(gam_id){
    return $($("#upl_list li")[val-1]).attr("id").substr(4);}
}
function stukach(){
    var creat;
    switch(opredKomand()){
            case 2://мафы
            creat=$("#cmf_log");
            break;
            case 4://тони
           creat=$("#ctn_log");
           break;
           default:
           creat=0;
           break;
        } 
     if(creat){
    var msg='';
    for(var i=0;i<creat.length;i++){
        msg=msg+"; "+$(creat[i]).text();
    }
return msg;}
else return 0;
}

function extra(val){
    var extra = val.split(" ")[0];
    var num = val.split(" ")[1];
    switch(extra){
        case "рев":
        _GM_action('', 'ext_use', [105, idPoryadky(num)]);
        break;
        case "сон":
        _GM_action('', 'ext_act', '170');
        alert("son");
        break;
        case "удвой":
        _WND_proc('extras', 'buy', {id: 103})
        _GM_action('', 'ext_act', '103');
        break;
        case "испа":
        _GM_action('', 'ext_use', [155, idSozd]);
        break;
        case "бюр":
        _GM_action('', 'ext_use', [157, idPoryadky(num)]);
        break;
        case "магнит":
        _GM_action('', 'ext_use', [205, idPoryadky(num)]);
        break;
        case "паял":
        _GM_action('', 'ext_use', [203, idPoryadky(num)]);
        break;
        case "псих":
        _GM_action('', 'ext_use', [114, idPoryadky(num)]);
        break;
        case "биби":
        _WND_proc('extras', 'buy', {id: 109});
        break;
        case "маска":
        _WND_proc('extras', 'buy', {id: 106});
        break;
        case "дек":
        _GM_action('', 'ext_use', [104, idPoryadky(num)]);
        break;
        case "снайпер":
        _WND_proc('extras', 'buy', {id: 200});
        _GM_action('', 'ext_use', [200, idPoryadky(num)]);
        break;
        default:
        break;
    }
}

function msgZhertva(trup){
    var zhertva = '';
	var slova = ['бьем', 'мочим', 'его ночью бьем', 'выносим его нахер', 'давай его', 'его минусуем, он актив', 'бьем ее', 'крч мочим его', ' ', 'его', 'убиваем'];
	for(var i=0; i<Math.floor(Math.random()*3)+1; i++){
		zhertva = zhertva + '[@'+ trup + '] ';
	}
    return  zhertva+slova[Math.floor(Math.random()*10)+1];
}


function sliv(value){
    $($('#upl_list').find('button')[value-1]).click();
    setTimeout(function(){$($('#pp_vte').find('button')[0]).click();},400);
}

function nightHod(){
    if(gam_data['v_mode']==0&&tmpZhertva!=""){
        golos(tmpZhertva);
        tmpZhertva="";
    }
}


function comanda(val){
        if ((val == '1') || (val == '2') || (val == '3') || (val == '4') || (val == '5') || (val == '6') || (val == '7') || (val == '8') || (val == '9') || (val == '10') || (val == '11') || (val == '12') || (val == '13') || (val == '14') || (val == '15') || (val == '16') || (val == '17') || (val == '18') || (val == '19') || (val == '20')) {
		sliv(parseInt(val));
	}
    if(val.substring(3, -3)=="чат"){
        var msg = val.substr(3);
        message(msg,0)
    }
    if(val.substring(2, -2)=="лс"){
        var msg = val.substr(3);
        var num =val.split(" ")[0];
        num=num.substr(2);
        var id =idPoryadky(num);
        message(msg,1,id);
    }
    if(val.substring(4, -4)=="крик"){
        var msg = val.substr(4);
        message(msg,5)
    }
    if(val.substring(3, -3)=="ход"){
        var my_comanda=opredKomand();
        var trup = nickNormVid(val.substr(4));
        tmpZhertva=trup;
        switch(my_comanda){
            case 2://мафы
            message(msgZhertva(tmpZhertva),3);
            break;
            case 4://тони
            message(msgZhertva(tmpZhertva),4);
            break;
        } 	
    }
    if(val.substring(4, -4)=="суик"){
        _DLG('exit', 2);
    }
    if(val.substring(5, -5)=="напар"||val.substring(4, -4)=="роль"){
        message("Я "+my_role()+" моя команда "+napar(),1,idSozd);
    }
    if(val.substring(9, -9)=="купи мину"){
        mina();
        message("Купил, наверное, баланс "+$('.moneyBalance').text(),1,idSozd);
    }
    if(val.substring(6,-6)=='баланс'){
        message("Мой баланс "+$('.moneyBalance').text(),1,idSozd);
    }
    if(val.substring(5, -5)=="стучи"&&stukach()){
        message(stukach(),1,idSozd);
    }
    if(val==0){
        console.log("lol");
    }
    if(val.substring(6, -6)=="экстры"){
        message(stateExtr(),1,idSozd);
    }
    if(val.substring(6, -6)=="смена"){
        smena();
    }
    else{
        //использывания экстр
        extra(val);
    } 
}
function stateExtr(){
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
                if (id == 200){st = st + 'Снайперка - ' + kol + ' шт; '}
                if (id == 201){st = st + 'Кастет - ' + kol + ' шт; '}
                if (id == 202){st = st + 'Растяжка - ' + kol + ' шт; '}
                if (id == 203){st = st + 'Паял - ' + kol + ' шт; '}
                if (id == 204){st = st + 'Шокер - ' + kol + ' шт; '}
                if (id == 205){st = st + 'Магнит - ' + kol + ' шт; '}
                if (id == 206){st = st + 'Кандалы - ' + kol + ' шт; '}
                if (id == 207){st = st + 'Паспорт мафии - ' + kol + ' шт; '}
                if (id == 208){st = st + 'Реаниматор - ' + kol + ' шт; '}
                if (id == 220){st = st + 'Ловушка - ' + kol + ' шт; '}
                if (id == 221){st = st + 'Неведимка - ' + kol + ' шт; '}
                if (id == 222){st = st + 'Кожа - ' + kol + ' шт; '}
                if (id == 224){st = st + 'Мегашокер - ' + kol + ' шт; '}
                if (id == 225){st = st + 'Яд - ' + kol + ' шт; '}
				
			}
		}
        return st;
}
setInterval(function(){
    aVhod(nick_hoz);
    slivZaSozdom();
    nightHod();
    sud();
    //start();
    privatik();
    var comand=0;
    comand=treatmentMSG();
    if(typeof comand !== 'undefined'&&comand){
        comanda(comand);
    }
    //выход если умер
    if($(".my").find(".dead").attr("class")=="dead"||gam_state=="fin"){
         _DLG('exit', 2);
    }
},2000)