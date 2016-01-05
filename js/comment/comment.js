var plan = {};//请求挂载对象
var common = {};//变量挂载对象
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
		$('#active-type-select').hide()
		$('#active-status-select').hide()
		$('#nav-list').hide();
		$('#city-select').hide();
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


	/*initialization*/
	//var aid = getaId()
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
	/*cache*/
	common.totalPages = 0;//总页数
	common.inow = 0;
	common.notRepeat = 0;//防止点击tab多次请求
	common.flag = 0;//标识查找内容
	plan.init()
	
	//////表格初始化
	$('#status-list').find('a').click(function(event) {
		if(common.notRepeat==$(this).index()){
			return false;
		}
		common.flag = $(this).index();//记录请求哪种类型的数据
		common.notRepeat=$(this).index();
		$(this).siblings().attr('class','');
		$(this).attr('class','active');
		var This = $(this)
		if(This.index()==1)
		{
			This.css('borderRadius',0)
		}else if(This.index()==2)
		{
			This.css('borderRadius','0 5px 0 0')
		}
		//$('#fresh').click()
		plan.init();
	});

	//删除操作
	$('tbody').delegate('.remove-it', 'click', function(event) {
		plan.cancel($(this).attr('data'))
	});


	//上墙操作
	$('tbody').delegate('.show-it', 'click', function(event) {
		$('#fresh').click()
	});

	//刷新操作
	$('#fresh').click(function(event) {
		plan.init();
	});

})

/////////////function
plan.init =  function(iFlag,iPage){//页面数据初始化

	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':'','user_id':'','pageSize':'5','pageIndex':'1'},
	})
	.done(function(data) {
		//console.log(data);
		plan.flii(data)
		if(data.Head.length!=0){
			common.totalPages = strdecode(data.Head[0].RowCount)
			$('#paging-box').jqPaginator({
				totalPages: Math.ceil(common.totalPages/5),
				visiblePages: 5,
				currentPage: 1,
				onPageChange:function(num,type){
					if(type=='init'){
					}else{
						plan.req(0,num);
					}
				}
			});
		}
		
	})
	.fail(function() {
		console.log("error");
	})
		
}
plan.req =  function(iFlag,iPage){//请求数据

		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/GetAll?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {'activity_id':'','user_id':'','pageSize':'5','pageIndex':iPage},
		})
		.done(function(data) {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}else{	
				plan.flii(data)
			}

		})
		.fail(function() {

		})
}

plan.flii = function(data){//填充方法；
	obj=data.Head;
	$('tbody').empty()
	if(obj.length==0){
		$('tbody').html("<tr><td id='none' colspan='5'><h1>暂无数据</h1></td></tr>")
		return false;
	}
	
	for(var i=0;i<obj.length;++i)
	{
		var oTr = $('<tr></tr>');
		var content = obj[i].reply_photo==''?"<div class='cell'><p>"+strdecode(obj[i].reply_photo)+"</p></div>":"<div class='cell'><img src='"+basic.topAddress+basic.webAddress+strdecode(obj[i].reply_photo)+"'></div>"
		var td1 = $('<td></td>').html(content);
		var td2 = $('<td></td>').html("<p>"+strdecode(obj[i].create_time)+"</p>");
		var td3 = $('<td></td>').html("<p>"+strdecode(obj[i].reply_nickname)+"</p>");
		var status = strdecode(obj[i].on_wall)==0?'未上墙':'已上墙';
		var color = strdecode(obj[i].on_wall)==0?'not':'already';
		var td4 = $('<td></td>').html("<p class='"+color+"'>"+status+"</p>");
		
		var btn = strdecode(obj[i].on_wall)==0?"<a class='show-it' href='javaScript:;' data='"+strdecode(obj[i].id)+"'>上墙</a><br><a class='remove-it' href='javaScript:;' data='"+strdecode(obj[i].id)+"'>删除</a>":"<a class='remove-it' href='javaScript:;' data='"+strdecode(obj[i].id)+"'>删除</a>"
		var td5 = $('<td></td>').html("<p><div class='btn-wrap'>"+btn+"</div></p>");
		oTr.append(td1).append(td2).append(td3).append(td4).append(td5);
		oTr.appendTo('tbody');
	}

}
plan.cancel = function(cid){//删除方法
	alert(cid)
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/Delete?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':cid,'USER':'','TOKEN':strdecode('MmJhYzBmMGEwZWUyNGYxM2JmYmI2ZGFiNDFmY2RlOTc=')},
	})
	.done(function(data) {
		$('#fresh').click()
	})
	.fail(function() {
		console.log("error");
	})
}
plan.upWall = function(cid){//上墙方法
	alert(cid)
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/Delete?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':cid,'USER':'','TOKEN':strdecode('MmJhYzBmMGEwZWUyNGYxM2JmYmI2ZGFiNDFmY2RlOTc=')},
	})
	.done(function(data) {
		$('#fresh').click()
	})
	.fail(function() {
		console.log("error");
	})
}