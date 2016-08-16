var http = require('http');
var url = require('url');


function start(handle,route){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        route(handle,pathname,response,request);
    }
var server = http.createServer(onRequest);

server.listen(3000);
    console.log("server has started!");
}

exports.start = start;
