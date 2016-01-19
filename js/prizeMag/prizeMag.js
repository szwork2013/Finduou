var plan = {};//挂载对象
var public = {};//变量挂载
public.reg = {};//挂载正则
public.aid = getaId()//挂载活动ID
$(function(){
	if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
	{
		window.location.href = 'index.html'
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
	plan.getAll();
	//confirm('内有名单确认删除？')
	////input cache
	/*var iCache = {};
	iCache.name = '';
	iCache.award = '';
	iCache.total = '';
	iCache.sponsor = '';*/

	
	public.reg.total = /^(^[1-9])?[0-9]$/;
	public.reg.lReg = /<+/g;
	public.reg.gReg = />+/g;
	public.reg.reverseLt = /(&lt;)+/g;
	public.reg.reverseGt = /(&gt;)+/g;
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
		if($('#total-input').val()<=20&&$('#total-input').val()>0&&public.reg.total.test($('#total-input').val())){
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
			public.addA = $('#name-input').val().replace(public.reg.gReg,'&gt').replace(public.reg.lReg,'&lt');
			public.addB = $('#award-input').val().replace(public.reg.gReg,'&gt').replace(public.reg.lReg,'&lt');
			public.addC = $('#total-input').val()
			public.addD = $('#sponsor-input').val().replace(public.reg.gReg,'&gt').replace(public.reg.lReg,'&lt');
			public.addE = '';
			plan.append()//ajax 添加
			//$('#addLayer').css('zIndex',-100);
			//plan.addFill()
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
	//////修改表格内容
	
	public.holder = ''//占位符 记录单元格之前的内容
	$('tbody').delegate('.n1,.n2,.n3,.n4', 'click', function(event) {
		public.holder = $(this).find('p').html()

		//var oInp = $(this).find('input');

		$(this).find('p').hide();
		$(this).find('input').val($(this).find('p').html().replace(public.reg.reverseLt,'<').replace(public.reg.reverseGt,'>')).show().focus();
	});
	$('tbody').delegate('input', 'click', function(event) {
		event.stopPropagation();
	});
	$('tbody').delegate('input', 'blur', function(event) {
		var onoff = true;
		//对是否修改进行判断，同时转移字符处理
		if($(this).val()==''){
			$(this).siblings('.text').html(public.holder).show();
			$(this).hide();	
		}else if($(this).val()==public.holder.replace(public.reg.reverseLt,'<').replace(public.reg.reverseGt,'>')){
			$(this).hide();	
			$(this).prev().show();
		}else{//分支判断
			if($(this).attr('class')=='aName'){
				if($(this).val().length>10){
					alert('奖项名称长度1-10个字')
					onoff = false;
				}
			}else if($(this).attr('class')=='award'){
				if($(this).val().length>30){
					alert('奖品名称长度1-30个字')
					onoff = false;
				}
			}else if($(this).attr('class')=='number'){
				if($(this).val()<=20&&$(this).val()>0&&public.reg.total.test($(this).val())){
					//$(this).next().hide();	
				}else{
					alert('奖品个数大于0小于20')
					onoff = false;
				}

			}else if($(this).attr('class')=='sponsor'){
				if($('#sponsor-input').val().length>30){
					alert('赞助商名称长度1-30个字')
					onoff = false;
				}
			}

			if(onoff){

				$(this).siblings('.text').html($(this).val().replace(public.reg.gReg,'&gt').replace(public.reg.lReg,'&lt')).show();
				$(this).hide();

				public.updateA = $(this).parents('tr').find('.n1').find('p').html();
				public.updateB = $(this).parents('tr').find('.n2').find('p').html();
				public.updateC = $(this).parents('tr').find('.n3').find('p').html();
				public.updateD = $(this).parents('tr').find('.n4').find('p').html();

				var rid = strdecode($(this).parents('tr').attr('data-id'))
				plan.update(rid);
			}else{
				$(this).focus();
			}
			//$(this).siblings('.text').html($(this).val().replace(public.reg.gReg,'&gt').replace(public.reg.lReg,'&lt')).show();
		}

	});

	//////cancel删除操作
	$('tbody').delegate('.remove-it', 'click', function(event) {
		var This = $(this)
		//$(this).parents('tr').remove();
		//alert(public.data.Head.length-1-This.parents('tr').index())
		//alert(This.parents('tr').index())
		var rid = strdecode($(this).parents('tr').attr('data-id'))
		plan.delete(rid,This)
	});


})





////初始化函数
plan.init = function(){
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':public.aid},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			$('#fix').html("<a href='mActivity.html?aid="+data.Head[0].id+"'><img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"'></a>")
			$('#activity-title').html("<a href='mActivity.html?aid="+data.Head[0].id+"'>"+strdecode(data.Head[0].title)+"</a>")
			$('#create-time').html("<span>创建时间：</span><span>"+strdecode(data.Head[0].create_time).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].create_time).split(' ')[1]+"</span>")
			$('#address').html("<span>活动地点：</span><span>"+strdecode(data.Head[0].place)+"</span>")
			$('#actor-number').html("<span>报名人数：</span><a href='participater.html?aid="+data.Head[0].id+"'><span>"+strdecode(data.Head[0].join_number)+"</span></a>")
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
		data: {'activity_id':public.aid},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			public.data = data;//拷贝一份用于删除验证
			//console.log(data.Head.length);
			for(var i=0;i<data.Head.length;++i)
			{
				//console.log(strdecode(data.Head[i].name))
				public.addA = strdecode(data.Head[i].name);
				public.addB = strdecode(data.Head[i].prize);
				public.addC = strdecode(data.Head[i].number);
				public.addD = strdecode(data.Head[i].sponsor);
				public.addE = strdecode(data.Head[i].winners);
				plan.addFill(data.Head[i].id);
			}
			
		}

	})
	.fail(function() {

	})
}

