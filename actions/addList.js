var db = require('../database/dbHandler');
//var List = require('../models/list');
//var getList = require('./getList');
var async = require('async');

async function add(user, listName){
   let myList= [[user.id,listName]];
   let result= await db.addList(myList);
   let listId=result.insertId;
   return {id:listId, user_id:user.id, listname:listName}
}

module.exports.add=add;
