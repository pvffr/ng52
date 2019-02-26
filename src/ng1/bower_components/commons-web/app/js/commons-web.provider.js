(function() {
    'use strict';

    angular.module('commons-web').provider('lesCommonsWebService', lesCommonsWebServiceProvider);

    function lesCommonsWebServiceProvider() {
        var base;
        var service = {
            $get: getBasePath,
            setBasePath: setBasePath
        };

        function setBasePath(path) {
            base = path;
        }

        function getBasePath() {
            return {
                base: base
            };
        }

        return service;
    }
})();
