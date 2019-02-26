(function () {
    'use strict';

    angular.module('les-email-pattern').directive('lesEmailPattern', function (lesCommonsWebService) {
        return {
            scope: {
                'inputEmailId': '=',
                'model': '=ngModel',
                'isRequired': '=?',
                'placeholderText': '=',
                'inputName': '=?',
                'minTags': '=?',
                'hasVirtualKeyboard': '=?',
                'disabled': '=ngDisabled'
            },
            templateUrl: lesCommonsWebService.base + 'components/les-email-pattern/les-email-pattern.html',
            link: function ($scope) {

                $scope.isNotValid = isNotValid;
                $scope.cleanEmptyModel = cleanEmptyModel;

                $scope.isRequired = !!$scope.isRequired;

                if (!$scope.inputName) {
                    $scope.inputName = 'inputEmails';
                }

                if (!$scope.minTags) {

                    if ($scope.isRequired) {
                        $scope.minTags = 1;
                    }
                    else {
                        $scope.minTags = 0;
                    }
                }

                function isNotValid() {
                    return ($scope.isRequired) && (!$scope.model || $scope.model.length < $scope.minTags);
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
