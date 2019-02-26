(function() {
    'use strict';

    angular.module('les-confirm').service('confirmService', function($confirm, $translate) {

        var defaultConfiguration = {
            title: 'global.confirm',
            ok: 'global.yes',
            cancel: 'global.no'
        };

        function confirm(confirmConfiguration) {
           var config = {
                text: $translate.instant(confirmConfiguration.text || defaultConfiguration.text, translateParameters(confirmConfiguration.parameters)),
                title: $translate.instant(confirmConfiguration.title || defaultConfiguration.title),
                ok: $translate.instant(confirmConfiguration.ok || defaultConfiguration.ok),
                cancel: $translate.instant(confirmConfiguration.cancel || defaultConfiguration.cancel),
                breakLine : confirmConfiguration.breakLine || false
           };

           return $confirm(config, config.breakLine ? {windowClass : 'modal-break-line'} : undefined);
        }
        
        function translateParameters(parameters) {
            if (parameters) {
                for(var parameter in parameters) {
                    parameters[parameter] = $translate.instant(parameters[parameter]);
                }
            }

            return parameters;
        }

        return {
            confirm: confirm
        };
    });

})();
