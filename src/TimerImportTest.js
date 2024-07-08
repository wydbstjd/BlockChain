const _abiBinJson = require('./Timer.json');
contractName = Object.keys(_abiBinJson.contracts);

console.log('- contract name: ', contractName);
_abi = _abiBinJson.contracts[contractName].abi;
_abiArray = JSON.parse(JSON.stringify(_abi));
_bin = _abiBinJson.contracts[contractName].bin;

console.log("- ABI: ", _abi);
console.log("- ABIArray: ", _abiArray);
console.log("- Bytecode: ", _bin);
