'use strict';

vishope.controller('mainviewCtrl', ['$scope', '$rootScope','pipService',
    'dataService', 'egoVisService', function($scope, $rootScope,pipService, dataService, egoVisService) {
        console.log("这里是mainviewCtrl.js");
        $scope.screenHeight = screen.height - 130 ;
        $rootScope.egoList = [];
        $scope.scrollpos = 0;
        $scope.timelineConfig = {
            startYear: undefined,
            endYear: undefined,
            basicWidth: 300,
            width: 0
        };
        console.log("main-onDatasetChange");
        console.log("piponDatasetChange1");
        $rootScope.egoList = [];
        $scope.scrollpos = 0;
        $scope.timelineConfig = {
            startYear: 2005,
            endYear: 2016,
            basicWidth: 300,
            width: 5000
        };
        console.log("piponDatasetChange2");
        egoVisService.updateTimeline($scope.timelineConfig);
        pipService.onDatasetChange($scope, function(msg) {

        });
        // egoVisService.emitSearchEgo($scope,function(msg) {  console.log("there is mainviewCtrl emitSearchEgo"); });

        pipService.onHighlightChange($scope, function(node) {
            console.log("onHighlightChange",node);
            console.log("egoID",node['id']);
            var egoID = node['id'];
            if (node.highlight) {
                $rootScope.egoList = addEgo(node);
            } else {
                $rootScope.egoList = removeEgo(node);
            }
            $rootScope.egoList.name = "xxxxxxx";
            //setTimelineConfig();
        });

        var setTimelineConfig = function() {
            //var highlightNodeDict = dataService.getHighlightNodeDict();
            var highlightNodeDict = $rootScope.egoList;
            $scope.timelineConfig.startYear = '2005';
            $scope.timelineConfig.endYear = '2016';
            // for (var key in highlightNodeDict) {
            //     if (highlightNodeDict.hasOwnProperty(key)) {
            //         if (($scope.timelineConfig.startYear == undefined) ||
            //                 ($scope.timelineConfig.startYear > highlightNodeDict[key]['startYear'])) {
            //                     $scope.timelineConfig.startYear = highlightNodeDict[key]['startYear'];
            //                 }
            //         if (($scope.timelineConfig.endYear == undefined) ||
            //                 ($scope.timelineConfig.endYear < highlightNodeDict[key]['endYear'])) {
            //                     $scope.timelineConfig.endYear = highlightNodeDict[key]['endYear'];
            //                 }
            //     }
            // }
            var len = 100;genYearDistance($scope.timelineConfig.startYear, $scope.timelineConfig.endYear) * 2 + 1;
            // if ($scope.timelineConfig.startYear == undefined || $scope.timelineConfig.endYear == undefined) {
            //     len = 0;
            // }
            $scope.timelineConfig.width = $scope.timelineConfig.basicWidth * len;
            egoVisService.updateTimeline($scope.timelineConfig);
        };

        var genYearDistance = function(start, end) {
            if (start < 10000) {
                return end - start + 6;
            } else {
                var stYear = Math.floor(start / 100);
                var edYear = Math.floor(end / 100);
                var stMon = start % 100;
                var edMon = end % 100;
                if (stYear == edYear) {
                    return edMon - stMon;
                } else {
                    return (edYear - stYear - 1) * 12 + 12 - stMon + edMon;
                }
            }
        };
        var k=1;
        var addEgo = function(node) {
            var egoID = node['id'];
            for (var i = 0; i < $rootScope.egoList.length; i++) {
                if ($rootScope.egoList[i]['id'] == egoID) {
                    return $rootScope.egoList;
                }
            }

            node['id']='T'+k.toString();k=k+1;
            $rootScope.egoList.push(node);
            return $rootScope.egoList;
        };

        var removeEgo = function(node) {
            var egoID = node['id'];
            for (var i = 0; i < $rootScope.egoList.length; i++) {
                if ($rootScope.egoList[i]['id'] == egoID) {
                    $rootScope.egoList.splice(i, 1);
                    break;
                }
            }
            return $rootScope.egoList;
        };

        $scope.removeEgoBtn = function(index) {
            var ego = $rootScope.egoList[index];
            dataService.setHighlightNode(ego, false);
            pipService.emitRemoveHighlight(ego);
            pipService.emitHighlightChange(ego);
        };

        $scope.expandEgoBtn = function(index) {
            console.log("666");
            $rootScope.egoList[index]['expansion'] = true;//change open or close!!
        };

        $scope.shrinkEgoBtn = function(index) {
            console.log("666");
            $rootScope.egoList[index]['expansion'] = false;
        };

        $scope.showPieBtn = function(index) {
            $rootScope.egoList[index]['rect'] = false;
        };

        $scope.showBarBtn = function(index) {
            $rootScope.egoList[index]['rect'] = true;
        };

        // $scope.drawEgoGlyph = function(element, egoData) {
        //     egoVisService.drawEgoGlyph(element, egoData);
        // };

        $scope.clearEgoList = function() {
            $rootScope.egoList = [];
        };

        pipService.onExpand($scope, function(msg) {
            for (var i = 0; i < $rootScope.egoList.length; i++) {
                if ($rootScope.egoList[i]['id'] == msg['id']) {
                    $rootScope.egoList[i]['expansion'] = true;
                    break;
                }
            }
        });

        pipService.onClearEgoList($scope, function(msg) {
            $scope.clearEgoList();
        });

        $scope.changeScroll = function(index) {
            var ego = $rootScope.egoList[index];
            console.log(index,ego,ego.synScroll);
            ego.synScroll = !ego.synScroll;
            if (ego.synScroll) {
                var scrollpos = dataService.getScrollPos();
                $('.synScroll').animate({
                    scrollLeft: scrollpos
                }, 0);
            }
        };

        $scope.changeColor = function(element, egoData, perfFlag) {
            egoVisService.changeColor(element, egoData, perfFlag);
        };

        $scope.changePerformanceFlag = function(index) {
            var ego = $rootScope.egoList[index];
            ego.performanceFlag = !ego.performanceFlag;
        };

         $scope.changeOrderFlag = function(index) {
             var ego = $rootScope.egoList[index];
            ego.orderFlag = !ego.orderFlag;
        };

        $scope.changeOrder = function(element, egoData, perfFlag) {
           egoVisService.changeColor(element, egoData, perfFlag);
        };

        $scope.changeGlyph = function(element, egoData, rectFlag) {
            egoVisService.switchGlyph(element, egoData, rectFlag);
        };

        $scope.drawSynScroll = function(element, egoData, synFlag) {
            egoVisService.drawSynScroll(element, egoData, synFlag);
        };

        $scope.drawEgoExpand = function(element, egoData, expFlag) {
            // console.log("drawEgoExpand",element,egoData,expFlag);


            // console.log(egoData,element);
            egoVisService.drawEgoExpand(element, egoData, expFlag);
        };

        $scope.egoFilterNumber = function(element, egoData, filterNumber) {
            egoVisService.egoFilterNumber(element, egoData, filterNumber);
        };

         $scope.reArrangeEgoExpand = function(elem,orderFlag, egoData) {
            egoVisService.reArrangeEgoExpand(elem,orderFlag, egoData);
        };

    }]);
