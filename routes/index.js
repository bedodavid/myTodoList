let express = require('express');
let router = express.Router();
let User= require('../models/user');
let Task = require('../models/task');
let validateSignUp = require('../actions/validateSignUp');
let validateLogin = require('../actions/validateLogin');
let newUser = require('../actions/newUser');
let loginUser = require('../actions/loginUser');
let addList = require('../actions/addList');
let addTask = require('../actions/addTask');


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

router.post('/todoapp', function(req, res, next){
  //req.body.taskname=req.sanitize(req.body.taskname);
  let gotData={};
  Object.keys(req.body).forEach(function(item){
    gotData[item]=req.body[item];
  })

  if (gotData.hasOwnProperty("taskname")){
    gotData.userId= req.session.user.id;
    let promiseTask = new Promise((resolve, reject) => {
      resolve(addTask.add(gotData));
    });

     promiseTask.then( function (response){
       if (!Array.isArray(req.session.task)){
         req.session.task=[];
       }
       req.session.task.push(response) ;
       res.json(response);
     }).catch(err=>console.error(err));
  }
  else{
    let newList=req.body.listName;
    let user=req.session.user;
    let promiseList = new Promise((resolve, reject) => {
      resolve(addList.add(user,newList));
    });
     promiseList.then( function (response){
       req.session.list.push(response) ;
       //const thisListData=JSON.stringify(response);
       res.json(response);
     });
  }

});

 module.exports = router;
