(function() {
    'use strict';

    angular.module('les-locale').service('localeService', localeService);

    localeService.$inject = ['localStorageService', 'availableLanguagesService', '$translate', 'tmhDynamicLocale'];

    function localeService(localStorageService, availableLanguagesService, $translate, tmhDynamicLocale) {
        var localeService = {
            changeLocale: changeLocale,
            removeLocale: removeLocale,
            getCurrentLocale: getCurrentLocale,
            getCurrentLanguageType: getCurrentLanguageType
        };

        var localeKey = 'CURRENT_LOCALE';

        function changeLocale(newLocale) {
            $translate.use(newLocale);
            tmhDynamicLocale.set(newLocale);
        }

        function removeLocale() {
            return localStorageService.remove(localeKey);
        }

        function getCurrentLocale() {
            return localStorageService.get(localeKey);
        }

        function getCurrentLanguageType() {
            var currentLocale = getCurrentLocale();
            var currentLanguage = availableLanguagesService.find(function(lang) {
                return lang.code === currentLocale;
            });

            if (currentLanguage) {
                return currentLanguage.value;
            }

            return;
        }

        return localeService;
    }
})();
