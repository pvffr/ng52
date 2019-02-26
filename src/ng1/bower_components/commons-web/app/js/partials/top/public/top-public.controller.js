(function() {
    'use strict';
    angular.module('les-top').controller('publicTopController', publicTopController);

    publicTopController.$inject = ['headerModel'];

    function publicTopController(headerModel) {
        var self = this;

        activate();

        function activate() {
            self.model = headerModel;
        }
    }
})();
