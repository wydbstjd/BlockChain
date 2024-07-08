var Web3 = require('web3');
web3 = new Web3("http://localhost:8345");

_abiBinJson = require('./CustomerOrder.json');
contractName = Object.keys(_abiBinJson.contracts);
//console.log(contractName[1]);
_abi = _abiBinJson.contracts[contractName[1]].abi;
_bin = _abiBinJson.contracts[contractName[1]].bin;

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    //########################## 1-2 answer ########################
    await new web3.eth.Contract(_abi).deploy({data: "0x" + _bin}).estimateGas(function(err, gas) {
        if(!err) console.log("gas: " + gas)
    });

    var deployed = await new web3.eth.Contract(_abi)
        .deploy({data: "0x" + _bin})
        .send({from: accounts[0], gas:1800000 }, function(err, hash) {
            if(!err) console.log("---> hash: " + hash);
        })
    console.log("---> The contract deployed to: " + deployed.options.address);
}

deploy();
