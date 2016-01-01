var loginModule = angular.module('loginModule',[]);

loginModule.factory('Login', ['$http','$q',function($http,$q){
    return{
        userLogin:function(obj){
            
          var defer=$q.defer();
          $http({url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/Login?jsoncallback=JSON_CALLBACK',
              method:'JSONP',
              //params: {'login_name':strdecode(getCookie('user_login_name')),'login_pwd':strdecode(getCookie('user_pwd'))}
              params: {'login_name':obj.a,'login_pwd':obj.b}
          }).success(function(data,header,config,status){
            defer.resolve(data)


        }).error(function(data,header,config,status){
            defer.reject(); 
        });
        return defer.promise;
    } 
};
}])

var resetModule = angular.module('resetModule',[]);

resetModule.factory('SendCode', ['$http','$q','$location',function($http,$q,$location){
    return{
        Send:function(obj){
       
          var defer=$q.defer();
          $http({url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/SendCodeToEmail?jsoncallback=JSON_CALLBACK',
              method:'JSONP',
              //params: {'login_name':strdecode(getCookie('user_login_name')),'login_pwd':strdecode(getCookie('user_pwd'))}
              params: {'email':obj}
          }).success(function(data,header,config,status){
            defer.resolve(data)
        }).error(function(data,header,config,status){
          //console.log(data);
            defer.reject(data); 
        });
        return defer.promise;
    } 
};
}])

resetModule.factory('Reset', ['$http','$q','$location',function($http,$q,$location){
    return{
        userReset:function(obj){
          console.log(obj);
          var defer=$q.defer();
          $http({url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/UpdatePwdFromCode?jsoncallback=JSON_CALLBACK',
              method:'JSONP',
              //params: {'login_name':strdecode(getCookie('user_login_name')),'login_pwd':strdecode(getCookie('user_pwd'))}
              params: {'email':obj.a,'code':obj.b,'login_pwd':obj.c}
          }).success(function(data,header,config,status){
            console.log(data);
            defer.resolve(data)

        }).error(function(data,header,config,status){
            defer.reject(); 
        });
        return defer.promise;
    } 
};
}])