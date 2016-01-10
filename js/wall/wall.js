var plan = {};//用于挂载函数
var data = {};//用于挂载数据
data.index = 0;//索引
data.total = 0;//数据总数
var timer = null;
$(function(){

})
plan.init = function(){
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/Update?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':rid,'activity_id':public.aid,'photo':'','name':public.updateA,'prize':public.updateB,'number':public.updateC,'sponsor':public.updateD,'USER':'','TOKEN':strdecode(getCookie('token'))},
	})
	.done(function() {
		
	})
	.fail(function() {
		console.log("error");
	})
}
plan.startMove = function(){
	if(data.length<=2){

	}
	timer = setInterval(function(){

	},4000)
}
plan.getMessage = function(){

}
plan.fill = function(){
	for(var i=0;i<2;++i){
		n++;
		if(n>data.Head.length){
			n = 0;
		}
		var oLi =  $("<li class='unit clear'></li>");
		var c1 = $("<div class='head-img fl'></div>");
		//var str = data.Head[n].content==''? data.Head[n].poster:data.Head[n].content;
		c1.html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"'>");
		var c2 = $("<div class='content fl'></div>");
		var triangle = "<span class='triangle'></span>";
		
		if(data.Head[n].content==''){
			var oImg = $('<img>').attr('src',basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster))
		}else{
			var oP = $("<p class='text'></p>").html(data.Head[n].poster:data.Head[n].content)
		}

		if(data.Head[n].content!=''){//内容自适应
			if(data.Head[n].content.length>31){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(){
				oP.css({'fontSize':'','lineHeight':''})
			}else if(){
				oP.css({'fontSize':'','lineHeight':''})
			}
		}

	}
}
/*<li class="unit clear">
						<div class="head-img fl">
							<img src="img/wall/head_img.jpg">
						</div>
						<div class="content fl">
							<span class="triangle"></span>
							<img src="img/wall/demo_1.jpg" class="content-pic">
						</div>
					</li>*/