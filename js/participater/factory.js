var getModule = angular.module('req',[])
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
}])

