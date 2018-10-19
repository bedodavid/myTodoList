let db = require('../database/dbHandler');
var async = require('async');

validName = function(user) {
  let name = user.getName;
  let nameResp;
  let regexName = /^[a-zA-Z][a-zA-Z\s]*$/;
  if (user.getName === undefined || name === "" || name === " ") {
    nameResp = "Please enter your name";
  } else if (name.length < 3 || (!regexName.test(name))) {
    nameResp = "Please enter a valid name";
  }else{
    nameResp="";
  }
  console.log(nameResp);
  return nameResp;
}

async function validEmail(user){
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
    if (res.length>0){
    console.log(res);
    emailResp = "This email is already registered";
    console.log(emailResp);
    }
  }catch(err){console.error(err);}
}
 return emailResp;
}


validPwd = function(user) {
  var pwd = user.getPassword;
  let pwdResp;
  let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  if (pwd.length < 8) {
    pwdResp = "Password need to be at least 8 characters";
  } else if (!regexPwd.test(pwd)) {
    pwdResp = "Password must contain minimum: <br />        -- 1 capital letter --<br />        -- 1 lower case letter --<br />        -- 1 number --";
  }else{
    pwdResp="";
  }
  return pwdResp;
}

module.exports={
  validName,
  validEmail,
  validPwd
}
