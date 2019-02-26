(function() {
    'use strict';

    angular.module('demo').factory('demoService', demoService);

    demoService.$inject = [];

    var id = 1;

    function demoService() {
        var demoService = {
            components: [],
        };

        function add(component) {
            component.id = id++;
            demoService.components.push(component);
        }

        function get(id) {
            return demoService.components.find(function(component) {
                return component.id === parseInt(id);
            });
        }

        angular.extend(demoService, {
            add: add,
            get: get
        })

        return demoService;
    }

})();
