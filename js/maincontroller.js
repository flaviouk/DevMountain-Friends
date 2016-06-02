DevBook.controller('mainController', function($scope, $location, loginFactory, registerFactory) {

    // LOGIN
    $scope.isLogged = false;
    $scope.localShow = true;

    if(!$scope.isLogged){
        $location.path('/login');
    }

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
            alert('Save this ID so you can login afterwards: ');
            alert(result._id);
            console.log('Save this ID so you can login afterwards: ', result._id);
            $scope.login(result.name, result._id);
        })
    }
});
