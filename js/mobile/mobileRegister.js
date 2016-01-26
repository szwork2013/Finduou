var plan = {};
plan.aid = getaId();
var basic = {
    topAddress :'http://120.26.212.237',//'http://192.168.0.64',//
    subAddress : '/FindUouWs1/',
};
$(function(){
	$('#sex').find('span').on('touchstart',  function(event) {
		$('#sex').find('span').removeAttr('class')
		$(this).addClass('active')
		event.preventDefault();
	});
	plan.init();

	//委托事件
	$(document).on('touchstart', function(event) {
		/*$('.select-title').css('visibility','visible');*/
		$('.user-select').hide();
		//event.preventDefault();
		/* Act on the event */
	});

	//////单选
	$('#question-form').delegate('.select', 'touchstart', function(event) {
		$(this).find('.user-select').show().click();	
		event.stopPropagation()
	});
	$('#question-form').delegate('.user-select', 'change', function(event) {

		$(this).prev().find('span').html($(this).val());
			
		event.stopPropagation()
	});

	$('#question-form').delegate('.cp', 'touchstart', function(event) {//多选
		if($(this).attr('data')=='true'){
			$(this).attr('data',false).find('.check').remove();
		}else{
			
			var obj = $("<i class='check'>√</i>")
			$(this).attr('data',true).find('.not-check').append(obj)
		}
	});
	$('#save').on('touchstart', function(event) {
		plan.test();
		$(this).attr('disabled','true');

	});
})

