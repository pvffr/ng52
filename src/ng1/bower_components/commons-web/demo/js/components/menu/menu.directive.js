(function() {
    'use strict';

    angular.module('menu').directive('demoMenu', function(demoService) {
        return {
            restrict: 'E',          
            templateUrl: 'js/components/menu/menu.html',
            controller: function($scope, $rootScope) {
                $scope.visible = false;

                $scope.toggleMenu = function() {
                    $scope.visible = !$scope.visible;
                };
                
                $scope.toggleFullscreen = function() {
                    $rootScope.fullscreen = !$rootScope.fullscreen;
                };  
            } 
        };
    });

})();
