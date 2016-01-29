var basic = {
    topAddress :'http://120.26.212.237',//'http://192.168.0.64',//
     //topAddress :'http://192.168.0.64',//
    subAddress : '/FindUouWs1/',
    webAddress:'/FindUouWeb'
};
//正则
var reg  = /^\w{2,16}@[0-9a-z]{2,10}\.[a-z]{2,5}$/i;//邮箱
//变量区
var locate = {
    'address':'','place_id':'','lat':'','lng':''
};
/////
var previewData = {}//容器
var checkData ={};//检查容器
var totalNum=0;//总条数
var nowPage=1;//当前页
//
var is = false;

var flag = false;

//map
    var maplng ;
    var maplot;

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
///////////////////////////////getByurl
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

function getNotaId(){
	var re = /aid=[\w][^\&]+/g;
	var str = window.location.search.match(re)[0];
	str = str.substring(4)
	return  str
}
//get uid
function getaId(){
	var re = /aid=[\w][^\&]+/g;
	var str = window.location.search.match(re)[0];
	str = str.substring(4)
	return  strdecode(str)
}

//get uid
function getuId(){
    var re = /uid=[\w][^\&]+/g;
    var str = window.location.search.match(re)[0];
    str = str.substring(4)
    return  strdecode(str)
}
//get path
function getPath(){
    var re = /path=[\w][^\&]+/g;
    var str = window.location.search.match(re)[0];
    str = str.substring(5)
    return  str
}
//
function getwId(){//得到奖项的id
	var re = /wid=[\w][^\&]+/g;
	var str = window.location.search.match(re)[0];
	str = str.substring(4)
	return  strdecode(str)
}


