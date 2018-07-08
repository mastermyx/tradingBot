var http = require('http');
var algo = require('./algo');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hi evserybody!');
    
   
    
});
server.listen(8080);


algo.start();
algo.stop();
algo.analyzePrice();
    