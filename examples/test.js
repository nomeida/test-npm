const { Hyperliquid } = require("../dist/index");

const sdk = new Hyperliquid("");

sdk.info.getUserOpenOrders().then(console.log).catch(console.error);

// sdk.custom.cancelAllOrders().then(console.log).catch(console.error);