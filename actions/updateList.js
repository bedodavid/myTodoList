var db = require('../database/dbHandler');
//var List = require('../models/list');
//var getList = require('./getList');
var async = require('async');

async function update(updateObj){
   let result= await db.updateList(updateObj);
   return true;
}



module.exports.update=update;
