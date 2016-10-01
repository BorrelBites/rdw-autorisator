contract CarType {

  struct cartype{ uint id; string name; uint manu_id;}

  uint items;

  mapping (uint => cartype) cartypes;

  function carType() {
      uint items = 0;
  }

  function getCarType(uint item_id) constant returns (string name) {
      return (cartypes[item_id].name);
  }

  function getCarTypeManufacturer(uint item_id) constant returns (uint manu_id) {
      return (cartypes[item_id].manu_id);
  }

  function getTotalCarTypes() returns (uint) {
      return items;
  }

  function createCarType(string name, uint manu_id) {
        cartypes[items].name = name;
        cartypes[items].manu_id = manu_id;
        items++;
  }

}
