(function() {
    'use strict';

    angular.module('les-locale').service('availableLanguagesService', availableLanguagesService);

    availableLanguagesService.$inject = [];

    function availableLanguagesService() {
        return [
            {
                code: 'en',
                value: 'EN_US',
                displayName: 'English'
            },
            {
                code: 'pt-br',
                value: 'PT_BR',
                displayName: 'Português'
            }
        ];
    }
})();
