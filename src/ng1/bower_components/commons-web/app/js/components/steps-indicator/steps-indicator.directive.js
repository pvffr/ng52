(function () {
    'use strict';

    angular.module('les-steps-indicator').directive('stepsIndicator', function (lesCommonsWebService) {
        return {
            restrict: 'E',
            require: '^steps',
            scope: {
                'steps': '='
            },
            bindToController: true,
            templateUrl: lesCommonsWebService.base + 'components/steps-indicator/steps-indicator.html',
            controllerAs: 'stepsIndicatorCtrl',
            controller: function ($state) {
                var self = this;
                self.stringifyStepClass = stringifyStepClass;
                self.isVisible = isVisible;
                self.isDone = isDone;
                self.getStepIndex = getStepIndex;

                function isVisible(step) {
                    return (typeof step.isVisible === 'function') ? step.isVisible() : true;
                }

                function isDone(stepIndex) {
                    return stringifyStepClass(stepIndex) === 'done';
                }

                function getStepIndex(step) {
                    var visibleSteps = self.steps.filter(function (_step) {
                        return isVisible(_step);
                    });
                    return visibleSteps.indexOf(step) + 1;
                }

                function stringifyStepClass(stepIndex) {
                    var currentStepIndex = self.steps.map(function (step) {
                        return step.stateName;
                    }).indexOf($state.$current.name);
                    if (stepIndex < currentStepIndex) {
                        return 'done';
                    }
                    if (stepIndex === currentStepIndex) {
                        return 'active';
                    }
                    return '';
                }
            }
        };
    });

})();
