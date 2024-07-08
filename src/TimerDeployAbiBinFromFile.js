var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

_abiBinJson = require('./Timer.json');
contractName = Object.keys(_abiBinJson.contracts);
_abi = _abiBinJson.contracts[contractName].abi;
_bin = _abiBinJson.contracts[contractName].bin;

console.log("- ABI: " + _abi);
console.log("- Bytecode: " + _bin);

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("\nDeploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abi)
        .deploy({data: '0x'+_bin})
        .send({from: accounts[0], gas: 364124}, function(err, transactionHash) {
            if(!err) console.log('\nhash: ' + transactionHash);
        })
        .then(function(newContractInstance) {
            console.log("---> The contract deployed to: " + newContractInstance.options.address);
        })
}

deploy()
