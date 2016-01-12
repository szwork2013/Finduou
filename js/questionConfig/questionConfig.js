var plan = {};//请求挂载对象
var common = {};//变量挂载对象
common.aid = getaId();
common.qType = 0;
common.qTitle = '';//存放问题
common.qOptions = []//存放问题选项;
common.reg = {};
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

		$('#nav-list').hide();
		$('#float-layer').hide();
		$('#q-type').hide();
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

	///////////初始化
	plan.init();


	///新增问题卡显示隐藏
	$('#add-btn').on('click', function(event) {
		$('#float-layer').toggle();
		$('.tip').show();
		event.stopPropagation();
	});
	$('#float-layer').click(function(event) {
		event.stopPropagation();
	});
	/////新增
	$('.wrap').click(function(event) {
		$('#q-type').toggle();

	});
	//文本域显隐
	$('#q-type').find('li').click(function(event) {
		$('.select-result').html($(this).html());
		$(this).parent().hide();
		common.qType = $(this).index();
		if($(this).index()>0){
			
			$('.third').show();
		}else{
			$('.third').hide();
		}
	});

	//保存问题
	common.reg.lReg = /<+/g;
	common.reg.gReg = />+/g;
	common.reg.reverseLt = /(&lt;)+/g;
	common.reg.reverseGt = /(&gt;)+/g;
	//common.reg.tab = /\n/
	$('#save').click(function(){
		/////进行问题标题检验
		if($('#question-title').val()==''){
			$('#question-title').next().html('问题标题不可为空').show();
			return false;
		}else if($('#question-title').val().length>30){

			$('#question-title').next().html('问题长度1~30个字').show();
			return false;
		}
		common.qTitle = $('#question-title').val();
	/////////问题选项检验
		if($('#t1').val()==''&&common.qType!=0){
			alert('请填写答案选项')
			return false;
		}
		if(common.qType!=0){//单选题//多选题
			///首先用换行符进行分隔
			var reg = /\n/g
			common.qOptions = [];//初始化
			if(reg.test($('#t1').val())){
				common.qOptions =  $('#t1').val().split('\n')
			}else{
				common.qOptions.push($('#t1').val())
			}
			//选项条数不能超多7条
			if(common.qOptions.length>7){
				alert('选项不能超过7条')
				return false;
			}
			///检查选项长度
			if(plan.checkLength(common.qOptions)){//长度正常不做处理
				//console.log(common.qOptions);
			}else{
				alert('选项文字长度过长!')
				return false;
			}
		}

		///////////////问题数
		if($('tbody').find('tr').length>10){
			alert('设置的问题数最多10条!');
			return false;
		}else{//检验通过 开始post插入
			var obj = {}
			if(common.qType==0){
				obj.type = '填空'
			}else if(common.qType==1){
				obj.type = '单选'
			}else if(common.qType==2){
				obj.type = '多选'
			}
			obj.title = common.qTitle;
			obj.options =  plan.qFormat(common.qType,common.qOptions);
			plan.insert(obj);
			plan.recover();
		}
	})
})

plan.init = function(){
	$('#return').attr('href',"mActivity.html?aid="+strencode(common.aid)+"")
	$('#sub').attr('href',"mActivity.html?aid="+strencode(common.aid)+"")
}

plan.insert = function(obj){//插入操作
	console.log(obj);
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/Insert?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':common.aid,'type':obj.type,'question':obj.title,'options':obj.options,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			console.log(data);
		}

	})
	.fail(function() {

	})
}

plan.qFormat = function(qType,qOptions){//格式化答案
	var str = '';
	if(qType==0){//如果填空题直接返回空
		return '';
	}else{//否则格式化
		for(var i=0;i<qOptions.length;++i){
			//str += qOptions[i]+'|';
			if(i==qOptions.length-1){
				str += qOptions[i];
			}else{
				str += qOptions[i]+'&';
			}
		}
		return str ;
	}
}

plan.checkLength = function(obj){//检查选项长度；
	for(var i=0;i<obj.length;++i){
		if(obj[i].length>10){

			return false;
		}
	}
	return true;
}
plan.recover = function(){//数据初始化

	$('#t1').val('');
	$('#question-title').val('');
	$('#q-type').hide();
	$('.select-result').html('填空');
	$('.third').hide();
	common.qType=0;
	$('#float-layer').hide();

}
plan.fill = function(obj,id){
	if(obj.type==0){

	}else if(obj.type==1){

	}else if(obj.type==2){

	}
}