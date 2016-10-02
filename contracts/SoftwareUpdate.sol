contract SoftwareUpdate {

  struct softwareUpdate{ string name; int ct_id; int minAmountReviewed; bool isPublished; int datePublished; bool isAccepted; bool isPending; int successPercentage;
                        mapping (int => review) reviews; int reviewCount; string description; string issue; }

  struct review{string revDescription; bool accepted; }

  mapping (int => softwareUpdate) softwareupdates;

  int item;

  function SoftwareUpdate() {
    item = 0;
  }


  function createSoftwareUpdate(string name, int datePublished, string description, string issue, int ct_id){
    softwareupdates[item].name = name;
    softwareupdates[item].datePublished = datePublished;
    softwareupdates[item].description = description;
    softwareupdates[item].issue = issue;
    softwareupdates[item].ct_id = ct_id;
    softwareupdates[item].reviewCount = 0;
    softwareupdates[item].isAccepted = false;
    softwareupdates[item].isPending = true;
    item++;
  }

  function getSoftwareUpdateStatus(int id) constant returns (bool isAccepted) {
    return (softwareupdates[id].isAccepted);
  }

  function getSoftwareUpdateCarType(int id) constant returns (int ct_id) {
    return (softwareupdates[id].ct_id);
  }

  function getSoftwareUpdate(int id) constant returns(string name, int ct_id, bool isAccepted, bool isPending, string description, string issue, int upid ){
    return (softwareupdates[id].name, softwareupdates[id].ct_id, softwareupdates[id].isAccepted, softwareupdates[id].isPending, softwareupdates[id].description, softwareupdates[id].issue, id);
  }

  function getSoftwareUpdateDatePublished(int id) constant returns (int datePublished) {
    return (softwareupdates[id].datePublished);
  }

  function getReviewCount(int id) constant returns(int reviewCount){
    return softwareupdates[id].reviewCount;
  }

  function getReview(int id, int revId) constant returns(string revDescription, bool accepted){
    return (softwareupdates[id].reviews[revId].revDescription,softwareupdates[id].reviews[revId].accepted);
  }

  function getSoftwareUpdateCount() constant returns(int count){
    return item;
  }

  function addReviewToSoftwareUpdate(int id, string description, bool accepted) {
    softwareupdates[id].reviews[softwareupdates[id].reviewCount].revDescription = description;
    softwareupdates[id].reviews[softwareupdates[id].reviewCount].accepted = accepted;
    softwareupdates[id].reviewCount++;

    if (softwareupdates[id].reviewCount >= softwareupdates[id].minAmountReviewed) {
      softwareupdates[id].isPending = false;

      int amountAproved = 0;
      for (int i = 0; i < softwareupdates[id].reviewCount; i++) {
        if (softwareupdates[id].reviews[i].accepted == true) {
          amountAproved++;
        }
      }
      if (((softwareupdates[id].reviewCount / amountAproved) * 100) >= softwareupdates[id].successPercentage) {
        softwareupdates[id].isAccepted = true;
      }
    }
  }
}
