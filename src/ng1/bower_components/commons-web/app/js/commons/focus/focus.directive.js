(function() {
	'use strict';

	angular.module('les-focus').directive('ngAutofocus', ngAutofocus);

	ngAutofocus.$inject = ['$timeout'];

	function ngAutofocus($timeout) {
		return {
			restrict: 'A',
			scope: {
				'ngAutofocus': '=?'
			},
		    link: function($scope, $element) {
		    	$scope.$watch('ngAutofocus', function(value) {
	               if (value || angular.isUndefined(value)) {
	               		$timeout(function() {
		        			$element[0].focus();
		     			}, 100);
		     		}
	            });
		    }
		};
	}

})();
