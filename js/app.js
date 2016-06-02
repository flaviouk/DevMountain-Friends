var DevBook = angular.module('DevBook', ['ui.router', 'uiRouterStyles']);

DevBook.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $location) {

    // if(loginFactory.isLoggedIn){
    //   $urlRouterProvider.otherwise('/devs');
    // }
    // if(!loginFactory.isLoggedIn){
    //   $urlRouterProvider.otherwise('/login');
    // }


    $stateProvider
        .state('login-view', {
            url:'/login'
            ,   templateUrl: '../templates/login/login.html'
            // ,   controller: 'loginController'
            ,   data: {
                    css: ['../templates/login/login.css']
                }
        })
        .state('register-view', {
            url:'/register'
            ,   templateUrl: '../templates/register/register.html'
            // ,   controller: 'registerController'
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




    // angular.module('devmtnFriends', ['ngMaterial', 'ui.router'])
    //     .config(function($stateProvider, $urlRouteProvider){
    //         $stateProvider
    //             .state('home',{
    //                 url: '/home',
    //                 templateUrl: './views/friends-view.html',
    //                 // controller: 'thecontroller'
    //                 // data: ['', ''] stylesheet
    //                 // views:{
    //                 //     'tab1:{
    //                 //         templateUrl: '',
    //                 //         controller
    //                 //     }'
    //                 // }
    //                 //when using tabs need tabsController.home
    //             }
    //         );
    //         $urlRouteProvider.otherwise('./');
    //     });
