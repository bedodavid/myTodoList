var db = require('../database/dbHandler');
var validate = require('./validateForms');
var async = require('async');

async function valid(user) {
    var resp = {
    name: "",
    email: "",
    pwd: ""
  };
    try{
    let promise = new Promise((resolve, reject) => {
      resolve(validate.validEmail(user));
    });
    resp.name = validate.validName(user);
    resp.pwd = validate.validPwd(user);
    resp.email = await promise;
    let formvalid = (resp.name === "" && resp.email === "" && resp.pwd === "");
    if (!formvalid) {
      if (resp.name !== "") {
        user.name = "";
      }
      if (resp.email !== "") {
        user.email = "";
      }
    }
    return {
      user: user,
      resp: resp,
      formvalid: formvalid
    };
  }catch(err){
    console.error(err);
  }
}

module.exports.valid=valid;
