DevBook.controller('theController',
['$scope', '$interval','$location', 'authFactory', 'profilesFactory', 'friendsFactory',
function($scope, $interval,$location, authFactory, profilesFactory, friendsFactory) {
    // GLOBAL VARIABLES #########################################
    $scope.myProfile;
    $scope.profiles = [];
        // LOGIN STATE
        $scope.isLogged = false;
        // Toggle Beetween Profiles in Devs view TODO make it work with friends
        $scope.localShow = true;


    // METHODS ##################################################
        // AUTH *************************************************
            // Login //TODO Path
            $scope.login = function(name, id){
                authFactory.login(name, id)
                    .then(function(result){
                        if(result !== false){
                            $scope.myProfile = result;
                            $scope.isLogged = true;
                            $location.path('/developers');
                        }
                    });
            };
            // Logout
            $scope.logout = function(){
                $scope.isLogged = false;
                $location.path('/login');
            };
            // Register //TODO Make better alerts
            $scope.register = function(name, tagline, photo, bio){
                authFactory.register(name, tagline, photo, bio)
                    .then(function(result){
                        alert('Save this ID so you can login: ');
                        alert(result._id);
                        console.log('Save this ID so you can login: ', result._id);
                        $scope.login(result.name, result._id);
                    });
            };
        // PROFILES *********************************************
            // Show Single Profile (Devs-view) TODO Make this Modular for the friends view
            $scope.singleProfile = function(user){
                $scope.localShow = false;
                $scope.showSingleProfile = user;
            };
            // Get Profiles, and hide own profile from the list
            $scope.getProfiles = function(){
                profilesFactory.getIds().then(function(result){
                    for(var i = 0; i < result.length; i++){
                        profilesFactory.getProfiles(result[i]._id)
                            .then(function(result){
                                if($scope.myProfile._id !== result._id){
                                    $scope.profiles.push(result);
                                }
                            });
                    }
                });
            };

        // FRIENDS **********************************************
            // Add
            $scope.addFriend = function(){
                var myProfile   = $scope.myProfile
                ,   friend    = $scope.showSingleProfile
                ,   isAlreadyFriend = false;
                for(var i = 0; i < myProfile.friends.length; i++){
                    if(myProfile.friends[i]._id === friend._id){
                        isAlreadyFriend = true;
                    }
                }
                if(!isAlreadyFriend){ // TODO Make better alerts
                    friendsFactory.add(myProfile._id, friend._id).then(function(response){
                        alert(friend.name + ' is now your friend');
                        profilesFactory.getMyProfile(myProfile._id).then(function(result){
                            $scope.myProfile = result;
                            console.log($scope.myProfile.friends);
                        });
                    });
                }else{
                    alert(friend.name + ' is already your friend.');
                }
            };
            // Remove
            $scope.removeFriend = function(){
                var myProfile   = $scope.myProfile
                ,   friendId    = $scope.showSingleProfile._id;

                friendsFactory.remove(myProfile._id, friendId)
                    .then(function(response){
                        myProfile.friends.splice(myProfile.friends.indexOf(friendId), 1);
                    });
            };

    // REFRESHES ################################################

        //  Checks if user is Logged in
            // $interval(function(){
            //     if(!$scope.isLogged){
            //         $location.path('/login');
            //     }
            // }, 1000);

        //  Gets Profiles every X Seconds
        $interval(function(){
            if($scope.isLogged){
                $scope.getProfiles();
            }
        }, 60000);
}]);
