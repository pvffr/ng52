(function() {
	'use strict';
	angular.module('les-footer').directive('totemFooter', function(lesCommonsWebService) {
	    return {
	        restrict: 'E',	        
	        templateUrl: lesCommonsWebService.base + 'partials/footer/footer-totem.html',
            controller: function($scope) {
                $scope.year = new Date().getFullYear();
            } 
	    };
	});
})();
