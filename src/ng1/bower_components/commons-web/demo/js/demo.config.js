(function() {
    'use strict';

    angular.module('demo').config(function(
        lesCommonsWebServiceProvider,
        $httpProvider,
        tmhDynamicLocaleProvider,
        $urlRouterProvider,
        $translateProvider
        ) {

        $translateProvider.useLoader('$translatePartialLoader', { urlTemplate : '/app/i18n/{lang}/{part}.json' });
        $translateProvider.preferredLanguage('pt-br');
        $translateProvider.useCookieStorage();
        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.storageKey('NG_TRANSLATE_LANG_KEY');
        
        lesCommonsWebServiceProvider.setBasePath('/app/js/');

        $urlRouterProvider.otherwise('/');

        // $httpProvider.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8";
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        var token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsY2FydmFsaG8iLCJwcm9maWxlcyI6Ilt7XCJpZFwiOjEwLFwibmFtZVwiOlwicHJvZmlsZVwiLFwicGVybWlzc2lvbnNcIjpbXCJFRElUX1NFUlZJQ0VfUkVRVUVTVFwiLFwiREVQQVJUVVJFX0lOU1BFQ1RJT05cIixcIkFSUklWQUxfQVRfRE9DS1wiLFwiU0lURV9NQU5BR0VNRU5UXCIsXCJET0NLX1NDSEVEVUxJTkdfVklFV1wiLFwiVU5MT0FEXCIsXCJWRUhJQ0xFX1RZUEVfTUFOQUdFTUVOVFwiLFwiUkVMRUFTRV9UT19ET0NLXCIsXCJET0NLX1NDSEVEVUxJTkdfVVBEQVRFXCIsXCJTRVJWSUNFX1BST1ZJREVSX01BTkFHRU1FTlRcIixcIkFSUklWQUxcIixcIkNPTkZJUk1fU0VSVklDRV9SRVFVRVNUXCIsXCJDQU5DRUxfU0VSVklDRV9SRVFVRVNUXCIsXCJDT05GRVJFTkNFXCIsXCJET0NLX1NDSEVEVUxJTkdfQ0FOQ0VMXCIsXCJSRVBPUlRfUFJPQ0VTU19TSElQTUVOVFwiLFwiQVNTSUdOX0RPQ0tcIixcIlNFQVJDSF9TSElQTUVOVFNcIixcIkRPQ0tfU0NIRURVTElOR19DUkVBVEVcIixcIlJFUVVFU1RfVFJBTlNGRVJfRE9DS1wiLFwiUkVKRUNUSU9OX0lOVk9JQ0VcIixcIlBJQ0tVUF9QT1JUQUxfUFVCTElDXCIsXCJSRUpFQ1RfU0hJUE1FTlRcIixcIkNSRUFURV9HRU5FUkFMXCIsXCJSRUxFQVNFX0ZST01fRE9DS1wiLFwiRU5UUkFOQ0VfSU5TUEVDVElPTlwiLFwiU0hJUE1FTlRfTUFOQUdFTUVOVFwiLFwiVklFV19TRVJWSUNFX1JFUVVFU1RcIixcIkRPQ0tfTUFOQUdFTUVOVFwiLFwiQVBQUk9WRV9UUkFOU0ZFUlwiLFwiRFJJVkVSX01BTkFHRU1FTlRcIixcIkFQUFJPVkVfU0VSVklDRV9SRVFVRVNUXCIsXCJSRUdJU1RFUl9TSElQTUVOVF9BUlJJVkFMXCIsXCJDUkVBVEVfUElDS1VQX1BPUlRBTFwiLFwiUkVQUk9WRV9UUkFOU0ZFUlwiLFwiUkVHSVNURVJfRE9DVU1FTlRfTUFOVUFMXCIsXCJMT0FEXCIsXCJSRUpFQ1RfU0VSVklDRV9SRVFVRVNUXCIsXCJGSU5BTElaRV9TRVJWSUNFX1JFUVVFU1RcIixcIkxPQURfTUFOQUdFTUVOVFwiLFwiQ1JFQVRFX1NFUlZJQ0VfUkVRVUVTVFwiXSxcIndvcmtwbGFjZXNcIjpbMSwyLDMsNCw1LDEzOCwxMzksMTQwXSxcInNpdGVzXCI6WzFdLFwic3lzdGVtUHJvZmlsZUluZm9cIjpudWxsfV0iLCJsYW5ndWFnZV90eXBlIjoiUFRfQlIifQ.A63iINEdZGXV4U89jU5hCBkcXmdaUnXXWloulXjAFQC7W2LxcKwG4ZK0je8pKBXSkSmn2mm27JADFvIrkQYxV1Ffy42Rk7-K4c6OIIPAbiAcgfZLCWNzQvCIjpvfyoXUB5IzhbIITrjRbsjmiv1rJTf7dpDwxhYSimN33FDuKZ7FpGoLH7NCWlnB5vJ2JMcM-9nFpOjCc6f7jyqXRVDPklhO9Vlz5vFSbn0Qi6zBKoteyc4YbI_6pUEMMbjTUFfCFp0BcGaQYtQ_Bs3hGzibWNF1upZYRKSzrQSRGx2UyghCEzAhu7CoHBXbwXxXmVLckEqRqNefS7ESqXBzLjhaGg'; 
        $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;

    }); 

})();
