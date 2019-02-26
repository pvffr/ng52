(function() {
    'use strict';

    angular.module('les-commands').directive('commands', function(lesCommonsWebService) {
        var rootElement;

        return {
            scope : {},
            templateUrl : lesCommonsWebService.base + 'components/les-commands/les.commands.html',
            link: function(scope, element) {
                rootElement = angular.element(element);
            },
            controller: function($scope, hotkeys, $timeout, $filter, CommandsService) {
                var model = $scope.model = CommandsService;
                $scope.toggle = toggle;
                $scope.hide = hide;
                $scope.translate = translate;

                hotkeys.add({
                    combo: 'alt+a',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Abrir terminal de comandos',
                    callback: toggle
                });

                hotkeys.add({
                    combo: 'esc',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Fechar terminal de comandos',
                    callback: hide
                });

                function translate(key) {
                    return $filter('translate')(key);
                }

                function hide() {
                    if(model.visible) {
                        toggle();
                    }
                }
 
                function toggle() {
                    model.toggle();

                    if(model.visible) {
                        $timeout(function() {
                            var select = angular.element(rootElement).find('select');
                            $(select).chosen().trigger('chosen:open');
                        }, 100);
                    }
                }
            }
        };
    });

})();
