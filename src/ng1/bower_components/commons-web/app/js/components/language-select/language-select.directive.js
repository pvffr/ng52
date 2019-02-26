(function() {
	'use strict';


	angular.module('language-select').directive('languageSelect', function(lesCommonsWebService) {
	    return {
	        restrict: 'E',
	        templateUrl: lesCommonsWebService.base + 'components/language-select/language-select.html',
			controller: 'languageSelectController',
			controllerAs: 'languageSelectCtrl',
			bindToController: true
	    };
	});
})();
