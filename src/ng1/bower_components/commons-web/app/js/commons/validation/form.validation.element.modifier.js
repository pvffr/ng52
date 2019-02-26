(function() {
    'use strict';

    angular.module('les-validation').factory('lesElementModifier', LesElementModifierFn);

    LesElementModifierFn.$inject = ['$log', 'notificationService'];

    function LesElementModifierFn($log, notificationService) {
        var reset = function(el) {
                el.removeClass('has-success has-error has-feedback');
            },
            findWithClassElementAsc = function(el, klass) {
                var returnEl,
                    parent = el;
                for (var i = 0; i <= 10; i += 1) {
                    if (parent !== undefined && parent.hasClass(klass)) {
                        returnEl = parent;
                        break;
                    } else if (parent !== undefined) {
                        parent = parent.parent();
                    }
                }

                return returnEl;
            },
            findWithClassElementDesc = function(el, klass) {
                var child;
                for (var i = 0; i < el.children.length; i += 1) {
                    child = el.children[i];
                    if (child !== undefined && angular.element(child).hasClass(klass)) {
                        break;
                    } else if (child.children !== undefined) {
                        child = findWithClassElementDesc(child, klass);
                        if (child.length > 0) {
                            break;
                        }
                    }
                }

                return angular.element(child);
            },
            findFormGroupElement = function(el) {
                return findWithClassElementAsc(el, 'form-group');
            },
            logInvalidStructure = function() {
                $log.error(
                    'Angular-auto-validate: invalid bs form structure elements must be wrapped by a form-group class'
                );
            },
            makeInvalid = function(el, errorMsg) {
                var frmGroupEl = findFormGroupElement(el);

                if (frmGroupEl) {
                    reset(frmGroupEl);
                    frmGroupEl.addClass('has-error');

                    if (errorMsg) {
                        notificationService.error(
                            {
                                text: errorMsg
                            },
                            true
                        );
                    }
                } else {
                    logInvalidStructure();
                }
            },
            makeDefault = function(el) {
                var frmGroupEl = findFormGroupElement(el);
                if (frmGroupEl) {
                    reset(frmGroupEl);
                } else {
                    logInvalidStructure();
                }
            },
            waitForAsyncValidators = function(el) {
                var frmGroupEl = findFormGroupElement(el);

                if (frmGroupEl) {
                    reset(frmGroupEl);
                    frmGroupEl.addClass('has-feedback');
                } else {
                    logInvalidStructure();
                }
            };

        return {
            makeInvalid: makeInvalid,
            makeDefault: makeDefault,
            waitForAsyncValidators: waitForAsyncValidators,
            key: 'lesbs'
        };
    }
})();
