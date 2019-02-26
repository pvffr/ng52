(function() {
	'use strict';

	angular.module('les-short-name').filter('shortName', shortName);

	function shortName() {
		return function(longName) {
			if (typeof(longName) !== 'string') {
				return longName;
			}

			var names = longName.split(' ') || [];
			if (names.length === 0) {
				return '';
			}

			var firstName = names.shift() || '';
			var lastName = names.pop() || '';
			if (lastName.length === 0) {
				return firstName;
			}

			return firstName + ' ' + lastName;
		};
	}

})();
