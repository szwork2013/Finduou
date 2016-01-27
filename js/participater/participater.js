var main = angular.module('FinduouApp',['req','navBar'])

main.filter('base',function(){
    return function(str){
        return strdecode(str)
    }
});
main.controller('c1',['$scope','$q','$filter','getList',function($scope,$q,$filter,getList){
            if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
            {
                window.location.href = 'index.html'
            }
           $scope.results;
           var result = getList.init();
           result.then(function(data){
                        $scope.results = data;
                },function(){});

           var weChat = getList.weChat();
           weChat.then(function(data){
                        $scope.weChatJoiner = data;
                },function(){});
}])
