'use strict'

class Task {
  constructor(id, taskName, listID, userID, planedTime, deadLineTime, requrrence, priority, finished) {
    this.id = id;
    this.task = taskName;
    this.listID = listID;
    this.usersID = userID;
    this.planedTime = planedTime;
    this.deadLineTime = deadLineTime;
    this.requrrence = requrrence;
    this.priority = priority;
    this.finished = finished;
    this.setPlanedTime = function(newTime) {
      this.planedTime = newTime;
    };
    this.setDeadLineTime = function(newTime) {
      this.deadLineTime = newTime;
    };

    this.setRequrrence = function(req) {
      this.requrrence = req;
    };

    this.setPriority = function(newPriority) {
      this.priority = newPriority;
    };
    this.setFinished = function(finish) {
      this.finished = finished;
    };

  }

  get getID() {
    return this.id;
  }

  get getTask() {
    return this.task;
  }

  get getListID() {
    return this.listID;
  }

  get getUserID() {
    return this.userID;
  }

  get getPlanedTime() {
    return this.planedTime;
  }

  get getDeadLineTime() {
    return this.deadLineTime;
  }

  get getRequrrence() {
    return this.requrrence;
  }

  get getPriority() {
    return this.priority;
  }

  get getFinished(){
    return this.finished;
  }

}

module.exports = Task;