plan.init = function(){
	$.ajax({//获得活动的主要信息
		url:basic.topAddress+basic.subAddress+'circle_activity_questionWs.asmx/GetAll?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {'activity_id':plan.aid},
	})
	.done(function(data) {
		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}else{	

			for(var i=0;i<data.Head.length;++i){
				plan.fill(data.Head[i])
			}
		}

	})
	.fail(function() {

	})
}
function getaId(){
	var re = /aid=[\w][^\&]+/g;
	var str = window.location.search.match(re)[0];
	str = str.substring(4)
	return  strdecode(str)
}
plan.fill = function(obj){
	//console.log(strdecode(obj.type));
	if(strdecode(obj.type)=='填空'){
		var oDiv = $('<div>').addClass('fill-unit');
		oDiv.attr('data',strdecode(obj.id));
		oDiv.attr('data-type',strdecode(obj.type))
		oDiv.html("<h3 class='fill-title'><label>"+strdecode(obj.question)+"？</label></h3><p><input type='text' class='fill-input' placeholder='答:' /></p>");
		oDiv.appendTo('#question-form')
	}else if(strdecode(obj.type)=='单选'){
		var oDiv = $('<div>').addClass('select');
		oDiv.attr('data',strdecode(obj.id))
		oDiv.attr('data-type',strdecode(obj.type))
		oDiv.html("<h3 class='select-title'><label>"+strdecode(obj.question)+"?</label><span class='answer'></span><div class='triangle-right'></div><div class='triangle-right1'></div></h3>");
		var oSel = $('<select>').addClass('user-select');
		var arr = strdecode(obj.options).split('&');
		var str = '';
		for(var i=0;i<arr.length;++i){
			str += "<option>"+arr[i]+"</option>"
		}
		oSel.html(str).appendTo(oDiv);
		oDiv.appendTo('#question-form');
	}else if(strdecode(obj.type)=='多选'){
		var oDiv = $('<div>').addClass('checkboxs');
		oDiv.attr('data',strdecode(obj.id));
		oDiv.attr('data-type',strdecode(obj.type))
		var oH = "<h3 class='checkbox-title'><label>"+strdecode(obj.question)+"?（多选）</label></h3>";
		oDiv.html(oH);
		var oWrap = $('<div>').addClass('checkbox-wrap clear');
		var arr = strdecode(obj.options).split('&');
		var str = ''
		for(var i=0;i<arr.length;++i){
			str +="<p class='fl cp' data=false><span class='not-check'></span><label>"+arr[i]+"</label></p>"
		}
		oWrap.html(str).appendTo(oDiv);
		oDiv.appendTo('#question-form');
	}

}
var nameReg = /^[\u4e00-\u9fa5]{2,8}$/;
var telReg = /^(\d){10,20}$/;
var emailReg = /^\w{2,16}@[0-9a-z]{2,10}\.[a-z]{2,5}$/i;
var answer = ''
plan.test = function(){
	
	if (nameReg.test($('#user-name').val()) == false) { 
           	alert("姓名只能使用中文!(2~8位字符)");
           	$('#save').removeAttr('disabled')
           	return false;
        	}
        	if(telReg.test($('#phone').val())==false){
        		alert("请输入10~20位数字的联系方式");
        		$('#save').removeAttr('disabled')
        		return false;
        	}
        	if($('#school').val().length>20)
	{
	    alert('学校名称不能多于20个字符');
	    $('#save').removeAttr('disabled')
	    return false;
	}
        	if(emailReg.test($('#email').val())==false)
	{
		alert('邮箱格式不规范!');
		$('#save').removeAttr('disabled')
		return false;
	}
	
	var child = $('#question-form').children('div');
	$.each(child,function(index, el) {
		//console.log(child.eq(index).attr('data'));
		if(child.eq(index).attr('data-type')=='填空'){

			var val = child.eq(index).find('.fill-input').val();
			if(val.length>20){
				alert('填空长度不能大于20');
				answer = '';
				$('#save').removeAttr('disabled')
				return false;
			}else if(val.length==0){
				alert('填空长度不能大于20');
				$('#save').removeAttr('disabled')
				answer = '';
				return false;
			}else{
				answer += child.eq(index).attr('data')+'|'+'填空|'+strencode(val)+'&'
			}
		}else if(child.eq(index).attr('data-type')=='单选'){
			var content = child.eq(index).find('.answer').html();
			if(content==''){
				alert('请选择'+child.eq(index).find('label').html());
				$('#save').removeAttr('disabled')
				answer = '';
				return false;
			}else{
				answer += child.eq(index).attr('data')+'|'+'单选|'+strencode(content)+'&'
			}
		}else if(child.eq(index).attr('data-type')=='多选'){
			var str = ''
			for(var i=0;i<child.eq(index).find('.cp').length;++i){
				str+= child.eq(index).find('.cp').eq(i).attr('data');
			}
			var reg = /true/g;
			if(reg.test(str)){
				var m = ''
				for(var i=0;i<child.eq(index).find('.cp').length;++i){//筛选答案

					//str+= child.eq(index).find('.cp').eq(i).attr('data');
					if( child.eq(index).find('.cp').eq(i).attr('data')=='true'){
						m+=child.eq(index).find('.cp').eq(i).find('label').html()+'|';
					}
				}
				m = m.substring(0,m.length-1);
				answer += child.eq(index).attr('data')+'|'+'多选|'+strencode(m)+'&'
			}else{
				alert('请选择'+child.eq(index).find('.checkbox-title').find('label').html());
				$('#save').removeAttr('disabled')
				answer = '';
				return false;
			}
		}
		
	});
	if(answer!=''){
		answer = answer.substring(0,answer.length-1);
		//answer = strencode(answer);
	}else{
		$('#save').removeAttr('disabled')
		return false;
	}
	
	basic.name = $('#user-name').val();
	basic.sex = $('.active').html();
	basic.mobile = $('#phone').val();
	basic.university = $('#school').val();
	basic.email = $('#email').val();
	basic.answer = answer;
	plan.submit(basic);
	
}
plan.submit = function(basic){

	var obj = {'activity_id':plan.aid,'answer':basic.answer,'prize_id':'','name':basic.name,'university':basic.university,'email':basic.email,'sex':basic.sex,'mobile':basic.mobile};

	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activity_joins_withoutappWs.asmx/Insert?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data:{'activity_id':plan.aid,'answer':basic.answer,'prize_id':'','name':basic.name,'university':basic.university,'email':basic.email,'sex':basic.sex,'mobile':basic.mobile},
		})
		.done(function(data){
			
			window.location.href = 'https://appsto.re/cn/TntY_.i';
			
		})
		.fail(function(data){
			$('#save').removeAttr('disabled')
		})
}