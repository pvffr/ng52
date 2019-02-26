(function() {
    'use strict';

    angular.module('les-handlers').factory('langHttpInterceptor', langHttpInterceptor);

    langHttpInterceptor.$inject = ['localeService'];

    function langHttpInterceptor(localeService) {
        return {
            request: function(config) {
                config.headers.language = localeService.getCurrentLanguageType();
                return config;
            }
        };
    }
})();
