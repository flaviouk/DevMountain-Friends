DevBook.factory( 'parseFactory', function( $http ) {

    function postData( message ) {
        return $http( {
            method: 'POST'
            , url: 'https://api.parse.com/1/classes/chat'
            , data: {
                text: message
            }
        } );
    }

    function getData() {
        return $http( {
            method: 'GET'
            , url: 'https://api.parse.com/1/classes/chat?order=-createdAt'
        } );
    }

    return {
        getMessages: getData
        , postMessage: postData
    };
} );
