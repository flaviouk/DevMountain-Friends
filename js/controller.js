DevBook.controller('theController',
['$scope', '$interval','$location', 'authFactory', 'profilesFactory', 'friendsFactory', 'parseFactory',
function($scope, $interval,$location, authFactory, profilesFactory, friendsFactory, parseFactory) {
    // GLOBAL VARIABLES #########################################
    $scope.myProfile;
    $scope.profiles = [];
    $scope.showSingleProfile;
    $scope.isFriend = false;
    $scope.myFriends = [];

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
                isMyFriend($scope.myProfile.friends, user._id);
            };
            // Get Profiles, and hide own profile from the list
            $scope.getProfiles = function(){
                profilesFactory.getIds().then(function(result){
                    $scope.profiles.length = 0;
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
            // Update my profile
            $scope.updateMyProfile = function(myId, myUpdatedProfile){
                profilesFactory.updateProfile(myId, myUpdatedProfile).then(function(result) {
                    $scope.myProfile.name = result.name;
                    $scope.myProfile.tagline = result.tagline;
                    $scope.myProfile.bio = result.bio;
                    $scope.myProfile.profileUrl = result.profileUrl;
                    alert('Updated!');
                    $location.path('/developers');
                })
            };

        // FRIENDS **********************************************
            // Get Friends
            $scope.getFriends = function(){
                $scope.myFriends.length = 0;
                for(var i = 0; i < $scope.myProfile.friends.length; i++){
                    profilesFactory.getProfiles($scope.myProfile.friends[i]._id)
                        .then(function(result){
                            $scope.myFriends.push(result);
                        });
                }

            }
            // Check FRIENDS
            function isMyFriend(myFriends, personId){
                for(var key in myFriends){
                    if(myFriends[key]._id === personId){
                        $scope.isFriend = true;
                        return true;
                    }
                }
                $scope.isFriend = false;
                return false;
            }
            // Add
            $scope.addFriend = function(){
                var myProfile   = $scope.myProfile
                ,   friend    = $scope.showSingleProfile;

                if(isMyFriend(myProfile.friends, friend._id)){
                    alert(friend.name + ' is already your friend.');
                }else{
                    friendsFactory.add(myProfile._id, friend._id).then(function(response){
                        alert(friend.name + ' is now your friend');
                        profilesFactory.getMyProfile(myProfile._id).then(function(result){
                            $scope.myProfile = result;
                        });
                        $location.path('/developers');
                    });
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
                    $location.path('/developers');
            };
        // CHAT *************************************************
        $scope.getMsgs = function(){
            parseFactory.getMessages().then(function(result){
              $scope.messages = result.data.results;
            });
        };

        $scope.postMsg = function(){
            parseFactory.postMessage($scope.message);
            $scope.message = '';
        };

    // REFRESHES ################################################

        //  Checks if user is Logged in
        $interval(function(){
            if(!$scope.isLogged){
                $location.path('/login');
            }
        }, 1000);

        //  Gets Profiles every X Seconds
        $interval(function(){
            if($scope.isLogged && $location.path() !== '/chat'){
                $scope.getProfiles();
            }
        }, 120000);

        $interval(function(){
            if($location.path() === '/chat'){
                $scope.getMsgs();
            }
        }, 1250);
}]);
