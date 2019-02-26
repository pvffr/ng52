(function() {
    'use strict';

    angular.module('les-phone-pattern').directive('lesPhonePattern', function(lesCommonsWebService) {
        return {
            scope: {
                inputPhoneId: '=',
                model: '=ngModel',
                isRequired: '=?',
                placeholderText: '=',
                inputName: '=?',
                minTags: '=?',
                minLength: '=?',
                maxLength: '=?',
                hasVirtualKeyboard: '=?',
                disabled: '=ngDisabled'
            },
            templateUrl: lesCommonsWebService.base + 'components/les-phone-pattern/les-phone-pattern.html',
            link: function($scope) {
                $scope.inputName = $scope.inputName || 'phoneNumbers';
                $scope.minTags = $scope.minTags || 0;
                $scope.minLength = $scope.minLength || 4;
                $scope.maxLength = $scope.maxLength || 17;

                $scope.isNotValid = isNotValid;
                $scope.cleanEmptyModel = cleanEmptyModel;

                $scope.isRequired = !!$scope.isRequired;

                function isNotValid() {
                    return $scope.isRequired && (!$scope.model || $scope.model.length < $scope.minTags);
                }

                function cleanEmptyModel() {
                    if ($scope.model !== undefined && $scope.model.length === 0) {
                        $scope.model = undefined;
                    }
                }
            }
        };
    });
})();
