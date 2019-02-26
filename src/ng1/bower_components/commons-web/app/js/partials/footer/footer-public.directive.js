(function() {
	'use strict';
	angular.module('les-footer').directive('publicFooter', function(lesCommonsWebService) {
	    return {
	        restrict: 'E',	        
	        templateUrl: lesCommonsWebService.base + 'partials/footer/footer-public.html',
            controller: function($scope) {
                $scope.year = new Date().getFullYear();
            } 
	    };
	});
})();
