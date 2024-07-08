var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./EventTest.json');
contractName = Object.keys(_abiBinJson.contracts);

abi = _abiBinJson.contracts[contractName].abi;
addr = "0xB181faD83595135C8d2608524a5559fC4C919c4C";

var _test = new web3.eth.Contract(abi, addr);
var event = _test.events.MyLog({fromBlock: 0}, function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    const value = await _test.methods.myFunction()
        .send({from: accounts[0], gas:364124, gasPrice:'1000000000'});
    console.log("---> myFunction called " + JSON.stringify(value.events.MyLog.returnValues));
}
doIt()
