var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Task = require('../models/task');
var validateSignUp = require('../actions/validateSignUp');
var validateLogin = require('../actions/validateLogin');
var newUser = require('../actions/newUser');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signUp', function(req, res, next) {
  const user = {name: "",email: "",psw: ""};
  const errResp = {name: "",email: "",psw: ""};

  if(!req.session.user){
    req.session.user=user;
    req.session.resp=errResp;
  }
  res.render('signUp', {user: req.session.user, resp: req.session.resp });
  req.session.destroy();
});


router.get('/login', function(req, res, next) {
  const emailResp="";

  if(!req.session.emailResp){
    req.session.emailResp=emailResp;
  }
  console.log(emailResp);
  res.render('login',  {resp:req.session.emailResp });
  req.session.destroy();
});


router.get('/todoapp', function(req, res, next) {
  res.render('todoapp',{user: req.session.user, list:req.session.list, task:req.session.task});
  //req.session.destroy();
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
    var succesValidate=result.formvalid;
    if (!succesValidate){
      req.session.user= result.user;
      req.session.resp = result.resp;
      res.redirect('signUp');
    }else{
      let promiseResp = new Promise((resolve, reject) => {
        resolve(newUser.newUser(user));
      });
      promiseResp.then(function(response){
        let task = new Task(0,"",0,0,null,null,0,0,0);
        req.session.user= response.user;
        req.session.list= response.list;
        req.session.task=task;
        res.redirect('/todoapp');
      })
    }
  })
  .catch(e=>{console.error(e)});
 });


 router.post('/login', function(req, res, next){
   const email = req.body.email;
   const password = req.body.pwd;
   var user = new User(0,"",email,password);

   let promise = new Promise((resolve, reject) => {
     resolve(validateLogin.valid(user));
   });

   promise.then(function(result){
     console.log(result);
     console.log("here");
     var succesValidate=result.formvalid;
     if (!succesValidate){
       req.session.emailResp = result.emailResp;
       res.redirect('login');
     }else{
       res.redirect('todoapp');
     }
   })
   .catch(e=>{console.error(e)});

  });



 module.exports = router;
