(function () {
    'use strict';

    angular.module('les-location').factory('locationCountryService', locationCountryService);

    locationCountryService.$inject = [
        '$http'
    ];

    function locationCountryService(
        $http
    ) {

        var url = 'rest/configuration/countries';

        var locationCountryService = {
            getCountries: getCountries,
            getCountryByCode: getCountryByCode
        };

        function getCountries() {
            return $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                if (response.data && response.data.content) {
                    response.data = response.data.content;
                }
                return response;
            });
        }

        function getCountryByCode(code) {
            return $http({
                method: 'GET',
                url: url + '/' + code
            }).then(function successCallback(response) {
                return response;
            });
        }

        return locationCountryService;
    }

})();
