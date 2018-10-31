
$(document).ready(function() {

function startListName(){
  $("#listItem0").focus();
  let focused = document.activeElement;
  if (document.querySelector) {
    focused = document.querySelector(":focus");
  }
  $("#selectedList-name").text($(focused).find(".list-name").text());
}

startListName();

$("#list-collect").on("click","a",function(event){
  let focused = document.activeElement;
  if (document.querySelector) {
    focused = document.querySelector(":focus");
  }
  $("#selectedList-name").text($(focused).find(".list-name").text());
});


  $("#newList-toolbar").click(function() {
    $("#newTask-popup-container").addClass("display-none");
    $("#newList-popup-container").toggleClass("display-none");
  });

  $("#cancel-newlist").click(function() {
    $("#newList-popup-container").toggleClass("display-none");
  });


  $("#newTask-toolbar").click(function() {
    $("#newList-popup-container").addClass("display-none");
    $("#newTask-popup-container").toggleClass("display-none");
  });


  $("#cancel-newTask").click(function() {
    $("#newTask-popup-container").toggleClass("display-none");
  });


  $("#standardViewTab").click(function() {
    $("#calendarView").addClass("display-none");
    $("#calendarViewTab").removeClass("activeTaskTab");
    $("#standardViewTab").addClass("activeTaskTab");
    $("#standardView").removeClass("display-none");
  });


  $("#calendarViewTab").click(function() {
    $("#standardView").addClass("display-none");
    $("#standardViewTab").removeClass("activeTaskTab");
    $("#calendarViewTab").addClass("activeTaskTab");
    $("#calendarView").removeClass("display-none");
  });

  $("#datepicker").datetimepicker();
});
