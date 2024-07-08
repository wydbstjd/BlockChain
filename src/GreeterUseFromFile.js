var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

_abiBinJson = require('./Greeter.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = '0xCf966Bc401F63C48BA01805B764b1fbb7D12b028';

var greeter = new web3.eth.Contract(abi, addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();

    await greeter.methods.greet().send({from: accounts[0], gas:100000});
    await greeter.methods.greet().send({from: accounts[0], gas:100000});
    await greeter.methods.greet().send({from: accounts[0], gas:100000});
    await greeter.methods.greet().call().then(function(result) {console.log(result[0], result[1])});
}
doIt();
