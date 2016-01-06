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
		$('#addLayer').hide();
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

	/////添加奖品
	$('#add').click(function(event) {
		$('#addLayer').toggle();
		event.stopPropagation();
	});

	//////tab
	var public = {};
	public.holder = ''
	$('tbody').delegate('.n1,.n2,.n3', 'click', function(event) {
		public.holder = $(this).find('p').html()
		$(this).find('p').hide();
		$(this).find('input').val($(this).find('p').html()).show().focus();
	});
	$('tbody').delegate('input', 'blur', function(event) {
		if($(this).val()==''){
			$(this).siblings('.text').html(public.holder).show()
		}else{
			$(this).siblings('.text').html($(this).val()).show();
		}
		$(this).hide();	
			
	});
})