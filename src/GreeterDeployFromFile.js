var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

_abiBinJson = require('./Greeter.json');
contractName = Object.keys(_abiBinJson.contracts);
_abi = _abiBinJson.contracts[contractName].abi;
_bin = _abiBinJson.contracts[contractName].bin;

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    var deployed = await new web3.eth.Contract(_abi)
        .deploy({data: '0x'+_bin})
        .send({from: accounts[0], gas:364124})
        .then(function(newContractInstance) {
            console.log('address: ', newContractInstance.options.address);
        });
}

deploy();
