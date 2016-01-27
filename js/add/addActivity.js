var plan = {};//挂载函数
var public = {};//挂载变量
public.img ='';//图片
public.content = '';//简介内容
public.ifConfig = false;//判断是否配置问题
var cropper = null;
$(function(){
	//http://www.htmleaf.com/jQuery/Image-Effects/201504211716.html
	if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
	{
		window.location.href = 'index.html'
	}
	plan.init();
	//top可复用
	$('#header-right').find('span').eq(2).click(function(event) {
		$('#nav-list').toggle()
		event.stopPropagation();
	});
	$(document).click(function(event) {
		$('#active-type-select').hide()
		$('#active-status-select').hide()
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
		removeCookie('uid')
		removeCookie('USER')
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


	$('#active-type-select').delegate('li', 'click', function(event) {
		$('#active-type-select').prev().find('span').html($(this).html())
	});

	$('#active-status-select').find('li').click(function(event) {
		$('#active-status-select').prev().find('span').html($(this).html())
	});

	//upload pic
	$('#upbtn').click(function(event) {

		$('#upload').click()
	});
	var objImg = '';//上传图片编码；
	
	//var isConfig = false;

	var reg =/[<>]+/g;

	$('.main-control').delegate('#upload', 'change', function(e) {

		var reg =/[\.](jpg|gif|png|JPG|PNG|GIF|jpeg)$/  // 文件类型判断

		if(e.target.files[0].name.match(reg)==null )
		{
			$('#poster-tip').html('文件格式不正确').show();
			return false;
		}		

		if(e.target.files[0].size>4194304)//不能超过5M每个文件
		{
			$('#poster-tip').html('图片不能超过4M').show();
			return false;
		}

		$('#mask').show();
		var reader = new FileReader(); 
		reader.readAsDataURL(e.target.files[0]);	 
		reader.onload = function(ev)
		{ 
			var image = new Image()
			image.src = this.result;
			image.onload = function(){
				$('#cut-box').html(this)
		      		//var image = document.getElementById('image');
		      		cropper = new Cropper(image, {
		      			aspectRatio: 9 / 5,
		      			minContainerWidth:500,
		      			minContainerHeight:500,
		      			crop: function(data) {
		      			}
		      		});
		      	}

		      }   			
		  })

	$('#cut-btn').click(function(event) {
		$('#mask').hide();

		var dataURL=cropper.getCroppedCanvas({
			width: 900,
			height: 500
		});

		var imgurl=dataURL.toDataURL("image/png",1.0);
		//console.log(imgurl)
		var image = new Image()
		image.src = imgurl;

		public.img = imgurl.split(',')[1];

		image.onload = function(){

			$('.photoframe').html(this)
		}
	});

	$('#another').click(function(event) {
		var file = $("#upload") 
		file.after(file.clone().val("")); 
		file.remove(); 

		$('#mask').hide();
	});
	//alert($("input[type='checkbox']").is(':checked'))
	$('#question').change(function(event) {//是否配置问题
		public.ifConfig=$("input[type='checkbox']").is(':checked');
	});
	//submit
	

	$('#save').click(function(event) {
		plan.submit(public);
	})
})
plan.init = function(){
	$.ajax({
		url:basic.topAddress+basic.subAddress+'dictWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'table':'dict_activity_type','val':''},
	})
	.done(function(data){
		var str = ''
		for(var i=0;i<data.Head.length;++i){
			str+="<li>"+strdecode(data.Head[i].name)+"</li>"
		}
		$('#active-type-select').html(str)
	})
	.fail(function(data){
		alert(data)
	})
}
plan.submit = function(public){
	$('#save').attr('disabled',true)

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
		/*else if(reg.test($('#d422').val())||reg.test($('#d242').val())||reg.test($('#d243').val()))
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
/*		else if(reg.test($('#address-input-write').val()))
		{
			$('#address-input-write').next().show();
			onoff = true;
		}*/
		else if(locate.lat==''&&locate.lng==''&&locate.place_id==''&&locate.address=='')
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
			//$('#activity-intro').next().show();
			$('#activity-intro').next().html('活动介绍长度10~300字符').show();
			onoff = true;
		}
/*		else if(reg.test($('#activity-intro').val()))
		{
			//$('#activity-intro').next().show();
			$('#activity-intro').next().html("活动介绍不能含有'<'或者'>'").show();
			onoff = true;
		}*/
		else
		{
			$('#activity-intro').next().hide();
			public.content = $('#activity-intro').val();
		}
		//////
		if(public.ifConfig)
		{
			var Flag = 1;
		}else{
			var Flag = 0;
		}
		/////
		if(public.img=='')
		{
			$('.core').next().html('请上传活动海报&nbsp&nbsp').show();
			onoff = true;
		}
		else
		{
			$('.core').next().hide();
		}
		///////链接
		if($('#link').val().length>30)
		{
			$('#link').next().html('链接过长 &nbsp &nbsp &nbsp &nbsp &nbsp').show();
			onoff = true;
		}
		else
		{
			$('#link').next().hide();
		}
		/////
		if(onoff)
		{
			$('#save').removeAttr("disabled")
			return false;
		}
		//console.log(public.img);
		var data = new FormData();//表单对象
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
		$('#save').html('上传中').css('background','#999')
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
					alert('添加活动成功');

					$('#save').html('添加成功').css('background','#5890ff');
					if(public.ifConfig){
						window.location.href = 'questionConfig.html?aid='+JSON.parse(data).id;
					}else{
						window.location.href = 'activeList.html'
					}	
				}
				
			},
			error:function(obj){
				alert(obj.status+'失败');
				$('#save').removeAttr("disabled").html('保存').css('background','#5890ff');
			}
		});
	}