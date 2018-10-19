'use strict'
class myList {
  constructor(id, userID, listname) {
    this.id = id;
    this.userID = userID;
    this.listname = listname;

    this.setListname = function(newName) {
      this.listname = newName;
    };
  }
  get getListId() {
    return this.id;
  }

  get getListUserId() {
    return this.userID;
  }

  get getListname() {
    return this.listname;
  }


}
module.exports = myList;
