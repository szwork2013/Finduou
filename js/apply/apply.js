$(function(){
	if(getCookie('token')==''||getCookie('token')==undefined)
	{
		//alert(strdecode(getCookie('email')))
		//window.location.href = 'index.html'
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
		// removeCookie('USER')
		removeCookie('token')
		window.location.href = 'index.html'
	});


	//submit
	var onoff = true;
	var telReg = /^\d{11,20}$/
	$('#submit-btn').click(function(event) {
		//return false;
		//alert(telReg.test($('#connect-input-write').val()))
		if($('#title-input-write').val()==''||$('#title-input-write').val().length>20)
		{
			onoff = false;
			$('#title-input-write').next().show();
		}
		else
		{
			$('#title-input-write').next().hide();
		}
		if(telReg.test($('#connect-input-write').val())==false)
		{
			
			onoff = false;
			$('#connect-input-write').next().show();
		}
		else
		{
			$('#connect-input-write').next().hide();
		}
		if($('#reason-input-write').val()==''||telReg.test($('#reason-input-write').val().length>20))
		{
			onoff = false;
			$('#reason-input-write').next().show();
		}
		else
		{
			$('#reason-input-write').next().hide();
		}
		if(onoff)
		{
			$.ajax({
				url:basic.topAddress+basic.webAddress+'/UploadActivityPic.aspx',
				type:'GET',
				dataType: 'jsonp',
				data:{'':$('#title-input-write').val(),'':$('#connect-input-write').val(),'':$('#reason-input-write').val(),'':$('#require-input-write').val()},
				success:function(data){
					//console.log(data);
					if(data.error)
					{	
						alert(data.error)
						window.location.href = 'index.html'
					}
					else
					{
						alert('申请成功')
						window.location.href = 'activeList.html'
						
					}
					
				},
				error:function(obj){
					alert(obj.status+'失败');
				}
			});
		}
		else
		{
			onoff = true;
			return false;
		}
	})
})
