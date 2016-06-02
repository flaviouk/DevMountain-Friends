DevBook.controller('devsController', function($scope, profilesFactory, $timeout){
    $scope.profiles = [];
    var localProfiles = JSON.parse(localStorage.getItem("profiles"));
    for(var key in localProfiles){
        $scope.profiles.push(localProfiles[key]);
    }

    $scope.showSingleProfile = [];
    $scope.showSingleProfile.push($scope.myProfile);

    $scope.getProfiles = function(){
        if($scope.profiles.length === 0){
            profilesFactory.getIds().then(function(result){
                for(var i = 0; i < result.length; i++){
                    profilesFactory.getProfiles(result[i]._id).then(function(result){
                        $scope.profiles.push(result);
                        localStorage.setItem("profiles", JSON.stringify($scope.profiles));
                    })
                }
            });
        }
    }

    $scope.singleProfile = function(user){
        $scope.showSingleProfile[0] = user;
        console.log(user);
    }

    // $scope.postProfile = function(){
    //     profilesFactory.postProfile({name: 'Flavio Carvalho', tagline: 'Awesome Tagline', bio: 'yoooooooo', profileUrl: 'https://avatars0.githubusercontent.com/u/8357327?v=3&s=460'});
    // }
});
