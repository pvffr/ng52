(function() {
    'use strict';

    angular.module('demo').run(function(demoService) {
        demoService.add({
            title: 'Commands',
            category: 'Utils',
            path: '/app/js/components/les-commands/',
            description: 'demo/les.commands.demo.md',
            demo: 'demo/les.commands.demo.html',
            files: [
                'les.commands.module.js',
                'les.commands.service.js',
                'les.commands.directive.js',
            ],
            // test: 'les.commands.spec.js'
        });
    });

    angular.module('demo').controller('commandsDemoCtrl', function() {
     
    });

})();


