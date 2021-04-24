let APIURL = '';

switch (window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || 'TBD':
        // this is the local host name of your API
        APIURL = 'http://localhost:3000';
        break;
    // this is the deployed react application
    case 'TBD':
        // this is the full url of your deployed API
        APIURL = 'TBD'
}

export default APIURL;