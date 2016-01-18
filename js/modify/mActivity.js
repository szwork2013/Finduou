var plan = {};//挂载函数
var public = {};//挂载变量
var iData = {};//原始数据
public.aid = getaId()
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

	///////城市
	$('.city-wrap').click(function(event) {
		$('#city-select').toggle();
		event.stopPropagation();
	});
	$('#city-select').find('li').click(function(event) {
		$('#city-select').siblings('span').html($(this).html())
	});

	//活动类型选项
	$('.wrap').click(function(event) {
		$(this).next().toggle()
		event.stopPropagation();
	});
	$('#active-type-select').find('li').click(function(event) {
		$('#active-type-select').prev().find('span').html($(this).html())
	});
	$('#active-status-select').find('li').click(function(event) {
		$('#active-status-select').prev().find('span').html($(this).html())
	});
	//upload
	$('#upbtn').click(function(event) {
		$('#upload').click()
	});
	var objImg = '';
	//var test = ''
	var data = new FormData();

	$('#upload').change(function(e){

		var reg =/[\.](jpg|gif|png|JPG|PNG|GIF|jpeg)$/  // 文件类型判断

		if(e.target.files[0].name.match(reg)==null )
		{
			alert('文件格式不正确')
			return false;
		}		

		if(e.target.files[0].size>424300000)//不能超过5M每个文件
		{
			alert('图片不能超过4M');
			return false;
		}

		var reader = new FileReader(); 
		reader.readAsDataURL(e.target.files[0]);	 
		reader.onload = function(ev)
		{ 
		     	var image = new Image()
		      	image.src = this.result;
		      	image.onload = function(){
			      	if(this.width!=900&&this.height!=500)
				{
					$('#poster-tip').html('图片尺寸900*500').show();
				}
		      		else
		      		{
		      			objImg = e.target.files[0]
		      			$('.photoframe').html(this)	;
		      			$('#poster-tip').hide()
		      			
		      		}
		      	}
		}   
						

})
/////////////////////////////////初始化
	
	plan.init();
	//console.log(aid);
	
	
	/////cancel
	$('#cancel').click(function(event) {
		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/Delete?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {id:public.aid,'USER':'','TOKEN':getCookie('token')},
		})
		.done(function() {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}
			else
			{
				alert('删除成功')
				window.location.href = 'activeList.html'
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		
	});
	//
	var reg =/[<|>]+/g;

	//submit
	//var sonoff = true;
	$('#save').click(function(event) {
		
	})
})

