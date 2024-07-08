var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./OrderContract2.json');
var contractName = Object.keys(_abiBinJson.contracts);

abi = _abiBinJson.contracts[contractName[1]].abi;
addr = "0x0C30b3dc06eBf105B34bF040fd9b05d505B22238";
order = new web3.eth.Contract(abi, addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("acc1: " + accounts[1] + " bal1: " + await web3.eth.getBalance(accounts[1]));
    console.log("acc2: " + accounts[2] + " bal2: " + await web3.eth.getBalance(accounts[2]));
    console.log("acc3: " + accounts[3] + " bal3: " + await web3.eth.getBalance(accounts[3]));

    await order.methods.addCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul").send({from: accounts[1], gas: 1622664});
    await order.methods.addCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul").send({from: accounts[2], gas: 1622664});
    await order.methods.addCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul").send({from: accounts[3], gas: 1622664});

    await order.methods.getHomeAddress(accounts[1]).call().then(console.log);
    await order.methods.getHomeAddress(accounts[2]).call().then(console.log);
    await order.methods.getHomeAddress(accounts[3]).call().then(console.log);

    await order.methods.placeOrder(555, "T-Shirt", 2, 1115).send({from: accounts[1], gas: 1622664, value:1115});
    await order.methods.placeOrder(556, "T-Shirt", 3, 1116).send({from: accounts[2], gas: 1622664, value:1116});
    await order.methods.placeOrder(557, "T-Shirt", 4, 1117).send({from: accounts[3], gas: 1622664, value:1117});

    await order.methods.getNOrder().call().then(console.log);
    await order.methods.getTotalOrderAmount().call().then(console.log);
    await order.methods.queryBalance().call().then(console.log);

    await order.methods.updateStatus(556, "On delivery").send({from: accounts[2], gas: 1622664});
    await order.methods.getOrderItem().call().then(function (arr) {
        for(i=0; i<arr.length; i++) {
            console.log(arr[i].id, arr[i].productName, arr[i].status, arr[i].home);
        }
    });

    await order.methods.refund(556).send({from: accounts[2], gas: 1622664});
    await order.methods.getNOrder().call().then(console.log);
    await order.methods.getTotalOrderAmount().call().then(console.log);
    await order.methods.queryBalance().call().then(console.log);

    await order.methods.getOrderItem().call().then(function (arr) {
        for(i=0; i<arr.length; i++) {
            console.log(arr[i].id, arr[i].productName, arr[i].status, arr[i].home);
        }
    });
}
doIt()
