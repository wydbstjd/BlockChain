var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./Timer.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = '0x5fB1b59320163A62015f1A9B8B326Cd406c2E43A'

var timer = new web3.eth.Contract(abi, addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    await timer.methods.getNow().call().then(function(str) {console.log("Now: ", str)});
    await timer.methods.start().send({from: accounts[0], gas:100000});
    await 4000;
    await timer.methods.timePassed().call().then(function(str) {console.log("Passed: ", str)});
}

doIt();
