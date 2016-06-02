DevBook.controller('mainController', function($scope, $location, loginFactory, registerFactory, friendsFactory) {

    // LOGIN
    $scope.isLogged = false;
    $scope.localShow = true;

    // $interval(function(){
    //     if(!$scope.isLogged){
    //         $location.path('/login');
    //     }
    // }, 1000);

    $scope.login = function(name, id){
        loginFactory.login(name, id)
            .then(function(result){
                if(result !== false){
                    $scope.myProfile = result;
                    $scope.isLogged = true;
                    $location.path('/devs');
                }
            })
    };
    // LOGOUT
    $scope.logout = function(){
        $scope.isLogged = false;
        $location.path('/login');
    }
    // REGISTER
    $scope.register = function(name, tagline, photo, bio){
        registerFactory.register(name, tagline, photo, bio).then(function(result){
            alert('Save this ID so you can login: ');
            alert(result._id);
            console.log('Save this ID so you can login: ', result._id);
            $scope.login(result.name, result._id);
        })
    }
    // FRIENDS
    // TODO
    $scope.checkFriendsFriends = function(myId){
        friendsFactory.checkMyFriends(myId).then(function(response){
            console.log(response, 'MAIN CONTROLLER, CHECK MY FRIENDS');
        })
    }
});
