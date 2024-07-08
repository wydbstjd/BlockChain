var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

var _abiArray = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var greeter = new web3.eth.Contract(_abiArray, "0x1Cfc7AA0a01fF625472C77B454f01AB2C183fEac");

greeter.methods.greet().call().then(function(value) {console.log(value);});
greeter.methods.setGreeting("Hello SMU").send({from:"0xb33ba1622c164Cd85baA770De1a51b6d3DC5f0FC",gas:100000});
greeter.methods.greet().call().then(function(value) {console.log(value);});

