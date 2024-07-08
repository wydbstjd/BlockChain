var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8345'));

var _abiBinJson = require('./FallbackTest.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = "0xAF8f9E2805D95931BE36259CCeEcD0a6BCc3dD32";

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    var _instance = new web3.eth.Contract(abi, addr);
    var event = _instance.events.PrintLog({fromBlock: 0}, function (err, result) {
        if (!err) {
            console.log("Event fired: " + JSON.stringify(result.returnValues));
        }
    });

    await _instance.methods.callA().call().then(function(res) { console.log(res);});
    await web3.eth.sendTransaction({from: accounts[0], to: addr});
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);
}
doIt()
