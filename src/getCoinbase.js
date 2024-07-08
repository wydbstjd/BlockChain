var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
//web3.eth.getAccounts().then(console.log);
web3.eth.getCoinbase().then(console.log);

async function getAccount0() {
    accounts = await web3.eth.getAccounts();
    balance = await web3.eth.getBalance(accounts[0]);
    console.log(accounts[0]);
    console.log(balance);
}
getAccount0();
