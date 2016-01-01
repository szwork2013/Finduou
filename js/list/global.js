var basic = {
    topAddress :'http://192.168.0.64',//'http://120.26.212.237'
    subAddress : '/FindUouWs1/',
    webAddress:/FindUouWeb/
};
/*定义全局变量*/
	var previewData = {}//容器
	var totalNum=0;//总条数
	var nowPage=1;//当前页
	//
	var i = false;
	var iobj = {};
	var iobj2 = {};
/*cookie operation*/
function getCookie(name)
{
	var arr = document.cookie.split('; ')
	for(var i=0;i<arr.length;++i)
	{
    		var arr2 = arr[i].split('=')

		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}
}
function setCookie(name,value,iDay)
{
	var myTime = new Date()
	myTime.setDate(myTime.getDate()+iDay);
	document.cookie = name + '=' + value +';expires='+myTime;
}
function removeCookie(name)
{
	setCookie(name,1,-1);
}

/*getpage*/
function getPage()
{
	var re = /page=[\d]+/g;
	var re1 = /\d+/g;
	var str = window.location.search.match(re)[0];
	if(str.match(re1)[0]==0)
	{
		return 1;
	}
	else
	{
		return str.match(re1)[0];
	}
	
}

        function ajax(object){
                $.ajax({
                url:basic.topAddress+basic.subAddress+'circle_activityWS.asmx/GetAll?jsoncallback=?',
                type: 'GET',
                dataType: 'jsonp',
                //data:{'circle_id':'','university_id':'','type':'','state':'','name':'','title':'','set_time_s':'','set_time_e':'','place':'','pageSize':'10','pageIndex':nowPage}
                data:object,
            }).done(function(data) {
                previewData = data;
                $('.unit-wrap').empty();
                for(var i=0;i<data.Head.length;++i)
                {
                    var obj = $('<div></div>');
                    obj.addClass('s-unit clear');
                    var a = $('<div></div>').addClass('fl').html("<figure><img src='"+basic.topAddress+basic.webAddress+data.Head[i].poster+"'></figure>")
                    var str = "<h3 class='activity-title'>"+data.Head[i].title+"</h3>\
                    <p class='create-time'><span>创建时间：</span><span>"+data.Head[i].create_time.split(' ')[0]+"</span>&nbsp<span>"+data.Head[i].create_time.split(' ')[1]+"</span></p>\
                    <p class='address'><span>活动地点：</span><span>"+data.Head[i].place+"</span></p>\
                    <p class='actor-number'><span>报名人数：</span><span>"+data.Head[i].join_number+"</span></p>\
                    <p class='activity-time'><span>活动时间：</span><span>2015/12/25</span>&nbsp<span>14:00-16:00</span></p>\
                    <p class='activity-type'><span>活动类型：</span><span>"+data.Head[i].type+"</span></p>\
                    <p class='founder'><span>创建者：</span><span>"+data.Head[i].creater+"</span></p>"
                    var b = $('<div></div>').addClass('activity-details fl').html(str)
                    var str2 = ""

                    str2+=data.Head[i].state=='已启用'?"<li>状态：<span class='can-use'>已启用</span></li>":"<li>状态：<span class='not'>未启用</span></li>"
                    console.log(str2)
                    str2+="<li class='modify'><a href='mActivity.html?aid="+strencode(data.Head[i].id)+"'>修改活动</a></li><li class='member'><a href='participate.html?aid="+strencode(data.Head[i].id)+"'>查看人员</a></li>"
                    str2+=data.Head[i].aduit_flag=='0'?"<li class='apply'><a href='apply.html?aid="+strencode(data.Head[i].id)+"'>申请背景墙</a></li>":"<li class='bg-wall'><a href='"+data.Head[i].bgwall+"'>背景墙</a></li>"
                    str2+="<li class='preview'><a href='javaScript:;' data='"+i+"'>预览</a></li>"
                    var c =$('<ul></ul>').addClass('activity-operate fr');
                    var d = $("<a href='javaScript:;' data="+data.Head[i].id+">删除</a>").addClass('cancle-unit');
                    c.html(str2)
                    obj.append(a).append(b).append(c).append(d);
                    obj.appendTo('.unit-wrap');
                }
               // alert(0)
            }).fail(function() {

            })
}