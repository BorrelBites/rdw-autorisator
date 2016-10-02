contract CarType {

  struct cartype{ int id; string name; int manu_id;}

  int items;

  mapping (int => cartype) cartypes;

  function carType() {
      int items = 0;
  }

  function getCarType(int item_id) constant returns (string name) {
      return (cartypes[item_id].name);
  }

  function getCarTypeManufacturer(int item_id) constant returns (int manu_id) {
      return (cartypes[item_id].manu_id);
  }

  function getTotalCarTypes() returns (int) {
      return items;
  }

  function createCarType(string name, int manu_id) {
        cartypes[items].name = name;
        cartypes[items].manu_id = manu_id;
        items++;
  }

}
