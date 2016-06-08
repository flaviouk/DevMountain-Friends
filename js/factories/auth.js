DevBook.factory( 'authFactory', function( $http ) {
    // LOGIN
    function login( id ) {
        return $http( {
            url: 'http://connections.devmounta.in/api/profiles/' + id
            , method: 'GET'
        } );
    }

    function loginAuth( name, id ) {
        return login( id ).then( function( result ) {
            if ( result.data.name.toLowerCase() === name.toLowerCase() && result.data._id === id ) {
                return result.data;
            } else {
                alert( 'Authentication Failed, try again.' );
                return false;
            }
        } );
    }
    // REGISTER
    function registerMe( name, tagline, photo, bio ) {
        return $http( {
            url: 'http://connections.devmounta.in/api/profiles'
            , method: 'POST'
            , data: { name: name, tagline: tagline, profileUrl: photo, bio: bio }
        } ).then( function( result ) {
            return result.data;
        } );
    }

    return {
        login: loginAuth
        , register: registerMe
    };
} );
