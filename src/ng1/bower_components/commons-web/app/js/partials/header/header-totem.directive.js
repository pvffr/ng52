(function() {
	'use strict';
	angular.module('les-header').directive('totemHeader', function(lesCommonsWebService) {
	    return {
	        restrict: 'E',	        
	        templateUrl: lesCommonsWebService.base + 'partials/header/header-totem.html'
	    };
	});
})();
