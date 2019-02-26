(function() {
    'use strict';

    angular.module('demo').factory('i18nService', i18nService);

    i18nService.$inject = ['$translate', '$translatePartialLoader'];

    function i18nService($translate, $translatePartialLoader) {
        var i18nService = {
            setup: setup
        };

        function setup() {
            $translatePartialLoader.addPart('les');
            $translatePartialLoader.addPart('footer');
            $translatePartialLoader.addPart('global');
            $translatePartialLoader.addPart('format');
            $translatePartialLoader.addPart('error');
            $translatePartialLoader.addPart('uploader');
            $translatePartialLoader.addPart('shipment-documents');

            $translate.refresh();
        }

        return i18nService;
    }
})();
