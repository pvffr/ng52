(function() {
	'use strict';

	angular.module('les-key-press').directive('onTabPress', bindTabPressEvent);

	function bindTabPressEvent() {
		return {
			restrict: 'A',
		    link: function(scope, element, attrs) {
				element.bind('keydown', function(event) {
					if (event.which === 9) {
						scope.$apply(function() {
							scope.$eval(attrs.onTabPress);
						});
					}
				});
		    }
		};
	}
})();
