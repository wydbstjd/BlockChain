var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");

var _abiBinJson = require('./CustomerOrder.json');
var contractName = Object.keys(_abiBinJson.contracts);
//console.log(contractName[1]);
var abi = _abiBinJson.contracts[contractName[1]].abi;
var addr = "0x84C865B78aD55D89484c2502f9feD64c79898104";

var order = new web3.eth.Contract(abi,addr);

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    //########################## 1-1 answer ########################
    console.log("account[1]: " + accounts[1] + " balance of account[1]: " + await web3.eth.getBalance(accounts[1]));
    console.log("account[2]: " + accounts[2] + " balance of account[2]: " + await web3.eth.getBalance(accounts[2]));
    console.log("account[3]: " + accounts[3] + " balance of account[3]: " + await web3.eth.getBalance(accounts[3]));
    console.log("block number: " + await web3.eth.getBlockNumber());
    

    //########################## 1-3 answer ########################
    await order.methods.addCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul").send({from: accounts[1], gas: 1383727});
    await order.methods.addCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul").send({from: accounts[2], gas: 1383727});
    await order.methods.addCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul").send({from: accounts[3], gas: 1383727});

    //########################## 1-4 answer ########################
    await order.methods.getHomeAddress(accounts[1]).call().then(console.log);
    await order.methods.getHomeAddress(accounts[2]).call().then(console.log);
    await order.methods.getHomeAddress(accounts[3]).call().then(console.log);

    //########################## 1-5 answer ########################
    await order.methods.placeOrder(555, "T-Shirt", 2, 1115).send({from: accounts[1], gas: 1383727, value:1115});
    await order.methods.placeOrder(556, "T-Shirt", 3, 1116).send({from: accounts[2], gas: 1383727, value:1116});
    await order.methods.placeOrder(557, "T-Shirt", 4, 1117).send({from: accounts[3], gas: 1383727, value:1117});

    //########################## 1-6 answer ########################
    await order.methods.getNOrder().call().then(console.log);
    await order.methods.getTotalOrderAmount().call().then(console.log);
    await order.methods.queryBalance().call().then(console.log);

    //########################## 1-7 answer ########################
    await order.methods.updateStatus(556, "On delivery").send({from: accounts[2], gas: 1383727});
    await order.methods.getOrderItem().call().then(function (o) {
        for(i=0; i<3; i++) {
            console.log(o[i].id, o[i].product, o[i].status, o[i].home);
        }
    })

    //########################## 1-8 answer ########################
    await order.methods.getOrderById(556).call().then(function(value) {
        console.log(value[0], value[1], value[2], value[3]);
    });

    //########################## 1-9 answer ########################
    await order.methods.refund(556).send({from: accounts[2]});

    //########################## 1-10 answer ########################
    await order.methods.getOrderById(556).call().then(function(value) {
        console.log(value[0], value[1], value[2], value[3]);
    });

    await order.methods.getNOrder().call().then(console.log);
    await order.methods.getTotalOrderAmount().call().then(console.log);
    await order.methods.queryBalance().call().then(console.log);
}
doIt()
