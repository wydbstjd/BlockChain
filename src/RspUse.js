var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./Rsp.json');
var contractName = Object.keys(_abiBinJson.contracts);

abi = _abiBinJson.contracts[contractName].abi;
addr = "0x4583932c8a147AD6Cf4D5Fc03471eBb6F421087b";

rsp = new web3.eth.Contract(abi, addr);
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    
    await rsp.methods.setA().send({from: accounts[1], value: 1000, gas:200000});
    await rsp.methods.setB(2).send({from: accounts[2], value: 1000, gas:200000});
    await rsp.methods.play().send({from: accounts[0], gas:200000});
    await rsp.methods.gameresult().call().then(console.log);
    await rsp.methods.getMatchResult().call().then(console.log);
    await rsp.methods.distributeBetAmount().send({from: accounts[0], gas:200000});
    await rsp.methods.gameresult().call().then(console.log);
}
doIt();
