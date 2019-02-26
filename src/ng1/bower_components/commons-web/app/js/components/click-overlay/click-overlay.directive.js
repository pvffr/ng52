(function () {
    'use strict';

    angular.module('click-overlay').directive('clickOverlay', function (lesCommonsWebService) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                visible: '='
            },
            templateUrl: lesCommonsWebService.base + 'components/click-overlay/click-overlay.html',
            controller: function ($scope) {
                $scope.close = function () {
                    $scope.visible = false;
                };
            }
        };
    });
})();
