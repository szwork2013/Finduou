var reqModule = angular.module('myService',[]);
reqModule.factory('getData',['$q','$http',function($q,$http){
	return{
		getAll:function(obj,pageIndex){
			var defer=$q.defer();
		        $http({url:obj.topAddress+obj.subAddress+'circle_activityWS.asmx/GetAllForWeb?jsoncallback=JSON_CALLBACK',
		              method:'JSONP',
		              params:{'circle_id':'','university_id':obj.uid,'type':obj.type,'state':obj.state,'name':'','title':obj.title,'set_time_s':obj.start,'set_time_e':obj.end,'city':'','place':obj.place,'creater_name':obj.founder,'pageSize':'10','pageIndex':pageIndex}
		          }).success(function(data,header,config,status){
		            defer.resolve(data)
		        }).error(function(data,header,config,status){
		            defer.reject(); 
		        });
		        return defer.promise;
		}
	}
}])
