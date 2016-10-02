// global vars
var user = {};
if (localStorage.user){
  user = JSON.parse(localStorage.user);
}

var accounts;
var account;
var cmf = CarManufacturer.deployed();
var ct = CarType.deployed();
var lp = Licenceplate.deployed();
var su = SoftwareUpdate.deployed();

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


    accounts = accs;
    account = accounts[0];

    createLicenceplate('000000', 5);
    createLicenceplate('ab3e2a', 6);
    //
    // createCarManufacturer('BMW');
    // createCarManufacturer('Audi');
    // createCarManufacturer('Volvo');
    // createCarManufacturer('Tesla');
    // createCarManufacturer('Mattimobiel');
    if (window.location.pathname == '/facturer_overview.html'){buildCarTypeListByMid();}
    if (window.location.pathname == '/carType.html'){buildCarTypeUpdatesList();}
    if (window.location.pathname == '/carUpdate.html'){buildCarUpdate();}
    if (window.location.pathname == '/details.html'){buildLicensePlate();}
    if (window.location.pathname == '/rdw.html'){buildPendingList();}
    if (window.location.pathname == '/review.html'){buildCarUpdate();}

  });
}


//middleware javascrip to read and write to blockchain

//enitiy: CarManufacturer
  //read functions start
function getCarManufacturer(id){
      var cmf = CarManufacturer.deployed();
      cmf.getCarManufacturer(id, {from: account}).then(function(value) {
        //logic

      }).catch(function(e) {
          console.log(e);
          console.log("Error getting manu");
      });
}
  //read functions end

  //write functions Start
function createCarManufacturer(name){
      cmf.createCarManufacturer(name, {from: account}).then(function() {
      //logic

      }).catch(function(e) {
          console.log(e);
          console.log("Error creating manu");
      });
}
  //write functions end
//entity: CarManufacturer end
//enitiy: CarType
    //read functions start
function getCarType(id, manu_id, callback){
      ct.getCarType(id, {from: account}).then(function(value) {
        callback(value);
      }).catch(function(e) {
          console.log(e);
          console.log("Error getting manu");
      });
}

function redirToCreateUpdate(){
  window.location.href='/createUpdate.html?ct_id='+getParameterByName('ct_id')
}
function searchLicensePlate(){
  window.location.href='/details.html?lp='+document.getElementById('licenseplate').value
}

function buildCarUpdate(){

  su.getSoftwareUpdate.call(parseInt(getParameterByName('updateid')), {from: account}).then(function(value) {
    document.getElementById('software_version').innerHTML = value[0]
    document.getElementById('software_description').innerHTML = value[4]
    document.getElementById('software_status').innerHTML = value[2]
  });

}


function buildLicensePlate(){

  var lpate = getParameterByName('lp');
  document.getElementById('lpn').innerHTML = lpate;
  lp.getlicenceplateCarType(lpate, {from: account}).then(function(value) {

    ct.getCarType(value, {from: account}).then(function(typeName) {
        document.getElementById('cartype_name').innerHTML = typeName
    }).catch(function(e) {
        console.log(e);
        console.log("Error getting manu");
    });



  }).catch(function(e) {
      console.log(e);
      console.log("Error getting manu");
  });

}

function buildCarTypeUpdatesList(){

    var id = parseInt(getParameterByName('ct_id'));

    su.getSoftwareUpdateCount.call(account, {from: account}).then(function(total){
      var ctcount = 0;
      for(var i = 0; i < total; i++){
          su.getSoftwareUpdate.call(i, {from: account}).then(function(value) {
            var over = document.getElementById("versionbrowser");
            over.innerHTML = over.innerHTML + '<div class="car"><div class="car-detail"> <p class="car-detail-right">'+value[0]+'</p></div> <a href="/carUpdate.html?updateid='+ctcount+'" style="float: left;"><i class="ion-chevron-right"></i></a> </div>'
            ctcount++;
        });
      }
    });

}

function buildCarTypeListByMid(){
  ct.getTotalCarTypes.call(account, {from: account}).then(function(total){
    var ctcount = 0;
    for(var i = 0; i < total; i++){
      ct.getCarType.call(i, {from: account}).then(function(value) {
        // ct.getCarTypeManufacturer.call(i, {from: account}).then(function(man) {
        //
        //   var manid = parseInt(man.valueOf())
        //   alert('man:' + manid.toString());
        //   if (manid == user.mid){
            var over = document.getElementById("overview-wrapper");
            over.innerHTML = over.innerHTML + '<div class="car-item"><p class="car-item-title trunc">'+value+'</p><a href="/carType.html?ct_id='+ctcount+'"><img src="images/arrow.png" class="car-item-btn"></a></div>';
            ctcount++;
        //   }
        // });
      });
    }
  });

}

