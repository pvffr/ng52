(function() {
    'use strict';

    angular.module('sidebar').directive('demoSidebar', function(demoService) {
        return {
            restrict: 'E',          
            templateUrl: 'js/components/sidebar/sidebar.html',
            scope: {
                visible: '='
            },
            replace: true,
            controller: function($scope, demoService, $state) {
                $scope.menu = groupByCategory(demoService.components);

                $scope.icons = {
                    Forms: 'receipt',
                    Utils: 'build',
                    Documents: 'description'
                };

                $scope.toggleSubmenu = function(submenu) {
                    submenu.visible = !submenu.visible;
                };

                $scope.goToComponent = function(component) {
                    $state.go('app.main.component', {id: component.id});
                };

                function compare(a,b) {
                    if (a.category < b.category) {
                        return -1;
                    }

                    if (a.category > b.category) {
                        return 1;
                    }

                    return 0;
                }
                    
                function groupByCategory(components) {
                    var categories = [];
                    var currentCategory;

                    components.sort(compare);

                    components.forEach(function(component) {
                        if(component.category !== currentCategory) {
                            currentCategory = component.category;
                            
                            var category = {
                                name: currentCategory,
                                items: []
                            };

                            category.items.push(component);
                            categories.push(category); 
                        }
                        else {
                            categories[categories.length - 1].items.push(component);
                        }
                    });

                    return categories;
                }
            } 
        };
    });

})();
