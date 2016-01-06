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
		$('#active-type').hide();
		$('#active-status').hide()
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
	//search
	$('#type-wrap').on('click', function(event) {
		$('#active-status').hide();
		$('#active-type').toggle();
		event.stopPropagation();
	});
	$('#status-wrap').on('click', function(event) {
		$('#active-type').hide();
		$('#active-status').toggle();
		event.stopPropagation();
	});
	$('#active-type').find('li').click(function(event) {
		$(this).parent().prev().find('span').html($(this).html())
	});
	$('#active-status').find('li').click(function(event) {
		$(this).parent().prev().find('span').html($(this).html())
	});

	/*prevent scroll*/
	var scroll = true;
	var oDiv = document.getElementById('preview-page');
	oDiv.onmousewheel = preview;
	if(oDiv.addEventListener)//兼容性处理
	{
		oDiv.addEventListener('DOMMouseScroll',preview,false);
	}
	function preview(ev){
		var oEvent = ev || window.event;
		var b = true;//true往上滚
		
		if(oEvent.wheelDelta)
		{
			b = oEvent.wheelDelta >0 ? true : false;
		}
		else
		{
			b = oEvent.detail>0? false : true;
		}
		
		if(b)
		{
			if(scroll)
			{
				scroll = false;
				$('.page-wrap').animate({'top':0}, 500,'swing',function(){
					scroll = true;
				})
			}
		}
		else
		{	
			if(scroll)
			{
				scroll = false;
				$('.page-wrap').animate({'top':-100}, 500,'swing',function(){
					scroll = true;
				})
			}	
		}
		if(oEvent.stopPropagation)
		{
			oEvent.stopPropagation();
		}
		return false;
	}
	////////////////////////////////main
	
	$('#check').click(function(event) {
		////
		flag = true;

		switch($('#active-type').prev().find('span').html())
		{
			case '全部':    var ss = ''; break;
			case '生活娱乐':var ss = '生活娱乐'; break;
			case '职业发展':var ss = '职业发展'; break;
		}

		switch($('#active-status').prev().find('span').html())
		{
			case '全部':var str = ''; break;
			case '已启用':var str = '已启用'; break;
			case '未启用':var str = '未启用'; break;
		}

		//记录查询信息
		checkData = {'circle_id':'','university_id':strdecode(getCookie('uid')),'type':ss,'state':str,'name':'','title':$('#title-input').val(),'set_time_s':$('#d4311').val(),'set_time_e':$('#d4312').val(),'city':'','place':$('#address-input').val(),'creater_name':$('#founder').val(),'pageSize':'10','pageIndex':1}

		$.ajax({
			url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetAllForWeb?jsoncallback=?',
			type: 'GET',
			dataType: 'jsonp',
			data:{'circle_id':'','university_id':strdecode(getCookie('uid')),'type':ss,'state':str,'name':'','title':$('#title-input').val(),'set_time_s':$('#d4311').val(),'set_time_e':$('#d4312').val(),'city':'','place':$('#address-input').val(),'creater_name':$('#founder').val(),'pageSize':'10','pageIndex':1}
		}).done(function(data) {
			if(data.error)
			{	
				alert(data.error)
				window.location.href = 'index.html'
			}
		 fill(data)
			if(data.Head.length==0)
			{	
				try{$('#paging-box').jqPaginator('destroy');}
				catch(e){}
				
				var obj = $('<div>无相关活动</div>');
				obj.addClass('s-unit clear');

				obj.css({'line-height':'260px','color':'#f00','textAlign':'center'})
				obj.appendTo('.unit-wrap');

			}
			else
			{
				totalNum = strdecode(data.Head[0].RowCount);
				$('#paging-box').jqPaginator({
				totalPages: Math.ceil(strdecode(data.Head[0].RowCount)/10),
				visiblePages: 5,
				currentPage: 1,
				onPageChange:function(num,type){

					checkData.pageIndex = num;
					if(type=='init')
					{}
					else
					{
						$('html,body').animate({scrollTop: '0px'}, 0)
						ajax2()
					}
					
				}
				});
			}




		}).fail(function() {
		})
		
	});

	//main初始化
	getAll();
function getAll(cur){
	$.ajax({
		url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetAllForWeb?jsoncallback=?',
		type: 'GET',
		dataType: 'jsonp',
		data:{'circle_id':'','university_id':strdecode(getCookie('uid')),'type':'','state':'','name':'','title':'','set_time_s':'','set_time_e':'','city':'','place':'','creater_name':'','pageSize':'10','pageIndex':1}
		//data:{'circle_id':'','university_id':'','type':'','state':'','name':'','title':'','set_time_s':'','set_time_e':'','city':'','place':'','creater_name':'','pageSize':'10','pageIndex':1}
	}).done(function(data) {

		 	fill(data)

			if(data.Head.length==0)
			{
				var obj = $('<div>无相关活动</div>');
				obj.addClass('s-unit clear');
				obj.css({'line-height':'260px','color':'#f00','textAlign':'center'})
				obj.appendTo('.unit-wrap');
				return false;
			}
			totalNum = strdecode(data.Head[0].RowCount);
			$('#paging-box').jqPaginator({
			totalPages: Math.ceil(strdecode(data.Head[0].RowCount)/10),
			visiblePages: 5,
			currentPage: 1,
			onPageChange:function(num,type){
				if(type=='init')
				{

				}
				else
				{
					$('html,body').animate({scrollTop: '0px'}, 0)
					ajax(num)
				}
				
			}
		});
	}).fail(function() {

	})
}




	//预览
	$('.unit-wrap').delegate('.preview', 'click', function(event) {
		var index = $(this).find('a').attr('data')
		
		$('.f1').find('img').attr('src',basic.topAddress+basic.webAddress+strdecode(previewData.Head[index].poster))
		$('#pre-title').html(strdecode(previewData.Head[index].title))
		$('#pre-founder').html("由<a href='javaScript:;'>"+strdecode(previewData.Head[index].creater_org_name)+"</a>发起")
		$('#pre-time').html("<span>"+strdecode(previewData.Head[index].set_date).split(' ')[0]+"</span><span>"+strdecode(previewData.Head[index].set_time_s)+"-"+strdecode(previewData.Head[index].set_time_e)+"</span>")
		$('#pre-address').html("<a href='javaScript:;'>"+strdecode(previewData.Head[index].place)+"</a>")
		$('.f3-sub').find('p').html("已报名("+strdecode(previewData.Head[index].join_number)+")")
		$('#text').html(strdecode(previewData.Head[index].content).replace(/( )/g,'&nbsp').replace(/\n/g,'<br>'))
		$('#preview-page').show();
	});
	$('#onoff').click(function(event) {
		$('#preview-page').hide();
	});

})

