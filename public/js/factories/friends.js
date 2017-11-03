DevBook.factory( 'friendsFactory', function( $http, profilesFactory ) {

    function addFriend( myId, friendId ) {
        return $http( {
            url: 'http://connections.devmounta.in/api/profiles/' + myId + '/friends/' + friendId
            , method: 'PUT'
        } ).then( function( response ) {
            return response.data;
        } );
    }

    function removeFriend( myId, friendId ) {
        return $http( {
            url: 'http://connections.devmounta.in/api/profiles/' + myId + '/friends/' + friendId
            , method: 'DELETE'
        } ).then( function( response ) {
            return response.data;
        } );
    }

    return {
        add: addFriend
        , remove: removeFriend
    };
} );
