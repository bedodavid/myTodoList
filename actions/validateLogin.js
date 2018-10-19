var db = require('../database/dbHandler');
var validate = require('./validateForms');
var async = require('async');

async function valid(user){
  let email = user.getEmail;
  let emailResp="";
  let regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email === "" || email === " ") {
    emailResp = "Please enter your email";
  } else if (!regexEmail.test(email)) {
    emailResp = "Please enter a valid email";
  }else {
    try{
    let promiseEmail = new Promise((resolve, reject) => {
      resolve(db.findUser(user));
    });
    let res= await promiseEmail;
    if (res.length<1){
    emailResp = "This email is not registered";
  }else{
    var newUser = new User(res[0].id,res[0].fullName,res[0].email,"",res[0].registeredtime)
    }
  }catch(err){console.error(err);}
}

let formvalid=(emailResp==="");
return {user:newUser, emailResp:emailResp, formvalid:formvalid};
}

module.exports.valid=valid;
