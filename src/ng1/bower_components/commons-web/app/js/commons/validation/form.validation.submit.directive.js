(function() {
    'use strict';

    angular.module('les-validation').directive('lesSubmit', function() {
        return {
            link: function(scope, element, attributes) {
                element.bind('click', function() {
                    var form = angular.element(document.querySelector('[name="' + attributes.lesSubmit + '"]'));
                    form.triggerHandler('submit');
                });
            }
        };
    });
})();
