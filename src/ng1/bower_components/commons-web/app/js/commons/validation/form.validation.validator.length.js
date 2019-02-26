(function () {
    'use strict';

    angular.module('les-validation').directive('lesMinLengthValidator', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                var minLengh;

                scope.$watch(function () { return ctrl.$modelValue && ctrl.$modelValue.length; }, function () {
                    ctrl.$validate();
                });

                scope.$watch(function () { return element.attr('les-min-length-validator'); }, function (value) {
                    minLengh = (value !== 'false') ? (parseInt(value) || 1) : false;
                    ctrl.$setValidity('lesMinLengthValidator', ctrl.$validators.lesMinLengthValidator());
                });

                ctrl.$validators.lesMinLengthValidator = function () {
                    if (minLengh === false) { return true; }
                    var arr = ctrl.$modelValue;
                    if (!arr) { return false; }
                    return arr.length > (minLengh - 1);
                };
            }
        };
    });

    angular.module('les-validation').directive('lesEqualsLengthValidator', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                var length;

                scope.$watch(function () { return ctrl.$modelValue && ctrl.$modelValue.length; }, function () {
                    ctrl.$validate();
                });

                scope.$watch(function () { return element.attr('les-equals-length-validator'); }, function (value) {
                    length = (value !== 'false') ? (parseInt(value) || 1) : false;
                    ctrl.$setValidity('lesEqualsLengthValidator', ctrl.$validators.lesEqualsLengthValidator());
                });

                ctrl.$validators.lesEqualsLengthValidator = function () {
                    if (length === false) { return true; }
                    var arr = ctrl.$modelValue;
                    if (!arr) { return false; }
                    return arr.length === length;
                };
            }
        };
    });

})();
