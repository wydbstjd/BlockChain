var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

web3.eth.getBalance("0x8c75cf6212b515b33ba5bae2b9277c9f7633f690").then(web3.utils.fromWei).then(console.log);
