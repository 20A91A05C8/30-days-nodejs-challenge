const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    const clients = new Set();
    wss.on('connection', function connection(ws) {
        clients.add(ws);
        ws.on('message', function incoming(message) {
            broadcast(message, ws);
        });
        ws.on('close', function () {
            clients.delete(ws);
        });
    });

    function broadcast(message, sender) {
        clients.forEach(function each(client) {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
