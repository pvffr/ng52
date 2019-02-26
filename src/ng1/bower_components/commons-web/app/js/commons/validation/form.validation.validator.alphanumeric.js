(function () {
    'use strict';

    angular.module('les-validation').directive('lesAlphanumericValidator', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$validators.lesAlphanumericValidator = function (modelValue, viewValue) {
                    var alphanumericRegex = /^([A-Z0-9a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+)$/;
                    return alphanumericRegex.test(viewValue);
                };

            }
        };
    });

})();
