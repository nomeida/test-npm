const { Hyperliquid } = require('../dist/index');

async function testWebSocket() {
    // Create a new Hyperliquid instance
    // You can pass a private key here if you need authenticated access
    const sdk = new Hyperliquid();

    try {
        // Connect to the WebSocket
        await sdk.connect();
        console.log('Connected to WebSocket');

        // Subscribe to allMids
        sdk.subscriptions.subscribeToUserFills("(data) => {
            console.log('Received trades data:', data);
        });

        console.log('Subscribed to All Mids');

        // Keep the script running
        await new Promise(() => {});
    } catch (error) {
        console.error('Error:', error);
    }
}

testWebSocket();