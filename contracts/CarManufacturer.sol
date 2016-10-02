contract CarManufacturer {

  struct manufacturer{ int id; string name; }

  int items;

  mapping (int => manufacturer) manufacturers;

  function CarManufacturer() {
      int items = 0;
  }

  function getCarManufacturer(int item_id) constant returns (string name) {
      return (manufacturers[item_id].name);
  }

  function getTotalCarManufacturers() returns (int) {
      return items;
  }

  function createCarManufacturer(string name) {
        manufacturers[items].name = name;
        items++;
  }

}
