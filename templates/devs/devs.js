DevBook.controller('devsController', function($scope, profilesFactory, $timeout){
    $scope.profiles = [];

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
        $scope.localShow = false;
        $scope.showSingleProfile[0] = user;
    }
});
