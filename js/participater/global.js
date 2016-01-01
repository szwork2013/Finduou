var basic = {
	topAddress :'http://120.26.212.237',//'http://192.168.0.64';
	subAddress : '/FindUouWs1/'
}

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