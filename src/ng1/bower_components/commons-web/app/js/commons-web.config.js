(function() {
    'use strict';

    angular.module('commons-web').config(function($permissionProvider, lesCommonsWebServiceProvider) {
        lesCommonsWebServiceProvider.setBasePath('');
        $permissionProvider.suppressUndefinedPermissionWarning(true);
    });
})();