function buildPendingList(){

      su.getSoftwareUpdateCount.call(account, {from: account}).then(function(total){
        alert(total)
        for(var i = 0; i < total; i++){
            su.getSoftwareUpdate.call(i, {from: account}).then(function(value) {
              if(!value[3]){return;}
              var over = document.getElementById("car-wrapper");

              var idx = value[6].toNumber()
              over.innerHTML = over.innerHTML + '<div class="car"><div class="car-detail"> <p class="car-detail-right">'+value[0]+'</p></div> <a href="/review.html?updateid='+idx+'" style="float: left;"><i class="ion-chevron-right"></i></a> </div>'
          });
        }
      });
}

function sendReview(response) {

  var desc = document.getElementById('comment');
  var id   = getParameterByName('updateid');

  su.addReviewToSoftwareUpdate(id, desc, response, {from: account}).then(function() {
    console.log('added review with id: ' + id);
    window.location.href = '/rdw.html'
  }).catch(function(e) {
    console.log(e);
    console.log('There was a problem creating the software-update');
  });

}



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getCarTypeManufacturer(manu_id){
  ct.getCarTypeManufacturer(manu_id, {from: account}).then(function(value) {
      //logic

  }).catch(function(e) {
      console.log(e);
      console.log("Error getting manu");
  });
}
    //read functions end

    //write functions Start
function createCarType(name){
  var name = document.getElementById('carTypeName').value;
  var mid = user.mid;

  ct.createCarType(name, mid, {from: account}).then(function() {
      window.location.href = '/facturer_overview.html'
  }).catch(function(e) {
      console.log(e);
      console.log("Error creating manu");
  });
}
    //write functions end

//entity: CarType end
//enitiy: Licenceplate
      //read functions start
function getLicenceplateCarType(licence){
    lp.getlicenceplateCarType(licence, {from: account}).then(function(value) {
              console.log(value);
          }).catch(function(e) {
              console.log(e);
              console.log("Error getting manu");
          });
      }
      //read functions end

      //write functions Start
function createLicenceplate(name, car_id){
    lp.createLicenceplate(name, car_id, {from: account}).then(function() {
        console.log("Created: "+ name);
        console.log("Created: "+ car_id);
    }).catch(function(e) {
        console.log(e);
        console.log("Error creating manu");
    });
}
      //write functions end
//entity: Licenceplate end
//enitiy: SoftwareUpdate
        //read functions start
function getSoftwareUpdate(id) {
  su.getSoftwareUpdate.call(id, {from: account}).then(function(value) {
    //logic

  }).catch(function(e) {
    console.log('There was a problem creating the software-update');
  });

}

function getAllPendingUpdates(){
  for(i = 0; i < su.getSoftwareUpdateCount; i++){
    if(su.getSoftwareUpdate[i].isPending == true){
      pendingUpdates.push(su.getSoftwareUpdate[i]);
    }
  }
}
        //read functions end

        //write functions Start
function createSoftwareUpdate(name, date, description, issue) {
  var name = document.getElementById('updateName').value;
  var date = document.getElementById('updateDate').value;
  var description = document.getElementById('updateDescription').value;
  var issue = document.getElementById('updateIssue').value;


  su.createSoftwareUpdate(name, date, description, issue, getParameterByName('ct_id'), {from: account}).then(function() {
    console.log('Succesfully created the software-update: ' + name);
    window.location.href='/carType.html?ct_id='+getParameterByName('ct_id')

  }).catch(function(e) {
    console.log('There was a problem creating the software-update');
  });
}
        //write functions end
//entity: SoftwareUpdate end
//enitiy: reviews
        //read functions start
function getReview(sid, rid) {
  su.getReview(sid, rid, {from: account}).then(function(value) {
    //logic

  }).catch(function(e) {
    console.log('There was a problem creating the software-update');
  });

}

        //read functions end
        //write functions start
function setReview(id, desc, accepted){
  su.addReviewToSoftwareUpdate(id, desc, accepted, {from: account}).then(function() {
    //logic

  }).catch(function(e) {
    console.log(e);
    console.log('There was a problem creating the software-update');
  });
}

        //write functions end
//entity: reviews end

var xmlhttp = new XMLHttpRequest();
var url = "http://192.168.1.182:9941/login"

function login() {

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            "email": username,
            "password": password

        }));
        xmlhttp.onreadystatechange = function(){
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            if (response.success){
              user = response;
              localStorage.user = JSON.stringify(user)
              if(user.type == "audit"){
                //rdw
                window.location.href = "/rdw.html";
              }
              else{
                window.location.href = "/facturer_overview.html";
              }
            };

        }
    }
}
