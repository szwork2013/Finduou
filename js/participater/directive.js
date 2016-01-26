var nav = angular.module('navBar',[])

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
})