(function() {
    'use strict';

    angular.module('commons-web', [
        // Vendors
        'angularMoment',
        'angular-confirm',
        'ui.bootstrap',
        'ui.calendar',
        'ui.router',
        'permission',
        'permission.ui',
        'ui.sortable',
        'uiSwitch',
        'blockUI',

        'ngSanitize',
        'ngCookies',
        'ngMessages',
        'ngTable',
        'ngTagsInput',

        'LocalStorageModule',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'jcs-autoValidate',
        'angularFileUpload',
        'localytics.directives',

        // Commons
        'les-handlers',
        'les-array-join-with',
        'les-confirm',
        'les-focus',
        'les-filters',
        'les-dynamic-height',
        'les-locale',
        'les-location',
        'les-short-name',
        'les-user',
        'les-key-press',
        'les-validation',

        // Components
        'ngTagsInput2', // Gambiarra por causa do teclado virtual do totem
        'language-select',
        'les-notification-dialog',
        'les-loader',
        'les-email-pattern',
        'les-plate-pattern',
        'les-phone-pattern',
        'les-steps-indicator',
        'les-date-format',
        'les-commands',
        'click-overlay',

        // Partials
        'les-top',
        'les-header',
        'les-footer'
    ]);
})();
