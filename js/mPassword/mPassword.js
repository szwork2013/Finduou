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
	/////submit
	var onoff = true;
	//$('#submit-btn').attr('disabled','true')
	$('#submit-btn').click(function(){
		$(this).attr('disabled','true');
		if($('#ipast').val()==''){
			$('#ipast').next().show();
			onoff = false;
		}else{
			$('#ipast').next().hide();
		}
		if($('#inow').val()==''){
			$('#inow').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#inow').next().hide();
		}
		if($('#resure').val()==''){
			$('#resure').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#resure').next().hide();
		}
		if($('#resure').val()!=$('#inow').val()){
			$('#inow').next().html('两次密码输入不一致').show();
			$('#resure').next().html('两次密码输入不一致').show();
			onoff = false;
		}
		else{
			if(onoff)
			{
				$('#inow').next().hide();
				$('#resure').next().hide();
			}
			
		}
		if(onoff){
			$.ajax({
				url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
				type: 'GET',
				dataType: 'jsonp',
				data: {'id':aid},
			})
			.done(function() {
				
			})
			.fail(function() {
				onoff = true;
				$('#submit-btn').attr('disabled',false)
				return false;
			})
			
		}else{
			onoff = true;
			$('#submit-btn').attr('disabled',false)
			return false;
		}
	})
})