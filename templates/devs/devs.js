DevBook.controller('devsController', function($scope, $location, profilesFactory, friendsFactory, $interval){
    $scope.profiles = [];

    $scope.singleProfile = function(user){
        $scope.localShow = false
        $scope.showSingleProfile = user;
        console.log($scope.myProfile);
    }

    // ADD FRIEND AND THEN ADD IT TO MY PROFILE - Locally
    $scope.addFriend = function(){
        var myProfile = $scope.myProfile
        ,   friendId = $scope.showSingleProfile._id
        ,   isAlreadyFriend;

        for(var i = 0; i < myProfile.friends.length; i++){
            if(myProfile.friends[i] === friendId){
                isAlreadyFriend = true;
            }
        }
        if(!isAlreadyFriend){
            friendsFactory.add(myProfile._id, friendId).then(function(response){
                myProfile.friends.push(friendId);
                $location.path('/friends');
            });

        }else{
            alert($scope.showSingleProfile.name + ' is already your friend.');
        }
    };


    // REMOVE FRIEND AND THEN REMOVE IT FROM MY PROFILE - Locally
    $scope.removeFriend = function(){
        var myId = $scope.myProfile._id
        ,   friendId = $scope.showSingleProfile._id;

        friendsFactory.remove(myId, friendId).then(function(response){
            $scope.myProfile.friends.splice($scope.myProfile.friends.indexOf(friendId), 1);
        });
    };

    $scope.getProfiles = function(){
        if($scope.profiles.length === 0){
            profilesFactory.getIds().then(function(result){
                for(var i = 0; i < result.length; i++){
                    profilesFactory.getProfiles(result[i]._id).then(function(result){
                        if($scope.myProfile._id !== result._id){
                            $scope.profiles.push(result);
                            localStorage.setItem("profiles", JSON.stringify($scope.profiles));
                        }
                    })
                }
            });
        }
    }

    $interval(function(){
        if($scope.isLogged){
            $scope.getProfiles();
        }
    }, 60000);
});
