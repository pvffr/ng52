(function() {
    'use strict';
    angular.module('les-header').directive('publicHeader', function(lesCommonsWebService) {
        return {
            restrict: 'E',
            templateUrl: lesCommonsWebService.base + 'partials/header/header-public.html',
            scope: {
                initial: '@'
            },
            controller: function($scope, headerModel) {
                $scope.model = headerModel;
            }
        };
    });
})();
