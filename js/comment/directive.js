var nav = angular.module('navBar',[])

nav.directive('topNav',function(){
	return {
		restrict:"E",
		replace:true,
		scope:{
			removeCookie:'&iCookie'
		},
		template:"<nav id='header-right' class='fr'><a href='activeList.html'><span></span></a><a href='myData.html'><span></span></a><a href='javaScript:;' ng-click='toggle($event)'><span></span></a><ul id='nav-list' ng-show='onoff'><a href='mPassword.html' class='not-float'><li>修改密码</li></a><a href='javaScript:;' class='not-float' ng-click='getOut()'><li>登出</li></a></ul></nav>",
		link:function(scope,elem,attr){
			scope.onoff = false;
			scope.toggle = function($event){
				scope.onoff = !scope.onoff;
				$event.stopPropagation();
			}
			/*scope.hide = function(){//隐藏列表
				scope.onoff = false;
			}*/
			scope.getOut = function(){
				///指令之内传输形参的方式；
					scope.removeCookie({param:'email'});
					scope.removeCookie({param:'id'})
					scope.removeCookie({param:'pwd'})
					scope.removeCookie({param:'uid'})
					scope.removeCookie({param:'USER'})
					scope.removeCookie({param:'token'})
				//window.location.href = 'index.html'
			}
		}
	}
})