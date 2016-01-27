var plan = {};//挂载执行的函数
var public = {};
public.timer = null;
//var data = {};
var copy = [];//人员备份
var result = [];//名字数组
var lucker = null ;//中奖者
public.aid = getaId();
public.wid = getwId();//奖项的ID
public.flag = true;
public.open = false;//该值用于防止初始化点击保存；
var num = 0;
public.all = 0;//记录全部的抽奖机会
public.chance = 0;//记录余下抽奖机会
///http://120.26.212.237/FindUouWs1/circle_activity_prize_winnerWs.asmx
$(function(){

	////init初始化
	plan.info(public);//奖项信息
	plan.init(public);//参与人员
	//plan.getWinner(public);//之前抽奖的人员列表

})
plan.ready = function(){
	$('#operate-btn').on('click', function(event) {
	public.open = true;
	if(public.flag){
		
		plan.start(num);
	}else{
		plan.stop();
		
	}

	if(copy.length!=0&&public.chance>0){
		public.flag = !public.flag;
	}
	event.preventDefault();

	});
	$('#save').click(function(event) {//保存

		if(public.flag===true&&public.chance>0&&public.open){//双层保险，一层是禁用按钮，一层是判断当前是否在抽奖的状态；
			plan.insert();
		}
		
	});
}
plan.start = function(){
	$('#save').attr('disabled',true)
	if(copy.length==0){
		alert('奖池无抽奖人员');
		$('#save').removeAttr('disabled')
		return false;
		
	}else if(copy.length==1){
		alert('奖池可抽奖人员只有1人');
	}
	if(public.chance==0){
		alert('抽奖名额已满');
		$('#save').removeAttr('disabled');
		return false;
	}
	$('#operate-btn').html('停止');
	clearInterval(public.timer);
	public.timer = setInterval(function(){
		if(num==result.length-1){
			num=0
		}else{
			num++;
		}
		//console.log(result[num]);
		$('#name').html(result[num]);
		
	},30)
}
plan.stop = function(){
	clearInterval(public.timer);
	$('#operate-btn').html('抽奖');
	//$(this).html('抽奖');
	$('#save').removeAttr('disabled')
}
plan.insert = function(){
/*	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_prize_winnerWs.asmx/Insert?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'prize_id':public.wid,'user_id':strdecode(lucker.Head.user_id),'USER':'','TOKEN':''},
	})
	.done(function(data) {

		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			var oDd = $('<dd></dd>').html('<p>'+result[num]+'</p>')
			lucker = copy.splice(num,1);//得到获奖的人员信息；同时把中奖人员从奖池中抽离；
			result.splice(num,1);
			oDd.appendTo($('#sub-dl'))
			num = 0;
			if(copy.length!=0){
				$('#name').html(copy[0])
			}else{
				$('#name').html('')
			}
			public.chance--;//抽奖次数减一次
		}

	})
	.fail(function(data) {
		alert(data)
		window.location.href = 'index.html'
	})*/
	var oDd = $('<dd></dd>').html('<p>'+result[num]+'</p>')
	lucker = copy.splice(num,1);//得到获奖的人员信息；同时把中奖人员从奖池中抽离；
	result.splice(num,1);
	oDd.appendTo($('#sub-dl'))
	num = 0;
	if(copy.length!=0){
		$('#name').html(copy[0])
	}else{
		$('#name').html('')
	}
	public.chance--;//抽奖次数减一次
}


//////////////
plan.info = function(public){//奖项信息
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
			if(data.Head.length==0){ return false;}//当无内容的时候，不做初始化
			$('#prize').html(strdecode(data.Head[0].prize))
			$('#prize-name').html(strdecode(data.Head[0].name)+'（'+strdecode(data.Head[0].number)+'个）')
			public.all = strdecode(data.Head[0].number);
			$('#sponsor').html('由&nbsp'+strdecode(data.Head[0].sponsor)+'&nbsp友情赞助');
			plan.getWinner(public);
		}

	})
	.fail(function(data) {
		alert(data)
		window.location.href = 'index.html'
	})
}
plan.init = function(public){//添加能参与抽奖的人员
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_signinWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':public.aid,'user_id':'','pageSize':'','pageIndex':''},
		//data: {'activity_id':'','user_id':'','pageSize':'','pageIndex':''},
	}).done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//console.log(data);
			//if(data.Head.length==0){ return false;}此句要保留
			//$('#name').html(strdecode(data.Head[0].signin_nickname))
			$('#name').html(0)
			for(var i=0;i<10;++i){
				//copy.push(data.Head[i]);
				var obj = {'name':i,'id':i}
				copy.push(i);
				result.push(i);
				//result.push(strdecode(data.Head[i].signin_nickname));
			}
		}

	})
	.fail(function() {

	})
}
plan.getWinner = function(public){
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_prize_winnerWs.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':public.wid},
	}).done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//if(data.Head.length==0){ return false;}

			for(var i=0;i<data.length;++i){

				var oDd = $('<dd></dd>').html('<p>'+strdecode(data.Head[i].winner)+'</p>')
				oDd.appendTo($('#sub-dl'))
			}
			//public.chance = public.all - data.length;//计算得出能抽奖的次数；
			public.chance = public.all - 1;//计算得出能抽奖的次数；
			console.log(public.chance);
			plan.ready();
		}

	})
	.fail(function() {

	})
}