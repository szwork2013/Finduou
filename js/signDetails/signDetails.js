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
	//plan.getAll();
})
plan.init = function(uid,aid){
	$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activity_question_answerWs.asmx/GetAll?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {'activity_id':aid,'creater':uid,'pageSize':'','pageIndex':''},
		})
		.done(function(){
			
		})
		.fail(function(data){
			alert(data)
			$(this).attr('disabled',false);
		})
}
