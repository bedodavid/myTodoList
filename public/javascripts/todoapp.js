$(document).ready(function() {

  function getListID(string) {
    const pos = string.lastIndexOf("/");
    return parseInt(string.substring(pos + 1));
  }

  function applyFilter(filterName) {
    switch (filterName.trim()) {
      case "All tasks":
        {
          filterAllTask();
          break;
        }
      case "Today":
        {
          filterDate(0);
          break;
        }
      case "Tomorrow":
        {
          filterDate(1);
          break;
        }
      case "This week":
        {
          filterBeforeDate("week");
          break;
        }
      case "This month":
        {
          filterBeforeDate("month");
          break;
        }
      case "Critical importance":
        {
          filterPriority(4);
          break;
        }
      case "High importance":
        {
          filterPriority(3);
          break;
        }
      case "Medium importance":
        {
          filterPriority(2);
          break;
        }
      case "Low signinficance":
        {
          filterPriority(1);
          break;
        }
      case "No relevance":
        {
          filterPriority(0);
          break;
        }
      case "Clear all filters":
        {
          clearPriorityFilter();
          break;
        }
    }
  }
  function getYesterday(){
    return (new Date().setHours(0, 0, 0, 0) - (86400 * 1000));
  }

  function getTomorrow() {
    return (new Date().setHours(0, 0, 0, 0) + (86400 * 1000));
  }

  function getWeekAhead() {
    return (new Date().setHours(0, 0, 0, 0) + (86400 * 1000 * 7));
  }

  function getMonthAhead() {
    const today = new Date();
    const nextMonth = new Date( today.getFullYear() + "-" +
                                (today.getMonth() + 2) + "-" +
                                today.getDate());
    return nextMonth.setHours(0, 0, 0, 0);
  }

  function filterAllTask() {
    $("#myTask-ul").children().each(function() {
      $(this).show();
    })
  }

  function filterDate(extraday) {
    $("#myTask-ul").children().each(function() {
      const date = $(this).find(".task-datetime-holder").val();
      console.log(":"+date+":");
      $(this).hide();
      if (date != "0") {
        const today = new Date().setHours(0, 0, 0, 0) / 1000; //rounding the milliSec
        const filteredDay = today + (extraday * 86400); // 86400 is one day in sec 60*60*24, )
        (date == filteredDay) ? $(this).show(): $(this).hide(); // date is a String not number!!
      }
    });
  }

  function filterBeforeDate(filter) {
    $("#myTask-ul").children().each(function() {
      const date = $(this).find(".task-datetime-holder").val();
      let nextDate;
      if (date != "0") {
        if (filter === "week") {
          nextDate = getWeekAhead() / 1000;
        } else if (filter === "month") {
          nextDate = getMonthAhead() / 1000;
        }
        (date <= nextDate) ? $(this).show(): $(this).hide();
      }
    });
  }

  function filterPriority(priorityNumber) {
    console.log(priorityNumber);
    $("#myTask-ul").children().each(function() {
      const checkPriority = $(this).find(".priority").val();
      (priorityNumber == checkPriority) ? $(this).removeClass("filterDisplay-none"): $(this).addClass("filterDisplay-none");
    });
  }

  function clearPriorityFilter() {
    $("#myTask-ul").children().each(function() {
      $(this).removeClass("filterDisplay-none");
    });
  }

  function getListsTaskCount(){
      let listObjCount={};
      $("#myTask-ul").children().each(function() {
        const id = $(this).find(".taskListId").val();
        (listObjCount.hasOwnProperty(id))?(listObjCount[id]++):(listObjCount[id]=1);
      });


      $("#myList-ul").children().each(function(){
        Object.keys(listObjCount).some((key) => {
        if(getListID($(this).children().attr("href"))==key){
          $(this).find(".list-taskcount").text(listObjCount[key]);
          delete listObjCount[key];
          return true;
        }
      });
  });
}


  function checkFiltersStart() {
    let filterObj = {
      today: 0,
      tomorrow: 0,
      week: 0,
      month: 0,
      crit: 0,
      high: 0,
      med: 0,
      low: 0,
      none: 0
    }
    const today = new Date().setHours(0, 0, 0, 0) / 1000;
    const tomorrow = getTomorrow() / 1000;
    const thisWeek = getWeekAhead() / 1000;
    const thisMonth = getMonthAhead() / 1000;
    const yesterday = getYesterday()/1000;
    $("#myTask-ul").children().each(function() {
      const taskCheckBox = $(this).find(".taskCheckBox").is(":checked");
      if (taskCheckBox) {
        $(this).find(".task-name").addClass("taskFinished");
      }



      const priority = $(this).find(".priority").val();
      switch (priority) {
        case "4":
          {
            filterObj.crit++;
            break;
          }
        case "3":
          {
            filterObj.high++;
            break;
          }
        case "2":
          {
            filterObj.med++;
            break;
          }
        case "1":
          {
            filterObj.low++;
            break;
          }
        case "0":
          {
            filterObj.none++;
            break;
          }
        default:
          {
            console.log("Problem with creating priority of checkFiltersStart");
          }
      }

      const date = $(this).find(".task-datetime-holder").val();
      if (date == today) {
        filterObj.today++;
        $(this).find(".task-datetime").text("Today");

      } else if (date == tomorrow) {
        filterObj.tomorrow++;
        $(this).find(".task-datetime").text("Tomorrow");
      }else if (date==yesterday){
        $(this).find(".task-datetime").text("Yesterday");
      }

      if(date>0 &&date<=yesterday){
        $(this).find(".task-datetime").addClass("pastDateTimeTask");
      }
      if (date < thisWeek) {
        filterObj.week++;
      }
      if (date < thisMonth) {
        filterObj.month++;
      }
    });
    return filterObj;
  }

  function listFocusRemove() {
    $("#list-filters-ul").find("a").removeClass("focusList");
    $("#myList-ul").find("a").removeClass("focusList");
  }

  function returnDate(deadline, reminder) {
    if (deadline > 0) {
      const datetime = new Date(deadline * 1000);
      let date = datetime.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      timeFormat = "" +
        date + "." + datetime.getMonth() + "." + datetime.getFullYear();
    } else if (reminder > 0) {
      const datetime = new Date(reminder * 1000);
      let date = datetime.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      timeFormat = "" +
        date + "." + datetime.getMonth() + "." + datetime.getFullYear();
    } else {
      timeFormat = "";
    }
    return timeFormat;
  }



  function showOnlyActiveFilters(obj) {
    //  today: 0, tomorrow: 0, week: 0,month: 0,
    //  p_crit: 0,p_high: 0, p_med: 0, p_low: 0, p_none: 0
    Object.keys(obj).forEach((key) => {
      if (obj[key] > 0) {
        const filterID = key + `TaskFilter`;
        $("#" + filterID).parent().show();
        $("#" + filterID).children(".list-taskcount").text(obj[key]);
      }
    })

  }

  function startListName() {
    $("#allTaskFilter").addClass("focusList");
    $("#selectedList-name").text($("#allTaskFilter").text());
    filterAllTask();
    $("#newTask-toolbar").hide();
    let filterTaskObj = checkFiltersStart();
    showOnlyActiveFilters(filterTaskObj);
    console.log(getListsTaskCount());
  }

  startListName();

  $("#myTask-ul").on("click", "input", function() {
    if ($(this).is(":checkbox")) {
      if ($(this).is(":checked")) {
        $(this).siblings(".task-name").addClass("taskFinished");
      } else {
        $(this).siblings(".task-name").removeClass("taskFinished");
      }
    }
  });


  $("#list-filters-ul").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    listFocusRemove();
    $(focused).addClass("focusList");
    const filterName = $(focused).find(".list-name").text();
    $("#selectedList-name").text(filterName);
    $("#newTask-toolbar").hide();
    applyFilter(filterName);
  });


  $("#list-collect").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    $("#selectedList-name").text($(focused).text());
    listFocusRemove();
    $(focused).addClass("focusList");
    $("#newTask-toolbar").show();
    const id = getListID($(focused).attr("href"));
    $("#taskListIdForm").val(id);
    $("#myTask-ul").children().each(function() {
      const taskListId = $(this).find(".taskListId").val();
      (taskListId == id) ? $(this).show(): $(this).hide();
    })
  });

  $("#filter-priority-ul").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    const filterName = $(focused).find(".list-name").text().trim();
    applyFilter(filterName);
  });


  $("#newList-toolbar").click(function() {
    $("#newTask-popup-container").hide();
    $("#newList-popup-container").toggle();
  });

  $("#cancel-newlist").click(function() {
    $("#newList-popup-container").hide();
  });


  $("#newTask-toolbar").click(function() {
    $("#newList-popup-container").hide();
    $("#newTask-popup-container").toggle();
  });


  $("#cancel-newTask").click(function() {
    $("#newTask-popup-container").hide();
  });


  $("#standardViewTab").click(function() {
    $("#calendarView").hide();
    $("#calendarViewTab").removeClass("activeTaskTab");
    $("#standardViewTab").addClass("activeTaskTab");
    $("#standardView").show();
  });


  $("#calendarViewTab").click(function() {
    $("#standardView").hide();
    $("#standardViewTab").removeClass("activeTaskTab");
    $("#calendarViewTab").addClass("activeTaskTab");
    $("#calendarView").show();
    $("#newTask-popup-container").hide();
  });

  $("#deadlineViewTab").click(function() {
    $("#task-reminder").hide();
    $("#task-reminder").attr("disabled", "disabled");
    $("#reminderViewTab").removeClass("activeTaskTimeTab");
    $("#deadlineViewTab").addClass("activeTaskTimeTab");
    $("#task-deadline").show();
    $("#task-deadline").removeAttr("disabled");
  });

  $("#reminderViewTab").click(function() {
    $("#task-reminder").removeAttr("disabled");
    $("#task-reminder").show();
    $("#reminderViewTab").addClass("activeTaskTimeTab");
    $("#deadlineViewTab").removeClass("activeTaskTimeTab");
    $("#task-deadline").hide();
    $("#task-deadline").attr("disabled", "disabled");
  });



  $('#addTask-form').submit(function(e) {
    e.preventDefault();
    const taskName = $('#taskName').val().trim();
    if (taskName !== "") {
      const taskData = $(this).serialize();
      $.post('todoapp', taskData, function(data) {
        const lastPos = $("#myTask-ul").children().length;
        const datetime = returnDate(data.deadline, data.reminderDate);
        $("#myTask-ul").append(
          `
       <li class="task-items-li">
         <a class="task-items" tabindex="${lastPos+100} " id="taskItem${lastPos}">
           <input type="hidden" class="taskId" value="${data.id}">
           <input type="hidden" class="taskListId" value="${data.listId}">
           <input type="hidden" class="priority" value="${data.priority}">
           <input type="checkbox" class="taskCheckBox" id="taskCheckBox${lastPos}">
           <span class="task-name priority${data.priority}">${data.taskname}</span>
           <span class="task-datetime">${datetime}</span>
           <span class="task-options" title="List options" style="visibility:hidden"></span>
         </a>
       </li>
       `)
      });

      $("#newTask-popup-container").hide();
    }
  });


  $('#addList-form').submit(function(e) {
    e.preventDefault();
    const listName = $('#newListName').val().trim();
    if (listName !== "") {
      const listData = $(this).serialize();
      $.post('todoapp', listData, function(data) {
        const lastPos = $("#myList-ul").children().length;
        $("#myList-ul").append(
          `
          <li role="menuitem" class="list-items-li">
            <a class="list-items" href="#lists/${data.id}" tabindex="${lastPos+11}" id="listItem${lastPos+11}">
              <span class="list-icon-container"><img class="list-icon" src="/images/listItem.png" /></span>
              <span class="list-name">${data.listname}</span>
              <span class="list-taskcount"></span>
              <span class="list-options" title="List options" style="visibility:hidden"></span>
            </a>
          </li>
       `)
      });
      $("#newList-popup-container").hide();
    }
  });

  $("#priorityfilter-wrapper").on("mouseenter", function(event) {
    $("#priorityFilter-container").slideDown('medium');
  })

  $("#priorityFilter-container").on("mouseleave", function(event) {
    $("#priorityFilter-container").slideUp('medium');
  })

});
