DevBook.factory('loginFactory', function($http){

    var myProfile = {};

    function login(id){
        return $http({
            url: 'http://connections.devmounta.in/api/profiles/' + id
            ,   method: 'GET'
        })
    }

    function loginAuth(name, id){
        return login(id).then(function(result){
            if(result.data.name.toLowerCase() === name.toLowerCase() && result.data._id === id){
                isLoggedIn = true;
                return true;
            }else{
                isLoggedIn = false;
                return false;
            }
        })
    }

    return{
        login: loginAuth
    }
});
