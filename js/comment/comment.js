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
	/*$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':1},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	

			$('#fix').html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"'>")
			$('#activity-title').html("<h3 class='activity-title'>"+strdecode(data.Head[0].title)+"</h3>")
			$('#create-time').html("<span>创建时间：</span><span>"+strdecode(data.Head[0].create_time).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].create_time).split(' ')[1]+"</span>")
			$('#address').html("<span>活动地点：</span><span>"+strdecode(data.Head[0].place)+"</span>")
			$('#actor-number').html("<span>报名人数：</span><span>"+strdecode(data.Head[0].join_number)+"</span>")
			$('#activity-time').html("<span>活动时间：</span><span>"+strdecode(data.Head[0].set_date).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].set_time_s)+"-"+strdecode(data.Head[0].set_time_e)+"</span></p>")
			$('#activity-type').html("<p class='activity-type'><span>活动类型：</span><span>"+strdecode(data.Head[0].type)+"</span>")
			$('#founder').html("<span>创建者：</span><span>"+strdecode(data.Head[0].creater_name)+"</span>")


			$('#paging-box').jqPaginator({
				totalPages: 10,
				visiblePages: 5,
				currentPage: 1,
				onPageChange:function(num,type){
					checkData.pageIndex = num;
					if(type=='init'){

					}
				}
			});
		}

	})
	.fail(function() {

	})*/
	/*cache*/
	var totalPages = 0;
	var inow = 0;
	var notRepeat = 0;//防止多次请求
	//////表格初始化
	$('#status-list').find('a').click(function(event) {
		if(notRepeat==$(this).index()){
			return false;
		}
		notRepeat=$(this).index()
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
	});

	//删除操作
	$('tbody').delegate('.remove-it', 'click', function(event) {
		
	});


	//上墙操作
	$('tbody').delegate('.show-it', 'click', function(event) {
		$('#fresh').click()
	});

	//刷新操作
	$('#fresh').click(function(event) {
		if($('.active').index()==0){
			alert(0)
		}else if($('.active').index()==1){
			alert(1)
		}else{
			alert(2)
		}
	});


	function flii(data){//填充方法；
		obj=data.Head;
		if(obj.length==0){
			//$('#none').show();
			$('tbody').html("<tr><td id='none' colspan='5'><h1>暂无数据</h1></td></tr>")
			return false;
		}
		$('tbody').empty()
		for(var i=0;i<obj.length;++i)
		{
			var oTr = $('<tr></tr>');
			var content = obj[i].poster==''?"<div class='cell'><p>"+strdecode(obj[i].poster)+"</p></div>":"<div class='cell'><img src='"+basic.topAddress+basic.webAddress+strdecode(obj[i].poster)+"'></div>"
			var td1 = $('<td></td>').html("<div class='cell'><img src='"+basic.topAddress+basic.webAddress+strdecode(obj[i].poster)+"'></div>");
			var td2 = $('<td></td>').html("<p>"+strdecode(obj[i].poster)+"</p>");
			var td3 = $('<td></td>').html("<p>"+strdecode(obj[i].creater_name)+"</p>");
			var status = strdecode(obj[i].status)==0?'未上墙':'已上墙';
			var color = strdecode(obj[i].status)==0?'not':'already';
			var td4 = $('<td></td>').html("<p class='"+color+"'>"+status+"</p>");
			
			var btn = strdecode(obj[i].status)==0?"<a class='show-it' href='#'>上墙</a><br><a class='remove-it' href='#'>删除</a>":"<a class='remove-it' href='#'>删除</a>"
			var td5 = $('<td></td>').html("<p><div class='btn-wrap'>"+btn+"</div></p>");
			oTr.append(td1).append(td2).append(td3).append(td4).append(td5);
			oTr.appendTo('tbody');
		}

	}

	function planA(num){
		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {'id':aid},
		})
		.done(function(data) {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}else{	

			}

		})
		.fail(function() {

		})
	}

	function planB(num){
		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {'id':aid},
		})
		.done(function(data) {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}else{	
				
			}
			
		})
		.fail(function() {

		})
	}
	function planC(num){
		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {'id':aid},
		})
		.done(function(data) {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}else{	
				
			}
			
		})
		.fail(function() {

		})
	}



})