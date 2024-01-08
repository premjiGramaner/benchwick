var WebSocket = require('ws');
const code = "Env!s!0n_2024$&P00|";
const clients = new Map();

const initDefaults = (wss) => {

    wss.on('connection', (ws) => {
        console.log('connection hit', ws)
        ws.on('error', console.error);

        ws.on('message', (data) => {
            console.log('received: %s', data);
        });

        ws.on('open', () => {
            ws.send('something');
        });

        // ws.send('something');
    });

    return wss;
}


const wsServerPool = (server) => {
    const wss = new WebSocket.Server({
        server: server,
        perMessageDeflate: {
            zlibDeflateOptions: {
                // See zlib defaults.
                chunkSize: 1024,
                memLevel: 7,
                level: 3
            },
            zlibInflateOptions: {
                chunkSize: 10 * 1024
            },

            // Other options settable:
            clientNoContextTakeover: true, // Defaults to negotiated value.
            serverNoContextTakeover: true, // Defaults to negotiated value.
            serverMaxWindowBits: 10, // Defaults to negotiated value.

            // Below options specified as default values.
            concurrencyLimit: 10, // Limits zlib concurrency for perf.
            threshold: 1024 // Size (in bytes) below which messages
            // should not be compressed if context takeover is disabled.
        }
    });

    console.log('wss', wss.address())
    
    wss.prependListener('connection', (stream) => {
        console.log('someone connected!');
    });

    wss.on('connection', (ws) => {
        console.log('connection hit', ws)
        ws.on('error', console.error);

        ws.on('message', (data) => {
            console.log('received: %s', data);
        });

        ws.on('open', () => {
            ws.send('something');
        });

        // ws.send('something');
    });
    return wss;
}

module.exports = { wsServerPool };