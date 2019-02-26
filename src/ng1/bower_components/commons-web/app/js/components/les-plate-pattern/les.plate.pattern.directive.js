(function () {
    'use strict';

    angular.module('les-plate-pattern').directive('lesPlatePattern', function (lesCommonsWebService) {
        return {
            scope: {
                'inputPlateId': '=',
                'model': '=ngModel',
                'isRequired': '=?',
                'placeholderText': '=',
                'inputName': '=?',
                'minTags': '=?',
                'hasVirtualKeyboard': '=?',
                'disabled': '=ngDisabled'
            },
            templateUrl: lesCommonsWebService.base + 'components/les-plate-pattern/les-plate-pattern.html',
            link: function ($scope) {

                $scope.isNotValid = isNotValid;
                $scope.capitalize = capitalize;
                $scope.cleanEmptyModel = cleanEmptyModel;

                $scope.isRequired = !!$scope.isRequired;

                if (!$scope.inputName) {
                    $scope.inputName = 'inputPlates';
                }

                if (!$scope.minTags) {

                    if ($scope.isRequired) {
                        $scope.minTags = 1;
                    }
                    else {
                        $scope.minTags = 0;
                    }
                }

                function capitalize(tag) {
                    tag.text = tag.text.toUpperCase();
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
