var Web3=require('web3');
var web3=new Web3('http://localhost:8345');

var abi = [{"inputs":[],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"subtract","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var addr = '0xe13374D806DDb4A412800512c67402002f02C470';
var counter = new web3.eth.Contract(abi, addr);

counter.methods.getCounter().call().then(function(str) {console.log(str)});
counter.methods.add().send({from: '0xb33ba1622c164Cd85baA770De1a51b6d3DC5f0FC', gas:100000});
counter.methods.add().send({from: '0xb33ba1622c164Cd85baA770De1a51b6d3DC5f0FC', gas:100000});
counter.methods.getCounter().call().then(function(str) {console.log(str)});
