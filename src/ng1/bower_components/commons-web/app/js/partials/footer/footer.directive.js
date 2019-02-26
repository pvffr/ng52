(function() {
	'use strict';
	angular.module('les-footer').directive('footer', function(lesCommonsWebService) {
	    return {
	        restrict: 'E',	        
	        templateUrl: lesCommonsWebService.base + 'partials/footer/footer.html'
	    };
	});
})();
