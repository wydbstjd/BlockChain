
var Web3=require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:12345"))

async function sendEth() {

    //var ac;

    try {

        var ac = await web3.eth.getAccounts(function(err,addr) {

            //console.log("AWAIT: "+addr); //better to get addr ouside callback

        });

        console.log("(1) ac0: "+ac[0]+" ac1: "+ac[1]);

        //addded

        console.log("(2) ac3: " + web3.utils.sha3(ac[3]).substring(0,7));

        var balac0 = await web3.eth.getBalance(ac[0]);

        var balac1 = await web3.eth.getBalance(ac[1]);

        console.log("(3) bal Of ac0: "+balac0+" ac1: "+balac1);



        //note: sendTranasaction() returns transactionReceipt

        var hashObj=await web3.eth.sendTransaction({from:ac[0],to:ac[1],value:1122},function(err, hash) {

            console.log("(4) sending "+ac[0]+"-->"+ac[1]+" hash: "+hash);

        });

        console.log("hashObj: "+JSON.stringify(hashObj));

        console.log("(5) Sent to " + ac[0] + " transactionHash: "+hashObj.transactionHash);

        // wonder why effectiveGasPrice is so large? -> gasPrice

        //console.log("(6-1) gas costs: "+hashObj.gas*hashObj.effectiveGasPrice);     

        var trObj = await web3.eth.getTransaction(hashObj.transactionHash);

        console.log("trObj: "+JSON.stringify(trObj));

        //console.log("(6-2) gas costs: "+trObj.gas*trObj.gasPrice);

        console.log("(6) gasUsed x gasPrice = wei " + hashObj.gasUsed * trObj.gasPrice);

        var gasAmountWeiBN = web3.utils.toBN(hashObj.gasUsed).mul(web3.utils.toBN(trObj.gasPrice));

        console.log("(6) gasUsed x gasPrice = "+ web3.utils.fromWei(gasAmountWeiBN, 'ether') + "Ether");

        console.log("(7) nonce: "+trObj.nonce);

        var balac1after = await web3.eth.getBalance(ac[1]);

        console.log("(8) ac1 bal before: " + balac1 + "bal after: " + balac1after);

        var balDiff1 = balac1 - balac1after;

        console.log("(8) bal diff: "+balDiff1);

        var balDiff1 = web3.utils.toBN(balac1).sub(web3.utils.toBN(balac1after));

        console.log("(8-1) bal diff: "+balDiff1);

        //web3.eth.getTransactionReceipt(hashObj.transactionHash).then(console.log);

        //web3.shh.getPublicKey(ac[0]).then(console.log); //not working

        var sum=0;

        //web3.eth.getBalance(ac[0]).then(console.log);

        console.log("(8) adding balance");

        for(let i=0; i<ac.length; i++) {

            bal=await web3.eth.getBalance(ac[i]);

            console.log("sum: "+sum+" adding "+i + " bal: " + bal);

            sum+=parseInt(bal);

        }

        console.log("(9) balance total: "+sum);

        var tr = await web3.eth.getTransaction(hashObj.transactionHash);

        console.log(tr);

        //added

        var hashObj2=await web3.eth.sendTransaction({from:ac[0],to:ac[1],value:1111, gas:20009},function(err, hash){

            console.log("(10) callback - sending ac0 -> ac1 hash: "+hash);

        });

    } catch(err) {

        console.log(err);

    }

    return ac;

}

var myAddr0=sendEth();

console.log("--After: "+JSON.stringify(myAddr0));
