var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
web3.eth.getBalance("0x8c75cf6212b515b33ba5bae2b9277c9f7633f690").then(console.log);
web3.eth.getBalance("0xd888207069c6c7652768216b26db265b07641e74").then(console.log);
web3.eth.sendTransaction({
    from: '0x8c75cf6212b515b33ba5bae2b9277c9f7633f690',
    to: '0xd888207069c6c7652768216b26db265b07641e74',
    value: web3.utils.toWei('1', 'ether')});
