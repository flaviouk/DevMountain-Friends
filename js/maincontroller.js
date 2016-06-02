DevBook.controller('mainController', function($scope, $location, loginFactory) {

    $scope.isLogged = false;

    $scope.logout = function(){
        $scope.isLogged = false;
        $location.path('/login');
    }

    $scope.login = function(name, id){
        loginFactory.login(name, id)
            .then(function(result){
                if(result){
                    console.log('IN');
                    $scope.isLogged = true;
                    $location.path('/devs');
                    console.log($scope.isLogged);
                }else{
                    alert('Authentication Failed, try again.');
                }
        })
    };

    localStorage.setItem("myProfile", JSON.stringify({name: 'Flavio Carvalho', tagline: 'Awesome Tagline', bio: 'yoooooooo', profileUrl: 'https://avatars0.githubusercontent.com/u/8357327?v=3&s=460'}));
    var localMyProfile = JSON.parse(localStorage.getItem("myProfile"));
    $scope.myProfile = localMyProfile;


});
