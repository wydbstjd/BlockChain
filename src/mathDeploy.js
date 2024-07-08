var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

web3.eth.getAccounts().then(ac => {console.log('account0:' , ac[0])});
web3.eth.getAccounts().then(ac => {console.log('account1:' , ac[1])});
web3.eth.getBalance('0x843Fc2d96ccbbfd37f0D0C6C31871a1458D10Eb5').then(ac => {console.log('account0 balance:', ac)});
web3.eth.getBalance('0x3A31AD76444617c1b2ce2A0D83196194fDa01261').then(ac => {console.log('account1 balance:', ac)});
