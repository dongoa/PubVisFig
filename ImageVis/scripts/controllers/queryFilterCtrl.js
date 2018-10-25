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

    $scope.search = function() {
        // for(var i=0;i<17;i++){
        //     $rootScope.egoList[i].expansion=false;
        //     // $rootScope.egoList[i].synScroll=false;//show the thin ego
        // }

        console.log($scope.queryData.searchText,$rootScope.egoList,$rootScope.egoList);
        egoVisService.emitSearchEgo($scope.queryData.searchText,$rootScope);


        // pipService.emitSearchEgo($scope.queryData.searchText);
    };

    $scope.reset = function() {
        $scope.queryData.searchText = '';
        pipService.emitResetEgo();
    };
}]);
