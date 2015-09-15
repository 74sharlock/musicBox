'use strict';

/**
 * @ngdoc overview
 * @name musicBoxApp
 * @description
 * # musicBoxApp
 *
 * Main module of the application.
 */
window.app = angular.module('musicBoxApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'froala'
]);

app.value('froalaConfig', {
    inlineMode: false,
    events : {
        align : function(e, editor, alignment){
            //console.log(alignment + ' aligned');
        }
    }
});

app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/resource/views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'Main'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$templateCache', function ($templateCache) {

}]);
