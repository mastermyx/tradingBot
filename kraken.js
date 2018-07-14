var config = require('./config');
var KrakenClient = require('kraken-api');


var mail = require('./mail');

 
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

function addBTCBuyMarketOrder(volume, profitPercent) {
    if (volume < 0.002) {
        volume = 0.002;
    }
    
    var order = {
        pair: 'XXBTZEUR',
        type : 'buy',
        ordertype : 'market',
        volume : volume,
        close : {ordertype : 'take-profit', 
                   price : '#' + profitPercent + '%'}
    };
    
    
    console.log('addBuyMarketOrder volume: ' + order.volume);
    
    kraken.api('AddOrder', order, function(error, data) {
        if(error) {
            console.log('\nERROR buy: ' + error);
            mail.send(config.myMail, 'TRADE ERROR', 
                      'An error occured trying to buy on kraken pair: ' + order.pair + ', volume: ' + volume + ', profit percent:' + profitPercent + '\n error:'
                      + error);
        } else {
            console.log('SUCCESS buy: ' + data);
            mail.send(config.myMail, 'TRADE BUY', 'Successfull buy order on kraken pair: ' + pair + ', volume: ' + volume + ', profit percent:' + profitPercent + '\n error:' + error);
        }
    });
}

module.exports = {
 	balance: balance,
    ticker: ticker,
    addBTCBuyMarketOrder: addBTCBuyMarketOrder
};
