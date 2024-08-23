const { Hyperliquid } = require('../dist/index');


function waitForUserInput(message) {
    return new Promise((resolve) => {
    rl.question(message, () => {
        resolve();
        });
    });
}


async function testCustomExchangeAPI() {
    // Initialize the SDK (replace with your actual private key and other necessary parameters)
    const private_key = "";
    const user_address = "";
    const sdk = new Hyperliquid(private_key, false); // false for mainnet, true for testnet

    // try {
    //     const cancelResponse = await sdk.custom.cancelAllOrders();
    //     console.log(cancelResponse);
    // } catch (error) {
    //     console.error("An error occurred:", error);
    // }

    // const market_open = await sdk.custom.marketOpen('PENDLE-PERP', true, 5);
    // console.log(market_open.response.data.statuses)

    const close_all = await sdk.custom.closeAllPositions();
    console.log(close_all)





}

testCustomExchangeAPI();
// testExchangeAPI();
