(function () {
    'use strict';

    angular.module('les-loader').directive('loader', function (lesCommonsWebService) {
        return {
            templateUrl: lesCommonsWebService.base + 'components/loader/loader.html',
            controller: function () { }
        };
    });

})();
