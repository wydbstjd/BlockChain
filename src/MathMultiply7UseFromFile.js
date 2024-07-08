var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8345'));

var _abiBinJson = require('./MathMultiply7.json');
contractNames = Object.keys(_abiBinJson.contracts);
contractName = contractNames[0];
abi = _abiBinJson.contracts[contractName].abi;
addr = "0x90CdE294Deec56f37409Ebaf028F55b8136FCC6e";

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    var _instance = new web3.eth.Contract(abi, addr);

    await _instance.methods.multiply().call().then(console.log); // 8 x 77 = 616 출력
    await _instance.methods.deposit(123).send({from: accounts[0], value: 123}); // 123 wei 입금
    await _instance.methods.getBalanceOfM7().call().then(console.log); // M7 잔고 (0) 출력
    await _instance.methods.send123M7().send({from: accounts[0]}); // M7 계좌로 123 wei 입금, tx.origin은 accounts[0], msg.sender는 Math 컨트랙의 주소
    await _instance.methods.getBalanceOfM7().call().then(console.log); // M7 잔고 (123) 출력

    await _instance.methods.getAddressOfM7().call().then(console.log); // Math 컨트랙트가 참조하는 Multiply7 컨트랙 주소를 의미

    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);
}
doIt()
