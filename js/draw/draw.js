var plan = {};
var public = {};
public.timer = null;
var data = {};
var result = [];
var lucker = [];
public.aid = getaId();
public.wid = getwId();
public.flag = true;
var num = 0;
///http://120.26.212.237/FindUouWs1/circle_activity_prize_winnerWs.asmx
$(function(){
	plan.info();
	plan.init();
	$('#operate-btn').on('click', function(event) {

		//$(this).attr('disabled',true).css('background','#999').html('')
		if(public.flag){
			$(this).html('停止');
			plan.start(num);
		}else{
			plan.stop();
			$(this).html('抽奖');
		}
		public.flag = !public.flag;

		event.preventDefault();

	});
	$('#save').click(function(event) {
		/* Act on the event */
	});
})
plan.info = function(){//奖项信息
	//console.log(public.wid);
	$.ajax({

		url:basic.topAddress+basic.subAddress+'circle_activity_prizeWs.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':public.wid},
	})
	.done(function(data) {

		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	

			
		}

	})
	.fail(function(data) {
		alert(data)
		window.location.href = 'index.html'
	})
}
plan.init = function(){
	$.ajax({//先查看抽奖名单有人没人
		url:basic.topAddress+basic.subAddress+'circle_activity_signinWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		//data: {'activity_id':public.aid,'user_id':'','pageSize':'','pageIndex':''},
		data: {'activity_id':'','user_id':'','pageSize':'','pageIndex':''},
	}).done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			
			$('#name').html(strdecode(data.Head[0].signin_nickname))
			for(var i=0;i<data.Head.length;++i){
				result.push(strdecode(data.Head[i].signin_nickname))
			}
		}

	})
	.fail(function() {

	})
}
plan.start = function(){
	clearInterval(public.timer);
	public.timer = setInterval(function(){
		if(num==result.length-1){
			num=0
		}else{
			num++;
		}
		console.log(result[num]);
		$('#name').html(result[num]);
		
	},30)
}
plan.stop = function(){
	clearInterval(public.timer);
	var oDd = $('<dd></dd>').html('<p>'+result[num]+'</p>')
	result.splice(num,1)
	oDd.appendTo($('#sub-dl'))
	num = 0;
}
plan.insert = function(){
	
}