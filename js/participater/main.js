var nav = angular.module('navBar',[]);

nav.directive('topNav',function(){
	return {
		restrict:"E",
		replace:true,
		template:"<nav id='header-right' class='fr'><a href='activeList.html'><span></span></a><a href='activeList.html'><span></span></a><a href='javaScript:;' ng-click='toggle()'><span></span></a><ul id='nav-list' ng-show='onoff'><a href='index.html#/resetPwd' class='not-float'><li>修改密码</li></a><a href='javaScript:;' class='not-float' ng-click='getOut()'><li>登出</li></a></ul></nav>",
		controller:function($scope){
			$scope.onoff = false;
			$scope.toggle = function(){
				$scope.onoff = !$scope.onoff;
			}
			$scope.getOut = function(){
					removeCookie('email');
					removeCookie('id')
					removeCookie('pwd')
					removeCookie('uid')
					removeCookie('USER')
					removeCookie('token')
				window.location.href = 'index.html'
			}
		},
	}
});
var getModule = angular.module('req',[]);
getModule.factory('getList', ['$http','$q', function($http,$q){
	return {
		init:function(){
			var defer=$q.defer();
		          $http({url:basic.topAddress+basic.subAddress+'circle_activity_joinsWs.asmx/GetAll?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params: {'activity_id':getaId(),'user_id':'','pageSize':'','pageIndex':''}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)

		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		},
		weChat:function(){
			var defer=$q.defer();
		          $http({url:basic.topAddress+basic.subAddress+'circle_activity_joins_withoutappWs.asmx/GetAll?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params: {'activity_id':getaId(),'pageSize':'','pageIndex':''}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)

		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		}	
	}
}]);

if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
{
    window.location.href = 'index.html';
}
var main = angular.module('FinduouApp',['req','navBar'])

main.filter('base',function(){
    return function(str){
        return strdecode(str)
    }
});
main.controller('c1',['$scope','$q','$filter','getList',function($scope,$q,$filter,getList){
           $scope.results;
           var result = getList.init();
           result.then(function(data){
                        $scope.results = data;
                },function(){});

           var weChat = getList.weChat();
           weChat.then(function(data){
                        $scope.weChatJoiner = data;
                },function(){});

}]);
