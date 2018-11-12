var db = require('../database/dbHandler');
var List = require('../models/list');
var Task = require('../models/task');
var getList = require('./getList');
var getTask = require('./getTask');
var async = require('async');

async function login(user) {
  try {
    let myList = await getList.lists(user);
    let myTask = await getTask.task(user);
    if (myList !== "" && myTask !== "") {
      var listLength = myList.length;
      for( let i=0;i<listLength;i++){
        var assignedTask=0;
      }
    } else {
      if (myList === "") {
        myList = new List(0, 0, "");
      }
      if (myTask === "") {
        myTask = new Task(0, "", 0, 0, 0, 0, 0, 0, 0);
      }
    }
    let result = {
      user: user,
      list: myList,
      task: myTask
    };
    return result;

  } catch (err) {
    console.log(err);
  }
}

module.exports.login = login;
