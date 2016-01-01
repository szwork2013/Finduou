var main = angular.module('FinduouApp',['ngRoute','loginModule','resetModule']);

//路由配置
main.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/login',{
			templateUrl:'loginTemplate.html',
			controller:'login'
		}).when('/resetPwd',{
			templateUrl:'resetTemplate.html',
			controller:'reset'
		}).otherwise({
			///此处设置的是一上来就默认显示的内容。
			redirectTo:'/login'
		})
}])
//登录操作
main.controller('login', ['$scope','$location','Login',function($scope,$location,Login){
	//alert(1)
	$scope.$location = $location;
	//邮箱正则
	//var reg  = /^\w{2,16}@[0-9a-z]{2,8}\.[a-z]{2,5}$/i;
	$scope.keyLogin = function($event){
		//alert($event.keyCode)
		if($event.keyCode==13)
		{
			
			if(reg.test($scope.userEmail)&&$scope.userPwd!=''&&$scope.userPwd!=undefined)
			{
				var result = Login.userLogin({'a':$scope.userEmail,'b':$scope.userPwd});
				result.then(function(data){
					if(data.error)
					{
						alert(data.error)
					}
					else
					{
						// setCookie('email',$scope.userEmail),14)
						// setCookie('id',data.Head[0].id),14)
						// // setCookie('pwd',$scope.userPwd),14)
						// //setCookie('USER',data.Head[0].USER),14)
						// setCookie('token',data.Head[0].token),14)
						// setCookie('uid',data.Head[0].university_id),14)

						setCookie('email',$scope.userEmail,14)
						setCookie('id',data.Head[0].id,14)
						setCookie('token',data.Head[0].token,14)
						setCookie('uid',data.Head[0].university_id,14)

						window.location.href = 'activeList.html'
					}
					
					},function(){

					})
			}
			else if($scope.userEmail==''||$scope.userEmail==undefined)
			{
				alert('邮箱不能为空!')
			}
			else if(reg.test($scope.userEmail)==false)
			{
				alert('邮箱格式不正确!')
			}
			else if($scope.userPwd==''||$scope.userPwd==undefined)
			{
				alert('亲！别忘了密码！')
			}

		}
	}
	$scope.loginOperate = function(){
		if(reg.test($scope.userEmail)&&$scope.userPwd!=''&&$scope.userPwd!=undefined)
		{
			var result = Login.userLogin({'a':$scope.userEmail,'b':$scope.userPwd});
			result.then(function(data){
				if(data.error)
				{
					alert(data.error)
				}
				else
				{
					//因为测试所以期限为14天，正式版可以不用!!!!!!!
					setCookie('email',$scope.userEmail,14)
					setCookie('id',data.Head[0].id,14)
					setCookie('token',data.Head[0].token,14)
					setCookie('uid',data.Head[0].university_id,14)
					window.location.href = 'activeList.html'
				}
				
				},function(){

				})
		}
		else if($scope.userEmail==''||$scope.userEmail==undefined)
		{
			alert('邮箱不能为空!')
		}
		else if(reg.test($scope.userEmail)==false)
		{
			alert('邮箱格式不正确!')
		}
		else if($scope.userPwd==''||$scope.userPwd==undefined)
		{
			alert('亲！别忘了密码！')
		}
		
	}

		
}])
//重设密码
main.controller('reset', ['$scope','$interval','$location','SendCode','Reset',function($scope,$interval,$location,SendCode,Reset){
	//map映射
	$scope.$location = $location;
	//相关参数
	$scope.wait = '发送邮箱验证码';
	$scope.idCode =''
	$scope.newPwd = '';//新密码
	$scope.resurePwd = '';//确认新密码
	$scope.onoff =false;//按钮开关

	///发送验证码
	$scope.sending = function(){
		var timer = null;
		//alert(1)
		if($scope.onoff ==false)
		{
			var result = SendCode.Send($scope.resetEmail)
			//alert(1)
			$scope.onoff =true;
			result.then(function(){
				alert('已发送,请接收!')
			},function(data){
				alert(data)
			})
		}
		else
		{	
			$scope.onoff =true;
			var num = 60;
			timer = $interval(function(){
				num--;
				if(num==0)
				{
					$scope.wait = '发送邮箱验证码';
					$scope.onoff =false;
					$interval.cancel(timer);
					//console.log($scope.wait);
				}
				else
				{
					$scope.wait = "重新获取("+num+")";

				}
				
			},1000)
		}
	}
	//点击重置
	$scope.resetOperate = function(){
		//alert(reg.test($scope.resetEmail))
		if(reg.test($scope.resetEmail)==false)
		{
			alert('邮箱格式不正确!')
		}
		else if($scope.idCode==undefined||$scope.idCode=='')
		{
			alert('请输入验证码')
		}
		else if($scope.newPwd==''||$scope.newPwd==undefined||$scope.resurePwd==''||$scope.resurePwd==undefined)
		{
			alert('密码不能为空')
		}
		else if($scope.newPwd!=$scope.resurePwd)
		{
			alert('密码不一致')
		}
		else
		{
			var result = Reset.userReset({'a':$scope.resetEmail,b:$scope.idCode,c:$scope.newPwd});
			result.then(function(){
				$location.path('login')
				},function(){
			})
		}
		
	}
}])