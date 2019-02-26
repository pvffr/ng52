(function () {
    'use strict';

    angular.module('les-validation').directive('lesStringTimeValidator', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                var stringTimeRegex = /^([0-9]+d)? ?([0-9]+h)? ?([0-9]+m)?$/;
                ctrl.$validators.lesStringTimeValidator = function (modelValue) {
                    return stringTimeRegex.test(modelValue);
                };
            }
        };
    });

})();
