(function() {
    'use strict';

    angular.module('les-user').factory('userContextService', userContextService);

    userContextService.$inject = ['localStorageService'];

    function userContextService(localStorageService) {
        var userContextService = {
            getCurrentDock: getCurrentDock,
            updateCurrentDock: updateCurrentDock
        };

        function getCurrentDock() {
            if (!localStorageService.get('CURRENT_DOCK')) {
                updateCurrentDock();
            }

            return localStorageService.get('CURRENT_DOCK');
        }

        function updateCurrentDock(dock) {
            localStorageService.set('CURRENT_DOCK', dock);
        }
        return userContextService;
    }
})();
