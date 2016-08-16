var exec = require('child_process').exec;
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');

function start(response,request){
    console.log("Request handler 'start' was called!");
    fs.readFile('./index.html',function(err,data){
        response.writeHead('200',{"Content-Type":"text/html"});
        response.write(data);
        response.end();
    });
}

function upload(response,request){
    console.log("Request handler 'upload' was called!");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request,function(error,fields,files){
        console.log("parse done");
        fs.renameSync(files.upload.path,'/tmp/test.png');
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show'/>");
        response.end();
    });
}

function show(response,request){
    fs.readFile('/tmp/test.png','binary',function(err,file){
        if(err){
            response.writeHead(500,{"Content-Type":"text/plain"});
            response.write(err + "\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"text/plain"});
            response.write(file,'binary');
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
