(function() {
    'use strict';

    angular.module('language-select').controller('languageSelectController', languageSelectController);

    languageSelectController.$inject = ['$state', 'localeService', 'availableLanguagesService'];

    function languageSelectController($state, localeService, availableLanguagesService) {
        var self = this;
        self.changeLanguage = changeLanguage;

        activate();

        function activate() {
            self.availableLanguages = availableLanguagesService;
            self.currentLang = self.availableLanguages.find(function(lang) {
                return lang.code === localeService.getCurrentLocale();
            });
        }

        function changeLanguage(language) {
            localeService.changeLocale(language.code);
            $state.reload();
        }
    }
})();
