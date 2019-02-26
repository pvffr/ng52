(function() {
    'use strict';

    angular.module('les-notification-dialog').factory('notificationService', function(growl, $translate, $transitions) {
        var growlConfiguration = {
            disableIcons: false,
            disableCountDown: true
        };

        var growlMessages = [];

        function getMessageDuration(message) {
            var words = $translate.instant(message).split(' ');
            var msPerWord = 500;
            var duration = 0;
            var minDuration = 3000;

            if (words.length) {
                duration = words.length * msPerWord;
            }

            duration = duration < minDuration ? minDuration : duration;

            return duration;
        }

        function error(message, hasTtl, keepOnRouteChange) {
            var error = growl.error(
                message.text,
                angular.merge(
                    {
                        title: message.title,
                        variables: translateParameters(message.parameters),
                        ttl: hasTtl ? getMessageDuration(message.text) : 0
                    },
                    growlConfiguration
                )
            );

            if (!keepOnRouteChange) {
                growlMessages.push(error);
            }

            return error;
        }

        function success(message) {
            var success = growl.success(
                message.text,
                angular.merge(
                    {
                        title: message.title,
                        variables: translateParameters(message.parameters),
                        ttl: getMessageDuration(message.text)
                    },
                    growlConfiguration
                )
            );

            return success;
        }

        function info(message) {
            var info = growl.info(
                message.text,
                angular.merge(
                    {
                        title: message.title,
                        variables: translateParameters(message.parameters),
                        ttl: getMessageDuration(message.text)
                    },
                    growlConfiguration
                )
            );

            return info;
        }

        function warning(message) {
            var warning = growl.warning(
                message.text,
                angular.merge(
                    {
                        title: message.title,
                        variables: translateParameters(message.parameters)
                    },
                    growlConfiguration
                )
            );

            growlMessages.push(warning);

            return warning;
        }

        function translateParameters(parameters) {
            if (parameters) {
                for (var parameter in parameters) {
                    parameters[parameter] = $translate.instant(parameters[parameter]);
                }
            }

            return parameters;
        }

        function errorWithParams(params) {
            //if(params.errorHeader) {
            //var text = prepareNotificaitonWithHeader(params);

            //error({text: text});
            //} else {
            params.errors.forEach(function(errorItem) {
                error({ text: errorItem.key, title: errorItem.title, parameters: errorItem.parameters }, false, true);
            });
            //}
        }

        function warningWithParams(params) {
            //if(params.errorHeader) {
            //var text = prepareNotificaitonWithHeader(params);

            //warning({text: text});
            //} else {
            params.errors.forEach(function(errorItem) {
                warning({ text: errorItem.key, title: errorItem.title, parameters: errorItem.parameters });
            });
            //}
        }

        //	function prepareNotificaitonWithHeader(params) {
        //		var text = '<div class=\'break-words\'>';
        //		text += '<strong>' + $translate.instant(params.errorHeader) + '</strong>';
        //		text += '<br><ul>';
        //
        //		params.errors.forEach(function(error) {
        //			var parameters = translateParameters(error.parameters);
        //			text += '<li>' + $translate.instant(error.key, parameters) + '</li>';
        //		});
        //
        //		text += '</ul></div>';
        //
        //		return text;
        //	}

        function clearErrorsOnChangeRoute() {
            $transitions.onSuccess({}, function() {
                if (growlMessages.length) {
                    growlMessages.map(function(message) {
                        if (message) {
                            message.destroy();
                        }
                    });
                }
            });
        }

        clearErrorsOnChangeRoute();

        return {
            error: error,
            success: success,
            info: info,
            warning: warning,
            errorWithParams: errorWithParams,
            warningWithParams: warningWithParams,
            translateParameters: translateParameters
        };
    });
})();
