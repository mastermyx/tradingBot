var config = {};

config.myMail = 'arthur.hatchiguian@epitech.eu';


/* ALGO PARAMETERS */

config.buyPercent = 10.0; //percent under the bot buy
config.buyPercentProfit = 75.0;

config.minIntervalToBuy = 0.001; //interval before buying
config.minPercentProfit = 1.25; //min take profit percent
config.eurosPerOrder = 15; // min buy in EUR


/* 1000  = 1s */
config.waitInterval = 5000;
config.rebuyInterval = 10000;//6000000;
config.maxLowPercent = 0;
config.minTurnBeforeTrade = 3;


module.exports = config;