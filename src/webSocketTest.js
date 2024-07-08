var Web3 = require('web3');
const myProvider = new Web3.providers.WebsocketProvider("ws://localhost:8345", {
    clientConfig: {
        keepalive:true, keepaliveInterval:10000
    }
});
var web3 = new Web3(myProvider);
console.log("(1) websocket url ", myProvider.connection.url);
myProvider.on('connect', function() {
    console.log("(2) connecting websocket: " + web3.currentProvider.connected);
    web3.currentProvider.connection.close();
    console.log("(3) disconnecting websocket: " + web3.currentProvider.connected);
});
myProvider.on('close', function() { console.log("--> Websocket closed"); });
myProvider.on('end', function() { console.log("--> Websocket ended"); });
myProvider.on('error', function(error) { console.error(error); });
