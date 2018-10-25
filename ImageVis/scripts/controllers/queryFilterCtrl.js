'use strict';

vishope.controller('queryFilterCtrl', ['$scope', 'pipService', 'dataService',
        function($scope, pipService, dataService) {
            console.log("这里是queryFilterCtrl.js");
    $scope.dataLoadFlag = 1;
    $scope.queryData = {
        searchText: ''
    };

    pipService.onDatasetChange($scope, function(msg) {
        console.log("HERE :::::::query-datachange");
        $scope.dataLoadFlag = 1;
    });

    $scope.search = function() {
        console.log($scope.queryData.searchText);
        pipService.emitSearchEgo($scope.queryData.searchText);
    };

    $scope.reset = function() {
        $scope.queryData.searchText = '';
        pipService.emitResetEgo();
    };
}]);
