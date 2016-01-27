$(function(){
	if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
	{
		window.location.href = 'index.html'
	}
	
	//top可复用
	$('#header-right').find('span').eq(2).click(function(event) {
		$('#nav-list').toggle()
		event.stopPropagation();
	});
	$(document).click(function(event) {
		$('#nav-list').hide()
	});
	//login-out
	//login-out
	$('#nav-list').find('li').eq(0).click(function(event) {

		window.location.href = 'index.html#resetPwd'
	});
	$('#nav-list').find('li').eq(1).click(function(event) {
		removeCookie('email');
		removeCookie('id')
		removeCookie('pwd')
		removeCookie('uid')
		removeCookie('token')
		window.location.href = 'index.html'
	});


	//submit
	var onoff = true;
	var uid = strdecode(getCookie('id'));
	var token = strdecode(getCookie('token'));
	var aid = getaId();

	var telReg = /^(\d){10,20}$/;  //手机号码正则

	function getLength(str){
		var re = /[\u4e00-\u9fa5]/g;
		return str.replace(re,'aa').length;
	}
	$('#submit-btn').click(function(event) {
		$(this).attr('disabled',true);//防止多次请求
		/////////////负责人姓名验证
		if($('#name-input').val()==''){
			$('#name-input').next().html('请输入负责人姓名').show();
			onoff = false;
		}else{
			if(getLength($('#name-input').val())>16){
				$('#name-input').next().html('姓名长度2~16字符').show();
				onoff = false;
				
			}else if(getLength($('#name-input').val())!=''&&getLength($('#name-input').val())<2){
				$('#name-input').next().html('姓名长度2~16字符').show();
				onoff = false;

			}else{
				$('#name-input').next().hide();
			}
		}
		//////////////////联系方式验证 纯数字切10~20位
		if($('#connect-input').val()==''){
			$('#connect-input').next().html('请输入联系方式').show();
			onoff = false;
		}else{
			if(telReg.test($('#connect-input').val())){
				$('#connect-input').next().hide();
			}else{
				$('#connect-input').next().html('请输入10~20位数字的联系方式').show();
				onoff = false;
			}
		}
		////////////////////申请理由验证 不能超过30字符
		if($('#reason-input').val()==''){
			$('#reason-input').next().html('请输入申请理由').show();
			onoff = false;
		}else{
			if(getLength($('#reason-input').val())>30){
				$('#reason-input').next().html('申请理由长度2~30字符').show();
				onoff = false;
				
			}else if(getLength($('#reason-input').val())!=''&&getLength($('#reason-input').val())<2){
				$('#reason-input').next().html('申请理由长度2~30字符').show();
				onoff = false;

			}else{
				$('#reason-input').next().hide();
			}
		}
		////////////////////////////具体要求验证 不能超过30字符
		if($('#require-input').val()==''){
			$('#require-input').next().html('请输入申请理由').show();
			onoff = false;
		}else{
			if(getLength($('#require-input').val())>30){
				$('#require-input').next().html('申请理由长度2~30字符').show();
				onoff = false;
				
			}else if(getLength($('#require-input').val())!=''&&getLength($('#require-input').val())<2){
				$('#require-input').next().html('申请理由长度2~30字符').show();
				onoff = false;

			}else{
				$('#require-input').next().hide();
			}
		}

		if(onoff)
		{
			$('#submit-btn').html('保存中').css('background','#999');
			$.ajax({
				url:basic.topAddress+basic.subAddress+'circle_activity_wallapplyWs.asmx/Insert?jsoncallback=?',
				type: 'GET',
				dataType: 'jsonp',
				data: {'activity_id':aid,'preside_name':$('#name-input').val(),'mobile':$('#connect-input').val(),'reason':$('#reason-input').val(),'requires':$('#require-input').val(),'creater':uid,'bgimage':'','USER':'','TOKEN':strdecode(getCookie('token'))},
			})
			.done(function(data){
				if(data.error){
					alert(data.error);
					window.location.href = 'index.html'
				}else{
					alert('提交成功，当前申请状态为：未处理，请耐心等待工作人员处理')
					$('#submit-btn').html('提交成功').css('background','#5890ff').attr('disabled',true);
					setTimeout(function(){//5s后跳转
						window.location.href = 'activeList.html'
					}, 5000);
				}
				
			})
			.fail(function(data){
				alert(data)
				$('#submit-btn').removeAttr("disabled").html('提交').css('background','#5890ff');
			})
			
		}
		else
		{
			onoff = true;
			$('#submit-btn').removeAttr("disabled").html('提交').css('background','#5890ff');
			//$(this).attr('disabled',false);
			return false;
		}
	})
})
