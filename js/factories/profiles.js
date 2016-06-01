DevBook.factory('profilesFactory', function($http){

    function getIds() {
        return $http({
            url: 'http://connections.devmounta.in/api/friends/57462f24b331f77a06a92c22'
            ,   method: 'GET'
        })
    }

    function getProfiles(id){
        return $http({
            url: 'http://connections.devmounta.in/api/profiles/' + id
            ,   method: 'GET'
        })
    }

    function deleteProfile(id){
        return $http({
            url: 'http://connections.devmounta.in/api/profiles/' + id
            ,   method: 'DELETE'
        })
    }

    function postProfile(obj){
        return $http({
            method: 'POST'
            ,   url: 'http://connections.devmounta.in/api/profiles'
            ,   data: obj
        }).success(function(data, status, headers, config){
            console.log('SUCCESS', data, status, headers, config);
        }).error(function(data, status, headers, config){
            console.log('ERROR', data, status, headers, config);
        })
    }


    return{
        getIds: getIds
        ,   getProfiles: getProfiles
        ,   deleteProfile: deleteProfile
        // ,   getProfilesIds: getProfilesIds
    };
});

// ID: 574e4033b331f77a06a93005
