var db = require('../database/dbHandler');
var List = require('../models/list');
var async = require('async');


async function addUser(user) {
  try {
    let promiseUser = new Promise((resolve, reject) => {
      resolve(db.addUser(user));
    });
    let res = await promiseUser;
    user.id = res.insertId;
    return user;
  } catch (err) {
    console.error(err);
  }
}

async function addList(user) {
  let userID=user.id;
  let defaultList = [
    [userID, "Work"],
    [userID, "Health"],
    [userID, "Meetings"],
    [userID, "Shopping"],
    [userID, "Family"],
    [userID, "Movies to watch"],
    [userID, "Music"],
    [userID, "Travel"],
    [userID, "Personal"]
  ];
  try {
    let promiseList = new Promise((resolve, reject) => {
      resolve(db.addList(defaultList));
    });
    let result = await promiseList;
    return user;
  } catch (err) {
    console.error(err);
  }
}

async function getLists(user){
  let userID=user.id;
  try {
    let promiseListCollection = new Promise((resolve, reject) => {
      resolve(db.getList(userID));
    });
    let result = await promiseListCollection;

    var string=JSON.stringify(result);
    var json =  JSON.parse(string);
    return {user:user, list:json};
  } catch (err) {
    console.error(err);
  }
}


async function newUser(user) {
  try{
   let newUser = await addUser(user);
   let listAdded = await addList(newUser);
   let result= await getLists(newUser);
   return result;   
 } catch(err){
   console.log(err); }
}

module.exports.newUser = newUser;
