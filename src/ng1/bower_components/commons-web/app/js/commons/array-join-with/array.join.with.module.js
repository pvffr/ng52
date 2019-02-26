(function() {
    'use strict';
    angular.module('les-array-join-with', []).config(function() {
    	
    	if (!Array.prototype.joinWith) {
    		Array.prototype.joinWith = function(b, select) {
    			var a = this;
    			var m = a.length, n = b.length, c = [];

    			for (var i = 0; i < m; i++) {
    				var x = a[i];

    				for (var j = 0; j < n; j++) {
    					var y = select(x, b[j]);
    					if (y) {
    						c.push(y);
    					}
    				}
    			}

    			return c;
    		};
    	}
    	
    });
    
})();
