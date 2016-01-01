var getModule = angular.module('req',[])
getModule.factory('getList', ['$http','$q', function($http,$q){
	return {
		freshList:function(num){
			var defer=$q.defer();
		          $http({url:basic.topAddress+basic.subAddress+'circle_activity_joinsWs.asmx/GetAll?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params: {'activity_id':getaId(),'user_id':'','pageSize':'20','pageIndex':num}
		              //params: {'activity_id':'','user_id':'','pageSize':'20','pageIndex':num}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)

		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
				},
		init:function(){
			var defer=$q.defer();
		          $http({url:basic.topAddress+basic.subAddress+'circle_activity_joinsWs.asmx/GetAll?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params: {'activity_id':getaId(),'user_id':'','pageSize':'20','pageIndex':'1'}
		              //params: {'activity_id':'','user_id':'','pageSize':'20','pageIndex':'1'}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)

		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		}	
	}
}])

var excelModule = angular.module('excel',[])
excelModule.factory('outport', ['$http','$q', function($http,$q){
	return {
		getExcel:function(a){
			var defer=$q.defer();
		          $http({url:basic.topAddress+basic.subAddress+'circle_activity_joinsWs.asmx/GenerateExcel?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params: {'activity_id':getaId()}
		              //params: {'activity_id':''}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)
		          }).error(function(data,header,config,status){
		            defer.reject(); 
		          });
		          return defer.promise;
		}
	}
}])