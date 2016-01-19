var plan = {};//请求挂载对象
var common = {};//变量挂载对象
var Data = {};//存放获取的数值
common.aid = getaId();
//?aid=YzYxN2Q3YzQ0ZTcyNDY0Nzg5MDkxZjhjOGY3YTUxYTg=
//console.log(common.aid);
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
		$('.m-layer').hide();
		$('.fill-wrap').next().hide();
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
			obj.question = common.qTitle;
			if(common.qType=='填空'){
				obj.options = ''
			}else{
				//obj.options =  plan.qFormat(num,common.qOptions);
				obj.options =  plan.qFormat(common.qType,common.qOptions);
				
			}
			if(obj.options===false){
				alert('选项中不要夹杂空选项')
				return false;
			}
			
			plan.insert(obj);
			plan.recover();
		}
	})

	////问题选项查看
	$('#main-table').delegate('.fill-wrap', 'click', function(event) {
		//$('.fill-wrap').filter($(this)).next().hide();
		$('.fill-wrap').next().hide();
		$(this).next().toggle();
		event.stopPropagation();
	});
	////修改层
	$('#main-table').delegate('.modify', 'click', function(event) {
		$('.modify').parent().next().hide();
		$(this).parent().next().show();

		var target = Data.Head[$(this).parents('tr').index()];//找到目标源

		var question = target.question;
		//console.log(question);

		$(this).parents('tr').find('.question-title').val(question);

		if($(this).parents('tr').attr('data-type')!='填空'){
			var str = ''
			var arr = target.options.split('&')
			for(var i=0;i<arr.length;++i){
				if(i==arr.length-1){
					str += arr[i];
				}else{
					str += arr[i]+'\n';
				}
			}
			$(this).parents('tr').find('.t1').val(str);
		}
		event.stopPropagation();
	});

	$('#main-table').delegate('.m-layer', 'click', function(event) {
		event.stopPropagation();
	});

	///////修改保存
	$('#main-table').delegate('.save', 'click', function(event) {
		event.stopPropagation();
		var oInp = $(this).parents('.m-layer').find('.question-title');
		var t1 =$(this).parents('.m-layer').find('.t1') ;//alert(0)
		var qType = Data.Head[$(this).parents('tr').index()-1].type;
		var rid = strdecode(Data.Head[$(this).parents('tr').index()-1].id)
		//alert(qType)
		/////进行问题标题检验
		if(oInp.val()==''){
			oInp.next().html('问题标题不可为空').show();
			return false;
		}else if(oInp.val().length>30){

			oInp.next().html('问题长度1~30个字').show();
			return false;
		}
		common.qTitle = oInp.val();
		/////////问题选项检验
		if(t1.val()==''&&qType!='填空'){
			alert('请填写答案选项')
			return false;
		}
		if(qType!='填空'){//单选题//多选题
			///首先用换行符进行分隔
			var reg = /\n/g
			common.qOptions = [];//初始化
			if(reg.test(t1.val())){
				common.qOptions =  t1.val().split('\n')
			}else{
				common.qOptions.push(t1.val())
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

			obj.type = qType;
			obj.id = rid;
			obj.title = common.qTitle;
			if(qType=='填空'){
				var num = 0;
			}else if(qType=='单选'){
				var num = 1;
			}else if(qType=='多选'){
				var num = 2;
			}
			if(qType=='填空'){
				//plan.qFormat(num,common.qOptions)
				obj.options = ''
			}else{
				obj.options =  plan.qFormat(num,common.qOptions);

			}
			
			if(obj.options===false){
				alert('选项中不要夹杂空选项')
				return false;
			}
			plan.update(obj,$(this).parents('tr'));
			//$(this).parents('tr').find('.text').html('aaa')
			$(this).parents('.m-layer').hide();
			
		}
		
	});



	////删除
	$('#main-table').delegate('.cancel', 'click', function(event) {
		plan.delete(strdecode($(this).parents('tr').attr('data')),$(this));
		//54d0be7955654b78a9416dc563658542
		//$(this).parents('tr').remove();
		event.stopPropagation();
	});

	//上移下移操作
	$('#main-table').delegate('.up', 'click', function(event) {
		//alert($(this).parents('tr').index())
		if($(this).parents('tr').index()==0){
			return false;
		}else{
			plan.up($(this).parents('tr').attr('data-odr'),$(this).parents('tr'))
		}
		//event.stopPropagation($(this));
	});
	$('#main-table').delegate('.down', 'click', function(event) {
		if($(this).parents('tr').index()==$('tbody').children('tr').length-1){
			return false;
		}else{
			//alert()
			plan.down($(this).parents('tr').attr('data-odr'),$(this).parents('tr'))
		}
		//event.stopPropagation($(this));
	});
})

