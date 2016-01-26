$(function(){
	//top
	$('#header-right').find('span').eq(2).click(function(event) {
		$('#nav-list').toggle()
		event.stopPropagation();
	});
	$(document).click(function(event) {
		$('#active-type-select').hide();
		$('#active-status-select').hide();
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
		removeCookie('token')
		window.location.href = 'index.html'
	});
	////
	$.ajax({
		url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/GetOne?jsoncallback=?',
		type:'GET',
		dataType: 'jsonp',
		//data:{'id':strdecode(getCookie('id')),'login_name':'','USER':'','TOKEN':strdecode(getCookie('TOKEN'))},
		data:{'id':'','login_name':'','USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{
			window.location.href = 'index.html'
		}
		else
		{
			$('#name').html(data.Head[0].name);
			$('#sex').html(data.Head[0].sex);
			$('#email').html(data.Head[0].email);
			$('#school').html(data.Head[0].university_id);
			$('#contact').val(data.Head[0].mobile);
		}

	})
	.fail(function() {
		console.log("error");
	})

	//var telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; 
	var telReg = /^\d{10-20}$/
	//submit
	$('#submit').click(function(event) {
		if(telReg.test($('#contact').val())&&$('#contact').val().length<=20)
		{
			$.ajax({
			url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/Update?jsoncallback=?',
			type:'GET',
			dataType: 'jsonp',
			//data:{'id':strdecode(getCookie('id')),'org_name':'','login_name':'','email':'','name':'','sex':'','university_id':'','mobile':'','USER':'','TOKEN':strdecode(getCookie('TOKEN'))},
			data:{'id':'','org_name':'','login_name':'','email':'','name':'','sex':'','university_id':'','mobile':'','USER':'','TOKEN':''},
			})
			.done(function(data) {
				alert('修改成功!')
				window.location.href = 'activeList.html'
			})
			.fail(function() {
				console.log("error");
			})
		}
		else
		{
			alert('请输入正确的手机号码!')
		}
	});
})