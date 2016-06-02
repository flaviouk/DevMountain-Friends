DevBook.factory('registerFactory', function($http){

    function register(name, tagline, photo, bio){
        return $http({
            url: 'http://connections.devmounta.in/api/profiles'
            ,   method: 'POST'
            ,   data: {name: name, tagline: tagline, profileUrl: photo, bio: bio}
        }).then(function(result){
            return result.data;
        })
    }

    return{
        register: register
    }
});
