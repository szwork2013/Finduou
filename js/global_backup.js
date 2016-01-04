<<<<<<< HEAD
var basic = {
    topAddress :'http://120.26.212.237',//'http://192.168.0.64',//
     //topAddress :'http://192.168.0.64',//
    subAddress : '/FindUouWs1/',
    webAddress:'/FindUouWeb'
};
//正则
var reg  = /^\w{2,16}@[0-9a-z]{2,8}\.[a-z]{2,5}$/i;
//变量区
var locate = {
	'address':'','place_id':'','lat':'','lng':''
};


//
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





=======

function getCookie(a){for(var b=document.cookie.split("; "),c=0;c<b.length;++c){var d=b[c].split("=");if(d[0]==a)return d[1]}}function setCookie(a,b,c){var d=new Date;d.setDate(d.getDate()+c),document.cookie=a+"="+b+";expires="+d}function removeCookie(a){setCookie(a,1,-1)}function getPage(){var a=/page=[\d]+/g,b=/\d+/g,c=window.location.search.match(a)[0];return 0==c.match(b)[0]?1:c.match(b)[0]}function getaId(){var a=/aid=[\w][^\&]+/g,b=window.location.search.match(a)[0];return b=b.substring(4),strdecode(b)}function getuId(){var a=/uid=[\w][^\&]+/g,b=window.location.search.match(a)[0];return b=b.substring(4),strdecode(b)}var basic={topAddress:"http://120.26.212.237",subAddress:"/FindUouWs1/",webAddress:"/FindUouWeb"},reg=/^\w{2,16}@[0-9a-z]{2,8}\.[a-z]{2,5}$/i,locate={address:"",place_id:"",lat:"",lng:""},previewData={},checkData={},totalNum=0,nowPage=1,is=!1,flag=!1,maplng,maplot;
>>>>>>> 579119cfd603c3106f2acdee0e2237300f62294c
