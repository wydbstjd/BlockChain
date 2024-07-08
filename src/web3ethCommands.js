var Web3=require('web3');
var web3= new Web3('http://localhost:8345');
web3.eth.getAccounts().then(console.log);
web3.eth.getCoinbase().then(console.log);
web3.eth.getBlockNumber().then(console.log);
web3.eth.getBalance('0x6dbfdc033024d0ADA004391A32F71F9134860eCD').then(console.log);
web3.eth.getNodeInfo().then(console.log);
