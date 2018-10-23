var db = require('../database/dbHandler');
var async = require('async');

async function task(user){
  let userID=user.id;
  try {
    let promiseListCollection = new Promise((resolve, reject) => {
      resolve(db.getTask(userID));
    });
    let result = await promiseListCollection;
    if (result.length>0){
      var string=JSON.stringify(result);
      var jsonTask =  JSON.parse(string);
    }else{
      var jsonTask ="";
    }

    return jsonTask;
  } catch (err) {
    console.error(err);
  }
}
module.exports.task = task;
