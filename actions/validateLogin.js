var db = require('../database/dbHandler');
var validate = require('./validateForms');
var User = require('../models/user');
var async = require('async');

async function valid(user) {
  let resp = {
    email: "",
    pwd: ""
  }
  let email = user.getEmail;
  let emailResp = "";
  let regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email === "" || email === " ") {
    resp.email = "Please enter your email";
  } else if (!regexEmail.test(email)) {
    resp.email = "Please enter a valid email";
  } else {
    try {
      let promiseEmail = new Promise((resolve, reject) => {
        resolve(db.findUser(user));
      });
      let res = await promiseEmail;
      let resLength = res.length
      if (resLength < 1) {
        resp.email = "This email is not registered";
      } else if (resLength > 1) {
        resp.email = "Multiple emails, please contact the Support";
      } else {
        var newUser = new User(
          res[0].id, res[0].fullname,
          res[0].email, res[0].password,
          res[0].registeredtime);

        if (user.password!==newUser.password){
          resp.pwd="Password does not match email";
        }else{
          newUser.password="";
        }
      }
    } catch (err) {
    console.error(err);
  }
}

let formvalid = (resp.email === "" && resp.pwd === "");
return {
  user: newUser,
  resp: resp,
  formvalid: formvalid
};
}

module.exports.valid = valid;
