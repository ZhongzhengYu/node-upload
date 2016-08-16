var server = require('./server.js');
var router = require('./router.js');
var handler = require('./requestHandler.js');

var handle={};

handle['/'] = handler.start;
handle['/start'] = handler.start;
handle['/upload'] = handler.upload;
handle['/show'] = handler.show;
server.start(handle,router.route);
