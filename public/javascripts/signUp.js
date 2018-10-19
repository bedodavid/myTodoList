$(document).ready(function(){
  $('#input-name').focus();

function getFocus(input, resp){
  $('#'+resp).html("");
  if ($('#'+input).hasClass("input-notValid")){
    $('#'+input).removeClass("input-notValid")
  };
}

  $('#input-name').focus(function(){
    getFocus("input-name","nameResp");
  });
  $('#input-email').focus(function(){
    getFocus("input-email","emailResp");
  });
  $('#input-pwd').focus(function(){
    getFocus("input-pwd","pwdResp");
  });

  $('#input-name').blur(function(){
    let name= $('#input-name').val();
    let regexName =/^[a-zA-Z][a-zA-Z\s]*$/
    if (name===""||name===" "){
      $('#nameResp').html("Please enter your name");
      $('#input-name').addClass("input-notValid");
    }else if(name.length<3||(!regexName.test(name))){
      $('#nameResp').html("Please enter a valid name");
      $('#input-name').addClass("input-notValid");
    }
  })

  $('#input-email').blur(function(){
    let email= $('#input-email').val();
    let regexEmail =/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (email===""||email===" "){
      $('#emailResp').html("Please enter your email");
    }else if(!regexEmail.test(email)){
      $('#emailResp').html("Please enter a valid email");
    }
  });


  $('#input-pwd').blur(function(){
    let pwd= $('#input-pwd').val();
    let regexPwd =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    if(pwd.length<8){
      $('#pwdResp').html("Password need to be at least 8 characters");
    }else if(!regexPwd.test(pwd)){
        $('#pwdResp').html("Password must contain minimum: <br />        -- 1 capital letter --<br />        -- 1 lower case letter --<br />        -- 1 number --");
    }
  });

$('#signUpSubmit').click(function(e){
  e.preventDefault();
  let nameResp = $('#nameResp').text();
  let emailResp = $('#emailResp').text();
  let pwdResp = $('#pwdResp').text();
  if (nameResp===""&&emailResp===""&&pwdResp===""){
    $('#signUp-form').submit();
  }
});

})
