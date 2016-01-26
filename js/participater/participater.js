if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
{
    window.location.href = 'index.html'
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




      /*      //excel
            $scope.download = function(){
                var result = outport.getExcel()
                result.then(function(data){
                    window.open(data.url)
                },function(){})
            }*/
}])
