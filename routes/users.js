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




router.post('/login', function(req, res, next){
  const email = req.body.email;
  const password = req.body.pwd;
  let user = new User(0,"",email,password);
  let promise = new Promise((resolve, reject) => {
    resolve(validateLogin.valid(user));
  });

  promise.then(function(result){
    let succesValidate=result.formvalid;
    if (!succesValidate){
      req.session.resp = result.resp;
      res.redirect('login');
    }else{
      let promiseResp = new Promise((resolve, reject) => {
        resolve(loginUser.login(result.user));
      });
      promiseResp.then(function(response){
        req.session.user= response.user;
        req.session.list= response.list;
        req.session.task=response.task;
        res.redirect('/todoapp');
      });
    }
  })
  .catch(e=>{console.error(e)});
 });



router.post('/register', function(req, res, next){
  const fullName= req.body.fullName;
  const email = req.body.email;
  const password = req.body.pwd;
  var user = new User(0,fullName,email,password);

  let promise = new Promise((resolve, reject) => {
    resolve(validateSignUp.valid(user));
  });

  promise.then(function(result){
    let succesValidate=result.formvalid;
    if (!succesValidate){
      req.session.user= result.user;
      req.session.resp = result.resp;
      res.redirect('signUp');
    }else{
      let promiseResp = new Promise((resolve, reject) => {
        resolve(newUser.newUser(user));
      });
      promiseResp.then(function(response){
        let emptyTask = new Task(0,"",0,0,0,0,0,0,0);
        req.session.user= response.user;
        req.session.list= response.list;
        req.session.task=emptyTask;
        res.redirect('/todoapp');
      })
    }
  })
  .catch(e=>{console.error(e)});
 });

  module.exports = router;
