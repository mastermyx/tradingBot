var bittrex = require('./bittrex');
var cmc = require('./coinMarketCap');


function start() {
    console.log("algo.start called");
    cmc.bitcoinPriceChange();
}

function stop() {
    console.log("algo.stop called");
}

function analyzePrice(dict) {
    
    console.log(dict);
//    console.log("priceUSD:" + priceUSD);
//    console.log("priceEUR:" + priceEUR);
//    console.log("percentChange_1h:" + percentChange_1h);
//    console.log("percentChange_24h:" + percentChange_24h);
//    console.log("percentChange_7d:" + percentChange_7d);
}

module.exports = {
    analyzePrice: analyzePrice, 
    start: start, 
    stop: stop
};


