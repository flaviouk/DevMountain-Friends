var DevBook = angular.module('DevBook', ['ui.router', 'uiRouterStyles']);

DevBook.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('initial-view', {
            url:'/'
            ,   templateUrl: '../templates/initial/initial-view.html'
            // ,   controller: 'initialController'
            ,   data: {
                    css: ['../templates/initial/initial-view.css']
                }
        })
        .state('devs-view', {
            url:'/devs'
            ,   templateUrl: '../templates/devs/devs-view.html'
            ,   controller: 'devsController'
            ,   data: {
                    css: ['/../templates/devs/devs-view.css']
                }
        }).state('search-view', {
            url:'/search'
            ,   templateUrl: '../templates/search/search-view.html'
            ,   controller: 'searchController'
            ,   data: {
                    css: ['/../templates/search/search-view.css']
                }
        });

}]);






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
