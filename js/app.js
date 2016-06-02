var DevBook = angular.module('DevBook', ['ui.router', 'uiRouterStyles']);

DevBook.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $location) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login-view', {
            url:'/login'
            ,   templateUrl: '../templates/login/login.html'
            ,   data: {
                    css: ['../templates/login/login.css']
                }
        })
        .state('register-view', {
            url:'/register'
            ,   templateUrl: '../templates/register/register.html'
            ,   data: {
                    css: ['../templates/register/register.css']
                }
        })
        .state('devs-view', {
            url:'/devs'
            ,   templateUrl: '../templates/devs/devs.html'
            ,   controller: 'devsController'
            ,   data: {
                    css: ['/../templates/devs/devs.css']
                }
        })
}]);

DevBook.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
