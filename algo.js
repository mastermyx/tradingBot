var bittrex = require('./bittrex');
const request = require('request');
var config = require('./config');
var kraken = require('./kraken');




/* NON MODIFIABLE */ 
var turn = 0;
var minTurn = 3;
var shouldBuy = false;
var timerID = 0;
var lastPercent = -1000;


function startAlgoBTC() {
    console.log("algo.start called");
    
    lastPercent = -1000;
    maxLowPercent = 0;
    turn = 0;
    shouldBuy = false;
    bitcoinPriceChange();
    timerID = setInterval(bitcoinPriceChange, config.waitInterval);
}

function restartAlgoBTC() {
    console.log("algo.restart called");
    
    lastPercent = -1000;
    maxLowPercent = 0;
    turn = 0;
    shouldBuy = false;
    
    //clearInterval(timerID);
    //setTimeout(startAlgoBTC, rebuyInterval);
}

function stopAlgoBTC() {
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
    
    var date = new Date().toISOString();
    console.log("");
    console.log(date);
    console.log("percent 1h: " + percentChange_1h + ", min percent to buy % : " + config.buyPercent + ", min up interval to buy: " + config.minIntervalToBuy);
    
    if (turn < minTurn) {
        lastPercent = percentChange_1h;
        turn = turn += 1; 
        console.log("too early to trade turn: " + turn);
        return;
    }
    
    
    
    if (percentChange_1h < config.buyPercent) {
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
            if (interval > config.minIntervalToBuy) {
                console.log("interval supérieur, j'achète au prix de " + priceEUR);
                buyBtc(priceUSD, priceEUR, lastPercent/(config.buyPercentProfit/100));
                return;
            } else {
                console.log("interval trop faible, je ne fais rien");
            }
        }
    }
    lastPercent = percentChange_1h;
}

function buyBtc(priceUSD, priceEUR, profitPercent) {
    profitPercent = profitPercent.toFixed(1);
    
    
    if (profitPercent > -config.minPercentProfit ) {
        profitPercent = config.minPercentProfit;
    } 
    
    var volume = (1 * config.eurosPerOrder) / priceEUR; 
    console.log('buy btc with profitPercent: ' +  profitPercent);
    
    kraken.addBTCBuyMarketOrder(volume.toFixed(8), profitPercent.toFixed(1))
    
    restartAlgoBTC();
}





module.exports = {
    startAlgoBTC: startAlgoBTC, 
    stopAlgoBTC: stopAlgoBTC
};


