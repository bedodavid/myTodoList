var db = require('../database/dbHandler');
var async = require('async');

async function lists(user){
  let userID=user.id;
  try {
    let promiseListCollection = new Promise((resolve, reject) => {
      resolve(db.getList(userID));
    });
    let result = await promiseListCollection;
    if(result.length>0){
      var string=JSON.stringify(result);
      var json =  JSON.parse(string);
    }else{
      var json= ""
    }

    return json;
  } catch (err) {
    console.error(err);
  }
}
module.exports.lists = lists;
