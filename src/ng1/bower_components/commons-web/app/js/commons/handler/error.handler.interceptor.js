(function() {
    'use strict';

    angular.module('les-handlers').factory('errorHttpInterceptor', errorHttpInterceptor);

    errorHttpInterceptor.$inject = ['$q', 'notificationService', 'blockUI'];

    function errorHttpInterceptor($q, notificationService, blockUI) {
        return {
            responseError: function responseError(rejection) {
                console.log(rejection);

                if (rejection.data) {
                    if (rejection.status >= 500 && rejection.status <= 599) {
                        if (rejection.data.errors) {
                            notificationService.errorWithParams(rejection.data);
                        } else {
                            notificationService.error({
                                text: 'error.server.error'
                            });
                        }
                    } else if (rejection.status !== 401) {
                        if (rejection.data.errors) {
                            notificationService.warningWithParams(rejection.data);
                        } else {
                            notificationService.warning({
                                text: 'error.generic.error'
                            });
                        }
                    }
                }

                blockUI.stop();

                return $q.reject(rejection);
            }
        };
    }
})();
