if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
{
    window.location.href = 'index.html'
}
var main = angular.module('FinduouApp',['tm.pagination','req','excel','navBar'])
main.filter('base',function(){

    return function(str){
        return strdecode(str)
    }
});
main.controller('c1',['$scope','$q','$filter','getList','outport',function($scope,$q,$filter,getList,outport){
        $scope.results;
        $scope.all  ;
        $scope.paginationConf = {}; 
    var result = getList.init();
    result.then(function(data){
      //  console.log(strdecode(data.Head[0].user_id));
        $scope.results = data;
        $scope.all = strdecode(data.Head[0].RowCount);
        $scope.paginationConf = {
                        currentPage: 1,//当前页
                        totalItems:  $scope.all,//总数目
                        itemsPerPage: 20,//每页展示几项
                        pagesLength: 8,
                        perPageOptions: [10, 20, 30, 40, 50],
                        rememberPerPage: 'perPageItems',
                        onChange: function(){
                            var result =  getList.freshList($scope.paginationConf.currentPage)
                            result.then(function(data){
                               $scope.results = data;
                           },function(){})

                        }
                    }; 
                },function(){});
            //excel
            $scope.download = function(){
                var result = outport.getExcel()
                result.then(function(data){
                    window.open(data.url)
                },function(){})
            }
        }])
