(function() {
	'use strict';
	angular.module('les-dynamic-height').directive('dynamicHeight', dynamicHeight);
	function dynamicHeight() {
		return {
			restrict: 'A',
		    link: function(scope, element, attrs) {
				var deltaY = scope.$eval(attrs.dynamicHeight) || 199;
		    	element.css('max-height', element[0].offsetHeight + deltaY + 'px');
		    }
		};
	}

})();
