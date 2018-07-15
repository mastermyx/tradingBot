var config = {};

config.myMail = 'arthur.hatchiguian@epitech.eu';


/* ALGO PARAMETERS */

config.buyPercent = -1.5; //percent loss the bot buy
config.minIntervalToBuy = 0.25; //interval before buying

config.buyPercentProfit = 80.0; 
config.minPercentProfit = 1; //min take profit percent
config.eurosPerOrder = 12; // buy in EUR


/* 1000  = 1s */
config.waitInterval = 60000; //60000 default: 60000, 1 min


// 1 turn = waitInterval
config.minTurnBeforeTrade = 3; 
config.minTurnBeforeRebuy = 55;

module.exports = config;