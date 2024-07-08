var Web3 = require('web3');
var web3 = new Web3("http://localhost:12345");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log('(1) ac0: ' + accounts[0] + ', ac1: ' + accounts[1]);
    console.log('(2) ac3: ' + accounts[3].substring(0,7));
    bal0 = await web3.eth.getBalance(accounts[0]);
    bal1 = await web3.eth.getBalance(accounts[1]);
    console.log('(3) bal Of ac0: ' + bal0 + ', ac1: ' + bal1);
    t = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: 1122
    }, function(err, transactionHash) {
        if(!err) console.log("(4) sending " + accounts[0] + " --> " + accounts[1] + " hash: " + transactionHash);
    });
    console.log("(5) Sent to " + accounts[1] + ", hash: " + t.transactionHash);

    gasPrice = await web3.eth.getGasPrice();
    gasUsed = t.gasUsed;
    gasCost = gasPrice * gasUsed;
    console.log("(6) gasUsed x gasPrice = wei " + gasCost);
    gasCostEther = await web3.utils.fromWei(gasCost.toString(), 'ether');
    console.log("(6) gasUsed x gasPrice = ether " + gasCostEther);

    nonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log("(7) nonce: " + nonce);

    bal1after = await web3.eth.getBalance(accounts[1]);
    diff = await web3.utils.toBN(bal1).sub(web3.utils.toBN(bal1after));
    console.log("(8) bal diff: " + diff.toString());

    sum = await web3.utils.toBN('0');
    for(i=0; i<10; i++) {
        bal = await web3.eth.getBalance(accounts[i]);
        console.log("sum: " + sum + " adding " + i + " bal: " + bal);
        sum = sum.add(await web3.utils.toBN(bal));
    }
    console.log('(9) balance total: ' + sum);

    gasEstimate = await web3.eth.estimateGas({
        from: accounts[0],
        to: accounts[1],
        value: 1122
    });
    console.log(gasEstimate);
    t2 = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: 1111,
        gas: gasEstimate-1
    }, function(err, hash){
        console.log("(10) callback - sending ac0 -> ac1 hash: "+hash);
    });
}
doIt()
