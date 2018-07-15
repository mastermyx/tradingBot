var http = require('http');
var algo = require('./algo');


//algo.startAlgoBTC();



//var mail = require('./mail');
//mail.send('arthur.hatchiguian@epitech.eu', 'titre', 'Hello world');

var kraken = require('./kraken');
kraken.addBTCBuyMarketOrder(0.002, 2);
