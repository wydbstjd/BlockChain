var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

async function printAccountInfo() {
    accounts = await web3.eth.getAccounts();
    console.log('account0:', accounts[0]);
    console.log('account1:', accounts[1]);
    console.log('account0 balance:', await web3.eth.getBalance(accounts[0]));
    console.log('account1 balance:', await web3.eth.getBalance(accounts[1]));
}

async function sendEther() {
    accounts = await web3.eth.getAccounts();

    tx = web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: web3.utils.toWei('11', 'ether')
    });

    console.log('transaction hash:', tx.transactionHash);
}

(async () => {
    printAccountInfo();
})()
