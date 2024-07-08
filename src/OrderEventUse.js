var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

var _abiBinJson = require('./OrderEvent.json');
contractName = Object.keys(_abiBinJson.contracts);
abi = _abiBinJson.contracts[contractName].abi;
addr = "0xa9dD2070Ae3a950513DF844d79F91b502C04b336";

async function doIt() {
    var _order = new web3.eth.Contract(abi, addr);
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    var event = _order.events.OrderLog({
        filter: {_from: accounts[0], _value: 30},
        fromBlock: 'latest', toBlock: 'pending'
    }, function (error, result) {
        if (!error) {
            console.log("Event fired: " + JSON.stringify(result.returnValues));
        }
    });
    var value;
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    // (1) 이벤트가 발생하고 value: 30은 출력한다.
    my = await _order.methods.order("0x1234", 3)
            .send({from: accounts[0], gas:100000, value:30});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // (2) 이벤트가 발생하지만, value: 40이라서 걸러진다.
    my = await _order.methods.order("0x1234", 4).send({from: accounts[0], gas:100000, value:40});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // (3) 이벤트가 발생하지만, value: 100이라서 걸러지게 된다.
    my = await _order.methods.order("0x1234", 10).send({from: accounts[0], gas:100000, value: 100});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " +balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);
}
doIt()
