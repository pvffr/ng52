(function () {
    'use strict';
    angular.module('les-top').directive('publicTop', function (lesCommonsWebService) {
        return {
            restrict: 'E',
            templateUrl: lesCommonsWebService.base + 'partials/top/public/top-public.html',
            controller: 'publicTopController',
            controllerAs: 'publicTopCtrl',
            bindToController: true,
            transclude: true,
            scope: {
                initial: '@'
            }
        };
    });
})();
