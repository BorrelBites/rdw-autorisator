var accounts;
var account;
var cmf = CarManufacturer.deployed();
var ct = CarType.deployed();
var lp = Licenceplate.deployed();
var su = SoftwareUpdate.deployed();

var cartypes = [];


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

function getCarType(){


    id = document.getElementById('ctid').value
    id = parseInt(id)
    manu_id = document.getElementById('manufacturer').value
    manu_id = parseInt(manu_id);

    ct.getCarType(id, {from: account}).then(function(value) {
        console.log(value);
    }).catch(function(e) {
        console.log(e);
        console.log("Error getting manu");
    });
    ct.getCarTypeManufacturer(manu_id, {from: account}).then(function(value) {
        console.log(value);
    }).catch(function(e) {
        console.log(e);
        console.log("Error getting manu");
    });
}

function createCarType(){

    name = document.getElementById('ctcreate').value
    manu_id = document.getElementById('manu_id').value

    ct.createCarType(name, manu_id, {from: account}).then(function() {
        console.log("Created: "+ name);
        console.log("Created: "+ manu_id);
    }).catch(function(e) {
        console.log(e);
        console.log("Error creating manu");
    });
}


function getLicenceplateCarType(){


    licence = document.getElementById('licencep').value

    lp.getlicenceplateCarType(licence, {from: account}).then(function(value) {
        console.log(value);
    }).catch(function(e) {
        console.log(e);
        console.log("Error getting manu");
    });
}

function createLicenceplate(){

    name = document.getElementById('lp').value
    car_id = document.getElementById('car_tid').value

    lp.createLicenceplate(name, car_id, {from: account}).then(function() {
        console.log("Created: "+ name);
        console.log("Created: "+ car_id);
    }).catch(function(e) {
        console.log(e);
        console.log("Error creating manu");
    });
}

function createSoftwareUpdate() {
  name = document.getElementById('updatename').value
  date = document.getElementById('updatedate').value
  description = document.getElementById('updatedesc').value
  issue = document.getElementById('updateissue').value
  ct_id = document.getElementById('updatectid').value

  su.createSoftwareUpdate(name, date, description, issue, ct_id, {from: account}).then(function() {
    console.log('Succesfully created the software-update: ' + name);
  }).catch(function(e) {
    console.log('There was a problem creating the software-update');
  });
  /*
  function createSoftwareUpdate(string name, uint datePublished, string description, string issue, uint ct_id)
  */
}

 function getSoftwareUpdate() {
   id = document.getElementById('sid').value
   su.getSoftwareUpdate.call(id, {from: account}).then(function(value) {
     console.log(value);
   }).catch(function(e) {
     console.log('There was a problem creating the software-update');
   });

 }

 function setReview(){
   id = document.getElementById('swid').value
   desc = document.getElementById('swdesc').value
   accepted = (document.getElementById('accepted').value == 'true')


   su.addReviewToSoftwareUpdate(id, desc, accepted, {from: account}).then(function() {
     console.log('added review with id: ' + id);
   }).catch(function(e) {
     console.log(e);
     console.log('There was a problem creating the software-update');
   });
 }

 function getReview() {
   sid = document.getElementById('revsid').value
   rid = document.getElementById('revid').value
   su.getReview(sid, rid, {from: account}).then(function(value) {
     console.log(value);
   }).catch(function(e) {
     console.log('There was a problem creating the software-update');
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
        console.log(parseInt(value.valueOf()));
    })

    ct.getTotalCarTypes.call(account, {from: account}).then(function(value){
      console.log(parseInt(value.valueOf()));
    })



    ct.getTotalCarTypes.call(account, {from: account}).then(function(total){
      for(var i = 0; i < total; i++){
        ct.getCarType.call(i, {from: account}).then(function(value) {
          cartypes.push(value);
        });
      }
    });


    console.log(cartypes);
    accounts = accs;
    account = accounts[0];
  });
}
