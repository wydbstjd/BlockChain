var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./MyBank.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = '0xd2d0308b8771ef7829B044804AfC712a5d9216ea';

var myBank = new web3.eth.Contract(abi, addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    await myBank.methods.getBalance().call().then(console.log);
    await myBank.methods.deposit(1111).send({from: accounts[0], gas:80000, value:1111});
    await myBank.methods.getBalance().call().then(console.log);
}

doIt()
