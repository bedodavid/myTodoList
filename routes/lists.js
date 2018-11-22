let express = require('express');
let router = express.Router();
let User= require('../models/user');
let Task = require('../models/task');
let validateSignUp = require('../actions/validateSignUp');
let validateLogin = require('../actions/validateLogin');
let newUser = require('../actions/newUser');
let loginUser = require('../actions/loginUser');
let addTask = require('../actions/addTask');
let changeList = require('../actions/changeList');


router.put('/update', function(req, res, next){
  let gotData={};
  Object.keys(req.body).forEach(function(item){
    gotData[item]=req.body[item];
  })
    let promiseUpdateList = new Promise((resolve, reject) => {
      resolve(changeList.updateList(gotData));
    });
    promiseUpdateList.then((data)=>{
      res.json("succes");
    }).catch((err)=>{console.log(err)});
});


router.post('/create', function(req, res, next){
  //req.body.taskname=req.sanitize(req.body.taskname);
  let gotData={};
  Object.keys(req.body).forEach(function(item){
    gotData[item]=req.body[item];
  })
    let newList=req.body.listName;
    let user=req.session.user;
    let promiseList = new Promise((resolve, reject) => {
      resolve(changeList.addList(user,newList));
    });
     promiseList.then( function (response){
       req.session.list.push(response) ;
       //const thisListData=JSON.stringify(response);
       res.json(response);
     });

});


router.delete('/delete', function(req, res, next){
  let gotData={};
  Object.keys(req.body).forEach(function(item){
    gotData[item]=req.body[item];
  })
  if(gotData.type==="list"){         // request comming from a list update
    let promiseUpdateList = new Promise((resolve, reject) => {
      resolve(changeList.deleteList(gotData.id));
    });
    promiseUpdateList.then((data)=>{
      res.json("succes");
    }).catch((err)=>{console.log(err)});
  }else{

  }
});

 module.exports = router;
