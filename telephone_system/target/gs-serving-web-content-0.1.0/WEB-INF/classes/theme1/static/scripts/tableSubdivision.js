var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap="";//Выделенная запись в таблице ADSL
var page=1;//Текущая страница
var mainURL;//Поддомен
function UNblockInput(){
	$('#save').prop("disabled", false);//Разблокируем кнопку
	$('#UserInfo input').prop("disabled", false);//Разблокируем
	$('#UserInfo select').prop("disabled", false);//Разблокируем
}

function blockInput(){
	$('#save').attr('disabled', 'disabled');//Заблокируем кнопку
	$('#UserInfo input').attr('disabled', 'disabled');//Заблокируем
	$('#UserInfo select').attr('disabled', 'disabled');//Заблокируем
}

//Отправка запроса на получение данных-> получение результата запровс -> отображение полученных данных
function loadADSLTable(elem){
	$.get(mainURL + "/subdivision/subdivision_info?name="+encodeURIComponent(document.getElementById("ads_name_").value)+'&elem='+encodeURIComponent(elem)+"&code="+encodeURIComponent(document.getElementById("subdiv_code_").value),function(data,status){
		var elem2 = document.getElementById("ADSLList");//Таблица
		var adslList='<table border="1" id="usersTable">'+
			'<thead>'+
				'<tr>'+
					'<th id="column-header-1">Код&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
					'<th id="column-header-2">отдел&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
				'</tr>'+
			'</thead>';
			for(var i=0;i < parseInt(data.roleList.length); i++){
				if(data.roleList[i]!=zap.toString()){
					adslList+='<tbody>'+
					'<tr><td class="info">'+data.codeList[i]+'</td><td class="info">'+data.roleList[i]+'</td></tr>'+
					'</tbody>';
				}
				else{
					loadInfo(data.roleList[i],data.codeList[i]);//Запоним данными поля ввода
					adslList+='<tbody>'+
					'<tr><td id="currentCode" class="info" style="background: #cc0;">'+data.codeList[i]+'</td><td id="currentRole" class="info" style="background: #cc0;">'+data.roleList[i]+'</td></tr>'+
					'</tbody>';
				}
			}
			adslList+='</table>';
			elem2.innerHTML = adslList;
			
			
			
			
			/*
			var button_p = document.getElementById("buttonList");
			var button='';
			if((data.page - 3) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 3)+'>&lt;</button>&nbsp';
			else
				if((data.page - 2) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>&lt;</button>&nbsp';
				else
					if((data.page - 1) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>&lt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&lt;</button>&nbsp';
			if(data.page - 2 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>'+(data.page - 2)+'</button>&nbsp';
			if(data.page - 1 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>'+(data.page - 1)+'</button>&nbsp';
			if(data.page > 0) button += '<button class="page-с" style="cursor:pointer; background: #0c0;" value='+(data.page)+'>'+(data.page)+'</button>&nbsp';
			if(data.page + 1 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>'+(data.page + 1)+'</button>&nbsp';
			if(data.page + 2 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>'+(data.page + 2)+'</button>&nbsp';
			if((data.page + 3) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 3)+'>&gt;</button>&nbsp';
			else
				if((data.page + 2) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>&gt;</button>&nbsp';
				else
					if((data.page + 1) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>&gt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&gt;</button>&nbsp';	
			page=data.page;
			button_p.innerHTML = button;
			*/
			
			//Создадим кнопки
			var button = document.getElementById("buttonList");
			var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
			if(data.page-2 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-2)+'">'+(data.page-2)+'</button>&nbsp;';
			if(data.page-1 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-1)+'">'+(data.page-1)+'</button>&nbsp;';
			if(data.page>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page+'">'+data.page+'</button>&nbsp;';
			if(data.page+1 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
			if(data.page+2 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
			button.innerHTML = button_p;  
			
			
			
			//Изменение ширины колонок таблицы(Переделать)
			$(function() {
		    	  var thHeight = $("table#usersTable th:first").height();
		    	  $("table#usersTable th").resizable({
		    	      handles: "e",
		    	      minHeight: thHeight,
		    	      maxHeight: thHeight,
		    	      minWidth: 40,
		    	      resize: function (event, ui) {
		    	        var sizerID = "#" + $(event.target).attr("id") + "-sizer";
		    	        $(sizerID).width(ui.size.width);
		    	      }
		    	  });
		    	});
	});
}

function loadADSLTableDel(elem){
	$.get(mainURL + "/subdivision/subdivision_info?name="+encodeURIComponent(document.getElementById("ads_name_").value)+'&elem='+encodeURIComponent(elem)+"&code="+encodeURIComponent(document.getElementById("subdiv_code_").value),function(data,status){
		var elem2 = document.getElementById("ADSLList");//Таблица
		var adslList='<table border="1" id="usersTable">'+
			'<thead>'+	
				'<tr>'+
					'<th>Код&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
					'<th>отдел&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
					'<th>&nbsp&nbsp</th>'+
				'</tr>'+
			'</thead>';
			for(var i=0;i < parseInt(data.roleList.length); i++){
				adslList+='<tbody>'+
					'<tr><td class="info">'+data.codeList[i]+'</td><td class="info">'+data.roleList[i]+'</td><td class="del"></td></tr>'+
				'</tbody>';
			}
			adslList+='</table>';
			elem2.innerHTML=adslList;
			
			
			
			/*
			var button_p = document.getElementById("buttonList");
			var button='';
			if((data.page - 3) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 3)+'>&lt;</button>&nbsp';
			else
				if((data.page - 2) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>&lt;</button>&nbsp';
				else
					if((data.page - 1) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>&lt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&lt;</button>&nbsp';
			if(data.page - 2 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>'+(data.page - 2)+'</button>&nbsp';
			if(data.page - 1 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>'+(data.page - 1)+'</button>&nbsp';
			if(data.page > 0) button += '<button class="page-с" style="cursor:pointer; background: #0c0;" value='+(data.page)+'>'+(data.page)+'</button>&nbsp';
			if(data.page + 1 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>'+(data.page + 1)+'</button>&nbsp';
			if(data.page + 2 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>'+(data.page + 2)+'</button>&nbsp';
			if((data.page + 3) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 3)+'>&gt;</button>&nbsp';
			else
				if((data.page + 2) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>&gt;</button>&nbsp';
				else
					if((data.page + 1) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>&gt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&gt;</button>&nbsp';	
			page=data.page;
			button_p.innerHTML = button;*/
			
			//Создадим кнопки
			var button = document.getElementById("buttonList");
			var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
			if(data.page-2 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-2)+'">'+(data.page-2)+'</button>&nbsp;';
			if(data.page-1 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-1)+'">'+(data.page-1)+'</button>&nbsp;';
			if(data.page>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page+'">'+data.page+'</button>&nbsp;';
			if(data.page+1 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
			if(data.page+2 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
			button.innerHTML = button_p;
	});
}

//Загрузка данных
function loadInfo(str,code){
	var elem6 = document.getElementById("UserInfo");//Таблица
	
	
	elem6.innerHTML=''+
	'<div>Выбранное отдел:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div>Код отдела:</div><br/>'+
			'<div><input style=" width:400px" type="text" id="c_Name" value="'+code+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div">Наименование отдела:</div><br/>'+
			'<div><input style=" width:400px" type="text" id="adsl_Name" value="'+str+'"></input></div>'+
			'<br/>'+
		'</div>'+
		'<div>'+
			'<div id="save_div"><button id="save" style="cursor:pointer">Сохранить</button></div>'+
		'</div>'+
	'</div>';
	/*
	elem6.innerHTML=''+
	'<div>Данные отдел:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Код подразделения:</div>'+
			'<div class="informationR" id="cname"><input type="text" id="c_Name" size="28" value="'+code+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Наименование подразделения:</div>'+
			'<div class="informationR" id="fname"><input type="text" id="adsl_Name" size="28" value="'+str+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL"></div>'+
			'<div class="informationR" id="save_div"><button id="save" style="cursor:pointer">Сохранить</button></div>'+
		'</div>'+
	'</div>';*/
}

//При загрузке документа заполним таблицу
$(document).ready(function() {
	//Вычисление поддомена
	var ch = 0;
	var ref = window.location.href;
	var path = window.location.pathname;
	for(var i = ref.length - 1; i > 0; i--){
		if(ref[i] == '/') { ch = i; break;}
	}
	mainURL = ref.substring(0, ch);
	
	
	
	loadInfo("","");
	blockInput();
	loadADSLTable(1);
});

//Обработка нажатия на кнопку удалить
$(document).on('click','#btn',function(){
	var elem = document.getElementById("menu_knopki");//Кнопка
	var elem3 = document.getElementById("ADSLList");//Таблица
	if(flag==0){
		blockInput();
		flag=1;
			elem.innerHTML ='&nbsp;'+
			'<button  id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Подтвердить удаление</button>';
			loadADSLTableDel(page);
	}
	else{
		if(document.getElementById("adsl_Name").value!=''){
			blockInput();
		}
		flag=0;
			elem.innerHTML ='&nbsp;'+
			'<button id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Удалить</button>';
		
			//Инициализируем удаление выделенных строк
			//Подготовим данные
			var event = {
					// Получаем текст из всех указанных элементов в виде массива выборкой
					zp : [].map.call(document.getElementsByClassName("info"), function(el){
					    return el.textContent;
					}),
					sv : [].map.call(document.getElementsByClassName("del"), function(el){
					    return el.textContent;
					})
			};
			
			//Сформируем список параметров для запроса с учётом записей отмченных пользователем
			var param = "";
			for(var i=0; i<event.zp.length; i++) {
				if(event.sv[i] == "x")
					if(param!="")
						param+="," + event.zp[i]
					else
						param+=event.zp[i]
			}
			if(param!=''){
			//Отправим запрос на удаление
			$.get(mainURL + "/subdivision/subdivision_del?name=" + encodeURIComponent(param) ,function(data,status){
				if (!(status == "success")) {
		    		  //обработать ошибку
		    		  alert( status + ': ' + statusText ); // пример вывода: 404: Not Found
		    		  //Оповестим об ошибке коммуникации
		    		  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("c_Name").value);
					  var elem6 = document.getElementById("save_div");
					  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Ошибка: ' + status + '</p>';
		    		}
		    	else {
		    		  //Вывести результат
		    		  var rsp = data;
		    		  if(rsp.toString() == "Delete success"){
		    			  //Оповестим об успехе сохранения
		    			  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("c_Name").value);
		    			  var elem6 = document.getElementById("save_div");
		    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#005500">Удаление успешно</p>';
		    		  }
		    		  else{
		    			  //Оповестим об ошибке сохранения
		    			  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("с_Name").value);
		    			  var elem6 = document.getElementById("save_div");
		    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Процесс удаления завершился ошибкой</p>';
		    		  }
		    		}
				blockInput();
				loadADSLTable(page);
			});
		}
		else
			loadADSLTable(page);
	}
});

//Обработка нажатия на кнопку с номером страницы
$(document).on("click", ".page-с", function (){
	if(flag==0)
		loadADSLTable($(this).attr("value"));
	else
		loadADSLTableDel($(this).attr("value"));
});

	//Обработка кликов по таблице->колонка удаления
    $(document).on("click", "#usersTable tbody tr td.del", function() {
    	//Если кликнули в режиме удаления
    	if(flag==1){
    		if($(this).text()=='') 
    			$(this).text(function(index, text){
    				text = 'x';
    				return text;
    			});
    		else
        		$(this).text(function(index, text){
        			text = '';
                    return text;
        		});
    	}
    });
    
    //Обработка нажатия кнопки поиск
    $(document).on("click", "#poisk", function() {
    	loadInfo("","");
    	blockInput();
    	zap="";
    	if(flag==0)
    		loadADSLTable(1);
    	else
    		loadADSLTableDel(1);
    });

  //Обработка нажатия кнопки сохранить
    $(document).on("click", "#save", function() {
    	//Инициализируем сохранение
    	var xhr = new XMLHttpRequest();
    	var params = 'name=' + encodeURIComponent(document.getElementById("adsl_Name").value) +
    	  '&oldName=' + encodeURIComponent(zap) ;
    	xhr.open("GET", mainURL + '/subdivision/subdivision_update?' + params, false);
    	xhr.send();
    	if (xhr.status != 200) {
    		  // обработать ошибку
    		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    		  //Оповестим об ошибке коммуникации
    		  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("c_Name").value);
			  var elem6 = document.getElementById("save_div");
			  //elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Сервер не отвечает</p>';
			  alert('Сервер не отвечает');
    		}
    	else {
    		  // вывести результат
    		  var rsp = xhr.responseText;
    		  if(rsp.toString() == "Save success"){
    			  //Оповестим об успехе сохранения
    			  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("c_Name").value);
    			  var elem6 = document.getElementById("save_div");
    			  //elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#005500">Сохранение успешно</p>';
    			  alert('Сохранение успешно');
    		  }
    		  else{
    			  //Оповестим об ошибке сохранения
    			  loadInfo(document.getElementById("adsl_Name").value,document.getElementById("c_Name").value);
    			  var elem6 = document.getElementById("save_div");
    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Запись уже существует</p>';
    			  alert('Запись уже существует');
    		  }
    		}
    	zap=document.getElementById("adsl_Name").value;
    	if(flag==0)
    		loadADSLTable(page);
    	else
    		loadADSLTableDel(page);
    });
    
    $(document).on("click", "#usersTable tbody tr td.info", function() {
    	if(flag==0){    		
    		zap=$(this).text();
    		loadADSLTable(page);
    		//alert(document.getElementById("currentCode").innerHTML,document.getElementById("currentRole").innerHTML);  		
    		//loadInfo(code,sd);//Вызов перенесён в loadADSLTable 
    		UNblockInput();    		
    	}
    });
      
  //Обработка нажатия кнопки создать
    $(document).on("click", "#create", function() {
    	if(!($("#dialog").dialog("isOpen")))
    		$("#dialog").dialog('open');
    	else
    		$("#dialog").dialog('close');
    });
    
    //Обработка кнопки ввод
    $(document).on("click", "#vvod", function() {
    	if(document.getElementById("adsl_").value!=""){
    		$.get(mainURL + "/subdivision/subdivision_create?name=" + encodeURIComponent(document.getElementById("adsl_").value)+"&code=" + encodeURIComponent(document.getElementById("code_").value),function(data,status){
    			var resp_vvod = document.getElementById("response_vvod");
    			if(data == "success")
    				//resp_vvod.innerHTML='<p style="color:#005500">Вставка нового подразделения успешно завершена</p>';
    				alert('Вставка нового отдела успешно завершена');
    			else
    				if(data == "entry more then zero")
    					//resp_vvod.innerHTML='<p style="color:#550000">Такой 123деление уже есть в базе</p>';
    					alert('Такой отдел уже есть в базе');
    				else
    					//resp_vvod.innerHTML='<p style="color:#550000">Ошибка коммуникации</p>';
    					alert('Ошибка коммуникации');
    		loadADSLTable(page);
        });
    	}
    	else{
    		var resp_vvod = document.getElementById("response_vvod");
    		//resp_vvod.innerHTML='<p style="color:#550000">Заполните все поля</p>';\
    		alert('Заполните все поля');
    	}
    });