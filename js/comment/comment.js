var m1 = angular.module('Finduou',['navBar','getReq','tm.pagination']);
m1.filter('base64',function(){//base64过滤器
	return function(str){
		return strdecode(str)
	}
});
m1.filter('split',function(){
	return function(str,num){
		return strdecode(str).split(' ')[num]
	}
});
m1.filter('noInject',function(){
	return function(str){
		var lReg = /<+/g;
		var gReg = />+/g;
		return str.replace(lReg,'&lt').replace(gReg,'&gt')
	}
})
m1.controller('main',['$scope','$filter','$q','getData',function($scope,$filter,$q,getData){
	////cookie操作
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
	$scope.getaId = function(){
		var re = /aid=[\w][^\&]+/g;
		var str = window.location.search.match(re)[0];
		str = str.substring(4)
		return  strdecode(str)
	}
	///////////
	var iToken =  $filter('base64')($scope.getCookie('token'))
	if(iToken==''||iToken==undefined||iToken==-1){
		window.location.href = 'index.html'
	}
	/////
	$scope.basic = {
    	topAddress :'http://120.26.212.237',
    	subAddress : '/FindUouWs1/',
	webAddress:'/FindUouWeb',
	aid:$scope.getaId(),
	flag:''};

	$scope.activeInfo = [];//活动信息

	var result = getData.getCircleInfo($scope.basic);
	result.then(function(data){
		$scope.activeInfo = data.Head[0];
		//console.log($scope.activeInfo)
		$scope.activeInfo.poster = 'http://120.26.212.237/FindUouWeb'+ $filter('base64')($scope.activeInfo.poster)
	},function(){})

	////////////
	$scope.List = [];//主要活动列表
	 $scope.paginationConf = {};
	var list = getData.getList($scope.basic,1);
	list.then(function(data){
		$scope.List = data.Head;
		// console.log($scope.List)
		for(var i=0;i<$scope.List.length;++i){
			if($scope.List[i].img!=''){
				$scope.List[i].img = 'http://120.26.212.237/FindUouWeb'+ $filter('base64')($scope.List[i].img)
			}
		}
		try{
			$scope.all = strdecode(data.Head[0].RowCount);
		}catch(err){}
		
    	$scope.paginationConf = {
                currentPage: 1,//当前页
                totalItems:  $scope.all,//总数目
                itemsPerPage: 10,//每页展示几项
                pagesLength:8,
                perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems',
                onChange: function(){
                        var result =  getData.getList($scope.basic,$scope.paginationConf.currentPage)
                         result.then(function(data){
                            $scope.List = data.Head;
                            for(var i=0;i<$scope.List.length;++i){
				if($scope.List[i].img!=''){
				$scope.List[i].img = 'http://120.26.212.237/FindUouWeb'+ $filter('base64')($scope.List[i].img)
				}
			}
                        },function(){})

                }
            }; 
	},function(){})
	$scope.a1 = true;
	$scope.a2 = false;
	$scope.a3 = false;
	$scope.multiply = '';
	$scope.tab = function(flag){

		if(flag=='a'){
			$scope.a1 = true;
			$scope.a2 = false;
			$scope.a3 = false;
			$scope.basic.flag = ''
		}else if(flag=='b'){
			$scope.a1 = false;
			$scope.a2 = true;
			$scope.a3 = false;
			$scope.basic.flag = 1;
		}else if(flag=='c'){
			$scope.a1 = false;
			$scope.a2 = false;
			$scope.a3 = true;
			$scope.basic.flag = 0;
		}
		if($scope.multiply == $scope.basic.flag){//防多次请求
			return false;
		}
		$scope.multiply = $scope.basic.flag;
		$scope.fresh($scope.basic,1)
	}
	$scope.fresh = function(obj,index){
		//console.log(obj)
		var list = getData.getList(obj,index);
		list.then(function(data){
			$scope.List = data.Head;
			try{
				$scope.all = strdecode(data.Head[0].RowCount);
			}catch(err){
				
			}
			$scope.paginationConf.totalItems=$scope.all;
			for(var i=0;i<$scope.List.length;++i){
				if($scope.List[i].img!=''){
					$scope.List[i].img = 'http://120.26.212.237/FindUouWeb'+ $filter('base64')($scope.List[i].img)
				}
			}
		},function(){})
	}
	$scope.delete = function(index){
		//console.log($scope.List[index].id)
		var id = $filter('base64')($scope.List[index].id);
		console.log(id)
		var list = getData.delete($scope.basic,id);
		list.then(function(data){
			//$scope.List = data.Head;
			$scope.fresh($scope.basic,1)
		},function(){})
	}
	$scope.upWall = function(index){
		//console.log($scope.List[index].id)
		var id = $filter('base64')($scope.List[index].id);
		
		var list = getData.upWall($scope.basic,id);
		list.then(function(data){
			//$scope.List = data.Head;
			$scope.fresh($scope.basic,1)
		},function(){})
	}
	//////翻页
}])