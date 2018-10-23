$(document).ready(function(){

  $("#newList-toolbar").click(function() {
    $("#newList-popup-container").toggleClass("display-none");
});

  $("#cancel-newlist").click(function() {
  $("#newList-popup-container").toggleClass("display-none");
 });

  $(this).click(function(event){
  //  $(event.target).siblings(".list-options").toggleClass("display-none");
    console.log("hy");
    console.log(event.target.parentNode.nodeName);
  });

});
