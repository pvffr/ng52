(function() {
	'use strict';

	angular.module('les-focus').directive('focusOn', focusOn);

	focusOn.$inject = ['$timeout'];

	function focusOn($timeout) {
		return {
	        restrict : 'A',
	        link : function($scope,$element,$attr) {
	            $scope.$watch($attr.focusOn,function(_focusVal) {
	                $timeout(function() {
	                    if(_focusVal) {
	                    	$element.focus();
	                    } else {
	                    	$element.blur();
	                    }
	                });
	            });
	        }
		};
	}

})();