(function() {
	'use strict';

	angular.module('les-key-press').directive('onEnterPress', bindEnterPressEvent);

	function bindEnterPressEvent() {
		return {
			restrict: 'A',
		    link: function(scope, element, attrs) {
				element.bind('keypress', function(event) {
					if (event.which === 13) {
						scope.$apply(function() {
							scope.$eval(attrs.onEnterPress);
						});
						// event.preventDefault();
					}
				});
		    }
		};
	}
})();
