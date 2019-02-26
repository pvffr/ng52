(function() {
    'use strict';

    angular.module('les-validation').factory('lesErrorMessageResolver', lesErrorMessageResolver);

    lesErrorMessageResolver.$inject = [
        '$q',
        'lesElementModifier',
        '$translate'
    ];

    function lesErrorMessageResolver(
        $q,
        lesElementModifier,
        $translate) {

        function formatString(string, params) {
            return string.replace(/{(\d+)}/g, function (match, number) {
                return typeof params[number] !== undefined ? params[number] : match;
            });
        }

        function convertToTrainCase(str) {
            return str.replace(/(?:^|\.?)([A-Z])/g, function (x, y){
                return '-' + y.toLowerCase();
            }).replace(/^-/, '');
        }

        function getParameters(errorType, el) {
            var parameters = [];

            if (el && el.attr) {
                try {
                    var parameter = el.attr('ng-' + errorType);
                    if (parameter === undefined) {
                        var type = convertToTrainCase(errorType);
                        parameter = el.attr(type);
                    }

                    parameters.push(parameter || '');
                } catch (e) {}
            }

            return parameters;
        }

        // Foca components como ng-tags-input e chosen
        function focusCustomComponents(el) {
            if(!el.context) {
                return;
            }
            
            var form = el.context.form;

            if(!form) {
                return;
            }

            for (var i = 0; i < form.length; i++) {
                var input = angular.element(form[i]);
                var group = $(input).closest('.form-group');
                
                if(input.is(':visible') && group.hasClass('has-error')) {

                    // ngTagsInput
                    if(el[0].type === 'hidden') {
                        input.focus();
                    }
                    
                    // chosen
                    if(el[0].type === 'select-one') {
                        $(input).trigger('chosen:open');
                    }

                    // ui-select
                    // todo

                    break;
                }
            }
        }

        function getMessageTypeOverride(errorType, el) {
            var overrideKey;

            if (el) {
                errorType += '-err-type';
                overrideKey = el.attr('ng-' + errorType);

                if (overrideKey === undefined) {
                    overrideKey = el.attr('data-ng-' + errorType) || el.attr(errorType);
                }

                if (overrideKey) {
                    overrideKey = overrideKey.replace(/[\W]/g, '');
                }
            }

            return overrideKey;
        }

        var resolve = function (errorType, el) {
            var defer = $q.defer();
            var messageTypeOverride = getMessageTypeOverride(errorType, el);
            var error = messageTypeOverride || errorType;

            $translate('error.' + error).then(function(errorMessage) {
                var params = getParameters(errorType, el);
                var messageFormated = formatString(errorMessage, params);
                lesElementModifier.makeInvalid(el, messageFormated);

                focusCustomComponents(el);

            }, function() {
                lesElementModifier.makeInvalid(el, 'Chave de tradução do erro não encontrada: ' + errorType);
            });

            return defer.promise;
        };

        return {
            resolve: resolve
        };
    }

})();
