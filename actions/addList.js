var db = require('../database/dbHandler');
var List = require('../models/list');
//var getList = require('./getList');
var async = require('async');

async function add(user, listName){
   let myList= [[user.id,listName]];
   let result= await db.addList(myList);
   let listId=result.insertId;
   const newList= new List(listId,user.id,listName);
   const stringL=JSON.stringify(newList);
   const jsonList=JSON.parse(stringL);
   console.log(jsonList);
   return jsonList;
}



module.exports.add=add;
