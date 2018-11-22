let express = require('express');
let router = express.Router();
let addTask = require('../actions/addTask');


router.post('/create', function(req, res, next){
  //req.body.taskname=req.sanitize(req.body.taskname);
  let gotData={};
  Object.keys(req.body).forEach(function(item){
    gotData[item]=req.body[item];
  })
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
});

module.exports=router;
