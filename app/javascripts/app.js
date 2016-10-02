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
    if (window.location.pathname == '/carType.html'){buildCarTypeUpdatesList(); templateCarType(getParameterByName('ct_id'))}
    if (window.location.pathname == '/carUpdate.html'){buildCarUpdate();}
    if (window.location.pathname == '/details.html'){buildLicensePlate();}
    if (window.location.pathname == '/rdw.html'){buildPendingList();}
    if (window.location.pathname == '/review.html'){buildCarUpdate();}

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
    var software_version = document.getElementById('software_version');
    if (software_version != null) {software_version.innerHTML = value[0]}

    var software_description = document.getElementById('software_description');
    if (software_description != null) {software_description.innerHTML = value[4]}

    var software_status = document.getElementById('software_status');
    if (software_status != null) {software_status.innerHTML = value[2]}

    templateCarType(value[1]);
  });

}

function templateCarType(id){
  ct.getCarType(parseInt(id), {from: account}).then(function(value) {
    var cartype_name = document.getElementById('cartype_name');
    if (cartype_name) {cartype_name.innerHTML = value[0]}
  }).catch(function(e) {});
}

function buildLicensePlate(){
  var lpate = getParameterByName('lp');
  document.getElementById('lpn').innerHTML = lpate;
  lp.getlicenceplateCarType(lpate, {from: account}).then(function(value) {
    templateCarType(value);
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
    for(var i = 0; i < total; i++){
      ct.getCarType.call(i, {from: account}).then(function(value) {

        if (value[2] != user.mid){ return; }
        var over = document.getElementById("overview-wrapper");
        over.innerHTML = over.innerHTML + '<div class="car-item"><p class="car-item-title trunc">'+value[0]+'</p><a href="/carType.html?ct_id='+value[1]+'"><img src="images/arrow.png" class="car-item-btn"></a></div>';

      });
    }
  });
}

function buildPendingList(){

      su.getSoftwareUpdateCount.call(account, {from: account}).then(function(total){
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

function createCarType(name){
  var name = document.getElementById('carTypeName').value;
  var mid = user.mid;

  ct.createCarType(name, parseInt(mid), {from: account}).then(function() {
      window.location.href = '/facturer_overview.html'
  }).catch(function(e) {
      console.log(e);
      console.log("Error creating manu");
  });
}

function getLicenceplateCarType(licence){
    lp.getlicenceplateCarType(licence, {from: account}).then(function(value) {
              console.log(value);
          }).catch(function(e) {
              console.log(e);
              console.log("Error getting manu");
          });
      }

function createLicenceplate(name, car_id){
    lp.createLicenceplate(name, car_id, {from: account}).then(function() {
        console.log("Created: "+ name);
        console.log("Created: "+ car_id);
    }).catch(function(e) {
        console.log(e);
        console.log("Error creating manu");
    });
}

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
                window.location.href = "/rdw.html";
              }
              else{
                window.location.href = "/facturer_overview.html";
              }
            };

        }
    }
}
