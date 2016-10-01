contract SoftwareUpdate {

  struct softwareUpdate{ string name; uint ct_id; uint minAmountReviewed; bool isPublished; uint datePublished; bool isAccepted; bool isPending; uint successPercentage;
                        mapping (uint => review) reviews; uint reviewCount; string description; string issue; }

  struct review{string revDescription; bool accepted; }

  mapping (uint => softwareUpdate) softwareupdates;

  uint item;

  function SoftwareUpdate() {
    item = 0;
  }


  function createSoftwareUpdate(string name, uint datePublished, string description, string issue, uint ct_id){
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

  function getSoftwareUpdateStatus(uint id) constant returns (bool isAccepted) {
    return (softwareupdates[id].isAccepted);
  }

  function getSoftwareUpdateCarType(uint id) constant returns (uint ct_id) {
    return (softwareupdates[id].ct_id);
  }

  function getSoftwareUpdate(uint id) constant returns(string name, uint ct_id, bool isAccepted, bool isPending, string description, string issue ){
    return (softwareupdates[id].name, softwareupdates[id].ct_id, softwareupdates[id].isAccepted, softwareupdates[id].isPending, softwareupdates[id].description, softwareupdates[id].issue);
  }

  function getSoftwareUpdateDatePublished(uint id) constant returns (uint datePublished) {
    return (softwareupdates[id].datePublished);
  }

  function getReviewCount(uint id) constant returns(uint reviewCount){
    return softwareupdates[id].reviewCount;
  }

  function getReview(uint id, uint revId) constant returns(string revDescription, bool accepted){
    return (softwareupdates[id].reviews[revId].revDescription,softwareupdates[id].reviews[revId].accepted);
  }

  function addReviewToSoftwareUpdate(uint id, string description, bool accepted) {
    softwareupdates[id].reviews[softwareupdates[id].reviewCount].revDescription = description;
    softwareupdates[id].reviews[softwareupdates[id].reviewCount].accepted = accepted;
    softwareupdates[id].reviewCount++;

    if (softwareupdates[id].reviewCount >= softwareupdates[id].minAmountReviewed) {
      softwareupdates[id].isPending = false;

      uint amountAproved = 0;
      for (uint i = 0; i < softwareupdates[id].reviewCount; i++) {
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
