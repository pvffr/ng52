(function() {
    'use strict';

    angular.module('les-filters').filter('filterByI18n', function($translate) {
        return function(items, search, key) {
            var filtered = [];

            if(!search) {
                return items;
            }

            items.map(function(item) {
                var text = $translate.instant(item[key]);

                if(text) {
                    if(text.toLowerCase().includes(search.toLowerCase())) {
                        filtered.push(item);
                    }
                }
            });

            return filtered;
        };
    });

})();
