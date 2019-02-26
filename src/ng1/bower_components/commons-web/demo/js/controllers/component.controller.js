(function() {
    'use strict';

    angular.module('demo').controller('componentController', function(
        $rootScope, 
        $state,
        component) {

        var self = this;

        activate();

        function activate() {
            self.component = component;

            $rootScope.viewInfo = {};
            $rootScope.viewInfo.title = component.title;
        }

    });

})();
