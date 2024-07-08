var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./MathMultiply7.json');
contractNames = Object.keys(_abiBinJson.contracts);
contractName = contractNames[0];
console.log("- contract name: ", contractName);
_abi = _abiBinJson.contracts[contractName].abi;
_bin = _abiBinJson.contracts[contractName].bin;

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abi)
        .deploy({data: "0x" + _bin})
        .send({from: accounts[0], gas:364124}, function (err, transactionHash) {
            if (!err) console.log("hash: " + transactionHash);
        })
    console.log("---> The contract deployed to: " + deployed.options.address);
}
deploy()
