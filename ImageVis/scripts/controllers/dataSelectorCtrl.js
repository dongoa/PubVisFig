'use strict';

vishope.controller('dataSelectorCtrl', ['$scope', 'pipService', 'dataService',
        function($scope, pipService, dataService) {
    console.log("这里是dataSelectorCtrl.js");
    $scope.data = {
        'dbList': []
    };

    // dataService.getDBList().then(function(promise) {
    //     console.log("I am getDBList");
    //     $scope.data.dbList = promise.data;
    //     console.log(promise.data);
    // });

    dataService.updateDataset().then(function(promise) {
        console.log("then",promise.data);
        $scope.data.dataset = promise.data;
        pipService.emitDatasetChange('from:dataSelectorCtrl');
    });
    // $scope.updateDataset = function(selectedDataset) {
    //     console.log(selectedDataset);
    //
    // };

    $scope.controlPanel = function() {
        pipService.emitControlPanel();
    };

            pipService.emitHeatmap();
            pipService.emitHeatmap();
    $scope.heatmap = function() {
        console.log("123");
        pipService.emitHeatmap();
    };
}]);
