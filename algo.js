var bittrex = require('./bittrex');
var cmc = require('./coinMarketCap');
const request = require('request');

/* ALGO PARAMETERS */

var buyPercent = 0.0;
var minIntervalToBuy = 0.02;
var shouldBuy = false;


/* 1000 = 1 seconde  */

var timerID = 0; 
var lastPercent = -1000;
var waitInterval = 5000;
var rebuyInterval = 10000;//6000000;
var maxLowPercent = 0;



function startAlgoBTC() {
    console.log("algo.start called");
    bitcoinPriceChange();
    timerID = setInterval(bitcoinPriceChange, waitInterval);
}

function restart() {
    console.log("algo.restart called");
    lastPercent = -1000;
    maxLowPercent = 0;
    shouldBuy = false;
    clearInterval(timerID);
    setTimeout(startAlgoBTC, rebuyInterval);
}

function stop() {
    console.log("algo.stop called");
    clearInterval(timerID);
}

function bitcoinPriceChange() {
     request('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR', { json: true }, (err, res, body) => {
        if (err) { console.log(err); }
  
        //console.log(res.body);   
    
        var body = res.body;
        var data = body["data"];
    
        var percentChange_1h = data["quotes"]["EUR"]["percent_change_1h"];
        var percentChange_24h = data["quotes"]["EUR"]["percent_change_24h"];
        var percentChange_7d = data["quotes"]["EUR"]["percent_change_7d"];
        var priceUSD = data["quotes"]["USD"]["price"];
        var priceEUR = data["quotes"]["EUR"]["price"];
         
        analyzePrice(priceUSD.toFixed(1), priceEUR.toFixed(1), percentChange_1h, percentChange_24h, percentChange_7d);
     });
}


function analyzePrice(priceUSD, priceEUR, percentChange_1h, percentChange_24h, percentChange_7d) {
  
//    console.log("priceUSD:" + priceUSD);
//    console.log("priceEUR:" + priceEUR);
//    console.log("percentChange_1h:" + percentChange_1h);
//    console.log("percentChange_24h:" + percentChange_24h);
//    console.log("percentChange_7d:" + percentChange_7d);
     
    console.log("");
    console.log("percent 1h: " + percentChange_1h + ", buy % : " + buyPercent + ", min interval: " + minIntervalToBuy);
        
    if (percentChange_1h < buyPercent) {
        console.log("should Buy");
       
        
        shouldBuy = true;
        if (percentChange_1h < maxLowPercent) {
            maxLowPercent = percentChange_1h;
        }
        
        
        if (percentChange_1h <= lastPercent || lastPercent == -1000) {
            console.log("poursuite de la baisse, je ne fais rien");
        } else {
            var interval = percentChange_1h - maxLowPercent;
            console.log("ça remonte assez, que faire? interval: " + interval + ", max lowPercent: " + maxLowPercent);
            if (interval > minIntervalToBuy) {
                console.log("interval supérieur, j'achète au prix de " + priceEUR);
                buyBtc(priceEUR, lastPercent);
                return;
            } else {
                console.log("interval trop faible, je ne fais rien");
            }
        }
    }
    lastPercent = percentChange_1h;
}

function buyBtc(priceEUR, lastPercent) {
    var buyPrice = parseFloat(priceEUR);
    var takeProfit;
    
    if (lastPercent > -3 ) {
        
        takeProfit = (buyPrice + (buyPrice * 0.03));  
        console.log("Take profit de 3% car faible baisse: " + parseFloat(takeProfit).toFixed(1)); 
    } else {
        var tpPercent = -(lastPercent/100);
        
        takeProfit = (buyPrice + (buyPrice * tpPercent));              
        console.log("Take profit de " + tpPercent + "% car: " + parseFloat(takeProfit).toFixed(1));
    }
    
    
    
    
     
       
    
    restart();
}

module.exports = {
    startAlgoBTC: startAlgoBTC, 
    stop: stop
};


