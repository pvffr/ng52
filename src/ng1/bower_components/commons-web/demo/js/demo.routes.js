(function() {
    'use strict';

    angular.module('demo').config(function($stateProvider) {
        $stateProvider.state('app', {
            abstract: true
        });

        $stateProvider.state('app.main', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'views/home.html'
                }
            },
            data: {
                title: 'Ambiente de desenvolvimento'
            }
        });

        $stateProvider.state('app.main.component', {
            url: ':id',
            views: {
                'content@': {
                    templateUrl: 'views/component.html',
                    controller: 'componentController',
                    controllerAs: 'componentCtrl'
                }
            },
            data: {
                breadcrumbs: ['Home'],
                topic: undefined
            },
            resolve: {
				translatePartialLoader : [ '$translate', function($translate) {
					return $translate.refresh();
				} ],
                component: ['demoService', '$stateParams', function(demoService, $stateParams) {
                    return demoService.get($stateParams.id);
                }]
            }
        });

    });

})();
