var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
var shelloContract = new web3.eth.Contract([{"inputs":[],"name":"sayHello","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}], '0x99a546c4D34153c12c41b75D194D7CF1d17d4046');

shelloContract.methods.sayHello().call().then(function (str) { console.log(str);});
