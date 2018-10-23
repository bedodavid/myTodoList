var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Task = require('../models/task');
var validateSignUp = require('../actions/validateSignUp');
var validateLogin = require('../actions/validateLogin');
var newUser = require('../actions/newUser');
var loginUser = require('../actions/loginUser');
var addList = require('../actions/addList');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signUp', function(req, res, next) {
  const user = {name: "", email: "", psw: ""};
  const errResp = {name: "", email: "", psw: ""};

  if(!req.session.user){
    req.session.user=user;
    req.session.resp=errResp;
  }
  res.render('signUp', {user: req.session.user, resp: req.session.resp });
  req.session.destroy();
});


router.get('/login', function(req, res, next) {
  const errResp = {email:"", pwd:""};
  if(!req.session.resp){
    req.session.resp=errResp;
  }
  console.log(req.session.resp);
  res.render('login',  {resp:req.session.resp });
});



router.get('/todoapp', function(req, res, next) {
  res.render('todoapp',{user: req.session.user, list:req.session.list, task:req.session.task});

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
     var succesValidate=result.formvalid;
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
router.post('/addList', function(req, res, next){
  let newList=req.body.listName;
  let user=req.session.user;
  let promiseList = new Promise((resolve, reject) => {
    resolve(addList.add(user,newList));
  });
   promiseList.then( function (response){
     console.log(response);
     console.log(req.session.list);
     req.session.list.push(response) ;
     console.log(req.session.list);
     res.redirect('todoapp');
   });
});



 module.exports = router;
