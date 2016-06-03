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
            url:'/developers'
            ,   templateUrl: '../templates/devs/devs.html'
            ,   data: {
                    css: ['/../templates/devs/devs.css']
                }
        })
        .state('friends-view', {
            url:'/friends'
            ,   templateUrl: '../templates/friends/friends.html'
            ,   data: {
                    css: ['/../templates/friends/friends.css']
                }
        })
        .state('update-view', {
            url:'/update'
            ,   templateUrl: '../templates/update/update.html'
            ,   data: {
                    css: ['/../templates/update/update.css']
                }
        })
        .state('chat-view', {
            url:'/chat'
            ,   templateUrl: '../templates/chat/chat.html'
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
