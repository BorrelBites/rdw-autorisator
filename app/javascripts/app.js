var accounts;
var account;
var cmf = CarManufacturer.deployed();


// function _g(){
//
//         // console.log(cmf.getTotalCarManufacturers());
// }

//
// function setStatus(message) {
//   var status = document.getElementById("status");
//   status.innerHTML = message;
// };
//
// function refreshBalance() {
//   var meta = MetaCoin.deployed();
//
//   meta.getBalance.call(account, {from: account}).then(function(value) {
//     var balance_element = document.getElementById("balance");
//     balance_element.innerHTML = value.valueOf();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error getting balance; see log.");
//   });
// };
//
// function sendCoin() {
//   var meta = MetaCoin.deployed();
//
//   var amount = parseInt(document.getElementById("amount").value);
//   var receiver = document.getElementById("receiver").value;
//
//   setStatus("Initiating transaction... (please wait)");
//
//   meta.sendCoin(receiver, amount, {from: account}).then(function() {
//     setStatus("Transaction complete!");
//     refreshBalance();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error sending coin; see log.");
//   });
// };
//

var index = 0;

function getCarManufacturer(){


    id = document.getElementById('cmfid').value
    id = parseInt(id)
    var cmf = CarManufacturer.deployed();

    cmf.getCarManufacturer(id, {from: account}).then(function(value) {
        console.log(value);
    }).catch(function(e) {
        console.log(e);
        console.log("Error getting manu");
    });
}

function createCarManufacturer(){

    name = document.getElementById('cmfname').value


    cmf.createCarManufacturer(name, {from: account}).then(function() {
        console.log("Created: "+ name);
    }).catch(function(e) {
        console.log(e);
        console.log("Error creating manu");
    });
}


window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    cmf.getTotalCarManufacturers.call(account, {from: account}).then(function(value){
        console.log(parseInt(value.valueOf()) -1 );
    })

    accounts = accs;
    account = accounts[0];
  });
}
