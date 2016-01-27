var m1 = angular.module('FinduouApp',['ngSanitize','navBar','myService','tm.pagination']);
//引入插件要记得依赖模块!!!!!!!!

///////过滤器
m1.filter('base64',function(){//base64过滤器
	return function(str){
		return strdecode(str)
	}
});
m1.filter('split',function(){
	return function(str,num){
		return strdecode(str).split(' ')[num]
	}
})
m1.filter('class',function(){
	return function(str){
		if(strdecode(str)=='已启用'){
			return 'can-use';
		}else{
			return 'not';
		}
		
	}
})
m1.filter('wall',function(){
	return function(flag,operate){//flag判断是否申请了；操作那一个dom
		
		if(strdecode(flag)=='0'){
			if(operate=='apply'){
				return 'display:block';
			}else{
				return 'display:none';
			}
		}else{
			if(operate=='wall'){
				return 'display:block';
			}else{
				return 'display:none';
			}
		}
		
	}
})
m1.filter('preview',function(){
	return function(str){
		return strdecode(str).replace(/( )/g,'&nbsp').replace(/\n/g,'<br>')	
	}
})


////逻辑区
m1.controller('main',['$scope','$q','$filter','getData',function($scope,$q,$filter,getData){
	////////////cookie
	$scope.setCookie=function(name,value,iDay){
		var myTime = new Date()
		myTime.setDate(myTime.getDate()+iDay);
		document.cookie = name + '=' + value +';expires='+myTime;
	},
	$scope.getCookie=function(name){
		var arr = document.cookie.split('; ')
		for(var i=0;i<arr.length;++i)
		{
			var arr2 = arr[i].split('=')

			if(arr2[0]==name)
			{
				return arr2[1];
			}
		}
	},
	$scope.removeCookie=function(name){
		$scope.setCookie(name,1,-1);
	}
	////////////////
	var iToken =  $filter('base64')($scope.getCookie('token'))
	if(iToken==''||iToken==undefined||iToken==-1){
		window.location.href = 'index.html'
	}

	/*$scope.basic = {
    topAddress :'http://120.26.212.237',
    subAddress : '/FindUouWs1/',
	webAddress:'/FindUouWeb'};*/
    ////请求字段区
	$scope.type = '全部';//活动类型
	$scope.state = '全部'//活动状态
	$scope.menu1Show = false;
	$scope.menu2Show = false;
	$scope.term1 = {
		topAddress :'http://120.26.212.237',
    	subAddress : '/FindUouWs1/',
		webAddress:'/FindUouWeb',
		title:'',
		type:'',
		start:'',
		end:'',
		place:'',
		state:'',
		founder:''
	};//原始空值；
	//alert($filter('base64')($scope.getCookie('uid')))
	if($filter('base64')($scope.getCookie('uid'))==0){//super admin
		$scope.term1.uid = ''
	}else{
		$scope.term1.uid =$filter('base64')($scope.getCookie('uid'))
	}

	$scope.term2 = {
		topAddress :'http://120.26.212.237',
    	subAddress : '/FindUouWs1/',
		webAddress:'/FindUouWeb',
		title:'',
		type:'',
		start:'',
		end:'',
		place:'',
		state:'',
		founder:''
	};//term用于缓存

	///
	$scope.result = {};//请求的结果；
	///
	$scope.appear = function(str,$event){//菜单出现
		if(str=='type'){
			$scope.menu1Show = !$scope.menu1Show;
			$scope.menu2Show = false;
		}else{
			$scope.menu2Show = !$scope.menu2Show;
			$scope.menu1Show = false;
		}
		$event.stopPropagation();
	}
	$scope.disappear = function(str){//菜单消失
		$scope.menu1Show = false;
		$scope.menu2Show = false;
	}
	$scope.assignment = function(flag,str,$event){//活动类型判断
		if(flag){
			if(str==''){
				$scope.term2.type = '';
				$scope.type = '全部'
			}else{
				$scope.term2.type = str;
				$scope.type = str;
			}
		}else{
			if(str==''){
				$scope.term2.state = '';
				$scope.state = '全部';
			}else{
				$scope.term2.state = str;
				$scope.state = str;
			}	
		}
	}

	/////////
	$scope.inquery = function(){//查询赋值操作
		$scope.term2.start = document.getElementById('d4311').value;
		$scope.term2.end = document.getElementById('d4312').value;
		for(var i in $scope.term2){
			$scope.term1[i] = $scope.term2[i]
		}
			var result = getData.getAll($scope.term1,1);//查询
			result.then(function(data){
			$scope.result = data;
	                $scope.all = strdecode(data.Head[0].RowCount);
	            	$scope.paginationConf = {
	                        currentPage: 1,//当前页
	                        totalItems:  $scope.all,//总数目
	                        itemsPerPage: 10,//每页展示几项
	                        pagesLength:8,
	                        perPageOptions: [10, 20, 30, 40, 50],
	                        rememberPerPage: 'perPageItems',
	                        onChange: function(){
	                                var result =  getData.getAll($scope.term1,$scope.paginationConf.currentPage)
	                                 result.then(function(data){
	                                     $scope.result = data;
	                                },function(){})

	                        }
	                    }; 
		}, function(){})
	}


 $scope.paginationConf = {};
	var result = getData.getAll($scope.term1,1);//初次请求
	result.then(function(data){
		$scope.result = data;
                $scope.all = strdecode(data.Head[0].RowCount);
            	$scope.paginationConf = {
                        currentPage: 1,//当前页
                        totalItems:  $scope.all,//总数目
                        itemsPerPage: 10,//每页展示几项
                        pagesLength:8,
                        perPageOptions: [10, 20, 30, 40, 50],
                        rememberPerPage: 'perPageItems',
                        onChange: function(){
                                var result =  getData.getAll($scope.term1,$scope.paginationConf.currentPage)
                                 result.then(function(data){
                                     $scope.result = data;
                                },function(){})

                        }
                    }; 
	}, function(){})


	///预览
	$scope.previewOnoff = false;
	$scope.close = function(){
		$scope.previewOnoff = !$scope.previewOnoff;
	}
	$scope.preview = function(index){
		$scope.previewOnoff = !$scope.previewOnoff;
		$scope.preObj = $scope.result.Head[index];
		$scope.preObj.prePoster = 'http://120.26.212.237/FindUouWeb'+ $filter('base64')($scope.preObj.poster)
	}
}])
m1.directive('mouseWheel',function(){
	return {
		restrict:'A',
		link:function(scope,elem,attr){
				
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
						document.getElementById('page-wrap').style.top= -100+'px'
					}
					else
					{	
						document.getElementById('page-wrap').style.top= 0+'px'	
					}
					if(oEvent.stopPropagation)
					{
						oEvent.stopPropagation();
					}
					return false;
				}
			}
		}
})