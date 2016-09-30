contract CarManufacturer {

  struct manufacturer{ uint id; string name; }

  uint items;

  mapping (uint => manufacturer) manufacturers;

  function CarManufacturer() {
      uint items = 0;
  }

  function getCarManufacturer(uint item_id) constant returns (string name) {
      return (manufacturers[item_id].name);
  }

  function getTotalCarManufacturers() returns (uint) {
      return items;
  }

  function createCarManufacturer(string name) {
        manufacturers[items].name = name;
        items++;
  }

}
