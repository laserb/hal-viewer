var url = new URI(window.location.href);
var queryParameters = url.search(true);

var checkEntryPoint = function(entryPoint) {
    if(!entryPoint.startsWith("http")) {
        entryPoint = "http://" + entryPoint;
    }
    return entryPoint;
}

var entryPoint = queryParameters.entry_point || '';
var token = queryParameters.access_token || '';
var audioStreamItem = 'stream';

while(entryPoint === '') {
    entryPoint = prompt('New entry point', 'http://localhost');
    entryPoint = checkEntryPoint(entryPoint);
    url.addQuery('entry_point', entryPoint);
    window.location.href = url.href();
}
entryPoint = checkEntryPoint(entryPoint);
