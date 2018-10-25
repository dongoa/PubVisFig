'use strict';

vishope.directive('egoDirective', ['dataService', function(dataService) {
    return {
        restrict: 'A',
        scope: {
            drawEgoGlyph: '=',
            drawSynScroll: '=',
            drawEgoExpand: '=',
            reArrangeEgoExpand: '=',
            changeGlyph:'=',
            changeOrder:'=',
            changeColor:'=',
            egoData: '=',
            egoFilterNumber: '='
        },
        link: function(scope, element, attrs) {
            // scope.drawEgoGlyph(element[0], scope.egoData);
            scope.$watch('egoData.synScroll', function() {
                console.log('egoData.synScroll',scope.egoData);
                scope.egoData['synOnGoing'] = true;
                if (scope.egoData.synScroll) {
                    var scrollpos = dataService.getScrollPos(scrollpos);
                    angular.element(element[0]).animate({
                        scrollLeft: scrollpos
                    }, 800);
                }
                //scope.egoData['synOnGoing'] = false;
                scope.drawSynScroll(element[0], scope.egoData, scope.egoData.synScroll);
            });
            scope.$watch('egoData.performanceFlag', function() {
                console.log('egoData.performanceFlag',scope.egoData.performanceFlag);
                scope.changeColor(element[0], scope.egoData, scope.egoData.performanceFlag);
            });

            //  scope.$watch('LiterfigureVis/scripts/directives/egoData.pag', function() {
            //     scope.changeOrder(element[0], scope.egoData, scope.egoData.performanceFlag);
            // });
            //
            // scope.$watch('LiterfigureVis/scripts/directives/egoData.rect', function() {
            //     scope.changeGlyph(element[0], scope.egoData, scope.egoData.rect);
            // });


            scope.$watch('egoData.expansion', function() {
                console.log("watch happening",scope.egoData.expansion);
                scope.drawEgoExpand(element[0], scope.egoData, scope.egoData.expansion);
            });

            scope.$watch('egoData.filterNumber', function() {
                console.log('egoData.filterNumber',scope.egoData.filterNumber);
                if (scope.egoData.filterNumber) {
                    scope.egoFilterNumber(element[0], scope.egoData, scope.egoData.filterNumber);
                }
            });

            scope.$watch('egoData.orderFlag', function() {
                console.log('egoData.orderFlag',scope.egoData.orderFlag);
                scope.reArrangeEgoExpand(element[0], scope.egoData, scope.egoData.orderFlag);
            });
        }
    };
}]);
