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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/todoapp', function(req, res, next) {
  res.render('todoapp',{user: req.session.user, list:req.session.list, task:req.session.task});
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
  res.render('login',  {resp:req.session.resp });
});


/*router.post('/addList', function(req, res, next){
  let newList=req.body.listName;
  let user=req.session.user;
  let promiseList = new Promise((resolve, reject) => {
    resolve(addList.add(user,newList));
  });
   promiseList.then( function (response){
     req.session.list.push(response) ;
     const thisListData=JSON.stringify(response);
     res.redirect('todoapp');
   });
});

router.post('/addTask', function(req, res, next){
  let task={};
  Object.keys(req.body).forEach(function(item){
    task[item]=req.body[item];
  })
  task.userId= req.session.user.id;
  let promiseTask = new Promise((resolve, reject) => {
    resolve(addTask.add(task));
  });
   promiseTask.then( function (response){
     console.log(response);
     if (!Array.isArray(req.session.task)){
       req.session.task=[];
     }
     req.session.task.push(response.task) ;
     res.redirect('todoapp');
   });
});*/







 module.exports = router;
