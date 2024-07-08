var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

var _abiBinJson = require('./Multiply7Event.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = "0xC878Db9349902f81eF5E1F1c752B6105010610d4";

var m7 = new web3.eth.Contract(abi, addr);
var event = m7.events.Print({fromBlock: 0}, function(err, result) {
    if (!err) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
        //process.exit(1);
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);

    //const value = m7.methods.multiply(8).call();
    const value = await m7.methods.multiply(8).send({from: accounts[0]});

    console.log("---> Function called " + JSON.stringify(value.events.Print.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);
}
doIt()
