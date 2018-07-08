const request = require('request');
var algo = require('./algo');

function bitcoinPriceChange() {
     request('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR', { json: true }, (err, res, body) => {
        if (err) { console.log(err); }
  
        console.log(res.body);   
    
        var body = res.body;
        var data = body["data"];
    
        var percentChange_1h = data["quotes"]["EUR"]["percent_change_1h"];
        var percentChange_24h = data["quotes"]["EUR"]["percent_change_24h"];
        var percentChange_7d = data["quotes"]["EUR"]["percent_change_7d"];
        var priceUSD = data["quotes"]["USD"]["price"];
        var priceEUR = data["quotes"]["EUR"]["price"];
    
//        console.log("priceUSD: " + priceUSD.toFixed(1));
//        console.log("priceEUR: " + priceEUR.toFixed(1));
//        console.log("1h change: " + percentChange_1h);
//        console.log("24h change: " + percentChange_24h);
//        console.log("7d change: " + percentChange_7d);
       
        var dict = {
            "priceUSD" : priceUSD, 
            "priceEUR" : priceEUR,
            "percentChange_1h" : percentChange_1h,
            "percentChange_24h" : percentChange_24h,
            "percentChange_7d" : percentChange_7d
         };
        algo.stop();
        algo.analyzePrice(dict);
       
         
         // algo.analyzePrice(dict);
     });
}


module.exports = {
 	bitcoinPriceChange: bitcoinPriceChange
};