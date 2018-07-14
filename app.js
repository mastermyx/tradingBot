var http = require('http');
var algo = require('./algo');
//var mail = require('./mail');
var kraken = require('./kraken');
var config = require('./config');



//algo.startAlgoBTC();



//mail.send('arthur.hatchiguian@epitech.eu', 'titre', 'Hello world');

kraken.addBTCBuyMarketOrder(0.002, 1);



//var server = http.createServer(function(req, res) {
//    res.writeHead(200);
//    res.end('Hi evserybody!');
//    
//   
//    
//});
//server.listen(8080);