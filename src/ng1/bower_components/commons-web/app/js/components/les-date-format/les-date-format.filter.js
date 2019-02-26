(function() {
	'use strict';

	angular.module('les-date-format').filter('lesDateFormat', lesDateFormat);

	lesDateFormat.$inject = ['moment'];

	function lesDateFormat(moment) {
		return function(date, format) {
			return moment(date).format(format);
		};
	}

})();
