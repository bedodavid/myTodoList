var db = require('../database/dbHandler');
var List = require('../models/list');
//var getList = require('./getList');
var async = require('async');

async function addList(user, listName){
   let myList= [[user.id,listName]];
   let result= await db.addList(myList);
   let listId=result.insertId;
   const newList= new List(listId,user.id,listName);
   const stringL=JSON.stringify(newList);
   const jsonList=JSON.parse(stringL);
   return jsonList;
};

async function updateList(updateObj){
   const result = await db.updateList(updateObj);
   return true;
}

async function deleteList(listID){
   const result = await db.deleteList(listID);
   return true;
}

module.exports={
  addList,
  updateList,
  deleteList}
