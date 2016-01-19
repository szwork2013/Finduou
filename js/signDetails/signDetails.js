var plan = {};//挂载对象
var public = {};//变量挂载
public.aid = getaId()//挂载活动ID
public.uid = getuId()
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

	$('#return').attr('href','participater.html?aid='+strencode(public.aid))
	///////initialization
	plan.init(public.uid,public.aid);
	plan.info(public.uid,public.aid)
	//plan.getAll();
})
plan.init = function(uid,aid){

	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_question_answerWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':aid,'creater':uid,'pageSize':'','pageIndex':''},
		})
		.done(function(data){

			plan.fill(data);
		})
		.fail(function(data){

		})
}
plan.info = function(uid,aid){
	//console.log(uid);
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_joinsWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':aid,'user_id':uid,'pageSize':'20','pageIndex':'1'},
		})
		.done(function(data){
			//console.log(data);
			$('#info-table').find('td').eq(0).html('姓名：'+strdecode(data.Head[0].join_nickname))
			$('#info-table').find('td').eq(1).html('性别：'+strdecode(data.Head[0].join_sex))
			$('#info-table').find('td').eq(2).html('学校：'+strdecode(data.Head[0].university_name))
			$('#info-table').find('td').eq(3).html('手机号：'+strdecode(data.Head[0].phone_number))
		})
		.fail(function(data){

		})
}
plan.fill = function(data){

	for(var i=0;i<data.Head.length;++i){
		//var arr = strdecode(data.Head[i].answer);
		//console.log(strdecode(data.Head[i].creater));
		if(strdecode(data.Head[i].type)!='多选'){
			var type = strdecode(data.Head[i].type)=='填空'?'completed':'radio'
			var oTr = $('<tr>').addClass(type);
			
			var oTd = $('<td>').html("<p class='question'>"+strdecode(data.Head[i].question)+"</p>");
			var oTd2 =  $('<td>').html("<p>"+strdecode(data.Head[i].answer)+"</p>");
			oTr.append(oTd).append(oTd2);
			oTr.appendTo('tbody');
		}else{

			var oTr = $('<tr>');
			var oTd = $('<td>').html("<p class='question'>"+strdecode(data.Head[i].question)+"</p>");
			var arr = strdecode(data.Head[i].answer).split('&');
			var str = ''
			for(var j=0;j<arr.length;++j){
				str+="<p>"+arr[j]+"</p>"
			}
			var oTd2 =  $('<td>').html(str);
			oTr.append(oTd).append(oTd2);
			oTr.appendTo('tbody');
		}
	}
}
