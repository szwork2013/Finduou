var plan = {};//挂载对象
var public = {};//变量挂载
$(function(){
	if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
	{
		//window.location.href = 'index.html'
	}
	
	//top可复用
	$('#header-right').find('span').eq(2).click(function(event) {
		$('#nav-list').toggle()
		event.stopPropagation();
	});
	$(document).click(function(event) {
		$('#nav-list').hide()
		$('#addLayer').css('zIndex',-100);
	});
	//login-out
	$('#nav-list').find('li').eq(0).click(function(event) {

		window.location.href = 'index.html#resetPwd'
	});
	$('#nav-list').find('li').eq(1).click(function(event) {
		removeCookie('email');
		removeCookie('id')
		removeCookie('pwd')
		removeCookie('uid')
		removeCookie('USER')
		removeCookie('token')
		window.location.href = 'index.html'
	});

	///////initialization
	plan.init();

	////input cache
	/*var iCache = {};
	iCache.name = '';
	iCache.award = '';
	iCache.total = '';
	iCache.sponsor = '';*/

	
	public.reg = /^(^[1-9])[0-9]$/
	var onoff = true;//此开关是添加项目的开关
	/////添加奖品
	$('#add').click(function(event) {
		$('#addLayer').css('zIndex',999);
		event.stopPropagation();
	});
	$('#add-btn').click(function(event) {
		//奖项名称
		if($('#name-input').val()==''){
			onoff = false;
			$('#name-input').next().html('1-10个字').show();
		}else if($('#name-input').val().length>10){
			onoff = false;
			$('#name-input').next().html('1-10个字').show();
		}else{
			$('#name-input').next().hide();
		}
		//奖品
		if($('#award-input').val()==''){
			onoff = false;
			$('#award-input').next().html('1-30个字').show();
		}else if($('#award-input').val().length>30){
			onoff = false;
			$('#award-input').next().html('1-30个字').show();
		}else{
			$('#award-input').next().hide();
		}
		//奖品个数
		if($('#total-input').val()<=20&&$('#total-input').val()>0&&public.reg.test($('#total-input').val())){
			$('#total-input').next().hide();
			
		}else{
			onoff = false;
			$('#total-input').next().html('大于0小于等于20').show();
		}
		//赞助商
		if($('#sponsor-input').val()==''){
			onoff = false;
			$('#sponsor-input').next().html('1-30个字').show();
		}else if($('#sponsor-input').val().length>30){
			onoff = false;
			$('#sponsor-input').next().html('1-30个字').show();
		}else{
			$('#sponsor-input').next().hide();
		}

		if(onoff){
			public.addA = $('#name-input').val()
			public.addB = $('#award-input').val()
			public.addC = $('#total-input').val()
			public.addD = $('#sponsor-input').val()
			plan.addFill()
		}else if($('#name-input').val()==''&&$('#award-input').val()==''&&$('#total-input').val()==''&&$('#sponsor-input').val()==''){

		}else{
			onoff = true;
			return false;
		}
		//$('#addLayer').css('zIndex',-100);
	});
	$('#cancel-btn').click(function(event) {
		$('#addLayer').css('zIndex',-100);
	});
	//阻止冒泡
	$('#addLayer').click(function(event) {
		event.stopPropagation();
	});

	/*表格内部操作*/
	//////tab
	
	public.holder = ''//占位符 记录单元格之前的内容
	$('tbody').delegate('.n1,.n2,.n3,.n4', 'click', function(event) {
		public.holder = $(this).find('p').html()
		$(this).find('p').hide();
		$(this).find('input').val($(this).find('p').html()).show().focus();
	});
	$('tbody').delegate('input', 'blur', function(event) {
		if($(this).val()==''){
			$(this).siblings('.text').html(public.holder).show()
		}else{
			$(this).siblings('.text').html($(this).val()).show();
		}
		$(this).hide();	

	});
	//////cancel
	$('tbody').delegate('.remove-it', 'click', function(event) {
		$(this).parents('tr').remove();
	});


})

////初始化函数
plan.init = function(){
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':''},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			$('#fix').html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"'>")
			$('#activity-title').html(strdecode(data.Head[0].title))
			$('#create-time').html("<span>创建时间：</span><span>"+strdecode(data.Head[0].create_time).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].create_time).split(' ')[1]+"</span>")
			$('#address').html("<span>活动地点：</span><span>"+strdecode(data.Head[0].place)+"</span>")
			$('#actor-number').html("<span>报名人数：</span><span>"+strdecode(data.Head[0].join_number)+"</span>")
			$('#activity-time').html("<span>活动时间：</span><span>"+strdecode(data.Head[0].set_date).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].set_time_s)+"-"+strdecode(data.Head[0].set_time_e)+"</span></p>")
			$('#activity-type').html("<p class='activity-type'><span>活动类型：</span><span>"+strdecode(data.Head[0].type)+"</span>")
			$('#founder').html("<span>创建者：</span><span>"+strdecode(data.Head[0].creater_name)+"</span>")
		}

	})
	.fail(function() {

	})
}
plan.getAll = function(){//获得列表信息//获得活动的主要信息
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':''},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			$('#fix').html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"'>")
			$('#activity-title').html(strdecode(data.Head[0].title))
			$('#create-time').html("<span>创建时间：</span><span>"+strdecode(data.Head[0].create_time).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].create_time).split(' ')[1]+"</span>")
			$('#address').html("<span>活动地点：</span><span>"+strdecode(data.Head[0].place)+"</span>")
			$('#actor-number').html("<span>报名人数：</span><span>"+strdecode(data.Head[0].join_number)+"</span>")
			$('#activity-time').html("<span>活动时间：</span><span>"+strdecode(data.Head[0].set_date).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].set_time_s)+"-"+strdecode(data.Head[0].set_time_e)+"</span></p>")
			$('#activity-type').html("<p class='activity-type'><span>活动类型：</span><span>"+strdecode(data.Head[0].type)+"</span>")
			$('#founder').html("<span>创建者：</span><span>"+strdecode(data.Head[0].creater_name)+"</span>")
		}

	})
	.fail(function() {

	})
}
//添加填充
plan.addFill = function(){
	var oTr = $('<tr></tr>');
	var td1 = "<td class='n1'><div class='cell'><p class='text'>"+public.addA+"</p><input type='text' class='aName' /></div></td>"
	var td2 = "<td class='n2'><div class='cell'><p class='text'>"+public.addB+"</p><input type='text' class='award' /></div></td>"
	var td3 = "<td class='n3'><div class='cell'><p class='text'>"+public.addC+"</p><input type='text' class='number' /></div></td>"
	var td4 = "<td class='n4'><div class='cell'><p class='text'>"+public.addD+"</p><input type='text' class='sponsor' /></div></td>"
	var td5 = "<td class='n5'><div class='cell'><p class='list not' title=''></p></div></td>"
	var td6 = "<td><div class='cell-wrap'><button class='lottery' href='#'>抽奖</button><button class='remove-it' href='#'>删除</button></div></td>"
	oTr.html(td1+td2+td3+td4+td5+td6);
	oTr.appendTo('tbody');
	$('#addLayer').find('input').val('').end().find('span').hide();
	$('#addLayer').css('zIndex',-100);

}