plan.init = function(){
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':public.aid},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}
		$('#title-input-write').val(strdecode(data.Head[0].title))
		$('#d422').val(strdecode(data.Head[0].set_date).split(' ')[0])
		$('#d242').val(strdecode(data.Head[0].set_time_s))
		$('#d243').val(strdecode(data.Head[0].set_time_e))
		$('#address-input-write').val(strdecode(data.Head[0].place))
		//var str = data.Head[0].type
		var str = strdecode(data.Head[0].type)==''?'全部':strdecode(data.Head[0].type)
		//var str2 = data.Head[0].state=='0'?'未启用':'已启用'
		$('.city-wrap').children('span').html(strdecode(data.Head[0].city))
		$('#active-type-select').prev().find('span').html(str)
		$('#active-status-select').prev().find('span').html(strdecode(data.Head[0].state))
		$('.photoframe').html("<img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[0].poster)+"' />")
		$('#activity-intro').val(strdecode(data.Head[0].content).replace(/(&nbsp)/g,' ').replace(/(&brbr&)/g,'\n'))
		$('#link').val(strdecode(data.Head[0].buy_ticket))
		$('#question').val(strdecode(data.Head[0].question));
		if(strdecode(data.Head[0].question_flag)==1){
			$('#question').attr('checked','checked');
			$('#sign-btn').attr('href','questionConfig.html?aid='+strdecode(data.Head[0].id))	
		}else{
			$('#sign-btn').hide();
		}

		objImg = strdecode(data.Head[0].poster);

		maplng = parseFloat(strdecode(data.Head[0].longitude));
		maplot = parseFloat(strdecode(data.Head[0].latitude));
		locate.lng = parseFloat(strdecode(data.Head[0].longitude));
		locate.lat = parseFloat(strdecode(data.Head[0].latitude))
		locate.address = strdecode(data.Head[0].place);
		locate.place_id = strdecode(data.Head[0].place_id);

		$('html').append($("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAslXLzbetaH41cOt6sBGsG4rW5W1FEb94&libraries=places&callback=initMap'async defer>"))
	
	})
	.fail(function() {

	})
}
plan.modify = function(){
	$('#save').attr('disabled',false)
		var onoff = false;
		if($('#title-input-write').val().length>30)
		{

			$('#title-input-write').next().html('标题过长 &nbsp &nbsp &nbsp &nbsp &nbsp').show();
			onoff = true;

		}
		else if($('#title-input-write').val()=='')
		{
			$('#title-input-write').next().html('请输入活动标题').show();
			onoff = true;

		}
/*		else if(reg.test($('#title-input-write').val()))
		{
			$('#title-input-write').next().html('非法输入 &nbsp &nbsp &nbsp &nbsp &nbsp').show();
			onoff = true;
		}*/
		else
		{
			$('#title-input-write').next().hide();
		}
		//
		if($('#d422').val()==''||$('#d242').val()==''||$('#d243').val()=='')
		{
			$('#d243').next().show();
			onoff = true;
		}
/*		else if(reg.test($('#d422').val())||reg.test($('#d242').val())||reg.test($('#d243').val()))
		{
			$('#d243').next().show();
			onoff = true;
		}*/
		else
		{
			$('#d243').next().hide();
		}
		///////////////
		if($('.city-wrap').find('span').html()=='请选择')
		{
			$('.city-wrap').css('borderColor','#f00');
			onoff = true;
		}
		else
		{
			$('.city-wrap').css('borderColor','#cacaca')
		}
		//////////////////
		if($('#address-input-write').val()=='')
		{
			$('#address-input-write').next().show();
			onoff = true;
		}
		else if(reg.test($('#address-input-write').val()))
		{
			$('#address-input-write').next().show();
			onoff = true;
		}
		else
		{
			$('#address-input-write').next().hide();
		}
		//////////////
		if($('#active-type-select').prev().find('span').html()=='请选择')
		{
			$('#active-type-select').prev().css('borderColor','#f00')

			onoff = true;
		}
		else
		{
			$('#active-type-select').prev().css('borderColor','#cacaca')
		}
		//////////status
		if($('#active-status-select').prev().find('span').html()=='请选择')
		{

			$('#active-status-select').prev().css('borderColor','#f00')
			onoff = true;
		}
		else
		{
			$('#active-status-select').prev().css('borderColor','#cacaca')
		}
		//////////////intro
		if($('#activity-intro').val()=='')
		{
			//$('#activity-intro').next().show();
			$('#activity-intro').next().html('活动介绍长度10~300字符').show();
			onoff = true;
		}
		else if($('#activity-intro').val().length>300||$('#activity-intro').val().length<10)
		{
			$('#activity-intro').next().html('活动介绍长度10~300字符').show();
			onoff = true;
		}
		else if(reg.test($('#activity-intro').val()))
		{
			$('#activity-intro').next().html("活动介绍不能含有'<'或者'>'").show();
			onoff = true;
		}
		else
		{
			$('#activity-intro').next().hide();
			str = $('#activity-intro').val()
		}
		if(reg.test($('#question').val()))
		{
			onoff = true;
			alert('报名问题不能含有非法字符')
		}

		if(onoff)
		{
			$('#save').removeAttr("disabled")
			return false;
		}
		data.append('circle_id','')
		data.append('university_id',strdecode(getCookie('uid')))
		data.append('type',$('#active-type-select').prev().find('span').html())
		data.append('state',$('#active-status-select').prev().find('span').html())
		data.append('title',$('#title-input-write').val())
		data.append('set_date',$('#d422').val())
		data.append('set_time_s',$('#d242').val())
		data.append('set_time_e',$('#d243').val())
		data.append('city',$('#city-select').siblings('span').html())
		data.append('place',locate.address)
		data.append('longitude',locate.lng)
		data.append('latitude',locate.lat)
		data.append('place_id',locate.place_id)
		data.append('content',public.content)
		data.append('number','')
		data.append('contact_flag','')
		data.append('poster','')
		data.append('fileType','PNG')
		data.append('fileBase64String',public.img)//图片
		data.append('question_flag',Flag)
		data.append('buy_ticket',$('#link').val())
		data.append('creater',strdecode(getCookie('id')))
		data.append('question',$('#question').val())
		data.append('USER',strdecode(getCookie('USER')))
		data.append('TOKEN',strdecode(getCookie('token')))
		$('#save').html('保存中').css('background','#999')

		$.ajax({
			url:basic.topAddress+basic.webAddress+'/UploadActivityPic.aspx',
			type:'POST',
			data:data,
			cache: false,
			contentType: false,		//不可缺参数
			processData: false,		//不可缺参数
			success:function(data){

				if(data.error)
				{	
					alert(data.error)
					window.location.href = 'index.html'
				}
				else
				{
					alert('修改活动成功')
					window.location.href = 'activeList.html'
					
				}
				
			},
			error:function(obj){
				alert(obj.status+'失败');
				//sonoff = true;
				$('#save').removeAttr("disabled")
			}
		});
}