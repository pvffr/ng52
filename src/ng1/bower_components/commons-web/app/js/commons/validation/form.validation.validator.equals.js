(function() {
    'use strict';

    angular.module('les-validation').directive('lesEqualsValidator', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, ctrl) {
                var modelToMatch = element.attr('les-equals-validator');      
                ctrl.$validators.lesEqualsValidator = function(modelValue, viewValue) {
                    return viewValue === scope.$eval(modelToMatch);
                };
            }
        };
    });

})();
