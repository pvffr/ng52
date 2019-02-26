(function () {
    'use strict';

    angular.module('les-location').factory('locationEstateService', locationEstateService);

    locationEstateService.$inject = [
        '$http'
    ];

    function locationEstateService(
        $http
    ) {
        var url = 'rest/configuration/states';

        var locationEstateService = {
            getStateById: getStateById,
            getEstates: getEstates
        };

        function getStateById(id) {
            return $http({
                method: 'GET',
                url: url + '/' + id
            }).then(function successCallback(response) {
                return response.data;
            });
        }

        function getEstates(countryIsoCode3) {
            return $http({
                method: 'GET',
                url: url,
                params: {
                    countryIsoCode3: countryIsoCode3
                }
            }).then(function successCallback(response) {
                if (response.data && response.data.content) {
                    return response.data.content;
                }
                return response;
            });
        }

        return locationEstateService;
    }

})();
