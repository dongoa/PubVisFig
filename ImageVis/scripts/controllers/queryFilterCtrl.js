'use strict';

vishope.controller('queryFilterCtrl', ['$scope','$rootScope', 'pipService', 'dataService','egoVisService',
        function($scope, $rootScope,pipService, dataService,egoVisService) {
            console.log("这里是queryFilterCtrl.js");
    $scope.dataLoadFlag = 1;
    $scope.queryData = {
        searchText: ''
    };

    pipService.onDatasetChange($scope, function(msg) {
        console.log("HERE :::::::query-datachange",$rootScope.egoList[index]['expansion'] );
        $scope.dataLoadFlag = 1;
    });

    $scope.search = function(msg) {


        for(var i=0;i<16;i++){
            $rootScope.egoList[i].expansion=false;
            // $rootScope.egoList[i].synScroll=false;//show the thin ego
        }
        console.log(_open_T);
        if(_open_T!=-1){
            // console.log("模拟按键ok",msg);
            // $rootScope.$apply(function(){

                    $rootScope.egoList[_open_T].expansion=true;
                // $rootScope.egoList[0]['expansion']=true;

            // });
        }
        else {
            console.log($scope.queryData.searchText,$rootScope.egoList,$rootScope.egoList);
            egoVisService.emitSearchEgo($scope.queryData.searchText,$rootScope);
        }










        // pipService.emitSearchEgo($scope.queryData.searchText);
    };

    $scope.reset = function() {
        $('.target-image').remove();
        for(var _i=0;_i<16;_i++){
            // console.log("213");
            if(_i<9)
                $(".T0"+(_i+1)+"-probility").html('');
            else $(".T"+(_i+1)+"-probility").html('');
        }


        for(var i=0;i<16;i++){
            $rootScope.egoList[i].expansion=false;
            // $rootScope.egoList[i].synScroll=false;//show the thin ego
        }
        $scope.queryData.searchText = '';
        pipService.emitResetEgo();
    };
}]);
