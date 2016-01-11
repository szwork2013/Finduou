var plan = {};//用于挂载函数
var data = {};//用于挂载数据
var public = {};
public.index = 0;//索引
public.total = 0;//数据总数;
public.totalbB = 0;
var timer = null;
$(function(){
	plan.init(data);
	plan.getSignNum();
	plan.getCodePic();
})
plan.init = function(){//获得上墙评论
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':'','user_id':'','on_wall':'1','type':'互动','pageSize':'','pageIndex':''},
	})
	.done(function(obj) {
		
		data = obj;
		console.log(data);
		public.totalbB = public.total = data.Head.length;
		plan.startMove(data);
		if(data.Head.length==0){
			return false;
		}else{
			plan.append();
		}
		
	})
	.fail(function() {
		console.log("error");
	})
}
plan.startMove = function(){//循环运动
	timer = setInterval(function(){
		/*if(data.Head.length<=3){//当评论个数小于3的时候执行刷新操作即可
			
			plan.fresh();
			return false;
		}
		if(public.total-public.index<=3){//当滚动要结束时去请求
			console.log('xxxx');
			plan.fresh();
		}
		if(data.Head.length<=3){
			plan.append();
		}else{
			plan.fill();
		}
		plan.fill(data);
		//plan.fresh();*/
		if(data.Head.length<=3){//当评论个数小于3的时候执行刷新操作即可
			if(data.Head.length==0){

			}else{
				plan.append();
			}
			
			plan.fresh();
			return false;
		}else{
			plan.fresh();
			plan.fill();
		}
		$('#main-list').animate({'top':-196*3}, 1000,'swing',function(){
			//console.log(data.length);
			for(var i=0;i<=2;++i)
			{
				$(this).find('li').eq(0).remove();
				
			}
			$('#main-list').height($('#main-list').find('li').length*196)
			$(this).css('top',0)
		})
	},5000)
}
plan.fresh = function(){//更新微信墙墙
		$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_replyWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':'','user_id':'','on_wall':'1','type':'互动','pageSize':'','pageIndex':''},
	})
	.done(function(obj) {
		data =obj;
		public.total = data.Head.length;
		//console.log(data);
		//console.log(strdecode(data.Head[1].id));
		//console.log(strdecode(data.Head[2].id));	
	})
	.fail(function() {
		console.log("error");
	})
}
plan.fill = function(){//填充信息
/*	if(data.Head.length<=3){
		var k = data.Head.length-1;
		//$('#main-list').empty();
	}else{
		var k = 2;
	}*/
	for(var i=0;i<3;++i){
		if(public.index>=data.Head.length){
			public.index = 0;
		}
		var oLi =  $("<li class='unit clear'></li>");
		var c1 = $("<div class='head-img fl'></div>");
		//console.log(strdecode(data.Head[i].id));
		if(data.Head[i].img==''){
			//alert(1)
			console.log(strdecode(data.Head[i].id));
			c1.html("<img src='img/wall/head_img.jpg'>");
		}else{
			c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[i].img)+"'>");
		}
		
		var c2 = $("<div class='content fl'></div>");
		var triangle = "<span class='triangle'></span>";
		c2.html(triangle);
		if(data.Head[public.index].content==''){
			var oImg = $('<img>').attr('src',basic.topAddress+basic.webAddress+strdecode(data.Head[i].reply_photo));
			oImg.addClass('content-pic');
			oImg.appendTo(c2);
		}else{
			var oP = $("<p class='text'></p>").html(strdecode(data.Head[public.index].content));
			/*if(data.Head[public.index].content.length>31){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(1){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(1){
				oP.css({'fontSize':'','lineHeight':''})
			}*/
			oP.appendTo(c2);
		}
		oLi.append(c1).append(c2).appendTo('#main-list');
		public.index++;
		$('#main-list').height($('#main-list').find('li').length*196)
	}
	
}

plan.append = function(){//不足3个执行插入操作；多于三个执行克隆操作；
	$('#main-list').empty();
	for(var i=0;i<data.Head.length;++i){
		if(public.index>=data.Head.length){
			public.index = 0;
		}
		var oLi =  $("<li class='unit clear'></li>");
		var c1 = $("<div class='head-img fl'></div>");
		//console.log(strdecode(data.Head[i].id));
		//c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[i].img)+"'>");
		if(data.Head[i].img==''){
			//alert(1)
			c1.html("<img src='img/wall/head_img.jpg'>");
		}else{
			c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[i].img)+"'>");
		}
		var c2 = $("<div class='content fl'></div>");
		var triangle = "<span class='triangle'></span>";
		c2.html(triangle);
		if(data.Head[public.index].content==''){
			var oImg = $('<img>').attr('src',basic.topAddress+basic.webAddress+strdecode(data.Head[i].reply_photo));
			oImg.addClass('content-pic');
			oImg.appendTo(c2);
		}else{
			var oP = $("<p class='text'></p>").html(strdecode(data.Head[public.index].content));
			/*if(data.Head[public.index].content.length>31){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(1){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(1){
				oP.css({'fontSize':'','lineHeight':''})
			}*/
			oP.appendTo(c2);
		}
		oLi.append(c1).append(c2).appendTo('#main-list');
		public.index++;
		$('#main-list').height($('#main-list').find('li').length*196)
	}
	
}


/////////////////////////////////////////////////////////////////////////////////////////////////
plan.getSignNum = function(){//获得签到人数
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data:{'id':''}
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			$('#title').html(strdecode(data.Head[0].title))
			$('#total').html(strdecode(data.Head[0].signin_number))
		}

	})
	.fail(function() {

	})
}
plan.getCodePic = function(){//获得二维码
	$.ajax({

		url:basic.topAddress+basic.subAddress+'QRCodeWs.asmx/SetQRCode?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data:{'content':"document.write('window.open(http://www.hao123.com)')"}
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			var oImg = $("<img src='"+basic.topAddress+basic.webAddress+data.list[0].imgurl+"'>")
			$('#pic-frame').append(oImg)
		}

	})
	.fail(function() {

	})
}