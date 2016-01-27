var requestModule = angular.module('getReq',[]);
requestModule.factory('getData',['$http','$q',function($http,$q){
	return {
		getCircleInfo:function(obj){
			//console.log(obj)
			var defer = $q.defer();
			$http({url:obj.topAddress+obj.subAddress+'circle_activityWS.asmx/GetOne?jsoncallback=JSON_CALLBACK',
				method:'JSONP',
				params:{'id':obj.aid}
			}).success(function(data,header,config,status){
		            defer.resolve(data)
		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		},
		getList:function(obj,iPage){
			//console.log(obj.aid)
			var defer = $q.defer();
			$http({url:obj.topAddress+obj.subAddress+'circle_activity_replyWs.asmx/GetAll?jsoncallback=JSON_CALLBACK',
				method:'JSONP',
				params: {'activity_id':obj.aid,'user_id':'','on_wall':obj.flag,'type':'互动','pageSize':'10','pageIndex':iPage},
			}).success(function(data,header,config,status){
		            defer.resolve(data)
		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		},
		delete:function(obj,id){
			var defer = $q.defer();
			$http({url:obj.topAddress+obj.subAddress+'circle_activity_replyWs.asmx/Delete?jsoncallback=JSON_CALLBACK',
				method:'JSONP',
				params: {'id':id,'USER':'','TOKEN':''},
			}).success(function(data,header,config,status){
		            defer.resolve(data)
		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		},
		upWall:function(obj,id){
			var defer = $q.defer();
			$http({url:obj.topAddress+obj.subAddress+'circle_activity_replyWs.asmx/OnWallFlag?jsoncallback=JSON_CALLBACK',
				method:'JSONP',
				params: {'id':id,'on_wall':'0','USER':'','TOKEN':''},
			}).success(function(data,header,config,status){
		            defer.resolve(data)
		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		},
	}
}])