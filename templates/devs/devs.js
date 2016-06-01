DevBook.controller('devsController', function($scope, profilesFactory, $timeout){

    $scope.profiles = [];

    $scope.getProfiles = function(id){
        profilesFactory.getProfiles(id).then(function(result){
            $scope.profiles.push(result);
        })
    }

    $scope.getIds = function(){
        profilesFactory.getIds().then(function(result){
            // var profiles = result.data;
            // var ids = [];
            for(var i = 0; i < result.data.length; i++){
                $scope.getProfiles(result.data[i]._id);
            }

        });
    };

    $scope.deleteProfile = function(id){
        profilesFactory.deleteProfile(id).then(function(result){
            console.log('Deleted ', id, result);
        })
    }

    $timeout(function(){
        // console.log($scope.profiles.data.length, 'DATA LEN');
        // console.log($scope.profiles, 'PROFILES');
        for(var i = 0; i < $scope.profiles.length; i++){
            if($scope.profiles[i].data.name === 'Jordan'){

                $scope.deleteProfile($scope.profiles[i].data._id);
                console.log($scope.profiles[i].data.name, $scope.profiles[i].data._id);
            }
        }
    }, 20000);




    $scope.postProfile = function(){
        profilesFactory.postProfile({name: 'Flavio Carvalho', tagline: 'Awesome Tagline', bio: 'yoooooooo', profileUrl: 'https://avatars0.githubusercontent.com/u/8357327?v=3&s=460'});
    }
});


// angular.module('ntigo')
//   .controller('adminCtrl', ['$scope', 'userService', '$state', '$cookies', function($scope, userService, $state, $cookies) {
//   }]);
