var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./BankV3.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = '0x6fd2B455BA3Ce1e6719ebEE4AfFb563655c59B11';

var bank = new web3.eth.Contract(abi, addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    await bank.methods.getBalance().call().then(console.log);
    await bank.methods.deposit(111).send({from: accounts[0], value:111});
    await bank.methods.getBalance().call().then(console.log);
    await bank.methods.withdrawAll().send({from: accounts[0]});
    await bank.methods.getBalance().call().then(console.log);

    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    //console.log("Balance diff:", balanceBefore - balanceAfter);
    Baldiff = web3.utils.toBN(balanceBefore).sub(web3.utils.toBN(balanceAfter));
    console.log("Balance diff:", Baldiff.toString());
}
doIt()
