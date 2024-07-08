console.log('account0 balance: ', eth.getBalance(eth.coinbase));
console.log('account1 balance: ', eth.getBalance(eth.accounts[1]));
var ba1 = eth.getBalance(eth.accounts[1]);
console.log('block number:', eth.blockNumber);
var t = eth.sendTransaction({
    from: eth.coinbase,
    to: eth.accounts[1],
    value: 111});
console.log('gas price:', eth.gasPrice);
console.log('transactionHash:', t);
console.log('\n\n...mining start')
miner.start(1); admin.sleepBlocks(1); miner.stop();
console.log('mining done...\n')

console.log('account0 balance: ', eth.getBalance(eth.coinbase));
console.log('account1 balance: ', eth.getBalance(eth.accounts[1]));
var ba2 = eth.getBalance(eth.accounts[1]);
console.log('block number:', eth.blockNumber);

console.log('increased balance:', ba2-ba1);
console.log('gasUsed:', eth.getTransactionReceipt(t).gasUsed)
