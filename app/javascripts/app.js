// global vars
var user = {};
if (localStorage.user){
  user = JSON.parse(localStorage.user);
}

//middleware javascrip to read and write to blockchain

//enitiy: CarManufacturer
  //read functions start
function getCarManufacturer(){

}
  //read functions end

  //write functions Start
function createCarManufacturer(){

}
  //write functions end
//entity: CarManufacturer end
//enitiy: CarType
    //read functions start
function getCarType(){

}
function getCarTypeManufacturer(){

}
    //read functions end

    //write functions Start
function createCarType(){

}
    //write functions end
//entity: CarType end
//enitiy: Licenceplate
      //read functions start

      //read functions end

      //write functions Start

      //write functions end
//entity: Licenceplate end
//enitiy: SoftwareUpdate
        //read functions start

        //read functions end

        //write functions Start

        //write functions end
//entity: SoftwareUpdate end

//
var xmlhttp = new XMLHttpRequest();
var url = "http://192.168.1.99:9941/login"

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
            console.log(response);
            if (response.success){
              user = response;
              localStorage.user = JSON.stringify(user)
            };

        }
    }
}