plan.init = function(){
	$('#return').attr('href',"mActivity.html?aid="+strencode(common.aid)+"")
	$('#sub').attr('href',"mActivity.html?aid="+strencode(common.aid)+"")
	$.ajax({//获得活动的主要信息
		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':common.aid},
	})
	.done(function(data) {
		//console.log(data);
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//console.log(data);
			for(var i=0;i<data.Head.length;++i){
				data.Head[i].title = strdecode(data.Head[i].question);
				data.Head[i].question = strdecode(data.Head[i].question)
				data.Head[i].type = strdecode(data.Head[i].type);
				data.Head[i].options=strdecode(data.Head[i].options)
				data.Head[i].odr = strdecode(data.Head[i].odr);
				plan.fill(data.Head[i],data.Head[i].id);
			}
			Data = data;
		}

	})
	.fail(function() {

	})
}

plan.insert = function(obj){//插入操作
	$.ajax({//获得活动的主要信息
		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/Insert?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':common.aid,'type':obj.type,'question':obj.title,'options':obj.options,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//console.log(data);
			obj.odr = Data.Head.length+1;
			obj.id = data.id;
			Data.Head.push(obj)
			//console.log(Data);
			plan.fill(obj,strencode(data.id));
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
			console.log(qOptions[i]);
			if(i==qOptions.length-1){
				if(qOptions[i]==''){
					str = str.substring(0,str.length-1)
					//console.log(str);
					break;
				}else{
					str += qOptions[i];//此处做了最后一行的处理！！！最后一行可能是空
				}
				
			}else{
				if(qOptions[i]==''){
					return false;
				}
				str += qOptions[i]+'&';
			}
		}
		//console.log(str);
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
	//common.reg.lReg = /<+/g;
	//common.reg.gReg = />+/g;
	var oTr = $('<tr></tr>').addClass('fill-unit').attr('data',id);
	oTr.attr('data-odr',obj.odr)
	oTr.attr('data-type',obj.type)
	var n1 = $('<td></td>').addClass('n1').html("<div class='cell'><p class='text'>"+obj.title.replace(common.reg.lReg,'&lt').replace(common.reg.gReg,'&gt')+"</p></div>");
	var n2 = $('<td></td>').addClass('n2');
	var n3 =$('<td></td>').addClass('n3');
	var oP = '' 
	var mLayer = ''
	if(obj.type=='填空'){
		n2.html("<div class='cell'><input type='text' class='inp'></div>");
	}else if(obj.type=='单选'){
		var arr = obj.options.split('&');
		for(var i=0;i<arr.length;++i)
		{
			oP+="<li>"+arr[i].replace(common.reg.lReg,'&lt').replace(common.reg.gReg,'&gt')+"</li>"
		}
		n2.html("<div class='cell'><div class='drop'><div class='wrap fill-wrap'>\
			<span class='select-show' onselectstart='return false'>填空</span><a href='javaScript:;'></a></div>\
			<ul class='drop-list'>"+oP+"</ul></div></div>");

	}else if(obj.type=='多选'){
		var arr = obj.options.split('&');
		for(var i=0;i<arr.length;++i)
		{
			oP+="<label><input name='noName' type='checkbox' class='fl' /><span class='fl'>"+arr[i].replace(common.reg.lReg,'&lt').replace(common.reg.gReg,'&gt')+"</span></label>"
		}
		n2.html("<div class='cell'><form class='form'>"+oP+"</form></div>");
	}

		//////构建修改层
		if(obj.type=='填空'){
			mLayer = "<div class='m-layer clear'><div class='m-first fl'><label class='fl'>类型</label><span class='fl'>填空</span></div>\
			<div class='m-second fl'><div class='fl'><label class='fl'>问题</label><input type='text' class='question-title' /><span class='error'>问题长度1~30个字</span></div></div>\
			<div class='m-fourth fl'><button class='save'>修改</button></div></div>"
		}else if(obj.type=='单选'){
			mLayer =  "<div class='m-layer clear'><div class='m-first fl'><label class='fl'>类型</label><span class='fl'>单选</span></div>\
			<div class='m-second fl'><div class='fl'><label class='fl'>问题</label><input type='text' class='question-title' /><span class='error'>问题长度1~30个字</span></div></div>\
			<div class='m-third fl'><div class='fl'><label class='fl'>选项</label><textarea class='t1' class='fl'></textarea><span class='error fr tip' >每行一个选项，不能超过10字</span></div></div>\
			<div class='m-fourth fl'><button class='save'>修改</button></div></div>"
		}else if(obj.type=='多选'){
			mLayer =  "<div class='m-layer clear'><div class='m-first fl'><label class='fl'>类型</label><span class='fl'>多选</span></div>\
			<div class='m-second fl'><div class='fl'><label class='fl'>问题</label><input type='text' class='question-title' /><span class='error'>问题长度1~30个字</span></div></div>\
			<div class='m-third fl'><div class='fl'><label class='fl'>选项</label><textarea class='t1' class='fl'></textarea><span class='error fr tip' >每行一个选项，不能超过10字</span></div></div>\
			<div class='m-fourth fl'><button class='save'>修改</button></div></div>"
		}

		n3.html("<div class='cell'><div class='btn-group'><div class='btn-wrap'>\
			<button class='up'>上移</button><button class='modify'>修改</button><br><button class='down'>下移</button><button class='cancel'>删除</button>\
			</div>"+mLayer+"</div></div>")
		oTr.append(n1).append(n2).append(n3);
		oTr.appendTo('tbody');
}
plan.delete = function(id,obj){

	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/Delete?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		//common.aid
		data: {'id':id,'activity_id':common.aid,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			console.log(data);
			var index = obj.parents('tr').attr('data-odr');
			Data.Head.splice(index-1,1)

			obj.parents('tr').remove();
			for(var i=0;i<$('tbody').find('tr').length;++i){
				$('tbody').find('tr').eq(i).attr('data-odr',i+1);
				/*console.log(Data.Head[i].odr);*/
				Data.Head[i].odr = i+1;
			}

		}

	})
	.fail(function() {

	})
}
plan.update = function(obj,This){
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/Update?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'id':obj.id,'activity_id':common.aid,'type':obj.type,'question':obj.title,'options':obj.options,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//console.log(data);
			plan.finish(This,obj.type,obj)
		}

	})
	.fail(function() {

	})
}
plan.finish = function(obj,type,data){//三个参数分别是父级对象，问题类型，数据
	console.log(data);
	obj.find('.text').html(data.title)
	var oP = '';
	if(type=='单选'){

		var arr = data.options.split('&');
		for(var i=0;i<arr.length;++i)
		{
			if(arr[i] == ''){
				break;
			}
			oP+="<li>"+arr[i].replace(common.reg.lReg,'&lt').replace(common.reg.gReg,'&gt')+"</li>"
		}
		obj.find('.drop-list').html(oP);
	}else if(type=='多选'){
		var arr = data.options.split('&');
		for(var i=0;i<arr.length;++i)
		{
			if(arr[i] == ''){
				break;
			}
			oP+="<label><input name='noName' type='checkbox' class='fl' /><span class='fl'>"+arr[i].replace(common.reg.lReg,'&lt').replace(common.reg.gReg,'&gt')+"</span></label>"
		}
		obj.find('.form').html(oP)
		//n2.html("<div class='cell'><form class='form'>"+oP+"</form></div>");
	}

}
plan.up = function(odr,obj){//上移
	//console.log(odr);
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/RowMove?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		//common.aid
		data: {'action':'up','activity_id':common.aid,'odr':odr,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			//console.log(data);
			// for (var i = 0; i < Data.Head.length; i++) {
			// 	console.log(Data.Head[i].odr);
			// }
			
			//呼唤odr 同时位置变化
			var odr = obj.attr('data-odr');
			obj.attr('data-odr',obj.prev().attr('data-odr'))
			obj.prev().attr('data-odr',odr)

			

			//内部的odr也要进行互换
			console.log(Data);
			Data.Head[odr-1].ord = odr;
			Data.Head[odr-2].ord = obj.attr('data-odr')
			//
			var index  = Data.Head[odr-1];//当前对象
			Data.Head[odr-1] = Data.Head[odr-2]
			Data.Head[odr-2] = index;
			
			// for (var i = 0; i < Data.Head.length; i++) {
			// 	console.log(Data.Head[i].odr);
			// }
			console.log(Data);
			obj.insertBefore(obj.prev());
		}

	})
	.fail(function() {

	})
}
plan.down = function(odr,obj){//下移
	$.ajax({//获得活动的主要信息

		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/RowMove?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'action':'down','activity_id':common.aid,'odr':odr,'USER':'','TOKEN':''},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	
			console.log(data);
			var odr = obj.attr('data-odr');
			obj.attr('data-odr',obj.next().attr('data-odr'))
			obj.next().attr('data-odr',odr)
			obj.insertAfter(obj.next());

			//内部的odr也要进行互换
			Data.Head[odr].ord = odr;
			Data.Head[odr-1].ord = obj.next().attr('data-odr')
			//
			var index  = Data.Head[odr-1];//当前对象
			Data.Head[odr-1] = Data.Head[odr]
			Data.Head[odr] = index;
		}

	})
	.fail(function() {

	})
}