var db = require('../database/dbHandler');
var Task = require('../models/task');
//var getTask = require('./getTask');
var async = require('async');

function formatTask(task) {
  if (!task.hasOwnProperty("requirrence")) {
    task.requirrence = 0;
  } else {
    const req = task.requirrence;
    task.requirrence = parseInt(req);
  }

  task.listId = parseInt(task.listId);
  task.priority = parseInt(task.priority);

  if (task.hasOwnProperty("deadline") && task.deadline !== "") {
    const dl = (new Date(task.deadline)).getTime()/1000;
    task.deadline = dl;
  } else {
    task.deadline = 0;
  }

  if (task.hasOwnProperty("reminderDate") && task.reminderDate !== "") {
    const dl = (new Date(task.reminderDate)).getTime()/1000;
    task.reminderDate = dl;
  } else {
    task.reminderDate = 0;
  }
  if (!task.hasOwnProperty("finished")) {
      task.finished = 0;                          //0==not finished
  }
  return task;
}


async function add(task) {
  try{
  formatTask(task);
  const myTask= [[task.taskname,task.listId,task.userId,
      task.reminderDate,task.deadline,task.requirrence,
      task.priority,task.finished]];
    let result= await db.addTask(myTask);
    let taskId=result.insertId;
    const newTask= new Task(
        taskId, task.taskname,task.listId,task.userId,
        task.reminderDate,task.deadline,task.requirrence,
        task.priority,task.finished);
    const stringT=JSON.stringify(newTask);
    const jsonTask=JSON.parse(stringT);
    return jsonTask
  }catch(err){
    console.error(err);
  }
  }



module.exports.add = add;
