var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiBinJson = require('./MyBank.json');

contractName = Object.keys(_abiBinJson.contracts);
_abi = _abiBinJson.contracts[contractName].abi;
_bin = _abiBinJson.contracts[contractName].bin;

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    var deployed = await new web3.eth.Contract(_abi)
        .deploy({data: '0x'+_bin})
        .send({from: accounts[0], gas:364124}, function(err, transactionHash) {
            if (!err) console.log("hash: " + transactionHash);
        })
        //.then(function(a) {console.log("The contract deployed to: " + a.options.address)})
    console.log("---> The contract deployed to: " + deployed.options.address)
}

deploy()
