DevBook.factory('profilesFactory', function($http) {

    function getIds() {
        return $http({
            url: 'http://connections.devmounta.in/api/friends/57462f24b331f77a06a92c22',
            method: 'GET'
        }).then(function(result) {
            var filtered = [];
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].name !== 'Jordan') {
                    filtered.push(result.data[i]);
                }
            }
            return filtered;
        });
    }
    function getProfiles(id) {
        return $http({
            url: 'http://connections.devmounta.in/api/profiles/' + id,
            method: 'GET'
        }).then(function(result){
            return result.data;
        });
    }

    return {
        getIds: getIds
        ,   getProfiles: getProfiles
        ,   getMyProfile: getProfiles
    };
});