//////插入数据
plan.append = function(){
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/Insert?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':public.aid,'photo':'','name':public.addA,'prize':public.addB,'number':public.addC,'sponsor':public.addD,'USER':'','TOKEN':strdecode(getCookie('token'))},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			plan.addFill(strencode(data.id));
			var obj = {'activity_id':public.aid,'id':data.id,'name':public.addA,'prize':public.addB,'number':public.addC,'sponsor':public.addD,'winner':''}
			public.data.Head.push(obj);
			//console.log(data)
		}

	})
	.fail(function() {

	})
}
///////修改数据
plan.update = function(rid){//row id
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/Update?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':rid,'activity_id':public.aid,'photo':'','name':public.updateA,'prize':public.updateB,'number':public.updateC,'sponsor':public.updateD,'USER':'','TOKEN':strdecode(getCookie('token'))},
	})
	.done(function(data) {
		//console.log(public.aid);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//alert(2)
		}

	})
	.fail(function() {

	})
}

////////////删除数据
plan.delete = function(rid,This){//row id
	var str = public.data.Head[public.data.Head.length-1-This.parents('tr').index()].winners;
	if(str!='')
	{
		if(confirm('有人你删除不？')){
			alert('有种')
			//This.parents('tr').remove();
		}else{
			return false;
		}
	}
	//console.log(1)
	$.ajax({//先查看抽奖名单有人没人
		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/Delete?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':rid,'USER':'','TOKEN':strdecode(getCookie('token'))},
	}).done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			public.data.Head.splice(public.data.Head.length-1-This.parents('tr').index(),1)
			This.parents('tr').remove();
			//console.log('---')
			for(var i=public.data.Head.length-1;i>=0;--i)
			{
				console.log(strdecode(public.data.Head[i].name))
			}
			
		}

	})
	.fail(function() {

	})
}
//添加填充
plan.addFill = function(id){
	//console.log(1);
	var oTr = $("<tr data-id='"+id+"'></tr>");
	var td1 = "<td class='n1'><div class='cell'><p class='text'>"+public.addA+"</p><input type='text' class='aName' /></div></td>"
	var td2 = "<td class='n2'><div class='cell'><p class='text'>"+public.addB+"</p><input type='text' class='award' /></div></td>"
	var td3 = "<td class='n3'><div class='cell'><p class='text'>"+public.addC+"</p><input type='text' class='number' /></div></td>"
	var td4 = "<td class='n4'><div class='cell'><p class='text'>"+public.addD+"</p><input type='text' class='sponsor' /></div></td>"
	var td5 = "<td class='n5'><div class='cell'><p class='list not' title='"+public.addE+"'>"+public.addE+"</p></div></td>"
	var td6 = "<td><div class='cell-wrap'><a class='lottery' href='#'>抽奖</a><button class='remove-it' href='#'>删除</button></div></td>"
	oTr.html(td1+td2+td3+td4+td5+td6);
	oTr.appendTo('tbody');
	$('#addLayer').find('input').val('').end().find('span').hide();
	$('#addLayer').css('zIndex',-100);

}
