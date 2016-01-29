var plan = {};//用于挂载函数
var data = {};//用于挂载数据
var public = {};
public.aid = getaId();
public.index = 0;//索引
public.total = 0;//数据总数;

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
		data: {'activity_id':public.aid,'user_id':'','on_wall':'1','type':'互动','pageSize':'','pageIndex':''},
	})
	.done(function(obj) {
		
		data = obj;
		//console.log(data);
		public.total = data.Head.length;
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
		plan.fresh();//进行刷新请求
		plan.freshSign();//刷新签到人数
		if(public.total<=3){
			//if($('#main-list').children('li').length<3){}
				plan.append();
				return false;

		}else{
			//plan.fill();
			if($('#main-list').children('li').length<3){
				plan.append();
				return false;
			}else{
				plan.fill();
			}
			
		}
		///////运动是后执行的 ，如果不满足运动条件则不执行
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
		data: {'activity_id':public.aid,'user_id':'','on_wall':'1','type':'互动','pageSize':'','pageIndex':''},
	})
	.done(function(obj) {
		//console.log(obj);
		data =obj;
		public.total = data.Head.length;
	})
	.fail(function() {
		console.log("error");
	})
}
plan.fill = function(){//填充信息

	for(var i=0;i<3;++i){
		if(public.index>=data.Head.length){
			public.index = 0;
		}
		var oLi =  $("<li class='unit clear'></li>");
		var c1 = $("<div class='head-img fl'></div>");
		//console.log(strdecode(data.Head[public.index].id));
		//console.log(data.Head[public.index].reply_photo=='');
		if(data.Head[public.index].reply_photo==''){//头像为空，用默认头像
			//alert(1)
			//console.log(strdecode(data.Head[public.index].id));
			c1.html("<img src='img/wall/head_img.jpg'>");
		}else{
			c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[public.index].reply_photo)+"'>");
		}
		
		var c2 = $("<div class='content fl'></div>");
		var triangle = "<span class='triangle'></span>";
		c2.html(triangle);
		//console.log(data.Head[public.index]);
		if(data.Head[public.index].img!=''){
			var oImg = $('<img>').attr('src',basic.topAddress+basic.webAddress+strdecode(data.Head[public.index].img));
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
	var times = data.Head.length-$('#main-list').children('li').length>3?3:data.Head.length
	for(var i=0;i<times;++i){//此处是个bug
		if(public.index>=data.Head.length){
			public.index = 0;
		}
		var oLi =  $("<li class='unit clear'></li>");
		var c1 = $("<div class='head-img fl'></div>");
		//console.log(strdecode(data.Head[public.index].id));
		//c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[public.index].img)+"'>");
		if(data.Head[public.index].reply_photo==''){
			c1.html("<img src='img/wall/head_img.jpg'>");
		}else{
			//console.log(strdecode(data.Head[public.index].reply_photo));
			c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[public.index].reply_photo)+"'>");
		}
		var c2 = $("<div class='content fl'></div>");
		var triangle = "<span class='triangle'></span>";
		c2.html(triangle);
		if(data.Head[public.index].content==''){
			var oImg = $('<img>').attr('src',basic.topAddress+basic.webAddress+strdecode(data.Head[public.index].img));
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
			data:{'id':public.aid}
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			var title = strdecode(data.Head[0].title)
			if(title.length<20){

				$('#title').css({'fontSize':46,'lineHeight':'82px'}).html(title)
			}
			$('#title').html(title)
			$('#total').html(strdecode(data.Head[0].signin_number))
		}

	})
	.fail(function() {

	})
}
plan.freshSign = function(){
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data:{'id':public.aid}
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	

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
			data:{'content': 'finduou://finduou.com/activity/id=' + public.aid + '?'}
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