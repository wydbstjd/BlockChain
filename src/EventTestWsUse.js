var Web3 = require('web3');
var fs = require('fs');
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

var _abiBinJson = require('./EventTest.json');
contractName=Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi
addr = "0xB181faD83595135C8d2608524a5559fC4C919c4C";

console.log("ABI: " + abi);

async function doIt() {
    var _test = new web3.eth.Contract(abi, addr);
    var event = _test.events.MyLog({fromBlock: 0}, function (error, result) {
        if (!error) {
            log = JSON.stringify(result.returnValues);
            console.log("Event fired: " + log);
            fs.appendFile("src/EventTestLog.txt", log, "utf-8", function(e) {
                if(!e) {
                    console.log(">> Writing to file");
                }
            });
        }
    });
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    const value = await _test.methods.myFunction()
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'});
    console.log("---> myFunction called " + JSON.stringify(value.events.MyLog.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);
}
doIt()
