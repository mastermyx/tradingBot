var config = require('./config');
var KrakenClient = require('kraken-api');
var kraken = new KrakenClient();

var mail = require('./mail');
var order = {};
 

function addBTCBuyMarketOrder(volume, profitPercent) {
    if (volume < 0.002) {
        volume = 0.002;
    }
    
    order = {
        pair: 'XXBTZEUR',
        type : 'buy',
        ordertype : 'market',
        volume : volume,
        close : {ordertype : 'take-profit', 
                   price : '#' + profitPercent + '%'}
    };
    
    
    console.log('addBuyMarketOrder volume: ' + order.volume
                + ', pair: ' + order.pair);
    kraken.api('AddOrder', order, function(error, data) {
        if (error) {
            mail.send(config.myMail, 'TRADE BUY', 'Error buy order on kraken pair: ' 
                      + 'XXBTZEUR' + ', volume: ' 
                      + volume + ', profit percent:' 
                      + profitPercent + '\n LOG: ' 
                      + error);
        } else {
            console.log('buy: ' + JSON.stringify(data.result));
            mail.send(config.myMail, 'TRADE BUY', 'Successfull buy order on kraken pair: ' 
                      + 'XXBTZEUR' + ', volume: ' 
                      + volume + ', profit percent:' 
                      + profitPercent + '\n LOG: ' 
                      + JSON.stringify(data.result));
        }
    });
}

function ticker(pair) {
   // Get Ticker Info
    kraken.api('Ticker', {"pair": pair}, function(error, data) {
        if(error) {
            console.log(error);
        } else {
            console.log(data.result);
        }
    }); 
}



function balance() {
    // Display user's balance
    kraken.api('Balance', null, function(error, data) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(data.result);
        }
    });
}


module.exports = {
 	balance: balance,
    ticker: ticker,
    addBTCBuyMarketOrder: addBTCBuyMarketOrder
};
