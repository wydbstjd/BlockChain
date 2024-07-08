var doPromise = new Promise(function(myResolve, myReject) {
    myResolve(123);
});
doPromise.then(function(my){
        console.log("RETURNED: "+my);
    }).catch(function(err) {
        console.log("ERROR: "+err);
    });