function fill(data){
  	previewData = data;
        $('.unit-wrap').empty();
        for(var i=0;i<data.Head.length;++i)
        {
            var obj = $('<div></div>');
            obj.addClass('s-unit clear');
            var a = $('<div></div>').addClass('fl').html("<figure><a href='mActivity.html?aid="+data.Head[i].id+"'><img src='"+basic.topAddress+basic.webAddress+strdecode(data.Head[i].poster)+"'></a></figure>")
            var str = "<a href='mActivity.html?aid="+data.Head[i].id+"'><h3 class='activity-title'>"+strdecode(data.Head[i].title)+"</h3></a>\
            <p class='create-time'><span>创建时间：</span><span>"+strdecode(data.Head[i].create_time).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[i].create_time).split(' ')[1]+"</span></p>\
            <p class='address'><span>活动地点：</span><span>"+strdecode(data.Head[i].place)+"</span></p>\
            <p class='actor-number'><span>报名人数：</span><a href='participater.html?aid="+data.Head[i].id+"'><span>"+strdecode(data.Head[i].join_number)+"</span></a></p>\
            <p class='activity-time'><span>活动时间：</span><span>"+strdecode(data.Head[i].set_date).split(' ')[0]+"</span>&nbsp<span>"+strdecode(data.Head[0].set_time_s)+"-"+strdecode(data.Head[0].set_time_e)+"</span></p>\    <p class='activity-type'><span>活动类型：</span><span>"+strdecode(data.Head[i].type)+"</span></p>\
            <p class='founder'><span>创建者：</span><span>"+strdecode(data.Head[i].creater_name)+"</span></p>"
           // console.log(data.Head[0].set_date);
            var b = $('<div></div>').addClass('activity-details fl').html(str)
            var str2 = ""
            str2+=strdecode(data.Head[i].state)=='已启用'?"<li>状态：<span class='can-use'>已启用</span></li>":"<li>状态：<span class='not'>未启用</span></li>";
            //alert(str2)
            str2+="<li class='modify'><a href='mActivity.html?aid="+data.Head[i].id+"'>修改活动</a></li><li class='member'><li class='member'><a href='participater.html?aid="+data.Head[i].id+"'>查看人员</a></li>"
            //str2+="<li class='comment'><a href='javaScript:;'>评论管理</a></li>"
          //  str2+=data.Head[i].aduit_flag=='0'?"<li class='apply'><a href='apply.html?aid="+strencode(data.Head[i].id)+"'>申请背景墙</a></li>":"<li class='bg-wall'><a href='"+data.Head[i].bgwall+"'>背景墙</a></li>"
            str2+="<li class='preview'><a href='javaScript:;' data='"+i+"'>预览</a></li>"
            var c =$('<ul></ul>').addClass('activity-operate fr');
           // var d = $("<a href='javaScript:;' data="+data.Head[i].id+">删除</a>").addClass('cancle-unit');
            c.html(str2)
            obj.append(a).append(b).append(c)//.append(d);
            obj.appendTo('.unit-wrap');
        }
}



/////////////////list
function ajax(num){

        var userData ={'circle_id':'','university_id':strdecode(getCookie('uid')),'type':'','state':'','name':'','title':'','set_time_s':'','set_time_e':'','city':'','place':'','creater_name':'','pageSize':'10','pageIndex':num}

        $.ajax({
        url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetAllForWeb?jsoncallback=?',
        type: 'GET',
        dataType: 'jsonp',
        data:userData
        //data:{'circle_id':'','university_id':'','type':'','state':'','name':'','title':'','set_time_s':'','set_time_e':'','city':'','place':'','creater_name':'','pageSize':'2','pageIndex':num}
    }).done(function(data) {
    	if(data.error)
	{	
		alert(data.error)
		window.location.href = 'index.html'
	}
      fill(data)
    }).fail(function() {

    })
}



function ajax2(){


        switch($('#active-type').prev().find('span').html())
        {
            case '全部':var s2 = ''; break;
            case '已启用':var s2 = '已启用'; break;
            case '未启用':var s2 = '未启用'; break;
        }
    switch($('#active-status').prev().find('span').html())
        {
            case '全部':var s = ''; break;
            case '已启用':var s = '已启用'; break;
            case '未启用':var s = '未启用'; break;
        }
        //记录查询信息        
        $.ajax({
            url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetAllForWeb?jsoncallback=?',
            type: 'GET',
            dataType: 'jsonp',
            data:checkData
        }).done(function(data) {
        		if(data.error)
		{	
			alert(data.error)
			window.location.href = 'index.html'
		}
                    fill(data)
        }).fail(function() {
        })
}
