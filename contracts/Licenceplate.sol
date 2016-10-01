contract Licenceplate {

  struct licenceplate{string licence; uint ct_id; bool exists;}

  mapping (string => licenceplate) licenceplates;

  function Licenceplate() {}

  function getlicenceplateCarType(string licence) constant returns (uint ct_id) {
      return (licenceplates[licence].ct_id);
  }

  function createLicenceplate(string name, uint ct_id) {
    if(licenceplates[name].exists){throw;}
        licenceplates[name].licence = name;
        licenceplates[name].ct_id = ct_id;
        licenceplates[name].exists = true;
  }

}
