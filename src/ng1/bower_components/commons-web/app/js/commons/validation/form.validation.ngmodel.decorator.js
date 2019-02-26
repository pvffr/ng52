(function() {
    'use strict';

    angular.module('les-validation').config(function ($provide) {

        $provide.decorator('ngModelDirective', function($delegate) {
            var directive = $delegate[0],
                shouldSetBlurUpdateEvent = function (element) {
                    var nodeName = element.nodeName, 
                        inputType =  element.type,
                        isDatePicker = element.getAttribute('uib-datepicker-popup');
                        
                    // The blur event is only really applicable to input controls so
                    // we want to stick with the default events for selects, checkboxes & radio buttons
                    return nodeName.toLowerCase() === 'textarea' ||
                        (nodeName.toLowerCase() === 'input' && 
                         inputType.toLowerCase() !== 'checkbox' && 
                         inputType.toLowerCase() !== 'radio' &&
                         inputType.toLowerCase() !== 'search') &&
                        !isDatePicker;
                    };

            // save a reference to the original compile function
            var compileFn = directive.compile;

            directive.compile = function () {   

                var link = compileFn.apply(this, arguments);

                return {
                    pre: function ngModelPostLink(scope, element, attr, ctrls) {

                        if(!ctrls[2]) {
                            ctrls[2] = {};
                        }

                        var ngModelOptions = ctrls[2];

                        if (ngModelOptions.$options === undefined && shouldSetBlurUpdateEvent(element[0])) {
                            ngModelOptions.$options = {
                                updateOn: 'blur',
                                updateOnDefault: false
                            };
                        }

                        link.pre.apply(this, arguments);
                    },
                    post: link.post
                };
            };

            return $delegate;
        });
    });
})();
