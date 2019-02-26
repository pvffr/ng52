(function() {
    'use strict';

    angular
        .module('commons-web')
        .run(function(validator, lesElementModifier, lesErrorMessageResolver, lesCommonsWebService, blockUIConfig) {
            validator.setValidElementStyling(false);
            validator.registerDomModifier(lesElementModifier.key, lesElementModifier);
            validator.setDefaultElementModifier(lesElementModifier.key);
            validator.setErrorMessageResolver(lesErrorMessageResolver.resolve);
            // validator.defaultFormValidationOptions.validateOnFormSubmit = true;

            blockUIConfig.templateUrl = lesCommonsWebService.base + 'partials/block-ui/block-ui.html';
        });
})();
